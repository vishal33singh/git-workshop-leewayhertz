import React from "react";
import BaseComponent from "../baseComponent";
import MessageComponent from "./component";
import { connect } from "react-redux";
import Utils, { dispatchAction } from "../../utility";
import { Client as ConversationsClient } from "@twilio/conversations";
import { getAccessToken, deleteConversation } from "../../services/user";
import {AdminPermissions, eventConstants, Pages, RoleConstant} from "../../constants";
import decode from "jwt-decode";
import Utility from "../../utility";
import { history } from "../../managers/history";

class Messages extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      accessToken: "",
      newMessage: "",
      status: "",
      conversationsClient: null,
      media: null,
      conversations: [],
      chats: [],
      chatList: [],
      selectedChat: null,
      selectedIndex: null,
      paginate: false,
      scrollToRequired: true,
      isLoading: false,
      loading:false,

    };
  }

  componentDidMount = () => {
    this.getToken();
  };

  getToken = async () => {
    let existingToken = this.props.user.twilioAccessToken;
    if (existingToken) {
      let decodeRes = decode(existingToken);
      if (decodeRes.exp > Date.now() / 1000) {
        this.setState({ accessToken: existingToken });
        this.initConversations(existingToken);
        return;
      }
    }
    let [error, accessToken] = await Utils.parseResponse(
      getAccessToken(this.props.user.userDetails.role === RoleConstant.ORGANISER
          ? this.props.user.userDetails.userId
          : this.props.user.userDetails.organization.id)
    );
    if (error || !accessToken) {
      this.setState({ accessToken: "" });
      return;
    }
    this.props.dispatchAction(eventConstants.TWILIO_ACCESS_TOKEN, accessToken);
    this.setState({ accessToken });
    this.initConversations(accessToken);
  };

  initConversations = async (accessToken) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    try {
      const conversationsClient = await ConversationsClient.create(accessToken);
      window.conversationsClient = conversationsClient;
      if (this.props.user.fcmToken)
        conversationsClient.setPushRegistrationId(
          "fcm",
          this.props.user.fcmToken
        );
      await this.setState({
        conversationsClient,
      });
      const conversations =
        await conversationsClient.getSubscribedConversations();
      if (conversations.items.length) {
        await this.loadMessagesFor(conversations.items);
        this.setState({
          conversations: conversations.items,
          paginate: conversations,
        });
      }

      conversationsClient.on("connectionStateChanged", (status) => {
        this.setState({ status });
      });

      conversationsClient.on("conversationJoined", async (conversation) => {
        const list = this.updateConversationList(
          conversation,
          conversations.items.length
        );
        await this.loadMessagesFor(list);
      });

      conversationsClient.on("conversationLeft", async (conversation) => {
        this.setState({
          conversations: [
            ...this.state.conversations.filter((it) => it !== conversation),
          ],
        });
        await this.loadMessagesFor([
          ...this.state.conversations.filter((it) => it !== conversation),
        ]);
      });
      conversationsClient.on("tokenExpired", async () => {
        await this.getToken();
      });
    } catch (error) {
      console.log(error);
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
  };

  updateConversationList = (conversation, length) => {
    if (
      length &&
      this.state.conversations.findIndex(
        (item) => item && item.sid === conversation.sid
      ) !== -1
    ) {
      return this.state.conversations;
    }
    this.setState({
      conversations: [...this.state.conversations, conversation],
    });
    return [...this.state.conversations, conversation];
  };

  getMoreConversation = async () => {
    const element = document.getElementById("infiniteScroll");
    if (element.offsetHeight + element.scrollTop === element.scrollHeight) {
      if (this.state.paginate.hasNextPage) {
        const conversations = await this.state.paginate.nextPage();
        if (conversations.items.length) {
          await this.loadMessagesFor(conversations.items);
          this.setState({
            conversations: [
              ...this.state.conversations,
              ...conversations.items,
            ],
            paginate: conversations,
          });
        }
      }
    }
  };

  getPreviousMessages = async () => {
    // debugger;
    const element = document.getElementById("messages");
    if (!element.scrollTop) {
      if (this.state.selectedChat.messagePaginator.hasPrevPage) {
        const messagePaginator =
          await this.state.selectedChat.messagePaginator.prevPage();
        if (messagePaginator.items.length) {
          let messages = [
            ...this.state.selectedChat.messages,
            ...messagePaginator.items,
          ];
          messages.sort((a, b) => a.index - b.index);
          this.state.selectedChat.messages = messages;
          this.state.selectedChat.messagePaginator = messagePaginator;
          this.setState({
            scrollToRequired: false,
            selectedChat: this.state.selectedChat,
          });
        }
      }
    } else {
      this.setState({ scrollToRequired: true });
    }
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };
  deleteConversation = async (conversation, selectedIndex) => {
    try {
      if (!conversation || !conversation.sid) return;
      let [error, response] = await Utils.parseResponse(
        deleteConversation(conversation.sid)
      );
      if (!response || error) {
        Utils.apiFailureToast("Failed to delete conversation");
        return;
      }
      this.state.chatList.splice(selectedIndex, 1);
      this.setState({
        chats: this.state.chatList,
        chatList: this.state.chatList,
      });
      const index = this.state.conversations.findIndex(
        (item) => item.sid === conversation.sid
      );
      if (index !== -1) {
        this.state.conversations.splice(index, 1);
        this.setState({ conversation: this.state.conversations });
      }
      if (this.state.conversations.length) {
        this.setState({ selectedChat: this.state.conversations[0] });
      } else {
        this.setState({ selectedChat: null });
      }
    } catch (error) {
      console.log(error);
    }
  };

  searchConversation = (value) => {
    if (!value) {
      this.setState({
        chats: this.state.chatList,
        selectedChat: this.state.chatList[0],
        selectedIndex: 0,
      });
      return;
    }
    const chats = this.state.chatList.filter((item) => {
      return item.users.find(
        (user) =>
          user.identity !== (this.props.user.userDetails.role === RoleConstant.ORGANISER
                ? this.props.user.userDetails.userId
                : this.props.user.userDetails.organization.id) &&
          String(user.friendlyName).toLowerCase().includes(value)
      );
    });
    this.setState({
      chats,
      selectedChat: chats[0],
      selectedIndex: 0,
    });
  };

  loadMessagesFor = async (conversationProxy) => {
    conversationProxy =
      conversationProxy && conversationProxy.length
        ? conversationProxy
        : this.state.chats;

    let flag = true,
      user,
      conversation;
    for (let index = 0; index < conversationProxy.length; index++) {
      let users = [];
      const participants = await conversationProxy[index].getParticipants();
      for (
        let participant = 0;
        participant < participants.length;
        participant++
      ) {
        // user = await participants[participant].getUser();
        user = await conversationProxy[index].getParticipantByIdentity(
          participants[participant].identity
        );
        users.push(user);
      }

      conversation = await this.getMessages(
        conversationProxy[index],
        index,
        users
      );

      if (flag) {
        this.setState({
          selectedChat: conversation,
          selectedIndex: index,
        });
        flag = false;
      }
    }
  };

  getMessages = async (thisConversation, index, users) => {
    this.setState({loading:true})
    if (!thisConversation || !thisConversation.getMessages) {
      return;
    }
    await thisConversation
      .getMessages(10)
      .then((messagePaginator) => {
        this.state.chats[index] = {
          index: index,
          messages: messagePaginator.items,
          connection: thisConversation,
          users,
          messagePaginator,
        };

        this.setState({ chats: this.state.chats, chatList: this.state.chats,loading:false });
        this.handleMessageChange(thisConversation, index);
      })
      .catch((err) => {
        console.error("Couldn't fetch messages IMPLEMENT RETRY", err);
        this.state.chats[index] = {
          index: index,
          messages: [],
          connection: thisConversation,
          users,
        };

        this.setState({ chats: this.state.chats, chatList: this.state.chats,loading:false });
      });
    return this.state.chats[index];
  };

  handleMessageChange = (conversation, index) => {
    conversation.on("messageAdded", (message) => {
      this.state.chats[index].messages = [
        ...this.state.chats[index].messages,
        message,
      ];
      this.setState({
        chats: this.state.chats,
      });
    });
  };

  componentDidUpdate = (oldProps, oldState) => {
    if (this.state.selectedChat !== oldState.selectedChat) {
      this.getMessages(this.state.selectedChat, this.state.selectedIndex);
    }
  };

  sendMessage = () => {
    const message = this.state.newMessage.trim();
    if (message) {
      this.state.selectedChat.connection.sendMessage(message);
      this.setState({ newMessage: "" });
    }
    if (this.state.media) {
      let formData = new FormData();
      formData.append("file", this.state.media);
      this.state.selectedChat.connection.sendMessage(formData);
      this.setState({ media: null });
    }
  };

  render() {
    if (
      !Utility.checkPermission(
        AdminPermissions.MESSAGE,
        this.props.user?.userDetails
      )
    ) {
      history.replace(Pages.USER_MANAGEMENT);
    }
    return (
      <MessageComponent
        state={this.state}
        handleChange={this.handleChange}
        searchConversation={this.searchConversation}
        deleteConversation={this.deleteConversation}
        getMoreConversation={this.getMoreConversation}
        getPreviousMessages={this.getPreviousMessages}
        sendMessage={this.sendMessage}
        loggedInUser={this.props.user.userDetails}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(Messages);

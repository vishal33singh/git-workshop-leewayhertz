import moment from "moment";
import React from "react";
import { Row, Column } from "simple-flexbox";
import ConversationsMessages from "./messageComponent";
import CircularProgress from "material-ui/CircularProgress";
import { useState, useEffect } from "react";
import { RoleConstant } from "../../constants";

export default function MessageComponent({
  state,
  deleteConversation,
  sendMessage,
  handleChange,
  loggedInUser,
  searchConversation,
  getMoreConversation,
  getPreviousMessages,
}) {
  const sendMessageHandler = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const [element, setElement] = useState(<CircularProgress color="#395FF1" />);
  useEffect(() => {
    setTimeout(() => {
      setElement("No Record Found");
    }, 5000);
  }, []);

  return (
    <>
      <div className="font-OpenSansSemiBold pl-12.5 pt-12.5 text-ft8">
        Messages
      </div>
      <Row
        className="bg-Slate-200 pt-7.5 pl-12.5 pr-12.5 gap-6 h-screen"
        style={{ paddingBottom: "90px" }}
      >
        <Column className="bg-white gap-4 shadow-sidebar pt-8 pb-8 w-40per h-100per overflow-auto rounded-xl">
          <SearchInput searchConversation={searchConversation} />
          <div
            onScroll={getMoreConversation}
            id="infiniteScroll"
            className="overflow-auto h-full"
          >
            <ChatComponent
              conversations={state.chats}
              handleChange={handleChange}
              loggedInUser={loggedInUser}
              identity={
                loggedInUser?.role === RoleConstant.ORGANISER
                  ? loggedInUser.userId
                  : loggedInUser.organization.id
              }
            />
          </div>
        </Column>
        <Column className="bg-white shadow-sidebar  justify-between w-60per h-100per rounded-xl ">
          {state.selectedChat ? (
            <Messages
              state={state}
              selectedChat={state.selectedChat}
              loggedInUser={loggedInUser}
              getPreviousMessages={getPreviousMessages}
              deleteConversation={() =>
                deleteConversation(
                  state.selectedChat.connection,
                  state.selectedIndex
                )
              }
              identity={
                loggedInUser?.role === RoleConstant.ORGANISER
                  ? loggedInUser.userId
                  : loggedInUser.organization.id
              }
            />
          ) : (
            <div className="noRecordFound mt-40"> {element}</div>
          )}
          {state?.selectedChat && (
            <div className="flex items-center gap-3.25 p-6 ">
              <div className="rounded-xl h-11.25 w-11.25 bg-blue-50 text-white flex items-center justify-center">
                <label for="select-media" className="cursor-pointer">
                  {/* M */}
                  <img
                  className="w-4"
                    src="/images/ic-imageplaceholder.png"
                    alt="img-placeholder"
                  />
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="select-media"
                  onChange={(ev) => handleChange("media", ev.target.files[0])}
                />
              </div>
              <form
                onSubmit={sendMessageHandler}
                className=" h-11.25 flex justify-between rounded-xl px-5 items-center w-full bg-white border border-grey-200"
              >
                <input
                  type="text"
                  className=" focus:outline-none w-full"
                  placeholder="Type something here..."
                  value={state.newMessage}
                  onChange={(ev) => handleChange("newMessage", ev.target.value)}
                />
                <button
                  className="bg-blue-50 h-6 w-6 cursor-pointer border-none rounded-50per text-white flex items-center justify-center"
                  type="submit"
                >
                  <img alt="" src="/images/ic-send.svg" className="transform" />
                </button>
              </form>
            </div>
          )}
        </Column>
      </Row>
    </>
  );
}

function SearchInput({ searchConversation }) {
  return (
    <div className=" h-12.5 flex justify-between rounded-3xl px-5  ml-8 mr-8 items-center bg-white border border-grey-200">
      {/* <form onSubmit={onSubmit}> */}
      <input
        type="text"
        className="w-100per focus:outline-none"
        placeholder="Search"
        //  value={value}
        onChange={(ev) => searchConversation(ev.target.value)}
      />

      {/* </form> */}
      <img alt="search" src="/images/ic-search.svg" className="" />
    </div>
  );
}

const currentDate = new Date().toDateString();
const currentTime = new Date().toLocaleTimeString();

function Messages({
  selectedChat,
  deleteConversation,
  loggedInUser,
  identity,
  getPreviousMessages,
  state,
}) {
  const user =
    selectedChat && selectedChat.users && selectedChat.users.length
      ? selectedChat.users.find((item) => item.identity !== identity)
      : { attributes: { friendlyName: "", profilePicImageUrl: "" } };

  return (
    <>
      <div>
        <div className="flex justify-between p-6 ">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 flex rounded-50per overflow-hidden">
              <img
                className="m-auto h-full w-full"
                src={
                  user?.attributes?.profilePicImageUrl
                    ? user?.attributes?.profilePicImageUrl
                    : "/images/ic-accountsettings.svg"
                }
                alt={"selected-user-profile"}
              />
            </div>
            <div>{user?.attributes?.friendlyName ?? "-"}</div>
          </div>
          <img
            src="/images/ic-delete.svg"
            alt="delete"
            className="cursor-pointer"
            onClick={() => deleteConversation()}
          />
        </div>
        <div className="border border-0.25 border-grey-50 " />
        <div className="text-ft1 text-Slate-350 flex justify-center pt-5">
          {currentDate} {currentTime}
        </div>
      </div>
      <ConversationsMessages
        // loggedInUser.userId
        scrollToRequired={state.scrollToRequired}
        loggedInUser={loggedInUser}
        identity={identity}
        messages={selectedChat.messages}
        selectedChat={selectedChat}
        getPreviousMessages={getPreviousMessages}
      />
    </>
  );
}

function ChatComponent({
  conversations,
  handleChange,
  loggedInUser,
  identity,
}) {
  const updateSelectedChat = (index, chat) => {
    handleChange("selectedChat", chat);
    handleChange("selectedIndex", index);
  };

  return (
    conversations &&
    conversations.map((item, index) => {
      const lastMessage = item.messages[item.messages.length - 1];
      const user = item?.users?.find((item) => item.identity !== identity) ?? {
        attributes: {
          friendlyName: "",
          attributes: { profilePicImageUrl: "" },
        },
      };
      return (
        <>
          <div
            key={index}
            className="hover:bg-Slate-100 w-full flex h-25"
            onClick={() => {
              updateSelectedChat(index, item);
            }}
          >
            <div className="m-auto w-full flex gap-4 ml-8 mr-8">
              <Column>
                <div className="w-15 h-15 flex rounded-50per overflow-hidden">
                  <img
                    className="m-auto h-full w-full"
                    src={
                      user?.attributes?.profilePicImageUrl
                        ? user?.attributes?.profilePicImageUrl
                        : "/images/ic-accountsettings.svg"
                    }
                    alt={index}
                  />
                </div>
              </Column>
              <div className="flex justify-between flex-col h-12.5">
                <span className="text-left font-OpenSansSemiBold text-ft3 text-black-50 ">
                  {user?.attributes?.friendlyName ?? "-"}
                </span>
                <div className="font-OpenSans text-ft3 text-darkGrey-100">
                  {lastMessage && lastMessage.type === "media"
                    ? "media"
                    : lastMessage &&
                      lastMessage.body &&
                      lastMessage.body.slice(0, 10)}
                </div>
              </div>

              <span className="text-left whitespace-nowrap font-OpenSansSemiBold text-ft2 text-darkGrey-50 ml-auto">
                {moment(
                  lastMessage &&
                    lastMessage.state &&
                    lastMessage.state.timestamp
                ).format("HH:mm A")}
              </span>
            </div>
          </div>
          <div className="border border-0.25 border-grey-50 " />
        </>
      );
    })
  );
}

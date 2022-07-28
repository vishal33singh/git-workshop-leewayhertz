import React, { useState, useEffect } from "react";

function ConversationsMessages(props) {
  return (
    <div
      id="messages"
      className="overflow-auto h-100per"
      onScroll={props.getPreviousMessages}
    >
      {props.messages && props.messages.length ? (
        props.messages.map((m, index) => {
          return (
            <div key={index}>
              <MessageBubble
                selectedChat={props.selectedChat}
                loggedInUser={props.loggedInUser}
                key={m.index}
                direction={
                  m.author === props.identity ? "outgoing" : "incoming"
                }
                message={m}
                identity={props.identity}
                scrollToRequired={props.scrollToRequired}
                scrollIntoView={props.messages[props.messages.length - 1].sid}
              />
            </div>
          );
        })
      ) : (
        <div />
      )}
    </div>
  );
}

function MessageBubble(props) {
  const [state, setValue] = useState({
    mediaDownloadFailed: false,
    mediaUrl: null,
    type: null,
  });

  useEffect(() => {
    getMessage();
  }, [props.message]);

  const getMessage = async () => {
    if (props.message.type === "media") {
      await props.message.media
        .getContentTemporaryUrl()
        .then((url) => {
          setValue({ ...state, mediaUrl: url });
        })
        .catch((e) => setValue({ ...state, mediaDownloadFailed: true }));
    }
  };
  // useEffect(() => {
  //   if (props.scrollToRequired && document.getElementById(props.scrollIntoView))
  //     document
  //       .getElementById(props.scrollIntoView)
  //       .scrollIntoView({ behavior: "smooth" });
  // }, []);

  const user =
    props.selectedChat &&
    props.selectedChat.users &&
    props.selectedChat.users.length
      ? props.selectedChat.users.find(
          (item) => item.identity !== props.identity
        )
      : { attributes: { friendlyName: "", profilePicImageUrl: "" } };
  const messageContainer =
    props.direction === "outgoing"
      ? props.message.type === "media"
        ? "rounded-xl"
        : "bg-blue-50 rounded-xl p-3.75"
      : props.message.type === "media"
      ? "rounded-xl"
      : "bg-grey-100 rounded-xl p-3.75 ";

  const messageParent =
    props.direction === "outgoing"
      ? "flex mt-5 justify-end text-white pr-5 pl-5  font-OpenSansRegular text-ft3 gap-3.25"
      : "flex mt-5 gap-3.25 pr-5  pl-5 flex-row-reverse justify-end	";

  return (
    <div id={props.message.sid} className={messageParent}>
      <div className={messageContainer}>
        <div>
          {props.message.type === "media" && (
            <Media hasFailed={state.mediaDownloadFailed} url={state.mediaUrl} />
          )}
        </div>
        {props.message.body}
      </div>
      <div className="w-10 h-10 flex rounded-50per overflow-hidden">
        <img
          // className={props.direction === "outgoing" ? "m-auto" : ""}
          className="m-auto w-full h-full"
          src={
            props.direction === "outgoing"
              ? props?.loggedInUser?.image ?? "/images/ic-accountsettings.svg"
              : user?.attributes?.profilePicImageUrl
              ? user?.attributes?.profilePicImageUrl
              : "/images/ic-accountsettings.svg"
          }
          alt="logged-user"
        />
      </div>
    </div>
  );
}

function Media(props) {
  const { hasFailed, url } = props;
  return (
    <div>
      {hasFailed && (
        <div>
          <p>Failed to load media</p>
        </div>
      )}

      {!hasFailed && url && (
        <div className="flex gap-3.25 h-30">
          <img src={url} />
        </div>
      )}
    </div>
  );
}

export default ConversationsMessages;

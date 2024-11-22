import React from "react";

const Message = () => {
  return (
    <div className="chat chat-end">
      {/* chat bubble from daisyUI */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="image"
            src={
              "https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-512.png"
            }
          />
        </div>
      </div>
      <div className={"chat-bubble text-white bg-blue-500"}>
        Hi! What is up?
      </div>
      <div className={"chat-footer opacity-50 text-xs flex gap-1 items-center"}>
       12:42
      </div>
    </div>
  );
};

export default Message;

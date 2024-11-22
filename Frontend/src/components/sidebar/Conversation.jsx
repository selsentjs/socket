import React from "react";

const Conversation = () => {
  return (
    <>
    <div className="flex gap-2 item-center hover:bg-sky-500 rounded p-2 py-2 cursor-pointer">
      {/* avatar */}
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img
            src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
            alt="user avatar"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200">
            Deepa
            <span className="text-xl">😆</span>
          </p>
        </div>
      </div>
      {/* //============================= */}
    </div>

    <div className="divider my-0 py-0 h-1">

    </div>
    </>
  );
};

export default Conversation;

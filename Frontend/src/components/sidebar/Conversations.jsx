import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";

const Conversations = () => {
  // get all the user details from database
  // it will not show logged in user details
  const { loading, conversations } = useGetConversations();
  console.log("conversations:", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((item, idx) => (
        <Conversation
          key={item._id}
          conversation={item}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;

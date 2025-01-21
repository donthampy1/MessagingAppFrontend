import ScrollableFeed from "react-scrollable-feed";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

const ChatMessages = ({ messages }: { messages: any[] }) => {
  const user = useSelector((state: RootState) => state.user);

  const isSameSender = (messages: any[], m: any, i: number, userId: string) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  const isLastMessage = (messages: any[], i: number, userId: string) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  return (
    <ScrollableFeed className="overflow-y-auto flex flex-col bg-black p-2 rounded-md justify-end ">
      {" "}
      {messages &&
        messages.map((m, i) => (
          <div className="flex" key={m._id}>
            {isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id) ? (
              <Avatar>
                <AvatarImage src={m.sender.picture} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <div className="p-5" />
            )}
            <div
              className={`flex  w-full ${
                m.sender._id === user._id ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`p-1 rounded-lg max-w-xs break-words ${
                  m.sender._id === user._id
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {m.content}
              </span>
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ChatMessages;

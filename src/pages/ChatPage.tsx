import { useEffect, useState } from "react";
import axios from "axios";

interface Users {
  name: string;
  email: string;
}

interface Chat {
  isGroupChat: Boolean;
  users: Users[];
  _id: string;
  chatName: string;
}

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await axios.get<Chat[]>(
        "http://localhost:2500/api/chat"
      );
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(chats);

  return (
    <div>
      <h1> ChatName</h1>
      {!loading &&
        chats?.map((chat) => <div key={chat._id}>{chat.chatName}</div>)}
    </div>
  );
};

export default ChatPage;

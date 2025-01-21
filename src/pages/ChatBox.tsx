import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { Mic } from "lucide-react";
import ChatMessages from "@/components/ChatMessages";
import io, { Socket } from "socket.io-client"
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useDispatch } from 'react-redux';
import { addNotification, removeNotification, clearNotifications } from '../store/notificationSlice';



const EndPoint = "http://localhost:2500"
let socket: Socket<any>,selectedChatCompare: { _id: any; }







const ChatBox = () => {
  const selectedChat = useSelector(
    (state: RootState) => state.currentChat.selectedChat
  );
  const user = useSelector((state: RootState) => state.user);
  const notification = useSelector((state: RootState) => state.notifications.notifications);
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewmessage] = useState("");
  const { getToken } = useAuth();
  const [socketConnected, setSocketConnected] = useState<Boolean>(false)
    const dispatch = useDispatch();
    


 useEffect(() => {
  socket = io(EndPoint)
  console.log("kjnjd",user)
  socket.emit("setup", user)
  socket.on("connected",()=> setSocketConnected(true))
  
}, [])


  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const token = await getToken();
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2500/api/message/${selectedChat._id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          withCredentials: true,
        }
      );
      setMessages(response.data);
      console.log(response.data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id)
      console.log("connected to room")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat
  }, [selectedChat]);

  const getChatName = () => {
    if (selectedChat.isGroupChat) {
      return selectedChat.chatName;
    } else {
      const userId = user._id;
      const otherUser = selectedChat.users.find(
        (user: any) => user._id !== userId
      );
      return otherUser ? otherUser.username : "Unknown User";
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("jk jdsh fjvhbdhb");
    console.log(newMessage.length, newMessage);
    if (!newMessage) {
      console.log("enter message");
      return;
    }
    try {
      setNewmessage("");
      const token = await getToken(); // Get the JWT
      const response = await axios.post(
        `http://localhost:2500/api/message/${selectedChat._id}`,
        {
          content: newMessage,
          chatId: selectedChat._id,
          init: user._id,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          withCredentials: true,
        }
      );
      console.log(response.data,"llllll");
      setNewmessage("");
      socket.emit("new message", response.data)
      setMessages([...messages, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const setMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewmessage(e.target.value);
  };


 




useEffect(() => {
  socket.on("message recieved", (newMessageRecieved:any) => {
    if (selectedChatCompare && selectedChatCompare._id === newMessageRecieved.chat._id) {
 setMessages([...messages, newMessageRecieved])    }
  })

  
},[])




  





  return (
    <>
     <Card className="w-2/3 flex flex-col relative"> {/* Added relative here */}
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>
                            {selectedChat ? getChatName() : <p>My Chats</p>}
                        </CardTitle>
                    </div>
                </CardHeader>

               <CardContent className="overflow-y-auto h-full  flex flex-col"> {/* Example fixed height for the scrollable container */}
  {/* Your Chat Messages Component Here */}
  <div className=" overflow-y-auto h-full">
    <ChatMessages messages={messages} />
  </div>
</CardContent>



                {/* Form Section - Absolutely positioned at Bottom */}
                <CardFooter className="  "> {/* Added absolute positioning */}
                    <form
                        onSubmit={handleMessageSubmit}
                        className="flex items-center  h-full w-full space-x-2"
                    >
                        <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setMessage(e)}
                            className=""
                        />
                        <Button>
                            <Mic />
                        </Button>
                        <Button type="submit">
                            <SendHorizontal />
                        </Button>
                    </form>
                </CardFooter>
            </Card>



    </>
  );
};

export default ChatBox;

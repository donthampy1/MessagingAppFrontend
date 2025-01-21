import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {  SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import ScrollableFeed from 'react-scrollable-feed';


interface AiChatComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AiChatComponent: React.FC<AiChatComponentProps> = ( { open,
  onOpenChange,}) => {
  const [query, setQuery] = useState<any>()
  const { getToken } = useAuth();
    const [chatHistory, setChatHistory] = useState<any>([])



  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!query){
      return
    }
try{

     
      const token = await getToken();
        setQuery("");

      const response = await axios.post(
  `https://messagingappbackend-4.onrender.com/api/aichat/`,
  {  
    history: chatHistory,
    query: query,
  },
  {  
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }
);

    setChatHistory((oldChatHistory: any) => [...oldChatHistory, {
      role: "user",
      parts: [query]
    },
    {
      role: "model",
      parts: [response.data]
    }
  ])
  console.log(response.data, chatHistory)
  }catch(error){
    console.log(error)
  }
}



  return (
    <Dialog open={open} onOpenChange={onOpenChange} > {/* You might want to control this with state */}
      <DialogContent className="w-[1000px]  h-5/6 p-6 bg-white rounded-lg shadow-lg flex flex-col"> {/* Added flex column */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">AI Chat</DialogTitle>
          
        </DialogHeader>

       <ScrollableFeed className="flex flex-col justify-end overflow-y-auto p-4 bg-gray-200 rounded-lg">
          {chatHistory.map((message:any, index:number) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-md ${
                message.role === "user"
                  ? "bg-black text-white self-end"
                  : "bg-black text-white self-start"
              }`}
            >
              {message.parts.map((part:any, partIndex:number) => (
                <p key={partIndex} >
                  {part}
                </p>
              ))}
            </div>
          ))}
        </ScrollableFeed>
        <div className="flex-grow">
        </div>
        <DialogFooter>
          <form onSubmit={handleQuerySubmit} className="flex items-center w-full space-x-2">
            <Input placeholder="Type your message..." className="flex-grow" value={query}
                            onChange={(e) => setQuery(e.target.value)} /> 
            
            <Button type="submit">
              <SendHorizontal />
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiChatComponent;
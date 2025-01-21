import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {  SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface AiChatComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AiChatComponent: React.FC<AiChatComponentProps> = ( { open,
  onOpenChange,}) => {
  const [query, setQuery] = useState<any>()
  const { getToken } = useAuth();
    const user = useSelector((state: RootState) => state.user);
    const [chatHistory, setChatHistory] = useState<any>([])



  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!query){
      return
    }
try{
        console.log(chatHistory)

  console.log('startted', query, chatHistory)
     
      const token = await getToken(); // Get the JWT
        setQuery("");

      const response = await axios.post(
  `http://localhost:2500/api/aichat/`,
  {  // Sending data in the request body
    history: chatHistory,
    query: query,
  },
  {  // Configuratilike headers go here
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }
);

    console.log("jnkj", query)
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
      <DialogContent className="w-[1000px] h-5/6 p-6 bg-white rounded-lg shadow-lg flex flex-col"> {/* Added flex column */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">AI Chat</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        {/* Added a div to contain the content and push the footer down */}
        <div className="flex-grow">
        {/* Add your main content here if needed */}
        </div>
        <button onClick={() => console.log(chatHistory)}>checj</button>
        <DialogFooter>
          <form onSubmit={handleQuerySubmit} className="flex items-center w-full space-x-2">
            <Input placeholder="Type your message..." className="flex-grow" value={query}
                            onChange={(e) => setQuery(e.target.value)} /> {/* Added flex-grow to input */}
            
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
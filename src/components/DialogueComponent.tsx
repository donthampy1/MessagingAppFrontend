import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import UserListItem from "./ui/UserListItem";
import { setChat } from "../store/chatSlice";

interface UserState {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface DialogComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogComponent: React.FC<DialogComponentProps> = ({
  open,
  onOpenChange,
}) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const user: UserState | null = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    setLoading(true);
    if (!user) {
      console.error("User ID is missing");
      return;
    }
    const { _id } = user;
    console.log(_id);
    try {
      const token = await getToken(); 
      const response = await axios.get(
        `https://messagingappbackend-4.onrender.com/api/user/search?search=${search}&userId=${user._id}`, 
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setSearchResult(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const accessChat = async (userId: string) => {
    const token = await getToken();
    const init = user._id;
    try {
      const response = await axios.post(
        `https://messagingappbackend-4.onrender.com/api/chat`,
        { userId, init }, 
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json", 
          },
          withCredentials: true,
        }
      );
      dispatch(setChat(response.data));

      console.log(response.data, "Response from server");
      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error); 
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className=" w-96">
        <DialogHeader>
          <DialogTitle> Add new contacts</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleSearch}> Search</Button>
        </div>
        <div>
          {loading ? (
            <p className="text-center">Loading</p>
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;

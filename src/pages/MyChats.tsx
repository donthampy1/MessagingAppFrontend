import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserListItem from "@/components/ui/UserListItem";
import UserBadge from "@/components/ui/UserBadge";

interface UserState {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

const MyChats = () => {
  const user: UserState | null = useSelector((state: RootState) => state.user);
  const { getToken } = useAuth();
  const [chatdatas, setchatdatas] = useState<any>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groupChatName, setgroupChatName] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<UserState[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserState[]>([]);

  console.log(user._id, "uhbuhbub");

  const fetchChats = async () => {
    try {
      console.log(user._id);
      const token = await getToken(); // Get the JWT
      console.log(token, "tokenjdhvh ");
      const response = await axios.get(
        `http://localhost:2500/api/chat?userId=${user._id}`, // userId as query parameter
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          withCredentials: true,
        }
      );
      setchatdatas(response.data);
      console.log(response.data, "chats");
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchChats();
    }
  }, [user]);
  const getSender = (user: UserState, users: any[]) => {
    return users[0]._id === user._id ? users[1].username : users[0].username;
  };

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const token = await getToken(); // Get the JWT
      console.log(token, "tokenjdhvh ");
      const response = await axios.get(
        `http://localhost:2500/api/user/search?search=${search}&userId=${user._id}`, // userId as query parameter
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          withCredentials: true,
        }
      );
      console.log(response.data, "kkhb");
      setSearchResult(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    console.log("ldjbg");
  };
  const handleGroup = (user: UserState) => {
    console.log("ldjbg", user);
    if (selectedUsers.includes(user)) {
      return;
    }
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
  };
  const handleDelete = (user: UserState) => {
    console.log(user);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Chats</CardTitle>
            <Button onClick={() => setIsDialogOpen(true)}>
              New Group Chat
            </Button>
          </div>
        </CardHeader>

        {chatdatas ? (
          <CardContent>
            {chatdatas.map((chat: any, index: number) => (
              <Alert
                key={index}
                className="flex items-center space-x-4 p-2 cursor-pointer"
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User Avatar"
                  />
                </Avatar>

                <div className="flex flex-col">
                  <AlertTitle className="font-semibold">
                    {!chat.isGroupChat
                      ? getSender(user, chat.users)
                      : chat.chatName}
                  </AlertTitle>
                  <AlertDescription className="text-sm text-gray-500">
                    {user.email}
                  </AlertDescription>
                </div>
              </Alert>
            ))}
          </CardContent>
        ) : (
          <CardContent>
            <p>Loading...</p>
          </CardContent>
        )}
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={true}>
        <DialogContent className=" w-96">
          <DialogHeader>
            <DialogTitle> Create new groupchat</DialogTitle>
          </DialogHeader>
          <div className="gap-2">
            <form>
              <Input
                placeholder="Chat Name"
                onChange={(e) => setgroupChatName(e.target.value)}
              />

              {selectedUsers.map((user) => (
                <UserBadge
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}

              <Input
                placeholder="Add Users"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <p>render selected users </p>
              {loading ? (
                <p>Loading...</p>
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
              <Button onClick={handleSubmit}> Create</Button>
            </form>
          </div>
          <div></div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyChats;

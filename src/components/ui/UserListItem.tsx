import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Avatar,  AvatarImage } from "@/components/ui/avatar"


interface UserState {
  picture: string | undefined;
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface UserListItemProps {
  user: UserState;
  handleFunction: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, handleFunction }) => {
  return (
     <Alert onClick={handleFunction} className="flex items-center space-x-4 p-2 cursor-pointer">
      <Avatar>
        <AvatarImage src={user.picture} alt="User Avatar" />
      </Avatar>

      <div className="flex flex-col">
        <AlertTitle className="font-semibold">{user.username}</AlertTitle>
        <AlertDescription className="text-sm text-gray-500">{user.email}</AlertDescription>
      </div>
    </Alert>
  );
};

export default UserListItem

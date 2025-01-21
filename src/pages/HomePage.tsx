
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from 'axios'
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";

const HomePage = () => {

  const { user } = useUser()
  const dispatch = useDispatch();


  useEffect(() => {
    if (user) {
      const sendUserData = async () => {
        
        try {
          const userData = {
            email: user.emailAddresses[0]?.emailAddress,
            username: user.username || user.firstName,
            picture: user.imageUrl, 
          }
          const response = await axios.post('http://localhost:2500/api/user/login', userData);
          console.log('User data sent successfully:', response.data);
                    dispatch(setUser(response.data.user));
                    

        } catch (error) {
          console.error('Error sending user data:', error);
        }
      };

      sendUserData();
    }
  }, [user]);

  
  return (
     <SidebarProvider open={false}>
      <AppSidebar className="bg-black" />
      <SidebarInset>
        
       
        <div className="flex h-screen border-black p-10 bg-black justify-between gap-4 ">
           <MyChats/>
           <ChatBox/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default HomePage
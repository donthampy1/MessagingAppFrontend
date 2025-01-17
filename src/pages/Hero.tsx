import { Button } from "@/components/ui/button";
import {
  SignedOut,
  SignInButton,
  
  useAuth,
  useUser,
} from "@clerk/clerk-react";

const Hero = () => {
  console.log(useAuth, useUser, "nhhjjhjb");
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to OurChat</h1>
        <p className="text-xl mb-6">Start chatting with your friends.</p>
        <SignedOut>
          <SignInButton>
            <Button className="bg-black">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default Hero;

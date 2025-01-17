import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center  justify-between px-36 py-4 h-15  shadow">
        <div className="text-lg font-bold flex justify-start items-center">
          <img
            src="https://res.cloudinary.com/dzxzgnnax/image/upload/v1736777040/gaotqvkascz55eej3mh5.png"
            className="h-8 w-auto"
          />
          <p className="pl-1">OurChat</p>
        </div>
        <SignedOut>
          <SignInButton>
            <Button className="bg-black">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </nav>
    </div>
  );
};

export default Navbar;

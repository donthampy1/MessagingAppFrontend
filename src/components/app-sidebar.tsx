import * as React from "react";

import { UserButton, SignOutButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import DialogComponent from "./DialogueComponent";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon" className="flex bg-black" {...props}>
        <SidebarHeader>
          
        </SidebarHeader>
        <SidebarContent>
          <div className="">
            <UserButton />
            <Button variant="ghost" onClick={() => setIsDialogOpen(true)}>
              <Avatar>
                <AvatarImage
                  src="https://res.cloudinary.com/dzxzgnnax/image/upload/v1737018856/uhogqae6nkjmgkip92g0.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <SignOutButton>
              <img
                src="https://res.cloudinary.com/dzxzgnnax/image/upload/v1736950222/g96nut8r4s7clqkw4f2n.png"
                alt="@shadcn"
              />
          </SignOutButton>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <DialogComponent open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}

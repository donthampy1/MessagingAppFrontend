import * as React from "react";

import { UserButton, SignOutButton } from "@clerk/clerk-react";
import DialogComponent from "./DialogueComponent";
import { useState } from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import AiChatComponent from "./AiChatComponent";
import { UserPlus, Bot, LogOut } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="" 
        {...props}
      >
        <SidebarContent className="flex flex-col items-center justify-center">
          <div className="flex flex-col bg-white p-4  rounded-xl text-lg space-y-4">
            <UserButton />
            <UserPlus
              onClick={() => setIsDialogOpen(true)}
              className="h-6 w-6  cursor-pointer"
            />
            <Bot
              onClick={() => setIsAiChatOpen(true)}
              className="h-6   w-6 cursor-pointer"
            />
            <SignOutButton>
              <LogOut className="h-6   w-6 cursor-pointer" />
            </SignOutButton>
          </div>
        </SidebarContent>
      </Sidebar>
      <DialogComponent open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <AiChatComponent open={isAiChatOpen} onOpenChange={setIsAiChatOpen} />
    </>
  );
}

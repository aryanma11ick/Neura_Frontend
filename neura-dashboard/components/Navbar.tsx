"use client";

import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between px-6 py-3 border-b border-border/50 bg-background/60 backdrop-blur-lg sticky top-0 z-50"
    >
      {/* Left: Logo / Title */}
      <div className="flex items-center gap-2">
        <CalendarDays className="text-indigo-500 w-6 h-6" />
        <span className="font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Neura Dashboard
        </span>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={session?.user?.image || ""}
                  alt={session?.user?.name || "User"}
                />
                <AvatarFallback>
                  {session?.user?.name
                    ? session.user.name[0].toUpperCase()
                    : "?"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 bg-popover/90 backdrop-blur-xl">
            <DropdownMenuLabel className="font-medium">
              {session?.user?.name || "User"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 text-red-500 focus:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.nav>
  );
}

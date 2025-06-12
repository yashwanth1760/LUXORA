import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {

  await checkUser();

  

  return (
    <div className="fixed top-0 w-full bg-white/80 px-4 py-2 backdrop-blur-md z-50 border-b flex items-center justify-between">
      <nav className="flex items-center gap-4">
        <Link href="/">
          <Image
            src={"/logocom.png"}
            alt="luxora logo"
            height={30}
            width={100}
            className="h-12 object-contain w-auto"
          />
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <SignedIn>
          <Link
            className="text-gray-600 hover:text-blue-600 flex justify-center gap-2"
            href={"/dashboard"}
          >
            <Button variant="outline">
              <LayoutDashboard size={18} />
              <span className="hidden md:inline ">Dashboard</span>
            </Button>
          </Link>
          <Link
            className="text-gray-600 hover:text-blue-600 flex justify-center gap-2"
            href={"/transaction/create"}
          >
            <Button>
              <PenBox size={18} />
              <span className="hidden md:inline ">Add Transaction</span>
            </Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton appearance={{ elements: { avatarBox: "w-20 h-20" } }} />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;

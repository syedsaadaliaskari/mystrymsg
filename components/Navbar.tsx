"use client";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <>
      <nav className="px-4 md:p-4 shadow-lg relative">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center  ">
          <a className="font-bold text-lg mb-4 md:mb-0 " href="/">
            Mystry Message
          </a>

          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm md:text-base">
                Welcome,{" "}
                <strong className="block md:inline">
                  {session.user?.username || session.user?.email}
                </strong>
              </span>
              <Button
                variant="destructive"
                className="w-full md:w-auto"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/signIn" className="w-full md:w-auto">
              <Button className="w-full">Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

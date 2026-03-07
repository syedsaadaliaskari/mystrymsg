import Image from "next/image";
import Link from "next/link"; // Use Link for internal navigation
import { Button } from "@/components/ui/button"; // Assuming you have shadcn button
import "@/globals.css";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-6">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-12 py-20 px-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 sm:items-start">
        {/* Logo Section */}
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={24}
          priority
        /> */}

        {/* Text Content */}
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 lg:text-5xl">
            Whisper your thoughts, <br />
            <span className="text-zinc-500">completely anonymous.</span>
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Welcome to Mystery Message. Dive into a world of honest feedback and
            secret conversations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-4 sm:flex-row sm:w-auto">
          <Link href="/signUp">
            <Button className="h-12 px-8 rounded-full w-full sm:w-auto">
              Get Started
            </Button>
          </Link>

          {/* <Link href="https://nextjs.org/docs" target="_blank">
            <Button
              variant="outline"
              className="h-12 px-8 rounded-full w-full sm:w-auto"
            >
              Documentation
            </Button>
          </Link> */}
        </div>
      </main>
    </div>
  );
}

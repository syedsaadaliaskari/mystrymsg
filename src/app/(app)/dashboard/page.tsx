"use client";

import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/src/model/User.model";
import { isAcceptingMessagesSchema } from "@/src/schemas/isAcceptingMessages";
import { ApiResponse } from "@/src/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import messagesData from "./message.json";

const Dashboard = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(isAcceptingMessagesSchema),
  });

  const { watch, register, setValue } = form;

  const handleDeleteMessage = (messageId: string) => {
    setMessages((messages) =>
      messages.filter((message) => String(message._id) !== messageId),
    );
  };

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.get("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to fetch messages",
      );
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);

      try {
        const response = await axios.get("/api/get-user-messages");
        console.log("Check this:", response.data); // Look at your browser console for this!
        setMessages(response.data.messages || []);

        if (refresh) {
          toast.success("Showing latest messages", {
            position: "top-right",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(
          axiosError.response?.data.message || "Failed to fetch messages",
          {
            position: "top-right",
          },
        );
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages],
  );

  useEffect(() => {
    if (!session?.user) return;

    const loadData = async () => {
      await fetchAcceptMessages();
      await fetchMessages();
    };

    loadData();
  }, [session, fetchAcceptMessages, fetchMessages]);
  // Removed setValue from here to keep the array length stable

  const handleSwitch = async () => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);
      toast.success(
        response.data.message || "Successfully updated message status",
      );
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to fetch messages",
        {
          position: "top-right",
        },
      );
    }
  };

  // 1. Create a variable that works everywhere
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const profileUrl = `${baseUrl}/user/${session?.user.username}`;

  const router = useRouter();
  const copytoClipboard = async () => {
    await window.navigator.clipboard.writeText(profileUrl);

    toast.message("Copied to clipboard", {
      position: "top-right",
    });

    router.replace(`/user/${session?.user.username}`);
  };

  if (!session || !session.user) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div className="text-3xl font-bold tracking-tight py-2 mt-2">
        User Dashboard
      </div>

      <h1 className="py-2 font-semibold tracking-tight">
        Copy your Unique Link
      </h1>
      <div>
        <input
          type="text"
          placeholder={profileUrl}
          disabled
          className="w-3/4 shadow rounded-sm outline-none p-1.75 mr-2"
        />
        <Button onClick={copytoClipboard}>Copy</Button>
      </div>

      <Switch
        className="my-2.5 mr-2"
        {...register("acceptMessages")}
        checked={acceptMessages}
        onCheckedChange={handleSwitch}
        disabled={isSwitchLoading}
      />
      <span>Accept Messages:{acceptMessages ? "on" : "off"}</span>

      <div>
        <Button
          className="mt-4 ml-4"
          variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCcw className="w-4 h-4 " />
          )}
        </Button>
      </div>

      <div className="mt-4 grid  grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={message._id.toString()}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;

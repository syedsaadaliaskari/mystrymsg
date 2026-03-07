"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mesageSchema } from "@/src/schemas/messageSchema";
import { ApiResponse } from "@/src/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SendMessage = () => {
  const { username } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAcceptingMessages, setIsAcceptingMessages] = useState(true);

  const form = useForm<z.infer<typeof mesageSchema>>({
    resolver: zodResolver(mesageSchema),
    defaultValues: {
      content: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(
          `/api/accept-messages?username=${username}`,
        );

        setIsAcceptingMessages(response.data.isAcceptingMessages);
      } catch (error) {
        console.error("Error checking status", error);

        const axiosError = error as AxiosError<ApiResponse>;

        toast.error(
          axiosError.response?.data.message ||
            "Error while checking user status",
          {
            position: "bottom-right",
          },
        );
      }
    };
    checkStatus();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof mesageSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        content: data.content,
        username,
      });

      toast.message(response.data?.message || "Message sent successfully", {
        position: "bottom-right",
      });

      form.reset();
      router.refresh();
      router.replace("/message-sent");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message || "Error while sending message",
        {
          position: "bottom-right",
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      {/* Replace your form logic with this conditional view when not accepting */}
      {!isAcceptingMessages ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
          <div className="bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🤫</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Shhh... @{username} is resting
          </h2>
          <p className="text-gray-500 mt-2 mb-6 max-w-sm mx-auto">
            This user has temporarily paused anonymous messages. Check back
            later!
          </p>
          <Button variant="outline" onClick={() => router.push("/")}>
            Explore other profiles
          </Button>

          {!isAcceptingMessages && (
            <Button
              variant="ghost"
              className="mt-2 text-blue-600"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Profile link copied!");
              }}
            >
              Copy profile link to check later
            </Button>
          )}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Send message to @${username}`}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        isAcceptingMessages
                          ? "Write your anonymous message here..."
                          : "User is not accepting messages"
                      }
                      className="resize-none"
                      disabled={!isAcceptingMessages}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting || !isAcceptingMessages}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SendMessage;

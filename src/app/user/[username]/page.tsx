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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Textarea } from "@/components/ui/textarea";

const SendMessage = () => {
  const { username } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof mesageSchema>>({
    resolver: zodResolver(mesageSchema),
    defaultValues: {
      content: "",
    },
  });

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
                    placeholder="Write your anonymous message here..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit" disabled={isSubmitting}>
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
    </div>
  );
};

export default SendMessage;

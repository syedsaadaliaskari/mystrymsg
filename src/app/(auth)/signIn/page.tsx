"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/src/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function SignIn() {
  // Removed (request: Request)
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    // 1. Trigger the NextAuth sign-in flow
    const result = await signIn("credentials", {
      redirect: false, // Prevents automatic redirect so we can handle errors
      identifier: data.identifier,
      password: data.password,
    });

    // 2. Handle Errors
    // Replace your error check with this to see what's actually happening
    if (result?.error) {
      console.log("Auth Error:", result.error);
      if (result.error !== "CredentialsSignin") {
        // Only show toast if it's a real error
        toast.error("Invalid credentials");
      }
    }

    // 3. Handle Success
    // 3. Handle Success
    if (result?.ok) {
      // Check for 'ok' instead of 'url'
      toast.success("Welcome back!");

      // Give the session a tiny moment to stabilize before redirecting
      setTimeout(() => {
        window.location.replace("/dashboard");
        console.log("Redirecting to dashboard...");
        router.refresh(); // Forces Next.js to check the session again
      }, 100);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md ">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
            Join Mystery Message
          </h1>
          <p className="text-gray-600">
            Login to continue your anonymous journey
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-1/4 ml-8">
              SignIn
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

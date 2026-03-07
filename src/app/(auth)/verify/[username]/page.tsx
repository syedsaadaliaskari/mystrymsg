"use client";
import { ApiResponse } from "@/src/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema } from "@/src/schemas/verifySchema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyAccount = () => {
  const params = useParams<{ username: string }>();
  const router = useRouter();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post("/api/verify", {
        username: params.username,
        code: data.code,
      });

      toast.success(response.data.message || "Account verified Successfully", {
        position: "bottom-right",
        style: {
          backgroundColor: "#000000",
          color: "#10b981", // Tailwind Emerald-500
          border: "1px solid #10b981",
        } as React.CSSProperties,
      });

      router.replace("/signIn");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError?.response?.data.message;

      toast.error(errorMessage || "Error while user verification", {
        position: "bottom-right",
        style: {
          backgroundColor: "#000000",
          color: "#ef4444", // Tailwind Red-500
          border: "1px solid #ef4444",
        } as React.CSSProperties,
      });
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 py-8 bg-white rounded-lg shadow-md ">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Enter Verification code
            </h1>
            <p className="mb-4">Enter the verification sent to your email</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="code" // This must match your schema key
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification code</FormLabel>
                    <FormControl>
                      <Input placeholder="enter code here" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;

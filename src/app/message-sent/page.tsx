"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle, Home, MessageSquarePlus } from "lucide-react";

export default function MessageSentPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="bg-green-50 p-6 rounded-full mb-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Message Delivered!
      </h1>

      <p className="text-gray-600 text-lg mb-10 max-w-md">
        Your anonymous message has been successfully sent. Your identity remains
        a secret!
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => router.push("/")}
          variant="default"
          className="flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Go to Home
        </Button>

        <Button
          onClick={() => router.back()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Send Another
        </Button>
      </div>
    </div>
  );
}

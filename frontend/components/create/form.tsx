"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useRef } from "react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character!",
  }),
  content: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  media: z.array(z.any()).optional(),
});

export function CreateForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      media: [],
    },
  });

  const handleFileChange = () => {
    if (fileInputRef.current) {
      const files = fileInputRef.current.files;
      if (files && files.length > 5) {
        setFileError("You can only upload up to 5 files.");
        fileInputRef.current.value = ""; 
      } else {
        setFileError(null);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      // Check if file input has files
      if (
        fileInputRef.current &&
        fileInputRef.current.files &&
        fileInputRef.current.files.length > 0
      ) {
        Array.from(fileInputRef.current.files).forEach((file) => {
          formData.append("media", file);
        });
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create_event`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error creating form!");
      }

      const resData = await response.json();

      form.reset();

      // Wait for 2 seconds before redirecting
      await new Promise((r) => setTimeout(r, 2000));

      // Redirect to the event page
      window.location.href = `${process.env.NEXT_PUBLIC_EVENT_URL}/${resData.event_id}`;
    } catch (error) {
      console.error("Error when creating form!", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center items-center w-full">
          <Button
            className="w-full rounded-lg bg-slate-600 h-9 hover:bg-gray-400 text-white hover:text-slate-900 transition ease-in-out duration-150 uppercase tracking-widest font-light border-none mt-2"
            variant="outline"
          >
            Create Room
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Room!</DialogTitle>
          <DialogDescription>
            Fill in the fields and submit to create a voting room.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <div className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Event..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="This is my first event..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="media"
                render={() => (
                  <FormItem>
                    <FormLabel>Media</FormLabel>
                    <FormControl>
                      <Input
                        id="media"
                        type="file"
                        ref={fileInputRef}
                        multiple 
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <p className="ml-1 text-xs text-muted text-gray-400">maximum 5 files allowed</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

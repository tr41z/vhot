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
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character!",
  }),
  content: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  media: z.any(), // We'll handle the file validation separately
});

export function CreateForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      media: null,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      // Check if file input has a file
      if (
        fileInputRef.current &&
        fileInputRef.current.files &&
        fileInputRef.current.files.length > 0
      ) {
        formData.append("media", fileInputRef.current.files[0]);
      }

      const response = await fetch("http://localhost:3001/api/v1/create_event", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
       throw new Error("Error creating form!");
      }

      form.reset();
      toast({
        title: "Success",
        description: "Form submitted successfully.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error when creating form!", error);
      toast({
        title: "Error",
        description: "Error creating form. Please try again later.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center items-center w-full">
          <Button
            className="w-full rounded-lg bg-slate-600 h-9 hover:bg-gray-400 hover:text-slate-900 transition ease-in-out duration-150 uppercase tracking-widest font-light border-none mt-2"
            variant="outline"
          >
            Create Room
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
          <DialogDescription>
            Fill in the fields and send me an email!
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
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input id="media" type="file" ref={fileInputRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                Submit
              </Button>
            </form>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

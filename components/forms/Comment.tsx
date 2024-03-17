"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, HtmlHTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { CommentValidation } from "@/lib/validations/Thread";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import Thread from "@/lib/models/thread.model";

interface Params {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Params) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(threadId,values.thread, JSON.parse(currentUserId),pathname) ;

    form.reset() ;
  };

  return (
    <Form {...form}>
      <form
        className="comment-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                <Image
                    src={currentUserImg}
                    alt="profile photo"
                    width={45}
                    height={45}
                    className="rounded-full object-contain cursor-pointer"
                />
              </FormLabel>
              <FormControl className="no-focus border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="comment..."
                  className="text-light-1 outline-none no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;

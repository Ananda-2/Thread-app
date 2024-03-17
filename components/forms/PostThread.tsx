"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, HtmlHTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThreadValidation } from "@/lib/validations/Thread";
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
import { CreateThread } from "@/lib/actions/thread.actions";



// interface Props {
//   user: {
//     id: string;
//     objectId: string;
//     username: string;
//     name: string;
//     bio: string;
//     image: string;
//   };
//   btnTitle: string;
// }



function PostThread({userId }:{userId:string }) {

    const router = useRouter();
    const pathname = usePathname();
  
    const form = useForm<z.infer<typeof ThreadValidation>>({
      resolver: zodResolver(ThreadValidation),
      defaultValues: {
        thread : '' ,
        accountId : userId ,
      },
    });
  
    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        
      await CreateThread({
          text : values.thread ,
          author : userId ,
          communityId : null ,
          path : pathname 

        }) ;

      router.push('/') ;
    };
  
    return (
        <Form {...form}>
          <form
            className="flex flex-col justify-start gap-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="thread"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Create
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      className="account-form_input no-focus resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <Button type="submit" className="bg-primary-500">
              Post Thread
            </Button>
          </form>
        </Form>
      );
}


export default PostThread ;
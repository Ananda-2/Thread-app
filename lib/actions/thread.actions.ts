"use server"; // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMP

import connectToDB from "./mongoose";
import { Types } from "mongoose";
import mongoose from "mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function CreateThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  connectToDB();

  const createThread = await Thread.create({
    text,
    author,
    communityId: null,
  });

  // update user model also

  await User.findByIdAndUpdate(author, {
    $push: { threads: createThread._id },
  });

  revalidatePath(path);
}

export async function fetchPost(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;
  const postQuery = Thread.find({
    parentId: {
      $in: [null, undefined],
    },
  })
    .sort({ createdAt: "desc" })
    .limit(skipAmount)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostCount = await Thread.countDocuments({
    parentId: {
      $in: [null, undefined],
    },
  });

  const posts = await postQuery.exec();

  const isNext = totalPostCount > skipAmount + posts.length;

  return { posts, isNext };
}

export async function fetchThreadById(ThreadId: string) {
  connectToDB();

  try {
    // TODO : Populate community
    const thread = await Thread.findById(ThreadId)
      .populate({
        path: "author",
        model: User,
        select: " _id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();
    return thread;
  } catch (error: any) {
    throw new Error(`Error while fetch thread : ${error.message}`);
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // find original thread first
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) throw new Error("Thread not found");

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    const saveCommentThread = await commentThread.save();

    // update original thread
    originalThread.children.push(saveCommentThread._id);

    await originalThread.save();
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`error in comment - ${error.message}`);
  }
}


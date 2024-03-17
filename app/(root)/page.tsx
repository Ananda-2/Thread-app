import { fetchPost } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {
  const result = await fetchPost();
  // console.log(result.posts[0].author);
  const user = await currentUser();
  return (
    <div>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-10 gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No Thread Found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}

import { fetchUser } from "@/lib/actions/user.actions";
import getActivity from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { setUncaughtExceptionCaptureCallback } from "process";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // fetch activity
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length === 0 ? (
          <p className="text-gray-1 ">No Activity Yet</p>
        ) : (
          <>
            {activity.map((activity) => (
              <Link key={activity.id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="profile picture"
                    height={20}
                    width={20}
                    className="rounded-full"
                  />
                  <p className = '!text-small-regular text-light-1'>
                    <span className=" text-blue ">
                      {activity.author.name}
                    </span> {" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        )}
      </section>
    </section>
  );
};

export default page;

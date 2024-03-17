"use client";
import { sidebarLinks } from "@/constants/index.js";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
// import Router from 'next/router';
import "@/app/globals.css";

function LeftSidebar() {
  const router = useRouter();
  const pathName = usePathname();
  const {userId} = useAuth() ;

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const Active =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName === link.route;
        if(link.route === '/profile')   link.route = `/profile/${userId}`

          return (
            <Link
              href={link.route}
              key={link.label}
              className={` leftsidebar_link ${Active && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className=" text-light-1 max-lg:hidden pl-4 py-1 ">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className=" mt-10 p-6 ">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden ">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;

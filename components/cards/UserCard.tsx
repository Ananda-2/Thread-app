'use client'

import Image from "next/image";
import { userAgent } from "next/server";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  const router = useRouter();

  return (
    <article className="user-class">
      <div className="user-card_avatar">
        <Image
          src={imgUrl}
          alt={name}
          height={48}
          width={48}
          className="rounded-full "
        />

        <div className="flex-1 text-ellipsis">
          <h4 className="text-light-1 text-base-semibold">{name}</h4>
          <h4 className="text-gray-1 text-small-medium ">@{username}</h4>
        </div>
        <Button
          className="user-card_btn"
          onClick={() => router.push(`/profile/${id}`)}
        >
          view
        </Button>
      </div>
    </article>
  );
};

export default UserCard;

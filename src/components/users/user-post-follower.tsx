"use client";

import { localDate } from "@/common/helpers/local-date";
import { Card, CardContent } from "@/common/shadcn/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/common/shadcn/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/shadcn/tabs";
import { Ellipsis, ListCollapse } from "lucide-react";
import Image from "next/image";
import React from "react";
import LikePost from "../posts/like-post";
import TotalCommentPost from "../posts/total-comment-post";

interface Props {
  postProfile: {
    id: string;
    caption: string;
    created_at: string;
    media: {
      id: string;
      url: string;
      type: string;
    }[];
    user: {
      profile: {
        name: string;
        avatar_image: string;
      };
    };
    like: {
      id: string;
      user_id: string;
      post_id: string;
    }[];
  }[];
  auth: {
    user: {
      id: string;
    };
  };
}

export default function UserPostFollower({ postProfile, auth }: Props) {
  const [expandedMap, setExpandedMap] = React.useState<{
    [postId: string]: boolean;
  }>({});

  return (
    <>
      {postProfile.map((post) => (
        <Card className="w-full border" key={post.id}>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Image
                  src={post.user?.profile?.avatar_image ?? ""}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="rounded-full "
                />
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col items-center ">
                    <h3 className="text-lg">{post.user?.profile?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {localDate(post.created_at)}
                    </p>
                  </div>
                </div>
              </div>
              {/* Caption */}
              <div className="my-3">
                <div
                  className={`text-sm whitespace-pre-wrap break-words break-all text-left ${
                    expandedMap[post.id] ? "" : "line-clamp-3"
                  }`}
                >
                  {post.caption}
                </div>
                {post.caption.length > 150 && (
                  <button
                    onClick={() =>
                      setExpandedMap((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                      }))
                    }
                    className="text-blue-500 text-left flex text-xs mt-1"
                  >
                    {expandedMap[post.id] ? "Tutup" : "Baca selengkapnya"}
                  </button>
                )}
              </div>
              <div>
                {post.media.length > 0 && (
                  <Tabs defaultValue={post.media[0]?.id}>
                    {post.media.map((media) => (
                      <TabsContent
                        className="mt-3"
                        key={media.id}
                        value={media.id}
                      >
                        {media.type.startsWith("image") ? (
                          <Image
                            src={media.url}
                            width={900}
                            height={900}
                            alt="media"
                          />
                        ) : (
                          <video
                            width={900}
                            height={900}
                            className="object-cover"
                          >
                            <source src={media.url} type="video/mp4" />
                          </video>
                        )}
                      </TabsContent>
                    ))}
                    <TabsList className="gap-1 mt-2">
                      {post.media.map((media) => (
                        <TabsTrigger
                          className="border-0"
                          key={media.id}
                          value={media.id}
                        >
                          {media.type.startsWith("image") ? (
                            <Image
                              src={media.url}
                              width={60}
                              height={60}
                              alt="media"
                              className="object-cover w-6 h-6"
                            />
                          ) : (
                            <video
                              width={60}
                              height={60}
                              muted
                              className="object-cover"
                            >
                              <source src={media.url} type="video/mp4" />
                            </video>
                          )}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                )}
              </div>
            </div>
            <div className="flex mt-4 px-15 justify-between">
              <LikePost
                like={post.like}
                user_id={auth.user.id}
                post_id={post.id}
              />
              <TotalCommentPost post_id={post.id} />
              <p>as</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

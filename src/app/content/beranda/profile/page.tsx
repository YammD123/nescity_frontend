import NotFoundPost from "@/components/not-founds/not-found-post";
import PostProfile from "@/components/users/user-post-profile";
import { postLoaderMe } from "@/loaders/post-loader";
import { profileLoaderMe } from "@/loaders/profile-loader";
import UserBannerProfile from "@/components/users/user-banner-profile";
import UserInfoProfile from "@/components/users/user-info-profile";
import UserPostProfile from "@/components/users/user-post-profile";
import { userLoaderStatus } from "@/loaders/user-loader";

export default async function page() {
  const profileMe = await profileLoaderMe();
  const postMe = await postLoaderMe();
  const auth = await userLoaderStatus();

  return (
    <div className="text-center flex flex-col items-center gap-20 ">
      <div className="w-full">
        <UserBannerProfile profile={profileMe} />
      </div>

      <div className="flex gap-3 flex-col items-center sm:items-start sm:flex-row justify-between w-full lg:w-3/4 2xl:w-8/12">
        <div className="w-8/12">
          <UserInfoProfile profile={profileMe} />
        </div>

        <div className="w-10/12 flex flex-col gap-2">
          {postMe && postMe.length > 0 ? (
            <UserPostProfile postProfile={postMe} auth={auth} />
          ) : (
            <NotFoundPost />
          )}
        </div>
      </div>
    </div>
  );
}


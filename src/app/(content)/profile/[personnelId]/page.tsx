import MainBody from "@/components/ui/main-body";
import { getPersonnelDetail } from "@/api/serve_api";
import { FetchedPersonnelDetail } from "@/entity/entity";
import ProfileAvatar from "@/components/profile-avatar";
import SignUpListTable from "@/components/signup-list-table";
import { cookies } from "next/headers";

export default async function ProfilePage({
  params,
}: {
  params: { personnelId: string };
}) {
  const profile: FetchedPersonnelDetail = await getPersonnelDetail(
    params.personnelId,
  );

  return (
    <MainBody>
      <div className="absolute ">
        <p className="text-3xl">{profile.position}</p>
        <p className="text-2xl">{profile.unit}</p>
      </div>
      <div className="flex flex-col items-center">
        <ProfileAvatar
          personnelId={params.personnelId}
          avatar={profile.photo}
        />
        <p className="text-3xl">{profile.personnelName}</p>
      </div>
      <SignUpListTable personnelId={params.personnelId} />
    </MainBody>
  );
}

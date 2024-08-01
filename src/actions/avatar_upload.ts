"use server";

import { uploadAvatar } from "@/api/serve_api";
import { FormState } from "@/entity/entity";
import { revalidateTag } from "next/cache";

export async function uploadAvatarAction(
  personnelId: string,
  prevState: FormState,
  formData: FormData,
) {
  formData.append("personnelId", personnelId);
  try {
    const result = await uploadAvatar(formData);
    revalidateTag("personnelDetail");
    return {
      message: result,
      error: false,
    };
  } catch (error) {
    return {
      message: "上传头像失败",
      error: true,
    };
  }
}

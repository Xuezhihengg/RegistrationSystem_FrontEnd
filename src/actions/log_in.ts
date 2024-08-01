"use server";

import { auth, logIn } from "@/api/serve_api";
import { AuthInfo, FormState } from "@/entity/entity";
import { cookies } from "next/headers";

export default async function signInAction(
  prevState: FormState,
  formData: FormData,
) {
  const username = formData.get("username") || "";
  const password = formData.get("password") || "";
  try {
    const authInfo: AuthInfo = await logIn(
      username as string,
      password as string,
    );
    // cookies().set("SESSION", "Delba");
    console.log(authInfo);
  } catch (error) {
    return {
      message: "登录失败",
      error: true,
    };
  }
  return {
    message: "登录成功",
    error: false,
  };
}

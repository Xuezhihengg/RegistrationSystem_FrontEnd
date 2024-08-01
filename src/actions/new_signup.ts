"use server";

import { createNewSignUp } from "@/api/serve_api";
import { FormState } from "@/entity/entity";
import * as v from "valibot";
import { NewSignUpSchema } from "@/entity/form-schema";
import { formDataToObject } from "@/utils/utils";

export async function newSignupAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = v.safeParse(NewSignUpSchema, formDataToObject(formData));
  if (!result.success) {
    console.log(result.issues);
    return {
      message: "表单校验不通过",
      error: true,
    };
  }
  try {
    await createNewSignUp(result.output);
  } catch (error) {
    return {
      message: "提交报名失败",
      error: true,
    };
  }
  return {
    message: "成功提交报名",
    error: false,
  };
}

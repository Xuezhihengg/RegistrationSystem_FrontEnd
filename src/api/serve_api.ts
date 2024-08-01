import {
  AuthInfo,
  FetchedBatchDetail,
  FetchedExamDetail,
  FetchedPersonnelDetail,
  FetchedSignUpDetail,
  NameListItem,
} from "@/entity/entity";
import {
  AuthInfoResponse,
  BatchDetailResponse,
  BatchWithPageInfoResponse,
  ExamDetailResponse,
  ExamsListResponse,
  NameListResponse,
  PersonnelDetailResponse,
  SignUpDetailsResponse,
  SignUpListWithPageInfoResponse,
  StringResponse,
} from "@/entity/response-entity";
import { ReqPath } from "@/api/request_path";
import { NewExamType, NewSignUpType } from "@/entity/form-schema";

//分页获取全部Batch
export async function getBatchList(
  keyword: string,
  page: number,
): Promise<{ batches: FetchedBatchDetail[]; totalPages: number }> {
  const res: Response = await fetch(ReqPath.API_Batch_All(keyword, page));
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  const res_json: BatchWithPageInfoResponse = await res.json();
  return res_json.data;
}

//获取指定批次的考试列表
export async function getExamsByBatchId(
  batchId: string,
): Promise<FetchedExamDetail[]> {
  const res: Response = await fetch(ReqPath.API_Exams_By_BatchId(batchId), {
    next: { tags: ["examList"] },
  });
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  const res_json: ExamsListResponse = await res.json();
  return res_json.data;
}

//获取指定批次的详细信息
export async function getBatchDetail(
  batchId: string,
): Promise<FetchedBatchDetail> {
  const res: Response = await fetch(ReqPath.API_Batch_By_BatchId(batchId), {
    next: { tags: ["batchDetail"] },
  });
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  const res_json: BatchDetailResponse = await res.json();
  return res_json.data;
}

//获取指定考试的详细信息
export async function getExamDetail(
  examId: string,
): Promise<FetchedExamDetail> {
  const res: Response = await fetch(ReqPath.API_Exam_By_ExamId(examId), {
    next: { tags: ["examDetail"] },
  });
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  const res_json: ExamDetailResponse = await res.json();
  return res_json.data;
}

//创建新批次
export async function createNewBatch(
  formData: FormData,
): Promise<FetchedBatchDetail> {
  const res: Response = await fetch(ReqPath.API_NewBatch(), {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("创建新批次失败");
  }
  const res_json: BatchDetailResponse = await res.json();
  return res_json.data;
}

//创建新考试
export async function createNewExam(
  newExam: NewExamType,
): Promise<FetchedExamDetail> {
  const res: Response = await fetch(ReqPath.API_NewExam(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newExam),
  });
  if (!res.ok) {
    throw new Error("创建新考试失败");
  }
  const res_json: ExamDetailResponse = await res.json();
  return res_json.data;
}

//获取指定人员的详细信息
export async function getPersonnelDetail(
  personnelId: string,
): Promise<FetchedPersonnelDetail> {
  const res: Response = await fetch(
    ReqPath.API_Personnel_By_PersonnelId(personnelId),
    {
      next: { tags: ["personnelDetail"] },
    },
  );
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  const res_json: PersonnelDetailResponse = await res.json();
  return res_json.data;
}

//获取指定考试的监考名单
export async function getNameList(examId: string): Promise<NameListItem[]> {
  const res: Response = await fetch(ReqPath.API_NameList_By_ExamId(examId), {
    next: { tags: ["nameList"] },
  });
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  const res_json: NameListResponse = await res.json();
  return res_json.data;
}

//上传头像
export async function uploadAvatar(formData: FormData): Promise<string> {
  const res: Response = await fetch(ReqPath.API_Upload_Avatar(), {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("上传头像失败");
  }
  const res_json: StringResponse = await res.json();
  return res_json.data;
}

//提交报名
export async function createNewSignUp(
  newSignUp: NewSignUpType,
): Promise<FetchedSignUpDetail> {
  const res: Response = await fetch(ReqPath.API_NewSignUp(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSignUp),
  });
  console.log(res);
  if (!res.ok) {
    throw new Error("提交报名失败");
  }
  const res_json: SignUpDetailsResponse = await res.json();
  return res_json.data;
}

//分页获取指定人员的报名列表
export async function getSignUpList(
  personnelId: string,
  pageNum: number,
): Promise<{ signUpList: FetchedSignUpDetail[]; totalPages: number }> {
  const res: Response = await fetch(
    ReqPath.API_SignUp_List(personnelId, pageNum),
    {
      next: { tags: ["signUpList"] },
    },
  );
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  const res_json: SignUpListWithPageInfoResponse = await res.json();
  return res_json.data;
}

//获取登录者的工号
export async function auth(): Promise<AuthInfo> {
  const res: Response = await fetch(ReqPath.API_Auth(), {
    next: { tags: ["auth"] },
  });
  if (!res.ok) {
    throw new Error("获取登录数据失败");
  }
  const res_json: AuthInfoResponse = await res.json();
  return res_json.data;
}

//登录
export async function logIn(
  username: string,
  password: string,
): Promise<AuthInfo> {
  const credentials: string = btoa(`${username}:${password}`);

  // 发送带有 Basic Auth 请求头的 fetch 请求
  const res: Response = await fetch(ReqPath.API_Auth(), {
    next: { tags: ["auth"] },
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("获取登录数据失败");
  }

  const res_json: AuthInfoResponse = await res.json();
  return res_json.data;
}

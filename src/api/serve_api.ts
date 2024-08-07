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
import { NewExamType, NewSignUpType } from "@/entity/form-schema";
import { ReqPath } from "@/api/request_path";
import { apiRequest } from "@/api/api_request";

// 分页获取全部 Batch
export async function getBatchList(
  keyword: string,
  page: number,
): Promise<{ batches: FetchedBatchDetail[]; totalPages: number }> {
  return apiRequest<BatchWithPageInfoResponse>({
    url: ReqPath.API_Batch_All(keyword, page),
  }).then((response) => response.data);
}

// 获取指定批次的考试列表
export async function getExamsByBatchId(
  batchId: string,
): Promise<FetchedExamDetail[]> {
  return apiRequest<ExamsListResponse>({
    url: ReqPath.API_Exams_By_BatchId(batchId),
  }).then((response) => response.data);
}

// 获取指定批次的详细信息
export async function getBatchDetail(
  batchId: string,
): Promise<FetchedBatchDetail> {
  return apiRequest<BatchDetailResponse>({
    url: ReqPath.API_Batch_By_BatchId(batchId),
  }).then((response) => response.data);
}

// 获取指定考试的详细信息
export async function getExamDetail(
  examId: string,
): Promise<FetchedExamDetail> {
  return apiRequest<ExamDetailResponse>({
    url: ReqPath.API_Exam_By_ExamId(examId),
  }).then((response) => response.data);
}

// 创建新批次
export async function createNewBatch(
  formData: FormData,
): Promise<FetchedBatchDetail> {
  return apiRequest<BatchDetailResponse>({
    url: ReqPath.API_NewBatch(),
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => response.data);
}

// 创建新考试
export async function createNewExam(
  newExam: NewExamType,
): Promise<FetchedExamDetail> {
  return apiRequest<ExamDetailResponse>({
    url: ReqPath.API_NewExam(),
    method: "POST",
    body: newExam,
  }).then((response) => response.data);
}

// 获取指定人员的详细信息
export async function getPersonnelDetail(
  personnelId: string,
): Promise<FetchedPersonnelDetail> {
  return apiRequest<PersonnelDetailResponse>({
    url: ReqPath.API_Personnel_By_PersonnelId(personnelId),
  }).then((response) => response.data);
}

// 获取指定考试的监考名单
export async function getNameList(examId: string): Promise<NameListItem[]> {
  return apiRequest<NameListResponse>({
    url: ReqPath.API_NameList_By_ExamId(examId),
  }).then((response) => response.data);
}

// 上传头像
export async function uploadAvatar(formData: FormData): Promise<string> {
  return apiRequest<StringResponse>({
    url: ReqPath.API_Upload_Avatar(),
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => response.data);
}

// 提交报名
export async function createNewSignUp(
  newSignUp: NewSignUpType,
): Promise<FetchedSignUpDetail> {
  return apiRequest<SignUpDetailsResponse>({
    url: ReqPath.API_NewSignUp(),
    method: "POST",
    body: newSignUp,
  }).then((response) => response.data);
}

// 分页获取指定人员的报名列表
export async function getSignUpList(
  personnelId: string,
  pageNum: number,
): Promise<{ signUpList: FetchedSignUpDetail[]; totalPages: number }> {
  return apiRequest<SignUpListWithPageInfoResponse>({
    url: ReqPath.API_SignUp_List(personnelId, pageNum),
  }).then((response) => response.data);
}

// 获取登录者的工号
export async function auth(): Promise<AuthInfo> {
  return apiRequest<AuthInfoResponse>({
    url: ReqPath.API_Auth(),
  }).then((response) => response.data);
}

// 登录
export async function logIn(
  username: string,
  password: string,
): Promise<AuthInfo> {
  const credentials: string = btoa(`${username}:${password}`);
  return apiRequest<AuthInfoResponse>({
    url: ReqPath.API_Auth(),
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  }).then((response) => response.data);
}

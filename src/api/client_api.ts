import useSWR from "swr";
import { ReqPath } from "@/api/request_path";
import {
  auth,
  getBatchDetail,
  getBatchList,
  getExamDetail,
  getExamsByBatchId,
  getNameList,
  getPersonnelDetail,
  getSignUpList,
} from "@/api/serve_api";

//Client_API全局变量
const fetcher = (url: string) => fetch(url).then((res: Response) => res.json());

//分页获取全部Batch
export function useBatchList(keyword: string, page: number) {
  const { data, error, isLoading, mutate } = useSWR(
    ReqPath.API_Batch_All(keyword, page),
    () => getBatchList(keyword, page),
    {
      keepPreviousData: true,
    },
  );
  return { batchListResponse: data, error, isLoading, mutate };
}

//获取指定批次的详细信息
export function useBatchDetail(batchId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ReqPath.API_Batch_By_BatchId(batchId),
    () => getBatchDetail(batchId),
  );
  return { batchDetail: data, error, isLoading, mutate };
}

//获取指定批次的详细信息
export function useExamDetail(examId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ReqPath.API_Exam_By_ExamId(examId),
    () => getExamDetail(examId),
  );
  return { examDetail: data, error, isLoading, mutate };
}

//获取指定批次的考试列表
export function useExamsByBatchId(batchId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ReqPath.API_Exams_By_BatchId(batchId),
    getExamsByBatchId,
  );
  return { exams: data, error, isLoading, mutate };
}

//获取指定考试的监考名单
export function useNameList(examId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ReqPath.API_NameList_By_ExamId(examId),
    () => getNameList(examId),
  );
  return { nameList: data, error, isLoading, mutate };
}

//获取指定人员的详细信息
export function useProfile(personnelId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ReqPath.API_Personnel_By_PersonnelId(personnelId),
    () => getPersonnelDetail(personnelId),
  );
  return { profile: data, error, isLoading, mutate };
}

//分页获取指定人员的报名列表
export function useSignUpList(personnelId: string, pageNum: number) {
  const { data, error, isLoading, mutate } = useSWR(
    ReqPath.API_SignUp_List(personnelId, pageNum),
    () => getSignUpList(personnelId, pageNum),
  );
  return { signUpListResponse: data, error, isLoading, mutate };
}

//获取登录人员编号
export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR(ReqPath.API_Auth(), () =>
    auth(),
  );
  return { personnelId: data, error, isLoading, mutate };
}

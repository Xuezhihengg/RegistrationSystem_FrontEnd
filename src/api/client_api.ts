import useSWR from "swr";
import { ReqPath } from "@/api/request_path";
import {
  getBatchDetail,
  getBatchList,
  getExamsByBatchId,
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
  setTimeout(() => {}, 2000);
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
    fetcher,
  );
  return { nameList: data?.data, error, isLoading, mutate };
}

import useSWR from "swr";
import { BatchWithPageInfoResponse } from "@/entity/response-entity";
import { ReqPath } from "@/api/request_path";
import { FetchedBatchDetail, FetchedExamDetail } from "@/entity/entity";

//Client_API全局变量
const fetcher = (url: string) => fetch(url).then((res: Response) => res.json());

//分页获取全部Batch
export function useBatchList(page: number) {
  const {
    data,
    error,
    isLoading,
  }: {
    data: BatchWithPageInfoResponse;
    error: string | undefined;
    isLoading: boolean;
  } = useSWR(ReqPath.API_Batch_All(page), fetcher, {
    keepPreviousData: true,
  });
  return { allBatchResponse: data?.data, error, isLoading };
}

//获取指定批次的详细信息
export function useBatchDetail(batchId: string) {
  const {
    data,
    error,
    isLoading,
  }: {
    data: FetchedBatchDetail;
    error: string | undefined;
    isLoading: boolean;
  } = useSWR(ReqPath.API_Batch_By_BatchId(batchId), fetcher);
  return { batchDetail: data?.data, error, isLoading };
}

//获取指定批次的考试列表
export function useExamsByBatchId(batchId: string) {
  const {
    data,
    error,
    isLoading,
  }: {
    data: FetchedExamDetail[];
    error: string | undefined;
    isLoading: boolean;
  } = useSWR(ReqPath.API_Exams_By_BatchId(batchId), fetcher);
  return { exams: data?.data, error, isLoading };
}

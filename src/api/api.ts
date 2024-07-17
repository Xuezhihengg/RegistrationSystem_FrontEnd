import useSWR from "swr";
import {
  BatchDetailResponse,
  BatchWithPageInfoResponse,
  ExamsListResponse,
} from "@/entity/response-entity";
import { FetchedBatchItem, FetchedExamDetail } from "@/entity/entity";

const host: string = "http://localhost:8080";
export const fetcher = (url: string) =>
  fetch(host + url).then((res: Response) => res.json());

export const ReqPath = {
  API_Batch_All(pageNum: number): string {
    return `/batch/all/${pageNum}`;
  },
  API_Exams_By_BatchId(batchId: string): string {
    return `/examination/${batchId}`;
  },
};

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

export async function getExamsByBatchId(
  batchId: string,
): Promise<FetchedExamDetail[]> {
  const res: Response = await fetch(`${host}/examination/${batchId}`);
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  const res_json: ExamsListResponse = await res.json();
  return res_json.data;
}

export async function getBatchDetail(
  batchId: string,
): Promise<FetchedBatchItem> {
  const res: Response = await fetch(`${host}/batch/${batchId}`);
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  const res_json: BatchDetailResponse = await res.json();
  return res_json.data;
}

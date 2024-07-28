import { FetchedBatchDetail, FetchedExamDetail } from "@/entity/entity";
import {
  BatchDetailResponse,
  BatchWithPageInfoResponse,
  ExamsListResponse,
} from "@/entity/response-entity";
import { ReqPath } from "@/api/request_path";

//分页获取全部Batch
export async function getBatchList(
  page: number,
): Promise<{ batches: FetchedBatchDetail[]; totalPages: number }> {
  const res: Response = await fetch(ReqPath.API_Batch_All(page));
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
  const res: Response = await fetch(ReqPath.API_Exams_By_BatchId(batchId));
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
  const res: Response = await fetch(ReqPath.API_Batch_By_BatchId(batchId));
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  const res_json: BatchDetailResponse = await res.json();
  return res_json.data;
}

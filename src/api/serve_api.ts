import { FetchedBatchDetail, FetchedExamDetail } from "@/entity/entity";
import {
  BatchDetailResponse,
  BatchWithPageInfoResponse,
  ExamDetailResponse,
  ExamsListResponse,
} from "@/entity/response-entity";
import { ReqPath } from "@/api/request_path";
import * as v from "valibot";
import { NewExamSchema, NewExamSchemaType } from "@/entity/form-schema";

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

//创建新批次
export async function createNewBatch(
  formDate: FormData,
): Promise<FetchedBatchDetail> {
  const res: Response = await fetch(ReqPath.API_NewBatch(), {
    method: "POST",
    body: formDate,
  });
  if (!res.ok) {
    throw new Error("创建新批次失败");
  }
  const res_json: BatchDetailResponse = await res.json();
  return res_json.data;
}

//创建新考试
export async function createNewExam(
  newExam: NewExamSchemaType,
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

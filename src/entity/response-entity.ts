import { FetchedBatchDetail, FetchedExamDetail } from "@/entity/entity";

interface ResponseEntity {
  timestamp: number;
  status: string;
  message: string;
}

export interface BatchWithPageInfoResponse extends ResponseEntity {
  data: { batches: FetchedBatchDetail[]; totalPages: number };
}

export interface BatchDetailResponse extends ResponseEntity {
  data: FetchedBatchDetail;
}

export interface ExamsListResponse extends ResponseEntity {
  data: FetchedExamDetail[];
}

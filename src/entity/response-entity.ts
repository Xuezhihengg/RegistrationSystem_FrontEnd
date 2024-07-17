import { FetchedBatchItem, FetchedExamDetail } from "@/entity/entity";

interface ResponseEntity {
  timestamp: number;
  status: string;
  message: string;
}

export interface BatchWithPageInfoResponse extends ResponseEntity {
  data: { batches: FetchedBatchItem[]; totalPages: number };
}

export interface BatchDetailResponse extends ResponseEntity {
  data: FetchedBatchItem;
}

export interface ExamsListResponse extends ResponseEntity {
  data: FetchedExamDetail[];
}

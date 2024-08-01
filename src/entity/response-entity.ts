import {
  AuthInfo,
  FetchedBatchDetail,
  FetchedExamDetail,
  FetchedPersonnelDetail,
  FetchedSignUpDetail,
  NameListItem,
} from "@/entity/entity";

interface ResponseEntity {
  timestamp: number;
  status: string;
  message: string;
}

export interface StringResponse extends ResponseEntity {
  data: string;
}

export interface BatchWithPageInfoResponse extends ResponseEntity {
  data: { batches: FetchedBatchDetail[]; totalPages: number };
}

export interface SignUpListWithPageInfoResponse extends ResponseEntity {
  data: { signUpList: FetchedSignUpDetail[]; totalPages: number };
}

export interface SignUpDetailsResponse extends ResponseEntity {
  data: FetchedSignUpDetail;
}

export interface SignUpListResponse extends ResponseEntity {
  data: FetchedSignUpDetail[];
}

export interface BatchDetailResponse extends ResponseEntity {
  data: FetchedBatchDetail;
}

export interface ExamDetailResponse extends ResponseEntity {
  data: FetchedExamDetail;
}

export interface ExamsListResponse extends ResponseEntity {
  data: FetchedExamDetail[];
}

export interface NameListResponse extends ResponseEntity {
  data: NameListItem[];
}

export interface PersonnelDetailResponse extends ResponseEntity {
  data: FetchedPersonnelDetail;
}

export interface AuthInfoResponse extends ResponseEntity {
  data: AuthInfo;
}

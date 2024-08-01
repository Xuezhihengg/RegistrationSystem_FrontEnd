export interface FetchedBatchDetail {
  batchId: string;
  batchName: string;
  startDate: string;
  endDate: string;
  description: string;
  attachment: string;
}

export interface FinalBatchTableItem extends FetchedBatchDetail {
  count: number;
  status: string;
}

export interface FetchedExamDetail {
  batchId: string;
  examId: string;
  examName: string;
  campus: string;
  address: string;
  startTime: string;
  endTime: string;
  chiefInvigilator: string;
  minorInvigilator: string;
}

export interface FetchedSignUpDetail {
  personnelId: string;
  examId: string;
  status: number;
  reason: string;
  duty: string;
  isReject: boolean;
  invitedBy: string;
}

export interface FetchedPersonnelDetail {
  personnelId: string;
  personnelName: string;
  position: string;
  unit: string;
  gender: string;
  eduBackground: string;
  identityCard: string;
  phone: string;
  photo: string;
  password: string;
}

export interface ApproveItem {
  approveId: string;
  personnelName: string;
  personnelId: string;
  batchId: string;
  campus: string;
  operation: string;
}

export interface NameListItem {
  personnelName: string | null;
  personnelId: string | null;
  duty: string;
}

export interface RangeValue {
  start: string | undefined;
  end: string | undefined;
}

export interface FormState {
  message: string;
  error: boolean;
}

export interface AuthInfo {
  personnelId: string;
  position: string;
}

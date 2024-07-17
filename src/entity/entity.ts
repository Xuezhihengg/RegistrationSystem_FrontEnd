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

export interface approveItem {
  approveId: string;
  personnelName: string;
  personnelId: string;
  batchId: string;
  campus: string;
  operation: string;
}

export interface nameListItem {
  personnelName: string;
  personnelId: string;
  duty: string;
}

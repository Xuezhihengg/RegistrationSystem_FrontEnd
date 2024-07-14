export interface FetchedBatchListItem {
  batchId: string;
  batchName: string;
  startTime: string;
  endTime: string;
}

export interface FetchedBatchDetail extends FetchedBatchListItem {
  description: string;
  attachment: string;
}

export interface FinalBatchTableItem extends FetchedBatchListItem {
  count: number;
  status: string;
}

export interface approveItem {
  approveId: string;
  personnelName: string;
  personnelId: string;
  batchId: string;
  campus: string;
  operation: string;
}

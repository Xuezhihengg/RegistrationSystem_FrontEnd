const host: string = "http://localhost:8080";

//Request路径
export const ReqPath = {
  API_Batch_All(pageNum: number): string {
    return `${host}/batch/all/${pageNum}`;
  },
  API_Batch_By_BatchId(batchId: string): string {
    return `${host}/batch/${batchId}`;
  },
  API_Exams_By_BatchId(batchId: string): string {
    return `${host}/examination/${batchId}`;
  },
};

const host: string = "http://localhost:8080";

//Request路径
export const ReqPath = {
  API_Batch_All(keyword: string, pageNum: number): string {
    return `${host}/batch/search/${keyword}/${pageNum}`;
  },
  API_Batch_By_BatchId(batchId: string): string {
    return `${host}/batch/${batchId}`;
  },
  API_Exams_By_BatchId(batchId: string): string {
    return `${host}/examination/${batchId}`;
  },
  API_NameList_By_ExamId(examId: string): string {
    return `${host}/examination/nameList/${examId}`;
  },
  API_NewBatch(): string {
    return `${host}/batch/new`;
  },
};

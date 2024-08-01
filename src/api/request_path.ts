export const host: string = "http://localhost:8080";

//Request路径
export const ReqPath = {
  API_Batch_All(keyword: string, pageNum: number): string {
    return `${host}/batch/search/${keyword}/${pageNum}`;
  },
  API_Batch_By_BatchId(batchId: string): string {
    return `${host}/batch/${batchId}`;
  },
  API_Exams_By_BatchId(batchId: string): string {
    return `${host}/examination/examList/${batchId}`;
  },
  API_NameList_By_ExamId(examId: string): string {
    return `${host}/examination/nameList/${examId}`;
  },
  API_NewBatch(): string {
    return `${host}/batch/new`;
  },
  API_NewExam(): string {
    return `${host}/examination/new`;
  },
  API_Exam_By_ExamId(examId: string): string {
    return `${host}/examination/${examId}`;
  },
  API_Personnel_By_PersonnelId(personnelId: string): string {
    return `${host}/personnel/${personnelId}`;
  },
  API_Upload_Avatar(): string {
    return `${host}/personnel/upload/avatar`;
  },
  API_NewSignUp(): string {
    return `${host}/signUp/new`;
  },
  API_SignUp_List(personnelId: string, pageNum: number): string {
    return `${host}/signUp/${personnelId}/${pageNum}`;
  },
  API_Auth(): string {
    return `${host}/auth/info`;
  },
};

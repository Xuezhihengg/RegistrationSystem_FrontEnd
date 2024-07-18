export const path = {
  //>>>>>> /signup <<<<<<
  signup(): string {
    return "/signup";
  },
  signupDetail(batchId: string): string {
    return `/signup/${batchId}`;
  },
  newSignup(batchId: string, examId: string): string {
    return `/signup/${batchId}/${examId}`;
  },
  //>>>>>> /signup <<<<<<

  //>>>>>> /manage <<<<<<
  manage(): string {
    return "/manage";
  },
  manageDetail(batchId: string): string {
    return `/manage/${batchId}`;
  },
  newExam(batchId: string): string {
    return `/manage/${batchId}/newExam`;
  },
  showNameList(batchId: string, examId: string): string {
    return `/manage/${batchId}/nameList/${examId}`;
  },
  //>>>>>> /manage <<<<<<

  //>>>>>> /approve <<<<<<
  approve(): string {
    return "/approve";
  },
  //>>>>>> /approve <<<<<<

  //>>>>>> /invite <<<<<<
  invite(): string {
    return "/invite";
  },
  //>>>>>> /invite <<<<<<
};

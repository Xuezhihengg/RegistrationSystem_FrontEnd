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
  //>>>>>> /manage <<<<<<

  //>>>>>> /approve <<<<<<
  approve(): string {
    return "/approve";
  },
  //>>>>>> /approve <<<<<<
};

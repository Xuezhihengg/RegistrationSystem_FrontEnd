import { Card, CardFooter } from "@nextui-org/card";
import { path } from "@/utils/path";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import MainBody from "@/components/ui/main-body";
import { FetchedBatchDetail, FetchedExamDetail } from "@/entity/entity";
import BatchDetailShow from "@/components/batch-detail-show";
import ExamDetail from "@/components/exam-detail";
import { getBatchDetail, getExamsByBatchId } from "@/api/serve_api";
import { judgeDateTimeState } from "@/utils/utils";
import toast from "react-hot-toast";

export default async function SignUpDetailPage({
  params,
}: {
  params: { batchId: string };
}) {
  const batchDetail: FetchedBatchDetail = await getBatchDetail(params.batchId);
  const examsList: FetchedExamDetail[] = await getExamsByBatchId(
    params.batchId,
  );

  const dateTimeState: string = judgeDateTimeState({
    start: batchDetail.startDate,
    end: batchDetail.endDate,
  });

  if (dateTimeState === "error") toast.error("批次细节异常");

  return (
    <MainBody>
      <BatchDetailShow batchDetail={batchDetail} />
      <div className="flex flex-col">
        <div className="text-2xl">考试安排</div>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {examsList?.map((exam: FetchedExamDetail, index: number) => (
          <Card className="p-2" shadow="sm" key={index}>
            <ExamDetail exam={exam} />
            <CardFooter className=" flex justify-center">
              <Button
                href={path.newSignup(params.batchId, exam.examId)}
                as={Link}
                color={dateTimeState === "进行中" ? "primary" : "default"}
                variant="solid"
                className="w-40"
                isDisabled={!(dateTimeState === "进行中")}
              >
                报名
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainBody>
  );
}

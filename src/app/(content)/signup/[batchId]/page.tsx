import { Card, CardFooter } from "@nextui-org/card";
import { path } from "@/utils/path";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import MainBody from "@/components/ui/main-body";
import { FetchedBatchItem, FetchedExamDetail } from "@/entity/entity";
import BatchDetailShow from "@/components/batch-detail-show";
import ExamDetail from "@/components/exam-detail";
import { getBatchDetail, getExamsByBatchId } from "@/api/api";

export default async function SignUpDetailPage({
  params,
}: {
  params: { batchId: string };
}) {
  const batchDetail: FetchedBatchItem = await getBatchDetail(params.batchId);
  const examsList: FetchedExamDetail[] = await getExamsByBatchId(
    params.batchId,
  );

  return (
    <MainBody>
      <BatchDetailShow batchDetail={batchDetail} />
      <div className="flex flex-col">
        <div className="text-2xl">考试安排</div>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {examsList.map((exam: FetchedExamDetail, index: number) => (
          <Card className="p-2" shadow="sm" key={index}>
            <ExamDetail exam={exam} />
            <CardFooter className=" flex justify-center">
              <Button
                href={path.newSignup(params.batchId, exam.examId)}
                as={Link}
                color="primary"
                variant="solid"
                className="w-40"
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

import plus from "@/../public/story.png";
import MainBody from "@/components/ui/main-body";
import { FetchedBatchDetail, FetchedExamDetail } from "@/entity/entity";
import { Card, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import BatchDetailShow from "@/components/batch-detail-show";
import ExamDetail from "@/components/exam-detail";
import Image from "next/image";
import Link from "next/link";
import { path } from "@/utils/path";
import { getBatchDetail, getExamsByBatchId } from "@/api/serve_api";

export default async function ListPage({
  params,
}: {
  params: { batchId: string };
}) {
  const batchDetail: FetchedBatchDetail = await getBatchDetail(params.batchId);
  const exams: FetchedExamDetail[] = await getExamsByBatchId(params.batchId);

  return (
    <MainBody>
      <BatchDetailShow batchDetail={batchDetail} />
      <div className="flex flex-col">
        <div className="text-2xl my-2">考试安排</div>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {exams?.map((exam: FetchedExamDetail, index: number) => (
          <Card className="p-2" shadow="sm" key={index}>
            <ExamDetail exam={exam} />
            <CardFooter className=" flex justify-center">
              <Button
                color="primary"
                variant="solid"
                className="w-40"
                as={Link}
                href={path.showNameList(params.batchId, exam.examId)}
              >
                查看名单
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Button
          className="border-1 shadow-sm rounded-2xl p-2 bg-white h-full hover:bg-default-100 flex flex-col items-center justify-center"
          as={Link}
          href={path.newExam(params.batchId)}
        >
          <Image src={plus} alt="plus" className="w-20 h-20" />
          <div className="p-2 text-default-700">新增考试</div>
        </Button>
      </div>
    </MainBody>
  );
}

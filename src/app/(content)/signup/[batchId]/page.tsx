import { signupDetail, examsList } from "@/app/DUMMY_DATA";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { path } from "@/utils/path";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import MainBody from "@/components/ui/main-body";
import { className } from "postcss-selector-parser";

export default function SignUpDetailPage({
  params,
}: {
  params: { batchId: string };
}) {
  return (
    <MainBody>
      <div className="flex flex-col mb-6">
        <div className="text-2xl">监考批次情况</div>
        <div>批次名称:{signupDetail.batchName}</div>
        <div>批次开始时间:{signupDetail.startTime}</div>
        <div>批次结束时间:{signupDetail.endTime}</div>
        <div>批次时长:{signupDetail.description}</div>
        <div>监考说明:{signupDetail.description}</div>
        <div>附件:{signupDetail.attachment}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-2xl">考试安排</div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {examsList.map((exam, index) => (
            <Card className="p-2" shadow="sm" key={index}>
              <CardBody className="overflow-visible p-0">
                <div>考试名称:{exam.examName}</div>
                <div>校区:{exam.campus}</div>
                <div>校内地址:{exam.address}</div>
                <div>
                  监考时间:{exam.startTime} ~ {exam.endTime}
                </div>
              </CardBody>
              <CardFooter className=" flex justify-center">
                <Button
                  href={path.newSignup(params.batchId, exam.examId.toString())}
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
      </div>
    </MainBody>
  );
}

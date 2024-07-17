import { CardBody } from "@nextui-org/card";
import { FetchedExamDetail } from "@/entity/entity";

export default function ExamDetail({ exam }: { exam: FetchedExamDetail }) {
  return (
    <CardBody className="overflow-visible p-0">
      <div>考试名称:{exam.examName}</div>
      <div>校区:{exam.campus}</div>
      <div>校内地址:{exam.address}</div>
      <div>
        监考时间:{exam.startTime} ~ {exam.endTime}
      </div>
    </CardBody>
  );
}

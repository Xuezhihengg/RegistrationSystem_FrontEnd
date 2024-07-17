import { FetchedBatchDetail } from "@/entity/entity";

export default function BatchDetailShow({
  batchDetail,
}: {
  batchDetail: FetchedBatchDetail;
}) {
  return (
    <div className="flex flex-col mb-6">
      <div className="text-2xl my-2">监考批次情况</div>
      <div>批次名称:{batchDetail?.batchName}</div>
      <div>批次开始时间:{batchDetail?.startDate}</div>
      <div>批次结束时间:{batchDetail?.endDate}</div>
      <div>监考说明:{batchDetail?.description}</div>
      <div>附件:{batchDetail?.attachment}</div>
    </div>
  );
}

// 将 "YYYY-MM-DD HH:MM:SS" 格式转换为 ISO 8601 格式
import { FetchedBatchItem, FinalBatchTableItem } from "@/entity/entity";

export function convertToISO(mysqlDateTime: string): Date {
  const [datePart, timePart]: string[] = mysqlDateTime.split("T");
  const [year, month, day]: string[] = datePart.split("-");
  const [hour, minute, second]: string[] = timePart.split(":");

  // 创建 Date 对象并获取 ISO 格式的字符串
  return new Date(
    parseInt(year),
    parseInt(month) - 1, // 月份在 Date 对象中是从 0 开始的，因此要减去 1
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second),
  );
}

export function addStatusToAllBatchList(
  allBatchList: FetchedBatchItem[],
): FinalBatchTableItem[] {
  const currentTime: Date = new Date();
  let finalBatchList: FinalBatchTableItem[] = [];
  if (allBatchList) {
    finalBatchList = allBatchList.map((item: FetchedBatchItem) => {
      const startTime: Date = convertToISO(item.startDate);
      const endTime: Date = convertToISO(item.endDate);

      if (currentTime < startTime) {
        return { ...item, status: "未开始", count: -1 }; //这一页不需要count
      } else if (currentTime > endTime) {
        return { ...item, status: "已结束", count: -1 };
      } else {
        return { ...item, status: "进行中", count: -1 };
      }
    });
  }
  return finalBatchList;
}

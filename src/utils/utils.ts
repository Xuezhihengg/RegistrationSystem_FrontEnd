// 将 "YYYY-MM-DD HH:MM:SS" 格式转换为 ISO 8601 格式
export function convertToISO(mysqlDateTime: string): Date {
  const [datePart, timePart]: string[] = mysqlDateTime.split(" ");
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

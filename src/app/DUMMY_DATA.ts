import {
  ApproveItem,
  FetchedBatchDetail,
  FetchedExamDetail,
  NameListItem,
} from "@/entity/entity";
export const DUMMY_batchDetail: FetchedBatchDetail = {
  batchId: "B001",
  batchName: "概率论",
  startDate: "string",
  endDate: "string",
  description: "string",
  attachment: "string",
};

export const DUMMY_examsList: FetchedExamDetail[] = [
  {
    batchId: "string",
    examId: "string",
    examName: "string",
    campus: "string",
    address: "string",
    startTime: "string",
    endTime: "string",
    chiefInvigilator: "string",
    minorInvigilator: "string",
  },
];
export const approveList: ApproveItem[] = [
  {
    approveId: "2",
    personnelName: "陈林涛",
    personnelId: "10001",
    batchId: "1",
    campus: "兴庆校区",
    operation: "审批:2",
  },
  {
    approveId: "1",
    personnelName: "张三",
    personnelId: "10002",
    batchId: "2",
    campus: "西夏校区",
    operation: "审批:1",
  },
  {
    approveId: "3",
    personnelName: "李四",
    personnelId: "10003",
    batchId: "1",
    campus: "南门校区",
    operation: "审批:3",
  },
  {
    approveId: "4",
    personnelName: "王五",
    personnelId: "10004",
    batchId: "3",
    campus: "雁塔校区",
    operation: "审批:4",
  },
  {
    approveId: "5",
    personnelName: "赵六",
    personnelId: "10005",
    batchId: "2",
    campus: "高新校区",
    operation: "审批:5",
  },
  {
    approveId: "6",
    personnelName: "赵六",
    personnelId: "10005",
    batchId: "2",
    campus: "高新校区",
    operation: "审批:6",
  },
  {
    approveId: "7",
    personnelName: "赵六",
    personnelId: "10005",
    batchId: "2",
    campus: "高新校区",
    operation: "审批:7",
  },
  {
    approveId: "8",
    personnelName: "赵六",
    personnelId: "10005",
    batchId: "2",
    campus: "高新校区",
    operation: "审批:8",
  },
  {
    approveId: "9",
    personnelName: "赵六",
    personnelId: "10005",
    batchId: "2",
    campus: "高新校区",
    operation: "审批:9",
  },
  {
    approveId: "10",
    personnelName: "赵六",
    personnelId: "10005",
    batchId: "2",
    campus: "高新校区",
    operation: "审批:10",
  },
  {
    approveId: "11",
    personnelName: "赵六",
    personnelId: "10005",
    batchId: "2",
    campus: "高新校区",
    operation: "审批:11",
  },
  {
    approveId: "12",
    personnelName: "赵六",
    personnelId: "10005",
    batchId: "2",
    campus: "高新校区",
    operation: "审批:12",
  },
  {
    approveId: "13",
    personnelName: "赵六",
    personnelId: "10005",
    batchId: "2",
    campus: "高新校区",
    operation: "审批:13",
  },
  {
    approveId: "14",
    personnelName: "赵六",
    personnelId: "10005",
    batchId: "2",
    campus: "高新校区",
    operation: "审批:14",
  },
];

export const listed: NameListItem[] = [
  {
    personnelName: "陈林涛",
    personnelId: "10001",
    duty: "主监考",
  },
  {
    personnelName: "赖应川",
    personnelId: "10002",
    duty: "副监考",
  },
];

export const signupTableColumns: { key: string; label: string }[] = [
  {
    key: "batchName",
    label: "监考批次",
  },
  {
    key: "startTime",
    label: "报名开始时间",
  },
  {
    key: "endTime",
    label: "报名结束时间",
  },
  {
    key: "status",
    label: "批次状态",
  },
  {
    key: "operation",
    label: "操作",
  },
];

export const manageTableColumns: { key: string; label: string }[] = [
  {
    key: "batchName",
    label: "监考批次",
  },
  {
    key: "count",
    label: "监考人数",
  },
  {
    key: "startTime",
    label: "报名开始时间",
  },
  {
    key: "endTime",
    label: "报名结束时间",
  },
  {
    key: "status",
    label: "批次状态",
  },
  {
    key: "operation",
    label: "操作",
  },
];

export const approveSubmitColumns: { key: string; label: string }[] = [
  { key: "personnelName", label: "姓名" },
  {
    key: "personnelId",
    label: "工号",
  },
  {
    key: "operation",
    label: "操作",
  },
];

export const approveTableColumns: { key: string; label: string }[] = [
  {
    key: "personnelName",
    label: "报名人",
  },
  {
    key: "personnelId",
    label: "工号",
  },
  {
    key: "batchId",
    label: "监考批次",
  },
  {
    key: "campus",
    label: "意向监考校区",
  },
  {
    key: "operation",
    label: "操作",
  },
];

"use client";

import MainBody from "@/components/ui/main-body";
import { manageTableColumns } from "@/components/table/table-columns";
import React, { useEffect, useState } from "react";
import { signUpList } from "@/app/DUMMY_DATA";
import { FetchedBatchListItem, FinalBatchTableItem } from "@/entity/entity";
import { path } from "@/utils/path";
import BatchTable from "@/components/table/batch-table";
import { convertToISO } from "@/utils/utils";

export default function ManagePage() {
  const [finalSignUpList, setFinalSignUpList] = useState<FinalBatchTableItem[]>(
    [],
  );

  //FetchedBatchListItem --> FinialBatchTableItem
  useEffect(() => {
    const currentTime: Date = new Date();

    const tempSignUpList: FinalBatchTableItem[] = signUpList.map(
      (item: FetchedBatchListItem) => {
        const startTime: Date = convertToISO(item.startTime);
        const endTime: Date = convertToISO(item.endTime);

        if (currentTime < startTime) {
          return { ...item, status: "未开始", count: 5 }; //这一页计算需要count
        } else if (currentTime > endTime) {
          return { ...item, status: "已结束", count: 4 };
        } else {
          return { ...item, status: "进行中", count: 3 };
        }
      },
    );
    setFinalSignUpList(tempSignUpList);
  }, []);

  //>>>>>>分页设置<<<<<<
  const [page, setPage]: [
    number,
    (value: ((prevState: number) => number) | number) => void,
  ] = React.useState(1);

  const rowsPerPage: number = 10;
  const pages: number = Math.ceil(finalSignUpList.length / rowsPerPage);

  const items: FinalBatchTableItem[] = React.useMemo(() => {
    const start: number = (page - 1) * rowsPerPage;
    const end: number = start + rowsPerPage;

    return finalSignUpList.slice(start, end);
  }, [page, finalSignUpList]);
  //>>>>>>分页设置<<<<<<

  return (
    <MainBody>
      <BatchTable
        operation="详情"
        toPath={path.manageDetail}
        page={page}
        pages={pages}
        setPage={setPage}
        items={items}
        columns={manageTableColumns}
      />
    </MainBody>
  );
}

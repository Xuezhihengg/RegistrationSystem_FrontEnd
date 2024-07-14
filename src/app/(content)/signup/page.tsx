"use client";

import { FetchedBatchListItem, FinalBatchTableItem } from "@/entity/entity";
import React, { useEffect, useState } from "react";
import { signUpList } from "@/app/DUMMY_DATA";
import { path } from "@/utils/path";
import MainBody from "@/components/ui/main-body";
import { signupTableColumns } from "@/components/table/table-columns";
import BatchTable from "@/components/table/batch-table";
import { convertToISO } from "@/utils/utils";

export default function SignUpPage() {
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
          return { ...item, status: "未开始", count: -1 }; //这一页不需要count
        } else if (currentTime > endTime) {
          return { ...item, status: "已结束", count: -1 };
        } else {
          return { ...item, status: "进行中", count: -1 };
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
        operation="报名"
        toPath={path.signupDetail}
        page={page}
        pages={pages}
        setPage={setPage}
        items={items}
        columns={signupTableColumns}
      />
    </MainBody>
  );
}

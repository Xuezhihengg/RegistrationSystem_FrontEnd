"use client";

import { FetchedBatchDetail, FinalBatchTableItem } from "@/entity/entity";
import { path } from "@/utils/path";
import MainBody from "@/components/ui/main-body";
import { signupTableColumns } from "@/utils/table-columns";
import BatchTable from "@/components/batch-table";
import { addStatusToAllBatchList, convertToISO } from "@/utils/utils";
import { useBatchList } from "@/api/client_api";
import React from "react";

export default function SignUpPage() {
  const [page, setPage]: [
    number,
    (value: ((prevState: number) => number) | number) => void,
  ] = React.useState(1);

  const { allBatchResponse, error, isLoading } = useBatchList(page);

  const allBatchList: FetchedBatchDetail[] = allBatchResponse?.batches || [];
  const pages: number = allBatchResponse?.totalPages || 1;
  const finalBatchList: FinalBatchTableItem[] =
    addStatusToAllBatchList(allBatchList);

  return (
    <MainBody>
      <BatchTable
        operation="报名"
        toPath={path.signupDetail}
        page={page}
        pages={pages}
        setPage={setPage}
        items={finalBatchList}
        columns={signupTableColumns}
        isLoading={isLoading}
      />
    </MainBody>
  );
}

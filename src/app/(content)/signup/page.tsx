"use client";

import { FetchedBatchDetail, FinalBatchTableItem } from "@/entity/entity";
import { path } from "@/utils/path";
import MainBody from "@/components/ui/main-body";
import { signupTableColumns } from "@/utils/table-columns";
import BatchTable from "@/components/batch-table";
import { addStatusToAllBatchList } from "@/utils/utils";
import { useBatchList } from "@/api/client_api";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { FiSearch } from "react-icons/fi";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import { cookies } from "next/headers";

export default function SignUpPage() {
  const [page, setPage]: [
    number,
    (value: ((prevState: number) => number) | number) => void,
  ] = useState(1);
  const [tableKeyword, setTableKeyword] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const {
    batchListResponse: tableListResponse,
    error: tableError,
    isLoading: tableIsLoading,
  } = useBatchList(tableKeyword == "" ? "no_search" : tableKeyword, page);

  const tableBatchList: FetchedBatchDetail[] = tableListResponse?.batches || [];
  const pages: number = tableListResponse?.totalPages || 1;
  const finalTableBatchList: FinalBatchTableItem[] =
    addStatusToAllBatchList(tableBatchList);

  const doSearch = () => {
    setTableKeyword(searchKeyword);
    setPage(1);
  };

  useEffect(() => {
    if (searchKeyword == "") {
      setTableKeyword("");
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (tableError) {
      toast.error("获取批次列表失败");
    }
  }, [tableError]);

  return (
    <MainBody>
      <div className="flex justify-end mb-2">
        <Input
          isClearable
          className="w-56"
          placeholder="搜索..."
          value={searchKeyword}
          onValueChange={setSearchKeyword}
        ></Input>
        <Button color="primary" className="mx-2" onPress={doSearch}>
          <FiSearch />
        </Button>
      </div>
      <BatchTable
        toPath={path.signupDetail}
        page={page}
        pages={pages}
        setPage={setPage}
        items={finalTableBatchList}
        columns={signupTableColumns}
        isLoading={tableIsLoading}
      />
    </MainBody>
  );
}

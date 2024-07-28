"use client";

import MainBody from "@/components/ui/main-body";
import { manageTableColumns } from "@/utils/table-columns";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FetchedBatchDetail, FinalBatchTableItem } from "@/entity/entity";
import { path } from "@/utils/path";
import BatchTable from "@/components/batch-table";
import { addStatusToAllBatchList, convertToISO } from "@/utils/utils";
import { Button, DateRangePicker, Divider, Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { CalendarDateTime } from "@internationalized/date";
import { useBatchList } from "@/api/client_api";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import { newBatch } from "@/actions/new_batch";

export default function ManagePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("上传附件");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [page, setPage]: [
    number,
    (value: ((prevState: number) => number) | number) => void,
  ] = React.useState(1);

  const { allBatchResponse, error, isLoading, mutate } = useBatchList(page);

  const allBatchList: FetchedBatchDetail[] = allBatchResponse?.batches || [];
  const pages: number = allBatchResponse?.totalPages || 1;

  const finalBatchList: FinalBatchTableItem[] =
    addStatusToAllBatchList(allBatchList);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("上传附件");
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setFileName("上传附件");
    }, 500);
  };

  return (
    <>
      {/*>>>>>> 创建批次modal <<<<<<*/}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="text-xl font-medium mb-4">创建批次</div>
        <form action={newBatch} className="flex flex-col  gap-2">
          <Input label="批次名称" name="batch_name" isRequired />
          <DateRangePicker
            label="报名时间"
            hideTimeZone
            defaultValue={{
              start: new CalendarDateTime(2024, 2, 3, 9, 15),
              end: new CalendarDateTime(2024, 2, 3, 9, 15),
            }}
          />
          <Textarea
            name="description"
            label="监考说明"
            placeholder="请输入监考说明..."
          />
          <Input
            name="attachment"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            size="lg"
            className="bg-default-100 text-default-500"
            onPress={handleButtonClick}
          >
            {fileName}
          </Button>
          <Divider />
          <Button
            type="button"
            color="danger"
            variant="light"
            onPress={closeModal}
          >
            取消
          </Button>
          <Button type="submit" color="primary" onPress={closeModal}>
            提交
          </Button>
        </form>
      </Modal>
      <MainBody>
        <div className="flex items-center justify-between">
          <div className="mx-1 my-2">
            <Button
              className="mr-4"
              color="primary"
              onPress={() => {
                setIsOpen(true);
              }}
            >
              创建批次
            </Button>
          </div>
        </div>
        <BatchTable
          operation="详情"
          toPath={path.manageDetail}
          page={page}
          pages={pages}
          setPage={setPage}
          items={finalBatchList}
          columns={manageTableColumns}
          isLoading={isLoading}
        />
      </MainBody>
    </>
  );
}

"use client";

import MainBody from "@/components/ui/main-body";
import { manageTableColumns } from "@/utils/table-columns";
import React, { useEffect, useState } from "react";
import { FetchedBatchDetail, FinalBatchTableItem } from "@/entity/entity";
import { path } from "@/utils/path";
import BatchTable from "@/components/batch-table";
import { addStatusToAllBatchList, convertToISO } from "@/utils/utils";
import {
  Button,
  DateRangePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { CalendarDateTime } from "@internationalized/date";
import { useBatchList } from "@/api/client_api";

export default function ManagePage() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [page, setPage]: [
    number,
    (value: ((prevState: number) => number) | number) => void,
  ] = React.useState(1);

  const {
    allBatchResponse,
    error,
    isLoading,
  }: {
    isLoading: boolean;
    allBatchResponse:
      | { batches: FetchedBatchDetail[]; totalPages: number }
      | undefined;
    error: string | undefined;
  } = useBatchList(page);

  const allBatchList: FetchedBatchDetail[] = allBatchResponse?.batches;
  const pages: number = allBatchResponse?.totalPages;

  const finalBatchList: FinalBatchTableItem[] =
    addStatusToAllBatchList(allBatchList);
  return (
    <>
      {/*>>>>>> 创建批次modal <<<<<<*/}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">创建批次</ModalHeader>
          <ModalBody>
            <form className="flex flex-col  gap-2">
              <Input label="批次名称" name="batch_name" isRequired />
              <DateRangePicker
                label="报名时间"
                hideTimeZone
                defaultValue={{
                  start: new CalendarDateTime(2024, 2, 3, 9, 15),
                  end: new CalendarDateTime(2024, 2, 3, 9, 15),
                }}
              />
              <Textarea label="监考说明" placeholder="请输入监考说明..." />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              取消
            </Button>
            <Button type="submit" color="primary" onPress={onClose}>
              提交
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <MainBody>
        <div className="flex items-center justify-between">
          <div className="mx-1 my-2">
            <Button className="mr-4" color="primary" onPress={onOpen}>
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
        />
      </MainBody>
    </>
  );
}

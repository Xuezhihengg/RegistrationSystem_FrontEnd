"use client";

import MainBody from "@/components/ui/main-body";
import { manageTableColumns } from "@/utils/table-columns";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FetchedBatchDetail, FinalBatchTableItem } from "@/entity/entity";
import { path } from "@/utils/path";
import BatchTable from "@/components/batch-table";
import { addStatusToAllBatchList } from "@/utils/utils";
import {
  Button,
  DateRangePicker,
  DateValue,
  Divider,
  RangeValue,
  Textarea,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useBatchList } from "@/api/client_api";
import Modal from "@/components/ui/modal";
import { newBatchAction } from "@/actions/new_batch";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { useToast } from "@/utils/hooks";

export default function ManagePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newBatchName, setNewBatchName] = useState<string>("");
  const [newBatchDescription, setNewBatchDescription] = useState<string>("");
  const [fileName, setFileName] = useState<string>("上传附件");

  const [dateRangeValue, setDateRangeValue] =
    useState<RangeValue<DateValue> | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [page, setPage]: [
    number,
    (value: ((prevState: number) => number) | number) => void,
  ] = React.useState(1);

  const [tableKeyword, setTableKeyword] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const newBatchWithDateRange = newBatchAction.bind(null, {
    start: dateRangeValue?.start.toString(),
    end: dateRangeValue?.end.toString(),
  });
  const {
    batchListResponse: tableListResponse,
    error: tableError,
    isLoading: tableIsLoading,
    mutate,
  } = useBatchList(tableKeyword == "" ? "no_search" : tableKeyword, page);

  const tableBatchList: FetchedBatchDetail[] = tableListResponse?.batches || [];
  const pages: number = tableListResponse?.totalPages || 1;

  const finalBatchList: FinalBatchTableItem[] =
    addStatusToAllBatchList(tableBatchList);

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    console.log(file);
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
      setNewBatchName("");
      setNewBatchDescription("");
      setDateRangeValue(null);
    }, 500);
  };
  const submitModal = () => {
    if (newBatchName === "") {
      return;
    }
    closeModal();
  };

  const doSearch = () => {
    setTableKeyword(searchKeyword);
    setPage(1);
  };

  const [state, formAction] = useFormState(newBatchWithDateRange, {
    message: "",
    error: false,
  });

  useEffect(() => {
    if (searchKeyword == "") {
      setTableKeyword("");
    }
  }, [searchKeyword]);

  useToast(state);

  useEffect(() => {
    if (tableError) {
      toast.error("获取批次列表失败");
    }
  }, [tableError]);

  return (
    <>
      {/*>>>>>> 创建批次modal <<<<<<*/}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="text-xl font-medium mb-4">创建批次</div>
        <form action={formAction} className="flex flex-col  gap-2">
          <Input
            label="批次名称"
            value={newBatchName}
            onValueChange={setNewBatchName}
            isRequired
            required
            name="batchName"
          />
          <DateRangePicker
            label="报名时间"
            value={dateRangeValue}
            onChange={setDateRangeValue}
            hourCycle={24}
            isRequired
            hideTimeZone
            minValue={today(getLocalTimeZone())}
            granularity="minute"
          />
          <Textarea
            label="监考说明"
            value={newBatchDescription}
            onValueChange={setNewBatchDescription}
            name="description"
            placeholder="请输入监考说明..."
          />
          <Input
            name="attachment"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onInput={handleFileChange}
          />
          <Button
            type="button"
            size="lg"
            className="bg-default-100 text-default-500"
            onPress={handleUploadButtonClick}
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
          <Button type="submit" color="primary" onPress={submitModal}>
            提交
          </Button>
        </form>
      </Modal>
      <MainBody>
        <div className="flex items-center justify-between">
          <div className="mx-1 mb-2">
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
        </div>
        <BatchTable
          toPath={path.manageDetail}
          page={page}
          pages={pages}
          setPage={setPage}
          items={finalBatchList}
          columns={manageTableColumns}
          isLoading={tableIsLoading}
        />
      </MainBody>
    </>
  );
}

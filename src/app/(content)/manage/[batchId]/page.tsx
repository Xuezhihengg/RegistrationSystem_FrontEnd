"use client";

import plus from "@/../public/story.png";
import MainBody from "@/components/ui/main-body";
import { DUMMY_batchDetail, DUMMY_examsList, listed } from "@/app/DUMMY_DATA";
import {
  FetchedBatchDetail,
  FetchedExamDetail,
  nameListItem,
} from "@/entity/entity";
import { Card, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import BatchDetailShow from "@/components/batch-detail-show";
import ExamDetail from "@/components/exam-detail";
import {
  Divider,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { listedColumns } from "@/utils/table-columns";
import Image from "next/image";
import Link from "next/link";
import { path } from "@/utils/path";
import Modal from "@/components/ui/modal";
import {
  useBatchDetail,
  useBatchList,
  useExamsByBatchId,
} from "@/api/client_api";

export default function ListPage({ params }: { params: { batchId: string } }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [nameList, setNameList] = React.useState<FetchedBatchDetail[]>([]);

  const {
    batchDetail,
    error: error_useBatchDetail,
    isLoading: isLoading_useBatchDetail,
  }: {
    isLoading: boolean;
    batchDetail: FetchedBatchDetail;
    error: string | undefined;
  } = useBatchDetail(params.batchId);

  const {
    exams,
    error: error_useExamsByBatchId,
    isLoading: isLoading_useExamsByBatchId,
  }: {
    isLoading: boolean;
    exams: FetchedExamDetail[];
    error: string | undefined;
  } = useExamsByBatchId(params.batchId);

  const showList = (exam: FetchedExamDetail) => {
    setIsOpen(true);
  };

  return (
    <>
      {/*>>>>>> 查看名单modal <<<<<<*/}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-1">报名名单</div>
        <Table>
          <TableHeader columns={listedColumns}>
            {(column: { key: string; label: string }) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={listed}>
            {(item: nameListItem) => (
              <TableRow key={item.personnelId}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Divider className="mt-2" />

        <Button
          className="mt-2"
          type="submit"
          color="primary"
          onPress={() => setIsOpen(false)}
        >
          关闭
        </Button>
      </Modal>

      <MainBody>
        <BatchDetailShow batchDetail={batchDetail} />
        <div className="flex flex-col">
          <div className="text-2xl my-2">考试安排</div>
        </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {exams?.map((exam: FetchedExamDetail, index: number) => (
            <Card className="p-2" shadow="sm" key={index}>
              <ExamDetail exam={exam} />
              <CardFooter className=" flex justify-center">
                <Button
                  color="primary"
                  variant="solid"
                  className="w-40"
                  onPress={() => showList(exam)}
                >
                  查看名单
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Button
            className="border-1 shadow-sm rounded-2xl p-2 bg-white h-full hover:bg-default-100 flex flex-col items-center justify-center"
            as={Link}
            href={path.newExam(params.batchId)}
          >
            <Image src={plus} alt="plus" className="w-20 h-20" />
            <div className="p-2 text-default-700">新增考试</div>
          </Button>
        </div>
      </MainBody>
    </>
  );
}

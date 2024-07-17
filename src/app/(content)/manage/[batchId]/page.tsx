"use client";

import plus from "@/../public/story.png";
import MainBody from "@/components/ui/main-body";
import { DUMMY_batchDetail, DUMMY_examsList, listed } from "@/app/DUMMY_DATA";
import { FetchedExamDetail, listedItem } from "@/entity/entity";
import { Card, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import BatchDetailShow from "@/components/batch-detail-show";
import ExamDetail from "@/components/exam-detail";
import {
  DatePicker,
  Divider,
  getKeyValue,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  TimeInput,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { listedColumns } from "@/utils/table-columns";
import Image from "next/image";
import { Input } from "@nextui-org/input";

export default function ListPage({ params }: { params: { batchId: string } }) {
  //>>>>>>modal开闭控制<<<<<<
  const {
    isOpen: isOpenListed,
    onOpen: onOpenListed,
    onClose: onCloseListed,
    onOpenChange: onOpenListedChange,
  } = useDisclosure();
  const {
    isOpen: isOpenNewExam,
    onOpen: onOpenNewExam,
    onClose: onCloseNewExam,
    onOpenChange: onOpenNewExamChange,
  } = useDisclosure();
  //>>>>>>modal开闭控制<<<<<<

  return (
    <>
      {/*>>>>>> 查看名单modal <<<<<<*/}
      <Modal
        isOpen={isOpenListed}
        onClose={onCloseListed}
        onOpenChange={onOpenListedChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">报名名单</ModalHeader>
          <ModalBody>
            <Table>
              <TableHeader columns={listedColumns}>
                {(column: { key: string; label: string }) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={listed}>
                {(item: listedItem) => (
                  <TableRow key={item.personnelId}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ModalBody>
          <Divider className="mt-2" />
          <ModalFooter>
            <Button type="submit" color="primary" onPress={onCloseListed}>
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*>>>>>> 查看名单modal <<<<<<*/}

      {/*>>>>>> 新增考试modal <<<<<<*/}
      <Modal
        isOpen={isOpenNewExam}
        onClose={onCloseNewExam}
        onOpenChange={onOpenNewExamChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">新增考试</ModalHeader>
          <ModalBody>
            <form className="flex flex-col gap-2">
              <Input label="考试科目" name="exam_name" isRequired />
              <Input label="考试地点" name="address" isRequired />
              <Select label="所在校区" name="campus" isRequired>
                <SelectItem key="兴庆校区">兴庆校区</SelectItem>
                <SelectItem key="雁塔校区">雁塔校区</SelectItem>
                <SelectItem key="创新港校区">创新港校区</SelectItem>
              </Select>
              <DatePicker label="考试日期" name="date" isRequired />
              <div className="flex gap-2">
                <TimeInput label="开始时间" isRequired />
                <TimeInput label="结束时间" isRequired />
              </div>
            </form>
          </ModalBody>
          <Divider className="mt-2" />
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onCloseNewExam}>
              取消
            </Button>
            <Button type="submit" color="primary" onPress={onCloseNewExam}>
              提交
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*>>>>>> 新增考试modal <<<<<<*/}

      <MainBody>
        <BatchDetailShow batchDetail={DUMMY_batchDetail} />
        <div className="flex flex-col">
          <div className="text-2xl my-2">考试安排</div>
        </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {DUMMY_examsList.map((exam: FetchedExamDetail, index: number) => (
            <Card className="p-2" shadow="sm" key={index}>
              <ExamDetail exam={exam} />
              <CardFooter className=" flex justify-center">
                <Button
                  color="primary"
                  variant="solid"
                  className="w-40"
                  onPress={onOpenListed}
                >
                  查看名单
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Button
            className="border-1 shadow-sm rounded-2xl p-2 bg-white h-full hover:bg-default-100 flex flex-col items-center justify-center"
            onPress={onOpenNewExam}
          >
            <Image src={plus} alt="plus" className="w-20 h-20" />
            <div className="p-2 text-default-700">新增考试</div>
          </Button>
        </div>
      </MainBody>
    </>
  );
}

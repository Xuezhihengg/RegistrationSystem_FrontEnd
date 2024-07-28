"use client";
import Modal from "@/components/ui/modal";
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
import { listedColumns } from "@/utils/table-columns";
import { NameListItem } from "@/entity/entity";
import { Button } from "@nextui-org/button";
import React, { Key } from "react";
import { useRouter } from "next/navigation";
import { useNameList } from "@/api/client_api";
import { listed } from "@/app/DUMMY_DATA";
import Link from "next/link";
import { path } from "@/utils/path";

export default function ShowNameListModal({
  params,
}: {
  params: { examId: string };
}) {
  const {
    nameList,
    error,
    isLoading,
  }: {
    isLoading: boolean;
    nameList: NameListItem[] | undefined;
    error: string | undefined;
  } = useNameList(params.examId);

  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const router = useRouter();
  const modalClose = () => {
    setIsOpen(false);
    setTimeout(() => router.back(), 800);
  };

  const renderNameList = React.useCallback(
    (nameListItem: NameListItem, columnKey: React.Key) => {
      const cellValue = nameListItem[columnKey as keyof NameListItem];

      switch (columnKey) {
        case "personnelName":
          if (cellValue == null) {
            return (
              <Button size="sm" color="primary" as={Link} href={path.invite()}>
                邀请
              </Button>
            );
          }
          return cellValue;
        case "personnelId":
          if (cellValue == null) {
            return "xxxx";
          }
          return cellValue;
        default:
          return cellValue;
      }
    },
    [],
  );
  return (
    <Modal isOpen={isOpen} onClose={modalClose}>
      <div className="flex flex-col gap-1">报名名单</div>
      <Table>
        <TableHeader columns={listedColumns}>
          {(column: { key: string; label: string }) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={nameList || []}>
          {(item: NameListItem) => (
            <TableRow key={item.personnelId}>
              {(columnKey: Key) => (
                <TableCell>{renderNameList(item, columnKey)}</TableCell>
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
        onPress={modalClose}
      >
        关闭
      </Button>
    </Modal>
  );
}

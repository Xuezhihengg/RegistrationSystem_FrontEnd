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
import { listed } from "@/app/DUMMY_DATA";
import { NameListItem } from "@/entity/entity";
import { Button } from "@nextui-org/button";
import React from "react";
import { useRouter } from "next/navigation";

export default function ShowNameListModal() {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const router = useRouter();
  const modalClose = () => {
    setIsOpen(false);
    setTimeout(() => router.back(), 800);
  };
  return (
    <Modal isOpen={isOpen} onClose={modalClose}>
      <div className="flex flex-col gap-1">报名名单</div>
      <Table>
        <TableHeader columns={listedColumns}>
          {(column: { key: string; label: string }) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={listed}>
          {(item: NameListItem) => (
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
        onPress={modalClose}
      >
        关闭
      </Button>
    </Modal>
  );
}

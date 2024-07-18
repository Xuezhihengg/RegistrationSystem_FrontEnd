"use client";

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
import Modal from "@/components/ui/modal";
import React from "react";
import MainBody from "@/components/ui/main-body";
import { useRouter } from "next/navigation";

export default function ShowNameListPage() {
  const router = useRouter();
  return (
    <MainBody>
      <div className="text-xl font-medium mb-4">监考名单</div>
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
      <Divider className="my-4" />
      <div className="flex justify-end">
        <Button
          type="submit"
          color="primary"
          className="w-36"
          onPress={router.back}
        >
          返回
        </Button>
      </div>
    </MainBody>
  );
}

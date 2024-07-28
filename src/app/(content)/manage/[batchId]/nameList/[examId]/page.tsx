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
import { ApproveItem, NameListItem } from "@/entity/entity";
import { Button } from "@nextui-org/button";
import React, { Key } from "react";
import MainBody from "@/components/ui/main-body";
import { useRouter } from "next/navigation";
import { useNameList } from "@/api/client_api";
import Link from "next/link";
import { path } from "@/utils/path";

export default function ShowNameListPage({
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

  const router = useRouter();
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
    <MainBody>
      <div className="text-xl font-medium mb-4">监考名单</div>
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

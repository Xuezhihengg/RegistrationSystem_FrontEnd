"use client";

import React, { Key, Suspense } from "react";
import { FinalBatchTableItem } from "@/entity/entity";
import {
  Chip,
  Button,
  Table,
  Pagination,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Link from "next/link";
import TableSkeleton from "@/components/ui/table-skeleton";

interface BatchTableProps {
  operation: string;
  toPath: any;
  page: number;
  pages: number;
  setPage: (page: number) => void;
  items: FinalBatchTableItem[];
  columns: { key: string; label: string }[];
  isLoading: boolean;
}

export default function BatchTable(props: BatchTableProps) {
  //>>>>>>定制化列表单元<<<<<<
  const renderCell = React.useCallback(
    (tableItem: FinalBatchTableItem, columnKey: React.Key) => {
      const cellValue: string | number =
        tableItem[columnKey as keyof FinalBatchTableItem];

      switch (columnKey) {
        case "status":
          if (cellValue === "进行中") {
            return (
              <Chip
                className="capitalize"
                color="primary"
                size="sm"
                variant="flat"
              >
                {cellValue}
              </Chip>
            );
          } else if (cellValue === "未开始") {
            return (
              <Chip
                className="capitalize"
                color="danger"
                size="sm"
                variant="flat"
              >
                {cellValue}
              </Chip>
            );
          } else {
            return (
              <Chip
                className="capitalize"
                color="default"
                size="sm"
                variant="flat"
              >
                {cellValue}
              </Chip>
            );
          }
        case "operation":
          return (
            <Button
              color="primary"
              size="sm"
              as={Link}
              href={props.toPath(tableItem.batchId)}
            >
              {props.operation}
            </Button>
          );
        default:
          return cellValue;
      }
    },
    [props],
  );
  //>>>>>>定制化列表单元<<<<<<

  return (
    <>
      {props.isLoading && <TableSkeleton />}
      {!props.isLoading && (
        <Table
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                color="primary"
                page={props.page}
                total={props.pages}
                onChange={(page: number) => props.setPage(page)}
              />
            </div>
          }
        >
          <TableHeader columns={props.columns}>
            {(column: { key: string; label: string }) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={props.items}>
            {(item: FinalBatchTableItem) => (
              <TableRow key={item.batchId}>
                {(columnKey: Key) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}

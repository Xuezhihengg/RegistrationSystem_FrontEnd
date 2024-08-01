"use client";

import { FetchedSignUpDetail, FinalBatchTableItem } from "@/entity/entity";
import {
  getKeyValue,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { Key, useState } from "react";
import { useSignUpList } from "@/api/client_api";
import { signUpListColumns } from "@/utils/table-columns";

export default function SignUpListTable(props: { personnelId: string }) {
  const [page, setPage]: [
    number,
    (value: ((prevState: number) => number) | number) => void,
  ] = useState(1);

  const { signUpListResponse, isLoading, error, mutate } = useSignUpList(
    props.personnelId,
    page,
  );
  const signUpList: FetchedSignUpDetail[] =
    signUpListResponse?.signUpList || [];
  const pages: number = signUpListResponse?.totalPages || 1;
  return (
    <div></div>
    // <Table
    //   bottomContent={
    //     <div className="flex w-full justify-center">
    //       <Pagination
    //         isCompact
    //         showControls
    //         color="primary"
    //         page={page}
    //         total={pages}
    //         onChange={(page: number) => setPage(page)}
    //       />
    //     </div>
    //   }
    // >
    //   <TableHeader columns={signUpListColumns}>
    //     {(column: { key: string; label: string }) => (
    //       <TableColumn key={column.key}>{column.label}</TableColumn>
    //     )}
    //   </TableHeader>
    //   <TableBody items={signUpList}>
    //     {(item: FinalBatchTableItem) => (
    //       <TableRow key={item.batchId}>
    //         {(columnKey: Key) => (
    //           <TableCell>{getKeyValue(item, columnKey as )}</TableCell>
    //         )}
    //       </TableRow>
    //     )}
    //   </TableBody>
    // </Table>
  );
}

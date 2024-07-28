"use client";

import { RiErrorWarningFill } from "react-icons/ri";
import {
  Tabs,
  Tab,
  Table,
  Pagination,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Checkbox,
  Divider,
  Textarea,
  Button,
} from "@nextui-org/react";
import React, { Key, useEffect, useState } from "react";
import { approveList } from "@/app/DUMMY_DATA";
import MainBody from "@/components/ui/main-body";
import { ApproveItem } from "@/entity/entity";
import {
  approveSubmitColumns,
  approveTableColumns,
} from "@/utils/table-columns";
import Link from "next/link";
import { path } from "@/utils/path";
import Modal from "@/components/ui/modal";

export default function ApprovePage() {
  //>>>>>>state初始化<<<<<<
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string> | string>(
    new Set([]),
  );
  const [chosenItems, setChosenItems] = useState<ApproveItem[]>([]);

  const [isAgree, setIsAgree] = React.useState<boolean>(true);
  const [selfFinish, setSelfFinish] = React.useState<boolean>(true);
  //>>>>>>state初始化<<<<<<

  //>>>>>>modal开闭控制<<<<<<
  const [isOpen, setIsOpen] = React.useState(false);
  //>>>>>>modal开闭控制<<<<<<

  //>>>>>>主列表分页控制<<<<<<
  const [page, setPage]: [
    number,
    (value: ((prevState: number) => number) | number) => void,
  ] = React.useState(1);
  const rowsPerPage: number = 10;
  const pages: number = Math.ceil(approveList.length / rowsPerPage);

  const items: ApproveItem[] = React.useMemo(() => {
    const start: number = (page - 1) * rowsPerPage;
    const end: number = start + rowsPerPage;

    return approveList.slice(start, end);
  }, [page]);
  //>>>>>>主列表分页控制<<<<<<

  //>>>>>>内列表分页控制<<<<<<
  const [pageInside, setPageInside]: [
    number,
    (value: ((prevState: number) => number) | number) => void,
  ] = React.useState(1);
  const rowsPerPageInside: number = 5;
  const pagesInside: number = Math.ceil(chosenItems.length / rowsPerPageInside);
  const itemsInside: ApproveItem[] = React.useMemo(() => {
    const start: number = (pageInside - 1) * rowsPerPageInside;
    const end: number = start + rowsPerPageInside;

    return chosenItems.slice(start, end);
  }, [chosenItems, pageInside]);
  //>>>>>>内列表分页控制<<<<<<

  //>>>>>>状态更新<<<<<<  selectedKeys --> chosenItems
  useEffect(() => {
    let filteredItems: ApproveItem[];
    if (selectedKeys instanceof Set) {
      filteredItems = approveList.filter((item: ApproveItem) =>
        (selectedKeys as Set<string>).has(item.approveId),
      );
    } else {
      filteredItems = approveList;
    }
    const changedItems: ApproveItem[] = filteredItems.map(
      (item: ApproveItem) => ({
        ...item,
        operation: `移除:${item.approveId}`,
      }),
    );
    setChosenItems(changedItems);
  }, [selectedKeys]);
  //>>>>>>状态更新<<<<<<

  //>>>>>>按钮事件处理器<<<<<<
  const removeItemHandler = (approveId: string) => {
    setSelectedKeys((prevSelectedKeys) => {
      const newSelectedKeys: Set<string> = new Set<string>(prevSelectedKeys);
      newSelectedKeys.delete(approveId);
      return newSelectedKeys;
    });
  };

  const singleApproveHandler = (approveId: string) => {
    setSelectedKeys((prevSelectedKeys) => {
      const newSelectedKeys: Set<string> = new Set<string>(prevSelectedKeys);
      newSelectedKeys.add(approveId);
      return newSelectedKeys;
    });
    setIsOpen(true);
  };
  //>>>>>>按钮事件处理器<<<<<<

  //>>>>>>定制化列表单元<<<<<<
  const renderCell = React.useCallback(
    (approveItem: ApproveItem, columnKey: React.Key) => {
      const cellValue = approveItem[columnKey as keyof ApproveItem];

      switch (columnKey) {
        case "operation":
          if (cellValue.startsWith("审批")) {
            const approveId: string = cellValue.split(":")[1];
            return (
              <Button
                onPress={() => singleApproveHandler(approveId)}
                size="sm"
                color="primary"
              >
                审批
              </Button>
            );
          } else if (cellValue.startsWith("移除")) {
            const approveId: string = cellValue.split(":")[1];
            return (
              <Button
                onPress={() => removeItemHandler(approveId)}
                size="sm"
                color="primary"
              >
                移除
              </Button>
            );
          }
          break;
        default:
          return cellValue;
      }
    },
    [singleApproveHandler, removeItemHandler],
  );
  //>>>>>>定制化列表单元<<<<<<

  return (
    <>
      {/*>>>>>>审批modal<<<<<<*/}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <>
          <div className="flex flex-col gap-1">审批</div>
          <Table
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  size="sm"
                  color="primary"
                  page={pageInside}
                  total={pagesInside}
                  onChange={(pageInside: number) => setPageInside(pageInside)}
                />
              </div>
            }
          >
            <TableHeader columns={approveSubmitColumns}>
              {(column: { key: string; label: string }) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={itemsInside}>
              {(item: ApproveItem) => (
                <TableRow key={item.approveId}>
                  {(columnKey: Key) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <form>
            <div className="flex justify-around">
              <Checkbox
                name="agree"
                isSelected={isAgree}
                onClick={() => setIsAgree(!isAgree)}
              >
                同意
              </Checkbox>
              <Checkbox
                name="disagree"
                isSelected={!isAgree}
                onClick={() => setIsAgree(!isAgree)}
              >
                不同意
              </Checkbox>
            </div>
            {!isAgree && (
              <Textarea
                name="reason"
                label="不同意理由"
                placeholder="请输入不同意的理由..."
                className="mt-4 mb-2"
              />
            )}
          </form>
          <Divider />
          <div className="flex justify-between items-center">
            <p className="my-2 mr-6 text-center text-sm text-red-700">
              {isAgree && "提交后不可撤销，请谨慎操作!"}
            </p>
            <div className="flex gap-2">
              <Button
                color="danger"
                variant="light"
                onPress={() => setIsOpen(false)}
              >
                取消
              </Button>
              <Button
                type="submit"
                color="primary"
                onPress={() => setIsOpen(false)}
              >
                提交
              </Button>
            </div>
          </div>
        </>
      </Modal>
      {/*>>>>>>审批modal<<<<<<*/}

      <MainBody>
        <Tabs variant="underlined">
          {/*>>>>>>待我审批Tab<<<<<<*/}
          <Tab className="py-0" key="待我审批" title="待我审批">
            <div className="flex items-center justify-between">
              <div className="mx-1 my-2">
                <Button
                  as={Link}
                  href={path.invite()}
                  className="mr-4"
                  color="primary"
                >
                  邀约
                </Button>
                <Button color="default">数据导出</Button>
              </div>
              <Button
                onPress={() => setIsOpen(true)}
                color="primary"
                className="mr-2"
              >
                一键审批
              </Button>
            </div>
            {/*>>>>>>待我审批Tab中的Table<<<<<<*/}
            <Table
              selectedKeys={selectedKeys}
              onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
              selectionMode="multiple"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page: number) => setPage(page)}
                  />
                </div>
              }
            >
              <TableHeader columns={approveTableColumns}>
                {(column: { key: string; label: string }) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={items}>
                {(item: ApproveItem) => (
                  <TableRow key={item.approveId}>
                    {(columnKey: Key) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {/*>>>>>>待我审批Tab中的Table<<<<<<*/}
          </Tab>
          {/*>>>>>>待我审批Tab<<<<<<*/}

          {/*>>>>>>同意报名Tab<<<<<<*/}
          <Tab key="同意报名" title="同意报名">
            <p>同意报名</p>
          </Tab>
          {/*>>>>>>同意报名Tab<<<<<<*/}

          {/*>>>>>>不同意报名Tab<<<<<<*/}
          <Tab key="不同意报名" title="不同意报名">
            <p>不同意报名</p>
          </Tab>
          {/*>>>>>>不同意报名Tab<<<<<<*/}
        </Tabs>
      </MainBody>
    </>
  );
}

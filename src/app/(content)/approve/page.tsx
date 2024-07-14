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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  Divider,
  Textarea,
  Select,
  SelectItem,
  Button,
  Card,
  Input,
} from "@nextui-org/react";
import React, { Key, useEffect, useState } from "react";
import { approveList } from "@/app/DUMMY_DATA";
import MainBody from "@/components/ui/main-body";
import { approveItem } from "@/entity/entity";
import {
  approveSubmitColumns,
  approveTableColumns,
} from "@/components/table/table-columns";

export default function ApprovePage() {
  //>>>>>>state初始化<<<<<<
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string> | string>(
    new Set([]),
  );
  const [chosenItems, setChosenItems] = useState<approveItem[]>([]);

  const [isAgree, setIsAgree] = React.useState<boolean>(true);
  const [selfFinish, setSelfFinish] = React.useState<boolean>(true);
  //>>>>>>state初始化<<<<<<

  //>>>>>>modal开闭控制<<<<<<
  const {
    isOpen: isOpenApprove,
    onOpen: onOpenApprove,
    onClose: onCloseApprove,
    onOpenChange: onOpenApproveChange,
  } = useDisclosure();
  const {
    isOpen: isOpenInvite,
    onOpen: onOpenInvite,
    onClose: onCloseInvite,
    onOpenChange: onOpenInviteChange,
  } = useDisclosure();
  //>>>>>>modal开闭控制<<<<<<

  //>>>>>>主列表分页控制<<<<<<
  const [page, setPage]: [
    number,
    (value: ((prevState: number) => number) | number) => void,
  ] = React.useState(1);
  const rowsPerPage: number = 10;
  const pages: number = Math.ceil(approveList.length / rowsPerPage);

  const items: approveItem[] = React.useMemo(() => {
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
  const itemsInside: approveItem[] = React.useMemo(() => {
    const start: number = (pageInside - 1) * rowsPerPageInside;
    const end: number = start + rowsPerPageInside;

    return chosenItems.slice(start, end);
  }, [chosenItems, pageInside]);
  //>>>>>>内列表分页控制<<<<<<

  //>>>>>>状态更新<<<<<<  selectedKeys --> chosenItems
  useEffect(() => {
    let filteredItems: approveItem[];
    if (selectedKeys instanceof Set) {
      filteredItems = approveList.filter((item: approveItem) =>
        (selectedKeys as Set<string>).has(item.approveId),
      );
    } else {
      filteredItems = approveList;
    }
    const changedItems: approveItem[] = filteredItems.map(
      (item: approveItem) => ({
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
    onOpenApprove();
  };
  //>>>>>>按钮事件处理器<<<<<<

  //>>>>>>定制化列表单元<<<<<<
  const renderCell = React.useCallback(
    (approveItem: approveItem, columnKey: React.Key) => {
      const cellValue = approveItem[columnKey as keyof approveItem];

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
      {/*>>>>>>邀请modal<<<<<<*/}
      <Modal
        isOpen={isOpenInvite}
        onClose={onCloseInvite}
        onOpenChange={onOpenInviteChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">邀约</ModalHeader>
            <ModalBody>
              <Card radius="sm" className="bg-blue-300 p-2 mx-3">
                <div className="flex items-center px-4 gap-4">
                  <RiErrorWarningFill />
                  <p className="text-red-950">
                    通过邀约渠道，不受监考批次时间限制！
                  </p>
                </div>
              </Card>
              <form className="p-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label htmlFor="batchId">监考批次</label>
                  <Select
                    className="col-span-2"
                    name="batchId"
                    placeholder="请选择监考批次"
                    isRequired
                  >
                    <SelectItem key="1">batch_1</SelectItem>
                    <SelectItem key="2">batch_2</SelectItem>
                    <SelectItem key="3">batch_3</SelectItem>
                  </Select>
                  <label htmlFor="methods">选择方式</label>
                  <div className="col-span-2 flex justify-around">
                    <Checkbox
                      name="self-finish"
                      isSelected={selfFinish}
                      onClick={() => setSelfFinish(!selfFinish)}
                    >
                      自走流程
                    </Checkbox>
                    <Checkbox
                      name="help-finish"
                      isSelected={!selfFinish}
                      onClick={() => setSelfFinish(!selfFinish)}
                    >
                      帮助报名
                    </Checkbox>
                  </div>
                </div>
                <Input
                  className="my-4 w-full"
                  placeholder="请输入姓名/工号/学号模糊查询"
                ></Input>
              </form>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onCloseInvite}>
                取消
              </Button>
              <Button type="submit" color="primary" onPress={onCloseInvite}>
                提交
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
        {/*>>>>>>邀请modal<<<<<<*/}

        {/*>>>>>>审批modal<<<<<<*/}
      </Modal>
      <Modal
        isOpen={isOpenApprove}
        onClose={onCloseApprove}
        onOpenChange={onOpenApproveChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">报名审批</ModalHeader>
            <ModalBody>
              {/*>>>>>>审批modal中的Table<<<<<<*/}
              <Table
                bottomContent={
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      size="sm"
                      color="primary"
                      page={pageInside}
                      total={pagesInside}
                      onChange={(pageInside: number) =>
                        setPageInside(pageInside)
                      }
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
                  {(item: approveItem) => (
                    <TableRow key={item.approveId}>
                      {(columnKey: Key) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {/*>>>>>>审批modal中的Table<<<<<<*/}

              {/*>>>>>>审批modal中的form<<<<<<*/}
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
              {/*>>>>>>审批modal中的form<<<<<<*/}
            </ModalBody>
            <Divider />
            <ModalFooter>
              {isAgree && (
                <p className="my-2 mr-6 text-center text-sm text-red-700">
                  提交后不可撤销，请谨慎操作!
                </p>
              )}
              <Button color="danger" variant="light" onPress={onCloseApprove}>
                取消
              </Button>
              <Button type="submit" color="primary" onPress={onCloseApprove}>
                提交
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      {/*>>>>>>审批modal<<<<<<*/}

      <MainBody>
        <Tabs variant="underlined">
          {/*>>>>>>待我审批Tab<<<<<<*/}
          <Tab className="py-0" key="待我审批" title="待我审批">
            <div className="flex items-center justify-between">
              <div className="mx-1 my-2">
                <Button onPress={onOpenInvite} className="mr-4" color="primary">
                  邀约
                </Button>
                <Button color="default">数据导出</Button>
              </div>
              <Button
                onPress={onOpenApproveChange}
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
                {(item: approveItem) => (
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

import { Skeleton } from "@nextui-org/skeleton";

function TableHeaderSkeleton() {
  return (
    <Skeleton className=" rounded-lg mt-4">
      <div className="h-8  rounded-lg bg-default-200"></div>
    </Skeleton>
  );
}

function TableBodySkeleton() {
  return (
    <div className="space-y-3 m-4">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-4 w-4/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">
        <div className="h-4 w-2/5 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
      </Skeleton>
    </div>
  );
}

export default function TableSkeleton() {
  return (
    <>
      <TableHeaderSkeleton />
      <TableBodySkeleton />
      <TableBodySkeleton />
      <TableBodySkeleton />
      <TableBodySkeleton />
    </>
  );
}

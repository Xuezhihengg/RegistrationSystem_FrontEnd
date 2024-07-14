import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { path } from "@/utils/path";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Card className="mt-40 max-w-md mx-auto">
      <CardHeader className="flex-col items-start mt-4 ml-8">
        <h1 className="font-bold  text-4xl mb-4">Hello!</h1>
        <p>欢迎登录研究生监考报名系统</p>
      </CardHeader>
      <CardBody className="flex-col gap-6 items-center">
        <Input className="max-w-sm" type="text" label="username"></Input>
        <Input className="max-w-sm" type="password" label="password"></Input>
        <Button
          className="text-white w-56"
          color="primary"
          variant="solid"
          size="lg"
          as={Link}
          href={path.signup()}
        >
          登录
        </Button>
      </CardBody>
    </Card>
  );
}

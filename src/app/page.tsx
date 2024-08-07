"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { auth, logIn } from "@/api/serve_api";
import { AuthInfo } from "@/entity/entity";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const result: AuthInfo = await logIn(username, password);
      console.log(result);
    } catch (error) {
      toast.error("登录失败");
    }
    toast.success("登录成功");
    router.push("signup");
  };

  return (
    <Card className="mt-40 max-w-md mx-auto">
      <CardHeader className="flex-col items-start mt-4 ml-8">
        <h1 className="font-bold  text-4xl mb-4">Hello!</h1>
        <p>欢迎登录研究生监考报名系统</p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-6 items-center"
          onSubmit={submitHandler}
        >
          <Input
            className="max-w-sm"
            type="text"
            placeholder="用户名"
            value={username}
            onValueChange={setUsername}
          ></Input>
          <Input
            className="max-w-sm"
            type="password"
            placeholder="密码"
            value={password}
            onValueChange={setPassword}
          ></Input>
          <Button
            className="text-white w-56"
            color="primary"
            variant="solid"
            type="submit"
            size="lg"
          >
            登录
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

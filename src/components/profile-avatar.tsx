"use client";

import { Avatar } from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { uploadAvatarAction } from "@/actions/avatar_upload";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { host } from "@/api/request_path";
import { useToast } from "@/utils/hooks";

export default function ProfileAvatar(props: {
  personnelId: string;
  avatar: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileSubmitRef = useRef<HTMLButtonElement>(null);

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (fileSubmitRef.current) {
      fileSubmitRef.current.click();
    }
  };

  const uploadAvatarActionWithPersonnelId = uploadAvatarAction.bind(
    null,
    props.personnelId,
  );

  const [state, formAction] = useFormState(uploadAvatarActionWithPersonnelId, {
    message: "",
    error: false,
  });

  useToast(state);

  return (
    <>
      <form action={formAction}>
        <Input
          name="avatar"
          type="file"
          ref={fileInputRef}
          className="hidden"
          onInput={handleFileChange}
        />
        <Button type="submit" ref={fileSubmitRef} className="hidden" />
      </form>
      <Avatar
        className=" w-36 h-36 text-large mb-4 hover:cursor-pointer"
        src={host + "/" + props.avatar}
        onClick={handleUploadButtonClick}
      />
    </>
  );
}

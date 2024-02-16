import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  issueId: number;
}

const DeleteIssueBtn = ({ issueId }: Props) => {
  return (
    <Button color="red">
      <Pencil2Icon />
      <Link href={`/issues/${issueId}/edit`}>Delete Issue</Link>
    </Button>
  );
};

export default DeleteIssueBtn;

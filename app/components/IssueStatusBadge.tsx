import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface IssueStatusBadgeProps {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { color: "red", label: "Open" },
  CLOSED: { color: "violet", label: "Closed" },
  IN_PROGRESS: { color: "green", label: "In Progress" },
};

const IssueStatusBadge = ({ status }: IssueStatusBadgeProps) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;

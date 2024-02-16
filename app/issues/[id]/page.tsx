import React from "react";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

interface IssueDetailPageProps {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params: { id } }: IssueDetailPageProps) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) {
    notFound();
  }
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <IssueStatusBadge status={issue.status} />
      <p>{issue.createdAt.toDateString()}</p>
      <p>{issue.updatedAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;

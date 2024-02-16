import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetails from "./IssueDetails";
import DeleteIssueBtn from "./DeleteIssueBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

interface IssueDetailPageProps {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params: { id } }: IssueDetailPageProps) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) notFound();
  return (
    <Grid gap="5" columns={{ initial: "1", md: "5" }}>
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="col-span-1">
          <Flex gap="4" direction="column">
            <EditIssueBtn issueId={issue.id} />
            <DeleteIssueBtn issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

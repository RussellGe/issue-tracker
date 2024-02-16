"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";
import { z } from "zod";

interface Props {
  issue?: Issue;
}

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, SetError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data: IssueFormData) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
        router.push(`/issues/${issue.id}`);
        router.refresh();
      } else {
        await axios.post("/api/issues", data);
        router.push("/issues");
        router.refresh();
      }
    } catch (error) {
      SetError("Unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field }) => {
            return <SimpleMdeReact {...field} placeholder="Description" />;
          }}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;

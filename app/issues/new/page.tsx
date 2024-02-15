"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/errorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, SetError] = useState("");
  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            SetError("Unexpected error occurred");
          }
        })}
        className="space-y-3"
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Controller
          control={control}
          name="description"
          render={({ field }) => {
            return <SimpleMdeReact {...field} placeholder="Description" />;
          }}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

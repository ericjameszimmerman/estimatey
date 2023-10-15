"use client"

import { trpc } from '@/app/_trpc/client'
import { User } from '@/app/user'
import { Ghost } from "lucide-react"
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"

type Inputs = {
  name: string;
  description: string;
};

const CreateProjectForm = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    description: "",
  });

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const res = await fetch("http://localhost:3000/api/projects", {
          method: "POST",
          body: JSON.stringify({
            ...inputs,
          }),
        });
  
        const data = await res.json();
  
        if (data.id) {
          router.push(`/projects/${data.id}`);
        } else {
          console.log("error");
        }

      } catch (err) {
        console.log(err);
      }
    };

  return <main className="mx-auto max-w-7xl md:p-10 content-center">
    <div className="mt-8 flex flex-col items-start border-b border-gray-200 pb-5 sm:flex-row sm:flow-row sm:items-center sm:gap-0">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create a project</CardTitle>
          <CardDescription>
            Enter the following to create a new project
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              className="ring-1 ring-gray-200 p-4 rounded-sm placeholder:text-gray-200 outline-none"
              type="text"
              placeholder="Project Name"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Project Description</Label>
            <textarea
              rows={3}
              className="ring-1 ring-gray-200 p-4 rounded-sm placeholder:text-gray-200 outline-none"
              placeholder="Project Description"
              name="description"
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create project</Button>
        </CardFooter>
      </Card>
      </form>
    </div>
  </main>
}

export default CreateProjectForm

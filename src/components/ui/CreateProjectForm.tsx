"use client"

import { trpc } from '@/app/_trpc/client'
import { User } from '@/app/user'
import { Ghost } from "lucide-react"
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  return <main className="mx-auto max-w-7xl md:p-10">
    <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:flow-row sm:items-center sm:gap-0">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">
          Add New Project
        </h1>

        <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Name</label>
            <input
              className="ring-1 ring-gray-200 p-4 rounded-sm placeholder:text-gray-200 outline-none"
              type="text"
              placeholder="Project Name"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm">Description</label>
            <textarea
              rows={3}
              className="ring-1 ring-gray-200 p-4 rounded-sm placeholder:text-gray-200 outline-none"
              placeholder="Project Description"
              name="description"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-gray-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
          >
            Submit
          </button>
      </form>
    </div>
  </main>
}

export default CreateProjectForm

import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const select = {
  id: true,
  createdAt: true,
  name: true,
};

// FETCH ALL PROJECTS
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const projects = await db.project.findMany({
      where: {
        memberships: {
          some: {
            userId: userId ?? undefined,
          },
        },
      },
      select,
    });
    return new NextResponse(JSON.stringify(projects), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const project = await db.project.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(project), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
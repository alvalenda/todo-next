"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/db";
import { createTodoSchema } from "@/lib/zod";
import { Todo } from "@/types";
import { Prisma } from "@prisma/client";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

export async function createTodoAction(todo: Pick<Todo, "title">) {
  const schema = createTodoSchema;
  const body = schema.parse(todo);
  const session: ISession | null = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { user } = session;
  if (!user) return new Response("Unauthorized", { status: 403 });

  const id = user.id ? { id: user.id } : undefined;
  const data: Prisma.TodoCreateInput = {
    title: body.title,
    user: { connect: id },
  };

  // * daqui o action deveria chamar o arquivo que lida com o prisma com await e depois revalidate em revalidatePatch("/")

  return await prisma.todo.create({ data });
}

interface ISession extends Session {
  user?: {
    id?: string | null | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

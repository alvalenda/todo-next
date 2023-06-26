"use server";

import { prisma } from "@/lib/db/db";
import { userCreateSchema, userUpdateSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { Session } from "next-auth";

export async function createUserAction(user: {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}): Promise<ActionResponse> {
  try {
    const { email, name, password } = userCreateSchema.parse(user);
    const data: Prisma.UserCreateInput = {
      email,
      name,
      password: await hash(password, 12),
    };

    await prisma.user.create({ data });

    return { ok: true, message: "Usuário criado com sucesso", status: 201 };
  } catch (error: any) {
    if (error?.code === "P2002") {
      return { ok: false, message: "Email já cadastrado", status: 400 };
    }
    return { ok: false, message: "Erro ao criar usuário", status: 500 };
  }
}

export async function updateAvatarAction(
  avatar: string,
  session: Session
): Promise<ActionResponse> {
  try {
    const { user } = session;
    if (!user) return { ok: false, message: "Unauthorized", status: 403 };

    const id = user.id ? { id: user.id } : undefined;
    if (!id) return { ok: false, message: "Unauthorized", status: 403 };
    const data: Prisma.UserUpdateInput = {
      image: avatar,
    };

    await prisma.user.update({ where: id, data });
    return { ok: true, message: "Avatar atualizado com sucesso", status: 200 };
  } catch (error) {
    return { ok: false, message: "Erro ao atualizar o avatar", status: 500 };
  }
}

export async function updateUserAction(
  user: { name: string; username: string },
  session: Session
): Promise<ActionResponse> {
  try {
    const { user: sessionUser } = session;
    if (!sessionUser)
      return { ok: false, message: "Unauthorized", status: 403 };

    const id = sessionUser.id ? { id: sessionUser.id } : undefined;
    if (!id) return { ok: false, message: "Unauthorized", status: 403 };
    const { name, username } = userUpdateSchema.parse(user);
    const data: Prisma.UserUpdateInput = { name, username };

    await prisma.user.update({ where: id, data });
    return { ok: true, message: "Usuário atualizado com sucesso", status: 200 };
  } catch (error: any) {
    if (error?.code === "P2002") {
      return {
        ok: false,
        message: "Nome de usuário já cadastrado",
        status: 400,
      };
    }

    return {
      ok: false,
      message: error?.message ?? "Erro ao atualizar o usuário",
      status: 500,
    };
  }
}

type ActionResponse = {
  ok: boolean;
  message: string;
  status: number;
};

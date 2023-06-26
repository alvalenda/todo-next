import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(6, {
      message: "A tarefa deve ter no mínimo 6 caracteres.",
    })
    .max(45, {
      message: "A tarefa deve ter no máximo 45 caracteres.",
    })
    .nonempty({
      message: "A tarefa não pode ser vazia.",
    }),
});

export const userAuthSchema = z.object({
  email: z.string().email({
    message: "O email deve ser válido",
  }),
  password: z
    .string()
    .min(4, {
      message: "A senha deve ter no mínimo 6 caracteres",
    })
    .max(45, {
      message: "A senha deve ter no máximo 45 caracteres",
    })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{4,}$/,
      {
        message:
          "A senha deve conter uma letra maiúscula, uma minúscula, um número e um caractere especial",
      }
    )
    .nonempty({
      message: "A senha não pode ser vazia",
    }),
});

const _userCreateSchema = userAuthSchema.extend({
  name: z
    .string()
    .min(4, {
      message: "O nome deve ter no mínimo 4 caracteres",
    })
    .max(45, {
      message: "O nome deve ter no máximo 45 caracteres",
    })
    .nonempty({
      message: "O nome não pode ser vazio",
    }),
  confirmPassword: z.string().nonempty({
    message: "A senha não pode ser vazia",
  }),
});

export const userCreateSchema = _userCreateSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  }
);

export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "O nome deve ter no mínimo 4 caracteres",
    })
    .max(45, {
      message: "O nome deve ter no máximo 45 caracteres",
    })
    .nonempty({
      message: "O nome não pode ser vazio",
    }),

  username: z
    .string()
    .min(4, {
      message: "O nome de usuário deve ter no mínimo 4 caracteres",
    })
    .max(15, {
      message: "O nome de usuário deve ter no máximo 15 caracteres",
    })
    .regex(/^[a-z0-9_]+$/, {
      message: "Deve conter apenas letras, números e _",
    }),
});

const _userUpdatePasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "A senha deve ter no mínimo 6 caracteres",
    })
    .max(45, {
      message: "A senha deve ter no máximo 45 caracteres",
    })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{4,}$/,
      {
        message:
          "A senha deve conter uma letra maiúscula, uma minúscula, um número e um caractere especial",
      }
    )
    .nonempty({
      message: "A senha não pode ser vazia",
    }),

  newPassword: z
    .string()
    .min(6, {
      message: "A senha deve ter no mínimo 6 caracteres",
    })
    .max(45, {
      message: "A senha deve ter no máximo 45 caracteres",
    })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{4,}$/,
      {
        message:
          "A senha deve conter uma letra maiúscula, uma minúscula, um número e um caractere especial",
      }
    )
    .nonempty({
      message: "A senha não pode ser vazia",
    }),

  confirmPassword: z.string().nonempty({
    message: "A senha não pode ser vazia",
  }),
});

export const userUpdatePasswordSchema = _userUpdatePasswordSchema.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  }
);

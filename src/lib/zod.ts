import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(6, {
      message: "deve ter no mínimo 6 caracteres.",
    })
    .max(45, {
      message: "deve ter no máximo 45 caracteres.",
    })
    .nonempty({
      message: "a tarefa não pode ser vazia.",
    }),
});

export const userAuthSchema = z.object({
  email: z.string().email({
    message: "o email deve ser válido",
  }),
  password: z
    .string()
    .min(4, {
      message: "deve ter no mínimo 6 caracteres",
    })
    .max(45, {
      message: "deve ter no máximo 45 caracteres",
    })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{4,}$/,
      {
        message:
          "deve conter uma letra maiúscula, uma minúscula, um número e um caractere especial",
      }
    )
    .nonempty({
      message: "a senha não pode ser vazia",
    }),
});

export const userCreateSchema = userAuthSchema
  .extend({
    name: z
      .string()
      .min(4, {
        message: "deve ter no mínimo 4 caracteres",
      })
      .max(45, {
        message: "deve ter no máximo 45 caracteres",
      })
      .nonempty({
        message: "o nome não pode ser vazio",
      }),
    confirmPassword: z.string().nonempty({
      message: "a senha não pode ser vazia",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "as senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "deve ter no mínimo 4 caracteres",
    })
    .max(45, {
      message: "deve ter no máximo 45 caracteres",
    })
    .nonempty({
      message: "o nome não pode ser vazio",
    }),

  username: z
    .string()
    .max(15, {
      message: "máximo 15 caracteres",
    })
    .regex(/^(@?[A-Za-z0-9]{4,15})?$/, {
      message: "mínimo de 4 letras e números",
    })
    .optional(),
});

export const userUpdatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, {
        message: "deve ter no mínimo 6 caracteres",
      })
      .max(45, {
        message: "deve ter no máximo 45 caracteres",
      })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{4,}$/,
        {
          message:
            "deve conter uma letra maiúscula, uma minúscula, um número e um caractere especial",
        }
      )
      .nonempty({
        message: "a senha não pode ser vazia",
      }),

    newPassword: z
      .string()
      .min(6, {
        message: "deve ter no mínimo 6 caracteres",
      })
      .max(45, {
        message: "deve ter no máximo 45 caracteres",
      })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{4,}$/,
        {
          message:
            "deve conter uma letra maiúscula, uma minúscula, um número e um caractere especial",
        }
      )
      .nonempty({
        message: "a senha não pode ser vazia",
      }),

    confirmPassword: z.string().nonempty({
      message: "a senha não pode ser vazia",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "as senhas não conferem",
    path: ["confirmPassword"],
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "a nova senha deve ser diferente da atual",
    path: ["newPassword"],
  });

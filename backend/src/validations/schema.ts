import vine from "@vinejs/vine";

const registerSchema = vine.object({
  name: vine.string().minLength(2).trim(),
  email: vine.string().trim().email(),
  password: vine
    .string()
    .minLength(8)
    .maxLength(32)
    .regex(/[a-zA-Z]/)
    .regex(/[0-9]/)
    .regex(/[^a-zA-Z0-9]/),
});

const loginSchema = vine.object({
  email: vine.string().email().trim(),
  password: vine
    .string()
    .minLength(8)
    .maxLength(32)
    .regex(/[a-zA-Z]/)
    .regex(/[0-9]/)
    .regex(/[^a-zA-Z0-9]/),
});

const registerValidator = vine.compile(registerSchema);
const loginValidator = vine.compile(loginSchema);

export {
  registerValidator,
  loginValidator
}
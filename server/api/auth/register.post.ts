import { hash } from "@node-rs/argon2";
import * as v from "valibot";
import { cookieName, sessionExpiresIn } from "~~/server/constants";
import { db } from "~~/server/database";
import { userTable } from "~~/server/database/schema";
import { createSession, generateToken } from "~~/server/session";

export const bodySchema = v.object({
  username: v.pipe(
    v.string("Username is required"),
    v.minLength(3, "Username must be at least 3 characters long"),
    v.maxLength(32, "Username must be at most 32 characters long"),
    v.nonEmpty("Username is required"),
  ),
  password: v.pipe(
    v.string("Password is required"),
    v.minLength(8, "Password must be at least 8 characters long"),
    v.nonEmpty("Password is required"),
    v.regex(/[a-z]/, "Your password must contain a lowercase letter."),
    v.regex(/[A-Z]/, "Your password must contain a uppercase letter."),
    v.regex(/[0-9]/, "Your password must contain a number."),
  ),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    v.safeParse(bodySchema, body),
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      data: body.issues,
    });
  }

  const hashedPassword = await hash(body.output.password);

  const [user] = await db
    .insert(userTable)
    .values({
      username: body.output.username,
      password: hashedPassword,
    })
    .returning();

  const token = generateToken();

  createSession(user.id, token);

  setCookie(event, cookieName, token, {
    secure: true,
    sameSite: "lax",
    httpOnly: true,
    maxAge: sessionExpiresIn,
  });

  return sendNoContent(event);
});

import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import * as v from "valibot";
import { cookieName, sessionExpiresIn } from "~~/server/constants";
import { db } from "~~/server/database";
import { userTable } from "~~/server/database/schema";
import { createSession, generateToken } from "~~/server/session";

const bodySchema = v.object({
  username: v.pipe(
    v.string("Username is required"),
    v.nonEmpty("Username is required"),
  ),
  password: v.pipe(
    v.string("Password is required"),
    v.nonEmpty("Password is required"),
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
      message: "Bad Request",
    });
  }

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, body.output.username));

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: "User not found",
    });
  }

  const isValidPassword = await verify(user.password, body.output.password);
  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid credentials",
    });
  }

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

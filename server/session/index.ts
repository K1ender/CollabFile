import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { eq } from "drizzle-orm";
import { sessionExpiresIn, sessionHalfExpiresIn } from "../constants";
import { db } from "../database";
import { sessionTable, userTable } from "../database/schema";

export function generateToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  userID: number,
  token: string,
): Promise<typeof sessionTable.$inferSelect> {
  const sessionID = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: typeof sessionTable.$inferInsert = {
    id: sessionID,
    userID,
    expiresAt: new Date(Date.now() + sessionExpiresIn),
  };

  await db.insert(sessionTable).values(session);

  return session;
}

export async function validateSession(token: string): Promise<{
  session: typeof sessionTable.$inferSelect | null;
  user: typeof userTable.$inferSelect | null;
}> {
  const sessionID = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const [result] = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userID, userTable.id))
    .where(eq(sessionTable.id, sessionID));

  if (!result) {
    return {
      session: null,
      user: null,
    };
  }

  const { session, user } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionID));
    return {
      session: null,
      user: null,
    };
  }

  if (Date.now() >= session.expiresAt.getTime() - sessionHalfExpiresIn) {
    await db
      .update(sessionTable)
      .set({ expiresAt: new Date(Date.now() + sessionExpiresIn) })
      .where(eq(sessionTable.id, sessionID));
  }
  return {
    session,
    user,
  };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

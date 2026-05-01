import { useAuth } from "~~/server/hooks/auth";

export default defineEventHandler(async (event) => {
  const { user } = await useAuth(event);
  return user;
});

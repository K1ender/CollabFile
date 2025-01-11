import { sessionTable, userTable } from "./database/schema";

declare module "h3" {
  export interface H3EventContext {
    user: Omit<typeof userTable.$inferSelect, "password">;
    session: typeof sessionTable.$inferSelect;
  }
}

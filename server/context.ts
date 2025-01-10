import { sessionTable, userTable } from "./database/schema";

declare module "h3" {
  export interface H3Context {
    user?: Omit<typeof userTable.$inferSelect, "password">;
    session?: typeof sessionTable.$inferSelect;
  }
}

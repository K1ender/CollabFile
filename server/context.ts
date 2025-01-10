import { userTable } from "./database/schema";

declare module "h3" {
  export interface H3Context {
    user?: typeof userTable.$inferSelect;
  }
}

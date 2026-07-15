import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  product: ["create", "update", "delete"],
  order: ["view", "view-own", "update-status"],
} as const;

export const ac = createAccessControl(statement);

export const manager = ac.newRole({
  ...adminAc.statements,
  product: ["create", "update", "delete"],
  order: ["view", "view-own", "update-status"],
});

export const staff = ac.newRole({
  product: [],
  order: ["view", "update-status"],
});

export const customer = ac.newRole({
  product: [],
  order: ["view-own"],
});

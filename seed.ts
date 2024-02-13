import { db } from "./lib/db";
import { employees, type NewEmployee } from "./lib/db/schema";

export const SEED: NewEmployee[] = [
  {
    name: "Abhishek",
    currency: "USD",
    salary: 145000,
    department: "Engineering",
    sub_department: "Platform",
  },
  {
    currency: "USD",
    department: "Banking",
    salary: 90000,
    name: "Anurag",
    sub_department: "Loan",
    on_contract: true,
  },
  {
    name: "Himani",
    currency: "USD",
    salary: 240000,
    department: "Engineering",
    sub_department: "Platform",
  },
  {
    name: "Yatendra",
    currency: "USD",
    salary: 30,
    department: "Operations",
    sub_department: "CustomerOnboarding",
  },
  {
    name: "Ragini",
    currency: "USD",
    salary: 30,
    department: "Engineering",
    sub_department: "Platform",
  },
  {
    currency: "USD",
    name: "Nikhil",
    department: "Engineering",
    salary: 110000,
    sub_department: "Platform",
    on_contract: true,
  },
  {
    name: "Guljit",
    currency: "USD",
    salary: 30,
    department: "Administration",
    sub_department: "Agriculture",
  },
  {
    name: "Himanshu",
    currency: "EUR",
    salary: 70000,
    department: "Operations",
    sub_department: "CustomerOnboarding",
  },
  {
    name: "Anupam",
    currency: "INR",
    salary: 200000000,
    department: "Engineering",
    sub_department: "Platform",
  },
];

await db
  .insert(employees)
  .values(SEED)
  .then(() => {
    console.log("\n🌱 Seeding is done\n");
  });

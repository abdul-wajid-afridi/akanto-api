import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { UploadFiles } from "./src/utils/Uploads";

const prisma = new PrismaClient();
const app = express();

console.log("railway");

app.get("/users", async (req: Request, res: Response) => {
  const data = await prisma.user.findMany();
  res.json({
    status: "success",
    data,
  });
});

app.post(
  "/users",
  UploadFiles.single("name"),
  async (req: Request, res: Response) => {
    const data = await prisma.user.create({
      data: { email: req.body.email, name: req.file?.filename },
    });
    res.json({
      status: "success",
      data,
    });
  }
);

app.listen(3007, () => console.log("app runs on port 3007"));

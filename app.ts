import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { UploadFiles } from "./src/utils/Uploads";

const prisma = new PrismaClient();
const app = express();

console.log("railway");
const data = prisma.user.findMany().then((data) => console.log(data));

app.get("/users", async (req: Request, res: Response) => {
  const data = await prisma.user.findMany();
  res.json({
    status: "success",
    data,
  });
});

console.log("railway2");

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

app.listen(3007, "0.0.0.0", () => console.log("app runs on port 3007"));

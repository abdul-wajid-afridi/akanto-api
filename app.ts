import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { UploadFiles } from "./src/utils/Uploads";
// import dotenv from "doten"
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 9000;
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

app.listen(port, () => console.log("app runs on port " + port));

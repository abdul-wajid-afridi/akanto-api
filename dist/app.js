"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const Uploads_1 = require("./src/utils/Uploads");
// import dotenv from "doten"
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT || 9000;
console.log("railway");
const data = prisma.user.findMany().then((data) => console.log(data));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.user.findMany();
    res.json({
        status: "success",
        data,
    });
}));
console.log("railway2");
app.post("/users", Uploads_1.UploadFiles.single("name"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield prisma.user.create({
        data: { email: req.body.email, name: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename },
    });
    res.json({
        status: "success",
        data,
    });
}));
app.listen(port, () => console.log("app runs on port " + port));

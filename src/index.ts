import express, { Express, Request, Response } from "express";
import { PORT } from "./config";
import apiRouter from "./routers";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors.middleware";

const app: Express = express();
app.use(express.json());

app.use("/api", apiRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true,
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}, ${addr.pincode}`;
        },
      },
    },
  },
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Example app listening on port", PORT);
});

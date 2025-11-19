import express, { NextFunction, Request, Response } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

// import router from "./app/routes";
import helmet from "helmet";
import connectWithMongoose from "./database/DatabseConnect";
import router from "./app/routes";

const app = express();

app.use((req: Request, res: Response, next: NextFunction): void => {
  if (!req.accepts("json")) {
    res.status(406).send("Not Acceptable");
    return;
  }
  next();
});

app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ca-consumer.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Include OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);
app.options("/", cors());

// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/v1", (req, res) => {
  res.send(" 😈 Hello World! ");
});

app.use("/api/v1", router);
async function run() {
  try {
    await connectWithMongoose();

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

export default app;

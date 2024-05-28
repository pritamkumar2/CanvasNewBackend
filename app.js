import express from "express";
import cors from "cors";
import connectDb from "./utils/Db.js";
import Razorpay from "razorpay";
import bodyParser from "body-parser";
const app = express();

app.use(express.json());
const corsOptions = {
  origin: `${process.env.FRONTENDLINK}`,
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD,OPTIONS",
  credentials: true,
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
export const instance = new Razorpay({
  key_id: process.env.RZP_APIKEY,
  key_secret: process.env.RZP_APISECRET,
});
import router from "./router/auth-router.js";
const port = process.env.PORT || 4000;

app.use("/api/", router);

connectDb().then(() => {
  app.listen(port, () => {
    console.log("running on port " + port);
  });
});

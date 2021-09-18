import express, { Request, Response, urlencoded } from "express";
import { router } from "./routes/routes"
const app = express();


// Body Parser Config
app.use(urlencoded({extended: false}))
app.use(express.json());

app.use("/", router);

app.listen(8080, () => {
    console.log("app is running")
});
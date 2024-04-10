import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import BookRoutes from "./routes/BookRoutes.js";
import cors from "cors";

const app = express();

//MiddleWare for parsing request body
app.use(express.json());

//MiddleWare for CORS POLICY
//Methor:1 : allow all origins with default of cors(*)
app.use(cors());
//Method:2
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["Content-Type"] 
// }));

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack Tutorial");
})

app.use("/books", BookRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to database");
        app.listen(PORT, () => {
            console.log(`listening to port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });
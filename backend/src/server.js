import app from "./app.js";
import { config } from "dotenv";

const env = config({
    path: "./.env",
});

//* Listening on port
const PORT = process.env.PORT;
const HOST = process.env.HOST;
app.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
});

// app.listen(PORT);

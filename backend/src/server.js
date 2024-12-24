import app from "./app.js";
import { config } from "dotenv";

const env = config({
    path: "./.env",
});

//* Listening on port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

// app.listen(PORT);

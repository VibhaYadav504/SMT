import dotenv from "dotenv";

const result = dotenv.config();
 console.log("CLIENT_URL from index.js:", process.env.CLIENT_URL);
console.log(result);
console.log(process.env.CLIENT_URL);
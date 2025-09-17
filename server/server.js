const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler"); 
const cors = require("cors");
const cookieParser = require("cookie-parser"); 


const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();

const PORT = 8000;

const allowedOrigins = [
  "https://serenote-frontend2.vercel.app",   // production frontend
  "https://serenote-frontend2-git-main-aritra-majees-projects.vercel.app", // preview
  "http://localhost:5173" // local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.get("/", (req, res) => {
  res.send("Server is live!");
});
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/moods", require("./routes/moodRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
module.exports = app;

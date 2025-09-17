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

app.use(cors({
  origin: "https://serenote-frontend2.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Handle preflight explicitly (optional)
app.options("*", cors());

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

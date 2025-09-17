const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler"); 
const cors = require("cors");
const cookieParser = require("cookie-parser"); 


const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();

const PORT = process.env.PORT || 8001;

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/moods", require("./routes/moodRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

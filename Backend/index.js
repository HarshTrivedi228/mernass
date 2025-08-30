const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profileRoutes");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ Mongo Error:", err));

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);

// ✅ Static Frontend
app.use(express.static(path.join(_dirname, "/Frontend/dist")));

// ✅ Catch-all Route (Fix applied here)
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

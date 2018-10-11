const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const authRoutes = require("./authRoutes");



// API Routes
router.use("/auth", authRoutes);
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;
const express = require("express");
const router = express.Router();
const authRoutes = require("./authroutes");
const productRoutes = require("./productroutes");
const cartRoutes = require("./cartroutes");
const userRoutes = require("./userRoutes");
const duserRoutes = require("./duserroutes");
const tasteProfileRoutes = require("./tasteprofileroutes");

// Define routes
router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/user", userRoutes);
router.use("/duser", duserRoutes);
router.use("/tasteprofile", tasteProfileRoutes);

// Export router
module.exports = router;

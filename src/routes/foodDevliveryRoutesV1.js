const express = require("express");
const router = express.Router();
const { fetchPriceByDistance } = require("../controllers/pricingController");

router.post("/price/fetchByDistance", fetchPriceByDistance);

module.exports = router;

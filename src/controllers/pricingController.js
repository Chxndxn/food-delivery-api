const pricingService = require("../services/pricingService");

exports.fetchPriceByDistance = async (req, res) => {
  try {
    const { zone, organization_id, total_distance, item_type } = req.body;
    if (zone && organization_id && total_distance && item_type) {
      const totalPrice = await pricingService.calculateTotalPrice(
        zone,
        organization_id,
        total_distance,
        item_type
      );
      res.status(200).json({ total_price: totalPrice });
    } else {
      res.status(400).json({ error: "Please check the request body." });
    }
  } catch (err) {
    console.error(`Error fetching price by distance: ${err}`);
    res.status(500).json({ error: err });
  }
};

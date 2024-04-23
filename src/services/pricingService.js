const { pool } = require("../config/dbConfig");

exports.calculateTotalPrice = async (
  zone,
  organizationId,
  totalDistance,
  itemType
) => {
  const pricing = await fetchPrice(zone, organizationId, itemType);
  let totalPrice = parseInt(pricing?.fix_price);
  const baseDistanceInKm = parseInt(pricing?.base_distance_in_km);
  const kmPrice = parseInt(pricing?.km_price);

  if (!totalPrice || !baseDistanceInKm || !kmPrice) {
    throw new Error("Database query failed.");
  }

  if (totalDistance > baseDistanceInKm) {
    totalPrice += (totalDistance - baseDistanceInKm) * kmPrice;
  }
  return totalPrice + " cents";
};

const fetchPrice = async (zone, organizationId, itemType) => {
  try {
    const pricing = await pool.query(
      `
    SELECT P.ORGANIZATION_ID ORGANIZATION_ID,
    I.TYPE,
    P.ZONE,
    P.BASE_DISTANCE_IN_KM,
    P.KM_PRICE,
    P.FIX_PRICE
    FROM PRICING P
    JOIN ITEM I ON P.ITEM_ID = I.ID
    WHERE P.ZONE = $1
    AND P.ORGANIZATION_ID = $2
    AND I.TYPE = $3;
    `,
      [zone, organizationId, itemType]
    );
    if (!pricing) {
      throw new Error(
        `Pricing not found for ${zone}, ${organizationId} and ${itemType}`
      );
    }
    return pricing.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

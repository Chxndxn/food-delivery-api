const { calculateTotalPrice } = require("../src/services/pricingService");
const { pool } = require("../src/config/dbConfig");

jest.mock("../src/config/dbConfig.js", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("calculateTotalPrice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the base price if the total distance is within the base distance", async () => {
    const mockData = {
      rows: [
        {
          fix_price: "1000",
          base_distance_in_km: "5",
          km_price: "150",
        },
      ],
    };
    pool.query.mockResolvedValue(mockData);

    const price = await calculateTotalPrice("central", "3", 5, "perishable");
    expect(price).toBe("1000 cents");
  });

  it("should add per km price for distance beyond the base distance", async () => {
    const mockData = {
      rows: [
        {
          fix_price: "1000",
          base_distance_in_km: "5",
          km_price: "100",
        },
      ],
    };
    pool.query.mockResolvedValue(mockData);
    const price = await calculateTotalPrice("central", "3", 12, "non-perishable");
    expect(price).toBe("1700 cents");
  });

  it("should handle situations where no pricing data is found", async () => {
    const mockData = { rows: [] };
    pool.query.mockResolvedValue(mockData);

    await expect(
      calculateTotalPrice("central", "5", 10, "perishable")
    ).rejects.toThrow("Database query failed");
  });

  it("should throw an error if the database query fails", async () => {
    pool.query.mockRejectedValue(new Error("Database query failed"));

    await expect(calculateTotalPrice("central", "005", 10, "non-perishable"))
      .rejects.toThrow("Database query failed");
  });
});

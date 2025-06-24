const { fetchReviews, createReview } = require("../../reviewLogic");
const Review = require("../../models/Review");

jest.mock("../../models/Review");

describe("Review Logic", () => {
  it("fetchReviews returns all reviews", async () => {
    const mockReviews = [{ comment: "Nice!" }, { comment: "Awesome!" }];

    Review.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockReviews),
    });

    const result = await fetchReviews("123");
    expect(result).toEqual(mockReviews);
  });

  it("fetchReviews returns all when bookId is not passed", async () => {
    const mockReviews = [{ comment: "A" }, { comment: "B" }];

    Review.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockReviews),
    });

    const result = await fetchReviews(); // no bookId
    expect(Review.find).toHaveBeenCalledWith({});
    expect(result).toEqual(mockReviews);
  });

  it("createReview saves a new review", async () => {
    const mockData = { bookId: "1", user: "User", rating: 5, comment: "Excellent" };

    const mockSave = jest.fn().mockResolvedValue(mockData);
    Review.mockImplementation(() => ({ save: mockSave }));

    const result = await createReview(mockData);
    expect(result).toEqual(mockData);
  });
});





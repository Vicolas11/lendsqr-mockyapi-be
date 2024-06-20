import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const MOCKY_URL =
  "https://run.mocky.io/v3/ae1b60df-ab43-4a0b-8a42-7375aba77b59";

// Fetch data from Mocky.io
const fetchData = async (): Promise<any[]> => {
  try {
    const response = await axios.get(MOCKY_URL);

    return response.data || [];
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw new Error(error.message || "Error fetching data");
  }
};

app.get("/data", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 9;

    // Fetch the data
    const data = await fetchData();

    if (!Array.isArray(data)) {
      throw new Error("Fetched data is not an array");
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    res.json({
      page,
      pageSize,
      totalRecords: data.length,
      totalPages: Math.ceil(data.length / pageSize),
      data: paginatedData,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "An unexpected error occurred", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

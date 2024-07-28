import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import axios from "axios";
import cors from 'cors';

config();
const app = express();
const PORT = process.env.PORT || 3000;
const MOCKY_URL = process.env.MOCKY_API as string;

app.use(cors());

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send(`Something went wrong. ${err.message}`);
});

app.get("/", (_req: Request, res: Response) => {
  res.send(
    '<h1 style="text-align: center;">Server is running 👌!</h1>'
  );
});

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

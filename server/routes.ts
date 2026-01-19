import { analyzeChart } from "./ai";

app.post("/api/analyze", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image not found" });
    }

    const analysis = await analyzeChart(image);
    res.json({ analysis });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI failed" });
  }
});
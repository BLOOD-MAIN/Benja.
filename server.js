import express from "express";
import fs from "fs";
import htmlPdf from "html-pdf-node";

const app = express();
app.use(express.static("."));
app.use(express.json());

app.get("/create-pdf", async (req, res) => {
  try {
    const html = fs.readFileSync("index.html", "utf-8");

    const file = { content: html };
    const pdfBuffer = await htmlPdf.generatePdf(file, { format: "A4" });

    fs.writeFileSync("order.pdf", pdfBuffer);
    res.send("✅ PDF generated successfully! Check order.pdf");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
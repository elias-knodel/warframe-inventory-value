import fs from "fs";
import path from "path";
import { Parser } from "json2csv";

// Read the JSON file
const data = fs.readFileSync(
    path.join(__dirname, ".output/relic_prices.json"),
    "utf-8"
);

// Parse the JSON content
const jsonData = JSON.parse(data);

// Define the fields for the CSV
const fields = ["name", "price"];

// Initialize a new Parser
const json2csvParser = new Parser({ fields });

// Convert JSON to CSV
const csv = json2csvParser.parse(jsonData);

// Write the CSV content to a new file
fs.writeFileSync(path.join(__dirname, ".output/relic_prices.csv"), csv);

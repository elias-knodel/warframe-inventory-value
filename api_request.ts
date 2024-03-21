import fs from "fs";
import moment from "moment";

// Read the names from the file
const names = JSON.parse(fs.readFileSync(".output/relic_names.json", "utf8"));

// Read the results from the file, if it exists
let results = {};
try {
    results = JSON.parse(fs.readFileSync(".output/results.json", "utf8"));
} catch (err) {
    console.error("No results file found, creating a new one.");
}

// Function to delay by a certain amount of time
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// For each name
for (const name of names) {
    // If the name exists in the results and the timestamp is less than 24 hours old
    if (
        results[name] &&
        moment().diff(moment(results[name].timestamp), "hours") < 24
    ) {
        // Use the existing data
        console.log(`Using cached data for ${name}`);
    } else {
        // Make a request to the API
        console.log(`Fetching data for ${name}`);
        try {
            const response = await fetch(
                `https://api.warframe.market/v1/items/${name}/orders?include=item`,
                {
                    method: "GET",
                }
            );

            const responseJson = await response.json();

            // Save the results with a timestamp
            results[name] = {
                data: responseJson,
                timestamp: moment().toISOString(),
            };
        } catch (error) {
            console.error(`Failed to fetch data for ${name}`, error);
        }

        // Delay for 1 second (1000 milliseconds) before the next request
        await delay(1000);
    }
}

// Write the results to a new file
fs.writeFileSync(".output/results.json", JSON.stringify(results, null, 2));

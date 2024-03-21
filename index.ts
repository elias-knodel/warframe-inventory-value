const fs = require("fs");

// Read the file
fs.readFile(".data/inventoryRelics.json", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse the JSON data
    const relics = JSON.parse(data);

    // Extract the names
    const names = Array.from(
        new Set(
            relics.map(
                (relic) =>
                    `${relic.name
                        .replace(/\s/g, "_")
                        .toLowerCase()
                        .split("_")
                        .slice(0, 2)
                        .join("_")}_relic`
            )
        )
    );

    // Write the names to a new file
    fs.writeFile(
        ".output/relic_names.json",
        JSON.stringify(names, null, 2),
        (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("The file has been saved!");
        }
    );
});

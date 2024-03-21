import fs from "fs";
import path from "path";

// Read the JSON file
const data = fs.readFileSync(
    path.join(__dirname, ".output/results.json"),
    "utf-8"
);

// Parse the JSON content
const jsonData = JSON.parse(data);

let allFilteredOrders = [];

// Navigate to the orders for each key in jsonData
for (let key in jsonData) {
    const orders = jsonData[key].data.payload.orders;
    const organicName =
        jsonData[key].data.include.item.items_in_set[0]["en"]["item_name"];

    // Filter the orders
    let filteredOrders = orders.filter(
        (order) =>
            order.order_type === "sell" &&
            (order.user.status === "online" || order.user.status === "ingame")
    );

    // Sort the orders
    filteredOrders.sort((a, b) => a.platinum - b.platinum);

    // If there are no orders filter again but without limiting the status
    if (filteredOrders.length === 0) {
        filteredOrders = orders.filter((order) => order.order_type === "sell");
        filteredOrders.sort((a, b) => a.platinum - b.platinum);
    }

    let platin = filteredOrders[0]["platinum"];

    // Create a new object with name and price attributes
    let orderObject = {
        name: organicName,
        price: platin,
    };

    // Store the order object in allFilteredOrders using the same key
    allFilteredOrders.push(orderObject);
}

// Write the results into a new JSON file
fs.writeFileSync(
    path.join(__dirname, ".output/relic_prices.json"),
    JSON.stringify(allFilteredOrders, null, 2)
);

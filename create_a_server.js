const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { sendSMS, sendEmail } = require("./notifier");

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Example target prices (to be replaced by user input)
const targetPrices = {};

// CoinGecko API URL
const apiUrl = "https://api.coingecko.com/api/v3/simple/price";

// Endpoint for submitting target prices
app.post("/set-targets", (req, res) => {
    const { crypto, price } = req.body;
    targetPrices[crypto] = price;
    res.json({ message: `Target set for ${crypto}: $${price}` });
});

// Periodic price checking
setInterval(async () => {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                ids: Object.keys(targetPrices).join(","),
                vs_currencies: "usd",
            },
        });
        const prices = response.data;

        for (const [crypto, priceData] of Object.entries(prices)) {
            const currentPrice = priceData.usd;
            const targetPrice = targetPrices[crypto];
            if (currentPrice >= targetPrice) {
                sendSMS(`Alert! ${crypto} has reached $${currentPrice}.`);
                sendEmail(`Alert! ${crypto} has reached $${currentPrice}.`);
                console.log(`Notification sent for ${crypto}`);
            }
        }
    } catch (error) {
        console.error("Error fetching cryptocurrency prices:", error);
    }
}, 60000); // Check every minute

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

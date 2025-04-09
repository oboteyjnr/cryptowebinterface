// API Endpoint
const apiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,dogecoin&vs_currencies=usd";

// Example Target Prices (You can replace this with dynamic user inputs)
const targetPrices = {
    bitcoin: 30000, // USD
    ethereum: 2000, // USD
    litecoin: 100,  // USD
    dogecoin: 0.1   // USD
};

// Function to send a notification (e.g., console log or server-side messaging)
function sendNotification(crypto, price) {
    console.log(`Alert! ${crypto.toUpperCase()} has reached $${price}.`);
    // Here you could integrate an actual messaging service like Twilio or Email APIs
}

// Fetch Cryptocurrency Prices
async function fetchCryptoPrices() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const cryptoList = document.getElementById("crypto-list");
        cryptoList.innerHTML = ""; // Clear previous results

        for (const [crypto, prices] of Object.entries(data)) {
            const listItem = document.createElement("li");
            listItem.textContent = `${crypto.toUpperCase()}: $${prices.usd}`;
            cryptoList.appendChild(listItem);

            // Check if the price meets or exceeds the target
            if (prices.usd >= targetPrices[crypto]) {
                sendNotification(crypto, prices.usd);
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Periodic Price Check (Every minute, as an example)
setInterval(fetchCryptoPrices, 60000); // 60,000ms = 1 minute

// Initial fetch
document.addEventListener("DOMContentLoaded", fetchCryptoPrices);

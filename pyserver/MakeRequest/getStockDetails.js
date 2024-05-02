import fetch from "node-fetch";

async function fetchStockDetails(symbol) {
    try {
        const response = await fetch('http://127.0.0.1:3000/stock_details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symbol: symbol })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch stock details');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Replace 'RELIANCE' with the desired stock symbol
const symbol = 'RELIANCE';
fetchStockDetails(symbol);

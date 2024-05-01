const axios = require('axios');

// Function to fetch stock information from Flask API
async function fetchStockInfo(symbol) {
    try {
        const response = await axios.get(`http://localhost:5000/stock_info?symbol=${symbol}`);
        console.log("Response data:", response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Error fetching stock information:', error);
        throw error;
    }
}

// Example usage
const symbol = 'RELIANCE'; // Change this to the desired stock symbol
fetchStockInfo(symbol)
    .then(data => {
        console.log("Data:::::::::::::::::::", data);
        if (data.error) {
            console.log('Error:', data.error);
        } else {
            console.log('Symbol:', data.symbol);
            console.log('Last Price:', data.lastPrice);
            console.log('Change:', data.change);
            console.log('Percentage Change:', data.pChange);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

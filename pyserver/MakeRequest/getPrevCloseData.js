async function fetchPrevCloseData(symbol) {
    try {
        const response = await fetch('http://127.0.0.1:3000/prev_close_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symbol: symbol })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch previous close data');
        }

        const data = await response.json();
        console.log(data);
        // You can handle the data here, for example, update the UI
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Replace 'RELIANCE' with the desired stock symbol
const symbol = 'RELIANCE';
fetchPrevCloseData(symbol);

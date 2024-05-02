async function fetchCurrentPrice(symbol) {
  try {
      const response = await fetch('http://127.0.0.1:3000/stock_current_price', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ symbol })
      });
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Error:', error);
  }
}

// Replace 'RELIANCE' with the desired stock symbol
const symbol = 'RELIANCE';
fetchCurrentPrice(symbol);

from flask import Flask, request, jsonify
from nsepython import nse_eq

app = Flask(__name__)

# Function to get stock information
def get_stock_info(symbol):
    # Fetch stock data
    stock_data = nse_eq(symbol)
    if stock_data:
        # Extract required information
        company_name = stock_data['info'].get('companyName', 'N/A')
        prev_close = stock_data['priceInfo'].get('previousClose', 'N/A')
        day_range_high = stock_data['priceInfo']['intraDayHighLow']['max']
        day_range_low = stock_data['priceInfo']['intraDayHighLow']['min']
        year_range_high = stock_data['priceInfo']['weekHighLow']['max']
        year_range_low = stock_data['priceInfo']['weekHighLow']['min']
        market_cap = stock_data['securityInfo']['issuedSize']
        average_vol = stock_data['preOpenMarket']['totalTradedVolume']
        # PLE rate and dividend yield are not directly available
        # You may need additional APIs or calculations for these
        
        # Create response dictionary
        response = {
            'companyName': company_name,
            'prevClose': prev_close,
            'dayRange': {'high': day_range_high, 'low': day_range_low},
            'yearRange': {'high': year_range_high, 'low': year_range_low},
            'marketCap': market_cap,
            'averageVol': average_vol
            # Add PLE rate and dividend yield here if available
        }
        return response
    else:
        return {'error': 'Failed to fetch stock information'}

@app.route('/stock_info')
def stock_info():
    symbol = request.args.get('symbol')
    if symbol:
        info = get_stock_info(symbol)
        return jsonify(info)
    else:
        return jsonify({'error': 'Symbol parameter is missing in the request'})

if __name__ == '__main__':
    app.run(debug=True)

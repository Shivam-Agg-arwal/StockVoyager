from flask import Flask, request, jsonify
from nsepython import nse_eq

app = Flask(__name__)

def get_stock_current_price(symbol):
    stock_data = nse_eq(symbol)
    if 'priceInfo' in stock_data:
        last_price = stock_data['priceInfo'].get('lastPrice', 'N/A')
        change = stock_data['priceInfo'].get('change', 'N/A')
        p_change = stock_data['priceInfo'].get('pChange', 'N/A')
        return {
            'symbol': symbol,
            'lastPrice': last_price,
            'change': change,
            'pChange': p_change
        }
    else:
        return {'error': 'No price information available for the provided symbol'}

def get_stock_details(symbol):
    stock_data = nse_eq(symbol)
    if stock_data:
        company_name = stock_data['info'].get('companyName', 'N/A')
        prev_close = stock_data['priceInfo'].get('previousClose', 'N/A')
        day_range_high = stock_data['priceInfo']['intraDayHighLow']['max']
        day_range_low = stock_data['priceInfo']['intraDayHighLow']['min']
        year_range_high = stock_data['priceInfo']['weekHighLow']['max']
        year_range_low = stock_data['priceInfo']['weekHighLow']['min']
        market_cap = stock_data['securityInfo']['issuedSize']
        average_vol = stock_data['preOpenMarket']['totalTradedVolume']
        return {
            'companyName': company_name,
            'prevClose': prev_close,
            'dayRange': {'high': day_range_high, 'low': day_range_low},
            'yearRange': {'high': year_range_high, 'low': year_range_low},
            'marketCap': market_cap,
            'averageVol': average_vol
        }
    else:
        return {'error': 'Failed to fetch stock information'}

@app.route('/stock_current_price', methods=['POST'])
def stock_current_price():
    data = request.json
    symbol = data.get('symbol')
    if symbol:
        return jsonify(get_stock_current_price(symbol))
    else:
        return jsonify({'error': 'Symbol parameter is missing in the request'})

@app.route('/stock_details', methods=['POST'])
def stock_details():
    data = request.json
    symbol = data.get('symbol')
    if symbol:
        return jsonify(get_stock_details(symbol))
    else:
        return jsonify({'error': 'Symbol parameter is missing in the request'})

if __name__ == '__main__':
    app.run(port=3000, debug=True)

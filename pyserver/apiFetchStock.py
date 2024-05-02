from flask import Flask, request, jsonify
from nsepython import nse_eq

app = Flask(__name__)

@app.route('/stock_current_price', methods=['POST'])
def get_stock_info():
    data = request.json
    symbol = data.get('symbol')
    
    if symbol:
        stock_data = nse_eq(symbol)
        if 'priceInfo' in stock_data:
            last_price = stock_data['priceInfo'].get('lastPrice', 'N/A')
            change = stock_data['priceInfo'].get('change', 'N/A')
            p_change = stock_data['priceInfo'].get('pChange', 'N/A')
            response = {
                'symbol': symbol,
                'lastPrice': last_price,
                'change': change,
                'pChange': p_change
            }
            
            return jsonify(response), 200
        else:
            return jsonify({'error': 'No price information available for the provided symbol'}), 404
    else:
        return jsonify({'error': 'Symbol parameter is missing in the request'}), 400

if __name__ == '__main__':
    app.run(port=3000, debug=True)

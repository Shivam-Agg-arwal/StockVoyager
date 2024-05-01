from flask import Flask, request, jsonify
from nsepython import nse_eq
import socket

app = Flask(__name__)

@app.route('/stock_info', methods=['GET'])
def get_stock_info():
    symbol = request.args.get('symbol')
    
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
    local_ip = socket.gethostbyname(socket.gethostname())
    app.run(host=local_ip, port=5000, debug=True)

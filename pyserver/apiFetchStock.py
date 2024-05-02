from flask import Flask, request, jsonify
from nsepython import nse_eq
from datetime import datetime, timedelta
from nselib import capital_market
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


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
        industry = stock_data['metadata']['industry']
        pd_sector_pe = stock_data['metadata']['pdSectorPe']
        face_value = stock_data['securityInfo']['faceValue']
        issued_size = stock_data['securityInfo']['issuedSize']
        return {
            'companyName': company_name,
            'prevClose': prev_close,
            'dayRange': {'high': day_range_high, 'low': day_range_low},
            'yearRange': {'high': year_range_high, 'low': year_range_low},
            'marketCap': market_cap,
            'averageVol': average_vol,
            'industry' : industry,
            'pdSectorPe' : pd_sector_pe,
            'faceValue' : face_value,
            'issuedSize' : issued_size
        }
    else:
        return {'error': 'Failed to fetch stock information'}
    
def get_price_volume_data(symbol):
    # Calculate from_date as 5 years ago
    from_date = (datetime.now() - timedelta(days=365*5)).strftime('%d-%m-%Y')
    # Calculate to_date as today's date
    to_date = datetime.now().strftime('%d-%m-%Y')
    data = capital_market.price_volume_and_deliverable_position_data(symbol=symbol, from_date=from_date, to_date=to_date)
    dates = data['Date']
    prevClose = data['PrevClose']
    result = []
    for date_str, prev_close in zip(dates, prevClose):
        date_obj = datetime.strptime(date_str, '%d-%b-%Y')
        timestamp_seconds = date_obj.timestamp()
        result.append({
            'timestamp': int(timestamp_seconds),
            'prevclose': prev_close
        })
    return {'previous_close': result}


def get_indices():
    data = capital_market.market_watch_all_indices()
    last = data['last']
    index_symbol = data['indexSymbol']
    result = []
    for sym, lst in zip(index_symbol, last):
        result.append({
            'last': int(lst),
            'indexSymbol': sym
        })
    return result   



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
    

@app.route('/prev_close_data', methods=['POST'])
def prev_close_data():
    data = request.json
    symbol = data.get('symbol')
    if symbol:
        response_data = get_price_volume_data(symbol)
        return jsonify(response_data)
    else:
        return jsonify({'error': 'Missing symbol parameter in the request'})
    

@app.route('/get_indices', methods=['POST'])
def indices():
    response_data = get_indices()
    return jsonify(response_data)  

if __name__ == '__main__':
    app.run(port=3000, debug=True)

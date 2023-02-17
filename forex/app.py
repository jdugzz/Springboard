from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from forex_python.converter import CurrencyRates, CurrencyCodes
from converter import validate, currency_codes

app = Flask(__name__)
app.config['SECRET_KEY'] = 'asdfvbwqergasdfg2342351'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False 
debug = DebugToolbarExtension(app)
c = CurrencyRates()
csym = CurrencyCodes()



@app.route('/')
def show_main():
    return render_template('main.html', valid=None)

@app.route('/convert')
def convert():
    conv_from = request.args['c_from'].upper()
    conv_to = request.args['c_to'].upper()

    try:
        amount = float(request.args['amount'])
    except ValueError:
        return render_template('main.html', valid=0)
        
    val_num = validate(conv_from, conv_to)
    if val_num == 3:
        conv = c.convert(conv_from, conv_to, amount)
        sym = csym.get_symbol(conv_to)
        conv_val = round(conv, 2)
        return render_template('main.html', conv_val=conv_val, valid=val_num, sym=sym)
    if val_num == 2:
        return render_template('main.html', conv_val=None, valid=val_num, sym=None, conv_from=None, conv_to=conv_to)
    if val_num == 1:
        return render_template('main.html', conv_val=None, valid=val_num, sym=None, conv_from=conv_from, conv_to=None)
    if val_num == -1:
        return render_template('main.html', conv_val=None, valid=val_num, sym=None, conv_from=conv_from, conv_to=conv_to)    
    
    
    



    


currency_codes = ['EUR', 'IDR', 'BGN', 'ILS', 'GBP', 'DKK', 'CAD', 'JPY', 'HUF', 'RON', 'MYR', 'SEK', 'SGD', 
'HKD', 'AUD', 'CHF', 'KRW', 'CNY', 'TRY', 'HRK', 'NZD', 'THB', 'USD', 'NOK', 'RUB', 'INR', 'MXN', 
'CZK', 'BRL', 'PLN', 'PHP', 'ZAR']

def validate(c_from, c_to):
    if c_from in currency_codes and c_to in currency_codes:
        return 3
    if c_from in currency_codes and c_to not in currency_codes:
        return 2
    if c_from not in currency_codes and c_to in currency_codes:
        return 1
    else:
        return -1

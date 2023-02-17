from app import app
from unittest import TestCase
from flask import request
from converter import validate, currency_codes

class ConverterTest(TestCase):
    def test_validate_3(self):
        valid = validate('EUR', 'EUR')
        self.assertEqual(valid, 3)
    def test_validate_2(self):
        valid = validate('EUR', 'ERe')
        self.assertEqual(valid, 2)
    def test_validate_1(self):
        valid = validate('Ere', 'EUR')
        self.assertEqual(valid, 1)
    def test_validate_0(self):
        valid = validate('Ere', 'EeR')
        self.assertEqual(valid, -1)
    def test_full(self):
        with app.test_client() as client:
            res = client.get('/convert?c_from=EUR&c_to=eur&amount=234')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<p>The result is €234.0</p>', html)
    def test_full_with_err_code(self):
        with app.test_client() as client:
            res = client.get('/convert?c_from=Ere&c_to=eur&amount=234')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<p>ERE is not a valid code.</p>', html)
    def test_full_with_err_amount(self):
        with app.test_client() as client:
            res = client.get('/convert?c_from=EUR&c_to=eur&amount=asdf')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<p>Not a valid amount.</p>', html)



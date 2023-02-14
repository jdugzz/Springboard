from unittest import TestCase
from app import app
from flask import session, request
from boggle import Boggle
import requests

app.config['TESTING'] = True

class FlaskTests(TestCase):
    def test_start_board(self):
        with app.test_client() as client:
            resp = client.get('/')
            boggle_game = Boggle
            board = boggle_game.make_board(self)
            session['board'] = board

            self.assertEqual(resp.status_code, 200)
            self.assertEqual(session['board'], board)
    def test_start_html(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h3 id="timer">Time Remaining: 60</h3>', html)


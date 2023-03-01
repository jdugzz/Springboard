from flask import Flask, request, render_template, redirect, session
from sqlalchemy import text
from models import User, db, connect_db
from app import users, users_new, delete_user, handle_user_add, user_info, user_info_edit, app, add_starter
from unittest import TestCase
from unittest.mock import patch



class app_test(TestCase):
    @patch('app.User')
    @patch('app.db.session')
        
    def test_handle_user_add(self, mock_session, mock_user):
        with app.test_request_context('/users/add'):
            request.form = {
                'first_name': 'John',
                'last_name' : 'Doe',
                'img_url' : 'https://google.com/img.jpeg'
            }
            response = handle_user_add()

            mock_user.assert_called_once_with(
                    first_name='John',
                    last_name='Doe',
                    image_url='https://google.com/img.jpeg'
            )

            mock_session.add.assert_called_once_with(mock_user.return_value)
            mock_session.commit.assert_called_once()
            self.assertEqual(response.location, '/users')
            
    def test_users(self):
        with app.test_client() as client:
            response = client.get('/users')
            self.assertEqual(response.status_code, 200)
            expected_data = b'<h1>Users</h1>' 
            self.assertIn(expected_data, response.data)
    
    def test_users_new(self):
        with app.test_client() as client:
            response = client.get('/users/new')
            self.assertEqual(response.status_code, 200)
            expected_data = b'<button>Add</button>'
            self.assertIn(expected_data, response.data)
    
    def test_user_info(self):
        with app.test_client() as client:
            response = client.get('/users/9')
            self.assertEqual(response.status_code, 200)
            expected_data = b'<h1>Richard Sherman</h1>'
            self.assertIn(expected_data, response.data)

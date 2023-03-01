from flask import Flask, request, render_template, redirect, session
from sqlalchemy import text
from models import User, db, connect_db
from unittest import TestCase

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///Users'
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.route('/')
def home():
    """essentially the homepage"""
    return redirect('/users')

@app.route('/users')
def users():
    """retrieve users from db and show on page"""
    user = User.query.all()
    return render_template('userlist.html', users=user)

@app.route('/users/new')
def users_new(): 
    """show the add user page"""
    return render_template('adduser.html')

@app.route('/users/add', methods=["POST"])
def handle_user_add():
    """from the add user page, take 
    inputs from the form, create new
    intance of the user using inputs 
    and add it to the db"""
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    img_url = request.form['img_url']
    new_user = User(first_name=first_name, last_name=last_name, image_url=img_url)
    db.session.add(new_user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<user_id>')
def user_info(user_id):
    """show the user information page"""
    user = User.query.get(user_id)
    return render_template('user.html', user=user)

@app.route('/users/<user_id>/edit')
def user_info_(user_id):
    """allow individual to edit user info"""
    user = User.query.get(user_id)
    return render_template('useredit.html', user=user)

@app.route('/<user_id>/edit', methods=["POST"])
def user_info_edit(user_id):
    """take input from edit page and edit existing row in db"""
    user = User.query.get(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['img_url']
    db.session.commit()
    return redirect('/users')

@app.route('/users/<user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """remove a user from the database"""
    user = User.query.filter_by(id=user_id).first()
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')

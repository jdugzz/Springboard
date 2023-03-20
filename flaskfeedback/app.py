from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension 

from models import connect_db, db, User, Feedback
from forms import UserForm, LoginForm, FeedbackForm

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql:///authdemo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'maktub'

connect_db(app)

toolbar = DebugToolbarExtension(app)

@app.route('/')
def home():
    users = User.query.all()
    return render_template('index.html', users=users)

@app.route('/register', methods=['GET', 'POST'])
def register_user():
    form = UserForm()
    if form.validate_on_submit():
        username = form.username.data 
        password = form.password.data 
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        user = User.register(username=username, pwd=password, email=email,
                    first_name=first_name, last_name=last_name)
        db.session.add(user)
        db.session.commit()
        session['username'] = user.username
        flash('Welcome!', 'success')
        return redirect('/secret')
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_form():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username, password)
        if user:
            flash(f'Welcome back, {user.username}')   
            session['username'] = user.username 
            return redirect('/secret')    
    return render_template('login.html', form=form)

@app.route('/secret')
def show_secret():
    if 'username' not in session:
        return redirect('/')
    return redirect(f'/users/{session["username"]}')

@app.route('/users/<username>')
def show_user_info(username):
    if 'username' not in session:
        return redirect('/')
    if session['username'] != username:
        return redirect('/')
    user = User.query.filter_by(username=username).first()
    return render_template('user.html', user=user)

@app.route('/logout')
def logout_user():
    session.pop('username')
    return redirect('/')

@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if 'username' not in session:
        return redirect('/')
    if session['username'] != username:
        return redirect('/')
    user = User.query.filter_by(username=username).first()
    db.session.delete(user)
    db.session.commit()
    return redirect('/')

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    form = FeedbackForm()
    user = User.query.filter_by(username=username).first()
    feedback = Feedback.query.filter_by(user_id=user.id).all()
    if 'username' not in session:
        return redirect('/')
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        new_feedback = Feedback(title=title, content=content, user_id=user.id)
        db.session.add(new_feedback)
        db.session.commit()
        feedback = Feedback.query.filter_by(user_id=user.id).all()
        return redirect(f'/users/{user.username}')
    return render_template('feedback.html', user=user, feedback=feedback, form=form)

@app.route('/feedback/<feedback_id>/update', methods=['GET', 'POST'])
def edit_feedback(feedback_id):
    feedback = Feedback.query.filter_by(id=feedback_id).first()
    form = FeedbackForm(obj=feedback)
    username = session['username']
    user = User.query.filter_by(username=username).first()
    if 'username' not in session:
        return redirect('/')
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        return redirect(f'/users/{user.username}')
    return render_template('editfeedback.html', feedback=feedback, form=form)

@app.route('/feedback/<feedback_id>/delete', methods=['GET','POST'])
def delete_feedback(feedback_id):
    feedback = Feedback.query.filter_by(id=feedback_id).first()
    db.session.delete(feedback)
    db.session.commit()
    username = session['username']
    return redirect(f'/users/{username}')

from flask import Flask, request, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy import text
from models import User, Post, Tag, PostTag, db, connect_db
from unittest import TestCase

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///users_database'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'asdfasdfasdf'

toolbar = DebugToolbarExtension(app)

connect_db(app)

def add_starter():
    """simply just add a single individual to db"""
    with app.app_context():
        db.create_all()
        richard = User(first_name='Richard', last_name='Sherman')
        db.session.add(richard)
        db.session.commit()

@app.route('/')
def home():
    """essentially the homepage"""
    posts = Post.query.limit(5).all()
    return render_template('homepage.html', posts=posts)

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
    error = None
    if not first_name:
        error = 'First Name is a required field.'
    if not last_name:
        error = 'Last Name is a required field.'
    if error is None:
        new_user = User(first_name=first_name, last_name=last_name, image_url=img_url)
        db.session.add(new_user)
        db.session.commit()
        return redirect('/users')
    else:
        flash(error)
        return render_template('adduser.html')

@app.route('/users/<user_id>')
def user_info(user_id):
    """show the user information page"""
    user = User.query.get(user_id)
    posts = Post.query.filter_by(poster_id=user.id).all()
    return render_template('user.html', user=user, posts=posts)

@app.route('/users/<user_id>/edit')
def user_info_(user_id):
    """allow individual to edit user info"""
    user = User.query.get(user_id)
    return render_template('useredit.html', user=user)

@app.route('/<user_id>/edit', methods=["POST"])
def user_info_edit(user_id):
    """take input from edit page and edit existing row in db"""
    user = User.query.get(user_id)
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    img_url = request.form['img_url']
    error = None
    if not first_name:
        error = 'First Name is a required field.'
    if not last_name:
        error = 'Last Name is a required field.'
    if error is None:
        user.first_name = first_name
        user.last_name = last_name
        user.image_url = img_url
        db.session.commit()
        return redirect('/users')
    else:
        flash(error)
        return render_template('useredit.html', user=user )
    

@app.route('/users/<user_id>/delete', methods=["POST"])
def delete_user(user_id):
    '''delete a user'''
    user = User.query.filter_by(id=user_id).first()
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<user_id>/posts/new')
def new_post(user_id):
    '''show new post form'''
    user = User.query.get(user_id)
    tags = Tag.query.all()
    return render_template('newpost.html', user=user, tags=tags)

@app.route('/users/<user_id>/posts/new', methods=["POST"])
def handle_new_post(user_id):
    '''get information from form and create a new post'''
    user = User.query.get(user_id)
    title = request.form['title']
    content = request.form['content']
    tags = request.form.getlist('tag_name')
    error = None
    if not title:
        error = 'A title is required.'
    if not content:
        error = 'Your post must have content.'
    if error is None:
        new_post = Post(title=title, content=content, poster_id=user.id)
        db.session.add(new_post)
        db.session.commit()
        for tag in tags:
            post = Post.query.filter_by(title=title).first()
            new_post_tag = PostTag(post_id=post.id, tag_id=tag)
            db.session.add(new_post_tag)
            db.session.commit()
        posts = Post.query.filter_by(poster_id=user.id).all()
        return render_template("user.html", user=user, posts=posts)
    else: 
        flash(error)
        return render_template('newpost.html', user=user)

@app.route('/posts/<post_id>')
def show_post(post_id):
    '''show a post'''
    post = Post.query.get(post_id)
    user = User.query.get(post.poster_id)
    post_tags = PostTag.query.filter_by(post_id=post.id).all()
    return render_template('posts.html', post=post, user=user, post_tags=post_tags)

@app.route('/<post_id>/delete', methods=["POST"])
def delete_post(post_id):
    '''delete a post'''
    post = Post.query.get(post_id)
    db.session.delete(post)
    db.session.commit()
    return redirect('/users')

@app.route('/posts/posts/<post_id>/edit')
def show_edit_page(post_id):
    '''show the edit post form'''
    post = Post.query.get(post_id)
    return render_template('edit.html', post=post)

@app.route('/posts/<post_id>/edit', methods=['POST'])
def handle_edit(post_id):
    '''edit an existing post by taking data from form'''
    post = Post.query.get(post_id)
    title = request.form['title']
    content = request.form['content']
    error = None
    if not title:
        error = "Your post must have a title."
    if not content:
        error = "Your post must have content"
    if error is None:
        post.title = title
        post.content = content
        db.session.commit()
        return redirect('/users')
    else:
        flash(error)
        return render_template('edit.html', post=post)

@app.route('/tags')
def show_the_tags():
    '''show the tags'''
    tags = Tag.query.all()
    return render_template('showtags.html', tags=tags)

@app.route('/tags/add')
def show_tag_form():
    '''show the new tag form'''
    tags = Tag.query.all()
    return render_template('tagform.html', tags=tags)

@app.route('/tags/add', methods=['POST'])
def add_tag():
    '''create a new tag via information 
    obtained from the form'''
    tags = Tag.query.all()
    name = request.form['new-tag']
    error = None
    if not name:
        error = 'Your tag must have a name.'
    if error is None:
        new_tag = Tag(tag_name=name)
        db.session.add(new_tag)
        db.session.commit()
        return render_template('tagform.html', tags=tags)
    else:
        flash(error)
        return render_template('tagform.html', tags=tags)

@app.route('/tags/edit')
def edit_tag():
    '''show edit tag page '''
    tags = Tag.query.all()
    return render_template('edittag.html', tags=tags)

@app.route('/tags/edit', methods=['POST'])
def handle_edit_tag():
    '''handle the editing of a tab based on
    information obtained from the form'''
    tags = Tag.query.all()
    selected_tag = request.form['tag_name']
    tag = Tag.query.get(selected_tag)
    tag_name = request.form['edit-tag-name']
    error = None
    if not tag_name:
        error = 'Your tag must have a name.'
    if error is none:
        tag.tag_name = tag_name
        db.session.commit()
        return render_template('edittag.html', tags=tags)
    else:
        flash(error)
        return render_template('eddittag.html', tags=tags)

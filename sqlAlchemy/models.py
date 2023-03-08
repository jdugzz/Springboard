from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime 

db = SQLAlchemy() 

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer,
                  primary_key = True,
                  autoincrement = True,)
    first_name = db.Column(db.String(25),
                  nullable = False)
    last_name = db.Column(db.String(25),
                  nullable = False)
    image_url = db.Column(db.String,
                   nullable = True)
    

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer,
                  primary_key = True,
                  autoincrement = True)
    title = db.Column(db.String,
                      nullable = False)
    content = db.Column(db.String,
                        nullable = False)
    created_at = db.Column(db.DateTime, 
                           default = datetime.now)
    poster_id = db.Column(db.Integer,
                       db.ForeignKey('users.id'))
    poster = db.relationship('User', backref='posts')

    post_tag = db.relationship('PostTag', cascade='all, delete-orphan')

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    tag_name = db.Column(db.String,
                         nullable=False,
                         unique=True)
    post_tag = db.relationship('PostTag', cascade='all, delete-orphan')

class PostTag(db.Model):
    __tablename__ = 'post_tags'

    post_id = db.Column(db.Integer,
                        db.ForeignKey('posts.id'),
                        primary_key=True)
    tag_id = db.Column(db.Integer,
                       db.ForeignKey('tags.id'),
                       primary_key=True)
                       
    post = db.relationship('Post')
    tag = db.relationship('Tag')

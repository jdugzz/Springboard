from flask_wtf import FlaskForm 
from wtforms import StringField, BooleanField, IntegerField, SelectField
from wtforms.validators import InputRequired, URL, NumberRange, Optional

class AddPet(FlaskForm):
    name = StringField('Pet Name', validators=[InputRequired(message='The pet must have a name!')])
    species = SelectField('Species', choices=[('dog', 'Dog'), ('cat', 'Cat'), ('porc', 'Porcupine')])
    photo_url = StringField('Photo Url', validators=[Optional(), URL(message='Must input a valid URL')])
    age = IntegerField('Age', validators=[NumberRange(min=0, max=30)])
    notes = StringField('Pet Notes')
    adopt_ready = BooleanField('Ready for adoption?')

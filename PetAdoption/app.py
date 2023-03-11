from flask import Flask, Request, render_template, redirect, session, flash 
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy import text 
from models import Pet, db, connect_db
from forms import AddPet

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///petAdoption'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'maktub'

toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def show_homepage():
    pets = Pet.query.all()
    return render_template('homepage.html', pets=pets)

@app.route('/add', methods=['GET', 'POST'])
def show_add_pet():
    form = AddPet()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        available = form.adopt_ready.data
        pet = Pet(name=name, species=species, photo_url=photo_url, 
                  age=age, notes=notes, available= available)
        db.session.add(pet)
        db.session.commit()
        return redirect('/')
    else: 
        return render_template('addpet.html', form=form)

@app.route('/<int:id>', methods=['GET', 'POST'])
def show_edit_form(id):
    pet = Pet.query.get_or_404(id)
    form = AddPet(obj=pet)
    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        pet.available = form.adopt_ready.data
        db.session.commit()
        return redirect('/')
    else:
        return render_template('edit-pet.html', form=form, pet=pet)

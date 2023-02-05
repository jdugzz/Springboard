from flask import Flask, request, render_template
from stories import Story, story
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'whatever-string-you-want'
debug = DebugToolbarExtension(app)


@app.route('/form')
def form_page():
    words = story.prompts
    return render_template('form.html', words=words)

@app.route('/story')
def story_stuff():
    data_keys = [i for i in request.args.keys()]
    data_values = [i for i in request.args.values()]
    final_data = dict(zip(data_keys, data_values))
    final_story = story.generate(final_data)
    return render_template('story.html', final_story=final_story)


def Convert(lst):
    res_dct = {lst[i]: lst[i + 1] for i in range(0, len(lst) - 1, 2)}
    return res_dct

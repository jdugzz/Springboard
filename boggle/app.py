from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session, make_response, jsonify


app = Flask(__name__)
app.config['SECRET_KEY'] = 'SECRETSHTUFF'


boggle_game = Boggle()

session_key = 'board'

cookie_key = 'times played'

# playtime = {'times_played': 0}

@app.route('/')
def start_game():
    board = boggle_game.make_board()
    session[session_key] = board
    plays = session.get('times_played', 0)
    high_score = session.get('highscore', 0)
    return render_template('base.html', board = board, play_time = plays, high_score = high_score)

@app.route('/evaluate')
def evaluate():
    word = request.args['word']
    words = boggle_game.read_dict('words.txt')
    result = boggle_game.check_valid_word(session[session_key], word)
    resp = jsonify(result = f'{result}')
    
    return resp
    
@app.route('/played', methods=['POST'])
def increment_play():
    score = request.json['score']
    plays = session.get('times_played', 0)
    highscore = session.get('highscore', 0)

    session['times_played'] = plays + 1
    session['highscore'] = max(score, highscore)
    print(session['times_played'])
    print(session['highscore'])
    return jsonify(brokeRecord = score > highscore)

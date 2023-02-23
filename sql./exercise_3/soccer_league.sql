DROP DATABASE IF EXISTS soccer-league;

CREATE DATABSE soccer-league;

\c soccer-league

CREATE TABLE teams(
    id  SERIAL PRIMARY KEY,
    team_name TEXT UNIQUE,
    city TEXT
)

CREATE TABLE referees(
    id SERIAL PRIMARY KEY,
    ref_name TEXT
)

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    player_name TEXT,
    height TEXT,
    team_id INTEGER REFERENCES teams(id)
)

CREATE TABLE season(
    id SERIAL PRIMARY KEY,
    season_start DATE,
    season_end DATE
)

CREATE TABLE matches(
    id SERIAL PRIMARY KEY,
    home_team INTEGER REFERENCES teams(id),
    away_team INTEGER REFERENCES teams(id),
    match_location TEXT,
    match_date DATE,
    season INTEGER REFERENCES season(id),
    referee INTEGER REFERENCES referees(id)
)

CREATE TABLE goals(
    id SERIAL PRIMARY KEY,
    player REFERENCES players(id)
    match REFERENCES matches(id)
)

CREATE TABLE results(
    id SERIAL PRIMARY KEY,
    team REFERENCES teams(id),
    match REFERENCES matches(id),
    result TEXT
)

CREATE TABLE lineups(
    id SERIAL PRIMARY KEY,
    player REFERENCES players(id),
    match REFERENCES matches(id),
    team REFERENCES teams(id)
)

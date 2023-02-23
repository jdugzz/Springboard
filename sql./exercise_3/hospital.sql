DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;

\c hospital

CREATE TABLE doctors(
    id SERIAL PRIMARY KEY,
    dr_name TEXT,
)

CREATE TABLE patients(
    id SERIAL PRIMARY KEY,
    patient_name TEXT,
    birthday TEXT
)

CREATE TABLE visits(
    id SERIAL PRIMARY KEY,
    doctor INTEGER REFERENCES doctors(id),
    patient INTEGER REFERENCES patients(id)
)

CREATE TABLE diseases(
    id SERIAL PRIMARY KEY,
    disease_name TEXT,
)

CREATE TABLE diagnoses(
    id SERIAL PRIMARY KEY,
    visits INTEGER REFERENCES visits(id),
    diseases INTEGER REFERENCES diseases(id)
)

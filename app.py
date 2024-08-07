from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, Exercise, Meal

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fitlife_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.before_request
def create_tables():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_exercise', methods=['POST'])
def add_exercise():
    data = request.get_json()
    new_exercise = Exercise(name=data['name'], duration=data['duration'])
    db.session.add(new_exercise)
    db.session.commit()
    return jsonify({'message': 'Exercise added successfully'})

@app.route('/add_meal', methods=['POST'])
def add_meal():
    data = request.get_json()
    new_meal = Meal(name=data['name'], calories=data['calories'])
    db.session.add(new_meal)
    db.session.commit()
    return jsonify({'message': 'Meal added successfully'})

@app.route('/exercises', methods=['GET'])
def get_exercises():
    exercises = Exercise.query.all()
    return jsonify([e.to_dict() for e in exercises])

@app.route('/meals', methods=['GET'])
def get_meals():
    meals = Meal.query.all()
    return jsonify([m.to_dict() for m in meals])

if __name__ == '__main__':
    app.run(debug=True)

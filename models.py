from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    duration = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'duration': self.duration}

class Meal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    calories = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'calories': self.calories}

from database import db, Prediction

db.connect()

db.create_tables([Prediction])
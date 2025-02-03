from peewee import *

db = PostgresqlDatabase('database', user='postgres', password='123', host='localhost', port=5433)

class Prediction(Model):
	box = CharField()
	class_name = CharField()
	confidence = FloatField()

	def to_dict(self):
		return {
			"box": str(self.box),
			"class_name": str(self.class_name),
			"confidence": float(self.confidence)
		}

	class Meta:
		database = db

db.connect()

db.create_tables([Prediction])

db.close()
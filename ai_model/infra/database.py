from peewee import *

db = PostgresqlDatabase('overview-database.db', user='postgres', password='123', host='localhost', port=5433)

class Prediction(Model):
	box = CharField()
	class_name = IntegerField()
	confidence = FloatField()

	class Meta:
		database = db
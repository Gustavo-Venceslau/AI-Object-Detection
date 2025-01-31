from ..database import db, Prediction

class PredictionsRepository:
	def __init__(self):
		pass

	def save(self, prediction: Prediction):
		try:
			db.connect()
			prediction.save()
		except Exception as e:
			print(e)
			return False
		finally:
			db.close()

	def getLast10Predictions(self):
		try:
			db.connect()

			return Prediction.select().order_by(Prediction.id.desc()).limit(10)
		except Exception as e:
			print(e)
			return []
		finally:
			db.close()
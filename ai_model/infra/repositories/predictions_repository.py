from ..database import db, Prediction

class PredictionsRepository:
	def __init__(self):
		pass

	def save(prediction):
		try:
			db.connect()
			print(prediction)
			Prediction.create(class_name=prediction.class_name, confidence=prediction.confidence, box=prediction.box)
		except Exception as e:
			print(e)
			return False
		finally:
			db.close()

	def getLast10Predictions():
		try:
			db.connect()

			return Prediction.select().order_by(Prediction.id.desc()).limit(10)
		except Exception as e:
			print(e)
			return []
		finally:
			db.close()
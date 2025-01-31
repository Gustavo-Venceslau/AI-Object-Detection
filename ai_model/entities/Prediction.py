from dataclasses import dataclass

@dataclass
class BBOX:
    left: int
    top: int
    width: int
    height: int

@dataclass
class Prediction:
    class_name: int
    confidence: float
    box: BBOX
    
    def to_dict(self):
        return {
            "class_name": str(self.class_name),
            "confidence": float(self.confidence),
            "box": {
                "left": int(self.box.left),
                "top": int(self.box.top),
                "width": int(self.box.width),
                "height": int(self.box.height)
            }
        }
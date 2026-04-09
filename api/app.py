from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import predict_failure

app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    prediction, probability = predict_failure(data)

    return jsonify({
        "failure_prediction": prediction,
        "failure_probability": probability
    })


if __name__ == "__main__":
    app.run(debug=True)
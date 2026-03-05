import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "volt": 180,
    "rotate": 450,
    "pressure": 95,
    "vibration": 42
}

response = requests.post(url, json=data)

print("API Response:")
print(response.json())
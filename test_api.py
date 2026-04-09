import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "volt": 100,
    "rotate": 200,
    "pressure": 50,
    "vibration": 80
}

response = requests.post(url, json=data)

print("API Response:")
print(response.json())
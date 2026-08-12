from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from server.api.foods_api import FoodsApi

app = Flask(__name__) #create Flask instance
CORS(app) #Enable CORS on Flask server to work with Nodejs pages
api = Api(app) #api router

api.add_resource(FoodsApi, '/api/foods')

if __name__ == "__main__":
    app.run(debug=True)
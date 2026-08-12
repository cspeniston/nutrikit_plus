from flask_restful import Resource, reqparse, request
import json
from .db_utils import *
from .foods_db import (
    get_all_foods,
    get_foods_by_category,
    create_food,
    update_food,
    delete_food,
)

class FoodsApi(Resource):
    def get(self):
        category = request.args.get('category')
        rows = get_foods_by_category(category) if category else get_all_foods()

        result = [{
            "id": r[0],
            "name": r[1],
            "category": r[2],
            "calories": r[3],
            "totalFat": r[4],
            "saturatedFat": r[5],
            "transFat": r[6],
            "protein": r[7],
            "carbohydrate": r[8],
        } for r in rows]

        return result, 200
    
    def put(self):
        data = request.get_json()

        food_id = data.get('id')
        name = data.get('name')
        category = data.get('category')
        calories = data.get('calories')
        total_fat = data.get('totalFat')
        saturated_fat = data.get('saturatedFat')
        trans_fat = data.get('transFat')
        protein = data.get('protein')
        carbohydrate = data.get('carbohydrate')

        if not food_id or not name or not category:
            return {'message': 'Missing required fields'}, 400
        
        result = update_food(food_id, name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate)

        return {'message': result}, 200
    
    def post(self):
        data = request.get_json()

        name = data.get('name')
        category = data.get('category')
        calories = data.get('calories')
        total_fat = data.get('totalFat')
        saturated_fat = data.get('saturatedFat')
        trans_fat = data.get('transFat')
        protein = data.get('protein')
        carbohydrate = data.get('carbohydrate')

        if not name or not category or not calories:
            return {'message': 'Missing required fields'}, 400
        
        result = create_food(name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate)

        return {'message': result}, 201
    
    def delete(self):
        data = request.get_json()
        food_id = data.get('id')

        if not food_id:
            return {'message': 'Missing food item ID'}, 400

        result = delete_food(food_id)
        return {'message': result}, 200
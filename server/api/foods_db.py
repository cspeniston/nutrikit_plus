from .db_utils import exec_get_all, exec_commit

def get_all_foods():
    command = "SELECT * FROM foods ORDER BY category, name;"
    return exec_get_all(command)

def get_foods_by_category(category):
    command = "SELECT * FROM foods WHERE category = %(category)s ORDER BY name;"
    return exec_get_all(command, {'category': category})

def create_food(name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate):
    command = """INSERT INTO foods (
                    name,
                    category,
                    calories,
                    total_fat,
                    saturated_fat,
                    trans_fat,
                    protein,
                    carbohydrate
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"""
    data = (name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate)
    exec_commit(command, data)
    return "food created"

def update_food(id, name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate):
    command = """UPDATE foods
                SET name = %s,
                    category = %s,
                    calories = %s,
                    total_fat = %s,
                    saturated_fat = %s,
                    trans_fat = %s,
                    protein = %s,
                    carbohydrate = %s
                WHERE id = %s;"""
    data = (name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate, id)
    exec_commit(command, data)
    return "food updated"

def delete_food(id):
    command = "DELETE FROM foods WHERE id = %s;"
    exec_commit(command, (id,))
    return "food deleted"
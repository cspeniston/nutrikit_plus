DROP TABLE IF EXISTS foods;

CREATE TABLE foods (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('proteins', 'fruits', 'vegetables', 'dairy', 'grains')),
    calories INTEGER NOT NULL CHECK (calories >= 0),
    total_fat REAL NOT NULL CHECK (total_fat >= 0),
    saturated_fat REAL NOT NULL CHECK (saturated_fat >= 0),
    trans_fat REAL NOT NULL CHECK (trans_fat >= 0),
    protein REAL NOT NULL CHECK (protein >= 0),
    carbohydrate REAL NOT NULL CHECK (carbohydrate >= 0)
);

-- Proteins
INSERT INTO foods (name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate) VALUES
('steak', 'proteins', 300, 5.73, 2.183, 0.182, 29.44, 0.0),
('ground beef', 'proteins', 200, 13.1, 5.3, 0.6, 15.18, 0.0),
('chicken', 'proteins', 100, 9.3, 2.5, 0.1, 27.14, 0.0),
('fish', 'proteins', 80, 6.34, 1.0, 0.0, 19.84, 0.0),
('soy', 'proteins', 50, 19.94, 2.884, 0.0, 36.49, 30.16);

-- Fruits
INSERT INTO foods (name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate) VALUES
('orange', 'fruits', 300, 0.12, 0.0, 0.0, 0.94, 11.75),
('banana', 'fruits', 200, 0.33, 0.0, 0.0, 1.09, 22.84),
('pineapple', 'fruits', 100, 0.12, 0.0, 0.0, 0.54, 13.12),
('grapes', 'fruits', 80, 0.16, 0.0, 0.0, 0.72, 18.1),
('blueberries', 'fruits', 50, 0.33, 0.0, 0.0, 0.74, 14.49);

-- Vegetables
INSERT INTO foods (name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate) VALUES
('romaine', 'vegetables', 30, 0.3, 0.0, 0.0, 1.2, 3.3),
('green beans', 'vegetables', 40, 0.22, 0.0, 0.0, 1.83, 6.97),
('squash', 'vegetables', 100, 0.2, 0.0, 0.0, 1.2, 3.4),
('spinach', 'vegetables', 50, 0.4, 0.0, 0.0, 2.9, 3.6),
('kale', 'vegetables', 10, 0.9, 0.0, 0.0, 4.3, 8.8);

-- Dairy
INSERT INTO foods (name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate) VALUES
('milk', 'dairy', 300, 3.9, 2.4, 0.0, 3.2, 4.8),
('yoghurt', 'dairy', 200, 5.0, 0.0, 0.0, 9.0, 3.98),
('cheddar cheese', 'dairy', 200, 9.0, 6.0, 0.0, 7.0, 0.0),
('skim milk', 'dairy', 100, 0.2, 0.1, 0.0, 8.3, 12.5),
('cottage cheese', 'dairy', 80, 4.3, 0.0, 0.0, 11.12, 3.38);

-- Grains
INSERT INTO foods (name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate) VALUES
('bread', 'grains', 200, 1.1, 0.0, 0.0, 4.0, 13.8),
('bagel', 'grains', 300, 1.7, 0.1, 0.0, 13.8, 68.0),
('pita', 'grains', 250, 1.7, 0.3, 0.0, 6.3, 35.2),
('naan', 'grains', 210, 3.3, 0.1, 0.0, 2.7, 16.9),
('tortilla', 'grains', 120, 0.5, 0.1, 0.0, 1.1, 8.5);

# NUTT (Nutrition Utility & Tracking Tool)

NUTT is a React and Flask food planner for selecting foods and tracking
calories and macronutrients.

## Requirements

- Node.js
- Python 3
- PostgreSQL

## Database Setup

1. Create a PostgreSQL database named `NUTT`.
2. Copy the database configuration template:

   cp server/api/db.example.yml server/api/db.yml

3. Fill in your PostgreSQL credentials.
4. Run `server/api/foods.sql` once to create and seed the foods table.

## Backend

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m server.server

The API runs at:

http://127.0.0.1:5000

## Frontend

cd client
npm install
npm start

The frontend runs at:

http://localhost:3000
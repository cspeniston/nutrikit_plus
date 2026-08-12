import React from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

const NUTRIENT_THRESHOLDS = {
  totalFat: 15,
  saturatedFat: 4,
  transFat: 1,
};

const isHigh = (nutrient, value) => {
  const threshold = NUTRIENT_THRESHOLDS[nutrient];
  return threshold !== undefined && value >= threshold;
};

class NutritionLabel extends React.PureComponent {
  render() {
    const { item } = this.props;
    if (!item) return null;

    const {
      name,
      calories,
      totalFat,
      saturatedFat,
      transFat,
      protein,
      carbohydrate,
    } = item;

    const nutrients = [
      { label: 'Calories', value: calories },
      { label: 'Total Fat', value: totalFat, key: 'totalFat', unit: 'g' },
      { label: 'Saturated Fat', value: saturatedFat, key: 'saturatedFat', unit: 'g' },
      { label: 'Trans Fat', value: transFat, key: 'transFat', unit: 'g' },
      { label: 'Protein', value: protein, unit: 'g' },
      { label: 'Carbohydrates', value: carbohydrate, unit: 'g' },
    ];

    return (
      <Card>
        <CardBody>
          <CardTitle>{name} - Nutrition Information</CardTitle>
          <ListGroup>
            {nutrients.map(({ label, value, key, unit }) => (
              <ListGroupItem key={label}>
                <strong>{label}:</strong> {value}{unit || ''}
                {key && isHigh(key, value) && <span style={{ color: 'red' }}> (High)</span>}
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default NutritionLabel;
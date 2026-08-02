import React, { Component } from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

const isHigh = (value, threshold) => value >= threshold;

const calculateTotals = (selectedItems) => {
  const totals = {
    calories: 0,
    totalFat: 0,
    saturatedFat: 0,
    transFat: 0,
    protein: 0,
    carbohydrate: 0,
  };

  for (let i = 0; i < selectedItems.length; i++) {
    const item = selectedItems[i];
    totals.calories += +item.calories || 0;
    totals.totalFat += +item.totalFat || 0;
    totals.saturatedFat += +item.saturatedFat || 0;
    totals.transFat += +item.transFat || 0;
    totals.protein += +item.protein || 0;
    totals.carbohydrate += +item.carbohydrate || 0;
  }

  return totals;
};


export class TotalLabel extends Component {
  render() {
    const { selectedItems } = this.props;

    if (!selectedItems || selectedItems.length === 0) return null;

    const totals = calculateTotals(selectedItems);

    return (
      <Card>
        <CardBody>
          <CardTitle>Total Nutrition</CardTitle>
          <ListGroup>
            <ListGroupItem>
              <strong>Calories:</strong> {totals.calories}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Total Fat:</strong> {totals.totalFat}g 
              {isHigh(totals.totalFat, 78) && <span style={{ color: 'red' }}> (High)</span>}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Saturated Fat:</strong> {totals.saturatedFat}g 
              {isHigh(totals.saturatedFat, 20) && <span style={{ color: 'red' }}> (High)</span>}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Trans Fat:</strong> {totals.transFat}g 
              {isHigh(totals.transFat, 2) && <span style={{ color: 'red' }}> (High)</span>}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Protein:</strong> {totals.protein}g
            </ListGroupItem>
            <ListGroupItem>
              <strong>Carbohydrates:</strong> {totals.carbohydrate}g
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default TotalLabel;
import { Component } from "react";

export class CalorieTracker extends Component {
  render() {
    const totalCalories = this.props.items.reduce(
      (sum, item) => sum + Number(item.calories),
      0
    );
    return (
      <span id="total-calories">
        {totalCalories > 0 ? `Total Calories: ${totalCalories}` : ''}
      </span>
    );
  }
}

import { Component } from "react";

export class CategorySelect extends Component {
  handleChange = (e) => {
    this.props.onCategoryChange(e.target.value);
  };

  render() {
    const { foodData, selectedCategory } = this.props;

    return (
      <select
        value={selectedCategory}
        onChange={this.handleChange}
      >
        <option value="">Select a category</option>

        {Object.keys(foodData).map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    );
  }
}
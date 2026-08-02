import { Component } from "react";

export class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategory: '' };
  }

  handleChange = (e) => {
    this.setState({ selectedCategory: e.target.value });
    this.props.onCategoryChange(e.target.value);
  };

  render() {
    const { foodData } = this.props;
    return (
        <select value={this.state.selectedCategory} onChange={this.handleChange}>
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

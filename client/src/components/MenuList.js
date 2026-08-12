import { Component } from "react";

export class MenuList extends Component {
  handleSelect = (e) => {
    const selectedId = Number(e.target.value);

    const selectedItem =
      this.props.foodData[this.props.selectedCategory]?.find(
        item => item.id === selectedId
      );

    this.props.onMenuItemSelect(selectedItem);
  };

  render() {
    const {
      selectedCategory,
      selectedMenuItem,
      foodData
    } = this.props;

    const menuItems = foodData[selectedCategory] || [];

    return (
      <select
        size="5"
        value={selectedMenuItem?.id ?? ''}
        onChange={this.handleSelect}
      >
        {menuItems.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    );
  }
}
import { Component } from "react";

export class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedMenuItem: null };
  }

  handleSelect = (e) => {
    const selectedName = e.target.value;
    const selectedItem = this.props.foodData[this.props.selectedCategory]?.find(item => item.name === selectedName);
    this.setState({ selectedMenuItem: selectedItem });
    this.props.onMenuItemSelect(selectedItem);
  };

  render() {
    const { selectedCategory, foodData } = this.props;
    const menuItems = foodData[selectedCategory] || [];
    return (
        <select size="5" value={this.state.selectedMenuItem?.name || ''} onClick={this.handleSelect}>
          {menuItems.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
    );
  }
}

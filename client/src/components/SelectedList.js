import { Component } from "react";

export class SelectedList extends Component {
  render() {
    const { items, onItemClick, selectedSelectedItem } = this.props;

    return (
      <select size="5" id="selected-items">
        {items.map((item, index) => (
            <option
                key={index}
                onClick={() => onItemClick(index)}
                selected={index === selectedSelectedItem}
            >{item.name}
            </option>
        ))}
      </select>
    );
  }
}

import { Component } from "react";

export class SelectedList extends Component {
  render() {
    const { items, onItemClick, selectedSelectedItem } = this.props;

    return (
      <select
        size="5"
        id="selected-items"
        value={selectedSelectedItem ?? ''}
        onChange={(e) => onItemClick(Number(e.target.value))}
        > {items.map((item, index) => (
        <option key={`${item.id}-${index}`} value={index}></option>
        ))}
      </select>
    );
  }
}

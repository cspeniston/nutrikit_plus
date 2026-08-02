import { Component } from "react";

export class AddRemoveButton extends Component {
  render() {
    const { isRemoveMode, onAddItem, onRemoveItem } = this.props;
    return (
        <button onClick={isRemoveMode ? onRemoveItem : onAddItem}>
          {isRemoveMode ? "<<" : ">>"}
        </button>
    );
  }
}

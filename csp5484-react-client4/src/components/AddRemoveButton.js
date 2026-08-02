import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

export function AddRemoveButton({ onAddItem, onRemoveItem, isRemoveEnabled }) {
  return (
    <ButtonGroup vertical>
      <Button color="primary" onClick={onAddItem}>
        Add
      </Button>
      <Button color="danger" onClick={onRemoveItem} disabled={!isRemoveEnabled}>
        Remove
      </Button>
    </ButtonGroup>
  );
}
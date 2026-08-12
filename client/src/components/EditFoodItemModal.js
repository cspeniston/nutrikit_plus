import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label } from 'reactstrap';

class EditFoodItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: { ...props.foodItem }
    };
  }

  componentDidUpdate(prevProps) {
    // If the incoming foodItem prop has changed, update the state
    if (prevProps.foodItem !== this.props.foodItem) {
      this.setState({ item: { ...this.props.foodItem } });
    }
  }

  handleInputChange = (field) => (e) => {
    const value = e.target.value;
    this.setState((prevState) => ({
      item: {
        ...prevState.item,
        [field]: ['calories', 'totalFat', 'saturatedFat', 'transFat', 'protein', 'carbohydrate'].includes(field)
          ? Number(value)
          : value,
      },
    }));
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.item);
  };

  render() {
    const { isOpen, toggle } = this.props;
    const { item } = this.state;
    const { name, calories, totalFat, saturatedFat, transFat, protein, carbohydrate } = item;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Food Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="name">Food Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange('name')}
                  required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="calories">Calories</Label>
                  <Input
                    type="number"
                    id="calories"
                    name="calories"
                    value={calories}
                    onChange={this.handleInputChange('calories')}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="totalFat">Total Fat (g)</Label>
                  <Input
                    type="number"
                    id="totalFat"
                    name="totalFat"
                    value={totalFat}
                    onChange={this.handleInputChange('totalFat')}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="saturatedFat">Saturated Fat (g)</Label>
                  <Input
                    type="number"
                    id="saturatedFat"
                    name="saturatedFat"
                    value={saturatedFat}
                    onChange={this.handleInputChange('saturatedFat')}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="transFat">Trans Fat (g)</Label>
                  <Input
                    type="number"
                    id="transFat"
                    name="transFat"
                    value={transFat}
                    onChange={this.handleInputChange('transFat')}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="protein">Protein (g)</Label>
                  <Input
                    type="number"
                    id="protein"
                    name="protein"
                    value={protein}
                    onChange={this.handleInputChange('protein')}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="carbohydrate">Carbohydrates (g)</Label>
                  <Input
                    type="number"
                    id="carbohydrate"
                    name="carbohydrate"
                    value={carbohydrate}
                    onChange={this.handleInputChange('carbohydrate')}
                    required
                  />
                </FormGroup>
                <ModalFooter>
                  <Button color="primary" type="submit">Edit Item</Button>
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </Form>
            </ModalBody>
          </Modal>
        );
  }
}

export default EditFoodItemModal;
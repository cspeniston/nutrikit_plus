import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddFoodItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      calories: '',
      totalFat: '',
      saturatedFat: '',
      transFat: '',
      protein: '',
      carbohydrate: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ 
      [name]: ['calories', 'totalFat', 'saturatedFat', 'transFat', 'protein', 'carbohydrate'].includes(name) 
        ? value === '' ? '' : Number(value)
        : value 
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, calories, totalFat, saturatedFat, transFat, protein, carbohydrate } = this.state;
    const newItem = {
      name,
      calories: isNaN(calories) ? 0 : calories, 
      totalFat: isNaN(totalFat) ? 0 : totalFat, 
      saturatedFat: isNaN(saturatedFat) ? 0 : saturatedFat, 
      transFat: isNaN(transFat) ? 0 : transFat, 
      protein: isNaN(protein) ? 0 : protein, 
      carbohydrate: isNaN(carbohydrate) ? 0 : carbohydrate
    };
    this.props.onAddItem(newItem);
    this.setState({
      name: '',
      calories: '',
      totalFat: '',
      saturatedFat: '',
      transFat: '',
      protein: '',
      carbohydrate: ''
    });
  };

  render() {
    const { isOpen, toggle } = this.props;
    const { name, calories, totalFat, saturatedFat, transFat, protein, carbohydrate } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Food Item</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Food Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="calories">Calories</Label>
              <Input
                type="number"
                id="calories"
                name="calories"
                value={calories || ''}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="totalFat">Total Fat (g)</Label>
              <Input
                type="number"
                id="totalFat"
                name="totalFat"
                value={totalFat || ''}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="saturatedFat">Saturated Fat (g)</Label>
              <Input
                type="number"
                id="saturatedFat"
                name="saturatedFat"
                value={saturatedFat || ''}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="transFat">Trans Fat (g)</Label>
              <Input
                type="number"
                id="transFat"
                name="transFat"
                value={transFat || ''}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="protein">Protein (g)</Label>
              <Input
                type="number"
                id="protein"
                name="protein"
                value={protein || ''}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="carbohydrate">Carbohydrates (g)</Label>
              <Input
                type="number"
                id="carbohydrate"
                name="carbohydrate"
                value={carbohydrate || ''}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" type="submit">Add Item</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddFoodItemModal;

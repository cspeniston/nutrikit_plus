import react from 'react';
import { Component } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { Label, Input, Progress, Button } from 'reactstrap';
import { CategorySelect } from "./components/CategorySelect";
import { MenuList } from "./components/MenuList";
import { SelectedList } from "./components/SelectedList";
import { AddRemoveButton } from "./components/AddRemoveButton";
import { CalorieTracker } from "./components/CalorieTracker";
import NutritionLabel from './components/NutritionLabel';
import EditFoodItemModal from './components/EditFoodItemModal';
import AddFoodItemModal from './components/AddFoodItemModal';
import TotalLabel from './components/TotalLabel';

export class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      selectedMenuItem: null,
      selectedSelectedItem: null,
      selectedItems: [],
      isEditFoodModalOpen: false,
      isAddFoodModalOpen: false,
      calorieGoal: 2000,
      progress: 0,
      selectedToEdit: null,
      foodData: {
        proteins: [
          { name: "steak", calories: 300, totalFat: 5.73, saturatedFat: 2.183, transFat: 0.182, protein: 29.44, carbohydrate: 0.0 },
          { name: "ground beef", calories: 200, totalFat: 13.1, saturatedFat: 5.3, transFat: 0.6, protein: 15.18, carbohydrate: 0.0 },
          { name: "chicken", calories: 100, totalFat: 9.3, saturatedFat: 2.5, transFat: 0.1, protein: 27.14, carbohydrate: 0.0 },
          { name: "fish", calories: 80, totalFat: 6.34, saturatedFat: 1.0, transFat: 0.0, protein: 19.84, carbohydrate: 0.0 },
          { name: "soy", calories: 50, totalFat: 19.94, saturatedFat: 2.884, transFat: 0.0, protein: 36.49, carbohydrate: 30.16 }
        ],
        fruits: [
          { name: "orange", calories: 300, totalFat: 0.12, saturatedFat: 0.0, transFat: 0.0, protein: 0.94, carbohydrate: 11.75 },
          { name: "banana", calories: 200, totalFat: 0.33, saturatedFat: 0.0, transFat: 0.0, protein: 1.09, carbohydrate: 22.84 },
          { name: "pineapple", calories: 100, totalFat: 0.12, saturatedFat: 0.0, transFat: 0.0, protein: 0.54, carbohydrate: 13.12 },
          { name: "grapes", calories: 80, totalFat: 0.16, saturatedFat: 0.0, transFat: 0.0, protein: 0.72, carbohydrate: 18.1 },
          { name: "blueberries", calories: 50, totalFat: 0.33, saturatedFat: 0.0, transFat: 0.0, protein: 0.74, carbohydrate: 14.49 }
        ],
        vegetables: [
          { name: "romaine", calories: 30, totalFat: 0.3, saturatedFat: 0.0, transFat: 0.0, protein: 1.2, carbohydrate: 3.3 },
          { name: "green beans", calories: 40, totalFat: 0.22, saturatedFat: 0.0, transFat: 0.0, protein: 1.83, carbohydrate: 6.97 },
          { name: "squash", calories: 100, totalFat: 0.2, saturatedFat: 0.0, transFat: 0.0, protein: 1.2, carbohydrate: 3.4 },
          { name: "spinach", calories: 50, totalFat: 0.4, saturatedFat: 0.0, transFat: 0.0, protein: 2.9, carbohydrate: 3.6 },
          { name: "kale", calories: 10, totalFat: 0.9, saturatedFat: 0.0, transFat: 0.0, protein: 4.3, carbohydrate: 8.8 }
        ],
        dairy: [
          { name: "milk", calories: 300, totalFat: 3.9, saturatedFat: 2.4, transFat: 0.0, protein: 3.2, carbohydrate: 4.8 },
          { name: "yoghurt", calories: 200, totalFat: 5.0, saturatedFat: 0.0, transFat: 0.0, protein: 9.0, carbohydrate: 3.98 },
          { name: "cheddar cheese", calories: 200, totalFat: 9.0, saturatedFat: 6.0, transFat: 0.0, protein: 7.0, carbohydrate: 0.0 },
          { name: "skim milk", calories: 100, totalFat: 0.2, saturatedFat: 0.1, transFat: 0.0, protein: 8.3, carbohydrate: 12.5 },
          { name: "cottage cheese", calories: 80, totalFat: 4.3, saturatedFat: 0.0, transFat: 0.0, protein: 11.12, carbohydrate: 3.38 }
        ],
        grains: [
          { name: "bread", calories: 200, totalFat: 1.1, saturatedFat: 0.0, transFat: 0.0, protein: 4.0, carbohydrate: 13.8 },
          { name: "bagel", calories: 300, totalFat: 1.7, saturatedFat: 0.1, transFat: 0.0, protein: 13.8, carbohydrate: 68 },
          { name: "pita", calories: 250, totalFat: 1.7, saturatedFat: 0.3, transFat: 0.0, protein: 6.3, carbohydrate: 35.2 },
          { name: "naan", calories: 210, totalFat: 3.3, saturatedFat: 0.1, transFat: 0.0, protein: 2.7, carbohydrate: 16.9 },
          { name: "tortilla", calories: 120, totalFat: 0.5, saturatedFat: 0.1, transFat: 0.0, protein: 1.1, carbohydrate: 8.5 }
        ],
      },
    };
  }

  //changing categories
  handleCategoryChange = (category) => {
    const items = this.state.foodData[category] || [];
    const firstItem = items[0] || null;

    this.setState({ 
    selectedCategory: category, 
    selectedMenuItem: firstItem,
    selectedSelectedItem: null
    });
  };

  //selecting from menu list
  handleMenuItemSelect = (item) => {
    this.setState({ 
    selectedMenuItem: item,
    selectedToEdit: item,
    selectedSelectedItem: null
  });
  };

  //add to selected items
  handleAddItem = () => {
    const { selectedMenuItem } = this.state;
    if (selectedMenuItem) {
      this.setState((prevState) => ({
        selectedItems: [...prevState.selectedItems, selectedMenuItem],
        selectedSelectedItem: null,
      }),
      this.updateProgress
      );
    }
  };
  
  //selecting from selected list
  handleSelectItemForRemoval = (index) => {
    const selectedItem = this.state.selectedItems[index];
    this.setState({ 
      selectedSelectedItem: index,
      selectedToEdit: selectedItem
    });
  }; 

  //remove from selected list
  handleRemoveItem = () => {
    this.setState((prevState) => {
      if (prevState.selectedSelectedItem === null) return null;
  
      const newItems = [...prevState.selectedItems];
      newItems.splice(prevState.selectedSelectedItem, 1);
  
      return {
        selectedItems: newItems,
        selectedSelectedItem: null,
      };
    }, this.updateProgress);
  };


  // toggles the edit modal
  toggleEditModal = () => {
    this.setState((prevState) => ({
      isEditFoodModalOpen: !prevState.isEditFoodModalOpen
    }));
  };

  // saves edit from updated item
  handleSaveEditedItem = (updatedItem) => {
    const { foodData, selectedCategory, selectedItems, selectedSelectedItem } = this.state;
    const updatedFoodData = { ...foodData };
    const categoryItems = [...updatedFoodData[selectedCategory]];
    const itemIndex = categoryItems.findIndex(item => item.name === updatedItem.name);
  
    if (itemIndex !== -1) {
      categoryItems[itemIndex] = updatedItem;
      updatedFoodData[selectedCategory] = categoryItems;
  
      // update selectedItems if necessary
      let updatedSelectedItems = [...selectedItems];
      if (selectedSelectedItem !== null) {
        updatedSelectedItems[selectedSelectedItem] = updatedItem;
      }
  
      this.setState({
        foodData: updatedFoodData,
        selectedItems: selectedSelectedItem !== null ? updatedSelectedItems : selectedItems,
        isEditFoodModalOpen: false
      });
    } else {
      console.warn('Item to edit not found in foodData.');
    }
  };  

  //new food items
  handleAddNewItem = (newItem) => {
    const { selectedCategory, foodData } = this.state;
    const updatedFoodData = { ...foodData };
    updatedFoodData[selectedCategory].push(newItem);
    this.setState({ foodData: updatedFoodData, isAddFoodModalOpen: false });
  };

  // toggles the add modal
  toggleAddModal = () => {
    this.setState((prevState) => ({
      isAddFoodModalOpen: !prevState.isAddFoodModalOpen
    }));
  };

  // changes the calorie goal
  handleCalorieGoalChange = (e) => {
    const newGoal = Number(e.target.value);
    this.setState({ calorieGoal: newGoal }, this.updateProgress);
  };

  // calculates total cals
  calculateTotalCalories = () => {
    return this.state.selectedItems.reduce(
      (sum, item) => sum + Number(item.calories),
      0
    );
  };
  
  // updates progress
  updateProgress = () => {
    const totalCalories = this.calculateTotalCalories();
    const { calorieGoal } = this.state;
    const progress = calorieGoal > 0 ? Math.min((totalCalories / calorieGoal) * 100, 100) : 0;
    this.setState({ progress });
  };
  
  // renders
  render() {
    const { selectedCategory, 
            selectedItems, 
            foodData, 
            selectedSelectedItem, 
            selectedToEdit, 
            isEditFoodModalOpen, 
            isAddFoodModalOpen, 
            calorieGoal, 
            progress } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Categories</CardTitle>
                <CategorySelect
                  foodData={foodData}
                  onCategoryChange={this.handleCategoryChange}
                />
              </CardBody>
            </Card>
          </Col>
          
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Menu Items</CardTitle>
                <MenuList
                  selectedCategory={selectedCategory}
                  foodData={foodData}
                  onMenuItemSelect={this.handleMenuItemSelect}
                />
              </CardBody>
            </Card>
          </Col>

          <Col>
            <AddRemoveButton 
              onAddItem={this.handleAddItem}
              onRemoveItem={this.handleRemoveItem}
              isRemoveEnabled={selectedSelectedItem !== null}
            />
          </Col>

          <Col>
            <Card>
              <CardBody>
                <CardTitle>Selected Items</CardTitle>
                <SelectedList
                  items={selectedItems}
                  onItemClick={this.handleSelectItemForRemoval}
                  selectedSelectedItem={selectedSelectedItem}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <NutritionLabel item={selectedToEdit} />
          </Col>
          <Col>
            <TotalLabel selectedItems={selectedItems} />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button onClick={this.toggleEditModal} color="warning" disabled={selectedToEdit === null}>
              Edit Item
            </Button>
            <EditFoodItemModal
              isOpen={isEditFoodModalOpen}
              toggle={this.toggleEditModal}
              foodItem={selectedToEdit}
              onSave={this.handleSaveEditedItem}
            />
          </Col>
            
          <Col>
            <Button onClick={this.toggleAddModal} color="success">
              Add Item
            </Button>
            <AddFoodItemModal
              isOpen={isAddFoodModalOpen}
              toggle={this.toggleAddModal}
              onAddItem={this.handleAddNewItem}
            />
          </Col>
        </Row>

        <Row>
          <Card>
            <CardBody>
                <CardTitle>Calorie Tracker</CardTitle>
                <CalorieTracker items={selectedItems} />
                <Row>
                  <Label for="calorieGoal">Set Calorie Goal</Label>
                  <Input 
                    type="number" 
                    id="calorieGoal" 
                    value={calorieGoal} 
                    onChange={this.handleCalorieGoalChange} 
                  />
                </Row>
                <Row>
                  <CardTitle>Progress</CardTitle>
                  <Progress value={progress} max={100} />
                </Row>
            </CardBody>
          </Card>
        </Row>
      </Container>
    )
  }
}


export default Page;
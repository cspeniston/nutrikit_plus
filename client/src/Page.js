import { Component } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Label, Input, Progress, Button } from "reactstrap";
import { CategorySelect } from "./components/CategorySelect";
import { MenuList } from "./components/MenuList";
import { SelectedList } from "./components/SelectedList";
import { AddRemoveButton } from "./components/AddRemoveButton";
import { CalorieTracker } from "./components/CalorieTracker";
import NutritionLabel from "./components/NutritionLabel";
import EditFoodItemModal from "./components/EditFoodItemModal";
import AddFoodItemModal from "./components/AddFoodItemModal";
import TotalLabel from "./components/TotalLabel";

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
        proteins: [],
        fruits: [],
        vegetables: [],
        dairy: [],
        grains: []
      }
    };
  }

  handleCategoryChange = (category) => {
    const items = this.state.foodData[category] || [];
    const firstItem = items[0] || null;

    this.setState({ 
    selectedCategory: category, 
    selectedMenuItem: firstItem,
    selectedSelectedItem: null
    });
  };

  handleMenuItemSelect = (item) => {
    this.setState({ 
    selectedMenuItem: item,
    selectedToEdit: item,
    selectedSelectedItem: null
  });
  };

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
  
  handleSelectItemForRemoval = (index) => {
    const selectedItem = this.state.selectedItems[index];
    this.setState({ 
      selectedSelectedItem: index,
      selectedToEdit: selectedItem
    });
  }; 

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

  toggleEditModal = () => {
    this.setState((prevState) => ({
      isEditFoodModalOpen: !prevState.isEditFoodModalOpen
    }));
  };

  handleSaveEditedItem = (updatedItem) => {
    const { selectedCategory } = this.state;
  
    fetch('/api/foods', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    })
    .then(res => {
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    })
    .then(() => {
      this.toggleEditModal();
      this.fetchFoodDataFromServer();
    })
    .catch(err => console.error("Edit item failed:", err));
  };
  
  handleAddNewItem = (newItem) => {
    const { selectedCategory } = this.state;
    fetch('/api/foods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newItem, category: selectedCategory })
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to add item");
      return res.json();
    })
    .then(() => {
      this.toggleAddModal();
      this.fetchFoodDataFromServer();
    })
    .catch(err => console.error("Add item failed:", err));
  };  

  toggleAddModal = () => {
    this.setState((prevState) => ({
      isAddFoodModalOpen: !prevState.isAddFoodModalOpen
    }));
  };

  handleCalorieGoalChange = (e) => {
    const newGoal = Number(e.target.value);
    this.setState({ calorieGoal: newGoal }, this.updateProgress);
  };

  calculateTotalCalories = () => {
    return this.state.selectedItems.reduce(
      (sum, item) => sum + Number(item.calories),
      0
    );
  };
  
  updateProgress = () => {
    const totalCalories = this.calculateTotalCalories();
    const { calorieGoal } = this.state;
    const progress = calorieGoal > 0 ? Math.min((totalCalories / calorieGoal) * 100, 100) : 0;
    this.setState({ progress });
  };

  componentDidMount() {
    this.fetchFoodDataFromServer();
  }
  
  fetchFoodDataFromServer = () => {
    fetch('/api/foods')
      .then(response => response.json())
      .then(data => {
        const organized = {
          proteins: [],
          fruits: [],
          vegetables: [],
          grains: [],
          dairy: []
        };
        data.forEach(item => {
          const category = item.category.toLowerCase();
          if (organized[category]) {
            organized[category].push(item);
          }
        });
        this.setState({ foodData: organized });
      })
      .catch(err => console.error("Failed to fetch food data:", err));
  };
  
  handleDeleteItem = (itemToDelete) => {
    if (!itemToDelete || !itemToDelete.name) return;
  
    fetch('/api/foods', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: itemToDelete.id })
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to delete item");
      this.fetchFoodDataFromServer();
      this.setState(prev => ({
        selectedItems: prev.selectedItems.filter(item => item.name !== itemToDelete.name),
        selectedToEdit: null,
        selectedSelectedItem: null
      }));
    })
    .catch(err => console.error("Delete error:", err));
  };
  

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

          <Col>
          <Button onClick={() => this.handleDeleteItem(selectedToEdit)} color="danger" disabled={selectedToEdit === null}>
            Delete Item
          </Button>
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
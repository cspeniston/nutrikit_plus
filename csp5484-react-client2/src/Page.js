import { Component } from "react";
import { CategorySelect } from "./components/CategorySelect";
import { MenuList } from "./components/MenuList";
import { SelectedList } from "./components/SelectedList";
import { AddRemoveButton } from "./components/AddRemoveButton";
import { CalorieTracker } from "./components/CalorieTracker";

export class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      selectedMenuItem: null,
      selectedSelectedItem: null,
      selectedItems: [],
      foodData: {
        proteins: [
          { name: 'steak', calories: 300 },
          { name: 'ground beef', calories: 200 },
          { name: 'chicken', calories: 100 },
          { name: 'fish', calories: 80 },
          { name: 'soy', calories: 50 },
        ],
        fruits: [
          { name: 'orange', calories: 300 },
          { name: 'banana', calories: 200 },
          { name: 'pineapple', calories: 100 },
          { name: 'grapes', calories: 80 },
          { name: 'blueberries', calories: 50 },
        ],
        vegetables: [
          { name: 'romaine', calories: 30 },
          { name: 'green beans', calories: 40 },
          { name: 'squash', calories: 100 },
          { name: 'spinach', calories: 50 },
          { name: 'kale', calories: 10 },
        ],
        dairy: [
          { name: 'milk', calories: 300 },
          { name: 'yoghurt', calories: 200 },
          { name: 'cheddar cheese', calories: 200 },
          { name: 'skim milk', calories: 100 },
          { name: 'cottage cheese', calories: 80 },
        ],
        grains: [
          { name: 'bread', calories: 200 },
          { name: 'bagel', calories: 300 },
          { name: 'pita', calories: 250 },
          { name: 'naan', calories: 210 },
          { name: 'tortilla', calories: 120 },
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
    selectedMenuItem: firstItem 
    });
  };

  //selecting from menu list
  handleMenuItemSelect = (item) => {
    this.setState({ selectedMenuItem: item });
  };

  //add
  handleAddItem = () => {
    const { selectedMenuItem } = this.state;
    if (selectedMenuItem) {
      this.setState((prevState) => ({
        selectedItems: [...prevState.selectedItems, selectedMenuItem],
        selectedSelectedItem: null,
      }));
    }
  };
  
  //selecting from selected list
  handleSelectItemForRemoval = (index) => {
    this.setState({ selectedSelectedItem: index });
  }; 

  //remove
  handleRemoveItem = () => {
    this.setState((prevState) => {
      if (prevState.selectedSelectedItem === null) return null;
  
      const newItems = [...prevState.selectedItems];
      newItems.splice(prevState.selectedSelectedItem, 1);
  
      return {
        selectedItems: newItems,
        selectedSelectedItem: null,
      };
    });
  };  

  
  render() {
    const { selectedCategory, selectedItems, foodData, selectedSelectedItem } = this.state;

    return (
        <div class="container">
        <div class="column"><p>Categories</p></div>
        <div class="column"><p>Menu Items</p></div>
        <div class="column"></div>
        <div class="column"><p>Selected Items</p></div>
    
        <div class="column">
            <CategorySelect
            foodData={foodData}
            onCategoryChange={this.handleCategoryChange}
            />
        </div>
    
        <div class="column">
            <MenuList
            selectedCategory={selectedCategory}
            foodData={foodData}
            onMenuItemSelect={this.handleMenuItemSelect}
            />
        </div>
    
        <div class="column button-column">
            <AddRemoveButton 
            onAddItem={this.handleAddItem}
            onRemoveItem={this.handleRemoveItem}
            isRemoveMode={selectedSelectedItem !== null}
            />
        </div>
    
        <div class="column">
            <SelectedList
            items={selectedItems}
            onItemClick={(index) => this.handleSelectItemForRemoval(index)}
            selectedSelectedItem={selectedSelectedItem}
            />
            <CalorieTracker 
            items={selectedItems} 
            />
        </div>
    </div>  
    );
  }
}


export default Page;
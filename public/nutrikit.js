const foodData = {
    proteins: [
        { name: 'steak', calories: 300 },
        { name: 'ground beef', calories: 200 },
        { name: 'chicken', calories: 100 },
        { name: 'fish', calories: 80 },
        { name: 'soy', calories: 50 }
    ],
    fruits: [
        { name: 'orange', calories: 300 },
        { name: 'banana', calories: 200 },
        { name: 'pineapple', calories: 100 },
        { name: 'grapes', calories: 80 },
        { name: 'blueberries', calories: 50 }
    ],
    vegetables: [
        { name: 'romaine', calories: 30 },
        { name: 'green beans', calories: 40 },
        { name: 'squash', calories: 100 },
        { name: 'spinach', calories: 50 },
        { name: 'kale', calories: 10 }
    ],
    dairy: [
        { name: 'milk', calories: 300 },
        { name: 'yoghurt', calories: 200 },
        { name: 'cheddar cheese', calories: 200 },
        { name: 'skim milk', calories: 100 },
        { name: 'cottage cheese', calories: 80 }
    ],
    grains: [
        { name: 'bread', calories: 200 },
        { name: 'bagel', calories: 300 },
        { name: 'pita', calories: 250 },
        { name: 'naan', calories: 210 },
        { name: 'tortilla', calories: 120 }
    ]
};


const categorySelect = document.getElementById('category');
const menuItems = document.getElementById('menu-items');
const selectedItems = document.getElementById('selected-items');
const addRemoveButton = document.getElementById('add-remove');
const totalCaloriesDisplay = document.getElementById('total-calories');
let totalCalories = 0;
let currentMode = 'add';

function populateMenuItems() {
    const category = categorySelect.value;
    menuItems.innerHTML = '';
    if (!category || !foodData[category]) return;

    foodData[category].forEach(item => {
        const option = document.createElement('option');
        option.value = item.calories;
        option.textContent = item.name;
        menuItems.appendChild(option);
    });

    resetButtonMode();
}

menuItems.addEventListener('click', () => {
    currentMode = 'add';
    addRemoveButton.textContent = '>>';
});

selectedItems.addEventListener('click', () => {
    currentMode = 'remove';
    addRemoveButton.textContent = '<<';
});

addRemoveButton.addEventListener('click', () => {
    if (currentMode === 'add') {
        const selectedOption = menuItems.selectedOptions[0];
        if (!selectedOption) return;

        const cloned = document.createElement('option');
        cloned.value = selectedOption.value;
        cloned.textContent = selectedOption.textContent;
        selectedItems.appendChild(cloned);
        totalCalories += parseInt(cloned.value);
    } else if (currentMode === 'remove') {
        const selectedOption = selectedItems.selectedOptions[0];
        if (!selectedOption) return;

        totalCalories -= parseInt(selectedOption.value);
        selectedItems.removeChild(selectedOption);
    }

    if (totalCalories > 0) {
        totalCaloriesDisplay.style.display = 'block';
        totalCaloriesDisplay.textContent = `Total Calories: ${totalCalories}`;
    } else {
        totalCaloriesDisplay.style.display = 'none';
    }
    
    resetButtonMode();
});

function resetButtonMode() {
    currentMode = 'add';
    addRemoveButton.textContent = '>>';
}

categorySelect.addEventListener('change', populateMenuItems);
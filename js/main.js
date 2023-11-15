// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
	{ id: 1, name: "Light City", roast: "light" },
	{ id: 2, name: "Half City", roast: "light" },
	{ id: 3, name: "Cinnamon", roast: "light" },
	{ id: 4, name: "City", roast: "medium" },
	{ id: 5, name: "American", roast: "medium" },
	{ id: 6, name: "Breakfast", roast: "medium" },
	{ id: 7, name: "High", roast: "dark" },
	{ id: 8, name: "Continental", roast: "dark" },
	{ id: 9, name: "New Orleans", roast: "dark" },
	{ id: 10, name: "European", roast: "dark" },
	{ id: 11, name: "Espresso", roast: "dark" },
	{ id: 12, name: "Viennese", roast: "dark" },
	{ id: 13, name: "Italian", roast: "dark" },
	{ id: 14, name: "French", roast: "dark" },
];

const updateCoffees = (coffees) => {
	let displayCoffee = filterCoffee(coffees);
	renderCoffees(displayCoffee);
};

const createCoffeeElement = coffee => {
	let coffeeItem = document.createElement('div');
	coffeeItem.classList.add("d-flex", "flex-row", "col-12");
	coffeeItem.innerHTML = `
   		<p class="col-6">${coffee.name}</p>
		<p class="col-6">${coffee.roast}</p>
    `;
	return coffeeItem;
};

const filterCoffee = coffees => {
	let coffeeResult = coffees;
	let selectedRoast = document.querySelector(`#roast-selection`);
	coffeeResult = coffeeResult.filter(coffee=>{
		if (selectedRoast.value === "all") {
			return coffees;
		} else {
			return coffee.roast.includes(selectedRoast.value);
		}
	})
	return coffeeResult;
}

const renderCoffees = (coffees) => {
	for(coffee of coffees) {
		const coffeeBody = document.querySelector('#coffee-body');
		const coffeeElement = createCoffeeElement(coffee);
		coffeeBody.appendChild(coffeeElement);
	}
};

const handleFilter = (coffees) => {
	let coffeeBody = document.querySelector('#coffee-body');
	let selectedRoast = document.querySelector(`#roast-selection`);
	selectedRoast.addEventListener('change', e=> {
		coffeeBody.innerHTML = "";
		updateCoffees(coffees)
	});
}

// IIFE
(() => {
	updateCoffees(coffees);
	handleFilter(coffees);
})();

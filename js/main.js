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
	const roastInput = document.querySelector('input[name=roast]:checked');
	const searchInput = document.querySelector('#search');
	const searchValue = searchInput.value;
	coffeeResult = coffeeResult.filter(coffee=>{
		if (roastInput.value === "all") {
			return coffee;
		} else {
			return coffee.roast.includes(roastInput.value);
		}
	});
	coffeeResult = coffeeResult.filter(coffee=>{
		if(!searchValue) {
			return true;
		}
		return coffee.name.toLowerCase().includes(searchValue.toLowerCase());
	});
	coffeeResult.sort((a, b) => a.id - b.id);
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
	let roastBtns = document.querySelectorAll(`input[name=roast]`);
	const searchInput = document.querySelector('#search');
	for (let roastBtn of roastBtns) {
		roastBtn.addEventListener('click', e => {
			coffeeBody.innerHTML = "";
			updateCoffees(coffees);
		});
	}
	searchInput.addEventListener('input', e=> {
		coffeeBody.innerHTML = "";
		updateCoffees(coffees);
	});
}

const addCoffee = (coffees) => {
	const coffeeBody = document.querySelector('#coffee-body');
	const submitCoffee = document.querySelector('.coffee-form button');
	const formBody = document.querySelector('form.coffee-form');
	const cName = document.querySelector('#coffeename-input');
	const cRoast = document.querySelector('#coffeeroast-input');
	submitCoffee.addEventListener('click', e => {
		e.preventDefault();
		let coffeeItem = document.createElement('div');
		coffeeItem.classList.add("d-flex", "flex-row", "col-12");
		coffeeItem.innerHTML = `
   		<p class="col-6">${cName.value}</p>
		<p class="col-6">${cRoast.value}</p>
    		`;
		let cObject = {id: coffees.length+1, name: cName.value, roast: cRoast.value};
		coffees.push(cObject);
		coffeeBody.appendChild(coffeeItem);
		formBody.classList.remove('active');
	});
	updateCoffees(coffees);
}

const handleForm = () => {
	const formBtn = document.querySelector('#form-btn');
	const formBody = document.querySelector('form.coffee-form');
	formBtn.addEventListener('click', e=> {
		formBody.classList.toggle('active');
	})
}

// IIFE
(() => {
	updateCoffees(coffees);
	handleFilter(coffees);
	handleForm();
	addCoffee(coffees);
})();

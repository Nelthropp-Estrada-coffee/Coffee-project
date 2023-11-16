// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
	{ id: 1, name: "Light City", roast: "light" , price: "$5.00" },
	{ id: 2, name: "Half City", roast: "light" , price: "$12.00"},
	{ id: 3, name: "Cinnamon", roast: "light" , price: "$4.00"},
	{ id: 4, name: "City", roast: "medium", price: "$54.00" },
	{ id: 5, name: "American", roast: "medium" , price: "$6.00"},
	{ id: 6, name: "Breakfast", roast: "medium" , price: "$100.00"},
	{ id: 7, name: "High", roast: "dark", price: "$87.00" },
	{ id: 8, name: "Continental", roast: "dark" , price: "$90.00" },
	{ id: 9, name: "New Orleans", roast: "dark", price: "$14.00" },
	{ id: 10, name: "European", roast: "dark", price: "$55.00" },
	{ id: 11, name: "Espresso", roast: "dark" , price: "$156.00"},
	{ id: 12, name: "Viennese", roast: "dark" , price: "$309.00"},
	{ id: 13, name: "Italian", roast: "dark", price: "$3.00" },
	{ id: 14, name: "French", roast: "dark" , price: "$5.00"},
];

const debounce = (fn, delay) => {
	let timeoutId;
	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};

const updateCoffees = (coffees) => {
	let displayCoffee = filterCoffee(coffees);
	renderCoffees(displayCoffee);
};

const createCoffeeElement = coffee => {
	let coffeeItem = document.createElement('div');
	coffeeItem.classList.add("d-flex", "flex-row", "col-12", "coffee-item");
	coffeeItem.innerHTML = `
   		<p class="col-6">${coffee.name}</p>
		<p class="col-6">${coffee.roast}</p>
		<p class="col-3">${coffee.price}</p>
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
	let coffeeBody = document.querySelector('#coffee-body');
	coffeeBody.innerHTML = "";
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
	searchInput.addEventListener('input', debounce((e) => {
		if (searchInput.value.toLowerCase() === "the") {
			return;
		}
		updateCoffees(coffees);
	}, 1000));
	searchInput.addEventListener('input', e => {
		document.querySelector('#spin').classList.add('active');
		setTimeout(()=> {
			document.querySelector('#spin').classList.remove('active');
		},1000);
	});
}
const addCoffee = (coffees) => {
	const coffeeBody = document.querySelector('#coffee-body');
	const submitCoffee = document.querySelector('.coffee-form button');
	const formBody = document.querySelector('form.coffee-form');
	const cName = document.querySelector('#coffeename-input');
	const cRoast = document.querySelector('#coffeeroast-input');
	const cPrice = document.querySelector('#coffeePrice-input');
	submitCoffee.addEventListener('click', e => {
		e.preventDefault();
		const cPriceDol = parseFloat(cPrice.value).toLocaleString("en-US", {style: "currency", currency: "USD"});
		console.log(cPriceDol);
		let coffeeItem = document.createElement('div');
		coffeeItem.classList.add("d-flex", "flex-row", "col-12", "coffee-item" );
		coffeeItem.innerHTML = `
   		<p class="col-6">${cName.value}</p>
		<p class="col-6">${cRoast.value}</p>
		<p class="col-3">${cPriceDol}</p>
    		`;
		let cObject = {id: coffees.length+1, name: cName.value, roast: cRoast.value, price: cPriceDol};
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

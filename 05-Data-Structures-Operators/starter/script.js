'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (startIndex, mainIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your declicious pasta with ${ing1},${ing2},${ing3}`);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/* ---------- DESTRUCTURING THE ARRAY ----------------------------- */

/*

const arr = ['sonu', 'rinkal', 'pavit', 'riddhima'];
const [first, second, third] = arr;
console.log(first, second, third);

*/
// line 31 to 34 stands for destructuring the array

/* --------------------------------------------------------------- 
// how to take only 1st few element from your array shown below

const [fir, sec] = arr;
console.log(fir, sec);

// take 1st two ele of resturant object of categories array

const [f_st, s_nd] = restaurant.categories;
console.log(f_st, s_nd);

*/

/*  -------------- take only specific element of the array --------- 

const [element1, , , element4] = restaurant.categories;
console.log(element1, element4);

*/

/* ---------- how to swich the containts of destructing arr ----------- */

/*
let [primary, secondary] = restaurant.categories;
console.log(primary, secondary);

[primary, secondary] = [secondary, primary];
console.log(primary, secondary);


// to switch simply right the above stat without let or const keyword bcz here we are simply swaping the values of each other

*/
/*  // function returning the array and then we can immediately distruct the arr in differnt variables this allows us or gives us the flexiblity to return multiple values from the function 

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

*/

/* --------------- nested distructuring ------------------------ */

/*
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j);
const [p, , [q, r]] = nested;
console.log(p, q, r);

*/

/* ------------------- OBJECT DESTRUCTURING ------------------------- */
// use { } notation , use same property name , if other propertyName then  use {oldName : newName }

/*
const { name: restaurantName, categories, openingHours } = restaurant;
console.log(restaurantName, categories, openingHours);

const { name: rstName, openingHours: hours, categories: tag } = restaurant;
console.log(rstName, hours, tag);

*/
// mutating variables
/*
let a = 111;
let b = 999;
const obj = {
  a: 23,
  b: 7,
  c: 14,
};
({ a, b } = obj);
console.log(a, b);
*/

/* -------------------- NESTEDD OBJECT -------------------------------- */
/*

const {
  fri: { open: o, close: c },
} = restaurant.openingHours;
console.log(o, c);
 */

/* here opening hour is already distructured property(its a object) from restruant
obj see line 108 and 109 so we destructurd 1st and now we are using it so thats why 1st uncomment the 95 96 lines 

here o and c are name given to open and close 
restaurant.openingHours or openingHours

only openingHours will work fine here bcz we have already destructured it.

*/

/* ----------- spread operator -------------------------- */

//cretes the new array based on existing array and it helps us to get individual array element even if we expands it further.

/*
const arr1 = [7, 8, 9];
const newArr = [1, 2, ...arr1];
console.log(newArr);
console.log(...newArr);

// making new menu which conatins the old menu plus some new items more

const newMenu = [...restaurant.mainMenu, 'pav-bhaji'];
console.log(newMenu);

*/

/* -------------- CREATE SHALLOW COPY OF ARR -------------------------- */

/*

const shalloCopy = [...restaurant.mainMenu];
console.log(shalloCopy);

*/

/* ---------------- TO MERGE ARRAY------------------------------------- */
//MERGING THE ARRAY  START_MENU AND MAIN_MENU FROM RESTRAUNT OBJECT

/*
const mergedMenuArray = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(mergedMenuArray);

*/

/* ----------------- REAL EXAMPLE ------------------------ */
// we wrote the orderPasta function above now we will ask for those ingridients from user in the from of array and then we will pass that arr to function which will separate the array element in comma sep list which  will eventiually look in funct as ing1,ing2,ing3

/*

const takeIng = [
  prompt("Enter three ingrediont's .. ING1 ??"),
  prompt('ENG2 ??'),
  prompt('ENG3 ??'),
];

restaurant.orderPasta(...takeIng);

*/

/* -------- CREATE OBJECT SHALLOW COPY USING (...) OPERATOR ----------- */

/*
const newRestaurant = { foundedIn: 2001, ...restaurant, restName: 'indian' };
console.log(newRestaurant);

// console.log(...newRestaurant); this is not alloed we can not iterate it.

*/

/* ------------------------- THE REST OPERATOR -------------------------------*/
// same as spread operator but opposite in usage it colloect the individual element and put them in array ... The rest op shold be there in left side of expression and this should be the last in the array.

/*
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

*/

/* ------------------------REST IN OBJECT ---------------------------------- */

/*
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//in this example the sat obj will be stored in sat and the rest will be stored in weekdays using the rest

*/

/* ----------------------- REST IN FUNC PARA ----------------------------- */

/*
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    console.log(sum);
  }
};

add(2, 7);
add(5, 1, 6, 8);

const x = [23, 5, 7];
add(...x);

// in line 244 we can simply pass the arr as it is but this is better


*/

/* -------------------- FOR OF LOOP IN JS ------------------------------ */

/*
const arr = ['pune', 'mumbai', 'jalna', 'aurangabad', 'gujrat', 'jaipur'];

for (const item of arr) {
  console.log(item);
}

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}:${el}`);
}

*/

/* ----------------------------------------------------------------------------*/

/* ----------------------- WORKING WITH STRINGS ------------------------------- */
/*
const str = 'Tap Air India';

console.log(str[1]);
console.log(str.length);

console.log(str.indexOf('A'));
console.log(str.lastIndexOf('a'));
console.log(str.indexOf('India'));

console.log(str.slice(4));
console.log(str.slice(4, 7));

//281 output will be start index to last index -1

console.log(str.slice(0, str.indexOf(' ')));
console.log(str.slice(str.lastIndexOf(' ') + 1));

// +1 to remove the space

//the parameter u passed in indexof and lastIndexOf remember all this method are case sensitive (param case sensitive)

const str = 'heloo sonu';

console.log(str.toUpperCase());
console.log(str.toLowerCase());

const modifiedStr = str.replace('o', 'l');
console.log(modifiedStr.replace('sonu', 'rinkal'));

const newStr = 'hello sonu sonu !!';
console.log(newStr.replaceAll('sonu', 'rinkal'));
*/
/* ------------------ BOOLEAN STRING METHODS IN JS -------------------------- */
// this methods are also case sensitive
/*
const str = 'Airbus A320neo';

console.log(str.includes('Air'));
console.log(str.startsWith('Airb'));
console.log(str.endsWith('o'));
console.log(str.endsWith('O'));

/* -------------------------- PRACTICE QUESTION ------------------------------ */

const checkBaggage = function (items) {
  const chkBags = items.toLowerCase();
  if (
    chkBags.includes('guns') ||
    chkBags.includes('knife') ||
    chkBags.includes('bomb')
  ) {
    console.log('passanger not allowed');
  } else {
    console.log('you are welcome');
  }
};

checkBaggage('I Have some GUMS , Knife , Bomb with me this is for protection');

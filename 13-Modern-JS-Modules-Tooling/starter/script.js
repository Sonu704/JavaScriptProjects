//notice here we are using import {the variable or function we want to import its name} from 'location'
import { addToCart , totalPrice as price, totalQuantity } from  './shoppingCart.js'

console.log('Importing Modules');
console.log('hello');

//now we can use that method here
addToCart('bread',5)

//use totalPrice and totalQunatity
console.log(`${totalQuantity}, ${price}`);

//all the importing stmts are hoisted to the top thats why they are comes 1st on the output
//we didnt use the strict mode here bcz all the module are executed in strict mode


// how to import everything at the same time
import * as ShoppingCart from './shoppingCart.js'
ShoppingCart.addToCart('bread',5)
console.log(ShoppingCart.totalPrice);

// so here Shopping cart is basically a namespace in which full code reside and u can simply acces it using . notation


//importing default module data (unnamed ) here we can give any name to module bcz that name will be used as default name (here we are using default name as add this will import that default function)

import add from './shoppingCart.js'
add('bread',5)


// here we are mixing named and unnamed module which is not a good practice but this is just to show the example thatimports are not copies of exports they are basically the live connection this means they point same place in memory and any change will be reflected
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);

console.log('Exporting Modules');

const shoppingCost = 10;
const cart = [];

//notice we have used here export bcz this function will be imported in script.js file
export const addToCart = function(product,quantity){
    cart.push(product,quantity)
    console.log(`${product} with ${quantity} has been added`);
}

// we can export multiple method or variable like this
const totalPrice =100;
const totalQuantity = 120;

//u can use below stmt to export
// we can also give alias for the name but then u have to use that new name there like this will work
// export {totalPrice, totalQuantity as tq} 
// then u have to use tq in there import stmt
export {totalPrice,totalQuantity}


//export always should be there in top level code .. so basically u can not put the above addToCart into any function or any block like if block
//the normal js script make all the variable global available (publicly)

// all the variables that are declared inside this module are scoped only to this module .. so for all other module this variables are private to make them available to other variable we have to use keyword export




// the export is default export which is used to export only one value or 1 function and while importing we can give any name
// the prefferrd style is to use only use 1 default export per module 

export default function(product,quantity){
    cart.push(product,quantity)
    console.log(`${product} with ${quantity} has been added`);
}

//notice how here we are not using any name for the function we are simply using export followed by default followed by the function


// we always put named export in {} and default export without {}
// imports are not copies of exports they are basically the live connection this means they point same place in memory and any change will be reflected
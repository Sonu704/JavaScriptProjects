'use strict';
/*
// Default Parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);
*/
/* ----------------------------------------------------------------------------*/
//passing args value vs reference
/*
const flight = 'boing777';

const person = {
  firstName: 'sonu',
  passNo: '1234567',
};

const checkIn = function (flightName, passenger) {
  flightName = 'boing888';
  passenger.firstName = 'Ms' + ' ' + passenger.firstName;
  if (passenger.passNo == '1234567') {
    alert('Checked In');
  } else {
    alert('wrong passport');
  }
};

checkIn(flight, person);
console.log(flight);
console.log(person);

// 1 > passing the paramerter as by value and by reference (basically object)
// 2> we are trying to modify it but by value thing doesn't chages bcz the value at specific address can not be changed
// 3 > in case of pass by reference it changes bcz the this is just reference to object
// bcz at the address the value is stored is reference so we are not changing the reference we are changeing object's value pointed by the reference

//part 2 of above code

const newPassport = function (passenger1) {
  passenger1.passNo = Math.trunc(Math.random() * 100000);
};

newPassport(person);
checkIn(flight, person);

// here when u run the code you will get message wrong passport and this is bcz here
// we are calling newpassport func with the object person changing its passNo and that object then we are passing in checkIn func so all the changes of passNo now will reflect to original object and both the passNo gets changed so the condition on line 44  becomes false so print message wrong passport 

*/

/* ------------------- HIGHER ORDER FUNCTION -------------------------- */

/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
//note --> a func which accept other func as an argument or return other func as an argument or does both the task

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

//here a transformer is higher order funct and on line 100 and 101 it is call back func 

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

// callback function is used to organize code , and to achive the absraction
//higher oredr func is used to achive higher lavel of absstraction.. like tranformer and addEventlistener function


*/
/*------------------- FUNC RETURNING ANOTHER FUNC ------------------------ */

/*
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Jonas');

*/

/* ------------------ CALL AND APPLY METHOD ------------------------------*/
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

//this thing is same as above apply method
book.call(swiss, ...flightData);

*/

/* in this code above we are basically implementing the call and apply method 
but what is the need of this? ..

suppose we want to implement the functionality which is already implimented but in a limited scope and we can not access it outside ..
in this case the functionality is a function which is inside one object and we also want to call that function using another object so we use call or apply method
1 ) in call method the first parameter is a  object Name which we wannt to refer to it acts as a this keyword and the rest of the parameter  is noral the parameter to thr function .. line 164 , 170,171
2) apply work same as call method the only difference is except 1st parameter for all other parameter it takes a single array see on line 186 .. apply--> no one use it more


in the code 
at line 147 --> inhanced object literal way of declaring function.
this line on 164 -->const book = lufthansa.book 
lufthansa is a higher order func .. and book is call back and using this WHS it returns the value and store it in book and we know that function are also object in js and we can call any method on function ..(book.call(swiss, 583, 'Mary Cooper')


const book = lufthansa.book;
book is just a copy of this function its not a method just aregular function
*/

/*---------------------------------- BIND METHOD ---------------------------- */
/* call, bind and apply method allows us to manually set the this keyword.   
the bind method return the new function attached with this keyword so then we can use that new function as just aregular function call.

for eg -- > */

/*
const bookEW = book.bind(eurowings);
bookEW(23, 'sonu chaudhary');

//bind method can also be used to bind to specific object for eg
const bookEW23 = book.bind(eurowings, 23);
bookEW('sonu chaudhary');
//binding and already predifined the value for a fligh no

//----------------- BIND WITH EVENT LISTENER------------- 
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// whenerver we call this key with eventlisteners it always point the selected element in this it is the buy button .. but we want this to point to the lufthansa object so for that we use (lufthansa.buyPlanes.bind(lufthansa) on line 233 


// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));


// same using function returning another function
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

*/

/* -------- CLOSURES ----------------- */
//A CLOSURE ALWAYS MAKES SURE THAT THE FUNCTION DOESN'T LOOSE THE CONNECTION TO THE VARIABLES WHICH WERE PRESENT AT THE BIRTH PLACE..

// one example of closure is available in notes..

/*
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 77;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

//re-assigning f function
h();
f();
console.dir(f);

//here we have to notice that we are just reassigning the inner function not returning stil it is gonna create the closure

// in our case a function f  born in g first and then it reborn in h so first it remember the a variable and then it remembers the b variable

//---------- example 2 of closure
const boardPassanger = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`we are now boarding all ${n} passengers`);
    console.log(`there are 3 groups , each with ${perGroup} passenger`);
  }, wait * 1000);
  console.log(`will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassanger(180, 3);

// in this code 1st the variable will be creted and then the setTime function will start execution independenty and then immidiatle after next cl statement boardPassanger funct finish execution and then  after 3 second setTimeout func finish execution so meanwhile it can access the parameter n , wait its an example of closure

// closues has a priority over the scope chain suppose i created a var in global scope (line 309) and commented the var perGroup from line 300 .. then only the closure doesn't exist and it will look in global scope and used the var perGrop of line 309 ..if we uncomment that line then the function SetTime is closed under the closure so even if the perGrop exist at line 309 it will still use the perGrop of line 300 bcz of closure

*/

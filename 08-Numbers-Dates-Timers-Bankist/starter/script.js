'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-08-17T17:01:17.194Z',
    '2021-08-18T23:36:17.929Z',
    '2021-12-28T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formattedDate = function (date) {
  const dateCalculation = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayPassed = dateCalculation(new Date(), date);
  // console.log(dayPassed);

  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'Yesterday';
  if (dayPassed <= 7) return `${dayPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};

const displayMovements = function (accounts, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? accounts.movements.slice().sort((a, b) => a - b)
    : accounts.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(accounts.movementsDates[i]);
    const displayDate = formattedDate(date);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${Math.abs(mov.toFixed(2))}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

//note the main aim of timer in our application is that once the user logged in the timer should start and then after the timer finishes its time the user should get logged out .. but when the user requests the loan or trasfer the money the timer should reset again thats why we have implemented the reset timer functionality .. and suppose i'am login in js account and from that account if i login to jd account then two timer runs parally so to fix this bug we have taken the global variable timer and we used this timer to store the return value from startLogOutTimer() and in btn login function function we have simply checked that if the timer exist then clear the timer and start the timing again

const startLogOutTimer = function () {
  // start time after 100 seconds

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    //in each call print the remaing time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //decrease the timer

    //when 0 decrease the timer and log out the user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };
  let time = 20;
  //call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
//here we put timer variable out bcz we need to persist it in different pages
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //create current date and time
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const minute = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year},${hour}:${minute}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //reset the timer .. 1st clear the timer and then override the timer so to store startLogOutTimer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); //no need to convert it no num bcz math.floor does it

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
    //reset the timer .. 1st clear the timer and then override the timer so to store startLogOutTimer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // when btn is close is pressed the timer should stop and message should come back again
    clearInterval(timer);
    labelWelcome.textContent = 'Log in to get started';

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* ----------------------- NUMBERS CONVERSION AND INFO ABOUT BASE  SYSTEM ------------------------ */
/*
// in js every number is converted to floating point number

console.log(23 === 23.0);

//the below results are unpected bcz js used base 10 and base 2 number system which somtimes gives unexpected result so we may get unexpected result
console.log(0.1 + 0.2); //unexpected answer
console.log(0.1 + 0.2 === 0.3); // false

//Number conversion
console.log(Number('23')); // using number function
console.log(+'23'); // using type cohersion

//Parsing
console.log(Number.parseInt('5px', 10));
console.log(Number.parseFloat('10', 10));
//above the 1st parameter is the number  and 2nd is redex(base Number) ..the first para may contain the str js will simply ignore it but it has to be after the number more eg below

console.log(Number.parseFloat('2.7rem'));
console.log(Number.parseFloat('2'));

// Check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

// Checking if value is number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

*/

/* --------------------------- MATH FUNCTIONS ---------------------------- */

/*

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); //another way to find square root
console.log(25 ** (1 / 3)); //to find cube root

console.log(Math.max(7, 9, 0, 12, 7));
console.log(Math.min(7, 9, 0, 12, 7));
console.log(Math.max(7, 9, 0, '12', 7)); //allowed type cohersion
console.log(Math.max(7, 9, 0, '12px', 7)); //allowed type cohersion

// To get the random number
console.log(Math.trunc(Math.random() * 8) + 1);
// in this Math.random() will give rand num between 0 to 1(excluding 1) .. we multiply to get number above 1 added +1 to inclued range and used Math.trunc to get only integer number

//Returns a supplied numeric expression rounded to the nearest integer.
console.log(Math.round(23.3));
console.log(Math.round(23.9));

//Returns the smallest integer greater than or equal to its numeric argument.
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

//Returns the greatest integer less than or equal to its numeric argument.
console.log(Math.floor(23.3)); //output -- 23
console.log(Math.floor('23.3')); //output -- 23

//Returns the integral part of the a numeric expression, x, removing any fractional digits. If x is already an integer, the result is x.
console.log(Math.trunc(23.3));

// floor and trunk works in same way but the floor works for both positive and negative number
console.log(Math.floor(-23.5));
console.log(Math.floor(23.5));

//Decimal numbers

//Returns a string representing a number in fixed-point notation.
console.log(+(2.7).toFixed(0)); // 0 specify till 0 decimal
console.log(+(2.7).toFixed(3)); //fixed till 3rd position
//+ is used to convert it to number it is type cohersion remember..

*/

/* ---------------------  Practice code to check if the number is even or not ----------------------- */
/*

const isEven = num => num % 2 === 0;
console.log(isEven(5));
console.log(isEven(4));

console.log(5 % 2); // 1
console.log(5 / 2); // 2.5 .. // 5 =2*2 + 1
*/

/* --------------------------- BIGINT() --------------------------------------- */

///////////////////////////////////////
// Working with BigInt
/*
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

// Operations
console.log(10000n + 10000n);
console.log(36286372637263726376237263726372632n * 10000000n);
// console.log(Math.sqrt(16n));

//u cannot perform operation with bigInt and regular num so convert it to the bigInt here it is converted
const huge = 20289830237283728378237n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15); // works fine return true
console.log(20n === 20); // will not work bcz it doesn't perform type cohersion
console.log(typeof 20n); // bigInt
console.log(20n == '20'); // will work fine .. performs type cohersion

console.log(huge + ' is REALLY big!!!'); // work fine

// Divisions
console.log(11n / 3n); // will return number without decimal point..
console.log(10 / 3);

*/

/* ----------------------- CREATING DATES IN JS.-------------------------------------- */
//using Date constructor.

/*
//1st way
const now = new Date();
console.log(now);

//2nd way ->you can also pass the string to the date constructor
console.log(new Date('20 Aug 2018'));

//3rd way -> passing year , month , day , time ... etc
console.log(new Date(2021, 4, 26, 1, 15, 4)); // the month will give jun bcz month is 0 based in js so to get may use 4

console.log(new Date(2050, 10, 33)); //this will autocorrect to next monts starting dates

//4th way -> to get time in unix timestamp
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //from day to milisecond conversion

*/

// --------- USEFUL METHODS ON DATE OBJECT --------------------

// as date is a object it has many useful methods to work with

/*

const future = new Date(2021, 4, 26, 1, 15);
console.log(future);
console.log(future.getFullYear()); // always use getFullYear .. not getYear
console.log(future.getMonth());
console.log(future.getDay()); // starts from sunday wich is 0 so it will give num according to that
console.log(future.getDate());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

//Gets the time value in milliseconds.
console.log(future.getTime());

//setter on Date
//here i'am setting it on future date object only
future.setFullYear(2050);
console.log(future);

//Note --> there are also setter methods available just as getters like setMonth .. etc

*/

/* ------------------------------- OPERATION'S ON DATE --------------------------------------- */
// we can perform operation on date for that we first have to convert the date into number which will store the date in milisecond(timestamp) and then convert the date back to the normal format

/*

const dateCalculation = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

console.log(
  dateCalculation(new Date(2021, 4, 26, 1, 15), new Date(2021, 4, 28, 1, 15))
);

*/

/* ------------------------------- setTimeOut() --------------------------------- */
//setTimeOut is used to set the time in future it takes the time in milisecond in 2nd parameter and the first parameter is a callback function.. we can also pass the parameters after the time para, and this parameter is used to access the paramter in callback function..

/*

setTimeout(
  (ing1, ing2) => console.log(`here is your pizza with ${ing1}, ${ing2}`),
  5000,
  'cheez',
  'capsicum'
);
console.log('waiting...');

*/

//here in this code the cheez and pizza will be passed to the callback function as ing1 and ing2
//the waiting will execute automatically as normal even the setTimeOut function keep running in background

//we can also stop the timer using clearTimeOut method .. so we can do this in following way

/*

const ingredients = ['cheez', 'olive'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`here is your pizza with ${ing1}, ${ing2}`),
  5000,
  [...ingredients]
);

if (ingredients.includes('olive')) clearTimeout(pizzaTimer);

//clearTimeOut function is used to stop the setTimeOut function
//here basically if (if stmt returns true then this will not print the stmt--> here is your pizza with ${ing1}, ${ing2}) so here it will not print

*/

/* ----------------------------------- SetInterval() ------------------------------------- */
//setInterval is used to keep running the timer in the specified amount of time.. so basically the callback function is executes every time interval

/*
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);

// this will run after every 1 second

*/

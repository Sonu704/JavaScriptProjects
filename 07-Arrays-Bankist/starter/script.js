'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovments = function (movmentsArray, sort = false) {
  containerMovements.innerHTML = ' '; //to hide alredy  hardcoded inserted elements

  //here slice is use to shallow copy array bcz we dont want to modify the original array
  const movs = sort
    ? movmentsArray.slice().sort((a, b) => a - b)
    : movmentsArray;

  movs.forEach(function (mov, indx) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      indx + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accu, mov) => (accu += mov), 0);
  console.log(acc.balance);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummery = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${income}€`;

  const incomeOut = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(incomeOut)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposite => (deposite * account.interestRate) / 100)
    .filter((depoGreterThanOne, i, arr) => {
      // we use return explicitly whenever more then 1 stmt is there in arrow
      // console.log(arr);   //this is just to see the contents
      return depoGreterThanOne > 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

// const user = 'Steven Thomas Williams';

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(user => user[0])
      .join('');
  });
};
createUserName(accounts);

const updateUI = function (acc) {
  //display movments
  displayMovments(acc.movements);

  //display balance
  calcDisplayBalance(acc);

  //display summuary
  calcDisplaySummery(acc);
};

// Event Listeners--

let currentAccount; //we can use let to declare a variable ..not const bcz cannot declare empty

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('login');
  }

  //display ui and message
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  containerApp.style.opacity = 100; //when use opacity = 100 it will display whole page which was hidden
  //make input field empty
  inputLoginUsername.value = inputLoginPin.value = '';

  //make the cursor disaper (after the login done)
  inputLoginPin.blur();

  //update ui
  updateUI(currentAccount);
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //update ui
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov * 0.1)) {
    // add amount to curreent accounts transaction
    currentAccount.movements.push(amount);

    //update ui
    updateUI(currentAccount);
  } // 10% interset it checks here

  inputLoanAmount = '';
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      function (accounts) {
        return accounts;
      }
      // acc => acc.userName === currentAccount.userName
      //here both ways are coreect.bcz anyways we have checked the the condition above (if stmt)
    );
    console.log(index);

    // accounts.splice(index)
  }
});

let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovments(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/* ***************************************************************************** */

/* ----------------------------  IMP NOTE --------------------------- */
//which array method is to  be use ..when its  short description (with screen shorts ) is included in this file.
//photo is added

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* ----------------  ARRAY METHOD ---------------------------- */
// slice to get some part of array this is immutable
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

//splice is same as slice but it is mutable (changes the original array)

let arr1 = [1, 2, 3, 4, 5];
console.log(arr1.splice(3));
console.log(arr1.splice(1, 2));

console.log(arr1);

//Reverse method --> reverse the array and also it is mutable
let arr2 = ['e', 'd', 'c', 'b', 'a'];
console.log(arr2.reverse());
console.log(arr2);

//concat()  --> concat two strings
console.log(arr.concat(arr2));

// join () --> join by specified id
console.log(arr.join('-'));

*/

/* -------------------- AT METHOD IN JS ----------------*/
// at method is used to get element from specified position .. same as arr[position] it is just little handy

/*
let array = [98, 56, 91];
console.log(array.at(0));
console.log(array.at(-1));

//this method also works fine with strings

const str = 'Hello world';
console.log(str.at(3));
console.log(str[4]); // same as above

*/
/* -------- FOREACH METHOD AND COMPARISION WITH FOR OF METHOD ------- */
/*
const array = [500, -200, 100, 900, -29, -80];

console.log('---- FOREACH -----');
array.forEach(function (element, index, array) {
  if (element > 0) {
    console.log(`${index + 1} : you deposited  : ${element}`);
  } else {
    console.log(`${index + 1} : you withdrew  : ${Math.abs(element)}`);
  }
});

//this is the way we use foreach which takes 1 , 2 or 3 parameter the order of parameter matters

//using for of loop
console.log('---- FOR OF ---');
for (let [index, value] of array.entries()) {
  if (value > 0) {
    console.log(`${index + 1} : you deposited  : ${value}`);
  } else {
    console.log(`${index + 1} : you withdrew  : ${Math.abs(value)}`);
  }
}
//notice how we use the for loop on line 133 bcz it returns the key value pair in which key stands for the index .
//the difference is written in the notebook

*/

/* --------------------- FOR EACH ON MAP --------------------- */
/*
console.log('---------- MAP ------------');
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (element, key, map) {
  console.log(`${key} : ${element}`);
});

/* ------------------------ FOR EACH ON SETS ---------------------- */

/*
console.log('---------- SET ------------');
const setExample = new Set(['sonu', 'rinkal', 'deepika', 'sonu']);
currencies.forEach(function (element, _, set) {
  console.log(`${element} : ${element}`);
});

//set doen't conatain any duplicate value and it doesn't have indexes bcz the set doesn't conatain index and if we are using the call back function all the parameters has to be specified so we use this _ at the place of index
*/

/* ------------------ MAP , REDUCE, FILTER function in practice --------------------------- */

// note - Map function map each element of array and perform specified action on each element and return the new array ... it means the map function is immutable

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//eg 1 -
const eurToUSD = 1.1;

const mapPractice = movements.map(function (mov) {
  return mov * eurToUSD;
});
console.log(mapPractice);

//eg 2 -
//same thing using for of loop

const eToUSD = [];
for (const value of movements) eToUSD.push(value * eurToUSD);
console.log(eToUSD);

// so u can see the difference between between the both way.. in map function it alredy knows that it works on array so we dont need to manually creates an array for that in for of loop we creates the array manually .. both the ways are fine .

//eg - 3
//same thing using arrow function

const mapArrowPractice = movements.map(mov => mov * eurToUSD);
console.log(mapArrowPractice);

//eg 4 -

const movmentsDescription = movements.map(
  (mov, i) =>
    `Movment ${i + 1} : you ${mov > 0 ? 'deposite' : 'withdrew'}  : ${Math.abs(
      mov
    )}`
);

console.log(movmentsDescription);

// difference between the for Each and Map
//1. in foreach every time loop runs it perform certain action and if cl stmt is there it will print every time ..
//2. in case of map reduce it perfors the action and print it in the end in the whole array


*/

/* -------------------- FILTER Function ------------------------- */

/*

// filter function takes the callback function and it basically filter out the elemets into the new array.

//eg1.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposit = movements.filter(function (arrayElement, index, array) {
  return arrayElement > 0;
});

console.log(deposit);

//we passed the 3 para in filter just to understand that it takes 3 parameter

//eg2
//using FOR OF loop

const depositeFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositeFor.push(mov);
  }
}
console.log(depositeFor);

//eg3
//filter for withdrawl

const withdrawl1 = movements.filter(function (mov) {
  return mov < 0;
});

console.log(withdrawl1);

const withdrawal2 = movements.filter(mov => mov < 0);
console.log(withdrawal2);
//note remember --> the arraw method => after this whatever the statement is it acts as return.

*/

/* ------------------------- REDUCE METHOD ---------------------------------- */

/*

// reduce method reduce the array by performing action on it to the single value

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce(function (
  accumulator,
  currentElem,
  index,
  array
) {
  return (accumulator += currentElem);
},
0);

console.log(balance);

//using arrow function

const balanceTotal = movements.reduce((acc, cur, i, arr) => (acc += cur), 100);
console.log(balanceTotal);

//in both the above case 0 in parameter list acts as a initial value ..u can also take any other value

// Q1. to find out the maximum elem of the movments array using the reduce method

const currentMax = movements[0];

const maxElem = movements.reduce(function (accumulator, mov) {
  console.log(`${accumulator} : ${mov}`);
  if (accumulator > mov) {
    return accumulator;
  } else {
    return mov;
  }
}, currentMax);

console.log(`Max element in movment array is : ${maxElem}`);

// 1 thing to keep in mind that accumulator is always acts as a storage here we can see that if the value is greter(whatever value if block or else block) than it will store in accumulator and then that value will acts as accumulator to compare with current mov

//so here we dont need to specify the sum=0 and then update the sum every time ..
//but we have do decide here what acts as accumulator in each reduce sum for eg if accumulator acts as sum or multiply or max , min , divide so on so forth..

*/

/* -------------------------------- FIND METHOD ---------------------------------------- */

// find method is used to find the element based on specified conition , and it returns the first occurance of matched element.it also takes the callback function as other function takes like map,reduce,filter . it does not mutate the bcz it just returns the single value

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const result = movements.find(mov => mov < 0);
console.log(result);

*/

/*------------------- MAP , REDUCE AND FILTER METHOD CHANING ------------------------- */

//MAP , REDUCE, FILTER  method chaining is also call as pipeline and in this we can also expand the array at anytime using it's third parameter so we can see if anything wrong in prog(its basically used for testing purpose)

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSD = 1.1;

const totalDepositesUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUSD)  commented out this line to see the effect of map method which does same
  .map((mov, i, arr) => {
    //this code is for testing
    console.log(arr);
    return mov * eurToUSD;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositesUSD);

*/

/* ----------------------------- SOME METHOD ----------------------------------- */

//1. it returns true if any value of array satisfy the condition given in callback function..
// similar to includes but with includes we can only check if the value exists or not
//NOTE --> it takes the callback function

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const result1 = movements.some(mov => mov === 200);
console.log(result1);

const result2 = movements.some(mov => mov !== 200);
console.log(result2);

const result3 = movements.some(mov => mov <= -800);
console.log(result3);

*/

/* ------------------------------ EVERY METHOD ------------------------------------ */
// EVERY method return true if all the elements of the array satisfy the codition given in the callback.

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const result = movements.every(mov => mov > 0);
console.log(result);

// we can also do it once using arrow function and call it in other function

const deposite = mov => mov > 0;
console.log(movements.every(deposite)); //return false
console.log(movements.some(deposite)); // return true
console.log(movements.filter(deposite)); // return array

*/

/* ----------------------- FLAT METHOD ----------------------------- */
//it flats the nested array into a single array ..if there are more nesting then we can specify the levels also

/*
const nestedAraay = [6, 8, [1, 3], 8, 9, [89.78]];
console.log(nestedAraay.flat());

const deepArray = [6, 8, [1, [2, 8], 3], 8, 9, [89, 78]];
console.log(deepArray.flat(2));

//eg to take movment array out of each object and flat into single array and then calculate sum

const overallBalance = accounts
  .map(account => account.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

*/

/* ------------------ FLAT MAP method -------------------------------- */

// this method combines the flat and map method
// flat Map method does not take any level ..
//in flat map we simply put the position which we are supposed to put in flat method

/*

const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

*/

/* ------------------------------- ARRAY SORT METHOD ---------------------------------- */
//sort method is used to sort the string in alphabatical order .. if we pass the number here then it will convert it in string and then compare it so easy way of comaparing number also is given below
// sort method return positive value if it is greter and negative if it is less

/*
const names = ['sonu', 'meena', 'rahul', 'ansel', 'hritik'];
console.log(names.sort());

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(names.sort()); //unexpected result bcz it converts it in string

//ascending
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});

console.log(movements);

//simplified way for ascending
movements.sort((a, b) => a - b); //a-b will return positive which will sort it in ascending
console.log(movements);

//descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

console.log(movements);
*/

/* ---------------------- CREATING ARRAY USING DIFFERENT WAYS ---------------------- */

/*

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//using FILL method
// fill method is used to fill the array with 1 parameter is the number , 2nd parameter is the starting index , 3rd parameter is ending index. it modifies the original array

//this is empty array + fill method
//fill method last parameter is excluded
const x = new Array(7);
x.fill(1, 0, 7);
console.log(x);

//if ur filling the already existing array without using start and end index then it will fill the whole array with the given number
console.log(arr.fill(23, 6));
console.log(arr.fill(23));

// Array.from method
const y = Array.from({ length: 7 }, () => 1); //it fills each element with 1
console.log(y);

const z = Array.from({ length: 7 }, (_, index) => index + 1);
console.log(z);

//in z array the underscore is used which is called throw away variable. we basically use this when we dont want to perform any opeartion on that(it is just used for looping array as this is current element) variable but defining it in callback function is necessary.

*/

/* --------------- USE CASE OF ARRAY.FROM ---------------------------------- */

/*

//we use Array.from() to basically convert any iterable to array so that we can perform all array operation on that ..

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
    //this 2nd para takes  map funct bcz the 1st line alredy coverting it into array
    //explicit map name  will not work there (bcz this is how its syntax is)
  );
  console.log(movementsUI);

  //we can perform above thing using spread ope but we can not chain method in that case..
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});

*/

// in the above method just for testing purpose we are performing opeartion on lable
// here we use Array.from to get all the elements using .querySelector method and this methods gives the the node list but this node list is not actually the array its just array like structure so here using Array.from we are converting this into array and the second parameter in this is map function and we are able to use this method bcz we have converted this into array

/* ------------------- CODING CHALLANGE 1 ------------------------ */
/*
const juliaData = [3, 5, 2, 12, 7];
const kateData = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const cats = dogsJulia.splice(-2);
  const dogsData = dogsJulia.concat(dogsKate);
  dogsData.forEach(function (element, index) {
    if (element >= 3) {
      console.log(
        `Dog number ${ixndex + 1} is an adult 🐕, and is ${element} years old`
      );
    } else {
      console.log(`Dog number ${index + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs(juliaData, kateData);
*/

/* ------------------------ CODING CHALLANGE 2 ------------------------------- */

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function (dogsJulia) {
  // const allDogs = dogsJulia.concat(dogsKate);
  // console.log(allDogs);
  let resultantAge = 0;
  resultantAge = dogsJulia.map(function (dogsAge) {
    if (dogsAge <= 2) {
      return 2 * dogsAge;
    } else {
      return 16 + dogsAge * 4;
    }
  });
  const dropUnMatchAges = resultantAge.filter(mov => mov >= 18);
  console.log(dropUnMatchAges);
  const average =
    dropUnMatchAges.reduce((acc, mov) => acc + mov, 0) / dropUnMatchAges.length;
  console.log(`The average human age of all adult dogs is : ${average}`);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/

/*---------------------- CODING CHALLANGE 3 BASED ON 2ND CHALLANGE --------------------------- */

/*
const calcHumanAvgAge = function (array) {
  const age = array
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curEle, i, arr) => (acc + curEle) / arr.length, 0);

  return age;
};

console.log(calcHumanAvgAge([5, 2, 4, 1, 15, 8, 3]));

*/

'use strict';

// printInfo();

// function printInfo() {
//   console.log('hiee sonu');
// }

/* this printInfo function can be called before we defind in js because functions are
hoisted in js (stored in execution enviornment before the execution start so that it can be used before also bcz it simply tekes it from exc envir)*/

var firstName = 'sonu';
// this will give hey sonu if you run the prog this is bcz the the var keyword creates the this keyword on the window object so bcz of this the window object gets the property as window.firstName = "sonu" and when the this keyword from arrow function looks in it's parent scope it found that property in windows object

const myObject = {
  firstName: 'sonu',
  year: 2001,
  calcAge: function () {
    console.log(this);
    console.log(2021 - this.year);

    //  solution 1
    const self = this;
    const regularFunc = function () {
      console.log(self.year >= 1999 && self.year <= 2001);
      // console.log(this.year >= 1999 && this.year <= 2001);
    };
    regularFunc();

    // sol 2
    const ArrFunc = () => {
      console.log(this.year >= 1999 && this.year <= 2001);
    };

    ArrFunc();
  },
  greet: () => {
    console.log(this);
    console.log(`hey ${this.firstName}`);
  },
};

myObject.greet();
myObject.calcAge();

/* when you run this program the object will call the greet method and this will give the output as {hey undefind} this is becz we know that the Arrow function dont get their own this keyword so its bascilly get its from parent scope now the object doesn't have block scope it falls under global scope and it so this points to the window object and in that object their is no property as firstName so that's why it gives undefined   

part 2 -> here  on line 24 we have difined the regular function inside the method 
calcAge but this keyword doesn't work in regular function thats why it gives us an error right here . defining reular function inside the method is same as define the 
reg func outside and of course outside object this keyword will not work.
we can avoid this by declaring self key and set it to this .. in this way it will access the this keyword throgh the scope chain .

another solution is using the arrow funct bcz arrow func doesn't have its own this 
keyword it will look in parent scope here its the parent scope is myObject bcz the
function was nested that's why 
*/

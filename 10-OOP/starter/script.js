'use strict';

/*---------------- Constructor funcion --------------------- */

/* 

const Person = function(fname,birthYear){
    console.log(this);     // will print empty object
    this.fname = fname;
    this.birthYear = birthYear;

    //You could also have method inside this but this is totally bad practice
    this.calcAge = function(){
        console.log(2021-this.birthYear);
    };
};

const P1 = new Person('sonu',2001);
console.log(P1);

console.log(new Person('rinkal',1999));

const name = 'jay';

console.log(P1 instanceof Person); //will return true;
console.log(name instanceof Person); // will return false

// constructor functions are only created with the function expression and regular function (arrow function are not allowed bcz they dont have their own this keyword)

//when the constructor function is created 4 things happens behind the scene
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}


// IMP -- how to use or add static method on constrcutor function
//so here instead of Person.prototype.heyFunc we simply use Person.heyFunc

Person.heyFunc = function(){
    console.log(`hey there !! 😊`);
}

//calling static method
Person.heyFunc();

*/

/* --------------------------- PROTYPES IN JS -------------------------- */
/* 1. Every Object in js has prototype..

   2. We know that eventually the function is an object and every object has a prototype ..so function has also the protype (bcz it's an object) and if you see its prototype property it contsians the methods such as bind,call, apply ... etc.
*/

/*

//the theory for this is written in the book

//as we know the better solution for the above problem is using protype as a property and add the method in that for eg - 



console.log(Person);

Person.prototype.calcAge = function(){
    console.log(2021 - this.birthYear);
}

P1.calcAge();

//if you run this code below it will give output shown below in commented section.
console.log(P1.__proto__);

// {calcAge: ƒ, constructor: ƒ}
// calcAge: ƒ ()
// constructor: ƒ (fname,birthYear)
// [[Prototype]]: Object

console.log(P1.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(P1)); //will return true
console.log(Person.prototype.isPrototypeOf(Person)); // will return false

//if it is difficult to understand this you can also read the .protype as .                               .prototypeOfLinkedObject   note this is just for reading purpose 

Person.prototype.species = 'Homo Sapiens';
console.log(P1.species);

//to check its direct property
console.log(P1.hasOwnProperty('fname'));  //will return true
console.log(P1.hasOwnProperty('species')); // will return false bcz it is in prototype property

//here hasOwnProperty we are able to use on person even though it is on object (original object's) bcz it is using protype chain (if found on person it will get it from there or look up in the chain )


//prototype chain 

console.log(P1.__proto__);
console.log(P1.__proto__.__proto__);
console.log(P1.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);  // it will give you that constructor function back

const arr = [8,9,1,1,3,6,9,3,8]
console.log(arr.__proto__);  

 // it will show all the array methods bcz we know that arr.__proto__ property is set to the prototype of Array constructor method .. and prototype property of array constructor method contains all the method that we used on the array and thats why all the array object (like arr ) that are created from  that Array constructor  are able to use those method ..

 console.log(arr.__proto__ === Array.prototype);  //true

 console.log(arr.__proto__.__proto__); //bcz of prototype chain it will point to the contructor unction of object 


// we can also add method on array.prototype so all the array object able to access those methods ..but doing this is considered as bad practice
 
Array.prototype.unique = function () {
    return [...new Set(this)];
  };
  
console.log(arr.unique());


const h1 = document.querySelector('h1')
console.dir(h1); // it also contains the prototype 

//u can also check it for any user defined function like this...
console.dir(x=>x*2); //this will return prototype of function which contains methods such as bind,call,apply etc

*/


/*-------------------- CODING CHALLANGE 1 ------------------------ */

/*

const car = function(make , speed){
    this.make = make;
    this.speed = speed;
}


car.prototype.accelerate = function(){
    console.log(`${this.make} is going with : ${this.speed += 10}`);
}

car.prototype.break = function(){
    console.log(`${this.make} is going with :  : ${this.speed -= 5}`);
}

const car1 = new car('BMW',120);
car1.accelerate();
car1.break();
car1.accelerate();

const car2 = new car('Mercedes',95);
car2.accelerate();
car2.break();
car2.accelerate();

*/

/* --------------------------- Es6 classes -------------------------------- */

//Es6 classes (this is same as java)

/* 
two ways to create class .. using class expression and class declaration

1 . class expression -
const className = class { }

2.  class declartion

class className {

}
*/

/*

class PersonClass {

    constructor(fullName,birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Instance methods
    calcAge1(){
        console.log(`the age of person is : ${2021 - this.birthYear}`);
    }

    greet(){
        console.log(`hello ${this.fullName}`);
    }

    //set the property that already exists ... and (here we have used setter for validation)
    // when ever we use setter on existing property it tries to set throgh both constructor and setter.. to avoid this we use _propertyName (this is not a js feature it is just by convention we use ... but it does create new property so in above example it there would be two properties like fullName and _fullName .. to access this _fullname as this is new variable we have to use getter for it (bcz we have set this property under setter)) 

    //so in this case when you create an object of class and pass the parameter to it .. it will go to constructor function and in that it will call setter for setting the full name (if it ssatisfy the critaria) and in birthYear it will consider normal birthYear value.
    
    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }


    get fullName(){
        return this._fullName;
    }

    //static methods
    static hey(){
        console.log('hey there!! 😊');
    }
}


const person1 =new PersonClass('sonu chaudhary',2001);
person1.calcAge1();
person1.greet();
// person1.fullName = "pavit chaudhary"
console.log(person1.fullName); // will give full name



const person2 = new PersonClass('rinkal',1999);
person2.calcAge1();
person2.greet();
console.log(person2.fullName); // will give undefind bcz it doesn't conatains space so the setter doesnot set its value

const walter = new PersonClass('Walter White', 1965);
console.log(walter.fullName);  //will give full name

//calling static methods
// to call static method we just need to use className.methodName (same as java)

PersonClass.hey() //calling static methods.

*/

/*
POINTS TO REMEMBER FOR USING CLASS-

1. classes are not hoisted (you cannot use them without creating them first)
2. classes are first- class citizes (u can pass them into a function and also return  them from the function (bcz classes are just special type of function behind the scene))
3. class body can only be excuted in strict mode .

*/



/* ------------------------ GETTERS AND SETTERS IN JS -------------------------- */

/*
how to use getter and setter on a class is  shown above.
and getter and setter can be very useful for data validation.

1. you can use getter and setter on any regular object as well as on class  in js
2. the getter and setter act as a property when you want to access them 
3. we use get or set keyword before the method accheive getter setter
4. it not necessary to have both getter and setter .

*/

/*

//eg using object

const account = {
    ownerName : 'sonu',
    movment : [23,90,18,90,23],

    get latest(){
        return this.movment.slice(-1).pop();
    },

    // we can add or set the property using this .. and any setter method needs to have only one parameter
    //note in this we have used the comma
    set latest(mov){
        this.movment.push(mov)
    }
}

//to access getter
console.log(account.latest); //note here we are not calling it as a method bcz its just a property

//to access setter and set a property on it.
account.latest = 7 ; //this is how we set the property in it.
console.log(account.movment);

*/

/* ----------------- Object.create() method in js ------------------------ */


/*
1.
all the methods that we want all the person object to inherits we put it into a perticular object (prototype).. and then we create the new object using Obect.create(pass the prototype object here)

when we use  the new operator in constructor function or classes it automatically set the prototype of instances to the constructors prototype property.

in case of object.create()  we manually set the prototype of newly created object (in below case sonu) to the Person object..... 

but now a days using object.create is least prefer way

//here we are setting explicitly that person.proto is actulally the prototype of sonu

*/

/*

const PersonProto = {
    calcAge2(){
        console.log(`the age of person is : ${2021 - this.birthYear}`);
    },

    // this init method we are using here is just for initiallization of object .. it has nothing to do with constructor and also it does not work like constructor .. it is just a regular method (And we can give any other name to init ) and we are able to set value using this bcz we are creatting object and then calling init() using that object .. so that's why this keyword is set to there

    init(fname,birthYear){
        this.fname = fname;
        this.birthYear = birthYear
    }
}


const sonu = Object.create(PersonProto);
console.log(sonu);
//not prefered way for setting element.
sonu.name = "sonu";
sonu.birthYear = 2001;
sonu.calcAge2();

// we can also check this
console.log(sonu.__proto__ === PersonProto);


const rink = Object.create(PersonProto);
rink.init('rink',1999)
rink.calcAge2();

//here we created 2 objects sonu and rinkal (using  Object.create) and  whatever methods this two object want to access (or same goes for property as well but for that we need to create method in there like init or set values maully like we did on sonu object) we put into a object and pass that object to object.create method


// this note is for general -- we can also put methods in object(all object that we create ) same as put above

// IMPORTANT-
//object.create() methods creates the new object and prototype of this object is the object that we pass in .. so above case sonu is new object created from Object.create() and prototype of this object is set to PersonProto bcz that is the object we passed in.

*/

/* ------------------------ CODING CHALLANGE 2 --------------------------------- */

/*

class Car {

    constructor(make,speedUs){
        this.make = make,
        this.speedUs = speedUs
    }

    accelerate() {
        this.speedUs += 10;
        console.log(`${this.make} is going at ${this.speedUs} km/h`);
      }
    
      break() {
        this.speedUs -= 5;
        console.log(`${this.make} is going at ${this.speedUs} km/h`);
      }

    set speedUs(speed){
       this.speed = speed * 1.6  //not using _speed bcz here we are not using existing property
       //this.speedUs = speed*1.6 // if u use this then you will have to use _speed and then also return from get method(note in both the gat and set method name the name of the method should be using property name)
    }

    get speedUs(){
        return this.speed/1.6
    }
}

const car = new Car('Ford',120);
console.log(car.speedUs);
car.accelerate();
car.accelerate();
car.break() 
car.speedUs = 50
console.log(car.speedUs);

// console.log(car.speedUs);

*/

/* ------------------------------------------------------------------ */
/////////////////////////////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

/*

const Person = function(fname,birthYear){
    this.fname = fname;
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function(){
    console.log(2021 - this.birthYear);
}

const Student = function(fname,birthYear,course){
    // Person(fname,birthYear); // will not work (see reason below)
    Person.call(this,fname,birthYear);
    this.course = course;
}

//linking prototypes
//with this the student is now inherits from Person..
//this stmt should be added here before defining any method on student bcz this stmt creates the new empty object so thode method can be added here on this empty object..otherwise it will override those methods
Student.prototype = Object.create(Person.prototype)


Student.prototype.introduce = function(){
    console.log(`My name is  ${this.fname} , and i study ${this.course}`);
}

const mike = new Student('Mike',2001,'computer science');
mike.introduce()
mike.calcAge()

console.log(mike.__proto__);
//op - Person {introduce: ƒ} this is bcz the mike.proto property is set to the prototype property of student and this student conatins the method introduce  

console.log(mike.__proto__.__proto__);
// output {calcAge: ƒ, constructor: ƒ} this is bcz the mike.proto property is set to the prototype property of student and student.proto property is set to prototype of person and that person.prototype contains the method calcAge 

// so above to cl stmt shows the prototype chaining

*/

/* In the student constructor function we are calling the parent constructor bcz we want to impliment inheritance so for calling Parent constructor function we used call method (bcz without this the function becomes the regular function only and in reg function this keyword is set to undefind so here we will get the same thing) so in call method this keyword is set to method to which it is used .

*/


/* ----------------------------------  CODING CHALLANGE 3 (Inheritance between the constructor functions)---------------------------------------*/
/*

const Car = function(make,speed){
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function(){
    this.speed += 20;
    console.log(`${this.make} is going on ${this.speed }km/hr`);
}

Car.prototype.break = function(){
    this.speed -= 5;
    console.log(`${this.make} is going on ${this.speed }km/hr`);
}


const EV =  function(make,speed,charge){
    Car.call(this,make,speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype)

EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
}

EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge -= 0.1;
    console.log(`${this.make} is going at ${this.speed} km/par, with a charge of ${Math.floor(this.charge)}`);
}


const EvCar = new EV('Tesla',120,23)
EvCar.accelerate();
EvCar.break();
EvCar.chargeBattery(90);
EvCar.accelerate();



*/

/* -------------------- Inheritance between the Es6 classes ------------------- */
/*
implemented same as java .. the only difference is as we know in java if the parent class doen't have any constrcutor then the child class need not have constructor ..but if the parent class have para constructor then child class should also have constructor and pass argument to parent..

how ever in js even if there is constructor in parent class ..but in child class there is no need for creating constrcutor as if doesnot have any instance variable (in that case even if you dont define constructor behind the scene it will call the parent class constructor)

we use extends keyword to extend and super() to call  parent constructor but this has to be the first stmt in the child class constructor

in js calling super class methods in child class does not works like super.methodName()

*/

/*

class PersonClass {

    constructor(fullName,birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Instance methods
    calcAge1(){
        console.log(`${this.fullName} is  ${2021 - this.birthYear} years old`);
    }

    greet(){
        console.log(`hello ${this.fullName}`);
    }

    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }


    get fullName(){
        return this._fullName;
    }

    //static methods
    static hey(){
        console.log('hey there!! 😊');
    }
}

class StudentClass extends PersonClass{

    constructor(fullName,birthYear,course){
        //call to super has to be the first statement
        super(fullName,birthYear)
        this.course = course
    }

    introduce(){
        console.log(`My name is ${this.fullName}, i am doing ${this.course} `);
    }

    //overriding
    greet(){
        console.log(`Hello ${this.fullName} work hard today so that one day u can enjoy your life.`);
    }
}

const student = new StudentClass('sonu chaudhary',2001,'computer science');
student.introduce();
student.greet();
student.calcAge1() // call to parent method

*/

/*-------------- Inheritance between classes : Object.create() -------------------------- */

/*

const PersonProto = {
    calcAge(){
        console.log(2022 - this.birthYear);
    },
    
    //user defind init 
    init(fname,birthYear){
        this.fname = fname;
        this.birthYear = birthYear
    }
}

const StudentProto = Object.create(PersonProto);

StudentProto.init = function(fname,birthYear,course){
    PersonProto.init.call(this,fname,birthYear);
    this.course = course;
}

StudentProto.introduce = function(){
    console.log(`My name is ${this.fname}, i am doing ${this.course} `);
}

const jay = Object.create(StudentProto)
jay.init('jay',2001,'computer science');
jay.introduce();
jay.calcAge()

*/

/* ----------------------- Data Privacy And Data Encapsulation ------------------------- */

/*

Encapsulation: Protected Properties and Methods
Encapsulation: Private Class Fields and Methods

1) Public fields
2) Private fields
3) Public methods
4) Private methods
(there is also the static version)

private fields are also called as class field we declare them here top in class and we use # symbol for writing private field  .. we can access them via this keyword.. these fields are available on the class not on prototype (like all the methods of this class they are on prototype)

NOTE adding samicolon while defining class fields are necessary

*/

/*

class Account {

    //in js whenever we set public variable we have to set it with its value (so that it become available to all the objects)
    locale = navigator.language;   //public fields (available on instances them self)
    // owner;   // this doen't make more sense (but it may be useful) make sense only if you want that all the object should hold this property(same value) in that case remove it from constructor 


    #movments = [];  //private  fields (available on instances them self)
    // #pin;     not working in our browser (here basically we are defining a pin and its value will be set in constructor thats why we are not setting any value ) if u are using private fields then it is mandetory to declare it here above

    constructor(owner,currancy,pin) {
        this.owner = owner;
        this.currancy = currancy;
        this.#pin = pin;       //private
        // this._movments = [];   protected
        // this.locale = navigator.language; commented here to make it public
    }


    //public methods
    // to make protected field make available outside .. by doing this a programmer cannot change it he/she can only be able to access it via method
    getMovments(){
        // return this._movments    protected 
        return this.#movments

    }

    deposite(val){
        // this._movments.push(val)  protected
        this.#movments.push(val)
        return this;

    }

    withdraw(val){
       return this.deposite(-val)
    }

    //protected method
    _approveLoan(){
        return true;
    }

    requestLoan(val){
        if(this._approveLoan(val)){
            this.deposite(val);
            console.log(`The loan for ${val} is aprroved!! `);
            return this;
        }
    }

    // private method (doesn't spport yet)
    // #approveLoan(){
    //         return true;
    // }

}

const acc1 = new Account('sonu','ruppe',1111);
acc1.deposite(700);
acc1.withdraw(90);
acc1.requestLoan(200);
console.log(acc1.getMovments());
console.log(acc1._pin); // not allowed (programmer will notice that _pin so he should not access it outside its just for your understanding)


// console.log(acc1.#movments); // this will throw error .. notice here we also have to use # bcz its now #movments not only movments 

// console.log(acc1.pin); not working in our browser

//calling private methods 
// console.log(acc1.#approveLoan());  // js doesn't spport this yet (will throw an error) and this see this method as private field

//method chaining

acc1.deposite(500).deposite(900).withdraw(200).deposite(28000).withdraw(9000)
console.log(acc1.getMovments());

// in js there is no conecept such as private or protcted yet .. but there is a way to protect the property and method by adding _ prefix them .. by doing this at least the programmer will get to know that it is a protected property so he/she should not change or access it outside (note - this is just a converntion not js has made it)

*/

/*------------------------- CODING CHALLANGE 4 ----------------------------------------*/

class Car {

    constructor(make,speedUs){
        this.make = make,
        this.speedUs = speedUs
    }

    accelerate() {
        this.speedUs += 10;
        console.log(`${this.make} is going at ${this.speedUs} km/h`);
      }
    
      break() {
        this.speedUs -= 5;
        console.log(`${this.make} is going at ${this.speedUs} km/h`);
        return this;
      }

    set speedUs(speed){
       this.speed = speed * 1.6  //not using _speed bcz here we are not using existing property
       //this.speedUs = speed*1.6 // if u use this then you will have to use _speed and then also return from get method(note in both the gat and set method name the name of the method should be using property name)
    }

    get speedUs(){
        return this.speed/1.6
    }
}

class EV  extends Car{

    #charge; //declaring this is compulsary if you want to use private field
    constructor(make,speed,charge){
        super(make,speed);
        this.#charge = charge
    }

    chargeBattery(chargeTo){
        this.#charge = chargeTo;
        return this;
    }

    accelerate(){
        this.speed += 20;
        this.#charge -= 0.1;
        console.log(`${this.make} is going at ${this.speed} km/par, with a charge of ${Math.floor(this.#charge)}`);
        return this;
    }
}


const EvCar = new EV('Rivian',120,23)
console.log(EvCar);
EvCar.accelerate().accelerate().accelerate().break().chargeBattery(50).accelerate()

// EvCar.chargeBattery(90);
// EvCar.accelerate();

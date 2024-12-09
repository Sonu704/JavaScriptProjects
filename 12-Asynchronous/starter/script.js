'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data,className=''){
    const html = `
        
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
    </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend',html);
    // countriesContainer.style.opacity = 1; //handling in finally method
}


const renderError  = function(msg){
    countriesContainer.insertAdjacentText('beforeend',msg);
    // countriesContainer.style.opacity = 1;   //handling in finally method
}

///////////////////////////////////////
// https://restcountries.com/v2/


// const getCountryData = function(country){

//     //old way of getting data using XMLHttpRequest 
//     const request = new XMLHttpRequest();
//     request.open('GET',`https://restcountries.com/v2/name/${country}`)
//     request.send();

//     request.addEventListener('load',function(){
//         const [data] = JSON.parse(this.responseText)
//         console.log(data);

//         const html = `
        
//         <article class="country">
//             <img class="country__img" src="${data.flag}" />
//                 <div class="country__data">
//                     <h3 class="country__name">${data.name}</h3>
//                     <h4 class="country__region">${data.region}</h4>
//                     <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
//                     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//                 </div>
//         </article>
//         `
//         countriesContainer.insertAdjacentHTML('beforeend',html);
//         countriesContainer.style.opacity = 1;
//     })
// }

// getCountryData('Bharat')
// getCountryData('UAE')
// getCountryData('pakistan')


/*
const getCountryAndNeighbour = function(country){

    //old way of getting data using XMLHttpRequest 
    //AJAX call country 1.
    const request = new XMLHttpRequest();
    request.open('GET',`https://restcountries.com/v2/name/${country}`)
    request.send();

    request.addEventListener('load',function(){
        const [data] = JSON.parse(this.responseText)
        console.log(data);

        //render country 1
        renderCountry(data)

        //Get neighbour country(2)
        const [neighbour] = data.borders;

        if(!neighbour) return;

        //AJAX call country 2.
        const request2 = new XMLHttpRequest();
        request2.open('GET',`https://restcountries.com/v2/alpha/${neighbour}`)
        request2.send();

        request2.addEventListener('load',function(){
            const data2 = JSON.parse(this.responseText);
            console.log(data2);

            renderCountry(data2,'neighbour')
        })
    })
}

getCountryAndNeighbour('sri lanka')

//here to implement ajax call in sequence(basically synchronously) we have make nested one inside the other's call back function and this is known as callback hell but this can be more complex as the cnumber of call increases so for this we can make use of promise

*/
/*------------------------- PROMISES -------------------- */

// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v2/name/${country}`).then(function(response){
//         console.log(response);
//         return response.json();

//     }).then(function(data){
//         console.log(data);
//         renderCountry(data[0])
//     })
// }

// getCountryData('Bharat');

/* Explanation -

above code is best to understand

1. fetch function is returning a promise and we handle that promise using
2. then() method and for reading the data from the response object we need to call the json method on that object.
3. json() method itself will return promise so as it return the promise it becomes the new promise sinse this is a promise we need to handle that promise 
4. so we can call then() method on that promise  

*/

//simplified version of above code (use above code to understand all this)

/*

const getCountryData = function(country){
    fetch(`https://restcountries.com/v2/name/${country}`).then(response =>
       response.json()).then(data =>
        renderCountry(data[0]))
}

getCountryData('Bharat');


*/

/* ------------------------------------- CHAINING PROMISES -------------------------------- */

/*
const getCountryData = function(country){
    //country 1.
    fetch(`https://restcountries.com/v2/name/${country}`).then(response => {
    
    console.log(response)

    if(!response.ok){
        throw new Error(`Country not found (${response.status})`)
    }
    
    return response.json()})
   .then(data => {
        renderCountry(data[0])

        const neighbour = data[0].borders[0];

        if(!neighbour) return;

        //country 2.
        return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
    }).then(response =>{
        
        if(!response.ok){
            throw new Error(`Country not found (${response.status})`)
        }
        
        return response.json()
    })
    .then(data => renderCountry(data ,'neighbour')).catch(err => {
        console.log(`${err} ✨✨`);
        renderError(`Something wen't wrong ✨✨${err.message} .. Try again`)
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
}

getCountryData('Bharat')

*/

/*

we knnow that for handleing promises(the value returned from asynchronous js ) we use then method . so basically then method takes the return value of promises(value returned from fetch method ) to perform further actions .. so it is also possible to chain then method to avoid callback hell (so basically the value returned from 1 then method can be use in another then method)

so in the above code we are 1st getting the promise object and in then method we are making it readable using json which intern return the promise so that we have to again handle it in then method .. 
notice in this then method there is only 1 stmt so we dont have to return it explicitly .. but in next then method we are getting the country as well as we are checking for the negbiour country and if any such negibour contry exist then we are fetching it detail (basically getting the promise object again) .. and now for getting detail from that object we have to again follow the same procedure like calling then () and using json again calling .. for all that thing notice that we have to return from the previous then method(bcz in this then method there are multiple stmts) so thats why have used  return from fetch ..

how to handle the exceptions --

1. using catch method - here in catch method we are handlelling any exception that occur in the code this method always take the callback function and in this callback function we can perform any task

error is a object in js so we can take its properties using . and here we have taken its message property

2. finally method is used to hendling some clean up operations or to hendle something that always ocuur no matter if the exception occur or not.. this also takes the callback function

note -- the finally method is chained after the catch bcz the catch is also returning the promise .. and same is true for the catch block .. so finally method will only work if the catch returns the promise

*/

/*

const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
  };

const getCountryData = function(country){
    //country 1.

    getJSON(`https://restcountries.com/v2/name/${country}`,'Country not found')
   .then(data => {
        renderCountry(data[0])

        const neighbour = data[0].borders[0];

        if(!neighbour) throw new Error('No neighbour found!');

        //country 2.
        return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`,'Country not found')
    })
    .then(data => renderCountry(data ,'neighbour')).catch(err => {
        console.log(`${err} ✨✨`);
        renderError(`Something wen't wrong ✨✨${err.message} .. Try again`)
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
}

getCountryData('Bharat')

*/

//whenever we want to create the error handler that needs to be catch down below in catch method then we can create it manually using throw new error ..throwing the error inside the callback function of then method will immediately reject that promise and then that promise will propogate down and will be handled in catch block..

/* ------------------------------------------------------------------------ */

/*

///////////////////////////////////////
// The Event Loop in Practice
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('End test');

/*

/*

// order of execution 
1. test start
2. End test
3. resolve promise 1.
4. resolve promise 2.
5. 0 sec timer

*/

/* ----------------------------- CONSUMING PROMISES WITH ASYNC AND WAIT ---------------------------- */

/*
async function is basically a function which keeps running in the background while performing the operations insides its so when the function is done it automatically returns the promises..
in an async function we can have two or more await stmt followed by the promise(fetch) await is basically used for waiting the fetch to return the promise .. await will stop the code execution untill the promise is fullfilled..
this await word dont stop the code's execution actually in call stack bcz the async function keep running in the background..

the result of await  stmt followed by the fetch is the promise (as usual) 

1 important thing to keep in mind here is that async / await is just a synthetic sugar for the then() method and callback chain .. so behind the scene it is basically converting async await to callback chainning (the old method)

*/


// the example to achive the same country (above code ) using async and await (by replacing the callback hell  where we have used the then() method and return explicitely)

//notice in below case we have used the await word whenever we need to use the then method to handle the promise and return it .. so using this way makes it more easy..

// in the below code we are storing the fullfilled value of promise here we dont need to check if the promise is fullfilled or rejected  


const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  

  const whereAmI = async function () {
    try {
      // Geolocation
      const pos = await getPosition();
      const { latitude: lat, longitude: lng } = pos.coords;
  
      // Reverse geocoding
      const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (!resGeo.ok) throw new Error('Problem getting location data');
  
      const dataGeo = await resGeo.json();
      console.log(dataGeo);
  
      // Country data
      const res = await fetch(
        `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
      );
      
      if (!res.ok) throw new Error('Problem getting country');
  
      const data = await res.json();
      console.log(data);
      renderCountry(data[0]);
    } catch (err) {
      console.error(`${err} 💥`);
      renderError(`💥 ${err.message}`);

      // Reject promise returned from async function
        throw err;
    }
  };
  
console.log('1: Will get location');
  // const city = whereAmI();
    // console.log(city);
  
// how to return value from async function .. using then while calling the method and handling it there ..but this is old way of handling here we are mixing the callback hell so its not ggod
//   whereAmI()
//     .then(city => console.log(`2: ${city}`))
//     .catch(err => console.error(`2: ${err.message} 💥`))
//     .finally(() => console.log('3: Finished getting location'));
// whereAmI()
// console.log('first');

//new way using iffies (i dont know what this is please search for it)
(async function () {
    try {
      const city = await whereAmI();
      console.log(`2: ${city}`);
    } catch (err) {
      console.error(`2: ${err.message} 💥`);
    }
    console.log('3: Finished getting location');
  })();

//it will first display the first stmt bcz the async will be keep running in background and it won't stop the execution of call stack in which the cl stmt is resides

// we can use same try catch block as java to handle the exception 

// async function will always return the promise


/* ----------------------- Parallel running all async operations ----------------------- */

//when ever we have a situation in which we have to run all the async task parelly not in sequence the we can use an d also when our await stmts are not depended on each other -
//promise.all() method this method takes an array of all the call and also returns the array of promises (so u can see on network tab that with that u can run all the async operation at the same time) ... but 1 thing about this is that if any async opeartion reject it will reject the whole promise.all() and then it won't work properly

//promise.all() also called as combinator bcz it allows to combine multiple promises


///////////////////////////////////////
// Running Promises in Parallel
const get3Countries = async function (c1, c2, c3) {
    try {
      // const [data1] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c1}`
      // );
      // const [data2] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c2}`
      // );
      // const [data3] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c3}`
      // );
      // console.log([data1.capital, data2.capital, data3.capital]);
  
      const data = await Promise.all([
        getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
      ]);
      console.log(data.map(d => d[0].capital));
    } catch (err) {
      console.error(err);
    }
  };
  get3Countries('portugal', 'canada', 'tanzania');







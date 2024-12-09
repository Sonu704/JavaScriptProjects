'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords,distance,duration){
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
    _setDescription(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
          months[this.date.getMonth()]
        } ${this.date.getDate()}`;
    }
}

class Running extends Workout {

    type = 'running';

    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration);
        this.cadence = cadence;
        this.calcPace()
        this._setDescription()
    }

    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {

    type = 'cycling';

    constructor(coords,distance,duration,elevationGain){
        super(coords,distance,duration)
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription()
    }
    calcSpeed(){
        this.speed = this.duration / (this.duration / 60);
        return this.speed;
    }
}
 
class App{

    #map;
    #mapZoomLevel = 13;
    #mapEvent
    #workouts = []   // to add the workout object in here


    constructor(){
        //get users position
        this._getPosition();

        //Get data from local storage
        this._getLocalStorage()

        //Attach Event Handlers
        //here we are using bind method bcz in eventHandlers this keyword always points to the event to which it is attched to in our case its a form but we need our this keyword to point to app object  
        form.addEventListener('submit',this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField) //here we dont need bind method
        containerWorkouts.addEventListener('click',this._moveToPopup.bind(this))
    
    }

    _getPosition(){
        if(navigator.geolocation)
            //here we are using bind method bcz the _loadMap function will be treated as regular function and in regular function the this keyword always is undefind so we can not perform any operation on undefind 
            navigator.geolocation.getCurrentPosition( this._loadMap.bind(this),function(){
                alert('could not found your location')
            });
    }

    _loadMap(position) {
        const latitude =  position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = [latitude,longitude];

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // Handling clicks on map;
         //here we are using bind method bcz in eventHandlers this keyword always points to the event to which it is attched to in our case its a form but we need our this keyword to point to app object bcz the mapEvent property is also on the map object.
        this.#map.on('click', this._showForm.bind(this))

        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work); 
            // we are adding method  here bcz the map is getting loaded over here so once the map is loaded fully then only we can render the workout on the map
        })
    }

    _showForm(mapE) {
        this.#mapEvent = mapE // this is bcz we dont need this mapE here we are using it in form.addEv.. so that's why we have defind it globally so here we are coping that event object to mapEvent and that mapEvent we are using down to get latitude and longitude;

            form.classList.remove('hidden');
            inputDistance.focus();

    }

    _hideForm(){
        //Empty inputs
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = ''

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(()=> (form.style.display = 'grid'), 1000) // this is bcz initially our graph was in grid form so after hiding we want to show the list in grid form only(replacing input form with the list element)
    }

    _toggleElevationField(){
        //here we are not using this keyword anywhere so while calling the function also we dont need to bind method (above in the constructor)
        inputElevation.closest('.form__row ').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
      
        //the every method will return true if all if all the inp is finite 
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp))
        const allPositive = (...inputs) => inputs.every(inp => inp > 0)
        e.preventDefault()

        // Get the data
        const type = inputType.value;
        const distance = +inputDistance.value  //+ to convert the value to int
        const duration = +inputDuration.value
        const {lat,lng} =this.#mapEvent.latlng; //to get the coordinates
        let workout;

        //Check if the data is valid

        //if the workout is running, create the running object
        if(type === 'running'){
            const cadence = +inputCadence.value;
            if(!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) return alert('Input have to be the positive numbers')

            workout = new Running([lat,lng],distance,duration,cadence);
        }
        
        //if the workout is cycling, create the cycling object
        if(type === 'cycling'){
            const elevation = +inputElevation.value;
            if(!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) return alert('Input have to be the positive numbers')
            
            workout = new Cycling([lat,lng],distance,duration,elevation);
        }

        //Add new object to workout array
        this.#workouts.push(workout)

        //Render workout on a map as marker
        this._renderWorkoutMarker(workout)

        //Render workout on list
        this._renderWorkout(workout)
        
        // hide form  + clear input field
        this._hideForm();

        //set local storage to all the workouts
        this._setLocalStorage()
        
        
    }
    _renderWorkoutMarker(workout){
        L.marker(workout.coords).addTo(this.#map).bindPopup( L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,
            })).setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}${workout.description}`).openPopup()

    }
    _renderWorkout(workout){
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
        `;

        if(workout.type === 'running'){
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">178</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>
            `;
        }
        if(workout.type === 'cycling'){
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>
            `
        }

        form.insertAdjacentHTML('afterend',html);
    }
    _moveToPopup(e){
        const workoutEl = e.target.closest('.workout');
        // console.log(workoutEl);

        if(!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id)
        // console.log(workout);

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration:1
            }
        })
    }
    _setLocalStorage(){

        //JSON.stringify() Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
        localStorage.setItem('workouts',JSON.stringify(this.#workouts))

        //here we are using the local storage api and this should be used to store the less info ... You can see this data on inspect tab => Application => local storage=>file
    }

    _getLocalStorage(){
        // JSON.parse A valid JSON string.Converts a JavaScript Object Notation (JSON) string into an object.
        const data = JSON.parse(localStorage.getItem('workouts'))
        // console.log(data);

        if(!data) return;

        //bcz initially when page loads the workout is empty but the data is there in local storage so we are assigning that data to workouts array to load it
        this.#workouts = data

        this.#workouts.forEach(work => {
            this._renderWorkout(work);
            // this._renderWorkoutMarker(work); 
            //we cannot use this renderWorkoutMarker here bcz when this app application runs the map is not initially loaded it takes time so until the map loads we can not mark workout on map ... so instead doing it here we will do it in _loadMap method bcz thats the place where map is loaded and once the map is loaded we can call the renderWorkoutMarker
        })
    }
    reset(){

        localStorage.removeItem('workouts') // this is local stor. function
        location.reload() //location is a object of local storage

        // I am using this method to reset everything like no data will there in workout array nor in local storage its just like starting application from begining ...but this method i'am going to implement on console using app.reset() .. so not calling this method anywhere here

    }
}

const app = new App()

/*
one of the thing with local storege is that when we convert the object to string and data to object the prototype chain gets loss and that object is treated as the normal object so all the methods could not be inhereted again.. here im talking about getLoacalStorage and sertLocalStorage
*/


/*
navigator.geolocation is used to get the geolocation .. getCurrentPosition takes two callback function the 1st function is for success and the second function is for failuar .. 1st function takes position as parameter and we can get the info releted to position like (latitude,longitude) ..
2nd function is two show any messege or do something if failuar occurs

in 1st function we have pasted the code from Leaflet website its a js liblary to deal with the map

here we have taken a latitude and longitude in array that coords arr we have passed in the setview as first paramter and the second para in that function is used for zoom in and zoom out 13 is prefered

L is a namespace or u can say package which contains the methods 
L.map is a method which take id as parameter here we have passed map as id and this map id is there in our html code.

L.title is a method for how our map should look on the website  .. for showing it little nicely i removed org/ before z and added fr/hot/ 

L.marker is used to mark on the map with the element (here it is css )

//the below stmt is just for the reference
any variable that is global variable in other script is accessible in this script .. like suppose we have the other.js file here which we gave reference in our index . html so any global variable in that script we can access it here (as long as other.js appear before our script.js ) but other.js will not have access to script.j

-----------------------------

display the marker when we click at certain position  --
-- On is just like an eventListener its not a js eventListener but it is a eventListener on map which is provided by the leafLet .. so when we log its event object we can see all the information of the event   
so we are taking the latitude and longitude using event Object giving it to marker method which is going to add the marker on map using addTo .. bindpopup is a method which is going to add the popup with the marker and in that we have passed the object with options that we want our marker popup to show (u can see all those option in documentation)

*/


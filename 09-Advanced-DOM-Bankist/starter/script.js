'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 =document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////
/* ----------- LEARN MORE BUTTON SCROLL TO SECTION 1 ------------------ */


btnScrollTo.addEventListener('click',function(e){

  //how to scroll with detail is explained below under comments please refer that .. the more info about two different ways is also available there plz check it.

  /*
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log("Current scroll (X/Y) : " , window.pageXOffset, window.pageYOffset);
  console.log('Height/Width viewport : ' , document.documentElement.clientHeight,document.documentElement.clientWidth);
  */

  //Actual scrolling effect  .. the below given line is important for this btnscroll only so if you just write this line it will work fine
  //the above code is just a old way ..
  section1.scrollIntoView({behavior:'smooth'});  // this works in our browser bcz it is modern

})


/////////////////////////////////////////////
// Page navigation

/* -- scrolling to the specified section -- */
//two ways are there theory is in Explanation.txt

/*

note the problem with this way is that  here we are attaching the same event handler to multiple element so it will become lot more complicated or time consuming if there are  many events so for that reason we use bubbling or event delegation see beelow code


document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click',function(event){
    event.preventDefault()  // to stop defined scroll throgh html (see index.html )
    const id = this.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  })
})

*/

//here we are attaching the event handler to the parent element(nav__links which is parent of nav__link ) only so the same event will also works on its parent element to its child element 

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault() // to stop defined scroll throgh html (see index.html ) bcz there is links

  //matching stratage  --
  //(here we have to check which link is click and also to check only the link is click not on a space between the link is click (as we have selected the whole parent so it covers the whole area.))
  //e.target - Returns the object to which event is dispatched (its target).
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})


/////////////////////////////////

// Tabbed component

tabsContainer.addEventListener('click',function(e){
  //match 
  //here we have used closest bcz even if we click on span element still it will give up the parent element and if click on button it will give button it self and we know that this is called as event delegation...closest is used at the place where we have 2 elemnts where we can tab
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  
  //gourd class
  if (!clicked) return; //if button is not click then return from the function ; stop:

   // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // tabsContent.forEach(c=>c.classList.remove('.operations__content--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));


  //active tab
  clicked.classList.add('operations__tab--active');

  //active content area
  document
.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
})


/////////////////////////////////////////
/* --------------- Menu fade animation ----------------- */

//here we could have used the mouseenter event but this event doesn't bubble up thats why we have not used it . instead w eused mouseover

const handleHover = function (e) {
  //the info for this is available in explanation.txt
  //here we have not used closest bcz there is no child element like we have span in tab component section . instead we used contains in if stmt.
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


/////////////////////////////////////////////////////////////////

/* ---------------- IMPLIMENTING THE STICKY NEVIGATION -------------------------- */

//this is little unused way so we have used below the intersection observer API.

/*

const initialCords = section1.getBoundingClientRect()

window.addEventListener('scroll',function(){
  // console.log(window.scrollY);

  // here top is a property in DomRect object(the returned object of getBoundingClientRect())
  //here sticky is our user defined class
  if(window.scrollY > initialCords.top) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
})

*/

/* --------- 2nd way using the intersection observer api ------- */
//Theory for intersection observer api is written in notebook .. code theory for this is below

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height;

const stickeyNavCallback = function(entries){
  const [entry] = entries // it is same as ---- const entry = entries[0];

  // console.log(entry); 

  if(!entry.isIntersecting){
    nav.classList.add('sticky')
  }else{
    nav.classList.remove('sticky')
  }
  
}

const headerObserver = new IntersectionObserver(stickeyNavCallback , {root:null, threshold:0, rootMargin : `-${navHeight}px`}) //px bcz js doen't allow rem or %

headerObserver.observe(header)

/*

here we have selected header bcz we need to check if header page(that is the 1st page before section 1 ) intersect with the root element (in our case the root is window) ..

then we use navHeight to dynamically get height value for rootMargin value (see what is root margin below in comment)

next in stickeyNavCallback function we passed threshold value[0] as entry in function and check if that entry intersect or not (isInterssecting is a property in IntersectionObserverEntry object that u can check as (console.log(entry) in cb func.)) so if it is not intersection then we have to add the sticky navigation ..(bcz we have to display it before section 1 's line appear) otherwise we have to remove the sticky class

root margin is box of specified value that will be applied outside of target element .. now we have made our rootmargin value dynamic .. otherwise we could have use hardcoded value like 90 or anything but it will not be responsive then in some sites .. we use -(minus ) before value bcz we want that rectengale box to be use or appear completely before specified threshold.


*/


/////////////////////////////////////////////////////////////////

/* -------------------- REVEALING SECTIONS ---------------------------- */
//this part also using the intersection observer api 

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries,observer){
  const [entry] = entries; // destructuring
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection , {root : null , threshold : 0.15});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})

/* THEORY FOR THE CODE--

1. selecting all section class bcz every section - 1 ,.. 2 ,, class conatins the section class and this all classes we want to observe  ..

2. in revealSection function we are using entries as a to get threshold value and also we are using the 2nd parameter of the function i.e observer(can give any name but std is this) and we are using that observer paramter to again unobserve the entries i.e already observed(basically 1st time when we load the page it removes the hidden class so the contents can be visible and sroll the text up bcz it is specified in that class to scroll)so for stopping that after the 1st time we used it

3. and also in  revealSection we are checking if the entry is intersecting 15 % or not using isIntersecting (isInterssecting is a property in IntersectionObserverEntry object that u can check as (console.log(entry) in cb func.)) if it is entersecting then we are removing the hidden class so the contents is visible

sectionObserver is used to create the IntersectionObserver object which takes 2 parameter(more theory in book)and on that sectionObserver we are using to observe section intersection with 15 % threshold.
*/


/////////////////////////////////////////////////////////
/* --------------- LAZY LOADING OF IMG ------------------------------- */

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries,observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;


  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')
  });
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg , {root:null , threshold:0,rootMargin:'300px'})
imgTargets.forEach(img=>imgObserver.observe(img))


/* THEORY FOR CODE-

in this first we are selecting all the images and here we have used a css way of selecting the images.

then we are checking if the entry intersecting with  threshold:0 or not and then we are simply replacing the image 

here we have used the  load event to listen bcz in that we are removing the(lazy img) class after the image is fully loaded (behind the secene ) in js  

*/


/////////////////////////////////////////////////////
/* --------- BUILDING THE SLIDER COMPONENT PART 1 ---------------------- */

const slider = function(){

  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots')

  let curSlide = 0;
  const maxSlide = slides.length

  //adding dots 

  const createDots = function(){
  
    slides.forEach(function(_,index){
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`)
    })
  }



  const activateDot = function(curSlide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${curSlide}"]`).classList.add('dots__dot--active');
  }



  const goToSlide = function(currentSlide){
    slides.forEach((sl,index)=>(sl.style.transform = `translateX(${100 *(index-currentSlide)}%)`))
  }


  const nextSlide = function(){
    if (curSlide === maxSlide-1){
      curSlide =0;
    }else{
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = function(){
    if(curSlide === 0){
      curSlide = maxSlide - 1;
    }else{
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  //init function

  const init = function(){
    goToSlide(0); // (initially this is used to display the silde's  1 after the other )
    createDots() 
    activateDot(0);
  }

  init();

  //Event handlers

  btnRight.addEventListener('click',nextSlide);
  btnLeft.addEventListener('click',prevSlide);

  document.addEventListener('keydown',function(e){
    // console.log(e); // to check the property name we can print this ob
    if(e.key === 'ArrowLeft') prevSlide();
    if(e.key === 'ArrowRight') nextSlide();
  })

  dotContainer.addEventListener('click',function(e){
    if(e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset // same as- const slide= e.target.dataset.slide
      goToSlide(slide)
      activateDot(slide)
    }
  })
}

slider();



/* THEORY FOR THE CODE AND BREAKING THE CODE INTO SMALL STEPS AND MEARGING IT TO FINAL STEP TO WORK WITH THIS PART ---

-------------------------------

// this two part just while solving used  
1.
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-800px)';
slider.style.overflow = 'visible'


2.
//this is used to display the silde's  1 after the other 
slides.forEach((slide,index)=>(slide.style.transform = `translateX(${100 *index}%)`))

//0% 100% 200% 300%

------------------------

///main theory
 1. first we selected the slide class bcz all the images are fall's under this class. and both the buttons

 now the main logic of code is we have 4 images and they are initially are all top of each other and each image is of width 100 .. 

 we want to place the one after the other .. like 1st image at position 0 , 2nd img at 100 (bcz the width is 100 so of course the it would come at 100) , 3rd img at 200 , and 4th img at 300 ..

and if we click on any of button the image shold go to its specified position (traslate in x position) as we hae discussed above . so for that we are using the goto function

-------------- GOTO WITH LITTLE CALCULATION ALSO COVERED THE PREVIOUS AND NEXT SLIDE FUNC--------------

now in this function basically we are looping through all the slides 1 by 1 using forEach loop and in that in each slide at spicified index we are applying the css transform property .. in trabslateX function we have stmt which is main part to shift the img . the stmt is    100 *(index-currentSlide)


the gotoFunction(0) is used to display the slides one after the other and the calculation is
img at position 0,100,200,300
so 1st case it would be -- 100 *(0-0)  --> 0% (1st img at position)
so 2st case it would be -- 100 *(1-0)  --> 100% (2st img at position)
so 3st case it would be -- 100 *(2-0)  --> 200% (3st img at position)
so 4st case it would be -- 100 *(3-0)  --> 300% (4st img at position)

now if we click the right button the nextslide function will execute and the job of nextSlide is to display the nextslide and if we raech to the last slide then move back to first slide again and for that we checked the condition in next slide function as if the currentSlide === maxSlide-1 (eg => 3 = 4-1) if this is true then make the current slide as 0 and then call the gotoSlide(0) otherwise increase the current slide and call the gotoSlide func with specified slide


eg suppose we move to 2nd slide then calculation would be--
img at position -100 , 0 , 100 ,200

1st img at -100 bcz we have shiftd it to left which -1 -- 100 *(0-1))  --> -100% (2nd img at position)
so 2st case it would be -- 100 *(1-1)  --> 0% (2st img at position)
so 3st case it would be -- 100 *(2-1)  --> 100% (3st img at position)
so 4st case it would be -- 100 *(3-1)  --> 200% (4st img at position)

now in above function we have passed 1 in all function as current slide bcz remember inital img at 0 we want to go to next slide so in that function first the curSlide is increased by 1 so curSlide is 1 .. so after that this will pass to gotoSlide as gotoSlide(1) so in that func itr 0 as (0-1) -1,(1-1) =0 , (2-1) an so on

and previous slide function works exactly opposite of next slide func

we are using key event whuch is in document object so that if we press left arrow key or right arrow key it should do the same task as button


--------- CREATING DOTS --------------

----- FUNC create dot--- 
in create dot function we are basically looping for each slide and adding dot for each slide using insertAdjacentHTML and note we have dot class in html that here we selected as  dotContainer and in that we are storing our dots ..here we are creating dots dynamically and the stmt `<button class="dots__dot" data-slide="${index}"></button>` in this dots__dot is css class for showing dot and that dot we are adding in js as button 

and we are also storing dot number as data atrribute like data-slide="${index}
all the custom data attribute is in dataset and we have to access them in js by dataset.att name ( for ge if data-tab is ur data then to access it dataset.tab)


----FUNC activate dot-----

in this function we are 1st delesecting all dots .. and after that we are showing the dot for current slide only and that is done using data-slide="${curSlide}"  this will acts as data-slide 0 ,1,2.. etc note data-slide is data attribute we have added while craeting dots . 
for activating n deactivating the classs we have used the user defind class in css  .dots__dot--active

------EVENT HANDLER dotContainer -------
in dotContainer event handler we are checking if the target button conatain the class dots__dot (so that only button could be clicked not space ) if yes then performing actions accordingly

*/


/*  ****************************************************************************** */

////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// LECTURE RELETED NOTES 

//SS are included here for theory info


/* -------------------------------- SELECTING ELEMENTS -------------------------------------- */

/*

//it returns the whole html document (root element)
console.log(document.documentElement);

//it return the <head> part of the html.
console.log(document.head);

//it return the <body> part of the html.
console.log(document.body)


//this two methods returns the nodelist
document.querySelector('.header') //selecting header class use (.)
const allSection = document.querySelectorAll('.section') //give all classes name section
console.log(allSection);

//this method return output in  html collection 
document.getElementById('section--1') //does not requre to put (.)
const allButtons = document.getElementsByTagName('button') ////does not requre to put (.)
console.log(allButtons);

//this method also return output in html collection
console.log(document.getElementsByClassName('btn'));

*/

/* --- Imp ----
with nodelist the element doesn't change  it self accoring to the web page for eg suppose when you delete h1 of page in insepect view ..
with html collection it  changes and you can see the difference in html collection object (for eg above -- allButtons) */


/* -------------------------------- CREATE OR INSERT ELEMENTS ---------------------------------------- */

/*

// 1st using insertAdjcentHTML('position',text)
//here position could be 1 of 4 methods .. after begin,beforeBegin , afterend , beforeEnd..

//2nd using createElement-

const header = document.querySelector('.header')

const message = document.createElement('div') //it craetes the div element
message.classList.add('cookie-message'); //add the already made class cookie-message .

message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message); //it will add before header
header.append(message) // after the header element it will add 
header.before(message); //before header 
header.after(message) //after header

//note when you use these methods like prepand and append method same time like above it will only add it it once if you wish to add more than once then use,

// header.append(message.cloneNode(true));

//remove method to remove element 
//eg here we are removing the contents when got it button is pressed

document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove()   //it is added new in js
})

*/

/* ------------------------------------ STYLE ELEMENT IN JS ---------------------------------------- */



// for working with this section uncomment the above section.

/*

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

*/

//to get its style

/* here message.style.color will not give any color this is bcz we can the styles only in case of inline that we have manually set(not in any css class bcz in that case it doesn't know in which class or where the element is)..

message.style.backgroundColor will give background color bcz here above we have set it manually and it acts as the inline

we can also get style from html inline (if you style in html forms its self)

conclusion -  style element only gives inline style .

To get any style we have to use the getComputedStyle and pass the component .. so it will give the whole style under cssStyleDeclaration object you can select specific property under that.

*/

/*

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color); // to get color from that object
console.log(getComputedStyle(message).height); // to get height from that object


// HOW TO SET THE STYLE.

message.style.height = Number.parseFloat(getComputedStyle(message).height,10)+ 30 + 'px';


// with custom property we have to use the setProperty('propertyNameMethod','value') ...custom property means property under the css page. using this we can set the property such as height , cackgroudColor but the above way is better for doing  message.style.backgroundColor.

document.documentElement.style.setProperty('--color-primary','orangered')


*/

/* ------------------- GETTING AND SETTING ATTRIBUTES IN JS --------------------------- */

/*


// element.propertyName only allowesd to read and set the property for the standard attribute like alt,src etc.. for non standard attribute like user defined property we need to use the getAttribute 

const logo =  document.querySelector('.nav__logo');
console.log(logo.alt); // to get its standarad attribute
console.log(logo.className);

//to set the attribute
logo.alt = "Beautiful logo"

//NON STANDARD attributes

console.log(logo.designer); //gives undefind bcz it doen't fall under standard att
console.log(logo.getAttribute('designer')); // will work bcz used getAttribute method
 
// To  create and set non standard attribute.
logo.setAttribute('company','Bankist');


// In case of getting image attribute and link attributes it gives the absolute path so to get the reletive path(only filename not whole path) we need to use the getAttribute method

console.log(logo.src);
console.log(logo.getAttribute('src')); //gives reletive path (releted to file)

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use
logo.clasName = 'jonas';

//always use classList to add the classes (u can also add multiple classes)

*/

/* ------------------- IMPLIMENTING SMOOTH SCROLLING --------------------- */

/*

// two ways to implementing the smooth scrolling is 1st old way---requires calculation , 2nd new way -- just requires one method


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 =document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(e){

  //this here is releted to whole window bcz we have not specified the element like we did down
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  //target is here the btn bcz event is occuring on that .
  //and the output it will generate is according to the position of btn
  console.log(e.target.getBoundingClientRect());

  //current scroll position gives the position(basically difference) of currently scroll position to the top (means suppose from the top u have scrolled down litte bit so it will give diffrence from that scrolled point to the top). and the properties we used here comes under window object.

  console.log("Current scroll (X/Y) : " , window.pageXOffset, window.pageYOffset);

  // To get the height and width of view Port (window object or u can say root element) we use document.documentElement.clientxxxx property ... note - it also give output reletive to viewport

  console.log('Height/Width viewport : ' , document.documentElement.clientHeight,document.documentElement.clientWidth);

  //Actual scrolling effect

  //window.scrollTo() is used to scroll to specified position .. it has 3 parameter top-which specifies the position from the top we have to scroll to , left - position from left we have to scroll to and behavior - smooth,instant,auto(defalut)..but this method is also reletive to view port so for that we have to add the current top + current scroll 

  //this stmt will not work if u wish to add behavior to this for that u will have to use object like below
  // window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top+window.pageYOffset)

  // to implement smooth scrolling we need to specify the object with left, top and behavior
  // window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });

  //modern way of scrolling where no calculation is needed and we just need to specify the part we need to scroll and on that call the scrollIntoView and pass object with property behaviour if you need behaviour.

  section1.scrollIntoView({behavior:'smooth'});  // this works in our browser bcz it is modern

})


*/

/* ----------------------- Types of Events and Event handlers ----------------------------- */

// there are many types of event handlers that u can learn from mdn .. but most important once are key event listeners and mouse event listener ..for each event there is onxxxx event method for that but no body uses it.

/*

const h1 = document.querySelector('h1')

const aleartH1 = function(e){
  alert('adventlistener ! Great you are raeding the heading.')
  h1.removeEventListener('mouseenter',aleartH1) // this is how we use remove eventListener
}

h1.addEventListener('mouseenter',aleartH1)

// you can also remove eventlistener like this..
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);


// h1.onmouseenter = function(e){
//   alert('adventlistener ! Great you are raeding the heading.')
// }

*/

/* ---------------------------------- EXAMPLE OF BUBBLING ------------------------------ */

/*

// Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // returns true

  // Stop propagation
  // e.stopPropagation();
});

// e.target is used to know the position of event occurance , e.currenttraget to know which element
//this keyword always points to the element on which the eventListenr is attached see the line e.currentTarget === this


document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});


document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
},false); //false is defalut (de propagation is not active here)

// Theory for above--

// here basically when you clicked on 1 button it will change the color of all elements like nave_link nave_links , nav .. bcz the event is occured at the document object it reach to the target phase and then again it goes up to the bubbling phase(see the image) and as we know that the event is passed through its all the parent element thats why the color changes here ... now here basically we are using the same event in all 3 function.. so 1st the event catched and performed in .nav_link(its a class that we have selcted using querySelector) and that event is passed through its parent element that is .nav_links(its a class) and at there the same action is peformed on that .. from there also the same event object is passed to the .nav(its a class)  and the same action is peformed in its addEventListene function .. this is all possible bcz of bubbling so same event is from its target goes up throgh its parent to bubbling phase.. this is also call as propagation. // to Stop propagation use e.stopPropagation();

// capturing phase is opposite of bubbling phase it is achived setting the third parameter to true (default is false) so in this it basically if u click anywhere in .nav then it will change the color of .nav_links and .nav_link as well but generally this depropagation is not used 

*/


/* ----------------------- TRAVERSING DOM IN JS -------------------------- */

/*

const h1 = document.querySelector('h1');


// Going downwords : child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);  // give all direct child nodes
console.log(h1.children); // give all elements of child nodes

//Going upwords: parent
console.log(h1.parentNode);
console.log(h1.parentElement);

//closet will select the element that u passed into method and it return the closest parent elemnt of the element on which u called closset .. below it will give closest parent of h1 .. this is opposite to querySelector

console.log(h1.closest('.header'));

h1.closest('.header').style.background = 'var(--gradient-secondary)';


// Going sideways:sibilings 
//js only allows to get direct sibiling element 

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

//or

console.log(h1.previousSibling);
console.log(h1.nextSibling);

//or

console.log(h1.parentElement.children);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});


*/

/* --------------------  THE INTERSECTION OBSERVER API DEMO EXAMPLE ------------------- */

/*

const obsCallbackFunc = function(entries,observer){

  //entries here is a threshold entry 
  entries.forEach(entry => {
    console.log(entry);
  })
}

const obsOptions = {
  root:null , // this will acts as a whole window
  threshold:[0,0.2]  // 10 % threshold and it can also have array of threshold ..in this example if u use 0.5 thre then it wan't give ouput bcz at 0.5 there is no element like h1 or anything else to intersect.. if u pass 0 means the callback function will be tregered when the target element moves completely out of the view and also as soon as it enters the view (in this example if it passes the section line)
  //the callback function will execute everyTime when the threshold is moves into theview and out of the view as well
}

const observer = new IntersectionObserver(obsCallbackFunc, obsOptions);
observer.observe(section1);  // it means when section1 intersect to viewport at 10% of threshold then do the task given in callback function

*/


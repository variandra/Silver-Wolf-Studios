

// Fade and Slide //
const items = document.querySelectorAll('.item');


const options = {
  threshold: 0.4
}

function addSlideIn(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in');
    }
  });
}

const observer = new IntersectionObserver(addSlideIn, options)

items.forEach(item => {
  observer.observe(item);
})


// Image carousel // 
const images = document.querySelectorAll('#img-carousel img');
const previousImage = document.getElementById("prev");
const nextImage = document.getElementById("next");


let currentIndex = 0;

function reset() {
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove('active');
    }
}

function initializeSlider() {
  reset();
  images[currentIndex].classList.add('active');
}

function slideLeft() {
  reset();
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  images[currentIndex].classList.add('active');
}
  
function slideRight() {
  reset();
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  images[currentIndex].classList.add('active');
}
// some funny jank here when not on a page that has a img carousel so i have to make it check if the page has one on load
window.onload = checkSlider()
function checkSlider(){
  if (images.length > 0){
  initializeSlider();

previousImage.addEventListener('click', function() {
  slideLeft();
});

nextImage.addEventListener('click', function() {
  slideRight();
});
  }
}



// commision form validation

const form = document.getElementById('commision_form');
const submitButton = document.getElementById('commisions_submit');
const successMessage = document.getElementById('commision_submitted_success');

const formElements = [...form.elements];
console.log(form);
console.log(formElements);
console.log(formElements);



function allInputsValid() {
  const valid = formElements.every((element) => {
    if(element.nodeName !== 'BUTTON'){
      return element.checkValidity()
    }else {
      return true;
    };
  });

  return valid;

}


function handleBlur(e) {
  const element = e.target;

  if (!element.checkValidity() && element.nodeName !== 'BUTTON'){
    element.style.borderColor = 'red';
  }
  if (element.checkValidity()  && element.nodeName !== 'BUTTON'){
    element.style.borderColor = 'green';
  }
  if(allInputsValid()){
    submitButton.removeAttribute('disabled', '');
  }else {
    submitButton.setAttribute('disabled', '');
  }
}


function handleSubmit(e) {
  e.preventDefault();

  if (allInputsValid()){
    successMessage.style.display = 'block';
    form.reset();
    submitButton.setAttribute('disabled', '');
    
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
  }
}
formElements.forEach((element) => {
  if (element.nodeName !== 'BUTTON') // i dont think this is needed because u cant blur a button
  element.addEventListener('blur', (e) => handleBlur(e));
});
form.addEventListener('submit', (e) => handleSubmit(e));
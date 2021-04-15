'use strict'

const gallery = document.getElementById('gallery');
const queryURL = 'https://randomuser.me/api/?results=12&nat=us';
const modalWindow = document.querySelector('.modal-info-container');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modal = document.getElementById('modal');
const card = document.querySelectorAll('.card');



/**
 * Fetch data and dynamically display the employee information
 */
fetch(queryURL)
    .then(res => checkStatus(res))
    .then(res => res.json())
    .then(data => {
        generateCard(data.results);
        generateModal(data.results);

    })
    .catch(error => console.log('Sorry, Looks like we have encountered an error. Please try reloading the page.', error))


    function checkStatus(response){
        if(response.ok){
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

/**
 * Helper functions
 */

 function generateCard(data) {
    const cardHtml = data.map(item => `
    <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${item.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">
          ${item.name.first}
          ${item.name.last}
        </h3>
        <p class="card-text">
          ${item.email}
        </p>
        <p class="card-text cap">
          ${item.location.city}
          ${item.location.state}
        </p>
    </div>
</div>`).join('');
    gallery.insertAdjacentHTML('beforeend', cardHtml);
 
 }
    
     
 

 function generateModal(data) {
     const modalWindow = data.map(item => `<div class="modal-container">
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${item.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="modal-text">${item.email}</p>
            <p class="modal-text cap">${item.location.city}</p>
            <hr>
            <p class="modal-text">${item.cell}</p>
            <p class="modal-text">${item.location.street} 
            ${item.location.city} ${item.location.state} 
            ${item.location.postcode}</p>
            <p class="modal-text">Birthday: ${item.dob.date.slice(0, 10)}</p>
        </div>
    </div>`)
    gallery.insertAdjacentHTML('afterend', modalWindow);
    
 }

 //Event Listeners


    card.forEach((card, i) => {
        card.addEventListener('click', () => {
            generateModal([i]);
        })
    
    })
    
   

 


  

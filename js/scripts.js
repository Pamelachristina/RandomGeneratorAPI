"use strict";

/** 
  * @description this jQuery $.ajax() function makes a call to the Random User Generator API.
*/


$(document).ready(function(){


    $.ajax({
        method:'GET',
        url:'https://randomuser.me/api/?results=12&nat=us',
        dataType: 'json',
        error: function(status){
            console.log(status.statusText);
            $('.gallery').append(errorMessage)
          
        },
        success: function(data){
            let employeeList = data.results;
            createPageLayout(employeeList);
            console.log(data);
            showModal();
            hideModal();
        }   

         
    
    })
    
    /**
     * @description This error message will be appened to the gallery div if the API request fails
     * There is an error function inside of the $.ajax()function
     */
     const errorMessage = 
    `<h1 class='error-message'>Sorry, Looks like we have encountered an error. Please try reloading the page.</h1>`; 


     /**
     * @description This function removes the error message and iterates over the employeeList 
     * and calls the helper functions to create cards and modals for each employee.  
     */
    function createPageLayout(employeeList){
       employeeList.forEach(employee => {
            createCard(employee);
            createModal(employee);
        });
    }
    


    /**
     * @description This function uses string interpolation to insert the employee's info into each card div 
     * @param employee 
     */
    function createCard(employee) {
            $('.gallery').append(`<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">
              ${employee.name.first}
              ${employee.name.last}
            </h3>
            <p class="card-text">
              ${employee.email}
            </p>
            <p class="card-text cap">
              ${employee.location.city}
              ${employee.location.state}
            </p>
        </div>
    </div>`)
   
  }


  /**
     * @description This function uses string interpolation to insert the employee's additional info into the modal 
     * @param employee 
     */

  function createModal(employee) {
    $('.gallery').append(`<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.cell}</p>
            <p class="modal-text">${employee.location.street.number} 
                                  ${employee.location.street.name} 
                                  ${employee.location.city} 
                                  ${employee.location.state} 
                                  ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${formatDate(employee.dob.date.substring(0, 10))}</p>
        </div>
    </div>`)
    $('.modal-container').hide();
    
  
 }

 /**
     * @description This function formats the birthdate as dd/mm/yyyy
     * 
     */


 function formatDate(text){
    const date = new Date(text);
    let month = date.getMonth()
    let day = date.getDate();
    let year = date.getFullYear();
    date.toString('dddd, MMMM, yyyy');
    return `${month} / ${day} / ${year}`;
}

 /**
     * @description This function adds a click event on each card and shows the modal
     * 
     */


 function showModal() {
    $('.card').each(function() {
      $(this).click(function() {
        $(this).next().show();
      });
    });
  }


  /**
     * @description This function adds a click event on the modal close button and hides the modal when clicked
     * 
     */
  

  function hideModal() {
    $('.modal-close-btn').click(function() {
      $('.modal-container').hide();
    });
  }


  
  
 
})








  









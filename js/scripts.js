"use strict";

/**
 * Making an Ajax GET request with jQuery
 */
$.ajax({
    url: 'https://randomuser.me/api/?results=12&inc=picture,name,email,location',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    },
    error : function(request, error)
    {
        alert('Request: '+JSON.stringify(request));
    }
  });
      
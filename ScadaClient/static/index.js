function validateForm() {
    var name = document.forms["submitVar"]["name"].value;
    var comment = document.forms["submitVar"]["comment"].value;
    var address = document.forms["submitVar"]["address"].value;
    var dataType = $("#dataType")[0].textContent;

      if(address<0 || address>65535 || isNaN(address)){
        alert("Wrong adress type")
        return false;
        }
    
  } 
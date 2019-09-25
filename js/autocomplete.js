function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      if(val.length > 1){
        if(arr.length > 3){
          $(".autocomplete-items").css("overflow-x", "scroll");
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("UL");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items list-group");
        /*append the DIV element as a child of the autocomplete container:*/
        document.getElementById("suggestions").append(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("LI");
            b.setAttribute("class", "list-group-item");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
                closeAllLists();
                updateChart(inp.value);
              });
              $("#suggestions").width($("#input-country").width());
              // $("#suggestions").offset($("#input-country").offset());
              a.appendChild(b);
            }
          }
      }
    });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list"); //ul
      if (x) x = x.getElementsByTagName("LI"); //li
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("active");
    // Auto scroll
    var nodes = document.querySelectorAll('li');
    var ul = document.querySelector('ul');
    var elHeight = 50;//$(nodes[currentFocus]).height(); // altezza li 24px
    var scrollTop = $(ul).scrollTop(); //quanto scrollo dal top
    var viewport = scrollTop + $(ul).height(); //punto inizio in px da cui inizio a vedere la lista
    var elOffset = elHeight * currentFocus; //px dei li gia passati di focus

    // console.log('select', currentFocus, ' viewport', viewport, ' elOffset', elOffset);
    if (elOffset < scrollTop || (elOffset + elHeight) > viewport){
      $(ul).scrollTop(elOffset);
    }
    //end autoscroll
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ["Burundi","Comoros","Djibouti","Eritrea","Ethiopia","Kenya","Madagascar","Malawi","Mauritius","Mozambique","Réunion","Rwanda","Seychelles","Somalia","South Sudan","Uganda","United Republic of Tanzania","Zambia","Zimbabwe","Angola","Cameroon","Central African Republic","Chad","Congo","Democratic Republic of the Congo","Equatorial Guinea","Gabon","Sao Tome and Principe","Algeria","Egypt","Libya","Morocco","Sudan","Tunisia","Botswana","Lesotho","Namibia","South Africa","Swaziland","Benin","Burkina Faso","Cabo Verde","Côte d'Ivoire","Gambia","Ghana","Guinea","Guinea-Bissau","Liberia","Mali","Mauritania","Niger","Nigeria","Senegal","Sierra Leone","Togo","Antigua and Barbuda","Aruba","Bahamas","Barbados","British Virgin Islands","Cayman Islands","Cuba","Curaçao","Dominica","Dominican Republic","Grenada","Guadeloupe","Haiti","Jamaica","Martinique","Montserrat","Puerto Rico","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Trinidad and Tobago","Turks and Caicos Islands","United States Virgin Islands","Belize","Costa Rica","El Salvador","Guatemala","Honduras","Mexico","Nicaragua","Panama","Bermuda","Canada","Greenland","Saint Pierre and Miquelon","United States of America","Argentina","Bolivia","Brazil","Chile","Colombia","Ecuador","French Guiana","Guyana","Paraguay","Peru","Suriname","Uruguay","Venezuela","Kazakhstan","Kyrgyzstan","Tajikistan","Turkmenistan","Uzbekistan","China","Hong Kong","Macao","Taiwan","Japan","Mongolia","Republic of Korea","Brunei Darussalam","Cambodia","Indonesia","Lao People's Democratic Republic","Malaysia","Myanmar","Philippines","Singapore","Thailand","Timor-Leste","Viet Nam","Afghanistan","Bangladesh","Bhutan","India","Iran (Islamic Republic of)","Maldives","Nepal","Pakistan","Sri Lanka","Armenia","Azerbaijan","Bahrain","Cyprus","Georgia","Iraq","Iraq (Central Iraq)","Iraq (Kurdistan Region)","Israel","Jordan","Kuwait","Lebanon","Oman","Qatar","Saudi Arabia","State of Palestine","Syrian Arab Republic","Turkey","United Arab Emirates","Yemen","Belarus","Bulgaria","Czechia","Hungary","Poland","Republic of Moldova","Romania","Russian Federation","Slovakia","Ukraine","Denmark","Estonia","Finland","Iceland","Ireland","Latvia","Lithuania","Norway","Sweden","United Kingdom (England and Wales)","United Kingdom (Northern Ireland)","United Kingdom (Scotland)","United Kingdom of Great Britain and Northern Ireland","Albania","Andorra","Bosnia and Herzegovina","Croatia","Greece","Holy See","Italy","Kosovo under UNSCR 1244","Malta","Montenegro","Portugal","San Marino","Serbia","Slovenia","Spain","The former Yugoslav Republic of Macedonia","Austria","Belgium","France","Germany","Liechtenstein","Luxembourg","Monaco","Netherlands","Switzerland","Australia","New Zealand","Fiji","Papua New Guinea","Solomon Islands","Vanuatu","Guam","Kiribati","Micronesia","American Samoa","Samoa","Tonga"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("input-country"), countries);

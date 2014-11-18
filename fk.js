////
// function section
////

var sendFeedback = function (event) {
    event.preventDefault();
    var feedback = this["feedback"].value;
    if (feedback == null || feedback == "") {
        alert("You have to fill the Feedback field");
        return false;
    }
    else {
        alert(feedback);
        closeFeedbackForm();
        return false;
    }
}

var openFeedbackForm = function () {
    form.style.display = "block";
    button.style.display = "none";
}

var closeFeedbackForm = function () {
    form["feedback"].value = "";
    form.style.display = "none";
    button.style.display = "block";
}

////
// DOM section
////

// fk button
var container = document.createElement("DIV");
container.className = "fk-button";
container.style.position = "fixed";
container.style.top = "200px";
container.style.right = "2px";

// button button
var button = document.createElement("DIV");
button.className = "feedback-button";
button.style.position = "relative";
button.style.backgroundColor = "#db4437";
button.style.height = "56px";
button.style.width = "56px";
button.style.borderRadius = "50%";
button.style.boxShadow = "0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)";
button.style.cursor = "pointer";

// button image
var image = document.createElement("IMG");
image.src = "https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/bt_speed_dial_2x.png";
image.style.position = "absolute";
image.style.left = "0";
image.style.top = "0";
image.style.marginLeft = "5px";
image.style.marginTop = "5px";

// feedback form
var form = document.createElement("FORM");
form.method = "post";
form.setAttribute("id","fk-form");
form.style.display = "none";

//input element, text
var i = document.createElement("INPUT");
i.setAttribute("type","textarea");
i.setAttribute("name","feedback");

//input element, Submit button
var s = document.createElement("INPUT");
s.setAttribute("type","submit");
s.setAttribute("value","Submit");

form.appendChild(i);
form.appendChild(s);
form.addEventListener("submit", sendFeedback, false);

// add element to button
button.appendChild(image);
container.appendChild(button);
container.appendChild(form);

// add event on button click
button.addEventListener("click", openFeedbackForm);

// append fk to the document
document.body.appendChild(container);

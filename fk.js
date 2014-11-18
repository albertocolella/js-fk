////
// DOM section
////
var feedback = function(){
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
        container.style.right = "0px";
        button.style.opacity = "0";
        button.style.transform = "rotate(90deg)";
    }

    var closeFeedbackForm = function () {
        form["feedback"].value = "";
        button.style.transform = "rotate(-90deg)";
        button.style.opacity = "1";
        container.style.right = "-248px";
    }
    
    // fk button
    var container = document.createElement("DIV");
    container.className = "fk-button";
    container.style.position = "fixed";
    container.style.top = "200px";
    container.style.right = "-248px";
    container.style.transition = "all 1s ease-in-out";

    // button button
    var button = document.createElement("DIV");
    button.className = "button";
    button.style.position = "relative";
    button.style.backgroundColor = "#db4437";
    button.style.height = "56px";
    button.style.width = "56px";
    button.style.borderRadius = "50%";
    button.style.boxShadow = "0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)";
    button.style.cursor = "pointer";
    button.style.display = "inline-block";
    button.style.opacity = "1";
    button.style.transition = "all 1s ease-in-out";
    button.style.verticalAlign = "top";

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
    form.style.width = "250px";
    form.style.display = "inline-block";
    form.style.textAlign = "center";
    form.style.padding = "1em 0";
    form.style.boxShadow = "0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)";
    form.style.backgroundColor = "#EEE";

    //input element, text
    var i = document.createElement("TEXTAREA");
    i.setAttribute("name","feedback");
    i.style.width = "90%";
    i.style.height = "100px";

    //input element, Submit button
    var s = document.createElement("INPUT");
    s.setAttribute("type","submit");
    s.setAttribute("value","Submit");
    s.style.marginTop = "1em";

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
    if(document.body != null){ 
        document.body.appendChild(container); 
    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.body.onload = feedback();
});
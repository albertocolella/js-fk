////
// DOM section
////
var fdk;

var Feedback = function(settings){
    this.container = {};
    this.form = {};
    this.timing = 3000;
    this.button_shown_at_build = false;
    this.button_shown_after_close = true
    if(settings && settings.hasOwnProperty('timing')){
        this.timing = settings.timing;
    }
    if(settings && settings.hasOwnProperty('button_shown_at_build')){
        this.button_shown_at_build = settings.button_shown_at_build;
    }
    if(settings && settings.hasOwnProperty('button_shown_after_close')){
        this.button_shown_after_close = settings.button_shown_after_close;
    }
};

Feedback.prototype.openFeedbackForm = function () {
    this.container.style.right = "0px";
    if(this.button_shown_at_build){
        this.button.style.opacity = "0";
        this.button.style.transform = "rotate(90deg)";
    }
}

Feedback.prototype.closeFeedbackForm = function () {
    this.form["feedback"].value = "";
    if(this.button_shown_after_close){
        this.button.style.transform = "rotate(-90deg)";
        this.button.style.opacity = "1";
    }
    this.container.style.right = "-248px";
}

Feedback.prototype.sendFeedback = function (event) {
    event.preventDefault();
    var feedback = event.target["feedback"].value;
    if (feedback == null || feedback == "") {
        alert("You have to fill the Feedback field");
        return false;
    }
    else {
        alert(feedback);
        this.closeFeedbackForm();
        return false;
    }
}
    
Feedback.prototype.buildUp = function(){
    // fk button
    this.container = document.createElement("DIV");
    this.container.className = "fk-button";
    this.container.style.position = "fixed";
    this.container.style.top = "200px";
    this.container.style.right = "-248px";
    this.container.style.transition = "all 1s ease-in-out";

    // feedback form
    this.form = document.createElement("FORM");
    this.form.method = "post";
    this.form.setAttribute("id","fk-form");
    this.form.style.width = "250px";
    this.form.style.display = "inline-block";
    this.form.style.textAlign = "center";
    this.form.style.padding = "1em 0";
    this.form.style.boxShadow = "0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)";
    this.form.style.backgroundColor = "#EEE";
    
    this.button = this.buildButton();
    if(!this.button_shown_at_build){
        this.button.style.opacity = "0";
    }
    this.container.appendChild(this.button);
    
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
    
    this.form.appendChild(i);
    this.form.appendChild(s);
    
    this.form.addEventListener("submit", this.sendFeedback.bind(this), false);
    this.container.appendChild(this.form);    
};

Feedback.prototype.buildButton = function(){
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
    
    // add element to button
    button.appendChild(image);
    // add event on button click
    button.addEventListener("click", this.openFeedbackForm.bind(this));
    // this.container.appendChild(button);
    return button;
};

// append fk to the document
Feedback.prototype.appendToBody = function(){
    if(document.body != null){ 
        this.buildUp();
        document.body.appendChild(this.container);        
        setTimeout(function(){           
            this.openFeedbackForm();
        }.bind(this), this.timing);
    }
};

    
var init_feedback = function(){
    // ajax call to get feedback params
    var settings = {
        timing: 2000
    };    
    fdk = new Feedback(settings);
    fdk.appendToBody();
};


document.addEventListener('DOMContentLoaded', function() {
    document.body.onload = init_feedback();
});
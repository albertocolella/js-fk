////
// DOM section
////
var fdk;

var Feedback = function(response){
    this.container = {};
    this.form = {};
    this.settings = {};
    this.settings.timing = 3000;
    this.settings.button_shown_at_build = false;
    this.settings.button_shown_after_close = true;
    this.settings.closing_button_shown = true;
    if(response && response.hasOwnProperty('timing')){
        this.settings.timing = response.timing;
    }
    if(response && response.hasOwnProperty('button_shown_at_build')){
        this.settings.button_shown_at_build = response.button_shown_at_build;
    }
    if(response && response.hasOwnProperty('button_shown_after_close')){
        this.settings.button_shown_after_close = response.button_shown_after_close;
    }
    if(response && response.hasOwnProperty('closing_button_shown')){
        this.settings.closing_button_shown = response.closing_button_shown;
    }
    if(response && response.hasOwnProperty('survey')){
        this.survey = response.survey;
    }
};

Feedback.prototype.openFeedbackForm = function () {
    this.container.style.right = "0px";
    var button_opacity = "0";
    if(this.settings.closing_button_shown){
        button_opacity = "1";
        this.button.addEventListener("click", this.closeFeedbackForm.bind(this));
    }
    this.button.style.opacity = button_opacity;
    this.button.style.transform = "rotate(90deg)";
}

Feedback.prototype.closeFeedbackForm = function () {
    this.form["feedback"].value = "";
    if(this.settings.button_shown_after_close){
        this.button.style.opacity = "1";
    }
    this.button.addEventListener("click", this.openFeedbackForm.bind(this));
    this.button.style.transform = "rotate(-90deg)";
    this.container.style.right = "-248px";
}

Feedback.prototype.sendFeedback = function (event) {
    event.preventDefault();
    console.log(event.target);
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
    if(!this.settings.button_shown_at_build){
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
    this.form.appendChild(this.buildSurvey());
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

Feedback.prototype.buildSurvey = function(){
    if(this.survey && this.survey.hasOwnProperty('options')){
        var div_survey = document.createElement("DIV");
        for(var pos in this.survey.options){
            var opts = this.buildForm(this.survey.options[pos]);
            opts.forEach(function(opt){
                div_survey.appendChild(opt);
            });
        }
        return div_survey;
    }
};
Feedback.prototype.buildForm = function(option){
    var elements = [];
    switch(option.type){
        case 'radio':
            opt = document.createElement("INPUT");
            opt.setAttribute('type', 'radio');
            opt.setAttribute('name', option.id);
            opt.setAttribute('value', option.id);
            opt.setAttribute('id', option.id);
            opt.style.left = "0";
            opt.style.top = "0";
            opt.style.position = "absolute";
            opt.style.opacity = "0";
            label = document.createElement("LABEL");
            label.setAttribute('for', option.id);
            var text = document.createTextNode(option.label);
            label.appendChild(text);
            label.style.cursor = "pointer";
            label.style.backgroundColor = "#D2D2D2";
            label.style.borderRadius = "10px";
            label.style.clear = "both";
            label.style.cssFloat = "left";
            label.style.height = "50px";
            label.style.lineHeight = "50px";
            label.style.margin = "10px auto 10px 10px";
            label.style.width = "200px";
            label.addEventListener("mouseover", function(event){
                event.target.style.backgroundColor = "#818185";
            }, false);
            label.addEventListener("mouseleave", function(event){
                event.target.style.backgroundColor = "#D2D2D2";
            }, false);
            label.addEventListener("click", this.sendFeedback.bind(this), false);
            elements.push(opt);
            elements.push(label);
        break;
        case 'textarea':
        default:
            opt = document.createElement("TEXTAREA");
            opt.setAttribute('type', 'radio');
            opt.setAttribute('name', option.id);
            elements.push(opt);
        break;
    }
    return elements;
};

// append fk to the document
Feedback.prototype.appendToBody = function(){
    if(document.body != null){ 
        this.buildUp();
        document.body.appendChild(this.container);        
        setTimeout(function(){           
            this.openFeedbackForm();
        }.bind(this), this.settings.timing);
    }
};

    
var init_feedback = function(){
    // ajax call to get response
    var response = {
        timing: 2000,
        survey: {
            options: [
                {
                    id: 'abc',
                    label: 'test01',
                    type: 'radio'
                },
                {
                    id: 'def',
                    label: 'test02',
                    type: 'radio'
                },
                {
                    id: 'ghi',
                    label: 'test03',
                    type: 'radio'
                }
            ]
        }
    };    
    fdk = new Feedback(response);
    fdk.appendToBody();
};


document.addEventListener('DOMContentLoaded', function() {
    document.body.onload = init_feedback();
});
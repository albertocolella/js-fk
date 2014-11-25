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
   if(this.settings.button_shown_after_close){
        this.button.style.opacity = "1";
    }
    this.button.addEventListener("click", this.openFeedbackForm.bind(this));
    this.button.style.transform = "rotate(-90deg)";
    this.container.style.right = "-248px";
}

Feedback.prototype.sendFeedback = function (event) {
    var data = this.serializeForm(this.form);
    var request = {};
    request['data'] = data;
    request['url'] = document.URL;
    request = JSON.stringify(request);
    console.log(request);
    alert(request);
    this.closeFeedbackForm();
    return false;
}

Feedback.prototype.serializeForm = function(form) {
	if (!form || form.nodeName !== "FORM") {
		return;
	}
	var i, j, q = [];
	for (i = form.elements.length - 1; i >= 0; i = i - 1) {
		if (form.elements[i].name === "") {
			continue;
		}
		switch (form.elements[i].nodeName) {
		case 'INPUT':
			switch (form.elements[i].type) {
			case 'text':
			case 'hidden':
			case 'password':
			case 'button':
			case 'reset':
			case 'submit':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;
			case 'checkbox':
			case 'radio':
				if (form.elements[i].checked) {
					q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				}						
				break;
			case 'file':
				break;
			}
			break;			 
		case 'TEXTAREA':
			q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
			break;
		case 'SELECT':
			switch (form.elements[i].type) {
			case 'select-one':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;
			case 'select-multiple':
				for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
					if (form.elements[i].options[j].selected) {
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
					}
				}
				break;
			}
			break;
		case 'BUTTON':
			switch (form.elements[i].type) {
			case 'reset':
			case 'submit':
			case 'button':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;
			}
			break;
		}
	}
	return q.join("&");
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
    this.form.appendChild(this.buildSurvey());
    this.form.onsubmit = function(){
        this.sendFeedback();//.bind(this)
        return false;
    }.bind(this);
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
            var opt = document.createElement("INPUT");
            opt.setAttribute('type', 'radio');
            opt.setAttribute('name', option.group+"["+option.id+"]");
            opt.setAttribute('value', option.id);
            opt.setAttribute('id', option.id);
            opt.setAttribute('class', 'option '+option.group);
            opt.style.left = "0";
            opt.style.top = "0";
            opt.style.position = "absolute";
            opt.style.opacity = "0";
            opt.addEventListener("click", function(){
                e.preventDefault();
                opt.checked = true;
                this.form.onsubmit.call(this.form)
                return false;
            }.bind(this), false);
            var label = document.createElement("LABEL");
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
            label.addEventListener("click", function(e){
                e.preventDefault();
                // group_elements = document.getElementsByName(option.group+"[]");
                group_elements = document.getElementsByClassName(option.group);
                for(var i=0; i<group_elements.length; i++){
                    group_elements[i].checked = false;
                }
                opt.checked = true;
                this.form.onsubmit.call(this.form)
                return false;
            }.bind(this), false);
            elements.push(opt);
            elements.push(label);
        break;
        case 'submit':
            //input element, Submit button
            var s = document.createElement("INPUT");
            s.setAttribute("type","submit");
            s.setAttribute("value","Submit");
            s.style.marginTop = "1em";
            elements.push(s);
        break;
        case 'textarea':
        default:
            var opt = document.createElement("TEXTAREA");
            opt.setAttribute('name', option.group+"["+option.id+"]");
            opt.style.width = "90%";
            opt.style.height = "100px";
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
                    type: 'radio',
                    group: 'opts'
                },
                {
                    id: 'def',
                    label: 'test02',
                    type: 'radio',
                    group: 'opts'
                },
                {
                    id: 'ghi',
                    label: 'test03',
                    type: 'radio',
                    group: 'opts'
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
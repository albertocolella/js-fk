////
// DOM section
////
var fdk;
var api_url = 'http://fk.patrizio.me/api';
var Feedback = function(response){

  console.log('hwwww', response);
  if(typeof response == 'string'){
    response = JSON.parse(response);
  }
  this.container = {};
  this.form = {};
  this.response = {};
  this.settings = {};
  this.settings.timing = 3000;
  this.settings.button_shown_at_build = false;
  this.settings.button_shown_after_close = true;
  this.settings.closing_button_shown = true;
  if(response){
    if( response.hasOwnProperty('form')){
      this.response_form = response.form;
    }
    if( response.hasOwnProperty('settings')){
      if(this.response.settings.hasOwnProperty('timing')){
        this.settings.timing = this.response.settings.timing;
      }
      if(this.response_form && this.response_form.hasOwnProperty('button_shown_at_build')){
        this.settings.button_shown_at_build = this.response_form.button_shown_at_build;
      }
      if(this.response_form && this.response_form.hasOwnProperty('button_shown_after_close')){
        this.settings.button_shown_after_close = this.response_form.button_shown_after_close;
      }
      if(this.response_form && this.response_form.hasOwnProperty('closing_button_shown')){
        this.settings.closing_button_shown = this.response_form.closing_button_shown;
      } 
    } 
  }  
  return this;
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
};

Feedback.prototype.closeFeedbackForm = function () {
   if(this.settings.button_shown_after_close){
    this.button.style.opacity = "1";
  }
  this.button.addEventListener("click", this.openFeedbackForm.bind(this));
  this.button.style.transform = "rotate(-90deg)";
  this.container.style.right = "-248px";
};

Feedback.prototype.sendFeedback = function (event) {
  var data = this.serializeForm(this.form);
  var request = {};
  request['data'] = data;
  request['url'] = document.URL;
  request = JSON.stringify(request);
  console.log(request);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", api_url + '/feedbacks',true);
  xmlhttp.setRequestHeader("Accept","application/vnd.api+json");
  xmlhttp.setRequestHeader("Content-type","application/vnd.api+json");
  xmlhttp.send(request);
  this.closeFeedbackForm();
  return false;
};

Feedback.prototype.serializeForm = function(form) {
	if (!form || form.nodeName !== "FORM") {
		return;
	}
  var result = {};
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
            result[form.elements[i].name] = JSON.stringify(form.elements[i].value);
            break;
          case 'checkbox':
          case 'radio':
            if (form.elements[i].checked) {
              result[form.elements[i].name] = JSON.stringify(form.elements[i].value);
            }						
            break;
          case 'file':
            break;
        }
			break;
      case 'TEXTAREA':
        result[form.elements[i].name] = JSON.stringify(form.elements[i].value);
        break;
      case 'SELECT':
        switch (form.elements[i].type) {
        case 'select-one':
          result[form.elements[i].name] = JSON.stringify(form.elements[i].value);
          break;
        case 'select-multiple':
          var values = [];
          for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
            if (form.elements[i].options[j].selected) {
              values.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
            }
          }
          result[form.elements[i].name] = JSON.stringify(values.join(''));
          break;
        }
			break;
      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            result[form.elements[i].name] = JSON.stringify(form.elements[i].value);
            break;
        }
			break;
    }
	}
	return result;
};
  
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
  this.buildSurvey(this.form);
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

Feedback.prototype.buildSurvey = function(form){  
  if(this.response_form && this.response_form.hasOwnProperty('fields')){
    submit = false;
    for(var pos in this.response_form.fields){
      field = this.response_form.fields[pos];      
      if(field.type=='submit'){
        submit = true;
      }
      var el = this.buildForm(field);
      form.appendChild(el);
    }
    if(!submit){
      var el = this.buildForm({type:'submit'});
      form.appendChild(el);
    }
  }
  return form;
};

Feedback.prototype.buildForm = function(field){
  var div = document.createElement("DIV");
  switch(field.type){
    case 'radio':
      if(field.elements){
        
        for(var i in field.elements){
          element = field.elements[i];
          var opt = document.createElement("INPUT");
          opt.setAttribute('type', 'radio');
          opt.setAttribute('name', field.id+"["+element.name+"]");
          opt.setAttribute('value', element.value);
          opt.setAttribute('id', field.id+'_'+element.name);
          opt.style.left = "0";
          opt.style.top = "0";
          opt.style.position = "absolute";
          opt.style.opacity = "0";
         /* opt.addEventListener("click", function(){
            e.preventDefault();
            opt.checked = true;
            console.log('click');
            //this.form.onsubmit.call(this.form);
            return false;
          }.bind(this), false);*/
          var label = document.createElement("LABEL");
          label.setAttribute('for', field.id+'_'+element.name);      
          var text = document.createTextNode(element.label);
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
          /*label.addEventListener("mouseover", function(event){
            event.target.style.backgroundColor = "#818185";
          }, false);
          label.addEventListener("mouseleave", function(event){
            event.target.style.backgroundColor = "#D2D2D2";
          }, false);*/
          label.addEventListener("click", function(event){
            event.preventDefault();
            tmp = document.getElementById(event.target.getAttribute('for'));
            var radios = event.target.parentNode.querySelectorAll('input[type=radio]');
            for(var r=0; r<radios.length; r++){
              radios[r].checked = false;
              radios[r].parentNode.style.backgroundColor = "#D2D2D2";
            }
            if(!tmp.checked){
              tmp.checked = true;
              event.target.style.backgroundColor = "#818185";
            } else {
              tmp.checked = false;
              event.target.style.backgroundColor = "#D2D2D2";
            }
            /*// group_elements = document.getElementsByName(field.group+"[]");
            group_elements = document.getElementsByClassName(field.group);
            for(var i=0; i<group_elements.length; i++){
              group_elements[i].checked = false;
            }
            this.form.onsubmit.call(this.form)*/
            return false;
          }.bind(this), false);
          label.appendChild(opt);
          div.appendChild(label);
        }
      }
     // elements.push(label);
    break;
    case 'submit':
      //input element, Submit button
      var opt = document.createElement("INPUT");
      opt.setAttribute("type","submit");
      opt.setAttribute("value","Submit");
      opt.style.marginTop = "1em";
      div.appendChild(opt);
    break;
    case 'textarea':
      var opt = document.createElement("TEXTAREA");
      opt.setAttribute('id', field.id);
      opt.setAttribute('name', field.id);
      opt.style.width = "90%";
      opt.style.height = "100px";
      div.appendChild(opt);
      if(field.label){
        var label = document.createElement("LABEL");
        label.setAttribute('for', field.id);      
        var text = document.createTextNode(field.label);
        label.appendChild(text);
        div.insertBefore(label, opt);
      }
    break;
    case 'text':
    default:
      console.log('field:', field);
      var opt = document.createElement("input");
      opt.setAttribute('type', 'text');
      opt.setAttribute('id', field.id);
      opt.setAttribute('name', field.id);
      div.appendChild(opt);
      if(field.label){
        var label = document.createElement("LABEL");
        label.setAttribute('for', field.id);      
        var text = document.createTextNode(field.label);
        label.appendChild(text);
        div.insertBefore(label, opt);
      }
    break;
  }
  return div;
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
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        fdk = new Feedback(xmlhttp.response);
        fdk.appendToBody();
    }
  };
  xmlhttp.open("GET", api_url + '/forms/this',false);
  xmlhttp.setRequestHeader("Accept","application/vnd.api+json");
  xmlhttp.setRequestHeader("Content-type","application/vnd.api+json");
  xmlhttp.send();
};

document.addEventListener('DOMContentLoaded', function() {
  document.body.onload = init_feedback();
});
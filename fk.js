var container = document.createElement("DIV");
container.className = "feedback-button";

container.style.backgroundColor = "#db4437";
container.style.height = "56px";
container.style.width = "56px";
container.style.borderRadius = "50%";
container.style.boxShadow = "0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)";
container.style.cursor = "pointer";
container.style.position = "fixed";
container.style.top = "200px";
container.style.right = "2px";

var image = document.createElement("IMG");
image.src = "https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/bt_speed_dial_2x.png";
image.style.position = "absolute";
image.style.left = "0";
image.style.top = "0";
image.style.marginLeft = "5px";
image.style.marginTop = "5px";

container.appendChild(image);
container.addEventListener("click", function(){ alert("Hello World!"); });
document.body.appendChild(container);

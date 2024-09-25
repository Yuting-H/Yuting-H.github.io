//This script appends a header element
let header = document.createElement("div");
let backLink = document.createElement("a", "href");

backLink.innerHTML = '<i class="bi bi-arrow-left"></i>';
backLink.href = "../index.html";
backLink.style.marginLeft = "5vw";

header.appendChild(backLink);

header.style.position = "sticky";
header.style.width = "100vw";
header.style.display = "flex";
header.style.top = "0px";
header.style.fontSize = `max(4vh, 20px)`;
header.style.backgroundColor = "white";
header.style.padding = "";

header.style.borderBottom = "1px solid grey";
header.style.boxShadow = "0px 1px 2px 0px grey";

document.body.insertBefore(header, document.body.firstChild);

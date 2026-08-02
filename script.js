// =======================================
// CS INFORMATION v2.1 Premium
// =======================================

const pwContainer = document.getElementById("pwContainer");
const unacademyContainer = document.getElementById("unacademyContainer");
const bothContainer = document.getElementById("bothContainer");
const moviesContainer = document.getElementById("moviesContainer");
const favoriteContainer = document.getElementById("favoriteContainer");
const announcementBox = document.getElementById("announcementBox");
const search = document.getElementById("search");
const themeToggle = document.getElementById("themeToggle");
const toast = document.getElementById("toast");

document.getElementById("year").textContent =
new Date().getFullYear();

let favourites =
JSON.parse(localStorage.getItem("favorites")) || [];

// =========================
// Toast
// =========================

function showToast(text){

toast.innerHTML = text;

toast.style.display = "block";

setTimeout(()=>{

toast.style.display="none";

},2500);

}

// =========================
// Copy Link
// =========================

function copyLink(link){

navigator.clipboard.writeText(link);

showToast("✅ Link Copied");

}

// =========================
// Favourite
// =========================

function addFavourite(name){

if(favourites.includes(name)){

showToast("⭐ Already Added");

return;

}

favourites.push(name);

localStorage.setItem(

"favorites",

JSON.stringify(favourites)

);

showToast("❤️ Added to Favourite");

renderFavourite();

}
// =========================
// Render Cards
// =========================

function createCard(site){

return `

<div class="card">

<div class="status">

${site.status}

</div>

<h3>

${site.name}

${site.recommended ? " ⭐" : ""}

</h3>

<div class="buttons">

<a
class="openBtn"
href="${site.url}"
target="_blank">

Open Website

</a>

<button
class="copyBtn"
onclick="copyLink('${site.url}')">

Copy Link

</button>

<button
class="favBtn"
onclick="addFavourite('${site.name}')">

⭐ Favourite

</button>

</div>

</div>

`;

}

// =========================
// Load Sections
// =========================

function loadCards(){

pwContainer.innerHTML="";

unacademyContainer.innerHTML="";

bothContainer.innerHTML="";

moviesContainer.innerHTML="";

DATA.pw.forEach(

item=>pwContainer.innerHTML+=createCard(item)

);

DATA.unacademy.forEach(

item=>unacademyContainer.innerHTML+=createCard(item)

);

DATA.both.forEach(

item=>bothContainer.innerHTML+=createCard(item)

);

DATA.movies.forEach(

item=>moviesContainer.innerHTML+=createCard(item)

);

announcementBox.innerHTML="";

DATA.announcement.forEach(msg=>{

announcementBox.innerHTML+=`<p>• ${msg}</p>`;

});

}

loadCards();
// =========================
// Favourite Section
// =========================

function renderFavourite(){

favoriteContainer.innerHTML="";

const allSites=[

...DATA.pw,

...DATA.unacademy,

...DATA.both,

...DATA.movies

];

const favSites=allSites.filter(

site=>favourites.includes(site.name)

);

if(favSites.length===0){

favoriteContainer.innerHTML=`

<div class="card">

<h3>No Favourite Yet</h3>

<p>Add your favourite websites by clicking the ⭐ Favourite button.</p>

</div>

`;

return;

}

favSites.forEach(site=>{

favoriteContainer.innerHTML+=`

<div class="card">

<div class="status">

Favourite

</div>

<h3>

${site.name}

</h3>

<div class="buttons">

<a

class="openBtn"

href="${site.url}"

target="_blank">

Open

</a>

<button

class="copyBtn"

onclick="copyLink('${site.url}')">

Copy

</button>

<button

class="favBtn"

onclick="removeFavourite('${site.name}')">

Remove

</button>

</div>

</div>

`;

});

}

function removeFavourite(name){

favourites=favourites.filter(

item=>item!==name

);

localStorage.setItem(

"favorites",

JSON.stringify(favourites)

);

renderFavourite();

showToast("❌ Removed");

}

renderFavourite();

// =========================
// Search
// =========================

search.addEventListener(

"input",

()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".card").forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=

text.includes(value)

? "block"

: "none";

});

}

);
// =========================
// Dark / Light Mode
// =========================

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="light"){

document.body.classList.add("light");

themeToggle.innerHTML="☀️";

}

themeToggle.onclick=()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

localStorage.setItem("theme","light");

themeToggle.innerHTML="☀️";

}else{

localStorage.setItem("theme","dark");

themeToggle.innerHTML="🌙";

}

};

// =========================
// Scroll To Top
// =========================

const scrollBtn=document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

scrollBtn.style.display=

window.scrollY>350

? "block"

: "none";

});

scrollBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// =========================
// Loader
// =========================

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},1200);

});

// =========================
// Console
// =========================

console.log("🚀 CS INFORMATION v2.1 Premium Loaded");

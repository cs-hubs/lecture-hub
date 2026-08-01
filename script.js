/* ===================================
   CS INFORMATION
   Premium Lecture Hub
=================================== */

// ---------- Containers ----------

const pwContainer = document.getElementById("pwContainer");
const unacademyContainer = document.getElementById("unacademyContainer");
const announcementBox = document.getElementById("announcementBox");
const search = document.getElementById("search");

// ---------- Announcement ----------

ANNOUNCEMENTS.forEach(item => {

announcementBox.innerHTML += `

<p>• ${item}</p>

`;

});

// ---------- Card Generator ----------

function createCard(site){

return `

<div class="card">

<h3>

${site.name}

${site.recommended ? "⭐" : ""}

</h3>

<p>

Status :
<strong>${site.status}</strong>

</p>

<div class="buttons">

<a

class="openBtn"

target="_blank"

href="${site.url}">

Open Website

</a>

<button

class="copyBtn"

onclick="copyLink('${site.url}')">

Copy Link

</button>

</div>

</div>

`;

}

// ---------- Load PW ----------

PW.forEach(site=>{

pwContainer.innerHTML += createCard(site);

});

// ---------- Load Unacademy ----------

UNACADEMY.forEach(site=>{

unacademyContainer.innerHTML += createCard(site);

});

// ---------- Copy Link ----------

function copyLink(link){

navigator.clipboard.writeText(link);

alert("Website link copied.");

  }
/* ===================================
   Part 2
   Theme + Search + Loader
=================================== */

// ---------- Theme ----------

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="light"){

document.body.classList.add("light");

themeToggle.innerHTML="☀️";

}

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

localStorage.setItem("theme","light");

themeToggle.innerHTML="☀️";

}else{

localStorage.setItem("theme","dark");

themeToggle.innerHTML="🌙";

}

});

// ---------- Search ----------

search.addEventListener("input",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".card").forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)
? "block"
: "none";

});

});

// ---------- Loader ----------

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

setTimeout(()=>{

loader.style.opacity="0";

loader.style.pointerEvents="none";

loader.style.transition=".5s";

setTimeout(()=>{

loader.style.display="none";

},500);

},800);

});

// ---------- Current Year ----------

const year=document.createElement("small");

year.innerHTML=`<br>© ${new Date().getFullYear()} CS INFORMATION`;

document.querySelector("footer").appendChild(year);
/* ===================================
   Part 3
   Final Features
=================================== */

// ---------- Favourite ----------

let favourites = JSON.parse(localStorage.getItem("favorites")) || [];

document.querySelectorAll(".card").forEach(card => {

    const favBtn = document.createElement("button");

    favBtn.className = "copyBtn";

    favBtn.innerHTML = "⭐ Favourite";

    favBtn.onclick = () => {

        const website = card.querySelector("h3").innerText;

        if (!favourites.includes(website)) {

            favourites.push(website);

            localStorage.setItem(
                "favorites",
                JSON.stringify(favourites)
            );

            alert("Added to Favourite ⭐");

        } else {

            alert("Already in Favourite");

        }

    };

    card.querySelector(".buttons").appendChild(favBtn);

});

// ---------- Scroll To Top ----------

const topBtn = document.createElement("button");

topBtn.innerHTML = "⬆";

topBtn.id = "topButton";

document.body.appendChild(topBtn);

topBtn.style.cssText = `
position:fixed;
right:20px;
bottom:20px;
width:55px;
height:55px;
border:none;
border-radius:50%;
background:#FFD54F;
color:#111;
font-size:22px;
cursor:pointer;
display:none;
box-shadow:0 10px 30px rgba(0,0,0,.25);
z-index:999;
`;

window.addEventListener("scroll",()=>{

topBtn.style.display =
window.scrollY>300
? "block"
: "none";

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ---------- Card Animation ----------

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

document.querySelectorAll(".card").forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(30px)";

card.style.transition=".6s";

observer.observe(card);

});

// ---------- Welcome ----------

console.log("🚀 CS INFORMATION Premium Lecture Hub Loaded");

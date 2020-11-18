AOS.init();

//Navbar Current Items

let navs = document.querySelectorAll(".nav-item > a");
    for (let i = 0 ; i < navs.length - 1 ; i++){

        navs[i].addEventListener("click", function(){
            let corr = document.getElementsByClassName("ativo");
            corr[0].className = corr[0].className.replace(" ativo", "");
            this.className += " ativo";
        })
    }

//Sticky Navbar

let navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;
let prevScroll = window.pageYOffset;
window.addEventListener("scroll", function(){
    if (window.pageYOffset > sticky){
        navbar.classList.add("sticky");
    }
    else {
        navbar.classList.remove("sticky");
    }

    let currentScroll = window.pageYOffset;
    if (prevScroll > currentScroll){
        navbar.classList.remove("page-down");
    }
    else if (prevScroll < currentScroll && currentScroll > 200) {
        navbar.classList.add("page-down");
    }
    prevScroll = currentScroll
})

//Local Storage - Sign In

var players = new Array()
var navSignin = document.getElementById("signIn1")
var footerSignin = document.getElementById("signIn2")

function formSubmit(){
    players = JSON.parse(sessionStorage.getItem("Player"))

    if(players == null)
        players = new Array()

    let user = {
        username:document.getElementById("inputUsername").value,
        password:document.getElementById("inputPassword").value
    }

    players.push(user)

    sessionStorage.setItem("Player", JSON.stringify(players));
    sessionStorage.setItem("Username", players[players.length - 1].username)
    
    
}
if (sessionStorage.getItem("Username") != null) {
    navSignin.innerHTML = "<i class='far fa-user'></i>" + sessionStorage.getItem("Username")
    footerSignin.innerHTML = "<i class='far fa-user'></i>" + sessionStorage.getItem("Username")
}
else {
    navSignin.innerHTML = "<i class='far fa-user'></i>" + "Sign in"
    footerSignin.innerHTML = "<i class='far fa-user'></i>" + "Sign in"
}

let link = document.getElementById("link")
let button = document.getElementById("linkButton")
button.addEventListener("click", function(){
    if (sessionStorage.getItem("Username") != null) {
        link.setAttribute("href", "../jogo/jogo.html")
    }
    else {
        link.setAttribute("href", "signin.html")
    }
})

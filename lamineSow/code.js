const menuHamburger = document.querySelector(".menu-burger");
const navBar = document.querySelector(".navbarG");
        
const rechercheIcon = document.querySelector(".loupe")
const barreRecherche = document.querySelector(".recherche")

const body = document.querySelector("body");


menuHamburger.addEventListener('click', () => {
    navBar.classList.toggle('mobile-menu');
    body.classList.toggle('no-scroll');
});

rechercheIcon.addEventListener('click', () => {
    barreRecherche.classList.toggle('mobile-recherche')
    body.classList.toggle('no-scroll');
});

function ouvrirPage(){
    var a = document.getElementById("search").value;
    
    if (a.toLowerCase() === "black on black"){
            window.open("/blackonblack.html")
        }
    if (a.toLowerCase() === "duo"){
        window.open("/duo.html")
        }
    if (a.toLowerCase() === "duo green lan tern"){
        window.open("/duoGreenLanTern.html")
        }
    if (a.toLowerCase() === "linen"){
        window.open("/linen.html")
        }
    if (a.toLowerCase() === "grey"){
        window.open("/grey.html")
        }
}

document.getElementById("search-icon").addEventListener("click", ouvrirPage);

document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        ouvrirPage();
    }
})


const pages = [
    {name : 'BLACK ON BLACK'},
    {name : 'DUO'},
    {name : 'DUO GREEN LAN TERN'},
    {name : 'LINEN'},
    {name : 'GREY'}
];
const searchinput = document.getElementById('search')

searchinput.addEventListener('keyup' ,function(){
    const input = searchinput.value;
    
    const resultat = pages.filter(item => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()));

    let suggestion ='';

    if(input !=''){
        resultat.forEach(resultatItem => 
            suggestion += `<div class="suggestion">${resultatItem.name}</div>`
        )
    }
    document.getElementById('suggestion').innerHTML = suggestion;
    
})

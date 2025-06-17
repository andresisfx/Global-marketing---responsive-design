const hamburger= document.getElementById('hamburger');
const navLinks= document.getElementById('navLinks')

hamburger.addEventListener('click',function(e){
    e.preventDefault;
    navLinks.classList.toggle('active')
})

const colorbtn= document.getElementById('change-background')
const colors= ['green','red','pink','gray']
let currentColor= 0

colorbtn.addEventListener('click',function(){
    currentColor= (currentColor + 1)% colors.length;
    document.body.style.backgroundColor= colors[currentColor]
})
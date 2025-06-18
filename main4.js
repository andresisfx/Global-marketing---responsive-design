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

fetch('https://jsonplaceholder.typicode.com/users')
 .then(response=>response.json())
 .then(data=>{
    const userDataTable=document.getElementById('userTable');

    data.forEach(user => {
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.number}</td>
        `
        userDataTable.appendChild(row)
    });

 })
 .catch(error=>console.error("an error ocurred fetching API ",error.message));
    


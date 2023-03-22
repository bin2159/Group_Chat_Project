let ul=document.querySelector('ul')
let form=document.querySelector('form')
let input=document.getElementById('msg')
let log=document.getElementById('logout')
log.addEventListener('click',logout)
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    input.value==''?console.log('No Message'):send()
})
window.addEventListener('DOMContentLoaded',get)
async function get(){
    try{
        let promise=await axios.get('http://localhost:3000/chat/users')
        for(let i=0;i<promise.data.length;i++){
            ul.innerHTML+=`<li class="list-group-item" style="background-color:blueviolet;border-radius:12px; color:white">${promise.data[i].name} joined</li>`
        }
        displaymsg()
    }
    catch(err){
        console.log(err)
    }
    
}
async function send(){
    try{
        let data =input.value
        let token=localStorage.getItem('token')
        let promise=await axios.post(`http://localhost:3000/chat/send/`,{data},{headers:{Authorization:token}})
        displaymsg()
    }
    catch(error){
        console.log(error)
    }
}
async function displaymsg(){
    try{
        let promise=await axios.get('http://localhost:3000/chat/msg') 
        console.log(promise)
        for(let i=0;i<promise.data.length;i++){
            ul.innerHTML+=`<li class="list-group-item" style="background-color:blueviolet;border-radius:12px; color:white">${promise.data[i].user.name} : ${promise.data[i].msg}</li>`
            console.log(promise.data[1].msg)
        }
    }
    catch(error){
        console.log(error)
    }
    console.log('displaay')
}
function logout(){
    localStorage.clear()
    window.location.assign('login.html')
}
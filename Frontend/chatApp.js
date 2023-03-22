let ul=document.querySelector('ul')
let form=document.querySelector('form')
let input=document.getElementById('msg')
let log=document.getElementById('logout')
log.addEventListener('click',logout)
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    input.value==''?console.log('No Message'):send()
})
setTimeout(async()=>{ 
    await localstore()
    //location.reload(1); 
}, 5000);
window.addEventListener('DOMContentLoaded',get)
async function get(){
    try{
        console.log('hello')
        let promise=await axios.get('http://localhost:3000/chat/users')
        for(let i=0;i<promise.data.length;i++){
            ul.innerHTML+=`<li class="list-group-item" style="background-color:blueviolet;border-radius:12px; color:#00FD7A">${promise.data[i].name} joined</li>`
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
        input.value=' '
        let token=localStorage.getItem('token')
        await axios.post(`http://localhost:3000/chat/send/`,{data},{headers:{Authorization:token}})
        let promise=await axios.get('http://localhost:3000/chat/lmsg')
        ul.innerHTML+=`<li class="list-group-item" style="background-color:blueviolet;border-radius:12px; color:white">${promise.data.user.name} : ${promise.data.msg}</li>`
    }
    catch(error){
        console.log(error)
    }
}
async function localstore(){
    let promise=await axios.get('http://localhost:3000/chat/msg') 
    localStorage.setItem('data',JSON.stringify(promise))
}
async function displaymsg(){
    try{
        if(localStorage.getItem('data')){
            let promise=localStorage.getItem('data')
            promise=JSON.parse(promise)
            for(let i=0;i<promise.data.length;i++){
            ul.innerHTML+=`<li class="list-group-item" style="background-color:blueviolet;border-radius:12px; color:white">${promise.data[i].user.name} : ${promise.data[i].msg}</li>`
            console.log(promise.data[1].msg)
        }
        }
       else{
        await localstore()
        displaymsg()
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
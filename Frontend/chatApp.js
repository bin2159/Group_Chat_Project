let ul=document.querySelector('ul')
let form=document.querySelector('form')
let input=document.getElementById('msg')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    input.value==''?console.log('No Message'):send()
})
window.addEventListener('DOMContentLoaded',get)
async function get(){
    let promise=await axios.get('http://localhost:3000/chat/users')
    console.log(promise.data[1].name)
    for(let i=0;i<promise.data.length;i++){
        ul.innerHTML+=`<li class="list-group-item" style="background-color:blueviolet;border-radius:12px; color:white">${promise.data[i].name} joined</li>`
    }
}
async function send(){
    let data =input.value
    let token=localStorage.getItem('token')
   let promise=await axios.post(`http://localhost:3000/chat/send/`,{data},{headers:{Authorization:token}})
}
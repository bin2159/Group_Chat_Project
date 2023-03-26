let ul=document.getElementById('list-msg')
let ulm=document.getElementById('list-users')
let ulg=document.getElementById('list-grp')
let sendbtn=document.getElementById('send')
let input=document.getElementById('msg')
let log=document.getElementById('logout')
let createGroup=document.getElementById('group')
let grpcheck=document.querySelector('.form-check')
let token=localStorage.getItem('token')
let groupid=localStorage.getItem('groupid')
document.getElementById('grp-global').addEventListener('click',()=>{
    console.log('hai')
    localStorage.removeItem('data')
    localStorage.setItem('groupid',0)
    groupid=0
    localstore(0)
})
log.addEventListener('click',logout)
createGroup.addEventListener('click',create)
sendbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log('hai')
    input.value==''?console.log('No Message'):send(groupid,input.value)
})
// setTimeout(async()=>{
//     await localstore()
//     location.reload(1); 
// }, 5000);
window.addEventListener('DOMContentLoaded',udisplay)
async function udisplay(){
    try{
        let token=localStorage.getItem('token')
        let promise=await axios.get('http://localhost:3000/chat/users',{headers:{Authorization:token}})
        for(let i=0;i<promise.data.length;i++){
            ulm.innerHTML+=`<li id="${promise.data[i].id}" class="list-group-item" style="background-color:blueviolet;border-radius:12px; color:#00FD7A">${promise.data[i].name} joined</li>`
        }
        displaymsg()
    }
    catch(err){
        console.log(err)
    }
    
}
async function send(groupid,msg){
    try{
        let data ={msg,groupid}
        input.value=' '
        let token=localStorage.getItem('token')
        await axios.post(`http://localhost:3000/chat/send/`,{data},{headers:{Authorization:token}})
        console.log(groupid)
        localstore(groupid)
    }
    catch(error){
        console.log(error)
    }
}
async function localstore(groupid){
    try{
        if(localStorage.getItem('data')==''){
            console.log('local',groupid)
            let local=localStorage.getItem('data')
            local=JSON.parse(local)
            let msgid=local[local.length-1].id
            let promise1=await axios.get(`http://localhost:3000/chat/lastmsgs/?msgid=${msgid}&groupid=${groupid}`)
            let obj=[]
            obj.push(local)
            for(let i=0;i<promise1.data.length;i++){
                if(obj[0].length>=20){
                    obj[0].shift()
                    obj[0].push(promise1.data[i])
                }else{
                    obj[0].push(promise1.data[i])
                }
            }
            localStorage.setItem('data',JSON.stringify(obj[0]))
            console.log('global',groupid)
            displaymsg()
        }
        else{
            let promise=await axios.get(`http://localhost:3000/chat/msg/?groupid=${groupid}`) 
            localStorage.setItem('data',JSON.stringify(promise.data))
            displaymsg()
        }
    }
    catch(error){
        console.log(error)
    }
    
    
}
async function displaymsg(){
    try{
        if(localStorage.getItem('data')){
            let promise=localStorage.getItem('data')
            promise=JSON.parse(promise)
            ul.innerHTML=''
            for(let i=0;i<promise.length;i++){
            ul.innerHTML+=`<li class="list-group-item" style="background-color:blueviolet;border-radius:12px; color:white">${promise[i].user.name} : ${promise[i].msg}</li>`
        }
        }
       else{
        await localstore(0)
       }
    }
    catch(error){
        console.log(error)
    }
}
function logout(){
    localStorage.clear()
    window.location.assign('login.html')
}
async function create(){
    try{
        console.log('hai')
        let token=localStorage.getItem('token')
        let promise=await axios.get('http://localhost:3000/chat/users',{headers:{Authorization:token}})
        ulm.innerHTML=""
        let div=document.createElement('div')
        let btn=document.createElement('button')
        btn.className="btn btn-primary check-btn"
        btn.innerText="Add"
        div.className="form-check"
        div.innerHTML='<input id="grpname" class="form-control" placeholder="Enter Group Name">'
        ulm.appendChild(div)
        for(let i=0;i<promise.data.length;i++){
            let str=String(promise.data[i].name)
            div.innerHTML+=`<li class="list-group-item"style="background-color:blueviolet;border-radius:12px; color:white">
            <input id="${promise.data[i].email}" name="user-list" class="form-check-input" type="checkbox" id=${promise.data[i].name}">
            <label for="${promise.data[i].name}" class="form-check-label" > ${promise.data[i].name}</label></li>`
        }
        ulm.appendChild(btn)
        document.querySelector('.check-btn').addEventListener('click',checkclick)
    }
    catch(err){
        console.log(err)
    }
}
async function checkclick(){
    try{
        let checkbox=document.getElementsByName('user-list')
        let email=[]
        let name=document.getElementById('grpname').value||'GROUP'
        let token=localStorage.getItem('token')
        for(let i=0;i<checkbox.length;i++){
                if(checkbox[i].checked==true){
                    console.log(checkbox[i].id)
                    email.push(checkbox[i].id)
                }
        }
        let promise=await axios.post(`http://localhost:3000/group/create`,{email,name},{headers:{Authorization:token}})
        location.reload(1)
    }
    catch(error){
        console.log(error)
    }
   
}
window.addEventListener('DOMContentLoaded',gdisplay)
async function gdisplay(){
    try{
        let promise=await axios.get(`http://localhost:3000/group/show`,{headers:{Authorization:token}})
        for(let i=0;i<promise.data.length;i++){
            ulg.innerHTML+=`<li id=${promise.data[i].id} name='grp-list' class="list-group-item" style="background-color:blueviolet;border-radius:12px; color:white">${promise.data[i].name}</li>`
        } 
        let groupList=ulg.children
        console.log(groupList)
        for(let i=0;i<groupList.length;i++){
            groupList[i].addEventListener('click',getGroupMsg)
        }
    }
    catch(error){
        console.log(error)
    }
}
async function getGroupMsg(e){
    try{
        console.log('hello')
        localStorage.removeItem('data')
        localStorage.setItem('groupid',e.target.id)
        groupid=e.target.id
        localstore(e.target.id)
    }
    catch(error){
        console.log(error)
    }
}
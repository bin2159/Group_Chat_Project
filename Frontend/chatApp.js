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
let flag=false
let gpid=-1
let gpname=''
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
//     localstore()
//     location.reload(1); 
// }, 5000);
window.addEventListener('DOMContentLoaded',udisplay)
async function udisplay(){
    try{
        let token=localStorage.getItem('token')
        let promise=await axios.get('http://localhost:3000/chat/users',{headers:{Authorization:token}})
        ulm.innerHTML=''
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
        let token=localStorage.getItem('token')
        let promise=await axios.get('http://localhost:3000/chat/users',{headers:{Authorization:token}})
        let promise1=await axios.get(`http://localhost:3000/group/nusers/${gpid}`,{headers:{Authorization:token}})
        ulm.innerHTML=""
        let div=document.createElement('div')
        let btn=document.createElement('button')
        let btn1=document.createElement('button')
        btn.className="btn btn-primary check-btn"
        btn.innerText="Add"
        btn1.className="btn btn-primary change-btn"
        btn1.innerText="Change"
        div.className="form-check"
        div.innerHTML='<input type="text" id="grpname" class="form-control" placeholder="Enter New Group Name"><br><input type="text" id="search" class="form-control" placeholder="Search">'
        ulm.appendChild(div)
        if(!flag){
            for(let i=0;i<promise.data.length;i++){
            div.innerHTML+=`<li class="list-group-item"style="background-color:blueviolet;border-radius:12px; color:white">
            <input id="${promise.data[i].email}" name="user-list" class="form-check-input" type="checkbox" id=${promise.data[i].name}">
            <label for="${promise.data[i].name}" class="form-check-label" > ${promise.data[i].name}</label></li>`
            ulm.appendChild(btn)
            document.querySelector('.check-btn').addEventListener('click',checkclick)
        }
        }
        else{
            document.getElementById('grpname').placeholder='Change group name'
            let promise=await axios.get(`http://localhost:3000/group/users/${gpid}`,{headers:{Authorization:token}})
            for(let i=0;i<promise.data.length;i++){
                div.innerHTML+=`<li name="list-gmem" class="list-group-item"style="background-color:blueviolet;border-radius:12px; color:white">
                <label for="${promise.data[i].name}" class="form-check-label" > ${promise.data[i].name}</label>
                <input id="${promise.data[i].email}" name="admin" type="button" class="btn btn-warning" value="Admin">
                <input id="${promise.data[i].email}" name="delete-btn" type="button" class="btn btn-danger" value="x">
                </li>`
            }
            for(let i=0;i<promise1.data.length;i++){
                div.innerHTML+=`<li name="list-gmem" class="list-group-item"style="background-color:blueviolet;border-radius:12px; color:white">
                <label for="${promise1.data[i].name}" class="form-check-label" > ${promise1.data[i].name}</label>
                <input id="${promise1.data[i].email}" name="add-btn" type="button" class="btn btn-success" value="+"></li>`
            }
            ulm.appendChild(btn1)
            document.querySelector('.change-btn').addEventListener('click',async()=>{
                let name=document.getElementById('grpname').value||'GROUP'
                let uid=0
                let promise=await axios.get(`http://localhost:3000/group/editU/?gpid=${gpid}&uid=${uid}&edit=grp&name=${name}`,{headers:{Authorization:token}})
                location.reload()
            })
        }
        let search=document.getElementById('search')
        search.addEventListener('keyup',async()=>{
            console.log(search.value)
            let data= search.value
            let promise=await axios.get(`http://localhost:3000/chat/susers/?data=${data}`,{headers:{Authorization:token}}) 
            console.log(promise)
        }
        )
        let gmem=document.getElementsByName('list-gmem')
        for(let i=0;i<gmem.length;i++){
            gmem[i].addEventListener('click',async(e)=>{
                let uid=e.target.id
                if(e.target.name=="delete-btn"){
                    let promise=await axios.get(`http://localhost:3000/group/editU/?gpid=${gpid}&uid=${uid}&edit=d`,{headers:{Authorization:token}})
                    flag=true
                    create()
                }
                if(e.target.name=="add-btn"){
                    let promise=await axios.get(`http://localhost:3000/group/editU/?gpid=${gpid}&uid=${uid}&edit=a`,{headers:{Authorization:token}})
                    flag=true
                    create()
                }
                if(e.target.name=='admin'){
                    console.log('hai')
                    let promise=await axios.get(`http://localhost:3000/group/editU/?gpid=${gpid}&uid=${uid}&edit=admin`,{headers:{Authorization:token}})
                    location.reload()
                }
            })
        }  
    }
    catch(err){
        console.log(err)
    }
}
async function checkclick(e){
    try{
        let checkbox=document.getElementsByName('user-list')
        let email=[]
        let name=document.getElementById('grpname').value||'GROUP'
        let token=localStorage.getItem('token')
        for(let i=0;i<checkbox.length;i++){
                if(checkbox[i].checked==true){
                    email.push(checkbox[i].id)
                }
        }console.log(email)
        if(!flag){
            console.log(email)
        let promise=await axios.post(`http://localhost:3000/group/create`,{email,name},{headers:{Authorization:token}})
        console.log(promise)
        }
        // else{
        //     let promise=await axios.patch(`http://localhost:3000/group/edit/${gpid}`,{email,name},{headers:{Authorization:token}})
        //     console.log('>>>>>>>>>',promise)
        // }
        flag=false
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
        console.log(promise.data.admingroup)
        for(let i=0;i<promise.data.admingroup.length;i++){
            ulg.innerHTML+=`<button style="border-radius:100px"><li id=${promise.data.admingroup[i].id} name='grp-list' class="list-group-item" style="background-color:blueviolet;border-radius:100px; color:white">${promise.data.admingroup[i].name}<input type="button" class="btn btn-primary" style="border-radius:100px" value="Edit"><input type="button" class="btn btn-danger" style="border-radius:100px" value="Delete"></li></button>`
        }
        for(let i=0;i<promise.data.group.length;i++){
            ulg.innerHTML+=`<button style="border-radius:100px"><li id=${promise.data.group[i].id} name='grp-list' class="list-group-item" style="background-color:blueviolet;border-radius:100px; color:white">${promise.data.group[i].name}<input type="button" class="btn btn-warning" style="border-radius:100px;" value="Remove"></li></button>`
        } 
        let groupList=ulg.children                                                                                                  
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
        if(e.target.value=='Edit'){
            gpname=e.target.parentElement.innerText
            flag=true
            gpid=e.target.parentElement.id
            create()
        }
        else if(e.target.value=='Delete'){
            let grpid=e.target.parentElement.id
            let promise=await axios.get(`http://localhost:3000/group/delete/?grpid=${grpid}`,{headers:{Authorization:token}})
            location.reload(1)
        }
        else if(e.target.value=='Remove'){
            let grpid=e.target.parentElement.id
            let promise=await axios.get(`http://localhost:3000/group/remove/?grpid=${grpid}`,{headers:{Authorization:token}})
            location.reload(1)
        }
        else{
        localStorage.removeItem('data')
        localStorage.setItem('groupid',e.target.id)
        groupid=e.target.id
        gmdisplay(e.target.id)
        localstore(e.target.id)}
    }
    catch(error){
        console.log(error)
    }
}
async function gmdisplay(id){
    try{
        let grpid=id
        let token=localStorage.getItem('token')
        let promise=await axios.get(`http://localhost:3000/group/users/${grpid}`,{headers:{Authorization:token}})
        ulm.innerHTML=''
        for(let i=0;i<promise.data.length;i++){
            ulm.innerHTML+=`<li id="${promise.data[i].id}" class="list-group-item" style="background-color:blueviolet;border-radius:12px; color:#00FD7A">${promise.data[i].name}</li>`
        }
        displaymsg()
    }
    catch(err){
        console.log(err)    
    }
}

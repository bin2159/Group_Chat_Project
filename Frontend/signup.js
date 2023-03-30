let form=document.getElementById('form')
form.addEventListener('submit',store)
async function store(e){
    e.preventDefault()
    let email=document.getElementById('email').value
    let password=document.getElementById('password').value
    let phone=document.getElementById('phone').value
    let name=document.getElementById('name').value
    let data={
        name:name,
        email:email,
        phone:phone,
        password:password
    }
    try{
        let promise=await axios.post('http://52.201.153.124:3000/user/signup',data)
        console.log(promise)
        if(promise.status==207){
            let label=document.getElementById('lemail')
            label.style.color='red'
            label.innerText=promise.data.message
        }else{
            let tag=document.getElementById('msg')
            tag.style.color='green'
            tag.innerText=promise.data.message 
            setTimeout(()=>{
                window.location.assign('./login.html')
            },1000)
        }
    }
    catch(err){
        console.log(err)
    }
}
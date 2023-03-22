let form=document.getElementById('form')
form.addEventListener('submit',store)
async function store(e){
    e.preventDefault()
    let email=document.getElementById('email').value
    let password=document.getElementById('password').value
    let data={
        email:email,
        password:password
    }
    try{
        let promise=await axios.post('http://localhost:3000/user/login',data)
        if(promise.status==203){
            let label=document.getElementById('lpassword')
            label.style.color='red'
            label.innerText=promise.data.message
        }
        else if(promise.status==208){
            let label=document.getElementById('lemail')
            label.style.color='red'
            label.innerText=promise.data.message
        }
        else{
            let tag=document.getElementById('msg')
            tag.style.color='green'
            tag.innerText=promise.data.message 
            localStorage.setItem('token',promise.data.token)
            setTimeout(()=>{
                window.location.assign('./chatApp.html')
            },1000)
        }
        
    }
    catch(err){
        console.log(err)
    }
}
let logoutBtn=document.getElementById('logout')
let postBtn=document.getElementById('post')
let postUrl="http://localhost:4000/post"

logoutBtn.addEventListener('click', logout)
postBtn.addEventListener('click', post)

//Check if already Logged In
function checkAuthState(){
    state=JSON.parse(sessionStorage.getItem('auth'))
    if (state==null||state==undefined||state==''){
        location.replace('../auth/auth.html')
    }else if(state.token){
        return
    }else{
        location.replace('../auth/auth.html')
    }
}

checkAuthState()

function logout(){
    sessionStorage.removeItem('auth')
    checkAuthState()
}

// Post
function post(){
    const title=document.getElementById('title').value
    const body=document.getElementById('body').value
    const status=document.getElementById('status').value
    if (title.length<3 || !isNaN(title) || title==" "){
        alert("Enter a valid title!")
        return
    }else{
        document.getElementById('title').value=""
        document.getElementById('body').value=""
        document.getElementById('status').value=""
    }
    axios({
        method: 'post',
        url: `${postUrl}`,
        data:{
            title: title,
            body:body,
            status:status
        }
    }).then(response=>{
        console.log(response)
        if(response.status==201){
            alert("Post Added Successful")
        }
        else{
            alert("Something went wrong")
        }
    }).catch(err=>console.log(err))
}
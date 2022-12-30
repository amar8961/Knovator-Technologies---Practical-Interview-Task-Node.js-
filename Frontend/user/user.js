let logoutBtn=document.getElementById('logout')

logoutBtn.addEventListener('click', logout)

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
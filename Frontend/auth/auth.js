function signup()
{
    document.querySelector(".login-form-container").style.cssText = "display: none;";
    document.querySelector(".signup-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector(".button-1").style.cssText = "display: none";
    document.querySelector(".button-2").style.cssText = "display: block";

};

function login()
{
    document.querySelector(".signup-form-container").style.cssText = "display: none;";
    document.querySelector(".login-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    document.querySelector(".button-2").style.cssText = "display: none";
    document.querySelector(".button-1").style.cssText = "display: block";

}

// Start
let UserUrl="http://localhost:4000/users"
let signUpBtn=document.getElementById("sign-up-btn")
let signInBtn=document.getElementById("sign-in-btn")

signUpBtn.addEventListener('click', signUp)
signInBtn.addEventListener('click', signIn)

// Sign up
function signUp(){
    const name=document.getElementById('name-up').value
    const email=document.getElementById('email-up').value
    const password=document.getElementById('pass-up').value
    if (name.length<3 || !isNaN(name) || name==" "){
        alert("Enter a valid name!")
        return
    }
    else if (email.length<5 || email.indexOf('@')==-1){
        alert("Enter a valid email!")
        return
    }
    else if(password.length<4){
        alert("Enter a strong password!")
        return
    }else{
        document.getElementById('name-up').value=""
        document.getElementById('email-up').value=""
        document.getElementById('pass-up').value=""
    }
    axios({
        method: 'post',
        url: `${UserUrl}`,
        data:{
            name: name,
            email:email,
            password:password
        }
    }).then(response=>{
        console.log(response)
        if(response.data[1]==false){
            alert("You already have an account with us! Please Login...")
        }
        else{
            alert("Sign Up Successful")
            // window.location.replace("./index.html");
            document.getElementById('email-in').value=email
        }
    }).catch(err=>console.log(err))
}

// Sign in
function signIn(){
    const email=document.getElementById('email-in').value
    const password=document.getElementById('pass-in').value
    if (email.length<5 || email.indexOf('@')==-1){
        alert("Enter a valid email!")
        return
    }else if(password.length<3){
        alert("Enter a valid password!")
        return
    }
    else{
        document.getElementById('email-in').value=""
        document.getElementById('pass-in').value=""
    }
    let creds={
        email: email,
        password:password
    }
    axios({
        method: 'get',
        url: `${UserUrl}/${JSON.stringify(creds)}`,
    }).then(response=>{
        console.log(response)
        if (response.data.code==2){
            alert("You have entered an Invalid Password!")
        }else if(response.data.code==0){
            alert("Your email is not registered with us!")
        }else if(response.data.code==1){
            alert("Sign In Successful!")
            sessionStorage.setItem('auth', JSON.stringify({token:response.data.token}))
            location.replace('../user/user.html')
        }
    }).catch(err=>console.log(err))
}
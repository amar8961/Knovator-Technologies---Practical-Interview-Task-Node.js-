let logoutBtn=document.getElementById('logout')
let postBtn=document.getElementById('post')
let postUrl="http://localhost:4000/post"
let getUrl="http://localhost:4000/get"
let deleteUrl="http://localhost:4000/delete"

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
            alert("Post Added Successfully")
            showNewUserOnScreen(response.data)
        }
        else{
            alert("Something went wrong")
        }
    }).catch(err=>console.log(err))
}

// DOM
window.addEventListener('DOMContentLoaded', () => {
    get()
})

// Function for Show Data On Screen
function showNewUserOnScreen(post) {
    const parentNode = document.getElementById("list");
    const childHTML = `<li id=${post._id}> ${post.title} - ${post.body} - ${post.status}
                          <button onclick=deletePost('${post._id}')> Delete Post </button>
                       </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

// Get
function get() {
    axios({ 
        method: 'get', 
        url: `${getUrl}`
    }).then(response => {
        console.log(response.data)
        for (var i = 0; i < response.data.length; i++) {
            showNewUserOnScreen(response.data[i]);
          }
        })
        .catch((err) => {
          document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong in .get</h4>";
          console.log(err);
        });
}

// Deleting
function deletePost(postID) {
    axios.delete(`${deleteUrl}/${postID}`)
      .then((response) => {
        console.log(response);
        // for delete data from screen
        removeUserFromScreen(postID);
      })
      .catch((err) => {
        document.body.innerHTML =
          document.body.innerHTML +
          "<h4> Something went wrong in .delete</h4>";
        console.log(err);
      });
  }

// Deleting form Screen
function removeUserFromScreen(postID) {
    const parentNode = document.getElementById("list");
    const childNodeToBeDeleted = document.getElementById(postID);

    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }
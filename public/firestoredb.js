const userDetails = document.querySelector('.userDetails')
const updated = document.querySelector(".buttons .Update");
var x;

function createUserCollection(user){
    firebase.firestore().collection('users')
    .doc(user.uid)
    .set({
        uid:user.uid,
        name:user.displayName,
        points:0,
    })
}

async function getuserInfo(userID){
    if(userID){
    const userInfoSnap = await firebase.firestore()
    .collection('users')
    .doc(userID)
    .get()

const userInfo = userInfoSnap.data()
if(userInfo){
    userDetails.innerHTML = `
    <h3 style="color:white;"> 👋🏻Hey...${userInfo.name}</h3>
    <h3 style="color:white;">Points : ${userInfo.points}</h3>
   
    `
}

}else{
    userDetails.innerHTML = `
    <h3 style="color:white;">Please Login</h3>`
}
}


async function getuserInfoRealtime(userID){
    if(userID){
    const userdocRef = await firebase.firestore()
    .collection('users')
    .doc(userID)
    userdocRef.onSnapshot((doc)=>{
         if(doc.exists){
            const userInfo = doc.data()
            if(userInfo){
                userDetails.innerHTML = `<span class="box">
                <h5 style="color:white;"> Welcome <p style="font-size:35px;font-weight: 800;color:cyan;margin-top:1.5vh;">${userInfo.name}</p></h5>
                <h4 style="color:white;">Your Points : <span style="font-size:35px;font-weight: 800;color:purple;">${userInfo.points}</span></h4>
                </span>             `
                x=userInfo.points;
            }
            
            }
    })


}else{
    userDetails.innerHTML = `
    <h3 style="color:pink;"> <p style="font-size:35px;font-weight: 500;"></h3>`

}

}




function updateUserProfile(e){
    e.preventDefault()
    const userDocRef =  firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)

    
    
    userDocRef.update({
        
        points:x+score(),
        
    })

}

updated.onclick = (event)=>{
    updateUserProfile();
    
}

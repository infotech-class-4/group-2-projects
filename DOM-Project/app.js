


const select=document.querySelector("#users")

const getUsers=()=>{
    return axios.get("https://jsonplaceholder.typicode.com/users");
}

window.addEventListener("load",async ()=>{

    const {data}= await getUsers()

    console.log(data);

    data.forEach((user)=>{

        //console.log(user.name);
const option=document.createElement("option")
option.value=user.id
option.textContent=user.name


select.appendChild(option)
    })

})



select.addEventListener("change",async (e)=>{

   //console.log(e.target.value); 

   const {data}=await getPhotos(e.target.value)
   console.log(data);



})


const getPhotos= (userId)=>{
    return axios.get(`https://jsonplaceholder.typicode.com/albums/${userId}/photos`);
}

/*

<div class="col-lg-6">
<div class="card mb-4">
    <div class="card-body">
       
          
                <h5 class="mt-0">Top-aligned media</h5>
                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
             
                <div class="media">
            <img class="align-self-start mr-3" src="..." alt="Generic placeholder image">
            <div class="media-body">
             </div>
            </div> 

    </div>
    <div class="card-footer">
        FOOTER KISMI
    </div>
</div>
</div>

*/


// Card yapisi






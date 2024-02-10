
const select = document.querySelector("#users");

const container = document.querySelector(".container");


// users icin

const getUsers = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};


// photos icin

const getPhotos = (userId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/albums/${userId}/photos`
  );
};


// posts icin

const getPosts = (userId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts/?userId=${userId}`
  );
};



let allUser = [];


window.addEventListener("load", async () => {
  const { data } = await getUsers();
  allUser = data;

  //console.log(data);

  data.forEach((user) => {
    //console.log(user.name);
    const option = document.createElement("option");

    option.value = user.id;
    option.textContent = user.name;

    select.appendChild(option);
  });
});





select.addEventListener("change", async (e) => {
  //console.log(e.target.value);

  const getFoto = await getPhotos(e.target.value);
  //console.log(getFoto.data);

  const getMess = await getPosts(e.target.value);
  console.log(getMess.data);
  

  createCard(getFoto.data);

});



// Card yapisi



const createCard = (photos) => {
  console.log(photos);

  photos.forEach((photo) => {
    const row = document.createElement("div");

    row.innerHTML = `
        <div class="col-lg-6">
          <div class="card mb-4">
            <div class="card-body">
              <div class="media">
                <div class="imgli d-flex justify-content-between">
                 
                  <img
                    id="img"
                    class="align-self-start mr-3 rounded-circle"
                    src=${photo.thumbnailUrl}
                    alt="Generic placeholder image"
                  />
                  <label for="" class="label"> label gelecek</label>| Bret

                  <i class="fa-regular fa-trash-can del"></i>
                </div>
                <div class="media-body">
                  <img src=${photo.url} alt="" class="img-body" /> 

                  <div>
                    post dan gelen veriler yazilacak
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
            <div>
            <i class="fa-solid fa-thumbs-up like"  onclick="likeTik()" onmouseover="likeHover()" onmouseout="likeHoverOut()" ></i>
              <span id="up">0</span>
              </div>
              <div>
              <i class="fa-solid fa-thumbs-down dislike" style="color:red"></i>
              <span id="down">0</span>
              </div>
              

              <div> 
              <i class="fa-solid fa-comment comment" style="color:pink"></i>
              <span id="comment">0</span>
              </div>

           
            </div>
          </div>
        </div>`;

    container.append(row);
  });
};

let countLike = 0;
const likeTik = () => {
  console.log("tiklandi");

  const likeSpan = document.querySelector("#up");
  likeSpan.textContent = ++countLike;
};

const likeHover = () => {
  const like = document.querySelector(".like");
  like.style.color = "red";
};

const likeHoverOut = () => {
  const like = document.querySelector(".like");
  like.style.color = "black";
};





   

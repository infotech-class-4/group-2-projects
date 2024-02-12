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
    `https://jsonplaceholder.typicode.com/posts/?userId=${userId}/comments`
  );
};



let allUser = [];



window.addEventListener("load", async () => {
  let { data } = await getUsers();
  allUser = data;

  console.log(allUser);

  data.forEach((user) => {
    //console.log(user.name);
    const option = document.createElement("option");

    option.value = user.id;
    option.textContent = user.name;

    select.appendChild(option);
  });
});

console.log(allUser);




select.addEventListener("change", async (e) => {
  //console.log(e.target.value);

  const getFoto = await getPhotos(e.target.value);
  console.log(getFoto.data);

  const getMess = await getPosts(e.target.value);
  console.log(getMess.data);

  createCard(getFoto.data, getMess.data);
});

// Card yapisi

const createCard = (photos, posts) => {
  console.log(photos);
  console.log(posts);
  

  photos.forEach((photo, post) => {
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

                  <i class="fa-regular fa-trash-can del"  onclick="delTik()"></i>
                </div>
                <div class="media-body">
                  <img src=${photo.url} alt="" class="img-body" /> 

                  <div>
                    ${post.body}
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
              <i class="fa-solid fa-thumbs-down dislike" onclick="dislikeTik()" onmouseover="dislikeHover()" onmouseout="dislikeHoverOut()"></i>
              <span id="down">0</span>
              </div>
              

              <div> 
              <i class="fa-solid fa-comment comment" onclick="commentTik()" onmouseover="commentHover()" onmouseout="commentHoverOut()" ></i>
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
  // console.log("tiklandi");

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



let countDislike = 0;
const dislikeTik = () => {
  // console.log('tıkla');

  const dislikeSpan = document.getElementById("down");
  dislikeSpan.textContent = ++countDislike;
};

const dislikeHover = () => {
  const dislike = document.querySelector(".dislike");
  dislike.style.color = "red";
};

const dislikeHoverOut = () => {
  const dislike = document.querySelector(".dislike");
  dislike.style.color = "black";
};



let countComment = 0;

const commentTik = () => {
  // console.log("tık");

  const commentSpan = document.getElementById("comment");
  commentSpan.textContent = ++countComment;
};

const commentHover = () => {
  const comment = document.querySelector(".comment");
  comment.style.color = "red";
};

const commentHoverOut = () => {
  const comment = document.querySelector(".comment");
  comment.style.color = "black";
};


// const delTik = (e)=> {
//   console.log('tık');
  
//   const deleteBtn = document.querySelector(".del")
//   deleteBtn

//   console.log(e.target.parentElement.parentElement);
  
// }
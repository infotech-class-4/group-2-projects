const select = document.querySelector("#users");

const container = document.querySelector(".cont_2");
console.log(container);

// users icin

const getUsers = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

// photos icin

const getPhotos = (albumId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );
};

// posts icin

const getPosts = (userId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts/?userId=${userId}`
  );
};

let allUser = []; 

// ekran yuklenince gelecek veriler
window.addEventListener("load", async () => {
  const { data } = await getUsers();
  console.log(getUsers);

  allUser = data;
  console.log(allUser);

  //console.log(data);

  data.forEach((user) => {
    //console.log(user.name);
    const option = document.createElement("option");

    option.value = user.id;
    option.textContent = user.name;

    select.appendChild(option);
  });
});

// secince card fonksiyonuna sectigimizin photo ve post bilgilerini gonderme

select.addEventListener("change", async (e) => {
  //console.log(e.target.value);

  const getFoto = await getPhotos(e.target.value);
  // console.log(getPhotos);
  // console.log(getFoto);
  // console.log(getFoto.data);

  const getMess = await getPosts(e.target.value);
  //console.log(getMess.data);

  const userId = e.target.value;

  createCard(getFoto.data, getMess.data, userId);
});

// Card yapisi

const createCard = (photos, mess, userId) => {
  container.innerHTML = "";
  //console.log(photos);
  console.log(mess);

  const findIndexUser = allUser.findIndex((user) => user.id == userId);
  //console.log(findIndexUser);

  let postIndex = 0;

  photos.forEach((photo, index) => {
    // iconlarin countlarinin ve hover renklerinin degismesi icin

    let likeBtnId = `likeBtn_${index}`;
    let likeSpanId = `likeSpan_${index}`;
    let countLike = 0;

    // console.log(likeBtnId);

    let disLikeBtnId = `disLikeBtn_${index}`;
    let disLikeSpanId = `disLikeSpan_${index}`;
    let countDislike = 0;
    //console.log(disLikeBtnId);

    let commentBtnId = `commentBtn_${index}`;
    let commentSpanId = `commentSpan_${index}`;
    let countComment = 0;

    let delBtnId = `delBtn_${index}`;

    if (postIndex == mess.length) {
      postIndex = 0;
    }

    const row = document.createElement("div");
    row.className = "row";
    row.style.display="flex"
    row.style.justifyContent="center"
    row.style.alignItems="center"


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
                  <label for="" class="label">${
                    allUser[`${findIndexUser}`].name
                  } |  ${allUser[`${findIndexUser}`].username}</label> 

                  <i class="fa-regular fa-trash-can " id=${delBtnId} ></i>
                </div>
                <div class="media-body mt-3">
                  <img src=${photo.url} alt="" class="img-body w-100" /> 

                  <div class="post">
              ${mess[`${postIndex++}`].body}
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
             <div>
            <i class="fa-solid fa-thumbs-up " id=${likeBtnId}  ></i>
              <span id=${likeSpanId}>0</span>
              </div>
         <div>
              <i class="fa-solid fa-thumbs-down " id=${disLikeBtnId} ></i>
              <span id=${disLikeSpanId}>0</span>
          </div>  
              

            <div>
              <i class="fa-solid fa-comment comment" id=${commentBtnId} ></i>
              <span id=${commentSpanId}>0</span>
            </div>

           
            </div>
          </div>
        </div>`;

    container.appendChild(row);

    //? like
    const likeBtn = document.querySelector("#" + likeBtnId);
    // console.log(likeBtn);

    likeBtn.addEventListener("click", () => {
      const likeSpan = document.querySelector("#" + likeSpanId);
      //console.log(likeSpan);

      likeSpan.textContent = ++countLike;

      likeBtn.style.color = "blue";
    });

    likeBtn.addEventListener("mouseleave", () => {
      likeBtn.style.color = "black";
    });

    //?disLike
    const disLikeBtn = document.querySelector("#" + disLikeBtnId);
    //console.log(disLikeBtn);
    disLikeBtn.addEventListener("click", () => {
      const disLikeSpan = document.querySelector("#" + disLikeSpanId);
      //console.log(disLikeSpan);
      disLikeSpan.textContent = ++countDislike;

      disLikeBtn.style.color = "red";
    });

    disLikeBtn.addEventListener("mouseleave", () => {
      disLikeBtn.style.color = "black";
    });

    //?comment
    const commentBtn = document.querySelector("#" + commentBtnId);

    commentBtn.addEventListener("click", () => {
      const commentSpan = document.querySelector("#" + commentSpanId);
      const promptRequest = prompt("comment");
      if (promptRequest) {
        commentSpan.textContent = ++countComment;
      }
    });
    commentBtn.addEventListener("mouseover", () => {
      commentBtn.style.color = "pink";
    });

    commentBtn.addEventListener("mouseout", () => {
      commentBtn.style.color = "black";
    });

    //?delete
    const delBtn = document.querySelector("#" + delBtnId);
    delBtn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.parentElement.remove();
    });
  });

  // posts.forEach((item,index)=>{
  //   const post=document.querySelector(".post")
  //   post.textContent=item.body
  // })
};

const select = document.querySelector("#users");

const container = document.querySelector(".container");

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

// comment icin

const getComments = (postId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/comments/?postId=${postId}`
  );
};

let allUser = []; // degisiklikler yapmak icin

// ekran yuklenince gelecek veriler
window.addEventListener("load", async () => {
  const { data } = await getUsers();

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
  //console.log(getFoto.data);

  const getMess = await getPosts(e.target.value);
  console.log(getMess.data);

  // const getComment = await getComments(e.target.value);
  // console.log(getComment.data);

  const userId = e.target.value;

  createCard(getFoto.data, getMess.data, userId);
});

// Card yapisi

const createCard = (photos, mess, userId) => {
  console.log(photos);
  console.log(mess);
  // console.log(comment);

  let postIndex = 0;

  photos.forEach((photo, index) => {
    const row = document.createElement("div");
    row.className = "row";

    let likeBtnId = `likeBtn_${index}`;
    let likeSpanId = `likeSpan_${index}`;
    var countLike = 0;

    let dislikeBtnId = `dislikeBtn_${index}`;
    let dislikeSpanId = `dislikeSpan_${index}`;
    var discountLike = 0;

    let commentId = `commentBtn_${index}`;
    let commentSpanId = `commentSpan_${index}`;
    var countComment = 0;

    let trashBtnId = `trashBtn_${index}`;

    if (postIndex == mess.length) {
      postIndex = 0;
    }

    // console.log(likeBtnId);

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
                  <label for="" class="label"> ${
                    allUser[`${userId - 1}`].name
                  } | ${allUser[`${userId - 1}`].username} </label> 

                  <i class="fa-regular fa-trash-can" id=${trashBtnId} ></i>
                </div>
                <div class="media-body mt-3">
                  <img src=${photo.url} alt="" class="img-body w-100" /> 

                  <div class="post" >
                  ${mess[`${postIndex++}`].body}
                  
                  
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
             <div>
            <i class="fa-solid fa-thumbs-up" id=${likeBtnId} ></i>
              <span id=${likeSpanId}>0</span>
              </div>
         <div>
              <i class="fa-solid fa-thumbs-down" id=${dislikeBtnId}></i>
              <span id=${dislikeSpanId}>0</span>
          </div>  
              

            <div>
              <i class="fa-solid fa-comment" id=${commentId}></i>
              <span id=${commentSpanId}>0</span>
            </div>

           
            </div>
          </div>
        </div>`;

    container.append(row);

    const likeBtn = document.querySelector("#" + likeBtnId);

    // console.log(likeBtn);
    likeBtn.addEventListener("click", () => {
      const likeSpan = document.querySelector("#" + likeSpanId);
      // console.log(likeSpan);
      likeSpan.textContent = ++countLike;
      // likeBtn.style.color = "blue";
    });

    likeBtn.addEventListener("mouseover", () => {
      likeBtn.style.color = "blue";
    });

    likeBtn.addEventListener("mouseout", () => {
      likeBtn.style.color = "black";
    });

    const dislikeBtn = document.querySelector("#" + dislikeBtnId);

    dislikeBtn.addEventListener("click", () => {
      const dislikeSpan = document.querySelector("#" + dislikeSpanId);
      // console.log(dislikeSpan);
      dislikeSpan.textContent = ++discountLike;
      // likeBtn.style.color = "blue"
    });

    dislikeBtn.addEventListener("mouseover", () => {
      dislikeBtn.style.color = "red";
    });

    dislikeBtn.addEventListener("mouseout", () => {
      dislikeBtn.style.color = "black";
    });

    const commentTik = document.querySelector("#" + commentId);

    commentTik.addEventListener("click", () => {
      // console.log("tiklandi");
      const commentSpan = document.querySelector("#" + commentSpanId);
      const promptResult = prompt("#" + commentId);

      if (promptResult) {
        commentSpan.textContent = ++countComment;
      }
    });

    commentTik.addEventListener("mouseover", () => {
      commentTik.style.color = "pink";
    });

    commentTik.addEventListener("mouseleave", () => {
      commentTik.style.color = "black";
    });

    const delBtn = document.querySelector("#" + trashBtnId);

    delBtn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.parentElement.remove();
    });

    // mess.forEach((item) => {
    //   const post = document.querySelector(".post");
    //   // console.log(post);
    //   post.textContent = item.body;
    //   // console.log(item.body);
    // });
  });
};

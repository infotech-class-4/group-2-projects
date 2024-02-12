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

  createCard(getFoto.data);
});

// Card yapisi

const createCard = (photos) => {
  console.log(photos);

  photos.forEach((photo, index) => {
    const row = document.createElement("div");
    row.className = "row";

    let likeBtnId = `likeBtn_${index}`;
    let likeSpanId = `likeSpan_${index}`;
    var countLike = 0;

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
                  <label for="" class="label">isim</label>| Bret

                  <i class="fa-regular fa-trash-can del" ></i>
                </div>
                <div class="media-body mt-3">
                  <img src=${photo.url} alt="" class="img-body w-100" /> 

                  <div class="post">
              postdan gelen veri
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
             <div>
            <i class="fa-solid fa-thumbs-up like" id=${likeBtnId}  onmouseover="likeHover()" onmouseout="likeHoverOut()" ></i>
              <span id=${likeSpanId}>0</span>
              </div>
         <div>
              <i class="fa-solid fa-thumbs-down dislike" onclick="disLikeTik()" onmouseover="disLikeHover()" onmouseout="disLikeHoverOut()"></i>
              <span id="down">0</span>
          </div>  
              

            <div>
              <i class="fa-solid fa-comment comment" onclick="commentTik()" onmouseover="commentHover()" onmouseout="commentHoverOut()"></i>
              <span id="comment">0</span>
            </div>

           
            </div>
          </div>
        </div>`;

    container.append(row);

    const likeBtn = document.querySelector("#" + likeBtnId);

    // console.log(likeBtn);
    likeBtn.addEventListener("click", () => {
      const likeSpan = document.querySelector("#" + likeSpanId);
      console.log(likeSpan);
      likeSpan.textContent = ++countLike;
    });

    const delBtn = document.querySelector(".del");
    delBtn.addEventListener("click", (e) => {
      // //console.log(e.target);
      delTik(e.target.parentElement.parentElement.parentElement.parentElement);
      // e.target.parentElement.parentElement.parentElement.parentElement.remove();
    });
  });
};

//delete
const delTik = (card) => {
  card.remove();
};

// const likeTik = (span, countLike) => {
//   // console.log(span.id);
//   let likeBtnId = span.id;
//   console.log(countLike);

//   console.log(likeBtnId);

//   const likeSpan = document.querySelector("#" + likeBtnId);

//   likeSpan.textContent = ++countLike;
// };

const likeHover = () => {
  const like = document.querySelector(".like");
  like.style.color = "blue";
};

const likeHoverOut = () => {
  const like = document.querySelector(".like");
  like.style.color = "black";
};

//disLike
let countDislike = 0;
const disLikeTik = () => {
  console.log("tiklandi");

  const disLikeSpan = document.querySelector("#down");
  disLikeSpan.textContent = ++countDislike;
};

const disLikeHover = () => {
  const like = document.querySelector(".dislike");
  like.style.color = "red";
};

const disLikeHoverOut = () => {
  const like = document.querySelector(".dislike");

  like.style.color = "black";
};

// comment

let countComment = 0;
const commentTik = () => {
  console.log("tiklandi");
  const commentSpan = document.querySelector("#comment");
  const promptResult = prompt("comment");

  if (promptResult) {
    commentSpan.textContent = ++countComment;
  }
};

const commentHover = () => {
  const comment = document.querySelector(".comment");
  comment.style.color = "pink";
};

const commentHoverOut = () => {
  const comment = document.querySelector(".comment");
  comment.style.color = "black";
};

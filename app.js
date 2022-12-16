const jsmediatags = window.jsmediatags;

const userFiles = document.querySelector("#select-file");
const list = document.querySelector(".list");
const player = document.querySelector(".player");
const btns = document.querySelectorAll(".btn");
const plPs = document.querySelector(".pl-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const vol = document.querySelector(".vol");

const musicFiles = [];
let songIndex;

userFiles.addEventListener("change", (e) => {
  console.log(e.target.files);

  const files = e.target.files;

  for (const key in files) {
    if (typeof files[key] === "object") {
      if (musicFiles.includes(files[key])) {
        return;
      } else {
        musicFiles.push(files[key]);
      }
    }
  }

  musicFiles.forEach((el) => {
    console.log(el);
    list.innerHTML += `<p class="track" style="margin: 0; padding: 1em 0; cursor: pointer;" id=${el.name.replaceAll(
      " ",
      "_"
    )}>${el.name}</p><hr />`;
  });

  const track = document.querySelectorAll(".track");
  track.forEach((el) =>
    el.addEventListener("click", (e) => playSong(e.target.id))
  );
});

const playPauseHandler = () => {
  if (player.paused) {
    console.log();
    plPs.innerText = "⏸️";
    player.play();
  } else {
    player.pause();
    plPs.innerText = "▶️";
  }
};

function playSong(str) {
  const name = str.replaceAll("_", " ");
  const selectedSong = musicFiles.filter((file, i) => {
    if (file.name === name) {
      songIndex = i;
      return file;
    }
  })[0];

  player.src = URL.createObjectURL(selectedSong);
  console.log(player);

  console.log(selectedSong);

  if (btns[1].disabled) {
    console.log(this, "ran");
    btns.forEach((el) => (el.disabled = false));
  }

  player.play();
  plPs.innerText = "⏸️";
  disableBtns();
  vol.disabled = false;
  // playPauseHandler();
}

plPs.addEventListener("click", playPauseHandler);

const disableBtns = () => {
  if (Number(songIndex) === 0) {
    prevBtn.disabled = true;
  } else if (Number(songIndex) >= musicFiles.length - 1) {
    nextBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
};

prevBtn.addEventListener("click", () => {
  playSong(musicFiles[songIndex - 1].name);
});

nextBtn.addEventListener("click", () =>
  playSong(musicFiles[songIndex + 1].name)
);

vol.addEventListener("change", (e) => {
  const val = `0.${e.target.value}`;

  if (val !== "0.10") {
    player.volume = val;
  } else {
    player.volume = 1;
  }

  console.log(parseFloat(val).toFixed(2));

  // player.volume = Number(val) === Number("0.10") ? 1 : val;
  // console.log(player.volume);
});

// const addTrackEvent = () => {
// };

// manBtn.addEventListener("click", (e) => {
//   track.paused ? track.play() : track.pause();
//   // console.log(track);
// });

// userFile.addEventListener("change", (e) => {
//   const file = e.target.files[0];

//   console.log(file);

//   const url = URL.createObjectURL(file);

//   track.src = url;

//   track.addEventListener("loadedmetadata", (e) => {
//     console.log(e);

//     // const minutes = track.duration / 60;

//     trackDurationTime.max = track.duration;
//     trackDurationTime.disabled = false;

//     console.log(track.duration);
//   });

//   jsmediatags.read(file, {
//     onSuccess: function (tag) {
//       console.log(tag);

//       const img = tag.tags.picture.data;
//       const format = tag.tags.picture.format;
//       let base64Str = "";

//       for (let i = 0; i < img.length; i++) {
//         base64Str += String.fromCharCode(img[i]);
//       }

//       cover.src = `data:${format};base64,${window.btoa(base64Str)}`;
//       // track.src = file;
//     },
//     enError: function (er) {
//       console.log(er);
//     },
//   });
// });

const jsmediatags = window.jsmediatags;

const userFile = document.querySelector("#select-file");
const cover = document.querySelector(".cover");
const track = document.querySelector(".current-music");

userFile.addEventListener("change", (e) => {
  const file = e.target.files[0];

  const url = URL.createObjectURL(file);

  track.src = url;

  jsmediatags.read(file, {
    onSuccess: function (tag) {
      const img = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64Str = "";

      for (let i = 0; i < img.length; i++) {
        base64Str += String.fromCharCode(img[i]);
      }

      cover.src = `data:${format};base64,${window.btoa(base64Str)}`;
      // track.src = file;
    },
    enError: function (er) {
      console.log(er);
    },
  });
});

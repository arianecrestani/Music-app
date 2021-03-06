console.log("hello");
const client_id = "DpnIFjonzFkfKvqKFbpo8vd3CYn2svLb";
const secret_client = "x28DxmzBzqWXVQDPqN7AI54BhKFEwK5h";
SC.initialize({
  client_id: client_id,
});

const baseUrl = (endpoint) => {
  const baseUrl = "http://api.soundcloud.com";

  return `${baseUrl}/${endpoint}client_id=${client_id}&secret_client=${secret_client}`;
};

const apiRequest = async (endpoint) => {
  return await fetch(baseUrl(endpoint), {})
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const getMusic = (query) => `tracks/?&q=${query}&`;

const textArea = document.getElementById("textArea");


const enterPress = (e) => {
  if (e.key === "Enter") {
  btnHandler();
  }
};
const btnHandler = () => {
  apiRequest(getMusic(textArea.value)).then((json) => updateUi(json));
  imageMain()
};

textArea.addEventListener("keypress", enterPress);

const updateUi = (json) => {
  const player = document.getElementById("player");
  console.log(json);
  player.innerHTML = ''
  json.forEach((element) => {
    // add o elemento do endepoint
    SC.oEmbed(element.uri, { auto_play: true }).then(function (oEmbed) {
      console.log("oEmbed response: ", oEmbed);
      // insertAdjacentHTML()
      player.innerHTML += oEmbed.html; // add html code to a div
    });
  });
};
const imageMain = () => {
    const imgMain = document.getElementsByTagName('img')[0];
    imgMain.src = `./grafit.jpg`;
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("style","background:radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)rgb(238,174,202);")
    textArea.value = "";
    
  }

  
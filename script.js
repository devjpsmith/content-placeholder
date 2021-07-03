const header = document.getElementById('header');
const title = document.getElementById('title');
const excerpt = document.getElementById('excerpt');
const profileImg = document.getElementById('profile_img');
const name = document.getElementById('name');
const date = document.getElementById('date');

const animatedBgs = document.querySelectorAll('.animated-bg');
const animatedBgTexts = document.querySelectorAll('.animated-bg-text');

const minRenderTimeMs = 2400; // I want the animation to play for this amount of time to make the user feel like important things are happening

const user = { };

var sentTime = (new Date()).getTime();

fetch('https://randomuser.me/api')
  .then(res => res.json())
  .then(json => {
    handleUserResponse(json);
    const responseTime = (new Date()).getTime() - sentTime;
    setTimeout(() => getData(), minRenderTimeMs - responseTime);
  })
  .catch(err => console.log(err));

function getData() {
  header.innerHTML = '<img src="./assets//photo-1618889482923-38250401a84e.jpeg" alt="">';
  title.innerHTML = 'Lorem ipsum dolor sit amet.';
  excerpt.innerHTML = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, hic.';
  profileImg.innerHTML = `<img src="${user.avatar}" alt="">`;
  name.innerHTML = user.name;
  date.innerHTML = user.joined;

  animatedBgs.forEach(bg => bg.classList.remove('animated-bg'));
  animatedBgTexts.forEach(bg => bg.classList.remove('animated-bg'));
}
 
function handleUserResponse(json) {
  if (json.results && json.results.length > 0) {
    var profile = json.results[0];
    user.name = (`${profile.name.first} ${profile.name.last}`);
    user.avatar = (profile.picture.large);
    const registered = moment(profile.registered.date);
    user.joined = (registered.format('MMM D, yyyy'));
  }
}
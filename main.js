class Movie {
  constructor(name, png, seats, prices) {
    this.name = name;
    this.png = png;
    this.seats = seats;
    this.prices = prices;
  }
}

class User {
  constructor(name, pass, admin) {
    this.name = name;
    this.password = pass;
    this.is_admin = admin;
  }
}

let is_admin=false;

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([
    new User("admin","123",true)
  ]));
}

// Check if movies exist in local storage
if (!localStorage.getItem('movies')) {
  localStorage.setItem('movies', JSON.stringify([
    new Movie("guardians_of_the_galaxy", "pic/guardians_of_the_galaxy.jpg", [0, 0, 0, 0, 0], 10)
    ,new Movie("Indiana Jones", "pic/indiana_jones.jpg", [0, 0, 0, 0, 0, 0, 0, 0, 0], 12)
    ,new Movie("Harry Potter", "pic/hary_potter.jpg", [0, 0, 0], 15)
    ,new Movie("Transformers", "pic/transformers.jpg", [0, 0, 0], 10)
  ]));
}

function chack()
{
  if(is_admin)
  {
    window.location.href = "add_movie.html";
  }
  else
  {
    alert("not admin");
  }
}
function add_movie() {
  var movies = JSON.parse(localStorage.getItem('movies'));
  let flag = true;

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].name === document.getElementById("name").value) {
      flag = false;
      alert("The movie name already exists.");
    }
    if (movies[i].png === document.getElementById("pic").value) {
      flag = false;
      alert("The image URL already exists.");
    }
  }

  if (flag) {
    let temp = new Movie(
      document.getElementById("name").value,
      document.getElementById("pic").value,
      [0, 0, 0],
      parseFloat(document.getElementById("price").value)
    );
    movies.push(temp);
    localStorage.setItem('movies', JSON.stringify(movies));
    document.getElementById("name").value = "";
    document.getElementById("pic").value = "";
    document.getElementById("price").value = "";
  }
}

function print_all() {
  var movies = JSON.parse(localStorage.getItem('movies'));
  let allMoviesHTML = "";
  for (let i = 0; i < movies.length; i++) {
      allMoviesHTML += generate_movie_HTML(movies[i]);
  }

  document.getElementById("result").innerHTML = allMoviesHTML;
}

function generate_movie_HTML(movie) {
  let html = movie.name;
  html += '<br><img src="' + movie.png + '"><br>';
  return html;
}


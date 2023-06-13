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

let is_admin = false;
let user_index = -1;

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([
    new User("admin", 123, true)
  ]));
}

// Check if movies exist in local storage
if (!localStorage.getItem('movies')) {
  localStorage.setItem('movies', JSON.stringify([
    new Movie("guardians_of_the_galaxy", "pic/guardians_of_the_galaxy.jpg", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 10)
    ,new Movie("Indiana Jones", "pic/indiana_jones.jpg", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 12)
    ,new Movie("Harry Potter", "pic/hary_potter.jpg", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 15)
    ,new Movie("Transformers", "pic/transformers.jpg", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 10)
  ]));
}

function login() {
  var users = JSON.parse(localStorage.getItem('users'));
  let flag = true;
  user_index = -1;
  is_admin = false; 

  for (let i = 0; i < users.length; i++) {
    if (users[i].name === document.getElementById("user_name").value) {
      if (users[i].password === document.getElementById("user_pass").value) {
        flag = false;
        user_index = i;
        is_admin = users[i].is_admin;
      } else {
        alert("Password error");
        flag = false;
      }
    }
  }
  if (flag) {
    alert("The user doesn't exist. Try adding a new user.");
  }
}

function add_user() {
  var users = JSON.parse(localStorage.getItem('users'));
  var name = document.getElementById("user_name").value;
  var password = document.getElementById("user_pass").value;

  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name) {
      alert("Username already exists. Please choose a different username.");
      return;
    }
  }

  var newUser = new User(name, password, false);

  users.push(newUser);

  localStorage.setItem('users', JSON.stringify(users));

  document.getElementById("user_name").value = "";
  document.getElementById("user_pass").value = "";

  alert("User added successfully!");
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
  for (let i = 0; i < movies.length; i++) {
      
      let a =document.createElement("a");

      const createButton = document.createElement('button');
      createButton.id = i;
      createButton.innerHTML = "order tickets";
      
      a.appendChild(createButton)
      a.href = "movie.html"
      document.getElementById("result").innerHTML += generate_movie_HTML(movies[i]);
      document.getElementById("result").appendChild(a);
      document.getElementById("result").innerHTML +="<br><br><br>"
  }
}

function generate_movie_HTML(movie) {
  let html = movie.name;
  html += '<br><img src="' + movie.png + '"><br>';
  return html;
}


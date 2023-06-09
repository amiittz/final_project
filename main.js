class Movie {
    constructor(seats, name, png,p) {
      this.name = name;
      this.png = png;
      this.seats = seats;
      this.prices =p;
    }
    get_name()
    {
      return this.name;
    }
    get_pic()
    {
      return this.prices;
    }
    print() {
      let ans = this.name;
      ans += '<br><img src="' + this.png + '"><br>';
      document.getElementById("result").innerHTML = ans;
    }
}

class User{
  constructor(name,pass){
    this.name=name;
    this.password=pass;
  }
}

class Admin extends User{
  constructor(name, pass) {
    super(name, pass);
  }
}
let movies=[new Movie([0,0,0], "guardians_of_the_galaxy", "pic/guardians_of_the_galaxy.jpg",10)]
let movie_len=1;
function add_movie(){
  let flag=true;
  for(let i=0;i<movie_len;i++)
  {
    if(movies[i].get_name==document.getElementById("name").value)
    {
      flag=false;
      alert("the name of the movie already exists");
    }
    if(movies[i].get_pic==document.getElementById("pic").value)
    {
      flag=false;
      alert("the pic path already exists");
    }
  }
  if(flag)
  {
    temp = new Movie(document.getElementById("name").value,document.getElementById("pic").value,document.getElementById("price").value)
    movies+=temp;
    movie_len+=1;
  }
}

function lol()
{
  alert(movie_len)
}

function print_all()
{
  movies[0].print();
  for(let i=0;i<movie_len;i++)
  {
    movies[i].print();
  }
}
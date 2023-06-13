// Declare arr array outside the event listener function
let arr = [];

document.addEventListener("DOMContentLoaded", function() {
    let i = localStorage.getItem("selectedMovie");
    var movies = JSON.parse(localStorage.getItem('movies'));
    let selectedMovie = movies[i];
    
    // Update the content of the "name" element with the movie name
    document.getElementById("name").innerHTML = selectedMovie.name;
    document.getElementById("movieImg").src = selectedMovie.png;
    document.getElementById("price").innerHTML += selectedMovie.prices;
    
    arr = selectedMovie.seats; // Assign the seats array to the outer arr variable
    console.log(arr);
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] == 0) {
            const createButton = document.createElement('button');
            createButton.id = "btn" + index.toString(); // Add a prefix to the id
            createButton.style = " display: inline-block;border-radius: 50%;width: 50px;height: 50px;background-color: white;border: 4px solid #000000;margin:5px;cursor: pointer;";
            document.getElementById("res").appendChild(createButton);
            document.getElementById("btn" + index.toString()).onclick = function() {
                if (document.getElementById("btn" + index.toString()).style.backgroundColor === "white") {
                    document.getElementById("btn" + index.toString()).style.backgroundColor = "green";
                    let sum = parseFloat(document.getElementById("total").innerHTML);
                    sum += parseFloat(selectedMovie.prices);
                    document.getElementById("total").innerHTML = sum;
                    arr[index] = 1; // Update the arr array
                } else {
                    document.getElementById("btn" + index.toString()).style.backgroundColor = "white";
                    let sum = parseFloat(document.getElementById("total").innerHTML);
                    sum -= parseFloat(selectedMovie.prices);
                    document.getElementById("total").innerHTML = sum;
                    arr[index] = 0; // Update the arr array
                }
            };
        } else {
            const createButton = document.createElement('button');
            createButton.id = "btn" + index.toString(); // Add a prefix to the id
            createButton.style = " display: inline-block;border-radius: 50%;width: 50px;height: 50px;background-color: red;border: 4px solid #000000;margin:5px;cursor: not-allowed;";
            document.getElementById("res").appendChild(createButton);
        }

        if (index == 9) {
            const lineBreak = document.createElement('br');
            lineBreak.id = "br";
            document.getElementById("res").appendChild(lineBreak);
        }
    }
});

function orderSeats() {
    let i = localStorage.getItem("selectedMovie");
    var movies = JSON.parse(localStorage.getItem('movies'));
    let selectedMovie = movies[i];
    
    selectedMovie.seats = arr; // Update the seats array in the selectedMovie
    localStorage.setItem('movies', JSON.stringify(movies));
    alert("Seats ordered successfully!");
}


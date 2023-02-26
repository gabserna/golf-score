// inyectar por js desde html lineas 45-57   ?????
// par, hcp  falta


let url = 'http://uxcobra.com/golfapi/course11819.txt';
fetch(url)
  .then(response => response.json())
  .then(data => mostrarData(data))
  .catch(error => console.log(error))

const mostrarData = (data) => {
  let body = "";
  let sum = 0;
  
  for (let i = 0; i < 9; i++) {
    body += `<td>${data.data.holes[i].changeLocations[0].yards}</td>`;
    sum += data.data.holes[i].changeLocations.reduce((total, location) => total + location.yards, 0);
  }  
  body += `<td>${sum}</td>`;
  document.getElementById('data').innerHTML = "<tr><th>Yards</th>" + body + "</tr>";
}






/*


function getAvailableCourses() {
 return fetch('https://golf-courses-api.herokuapp.com/courses/').then(
   function (response) {
     return response.json();
   }
 );
}

const lists = {
 1: {name: 'Shopping list'},
 2: {name: 'Honey do list'},
 3: {name: 'do list'},
}



let courseOptionsHtml = '';
courses.forEach((course) => {
courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
});
document.getElementById('course-select').innerHTML = courseOptionsHtml;





let teeBoxSelectHtml = ''
teeBoxes.forEach(function (teeBox, index) {
   teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
     teeBox.totalYards
   } yards</option>`
});
document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;







class Player {
    constructor(name, id = getNextId(), scores = []) {
      this.name = name;
      this.id = id;
      this.scores = scores;
    }
  }


//notification toastr 
toastr.success(`${playerName}, you are (L)PGA Tour material`);
*/



























/* let url = 'http://uxcobra.com/golfapi/course11819.txt';
        fetch(url)
            .then( response => response.json() )
            .then( data => mostrarData(data) )
            .catch( error => console.log(error) )

            const mostrarData = (data) => {
              //console.log(data)
              let body = "";

                body += `<tr><th>Yards</th>
                <td>${data.data.holes[0].changeLocations[0].yards}</td>
                <td>${data.data.holes[1].changeLocations[0].yards}</td>
                <td>${data.data.holes[2].changeLocations[0].yards}</td>
                <td>${data.data.holes[3].changeLocations[0].yards}</td>
                <td>${data.data.holes[4].changeLocations[0].yards}</td>
                <td>${data.data.holes[5].changeLocations[0].yards}</td>
                <td>${data.data.holes[6].changeLocations[0].yards}</td>
                <td>${data.data.holes[7].changeLocations[0].yards}</td>
                <td>${data.data.holes[8].changeLocations[0].yards}</td>
                <td>XXXX</td></tr>`;
              document.getElementById('data').innerHTML = body;
            } */
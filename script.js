fetch('courses.json')
  .then(response => response.json())
  .then(data => {
    let courses = data.data.course;
    let courseOptionsHtml = '';
    courses.forEach((course) => {
      courseOptionsHtml += `<option value="${course.courseId}">${course.Name}</option>`;
    });
    if (courseOptionsHtml) {
      document.getElementById('course-select').innerHTML = courseOptionsHtml;
    }
    console.log(data);

    let url = courses[0].url;         //   <--- obtener URL

    fetch(url)
      .then(response => response.json())
      .then(data => mostrarData(data))
      .catch(error => console.log(error))
    
      console.log(data)
    
    const mostrarData = (data) => {
      let body = "";
      let parBody = "";
      let hcpBody = "";
      let yardSum = 0;
      let parSum = 0;
      let hcpSum = 0;
      
      for (let i = 0; i < 9; i++) {
        body += `<td>${data.data.holes[i].changeLocations[0].yards}</td>`;
        parBody += `<td>${data.data.holes[i].changeLocations[0].par}</td>`;
        hcpBody += `<td>${data.data.holes[i].changeLocations[0].hcp}</td>`;
        yardSum += data.data.holes[i].changeLocations.reduce((total, location) => total + location.yards, 0);
        parSum += data.data.holes[i].changeLocations.reduce((total, location) => total + location.par, 0);
        hcpSum += data.data.holes[i].changeLocations.reduce((total, location) => total + location.hcp, 0);
      }
      body += `<td>${yardSum}</td>`;
      parBody += `<td>${parSum}</td>`;
      hcpBody += `<td>${hcpSum}</td>`;
      document.getElementById('table-header').innerHTML = `<tr><th>Hole</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>Out</th></tr>`;
      document.getElementById('data').innerHTML = "<tr><th>Yards</th>" + body + "</tr><tr><th>Par</th>" + parBody + "</tr><tr><th>Handicap</th>" + hcpBody + "</tr>";
    }
})
.catch(error => console.log(error));




/*
function getAvailableCourses() {
 return fetch('https://golf-courses-api.herokuapp.com/courses/')
 .then(function (response) {
     return response.json();
   }
 );
}

const lists = {
 1: {name: 'Shopping list'},
 2: {name: 'Honey do list'},
 3: {name: 'do list'},
}








let teeBoxSelectHtml = ''
teeBoxes.forEach(function (teeBox, index) {
   teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.totalYards} yards</option>`
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





























/*
HACER CARATULA PARA ENCABEZADO

"data":{
		"id": "11819",
                    "courseId": 11819,
                    "holeCount": 18,
                    "name": "Thanksgiving Point",
                    "addr1": "599 N Frontage Rd",
                    "city": "Lehi",
                    "stateOrProvince": "UT",
                    "country": "United States",
                    "zipCode": "84043-3506",
                    "phone": "(801)768-4955",
                    "website": "http://www.thanksgivingpoint.org/visit/golf",
                    "thumbnail":
"https://swingbyswing-b9.s3.amazonaws.com/photo/in-round/10112953/uploaded-photo68921726-480x270.png",

*/
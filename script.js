let courses = [];

function getAvailableCourses() {
  return fetch('courses.json')
  .then(response => response.json());
}
//------------------------------------------------
fetch('courses.json')
  .then(response => response.json())
  
  .then(data => {
    courses = data.data.course;
    renderSelectCourse();
    let url = courses[0].url;
    getCourseData(url).then(data => mostrarData(data))
  })
  .catch(error => console.log(error));
//------------------------------------------------

//************************************************************** */
let teeBoxSelectHtml = ''
teeBoxes.forEach(function (teeBox, index) {
   teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.totalYards} yards</option>`
});
document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;

let teeHTML = `
<select class="form-control" id="tee-select" onchange="teeSelect(this.id)">
    <option value="initial">--Select a Tee Box--</option>
`; 

async function getTee(){
    let course;
    try {
        course = await loadCourse();
    }catch (error) {
        console.log(`ERROR: ${error}`);
    };
    console.log(course.data.holes);
    console.log(course.data.holes[0].teeBoxes);
    course.data.holes[0].teeBoxes.forEach(tee => {
        if (tee.teeColorType !== null) {
            teeHTML += `<option value="${tee.teeColorType}">${tee.teeColorType}</option>`
        };
    });
    teeHTML += `</select>`;
    document.getElementById('tee-title').innerHTML = teeHTML;
};

async function teeSelect(clickedId) {
  // populates tee title then calls populate passing it the tee color
  const teeTitle = document.getElementById('tee-title');
  let color = document.getElementById(clickedId).value
  teeTitle.innerHTML = "Tee Box: " + document.getElementById(clickedId).value; 

  let course;
  try {
      course = await loadCourse();
  }catch (error) {
      console.log(`ERROR: ${error}`);
  }
  // loop through holes and create and array of correct teeboxes
  let correctHoles = []
  course.data.holes.forEach(hole => {
      hole.teeBoxes.forEach(box => {
          if (box.teeColorType === color) {
              correctHoles.push({
                  id: box.courseHoleId,
                  name: '',
                  yardage: box.yards,
                  par: box.par,
                  handicap: box.hcp,
              })
          }
      })
  })

  // Llamada a la función renderAPI() con el arreglo correctHoles
  renderAPI(correctHoles);
};



//************************************************************** */
async function renderCourses() {
  const response = await getAvailableCourses();
  courses = response.data.course;
  renderSelectCourse();
  const url = courses[0].url;
  const data = await getCourseData(url);
  mostrarData(data);
}

function renderSelectCourse() {
  const courseSelect = document.getElementById('course-select');
  courseSelect.innerHTML = courses.map(course => `<option value="${course.courseId}">${course.Name}</option>`).join('');
  courseSelect.addEventListener('change', handleOnSelect);
}


function handleOnSelect(event) {
  const selectorId = Number(event.target.value);
  const course = getCourseById(selectorId);
  const url = course.url;
  getCourseData(url).then(data => mostrarData(data));
}
  
function getCourseById(id) {
  return courses.find(course => course.courseId === id);
}


function getUrlForCourse(selectorId) {
  const course = getCourseById(selectorId);

  //return course.url ?? '';
  return course.url;
}


async function getCourseData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const mostrarData = (data) => {
  let body = "";
  let parBody = "";
  let hcpBody = "";
  let yardSum = 0;
  let parSum = 0;
  let hcpSum = 0;

  for (let i = 0; i < 9; i++) {
    const locations = data.data.holes[i].changeLocations;
    for (let j = 0; j < locations.length; j++) {
      body += `<td>${locations[j].yards}</td>`;
      parBody += `<td>${locations[j].par}</td>`;
      hcpBody += `<td>${locations[j].hcp}</td>`;
      yardSum += locations[j].yards;
      parSum += locations[j].par;
      hcpSum += locations[j].hcp;
    }
  }
  
  body += `<th>${yardSum}</th>`;
  parBody += `<th>${parSum}</th>`;
  hcpBody += `<th>${hcpSum}</th>`;
  document.getElementById('table-header').innerHTML = `
    <tr>
      <th>Hole</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>8</th>
      <th>9</th>
      <th>Out</th>
      </tr>
  `;  

  document.getElementById('data').innerHTML = "<tr><th>Yards</th>" + body + "</tr><tr><th>Par</th>" + parBody + "</tr><tr><th>Handicap</th>" + hcpBody + "</tr>";
  document.getElementById('playerData').innerHTML = "<button onclick=\"addPlayers()\">Add Players</button>";
}


function addPlayers() {
  alert("clicked");
}


class Player {
    constructor(name, id = getNextId(), scores = []) {
      this.name = name;
      this.id = id;
      this.scores = scores;
    }
}



/*
//analizar score registro
function golfScore(pars, hits) {
  if (hits == 1) {
    return "Hole-in-one";
  } else if (hits <= pars - 2) {
    return "Eagle";
  } else if (hits == pars - 1) {
    return "Birdie";
  } else if (hits == pars) {
    return "Par";
  } else if (hits == pars + 1) {
    return "Bogey";
  } else if (hits == pars + 2) {
    return "Double Bogey";
  } else if (hits >= pars + 3) {
    return "Go Home!";
  }
}
console.log(golfScore(4, 15));



/*  
//notification toastr 
toastr.success(`${playerName}, you are (L)PGA Tour material`);
*/



/*
HACER CARATULA PARA ENCABEZADO principal

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







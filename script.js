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
    getCourseData(url).then(data => mostrarData(data))   //enviar a tee seleccion luego a mostrarData
  })
  .catch(error => console.log(error));
//------------------------------------------------

//************************************************************** */

// menu de seleccion de golf courses
function handleOnTeeSelect(event) {
  const teeSelector = Number(event.target.value);
  const course = getTeeByColor(selectorId);
  const teeColor = data.holes.teeBoxes.teeColorType;
  getCourseData(url).then(data => mostrarData(data));
}
  
function getTeeByColor(teeColor) {
  return courses.find(course => data.holes.teeBoxes.teeColorType === teeColor);
}


function getUrlForCourse(teeColorType) {
  const course = getTeeByColor(teeColorType);

  //return course.url ?? '';
  return course.teeColorType;
}

/* 

let teeBoxSelectHtml = ''
teeBoxes.forEach(function (teeBox, index) {
   teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.totalYards} yards</option>`
});
document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;



let teeHTML = `
<select class="form-control" id="tee-select" onchange="teeSelect(this.id)">
    <option value="initial">*Choose a Tee Box*</option>
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


//tee selector
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
}; */



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

// menu de seleccion de golf courses
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
  
  // loop through the front nine holes
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
  
  document.getElementById('playerData').innerHTML = "<button onclick=\"addPlayers()\">Add Players</button>";
  body += `<th>${yardSum}</th>`;
  parBody += `<th>${parSum}</th>`;
  hcpBody += `<th>${hcpSum}</th>`;
  document.getElementById('table-header').innerHTML = `<th id="subtitler" colspan="11">Front Holes</th><tr><th>Hole</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>Out</th></tr>`;
  document.getElementById('holes0-9').innerHTML = "<tr><th>Yards</th>" + body + "</tr><tr><th>Par</th>" + parBody + "</tr><tr><th>Handicap</th>" + hcpBody + "</tr>";
  
  let body2 = "";
  let parBody2 = "";
  let hcpBody2 = "";
  let yardSum2 = 0;
  let parSum2 = 0;
  let hcpSum2 = 0;
  
  // loop through the back nine holes
  for (let i = 9; i < 18; i++) {
    const locations = data.data.holes[i].changeLocations;
    for (let k = 0; k < locations.length; k++) {
      body2 += `<td>${locations[k].yards}</td>`;
      parBody2 += `<td>${locations[k].par}</td>`;
      hcpBody2 += `<td>${locations[k].hcp}</td>`;
      yardSum2 += locations[k].yards;
      parSum2 += locations[k].par;
      hcpSum2 += locations[k].hcp;
    }
  }
  
  let totalyards = yardSum + yardSum2;
  let totalpar = parSum + parSum2;
  let totalhcp = hcpSum + hcpSum2;
  
  
  body2 += `<th>${yardSum2}</th>`;
  parBody2 += `<th>${parSum2}</th>`;
  hcpBody2 += `<th>${hcpSum2}</th>`;

  body2 += `<th>${totalyards}</th>`;
  parBody2 += `<th>${totalpar}</th>`;
  hcpBody2 += `<th>${totalhcp}</th>`;

  document.getElementById('table-header2').innerHTML = `<th id="subtitler" colspan="11">Back Holes</th><tr><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>In</th><th>Total</th></tr>`;
  document.getElementById('holes10-18').innerHTML = "<tr>" + body2 + "</tr><tr>" + parBody2 + "</tr><tr>" + hcpBody2 + "</tr>";
}









/* 
function addPlayers() {
  alert("clicked");
}
 */

function addPlayers() {
  const text = document.getElementById('inputBox').value;
  if (text === '') {
    alert('You need to add some text!');
    return false;
  } else {
    document.getElementById('inputBox').value = ''
    showToDo();
    keepRecord();
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







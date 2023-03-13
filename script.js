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








async function renderAPI(correctHoles) {
  // declarations
  const frontHoles = document.getElementById('front-holes');
  const frontYardage = document.getElementById('front-yardage');
  const frontPar = document.getElementById('front-par');
  const frontHandicap = document.getElementById('front-handicap');
  const backHoles = document.getElementById('back-holes');
  const backYardage = document.getElementById('back-yardage');
  const backPar = document.getElementById('back-par');
  const backHandicap = document.getElementById('back-handicap');
  
  let [frontHolesHTML, frontYardageHTML, frontParHTML, frontHandicapHTML] = [
  '<th scope="col">Hole</th>',
  '<th scope="row">Yardage</th>',
  '<th scope="row">Par</th>',
  '<th scope="row">Handicap</th>'
  ];
  let [backHolesHTML, backYardageHTML, backParHTML, backHandicapHTML] = [
  '<th scope="col">Hole</th>',
  '<th scope="row">Yardage</th>',
  '<th scope="row">Par</th>',
  '<th scope="row">Handicap</th>'
  ];
  
  let [outYardage, inYardage, totalYardage, outPar, inPar, totalPar] = [0, 0, 0, 0, 0, 0];
  
  // show the titles
  document.getElementById('front-title').style.display = 'initial';
  document.getElementById('back-title').style.display = 'initial';
  
  try {
  const course = await loadCourse();
  correctHoles.forEach((hole, i) => {
  if (i < 9) {
  frontHolesHTML += <th scope="col">${i + 1}</th>;
  frontYardageHTML += <td>${hole.yardage}</td>;
  frontParHTML += <td>${hole.par}</td>;
  frontHandicapHTML += <td>${hole.handicap}</td>;
  outYardage += hole.yardage;
  outPar += hole.par;
  totalYardage += hole.yardage;
  totalPar += hole.par;
  } else {
  backHolesHTML += <th scope="col">${i + 1}</th>;
  backYardageHTML += <td>${hole.yardage}</td>;
  backParHTML += <td>${hole.par}</td>;
  backHandicapHTML += <td>${hole.handicap}</td>;
  inYardage += hole.yardage;
  inPar += hole.par;
  totalYardage += hole.yardage;
  totalPar += hole.par;
  }
  });
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }

  frontHoles.innerHTML = frontHolesHTML + `<th scope="col">Out</th>`;
  frontYardage.innerHTML = frontYardageHTML + `<td>${outYardage}</td>`;
  frontPar.innerHTML = frontParHTML + `<td>${outPar}</td>`;
  frontHandicap.innerHTML = frontHandicapHTML + `<td></td>`;
  backHoles.innerHTML = backHolesHTML + `<th scope="col">In</th><th scope="col">Total</th>`;
  backYardage.innerHTML = backYardageHTML + `<td>${inYardage}</td><td>${totalYardage}</td>`;
  backPar.innerHTML = backParHTML + `<td>${inPar}</td><td>${totalPar}</td>`;
  backHandicap.innerHTML = backHandicapHTML + `<td></td><td></td>`;

}

let frontBody = document.getElementById('front-body');
let backBody = document.getElementById('back-body');
class Player {
  constructor(id, scores, playerNum) {
      this.name = `<input id="${playerNum + 'Input'}" class="player-input form-control" type="text" placeholder="Name" onchange="updateName(this)">`;
      this.id = id;
      this.scores = scores;
      this.playerNum = playerNum;
      this.frontHTML = '';
      this.backHTML = '';
  }
}

function renderPlayers() {
  frontBody.innerHTML = '';
  backBody.innerHTML = '';
  players.forEach(player => {
      let playerOut = 0;
      let playerIn = 0;
      let playerTotal = 0;
      player.frontHTML = `<tr><th id="${player.playerNum + 'name'}" class="player-score" scope="row">${player.name}</th>`
      player.backHTML = `<tr><th id="${player.playerNum + 'name'}" class="player-score" scope="row">${player.name}</th>`
      for (let i = 0; i < 18; i++) {
          if (i < 9) {
              player.frontHTML +=  `<td id="s${i + 1}" class="player-score"><input id="${player.playerNum + String(i)}" class="number-input form-control" type="number" value="${player.scores[i]}" onchange="addScore(this)"></td>`;
              playerOut += player.scores[i];
              playerTotal += player.scores[i];
          } else {
              player.backHTML += `<td id="s${i + 1}" class="player-score"><input id="${player.playerNum + String(i)}" class="number-input form-control" type="number" value="${player.scores[i]}" onchange="addScore(this)"></td>`;
              playerIn += player.scores[i];
              playerTotal += player.scores[i];
          }
      } 
      player.frontHTML += `<td id="${player.playerNum}out">${playerOut}</td></tr>`;
      player.backHTML += `<td id="${player.playerNum}in">${playerIn}</td><td id="${player.playerNum}total">${playerTotal}</td></tr>`;
  })
  players.forEach(player => {
      frontBody.innerHTML += player.frontHTML;
      backBody.innerHTML += player.backHTML;
  })
          
}

let player1;
let player2;
let player3;
let player4;
let players = [];


function addPlayer() {
  let newId = Math.random().toString(36).slice(2);
  let newPlayer;
  
  if (player1 === undefined) {
    newPlayer = new Player(newId, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 'p1');
    player1 = newPlayer;
  } else if (player2 === undefined) {
    newPlayer = new Player(newId, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 'p2');
    player2 = newPlayer;
  }else if (player3 === undefined) {
    newPlayer = new Player(newId, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 'p3');
    player3 = newPlayer;
  } else if (player4 === undefined) {
    newPlayer = new Player(newId, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 'p4');
    player4 = newPlayer;
  }
  
  players.push(newPlayer);
  console.log(players);
  renderPlayers();
}

function addScore(object) {
  let index = Number(object.id.slice(2, 4));
  let playerIndex = Number(object.id[1]) - 1;
  let player = [player1, player2, player3, player4][playerIndex];
  player.scores[index] = Number(object.value);
  renderPlayers();
}

function updateName(object) {
  let playerIndex = Number(object.id[1]) - 1;
  let player = [player1, player2, player3, player4][playerIndex];
  player.name = object.value;
  renderPlayers();
}


function reset() {
  location.reload();
}
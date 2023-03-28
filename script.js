let courses = [];

async function renderCourses() {
await fetch('courses.json').then(response => response.json())
  .then(data => {
    courses = data.data.course;
    renderSelectCourse();
    const url = courses[0].url;
    return getCourseData(url)
  })
  .then(data => mostrarData(data)).catch(error => console.log(error));   //llevarlo a que seleccione el Tee en vez de mostrarData
  }
  getTee()

function renderSelectCourse() {
  const courseSelect = document.getElementById('course-select');
  courseSelect.innerHTML = courses.map(course => `<option value="${course.id}">${course.name}</option>`).join('');
  courseSelect.addEventListener('change', handleOnSelect);
}

function handleOnSelect(event) {
  const selectorId = Number(event.target.value);
  const course = getCourseById(selectorId);
  const url = course.url;
  getCourseData(url).then(data => mostrarData(data));
    //getTee());
  };
  
function getCourseById(id) {
  return courses.find(course => course.id === id);
}

function getUrlForCourse(selectorId) {
  const course = getCourseById(selectorId);
  return course.url ?? '';
}

async function getCourseData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}




//-------------------------------------------------------------------------------


// select tee functions
let teeHTML = `<select class="form-control" id="tee-select" onchange="teeSelect(this.id)"><option value="initial">*Select tee to play*</option>`;

async function getTee(){
  let course;
  try {
      course = await renderCourses();   //donde llama el curso
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
  const teeTitle = document.getElementById('tee-title');
  let color = document.getElementById(clickedId).value
  teeTitle.innerHTML = "Tee Box: " + document.getElementById(clickedId).value; 



  let course;
  try {
      course = await renderCourses();
  }catch (error) {
      console.log(`ERROR: ${error}`);
  }
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

mostrarData();
  };
//-------------------------------------------------------------------------------

// MODIFICAR QUE SOLO SELECCIONE LOS teeColorType SELECCIONADOS !NO TODOS!!!!!!!!

//-------------------------------------------------------------------------------

const mostrarData = (data) => {
  let body = "";
  let parBody = "";
  let hcpBody = "";
  let yardSum = 0;
  let parSum = 0;
  let hcpSum = 0;
  let body2 = "";
  let parBody2 = "";
  let hcpBody2 = "";
  let yardSum2 = 0;
  let parSum2 = 0;
  let hcpSum2 = 0;
  
  // loop through the front nine holes
  for (let i = 0; i < 9; i++) {
    const teeBox = data.holes[i].teeBoxes;     //holes.teeBoxes.teeColorType  -> yards, par, hcp
    for (let j = 0; j < teeBox.length; j++) {
      body += `<td>${teeBox[j].yards}</td>`;
      parBody += `<td>${teeBox[j].par}</td>`;
      hcpBody += `<td>${teeBox[j].hcp}</td>`;
      yardSum += teeBox[j].yards;
      parSum += teeBox[j].par;
      hcpSum += teeBox[j].hcp;
    }
  }

  // loop through the back nine holes
  for (let i = 9; i < 18; i++) {
    const teeBox = data.holes[i].teeBoxes;
    for (let k = 0; k < teeBox.length; k++) {
      body2 += `<td>${teeBox[k].yards}</td>`;
      parBody2 += `<td>${teeBox[k].par}</td>`;
      hcpBody2 += `<td>${teeBox[k].hcp}</td>`;
      yardSum2 += teeBox[k].yards;
      parSum2 += teeBox[k].par;
      hcpSum2 += teeBox[k].hcp;
    }
  }
  let totalyards = yardSum + yardSum2;
  let totalpar = parSum + parSum2;
  let totalhcp = hcpSum + hcpSum2;
  
  
  body += `<th>${yardSum}</th>`;
  parBody += `<th>${parSum}</th>`;
  hcpBody += `<th>${hcpSum}</th>`;
  
  body2 += `<th>${yardSum2}</th>`;
  parBody2 += `<th>${parSum2}</th>`;
  hcpBody2 += `<th>${hcpSum2}</th>`;
  
  body2 += `<th>${totalyards}</th>`;
  parBody2 += `<th>${totalpar}</th>`;
  hcpBody2 += `<th>${totalhcp}</th>`;
  
  document.getElementById('tableHead').innerHTML = `<th id="subtitler" colspan="11">Front Nine</th><th id="subtitler" colspan="11">Back Nine</th><tr><th>Hole</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>Out</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>In</th><th>Total</th></tr>`;

  document.getElementById('allHoles').innerHTML = "<tr><th>Yards</th>" + body + body2 + "</tr><tr><th>Par</th>" + parBody + parBody2 + "</tr><tr><th>Hcp</th>" + hcpBody + hcpBody2 + "</tr>";
}


// button disapear  **magic!!**
document.getElementById('playerData').innerHTML = "<button id=\"addplayer\" onclick=\"addPlayers()\">Add Players</button>";
var addplayer = document.getElementById("addplayer");
addplayer.addEventListener("click", function() {
  addplayer.style.display = "none";
});






 
const addPlayers = () => {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  let strokeCounter = 1;

  for (let i = 1; i <= 4; i++) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('th');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = `playerName${i}`;
    nameInput.placeholder = `Player${i}`;
    nameCell.appendChild(nameInput);
    row.appendChild(nameCell);

    let totalOut = 0;
    let totalIn = 0;

    for (let j = 1; j <= 18; j++) {
      const cell = document.createElement(j % 10 === 0 ? 'th' : 'td');
      const input = document.createElement('input');
      input.type = 'number';
      input.id = `strokes${strokeCounter}`;
      strokeCounter++;

      input.addEventListener('change', () => {
        const value = parseInt(input.value) || 0;
        if (j <= 9) {
          totalOut += value;
        } else {
          totalIn += value;
        }
        row.childNodes[10].textContent = totalOut;
        row.childNodes[20].textContent = totalIn;
        row.childNodes[21].textContent = totalOut + totalIn;
      });

      cell.appendChild(input);
      row.appendChild(cell);
    }

    const inCell = document.createElement('td');
    const totalOutCell = document.createElement('td');
    const totalInCell = document.createElement('td');
    const totalCell = document.createElement('td');
    row.appendChild(inCell);
    row.appendChild(totalOutCell);
    row.appendChild(totalInCell);
    row.appendChild(totalCell);
    tbody.appendChild(row);
  }

  table.innerHTML = '<thead><th>Name</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>Out</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>In</th><th>Total</th></thead>';
  table.appendChild(tbody);
  document.getElementById('scoreCard').appendChild(table);
}








  /* const scoreBody = document.getElementById('scoreCard');
  scoreBody.innerHTML = '';
  scoreBody.appendChild(tbody); */





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


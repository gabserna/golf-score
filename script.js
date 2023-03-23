let courses = [];

function renderCourses() {
fetch('courses.json').then(response => response.json())
  .then(data => {
    courses = data.data.course;
    renderSelectCourse();
    const url = courses[0].url;
    return getCourseData(url)
  })
  .then(data => mostrarData(data)).catch(error => console.log(error));
  }
  renderCourses()

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
}

function getCourseById(id) {
  return courses.find(course => course.id === id);
}

function getUrlForCourse(selectorId) {
  const course = getCourseById(selectorId);
  return course.url ?? '';
}

//ES6 async?
async function getCourseData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}






















/* 
// menu de seleccion Tee
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
  return course.teeColorType;
}

// select tee functions
let teeHTML = `<select class="form-control" id="tee-select" onchange="teeSelect(this.id)">
  <option value="initial">--Select a Tee Box--</option>`;

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
  const teeTitle = document.getElementById('tee-title');
  let color = document.getElementById(clickedId).value
  teeTitle.innerHTML = "Tee Box: " + document.getElementById(clickedId).value; 



  let course;
  try {
      course = await loadCourse();
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
 */



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
    const locations = data.holes[i].changeLocations;
    for (let j = 0; j < locations.length; j++) {
      body += `<td>${locations[j].yards}</td>`;
      parBody += `<td>${locations[j].par}</td>`;
      hcpBody += `<td>${locations[j].hcp}</td>`;
      yardSum += locations[j].yards;
      parSum += locations[j].par;
      hcpSum += locations[j].hcp;
    }
  }

  // loop through the back nine holes
  for (let i = 9; i < 18; i++) {
    const locations = data.holes[i].changeLocations;
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




document.getElementById('playerData').innerHTML = "<button onclick=\"addPlayers()\">Add Players</button>";



function addPlayers() {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const headerRow = document.createElement('tr');

    let sumOut = 0;
    let sumIn = 0;
    
    // revisar mostrarData para modificar forma de inyectar datos

    const inCellHeader = document.createElement('th');
    inCellHeader.textContent = "";
    headerRow.appendChild(inCellHeader);
    
    const totalCellHeader = document.createElement('th');
    totalCellHeader.textContent = "";
    headerRow.appendChild(totalCellHeader);
    
    thead.appendChild(headerRow);
    
    for (let i = 1; i <= 4; i++) {
      const row = document.createElement('tr');
      const inputs = [];
      let totalOut = 0;
      let totalIn = 0;
      
      const nameCell = document.createElement('th');
      const input = document.createElement('input');
      input.type = "text";
      input.value = "";
      input.setAttribute("placeholder", `Player ${i}`);
      nameCell.id = 'anchoPlayer';
  
      row.appendChild(nameCell);
    
      for (let j = 0; j < 19; j++) {     // revisar para suma
        const cell = document.createElement('td');
        const input = document.createElement('input');
        input.type = "number";
        input.value = "";
        input.addEventListener('change', () => {
          totalOut = 0;
          totalIn = 0;
          inputs.forEach((input, index) => {
            const value = parseInt(input.value) || 0;
            if (index < 9) {
              totalOut += value;
            } else {
              totalIn += value;
            }
          });
          cell.textContent = input.value ? input.value : 0;
          row.childNodes[10].textContent = totalOut;
          row.childNodes[19].textContent = totalIn;
          row.lastChild.textContent = totalOut + totalIn;
          sumOut = 0;
          sumIn = 0;
          tbody.childNodes.forEach((row) => {
            sumOut += parseInt(row.childNodes[10].textContent) || 0;
            sumIn += parseInt(row.childNodes[20].textContent) || 0;
          });
          inCellHeader.textContent = sumIn;
          totalCellHeader.textContent = sumOut + sumIn;
        });
        cell.appendChild(input);
        row.appendChild(cell);
        inputs.push(input);
      }
      
      //Valores del Player
      const inCell = document.createElement('td');
      inCell.textContent = "";
      row.appendChild(inCell);
      
      //totales de Out
      const totalCellOut = document.createElement('td');
      totalCellOut.textContent = totalOut;
      row.appendChild(totalCellOut);
      
      //totales de In
      const totalCellIn = document.createElement('td');
      totalCellIn.textContent = totalIn;
      row.appendChild(totalCellIn);
      
      //Suma del Total
      const totalCell = document.createElement('td');
      totalCell.textContent = totalOut + totalIn;
      row.appendChild(totalCell);
      
      tbody.appendChild(row);
    }
    
  table.appendChild(thead);
  table.appendChild(tbody);
  
  document.getElementById('scoreHead').innerHTML = `<th>Name</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>Out</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>In</th><th>Total</th>`;

  document.getElementById('scoreBody').innerHTML = ``;
  
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


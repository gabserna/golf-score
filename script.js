async function loadCourse() {
  const response = await fetch('courses.json');     // https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json   --url principal--
  const data = await response.json();
  return data.data.course;
}

const select = document.getElementById('course-select');
const courseTitle = document.getElementById('course-title');
let url;

select.addEventListener('change', courseSelect);

async function courseSelect() {
  const courseId = select.value;
  const courses = await loadCourse();
  const selectedCourse = courses.find(course => course.id.toString() === courseId);
  courseTitle.innerHTML = selectedCourse.courseName;
  url = selectedCourse.url;
  
  try {
      const response = await fetch(url);
      const data = await response.json();
      getTee(data);
  } catch (error) {
      console.log(`ERROR: ${error}`);
  }
}

async function getTee(courseData) {
  let myTeeSelection = `<select class="form-control" id="tee-select" onchange="teeSelect(this.id)"><option value="initial">&#171; SELECT TEE COLOR &#187;</option>`;

  const teeBoxes = courseData.holes[0].teeBoxes;
  teeBoxes.forEach(tee => {
    if (tee.teeColorType !== null) {
      myTeeSelection += `<option value="${tee.teeColorType}">${tee.teeColorType}</option>`;
    }
  });
  myTeeSelection += `</select>`;
  document.getElementById('tee-title').innerHTML = myTeeSelection;
}


async function teeSelect(clickedId) {
  const teeTitle = document.getElementById('tee-title');
  let color = document.getElementById(clickedId).value
  teeTitle.innerHTML = "Tee Box: " + color;

  let course;
  try {
    const response = await fetch('https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json');  // debe venir de courses.json o del url principal
    course = await response.json();
    if (!course || !course.holes || !Array.isArray(course.holes)) {
      console.log(course);
      throw new Error('nothing to show...!!');
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return;
  }

  let teeType = []
  course.holes.forEach(hole => {
    if (hole && hole.teeBoxes) {
      hole.teeBoxes.forEach(teeBox => {
        if (teeBox && teeBox.teeColorType === color) {
          teeType.push({
            id: teeBox.courseHoleId,
            name: '',
            yardage: teeBox.yards,
            par: teeBox.par,
            handicap: teeBox.hcp,
          });
        }
      });
    }
  });

  showScoreCard(teeType);
}


// version modificada!!!!!!!
async function showScoreCard(teeType) {
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
  let totalyards = yardSum + yardSum2;
  let totalpar = parSum + parSum2;
  let totalhcp = hcpSum + hcpSum2;

  try {
    course = await loadCourse();
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }

  // loop through teeType and build out the card
console.log(teeType)
for (let i = 0; i < teeType.length; i++) {
    if (i < 9) {
      body += `<td>${teeType[i].yardage}</td>`;
      parBody += `<td>${teeType[i].par}</td>`;
      hcpBody += `<td>${teeType[i].handicap}</td>`;
      yardSum += teeType[i].yardage;
      parSum += teeType[i].par;
      hcpSum += teeType[i].handicap;
    }
      else {
        body2 += `<td>${teeType[i].yardage}</td>`;
        parBody2 += `<td>${teeType[i].par}</td>`;
        hcpBody2 += `<td>${teeType[i].handicap}</td>`;
        yardSum2 += teeType[i].yardage;
        parSum2 += teeType[i].par;
        hcpSum2 += teeType[i].handicap;
      }
  };

  body2 += `<th>${yardSum2}</th>`;
  parBody2 += `<th>${parSum2}</th>`;
  hcpBody2 += `<th>${hcpSum2}</th>`;

  body2 += `<th>${totalyards}</th>`;
  parBody2 += `<th>${totalpar}</th>`;
  hcpBody2 += `<th>${totalhcp}</th>`;

  body += `<th>${yardSum}</th>`;
  parBody += `<th>${parSum}</th>`;
  hcpBody += `<th>${hcpSum}</th>`;
  document.getElementById('table-header1').innerHTML = `<th id="subtitler" colspan="11">Front Nine</th><tr><th>Hole</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>Out</th></tr>`;
  document.getElementById('holes0-9').innerHTML = "<tr><th>Yards</th>" + body + "</tr><tr><th>Par</th>" + parBody + "</tr><tr><th>Hcp</th>" + hcpBody + "</tr>";

  document.getElementById('table-header2').innerHTML = `<th id="subtitler" colspan="11">Back Nine</th><tr><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>In</th><th>Total</th></tr>`;
  document.getElementById('holes10-18').innerHTML = "<tr>" + body2 + "</tr><tr>" + parBody2 + "</tr><tr>" + hcpBody2 + "</tr>";

  createButtonAddPlayers();
}


// button disapear
function createButtonAddPlayers() {
document.getElementById('playerData').innerHTML = "<button id=\"addplayer\" onclick=\"addPlayers()\">Add Players</button>";
var addplayer = document.getElementById("addplayer");
addplayer.addEventListener("click", function() {
addplayer.style.display = "none";
})
};



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
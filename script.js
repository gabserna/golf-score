const select = document.getElementById('course-select');
let holes;

async function loadCourse() {
  const response = await fetch('https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json');
  const data = await response.json();
  data.map(row=>{
    const option = document.createElement('option')
    option.value = row.id
    option.text = row.name
    option.setAttribute('data-url', row.url)
    select.appendChild(option)

  })
}

select.addEventListener('change', courseSelect);
const courseTitle = document.getElementById('course-title');
let url;

async function courseSelect() {
  let opciones = this.getElementsByTagName("option")
  const courseId = select.value;

  courseTitle.innerHTML = opciones[this.selectedIndex].innerHTML
  url = opciones[this.selectedIndex].getAttribute('data-url');
  console.log(url)
  try {
      const response = await fetch(url);
      const data = await response.json();
      getTee(data);
  } catch (error) {
      console.log(`ERROR: ${error}`);
  }
}


async function getTee(courseData) {
  console.log(courseData)
  let myTeeSelection = `<select class="form-control" id="tee-select" onchange="teeSelect(this)"><option value="initial">&#171; SELECT TEE COLOR &#187;</option>`;
  
  holes = courseData.holes
  let addedTeeColors = [];
  
  holes.map(row => {
    const teeBoxes = row.teeBoxes
    teeBoxes.forEach(tee => {
      if (tee.teeColorType !== null && !addedTeeColors.includes(tee.teeColorType)) {
        myTeeSelection += `<option value="${tee.teeColorType}">${tee.teeColorType}</option>`;
        addedTeeColors.push(tee.teeColorType);
      }
    });
  })
  
  myTeeSelection += `</select>`;
  document.getElementById('tee-title').innerHTML = myTeeSelection;
}



async function teeSelect(e) {
  let color = e.value
  const teeTitle = document.getElementById('tee-title');
  teeTitle.innerHTML = "Playing with tee color: " + color;

  let course;
  let teeType = []
  try {
    let bxs =[];
    holes.map(hol=>{
      tBoxes = hol.teeBoxes
      let queryBoxes = tBoxes.find(boxes=> boxes.teeColorType == color)
      bxs.push(queryBoxes)
    })
    console.log(bxs)
    bxs.forEach(teeBox=>{
      teeType.push({ id: teeBox.courseHoleId, name: '', teeBoxYards: teeBox.yards, teeBoxPar: teeBox.par, teeBoxHcp: teeBox.hcp,
          });
    })
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return;
  }
  console.log(teeType)
  showScoreCard(teeType);
}

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

  try {
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }

  console.log(teeType);
  for (let i = 0; i < teeType.length; i++) {
    if (i < 9) {
      body += `<td>${teeType[i].teeBoxYards}</td>`;
      parBody += `<td>${teeType[i].teeBoxPar}</td>`;
      hcpBody += `<td>${teeType[i].teeBoxHcp}</td>`;
      yardSum += teeType[i].teeBoxYards;
      parSum += teeType[i].teeBoxPar;
      hcpSum += teeType[i].teeBoxHcp;
    } else {
      body2 += `<td>${teeType[i].teeBoxYards}</td>`;
      parBody2 += `<td>${teeType[i].teeBoxPar}</td>`;
      hcpBody2 += `<td>${teeType[i].teeBoxHcp}</td>`;
      yardSum2 += teeType[i].teeBoxYards;
      parSum2 += teeType[i].teeBoxPar;
      hcpSum2 += teeType[i].teeBoxHcp;
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

  body += `<th>${yardSum}</th>`;
  parBody += `<th>${parSum}</th>`;
  hcpBody += `<th>${hcpSum}</th>`;

  document.getElementById('tableHead').innerHTML = `<th id="subtitler" colspan="11">Front Nine</th><th id="subtitler" colspan="11">Back Nine</th><tr><th>Hole</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>Out</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>In</th><th>Total</th></tr>`;

  document.getElementById('allNine').innerHTML = "<tr><th>Yards</th>" + body + body2 + "</tr><tr><th>Par</th>" + parBody + parBody2 + "</tr><tr><th>Hcp</th>" + hcpBody + hcpBody2 + "</tr>";

  createButtonAddPlayers();
}



//button to addplayers table
function createButtonAddPlayers() {
document.getElementById('playerData').innerHTML = "<button class=\"btn btn-success btn-sm my-2\" id=\"addplayer\" onclick=\"addPlayers()\">Add Players</button>";
let addplayer = document.getElementById("addplayer");
addplayer.addEventListener("click", function() {
addplayer.style.display = "none";
})
};


//addplayers table
const addPlayers = () => {
const table = document.createElement('table');
const tbody = document.createElement('tbody');
let contadorGolpes = 1;

for (let i = 1; i <= 4; i++) {
  const row = document.createElement('tr');
  const nameCell = document.createElement('th');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = `playerName${i}`;
  nameInput.placeholder = `Name${i}`;
  nameCell.appendChild(nameInput);
  row.appendChild(nameCell);

  let totalOut = 0;
  let totalIn = 0;

  for (let j = 1; j <= 18; j++) {
    const cell = document.createElement(j % 10 === 0 ? 'th' : 'td');
    const input = document.createElement('input');
    input.type = 'number';
    input.id = `golpe${contadorGolpes}`;
    contadorGolpes++;

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
//Encabezados--------------------------------------------------


const allNine = document.getElementById('allNine')
let tr = document.createElement('tr')
let th = document.createElement('th')
th.textContent= 'Name'
tr.appendChild(th)

for(let i= 1; i<=9; i++){
  let th = document.createElement('th')
  th.textContent= i
  tr.appendChild(th)
}


th = document.createElement('th')
th.textContent= 'Out'
tr.appendChild(th)
for(let i= 10; i<=18; i++){
  let th = document.createElement('th')
  th.textContent= i
  tr.appendChild(th)
}

th = document.createElement('th')
th.textContent= 'In'
tr.appendChild(th)

th = document.createElement('th')
th.textContent= 'Total'
tr.appendChild(th)

allNine.appendChild(tr)
//Fin de encabezados


for(let x=0; x<=3; x++){

  let row = document.createElement('tr')
  let td = document.createElement('td');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = `playerName`;
  nameInput.placeholder = `Name`;
  td.appendChild(nameInput);
  row.appendChild(td);

  for(let i= 1; i<=9; i++){
    let td = document.createElement('td')
    const input = document.createElement('input');
    input.type = 'number'; 
    td.appendChild(input)
    row.appendChild(td)
  }

  td = document.createElement('td')
  row.appendChild(td)

  for(let i= 1; i<=9; i++){
    let td = document.createElement('td')
    const input = document.createElement('input');
    input.type = 'number'; 
    td.appendChild(input)
    row.appendChild(td)
  }
    td = document.createElement('td')
    row.appendChild(td)
    td = document.createElement('td')
    row.appendChild(td)
    allNine.appendChild(row)
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadCourse()
})
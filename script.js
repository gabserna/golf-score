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

  // Encabezados
  const allNine = document.getElementById('allNine');
  let tr = document.createElement('tr');
  let th = document.createElement('th');
  th.textContent= 'Name';
  tr.appendChild(th);

  for(let i = 1; i <= 9; i++){
    let th = document.createElement('th');
    th.textContent = i;
    tr.appendChild(th);
  }
  th = document.createElement('th');
  th.textContent = 'Out';
  tr.appendChild(th);

  for(let i = 10; i <= 18; i++){
    let th = document.createElement('th');
    th.textContent = i;
    tr.appendChild(th);
  }
  th = document.createElement('th');
  th.textContent = 'In';
  tr.appendChild(th);
  th = document.createElement('th');
  th.textContent = 'Total';
  tr.appendChild(th);
  allNine.appendChild(tr);

  // Jugadores
  let lowestScorePlayer = null;
for (let x = 0; x <= 3; x++) {
  let row = document.createElement('tr');
  let td = document.createElement('td');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = `playerName${x}`;
  nameInput.placeholder = `Name`;
  td.appendChild(nameInput);
  row.appendChild(td);

  let frontInputs = [];
  let backInputs = [];

  for (let i = 1; i <= 9; i++) {
    let td = document.createElement('td');
    const frontInput = document.createElement('input');
    frontInput.type = 'number';
    frontInput.addEventListener('change', sumarFila);
    frontInputs.push(frontInput);
    td.appendChild(frontInput);
    row.appendChild(td);
  }

  td = document.createElement('td');
  td.id = `my_out${x}`;
  row.appendChild(td);
  td.innerHTML = 0;

  for (let i = 1; i <= 9; i++) {
    let td = document.createElement('td');
    const backInput = document.createElement('input');
    backInput.type = 'number';
    backInput.addEventListener('change', sumarFila);
    backInputs.push(backInput);
    td.appendChild(backInput);
    row.appendChild(td);
  }

  td = document.createElement('td');
  td.id = `my_in${x}`;
  row.appendChild(td);
  td.innerHTML = 0;

  td = document.createElement('td');
  td.id = `my_total${x}`;
  row.appendChild(td);
  td.innerHTML = 0;

  allNine.appendChild(row);

  // sumar valores x fila y actualiza el total
  function sumarFila() {
    let totalOut = 0;
    let totalIn = 0;
    for (let i = 0; i < frontInputs.length; i++) {
      totalOut += Number(frontInputs[i].value);
    }
    for (let i = 0; i < backInputs.length; i++) {
      totalIn += Number(backInputs[i].value);
    }

    td = document.getElementById(`my_out${x}`);
    td.innerHTML = totalOut;

    td = document.getElementById(`my_in${x}`);
    td.innerHTML = totalIn;

    td = document.getElementById(`my_total${x}`);
    td.innerHTML = totalOut + totalIn;
  }

  // Obtener los totales de los jugadores después de ingresar todos los valores
  //button to addplayers table
  const boton = document.getElementById('calculateWinner');
  boton.addEventListener('click', () => obtenerTotalesJugadores(x));




  function obtenerTotalesJugadores() {
    console.log("Starting obtenerTotalesJugadores function...");
  
    const players = document.querySelectorAll('tr:not(:first-child)');
    console.log("Found players:", players);
  
    let lowestScorePlayerIndex = Infinity;
    let lowestScore = Infinity;
  
    players.forEach((player, index) => {
      const playerNameInput = player.querySelector(`#playerName${index}`);
      if (!playerNameInput) {
        return; // skip if input element not found for player
      }
      
      let total = 0;
  
      for (let i = 1; i <= 9; i++) {
        const frontInput = player.querySelector(`#player${index}-front${i}`);
        const backInput = player.querySelector(`#player${index}-back${i}`);
        if (frontInput.value) {
          total += Number(frontInput.value);
        }
        if (backInput.value) {
          total += Number(backInput.value);
        }
      }
  
      const playerName = playerNameInput.value;
      console.log("playerName:", playerName);
  
      console.log("total:", total);
      console.log("lowestScore:", lowestScore);
  
      if (total < lowestScore) {
        lowestScorePlayerIndex = index;
        lowestScore = total;
      }
    });
  
    console.log("Lowest score:", lowestScore);
    console.log("Lowest player index:", lowestScorePlayerIndex);
  
    if (lowestScorePlayerIndex !== Infinity) {
      const lowestScorePlayerName = document.querySelector(`#playerName${lowestScorePlayerIndex}`).value;
      console.log("Lowest player name:", lowestScorePlayerName);
  
      // Generate alert with the player with the lowest score
      alert(`The player with the lowest score is: ${lowestScorePlayerName}`);
    } else {
      alert("No players found");
    }
}

  
  
  
  




    

    
  }

}


document.addEventListener('DOMContentLoaded', ()=>{
  loadCourse()
})
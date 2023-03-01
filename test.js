//let url = courses[0].url;         //   <--- obtener URL
let url = 'http://uxcobra.com/golfapi/course11819.txt';

fetch(url)
  .then(response => response.json())
  .then(data => mostrarData(data))
  .catch(error => console.log(error))

  console.log(data)

const mostrarData = (data) => {
  let yards = "";
  let yardSum = 0;
  let parSum = 0;

  for (let i = 0; i < 9; i++) {
    yards += `<td>${data.data.holes[i].changeLocations[0].yards}</td>`;
    yardSum += data.data.holes[i].changeLocations.reduce((total, location) => total + location.yards, 0);
  }
  for (let i = 0; i < 9; i++) {
    par += `<td>${data.data.holes[i].changeLocations[0].par}</td>`;
    parSum += data.data.holes[i].changeLocations.reduce((total, location) => total + location.par, 0);
  }


  yards += `<td>${yardSum}</td>`;
  document.getElementById('table-header').innerHTML = `<tr><th>Hole</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>Out</th></tr>`;
  document.getElementById('data').innerHTML = "<tr><th>Yards</th>" + yards + "</tr>";

  par += `<td>${parSum}</td>`;
  document.getElementById('table-header').innerHTML = `<tr><th>Par</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>Out</th></tr>`;
  document.getElementById('data').innerHTML = "<tr><th>Yards</th>" + par + "</tr>";
}
})
.catch(error => console.log(error));
async function showScoreCard(teeType) {
  const frontNine = document.getElementById('frontNine');
  const outYrd = document.getElementById('outYards');
  const outPars = document.getElementById('outPar');
  const outHcps = document.getElementById('outHcp');

  const backNine = document.getElementById('backNine');
  const inYrds = document.getElementById('inYards');
  const inPars = document.getElementById('inPar');
  const inHcps = document.getElementById('inHcp');

  let frontNineTh = '<th>Holes</th>';
  let outYrdTh = '<th>Yards</th>';
  let outParsTh = '<th>Par</th>';
  let outHcpsTh = '<th>Hcp</th>';

  let backNineTh = '';
  let inYrdsTh = '';
  let inParsTh = '';
  let inHcpsTh = '';

  let outYardage = 0;
  let inYardage = 0;
  let totalYardage = 0;

  let outPar = 0;
  let inPar = 0;

  let outHcp = 0;
  let inHcp = 0;
  let totalPar = 0;
  let totalHcp = 0;

  let course;
  try {
    course = await loadCourse();
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }

  teeType.forEach((tee, i) => {
    if (i < 9) {
      frontNineTh += `<th>${i + 1}</th>`;
      outYrdTh += `<td>${tee.yardage}</td>`;
      outParsTh += `<td>${tee.par}</td>`;
      outHcpsTh += `<td>${tee.handicap}</td>`;
      outYardage += tee.yardage;
      outPar += tee.par;
      outHcp += tee.handicap;
      totalYardage += tee.yardage;
      totalPar += tee.par;
    } else {
      backNineTh += `<th>${i + 1}</th>`;
      inYrdsTh += `<td>${tee.yardage}</td>`;
      inParsTh += `<td>${tee.par}</td>`;
      inHcpsTh += `<td>${tee.handicap}</td>`;
      inYardage += tee.yardage;
      inPar += tee.par;
      inHcp += tee.handicap;
      totalYardage += tee.yardage;
      totalPar += tee.par;
      totalHcp += tee.handicap;
    }
  });

  frontNine.innerHTML = frontNineTh + '<th>Out</th>';
  outYrd.innerHTML = outYrdTh + `<td>${outYardage}</td>`;
  outPars.innerHTML = outParsTh + `<td>${outPar}</td>`;
  outHcps.innerHTML = outHcpsTh + `<td>${outHcp}</td>`;

  backNine.innerHTML = backNineTh + '<th>In</th><th>Total</th>';
  inYrds.innerHTML = inYrdsTh + `<td>${inYardage}</td><td>${totalYardage}</td>`;
  inPars.innerHTML = inParsTh + `<td>${inPar}</td><td>${totalPar}</td>`;
  inHcps.innerHTML = inHcpsTh + `<td>${inHcp}</td><td>${totalHcp}</td>`;

  createButtonAddPlayers();
}
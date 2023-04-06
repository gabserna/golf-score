const addPlayers = () => {
  const allNine = document.getElementById('allNine');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  let contadorGolpes = 1;

  for (let i = 0; i < 4; i++) {
    const row = document.createElement('tr');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = `playerName`;
    nameInput.placeholder = `Name`;
    const nameCell = document.createElement('th');
    nameCell.appendChild(nameInput);
    row.appendChild(nameCell);

    let totalOut = 0;
    let totalIn = 0;

    for (let j = 1; j <= 18; j++) {
      const cell = document.createElement(j % 10 === 0 ? 'th' : 'td');
      const input = document.createElement('input');
      input.type = 'number';
      input.id = `golpe${contadorGolpes++}`;

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
    row.append(inCell, totalOutCell, totalInCell, totalCell);
    tbody.appendChild(row);
  }

  // Encabezados
  const tr = document.createElement('tr');
  const headers = ['Name', ...Array.from({length: 9}, (_, i) => i + 1), 'Out', ...Array.from({length: 9}, (_, i) => i + 10), 'In', 'Total'];
  for (const header of headers) {
    const th = document.createElement('th');
    th.textContent = header;
    tr.appendChild(th);
  }
  table.appendChild(tbody);
  table.appendChild(tr);
  allNine.appendChild(table);
}

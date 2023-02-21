function getAvailableCourses() {
 return fetch('https://golf-courses-api.herokuapp.com/courses/').then(
   function (response) {
     return response.json();
   }
 );
}

const lists = {
 1: {name: 'Shopping list'},
 2: {name: 'Honey do list'},
 ...
}



`<div class="form-group">
<label for="course-select">Select Course</label>
<select class="form-control" id="course-select"></select>
</div>

let courseOptionsHtml = '';
courses.forEach((course) => {
courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
});

document.getElementById('course-select').innerHTML = courseOptionsHtml;`



let teeBoxSelectHtml = ''
teeBoxes.forEach(function (teeBox, index) {
   teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
     teeBox.totalYards
   } yards</option>`
});

document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;



`<div>
<input id="new-list-name-input">
<button class="btn btn-primary" onclick="addList()"></button>
</div>`




class Player {
    constructor(name, id = getNextId(), scores = []) {
      this.name = name;
      this.id = id;
      this.scores = scores;
    }
  }



toastr.success(`${playerName}, you are (L)PGA Tour material`);

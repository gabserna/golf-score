2.P.2 | Golf Score App - Step-by-step guide
Project Overview
This project is meant to provide students the opportunity to demonstrate and practice what they have learned by creating a simple Golf Scorecard. The score card will have all the functionality that a golfer would need such as yardage per hole, par per hole, be able to select the tees wanted etc.

We will be using  API url endpoints to get golf course information. Documentation and a JSON example of course info: 

Golf Courses
https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.jsonLinks to an external site.

Golf Score Course ID 
Course ID: 11819 - Thanksgiving Point Golf Course - Lehi, UT | https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.jsonLinks to an external site. | GitHub: golf-course_id11819Links to an external site.
Course ID: 18300 - Fox Hollow Golf Course - American Fork, UT | https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course18300.jsonLinks to an external site. | GitHub: golf-course_id18300Links to an external site.
Course ID: 19002 - Spanish Oaks Golf Course - Spanish Fork, UT | https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course19002.jsonLinks to an external site.Links to an external site. | GitHub: golf-course_id19002Links to an external site.
Step-by-step guide for Golf Score App
Overview
UI
API
Building user options
Building out the table
Player rows
Scoring and totals
Toasts!
Tips

1 - Overview

This project is going to be a bit more complex than the Todo App you built. It involves more moving parts and it has more requirements. You got this though. If you follow the steps and the tips I will give you in class you will do great. You really don’t need to know golf to get this project done. Just need to learn a couple things about the sport to get the project done. Again, this guide is not going to spell everything out for you but it will give you a good path to success.

2 - UI

Just like the previous app you built you will want to set up your html structure up for success. This time it will be a bit more complex but still very manageable. Most of the html you write for this app will be in your javascript file(s). However you can set up the shell of your app so that you can hit the ground running once you start working on the javascript. 

Step 1: Just like before, create a good container div that will hold your app. Much like last time see if you can build this mobile first. I again will suggest to use bootstrap since it takes out a lot of the work to make your app responsive. Here is a good example of what the shell for your app could look like. There are two tables, one for the front nine and one for the back nine:

   <div class="container">
       <div class="row">
           <div class="col-lg-12" id="header"></div>
       </div>
       <div class="row">
           <div class="col-lg-12">
               <div id="options-container"></div>
           </div>
       </div>

       <div class="row" id="scorecard-container">
           <div class="col-lg-12" id="scorecard">
               <div class="table-responsive">
                   <table class="table table-bordered">
                   </table>
               </div>

               <div class="table-responsive">
                   <table class="table table-bordered">
                   </table>
               </div>
           </div>
       </div>
   </div>
3 - API

A big part of this app is to get data from a remote source and display it on the app. You want make sure that you keep things simple here. There isn’t much to it but it can seem complex at first. I would use fetch() for simplicity. It’s a bit harder to wrap your head around since it uses promises but it makes getting data a breeze. Here is what your function to get the list of golf courses should look like. Use the function below to get all the courses' name, id, and url.

function getAvailableGolfCourses() {
  return fetch(
    "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json",
  { mode: "no-cors" }
  ).then(function (response) {
    return response.json();
  });
}
Then use the following function to grab a golf course's details.

function getGolfCourseDetails(golfCourseId) {
  return fetch(
    `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`,
    { mode: "no-cors" }
  ).then(function (response) {
    return response.json();
  });
}
4 - Building user options - course select

So once you have the golf courses you can populate a golf course select box so the user can choose what golf course to play. You will create it via javascript by looping over the golf courses and creating an html string with the <option>s. Here is what your html and your function cool look like:

<div class="form-group">
  <label for="course-select">Select Course</label>
  <select class="form-control" id="course-select"></select>
</div>

let courseOptionsHtml = '';
courses.forEach((course) => {
 courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
});

document.getElementById('course-select').innerHTML = courseOptionsHtml;
After the user has selected a course to play you will have to make another request to the api, this time you need to send the id for the course they selected. This is probably one of the trickiest parts. But once you have it you will be able to create this tee box select. It will looks something like this:

let teeBoxSelectHtml = ''
teeBoxes.forEach(function (teeBox, index) {
   teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
     teeBox.totalYards
   } yards</option>`
});

document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
 

5 - Building out the table

Ok, so now you have some functions that update the model and render the new html. What we need to do now is tie those functions to html events. Most of those will be clicks. In this example we tie into the onclick dom event. Inside the addList function we get the value from the input next to the button, create a new list, and add it to the object of lists.

golf-score-app-table.png

<div>
 <input id="new-list-name-input">
 <button class="btn btn-primary" onclick="addList()"></button>
</div>
 

6 - Player rows

Player rows are going to be a bit tricky but if you keep it simple you will come out on top. You will want to create player objects for your each player where each player has the at least the following properties: name, id, and scores. That way you will be able to keep the information for a player in one place. When you calculate the players scores you can refer to their scores array and get the data from there. Same with adding a score. When a player enters a new score you save it in the scores array.

class Player {
   constructor(name, id = getNextId(), scores = []) {
     this.name = name;
     this.id = id;
     this.scores = scores;
   }
 }
7 - Scoring and totals

This logic should be part of your print function. Each time you print() you will calculate the totals for each player and display the results in the totals cells. You have an array of scores in each player object. It contains the player’s scores for the 18 holes so you have index 0-17 right? So you sum up 0-8 and put that in the Out cell for that player, then you sum up 9-17 and put that in the In cell for that player. Then you add those two totals and put that in the Total cell for the player. It’s quite simple so don’t try to get fancy.

8 - Toasts!

So a requirement in your app is for you to give some notification to the user when he/she is done playing. There is a very light and easy to use js library called toastr that I like to use. Give it a try! Here is the link to the library docsLinks to an external site.

toastr.success(`${playerName}, you are (L)PGA Tour material`);
9 - Tips

Just like with the todo app you will have such an easier time if you have id’s for your players. If you don’t allow for duplicate names then the name could be the id. Otherwise use a random id function
Build functionality first and then make it look pretty
Develop your app in a device window so that you develop “mobile first” or in other words “responsive first”
Ask the instructors for help! Most students don’t ask questions. Even the ones that are really struggling. “How do I get started?” is a great starting question 😉

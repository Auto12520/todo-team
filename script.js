let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function addTask(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let team=document.getElementById("team").value
let task=document.getElementById("task").value

let data={

name:name,
email:email,
team:team,
task:task,
status:"Pending"

}

tasks.push(data)

save()

alert("Task Added")

}

function render(){

let table=document.getElementById("taskTable")

if(!table) return

table.innerHTML=""

tasks.forEach((t,i)=>{

table.innerHTML+=`

<tr>

<td>${t.name}</td>
<td>${t.email}</td>
<td>${t.team}</td>
<td>${t.task}</td>
<td>${t.status}</td>

<td>

<button onclick="done(${i})">Done</button>

<button onclick="editTask(${i})">Edit</button>

<button onclick="deleteTask(${i})">Delete</button>

</td>

</tr>

`

})

}

function done(i){

tasks[i].status="Done"

save()

render()

}

function editTask(i){

let newTask=prompt("Edit Task",tasks[i].task)

if(newTask){

tasks[i].task=newTask

save()

render()

}

}

function deleteTask(i){

tasks.splice(i,1)

save()

render()

}

function save(){

localStorage.setItem("tasks",JSON.stringify(tasks))

}

function searchTask(){

let keyword=document.getElementById("search").value.toLowerCase()

let rows=document.querySelectorAll("#taskTable tr")

rows.forEach(row=>{

let text=row.innerText.toLowerCase()

row.style.display=text.includes(keyword)?"":"none"

})

}

function filterTeam(){

let team=document.getElementById("filterTeam").value

let rows=document.querySelectorAll("#taskTable tr")

rows.forEach(row=>{

let col=row.children[2].innerText

row.style.display=(team=="" || col==team)?"":"none"

})

}

function sortName(){

tasks.sort((a,b)=>a.name.localeCompare(b.name))

render()

}

render()
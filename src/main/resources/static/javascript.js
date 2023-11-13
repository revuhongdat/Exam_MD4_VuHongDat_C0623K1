const API_EMPLOYEES = "http://localhost:8080/employees"
const API_DEPARTMENTS = "http://localhost:8080/departments"
showList()
function showList() {
    axios.get(API_EMPLOYEES).then((res) => {
        let employees = res.data;
        document.getElementById('employee').innerHTML = ''
        let str =
            `
  <button class="btn btn-primary" type="submit" onclick="showFormAdd()">ADD NEW EMPLOYEE</button>
  <button class="btn btn-primary" type="submit" onclick="showListAge()">AGE ASC</button>
  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">EmployeeCode</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Salary</th>
      <th scope="col">Department</th>
      <th scope="col">Action</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
        `
        for (let i = 0; i < employees.length; i++) {
            str +=
                `
    <tr>
      <td>${employees[i].code}</td>
      <td onclick="showDetail(${employees[i].id})">${employees[i].name}</td>
      <td>${employees[i].age}</td>
      <td>${employees[i].salary}</td>
      <td onclick="findByDepartment(${employees[i].department.id})">${employees[i].department.name} </td>
      <td class="btn btn-outline-primary" onclick="deleteE(${employees[i].id})">DELETE</td>
      <td class="btn btn-outline-secondary" onclick="showFormEdit(${employees[i].id})">EDIT</td>
    </tr>
            `
        }
        str +=
            `
    </tbody>
  </table>
        `
        document.getElementById('employee').innerHTML = str;
    })
}

function showFormAdd() {
    document.getElementById('detail').innerHTML = '';
    let str =
        `
    <form>
    <div class="form-group">
        <label for="code">CODE</label>
        <input type="text" class="form-control" id="code" placeholder="CODE">
    </div>
        <div class="form-group">
        <label for="name">NAME</label>
        <input type="text" class="form-control" id="name" placeholder="NAME">
    </div>
        <div class="form-group">
        <label for="age">AGE</label>
        <input type="number" class="form-control" id="age" placeholder="AGE">
    </div>
        <div class="form-group">
        <label for="salary">SALARY</label>
        <input type="number" class="form-control" id="salary" placeholder="SALARY">
    </div>
    <select id="department" class="form-control">
        `;
    axios.get(API_DEPARTMENTS).then((res) => {
        let departments = res.data;
        for (let i = 0; i < departments.length; i++) {
            str +=
                `
                <option value="${departments[i].id}">${departments[i].name}</option>
                `
        }
        str +=
            `
             </select>
             <div>
             <button class="btn btn-primary" onclick="save()">OK</button>
             </div>
             </form>
            `
        document.getElementById('detail').innerHTML = str
    })
}
function save() {
    let data = {
        code: document.getElementById('code').value,
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        salary: document.getElementById('salary').value,
        department: {
            id: document.getElementById('department').value
        }
    }
    axios.post(API_EMPLOYEES,data).then((res) => {
        alert('OK')
        showList()
    })
}
function deleteE(id) {
    axios.delete(API_EMPLOYEES + '/' + id).then((res) => {
        alert('OK')
        showList()
    })
}
function showFormEdit(id) {
    document.getElementById('detail').innerHTML = '';
    let str = '';

    Promise.all([
        axios.get(API_EMPLOYEES + '/' + id),
        axios.get(API_DEPARTMENTS)
    ]).then((res) => {
        let employee = res[0].data;
        let departments = res[1].data;
        str +=
            `
<input type="hidden" value="${employee.id}" id="id-e">
    <form>
    <div class="form-group">
        <label for="code">CODE</label>
        <input type="text" class="form-control" id="code-e"  placeholder="CODE" value="${employee.code}">
    </div>
        <div class="form-group">
        <label for="name">NAME</label>
        <input type="text" class="form-control" id="name-e" placeholder="NAME" value="${employee.name}">
    </div>
        <div class="form-group">
        <label for="age">AGE</label>
        <input type="number" class="form-control" id="age-e" placeholder="AGE" value="${employee.age}">
    </div>
        <div class="form-group">
        <label for="salary">SALARY</label>
        <input type="number" class="form-control" id="salary-e" placeholder="SALARY" value="${employee.salary}">
    </div>
    <select id="department-e" class="form-control" value="${employee.department.id}">
        `;
        for (let i = 0; i < departments.length; i++) {
            str +=
                `
                <option value="${departments[i].id}">${departments[i].name}</option>
                `
        }
        str +=
            `
             </select>
             <div>
             <button class="btn btn-primary" onclick="saveEdit()">OK</button>
             </div>
             </form>
            `
        document.getElementById('detail').innerHTML = str
    })
}
function saveEdit() {
    let data = {
        id: document.getElementById('id-e').value,
        code: document.getElementById('code-e').value,
        name: document.getElementById('name-e').value,
        age: document.getElementById('age-e').value,
        salary: document.getElementById('salary-e').value,
        department: {
            id: document.getElementById('department-e').value
        }
    }
    axios.put(API_EMPLOYEES,data).then((res) => {
        alert('OK')
        showList()
    })
}
function deleteE(id) {
    axios.delete(API_EMPLOYEES + '/' + id).then((res) => {
        alert('OK')
        showList()
    })
}
function showDetail(id) {
    document.getElementById('detail').innerHTML = ''
    let str = ''
    axios.get(API_EMPLOYEES + '/'+id).then((res) => {
        let e = res.data
        str +=
            `
            <div>Code: ${e.code}</div>
            <div>Name: ${e.name}</div>
            <div>Age: ${e.age}</div>
            <div>Salary: ${e.salary}</div>
            <div>Department: ${e.department.name}</div>
            `
        document.getElementById('detail').innerHTML = str
    })
}
function showListAge() {
    axios.get(API_EMPLOYEES).then((res) => {
        let employees = res.data;
        const compareById = (a, b) => {
            return -b.age + a.age;
        }
        employees.sort(compareById)
        document.getElementById('employee').innerHTML = ''
        let str =
            `
  <button class="btn btn-primary" type="submit" onclick="showFormAdd()">ADD NEW EMPLOYEE</button>
  <button class="btn btn-primary" type="submit" onclick="showListAge()">AGE ASC</button>
  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">EmployeeCode</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Salary</th>
      <th scope="col">Department</th>
      <th scope="col">Action</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
        `
        for (let i = 0; i < employees.length; i++) {
            str +=
                `
    <tr>
      <td>${employees[i].code}</td>
      <td onclick="showDetail(${employees[i].id})">${employees[i].name}</td>
      <td>${employees[i].age}</td>
      <td>${employees[i].salary}</td>
      <td onclick="findByDepartment(${employees[i].department.id})">${employees[i].department.name}</td>
      <td class="btn btn-outline-primary" onclick="deleteE(${employees[i].id})">DELETE</td>
      <td class="btn btn-outline-secondary" onclick="showFormEdit(${employees[i].id})">EDIT</td>
    </tr>
            `
        }
        str +=
            `
    </tbody>
  </table>
        `
        document.getElementById('employee').innerHTML = str;
    })
}
function findByDepartment(id) {
    document.getElementById('detail').innerHTML = ''
    axios.get(API_EMPLOYEES + '/DBD/' + id ).then((res) => {
        let employees = res.data
        let str =
            `
  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">EmployeeCode</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Salary</th>
    </tr>
  </thead>
  <tbody>
        `
        for (let i = 0; i < employees.length; i++) {
            str +=
                `
    <tr>
      <td>${employees[i].code}</td>
      <td>${employees[i].name}</td>
      <td>${employees[i].age}</td>
      <td>${employees[i].salary}</td>
    </tr>
            `
        }
        str +=
            `
    </tbody>
  </table>
        `
        document.getElementById('detail').innerHTML = str;

    })
}
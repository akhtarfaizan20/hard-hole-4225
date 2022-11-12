import { sidebar } from "./component/sidebar.js";

let side_div = document.getElementById("left");
side_div.innerHTML = sidebar();

window.onload = () => {
  getData();
  createButton();
};
let getData = async () => {
  let response = await fetch(
    `http://localhost:3000/orders?_page=${page}&_limit=6`
  );
  let data = await response.json();

  displayData(data);
};
const displayData = (data) => {
  let tbody = document.getElementById("tbody");
  tbody.innerText = "";
  data.forEach((el) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText = el.id;
    let td2 = document.createElement("td");
    td2.innerText = el.date;
    let td3 = document.createElement("td");
    td3.innerText = el.customer_id;
    let td4 = document.createElement("td");
    td4.innerText = el.phone;
    let td5 = document.createElement("td");
    td5.innerText = el.totalproducts;
    let td6 = document.createElement("td");
    td6.innerText = el.status;

    tr.append(td1, td2, td3, td4, td5, td6);
    tbody.append(tr);
  });
};

let button = document.getElementById("page");
let page = 1;
const createButton = async () => {
  let response = await fetch(`http://localhost:3000/orders`);

  let data = await response.json();
  // console.log(data);
  let totalButtons = Math.ceil(data.length / 6);
  //   but.innerHTML = "";
  button.innerHTML = "";

  for (let i = 1; i <= totalButtons; i++) {
    // console.log(i);
    let but = document.createElement("button");
    but.innerText = i;
    but.id = i;
    but.onclick = () => {
      page = i;
      getData();
      createButton();
    };
    button.append(but);
  }
};

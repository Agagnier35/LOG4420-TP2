"use strict";

const ajax = (url, fun) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      fun(xhttp);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
};

const loadJumbotron = xhttp => {
  const res = JSON.parse(xhttp.responseText);
  const jumbotron = $(".jumbotron");
  res.description
    .split("\n")
    .map(p => $("<p/>", { html: p }))
    .forEach(node => {
      jumbotron.append(node);
    });
};

$("#home-link").addClass("active");
ajax("http://localhost:3000/api/description", loadJumbotron);

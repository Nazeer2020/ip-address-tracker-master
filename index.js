"use strict";

const btn = document.querySelector(".btn");
const searchResult = document.querySelector(".search-result");
// const input = Number(document.querySelector(".input").value);
const ip = document.querySelector(".IP");
const loca = document.querySelector(".Location");
const timeZone = document.querySelector(".Timezone");
const utc = document.querySelector(".UTC");
const isp = document.querySelector(".ISP");
const closeBtn = document.querySelector(".fa-times");

let mymap;

// import  {accessToken} from './apiKeys.js';
// import {apiKey}  from './apiKeys.js';
const accessToken = "pk.eyJ1IjoibmF6ZWVyMjAyMCIsImEiOiJja3JyOHo4MzMwdWZrMnVwZjZ6ZjRvaXptIn0.XWq0WxoEnhPd86DO-udlEA";
const apiKey = "at_NrjY9G95YIn3CNauSDO5EPnduYmD2";


function gettingIP() {
  const xhr = new XMLHttpRequest();
  const url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${document.querySelector(".input")}`;
  xhr.responseType = "json";
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
    //   console.log(xhr.response);
      ip.innerHTML = `${xhr.response.ip}`;
      loca.innerHTML = `${xhr.response.location.region}`;
      timeZone.innerHTML = `${xhr.response.location.timezone}`;
      isp.innerHTML = `${xhr.response.isp}`;

      // map section
      const getLat = `${xhr.response.location.lat}`;
      const getLng = `${xhr.response.location.lng}`;

       mymap = L.map("mapid").setView([`${getLat}`, `${getLng}`], 13);
      var marker = L.marker([`${getLat}`, `${getLng}`]).addTo(mymap);
      L.tileLayer(
        `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: "your.mapbox.access.token",
        }
      ).addTo(mymap);
    }
  };

  xhr.open("GET", url);
  xhr.send();
}

window.onload = ()=>{
    gettingIP();
    searchResult.classList.remove("search-hide");
};

btn.addEventListener("click", () => {
    mymap.remove()
    searchResult.classList.remove("search-hide");
    gettingIP();
    console.log("I am called");
  });


  closeBtn.addEventListener('click', ()=>{
    searchResult.classList.add("search-hide");
  })

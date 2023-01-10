<template>
  <div id="headerContainer">
    <img src="../assets/TheBoxLogo.png" />
    <h1 id="title">{{ title }}</h1>
    <p id="tagline">{{ tagline }}</p>
    <input
      type="search"
      id="searchBar"
      placeholder="Search Any Movie ..."
      autocomplete="off"
      ref="searchBar"
      @change="displaySearchResults()"
    />
    <input id="submitButton" type="button" :value="buttonValue" @click="pushToLogin()" />
  </div>
  <div></div>
</template>

<script setup>
import router from "../router";
import axios from "axios";
import { ref } from "vue";

import { indexStore } from "../store/index.js";
import { storeToRefs } from "pinia";

const index = indexStore();
const { searchOptions } = storeToRefs(index);

const searchBar = ref();

defineProps({
  title: String,
  tagline: String,
  buttonValue: String,
});

function pushToLogin() {
  router.push("/login");
}

function displaySearchResults() {
  let displayTotalPages;

  let searchParam = axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=e06cb446302dcf3a3cb1358720141aad&language=en-US&page=1&include_adult=false&query=The Batman`,
    {}
  );

  let searchParamResult = searchParam.then((finalResult) => {
    displayTotalPages = finalResult.data.total_pages;

    for (let i = 1; i <= displayTotalPages; i++) {
      index.addPageSearch();
    }

    for (let e = 1; e <= displayTotalPages; e++) {
      let finalParam = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=e06cb446302dcf3a3cb1358720141aad&language=en-US&page=${e}&include_adult=false&query=${searchBar.value.value}`,
        {}
      );

      let finalParamResult = finalParam.then((finalResult) => {
        for (let o = 0; o < finalResult.data.results.length; o++) {
          index.addResultToPageSearch(e - 1, finalResult.data.results[o].id);
        }
      });
    }
  });

  console.log(searchOptions.value);
}
</script>

<style scoped>
html,
body {
  margin: 0px;
  padding: 0px;
}

#searchBar {
  position: absolute;

  right: 150px;

  margin-top: 5px;

  padding-top: 5px;
  padding-left: 5px;

  height: 30px;
  width: 225px;

  border-left: none;
  border-top: none;
  border-right: none;
  border-bottom-color: white;
  border-bottom-width: 1px;

  background-color: transparent;
  outline: none;

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: medium;
  color: white;

  text-align: right;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

#headerContainer {
  height: 50px;
  width: 100%;

  background-color: transparent;

  /*margin-left: 5px;*/
  padding-top: 20px;
  padding-bottom: 5px;
}

#title {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: italic;
  font-weight: bolder;

  color: white;

  margin-left: 115px;

  display: inline;

  text-shadow: 1px 1px 5px black;
}

#tagline {
  display: inline;

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: italic;
  font-weight: bold;

  font-size: medium;

  color: white;

  margin-left: 20px;

  text-shadow: 1px 1px 5px black;
}

#submitButton {
  position: absolute;

  top: 30px;
  right: 2%;

  outline: transparent;
  border-color: transparent;

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: normal;
  font-weight: normal;

  background-color: black;
  color: white;

  height: 25px;
  width: 100px;

  letter-spacing: 2px;
}

#submitButton:hover {
  border-style: solid;
  border-color: white;
  border-width: 2px;
}

#registerButton {
  position: absolute;

  top: 30px;
  right: 8%;

  outline: transparent;
  border-color: transparent;

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: normal;
  font-weight: normal;

  background-color: black;
  color: white;

  height: 25px;
  width: 125px;

  letter-spacing: 2px;
}

#registerButton:hover {
  border-style: solid;
  border-color: white;
  border-width: 2px;
}

img {
  position: absolute;

  margin-left: 20px;

  height: 50px;
  width: 78.3850931677px;
}
</style>

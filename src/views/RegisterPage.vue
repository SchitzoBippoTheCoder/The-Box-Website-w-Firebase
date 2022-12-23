<template>
    <div id="backgroundImage"></div>
    <HeaderToMainMenu title="Register to The Box" tagline="Make your account TODAY" button-value="HOME">
    </HeaderToMainMenu>
    <form @submit.prevent="checkLogin()" id="loginContainer">
        <label class="loginLabel">Email:</label>
        <br>
        <input type="email" ref="username" placeholder="Email" class="userInput">
        <br>
        <label class="loginLabel">Password: (6 or more characters)</label>
        <br>
        <input type="password" ref="password" placeholder="Password" class="userInput">
        <br>
        <label class="loginLabel">Confirm Password:</label>
        <br>
        <input type="password" ref="confirmPassword" placeholder="Confirm Password" class="userInput">
        <br />>
        <input type="submit" value="REGISTER" @click="checkLogin()" id="loginButton">
        <p @click="pushToLogin()">Already have an account? Sign in!</p>
    </form>
    <Footer message1="The Box" message2="Copyright © 2022 The Box, Inc." id="footer"></Footer>
    <AlertBox message="Account created! Login to get started!" id="accountBox" v-if="showAccount"></AlertBox>
    <AlertBox message="Password must be 6 characters or longer. Try again" id="alertBox" v-if="showPassword"></AlertBox>
    <AlertBox message="There was an error with your registration. Try again" id="alertBox" v-if="showError"></AlertBox>
</template>

<script setup>
import router from "../router";
import { ref } from "vue";
import HeaderToMainMenu from "../components/HeaderToMainMenu.vue"
import Footer from "../components/Footer.vue"
import AlertBox from "../components/AlertBox.vue"
import { auth } from "../firebase/index.js"
import { createUserWithEmailAndPassword } from "@firebase/auth";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");

let showError = ref(false);
let showPassword = ref(false);
let showAccount = ref(false);

function checkLogin() {
    if (password.value.value.length < 6) {
        showPassword.value = true;
        showError.value = false;
        showAccount.value = false;
        return;
    }

    if (confirmPassword.value.value != password.value.value || !username.value.value.includes("@")) {
        showError.value = true;
        showPassword.value = false;
        showAccount.value = false;
    }

    else {
        showAccount.value = true;
        showError.value = false;
        showPassword.value = false;
        createUserWithEmailAndPassword(auth, username.value.value, password.value.value);
    }
}

function pushToLogin() {
    router.push('/login');
}

</script>

<style scoped>
p {

    position: absolute;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    font-size: small;

    color: white;

    left: 210px;
    top: 245px;
}

p:hover {
    text-decoration: underline;
}

#backgroundImage {
    position: fixed;

    top: 0px;
    left: 0px;

    z-index: -1;

    height: 100%;
    width: 100%;
    background-image: url('../assets/movieBackground.jpg');
    background-size: cover;

    filter: brightness(25%);
}

#loginContainer {
    position: absolute;
    top: 49%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#loginButton {
    outline: transparent;
    border-color: transparent;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    vertical-align: middle;

    background-color: black;
    color: white;

    height: 25px;
    width: 125px;

    letter-spacing: 2px;
    margin-top: 3px;
    margin-left: -14px;
}

#loginButton:hover {
    border-style: solid;
    border-color: white;
    border-width: 2px;
}

#alertBox {

    position: absolute;

    bottom: 15px;
    right: 20px;

    height: 60px;
    width: 435px;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: medium;

    text-align: center;
    vertical-align: middle;

    color: white;

    background-color: darkred;

    border-right: 0.4rem solid;
    border-radius: 5px;

    box-shadow: 5px 8px 8px black;
}

#accountBox {

    position: absolute;

    bottom: 15px;
    right: 20px;

    height: 60px;
    width: 435px;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: medium;

    text-align: center;
    vertical-align: middle;

    color: white;

    background-color: green;

    border-right: 0.4rem solid;
    border-radius: 5px;

    box-shadow: 5px 8px 8px black;
}

.userInput {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: bold;

    height: 35px;
    width: 400px;

    margin-top: 10px;
    margin-bottom: 10px;

    padding-left: 7px;

    margin-bottom: 15px;

    border-style: none;

    border-radius: 3px;
}

.loginLabel {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: bold;

    letter-spacing: 1px;

    color: white;
}

#footer {
    position: absolute;

    bottom: 0px;

    margin-bottom: 20px;
}
</style>
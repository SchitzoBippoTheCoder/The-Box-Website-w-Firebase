<template>
    <div id="backgroundImage"></div>
    <HeaderToMainMenu title="Login to The Box" tagline="What will YOU find today?" button-value="HOME">
    </HeaderToMainMenu>
    <form @submit.prevent="checkLogin()" id="loginContainer">
        <label class="loginLabel">Email:</label>
        <br>
        <input type="email" ref="username" placeholder="Email" class="userInput">
        <br>
        <label class="loginLabel">Password:</label>
        <br>
        <input type="password" ref="password" placeholder="Password" class="userInput">
        <br>
        <input type="submit" value="LOGIN" @click="checkLogin()" id="loginButton">
        <p @click="pushToRegister()">Don't have an account? Sign up!</p>
    </form>
    <Footer message1="The Box" message2="Copyright © 2022 The Box, Inc." id="footer"></Footer>
    <AlertBox message="Your email or password is invalid. Please try again" id="alertBox" v-if="showError"></AlertBox>
</template>

<script setup>
import router from "../router";
import { ref } from "vue";
import HeaderToMainMenu from "../components/HeaderToMainMenu.vue"
import Footer from "../components/Footer.vue"
import AlertBox from "../components/AlertBox.vue"
import { auth } from "../firebase/index.js"
import { signInWithEmailAndPassword } from "@firebase/auth";

const username = ref("");
const password = ref("");

let showError = ref(false);

function checkLogin() {

    signInWithEmailAndPassword(auth, username.value.value, password.value.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            router.push('/shopping-area');

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            showError.value = true;

        });
}

function pushToRegister() {
    router.push('/register')
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

    left: 220px;
    top: 160px;
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
    top: 50%;
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
    width: 100px;

    letter-spacing: 2px;
}

#loginButton:hover {
    border-style: solid;
    border-color: white;
    border-width: 2px;
}

#registerButton {
    outline: transparent;
    border-color: transparent;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    vertical-align: middle;

    background-color: black;
    color: white;

    height: 25px;
    width: 275px;

    letter-spacing: 2px;

    top: 165px;
    left: 140px;
}

#registerButton:hover {
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
<script setup lang="ts">
import MainPage from "./components/MainPage.vue"
</script>

<template>
    <MainPage></MainPage>
</template>

<style>
@import "./assets/base.css";

:root {
    --L-font-size: 24px;
    --M-font-size: 19px;
    --S-font-size: 12px;
    --accent-color: #d49124;
    --component-b-color: rgb(14, 13, 13);
    --component-b-color-light: rgb(23, 23, 23);
    --linear-b-color: linear-gradient(0deg, black -5%, #171717);
    --row-amount: 24;
    --col-amount: 24;
    --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

html,
body,
#app {
    padding: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    box-sizing: border-box;
    font-weight: normal;
    font-size: 19px;
    font-family: var(--system-ui);
    /*  font-family: arial, helvetica, sans-serif; */
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    user-select: none;
}

/* https://css-tricks.com/how-to-create-neon-text-with-css/ */
.neonText {
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff,
        0 0 42px var(--accent-color), 0 0 82px var(--accent-color),
        0 0 92px var(--accent-color), 0 0 102px var(--accent-color),
        0 0 151px var(--accent-color);
}

.pulsate {
    animation: pulsate 1.5s infinite alternate;
}

@keyframes pulsate {
    100% {
        text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff,
            0 0 40px var(--accent-color), 0 0 80px var(--accent-color),
            0 0 90px var(--accent-color), 0 0 100px var(--accent-color),
            0 0 150px var(--accent-color);
    }

    0% {
        text-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff,
            0 0 10px var(--accent-color), 0 0 45px var(--accent-color),
            0 0 55px var(--accent-color), 0 0 70px var(--accent-color),
            0 0 80px var(--accent-color);
    }
}

.row-1 {
    height: calc((100% / var(--row-amount) * 1));
}
.row-2 {
    height: calc(((100% / var(--row-amount)) * 2));
}
.row-3 {
    height: calc(((100% / var(--row-amount)) * 3));
}
.row-4 {
    height: calc(((100% / var(--row-amount)) * 4));
}
.row-5 {
    height: calc(((100% / var(--row-amount)) * 5));
}
.row-6 {
    height: calc(((100% / var(--row-amount)) * 6));
}
.row-7 {
    height: calc(((100% / var(--row-amount)) * 7));
}
/* 33% */
.row-8 {
    height: calc(((100% / var(--row-amount)) * 8));
}
.row-9 {
    height: calc(((100% / var(--row-amount)) * 9));
}
.row-10 {
    height: calc(((100% / var(--row-amount)) * 10));
}
.row-11 {
    height: calc(((100% / var(--row-amount)) * 11));
}
/* 50% */
.row-12 {
    height: calc(((100% / var(--row-amount)) * 12));
}
.row-13 {
    height: calc(((100% / var(--row-amount)) * 13));
}
.row-14 {
    height: calc(((100% / var(--row-amount)) * 14));
}
.row-15 {
    height: calc(((100% / var(--row-amount)) * 15));
}
/* 66% */
.row-16 {
    height: calc(((100% / var(--row-amount)) * 16));
}
.row-17 {
    height: calc(((100% / var(--row-amount)) * 17));
}
.row-18 {
    height: calc(((100% / var(--row-amount)) * 18));
}
.row-19 {
    height: calc(((100% / var(--row-amount)) * 19));
}
.row-20 {
    height: calc(((100% / var(--row-amount)) * 20));
}
.row-21 {
    height: calc(((100% / var(--row-amount)) * 21));
}
.row-22 {
    height: calc(((100% / var(--row-amount)) * 22));
}
.row-23 {
    height: calc(((100% / var(--row-amount)) * 23));
}
.row-24 {
    height: 100%;
}

.col-1 {
    width: calc((100% / var(--col-amount) * 1));
}
.col-2 {
    width: calc(((100% / var(--col-amount)) * 2));
}
.col-3 {
    width: calc(((100% / var(--col-amount)) * 3));
}
.col-4 {
    width: calc(((100% / var(--col-amount)) * 4));
}
.col-5 {
    width: calc(((100% / var(--col-amount)) * 5));
}
.col-6 {
    width: calc(((100% / var(--col-amount)) * 6));
}
.col-7 {
    width: calc(((100% / var(--col-amount)) * 7));
}
/* 33% */
.col-8 {
    width: calc(((100% / var(--col-amount)) * 8));
}
.col-9 {
    width: calc(((100% / var(--col-amount)) * 9));
}
.col-10 {
    width: calc(((100% / var(--col-amount)) * 10));
}
.col-11 {
    width: calc(((100% / var(--col-amount)) * 11));
}
/* 50% */
.col-12 {
    width: calc(((100% / var(--col-amount)) * 12));
}
.col-13 {
    width: calc(((100% / var(--col-amount)) * 13));
}
.col-14 {
    width: calc(((100% / var(--col-amount)) * 14));
}
.col-15 {
    width: calc(((100% / var(--col-amount)) * 15));
}
/* 66% */
.col-16 {
    width: calc(((100% / var(--col-amount)) * 16));
}
.col-17 {
    width: calc(((100% / var(--col-amount)) * 17));
}
.col-18 {
    width: calc(((100% / var(--col-amount)) * 18));
}
.col-19 {
    width: calc(((100% / var(--col-amount)) * 19));
}
.col-20 {
    width: calc(((100% / var(--col-amount)) * 20));
}
.col-21 {
    width: calc(((100% / var(--col-amount)) * 21));
}
.col-22 {
    width: calc(((100% / var(--col-amount)) * 22));
}
.col-23 {
    width: calc(((100% / var(--col-amount)) * 23));
}
.col-24 {
    width: 100%;
}

[class*="col-"] {
    float: left;
}
</style>

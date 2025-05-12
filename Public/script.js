"use strict";

// Select sections from HTML
const sectionHero = document.querySelector(".section-hero");
const sectionDonor = document.querySelector(".section-donor");
const sectionPatient = document.querySelector(".section-patient");
const sectionBank = document.querySelector(".section-bank");

// Select navigation links by their href attributes
const btnHome = document.querySelector('a[href="#hero"]');
const btnDonor = document.querySelector('a[href="#cta"]');
const btnDonateNow = document.querySelector('a.btn--full');
const btnPatient = document.querySelector('a[href="#patient"]');
const btnBank = document.querySelector('a[href="#bank"]');

// Function to hide all sections except the one to show
function showSection(sectionToShow) {
  [sectionHero, sectionDonor, sectionPatient, sectionBank].forEach(sec => {
    sec.style.display = "none";
  });
  sectionToShow.style.display = "block";
}

// Show hero on initial load
document.addEventListener("DOMContentLoaded", () => {
  showSection(sectionHero);
});

// Display functions
btnHome.addEventListener("click", () => showSection(sectionHero));
btnDonor.addEventListener("click", () => showSection(sectionDonor));
btnDonateNow.addEventListener("click", () => showSection(sectionDonor));
btnPatient.addEventListener("click", () => showSection(sectionPatient));
btnBank.addEventListener("click", () => showSection(sectionBank));

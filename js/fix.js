import { $ } from "./bannerOpacity.js";

let header = $("header");
let search = $("#search");
let searchM = $(".search-m");
let logo = $(".search-m .mini-logo");
let form = $(".search-m .form");
let cart = $(".search-m .settleup");

window.onscroll = function () {
	if (document.documentElement.scrollTop >= header.offsetHeight) {
		search.classList.add("fixed");
		searchM.style.height = "50px";
		searchM.classList.add("w");
		logo.style.display = "block";
		form.style.top = "8px";
		cart.style.top = "8px";
	} else {
		search.classList.remove("fixed");
		logo.style.display = "none";
	}
};

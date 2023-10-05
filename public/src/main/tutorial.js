//This variable represents the tutorial section, which is usually a pop-up
//or a special area on the webpage where the tutorial or instructions are displayed.
const tut_sec = document.querySelector(".tutorial");

//This variable represents the tutorial pages, which are the individual pages
const tut_pages = document.querySelectorAll(".tutorial-wrapper");

//This variable represents the tutorial buttons, which are the buttons that
const tut_nbtn = document.querySelector(".next");
const tut_pbtn = document.querySelector(".prev");
const tut_sbtn = document.querySelector(".skip");

//This variable represents the current page of the tutorial
let tut_page_count = 0;

//This function handles the skip button, which is the button that allows the user to skip the tutorial
const skip_tut = (element) => {
  tut_sec.style.display = "none"; //This hides the tutorial section means that the tutorial is skipped
};

//This function handles the page change, which is the function that allows the user to change the page of the tutorial
const tut_page_change = (element) => {
  const p_page = document.querySelector(".tutorial-active");
  p_page.classList.remove("tutorial-active");

  //This if statement checks if the user clicks the next button, previous button, or go button
  if (element.target.innerHTML === "Next") {
    tut_page_count++;
  } else if (element.target.innerHTML === "Previous") {
    tut_page_count--;
  } else if (element.target.innerHTML === "Go") {
    skip_tut();
  }
  const curr_page = tut_pages[tut_page_count]; //This variable represents the current page of the tutorial

  curr_page.classList.add("tutorial-active"); //This adds the class tutorial-active to the current page of the tutorial

  if (tut_page_count == 0) {
    tut_pbtn.style.opacity = 0; //This hides the previous button
    tut_pbtn.style.pointerEvents = "none"; //This disables the previous button
  } else if (tut_page_count > 0 && tut_page_count < tut_pages.length - 1) {
    tut_nbtn.innerHTML = "Next"; //This changes the text of the next button to Next
    tut_pbtn.style.opacity = 1; //This shows the previous button
    tut_pbtn.style.pointerEvents = "auto"; //This enables the previous button
    tut_nbtn.style.opacity = 1; //This shows the next button
    tut_nbtn.style.pointerEvents = "auto"; //This enables the next button
  } else if (tut_page_count == tut_pages.length - 1) {
    tut_nbtn.innerHTML = "Go"; //This changes the text of the next button to Go
  }
};

tut_nbtn.onclick = tut_page_change; //This calls the tut_page_change function when the next button is clicked
tut_pbtn.onclick = tut_page_change; //This calls the tut_page_change function when the previous button is clicked
tut_sbtn.onclick = skip_tut; //This calls the skip_tut function when the skip button is clicked

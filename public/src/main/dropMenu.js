const menu = document.querySelectorAll(".menu"); //This variable represents the menu, which is the dropMenu menu that contains the algorithms, mazes, and speeds

const clear_PDD = () => {
  const prev = document.querySelector(".dropMenu-menu-open"); //This variable represents the previous dropMenu menu that was open
  prev ? prev.classList.remove("dropMenu-menu-open") : null; //This checks if the previous dropMenu menu exists and removes the class dropMenu-menu-open if it does
};

//This function clears the previous dropMenu menu
const fix_clear = (element) => {
  clear_PDD();
  const DD =
    element.currentTarget.children[element.currentTarget.children.length - 1]; //This variable represents the dropMenu menu that is clicked
  if (element.target.parentNode === DD) return; //This checks if the dropMenu menu is clicked and returns if it is
  DD.classList.toggle("dropMenu-menu-open"); //This toggles the class dropMenu-menu-open of the dropMenu menu
};

document.onclick = (element) => {
  if (element.target.className !== "nav-button") clear_PDD(); //This checks if the target of the click is not the nav-button and clears the previous dropMenu menu if it is not
};

menu.forEach((menu) => (menu.onclick = fix_clear)); //This calls the fix_clear function when the menu is clicked

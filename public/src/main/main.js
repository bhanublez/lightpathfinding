//Importing function from utility.js
import {
  clearPrevSearch,
  clearTable,
  handleError,
  setWall,
  waitForMs,
  disableAllButtons,
  enableAllButtons,
} from "../utilities/utility.js";

// Importing functions from other files
import { createTable } from "../table/table.js";
import { Graph } from "../graph/Graph.js";
import { dfs } from "../algorithms/dfs.js";
import { bfs } from "../algorithms/bfs.js";
import { basicMaze } from "../mazes/basicMaze.js";
import { dijkstraSearch } from "../algorithms/dijkstrasAlg.js";

// Global variables constants and letiables
const wider = Math.floor(window.innerWidth / 25); //width of table
const long = Math.floor(500 / 25); //height of table
let speedy = 10; //speed of animation
let user_algo;

const tableBody = document.querySelector(".table-body"); //table body
const startBtn = document.querySelector(".startButton"); //start button
const clearBtn = document.querySelector(".clearButton"); //clear button
const resetPath = document.querySelector(".resetPath"); //reset path button
// const stopBtn = document.querySelector(".stopButton"); //stop button

const algorithms = document.querySelectorAll(".alg"); //algorithm buttons
const speedButtons = document.querySelectorAll(".speed"); //speed buttons
const desc = document.querySelector(".description-content"); //description of algorithm
const mazeGenerator = document.querySelectorAll(".maze"); //maze buttons

createTable(wider, long); //creating table

// Functions used to convert table to graph and vice versa
const convertTableToGraph = () => {
  const tableNodes = document.querySelectorAll(".tableNode");
  const graph = new Graph(false, true);
  graph.convertTo2DGraph(tableNodes, wider, long);
  return graph;
};

// Functions used to visualize the path
const visualize = async (arr) => {
  disableAllButtons();
  stopBtn.disabled = false;
  await animateSearch(arr[0]); // This function animates the search here await is used to wait for the animation to complete
  await animatePath(arr[1]); //  This function animates the path
  enableAllButtons();
};

// Functions used to animate the path
const animateSearch = async (arr) => {
  let handle = document.querySelector(".board");
  for (let i = 0; i < arr.length; i++) {
    await waitForMs(speedy);
    if (
      arr[i].val.id === "wall" ||
      arr[i].val.id === "target" ||
      arr[i].val.id === "start"
    ) {
      null;
    } else {
      arr[i].val.id = "visited";
      handle.classList.add("disable");
    }
  }
  handle.classList.remove("disable");
};

// Functions used to animate the path
const animatePath = async (arr) => {
  for (let i = 0; i < arr.length; i++) {
    await waitForMs(speedy); //speed of animation
    //if the node is wall or target or start then do nothing
    if (
      arr[i].val.id === "wall" ||
      arr[i].val.id === "target" ||
      arr[i].val.id === "start"
    ) {
      null;
    } else {
      arr[i].val.id = "path";
    }
  }
};

// Functions used to set the description of the algorithm
const setDescription = (algorithm) => {
  desc.innerHTML = "";

  //switch case to set the description of the algorithm
  switch (algorithm) {
    case "Depth First Search":
      desc.append(
        "DFS is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking."
      );
      break;
    case "Breadth First Search":
      desc.append(
        "BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level."
      );
      break;
    case `Dijkstra's algorithm`:
      desc.append(
        "This algorithm is used to find the shortest path between two nodes of a weighted graph. It is a greedy algorithm that solves the single-source shortest path problem for a directed graph with non-negative edge weights."
      );
      break;
    default:
      desc.append("Bhai kuch choose karle");
  }
};

const handleStart = () => {
  clearPrevSearch(); //clearing the previous search

  const graph = convertTableToGraph(); //converting table to graph
  graph.addNeighbors(1); //adding neighbors to the graph
  const algorithm = user_algo; //getting the algorithm chosen by the user

  setDescription(algorithm); //setting the description of the algorithm
  const startNode = document.querySelector("#start"); //getting the start node
  const targetNode = document.querySelector("#target"); //getting the target node
  //if start node or target node is not selected then throw error
  if (!startNode || !targetNode)
    return handleError("Mention start and target node Please");

  //getting the x and y coordinates of start and target node
  const startX = Number(startNode.datatype.split("-")[0]); // This variable represents the x coordinate of the start node
  const startY = Number(startNode.datatype.split("-")[1]); // This variable represents the y coordinate of the start node
  const targetX = Number(targetNode.datatype.split("-")[0]); // This variable represents the x coordinate of the target node
  const targetY = Number(targetNode.datatype.split("-")[1]); // This variable represents the y coordinate of the target node

  //switch case to choose the algorithm
  switch (algorithm) {
    //Disable mouse movement

    case "Depth First Search":
      visualize(dfs(graph.vertices[startX][startY]));
      break;
    case "Breadth First Search":
      visualize(bfs(graph.vertices[startX][startY]));
      break;
    case `Dijkstra's algorithm`:
      visualize(
        dijkstraSearch(
          graph.vertices[startX][startY],
          graph.vertices[targetX][targetY],
          graph.vertices
        )
      );
      break;
  }
};

//function to stop the animation
// const handelStop = () => {
//   //Reset table and stop handlStart processing
//   clearPrevSearch();
// };

//function to set the description of the algorithm
const handleAlgChoice = (element) => {
  user_algo = element.target.innerHTML;
  setDescription(element.target.innerHTML);
};

//function to set the speed of animation
const handleSpeedChange = (element) => {
  const speedSpan = document.getElementById("speedChange");// This variable represents the speed span

  //switch case to set the speed of animation
  switch (element.target.innerHTML) {
    case "Fast":
      speedy = 10;
      speedSpan.innerHTML = "Speed: Fast";
      break;
    case "Average":
      speedy = 30;
      speedSpan.innerHTML = "Speed: Average";

      break;
    case "Slow":
      speedy = 40;
      speedSpan.innerHTML = "Speed: Slow";
      break;
    case "Super slow":
      speedy = 100;
      speedSpan.innerHTML = "Speed: Super Slow";
      break;
    case "Super Fast":
      speedy = 0.01;
      speedSpan.innerHTML = "Speed: Super Fast";
      break;
  }
};

//function to generate maze
const handleMazeGeneration = async (e) => {
  clearTable();
  const graph = convertTableToGraph();
  graph.addNeighbors(1);

  disableAllButtons();
  switch (e.target.innerHTML) {
    case "Basic Maze":
      basicMaze(graph.vertices);// This function generates a basic maze
      enableAllButtons();// This enables all the buttons
      break;
  }
};

/* Listeners */

mazeGenerator.forEach((btn) => (btn.onclick = handleMazeGeneration));// This function sets the node to unvisited
speedButtons.forEach((btn) => (btn.onclick = handleSpeedChange));// This function sets the node to unvisited
algorithms.forEach((alg) => (alg.onclick = handleAlgChoice));// This function sets the node to unvisited
clearBtn.onclick = clearTable;// This function sets the node to unvisited
resetPath.onclick = clearPrevSearch;// This function sets the node to unvisited
startBtn.onclick = handleStart;// This function sets the node to unvisited
tableBody.onmousemove = setWall;// This function sets the node to unvisited
// stopBtn.onclick = handelStop;// This function sets the node to unvisited

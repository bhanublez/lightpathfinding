import { randomize } from "../utilities/utility.js";

// Basic maze algorithm
export const basicMaze = (vertices) => {
  // This function takes in a list of vertices and returns a basic maze
  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices[i].length; j++) {
      const random = randomize(10); //This variable represents a random number between 0 and 10
      //This if statement checks if the random number is less than 3
      if (random < 3) {
        vertices[i][j].val.id === "start" || vertices[i][j].val.id === "target" //This checks if the node is the start or target node
          ? null
          : (vertices[i][j].val.id = "wall"); //This sets the node to a wall
      }
    }
  }
};

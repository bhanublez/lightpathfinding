//dfs algorithm that takes in a start node and returns an array of visited vertices and the path
export const dfs = (start) => {
  let stack = []; //This variable represents the stack, which is the stack of vertices that make up the path

  const visited = [start]; //This variable represents the visited vertices, which are the vertices that have been visited
  stack.push(start);
  let path = []; //This variable represents the path, which is the array of vertices that make up the path
  //This while loop checks if the stack is not empty
  while (stack.length) {
    const curr = stack.pop(); //This variable represents the curr vertex
    //This if statement checks if the curr vertex is the target/end vertex
    if (curr.val.id === "target") {
      path = [...visited]; //This sets the path to the path that is built
      break;
    }
    if (!visited.includes(curr)) visited.push(curr); //This pushes the curr vertex to the visited vertices

    //This for loop iterates through the edges of the current vertex
    curr.edges.forEach((edge) => {
      const nb = edge.end; //This variable represents the neighbor vertex
      if (nb.val.id === "wall") return; //This if statement checks if the neighbor vertex is a wall
      //This if statement checks if the neighbor vertex is not in the visited vertices
      if (!visited.includes(nb)) {
        stack.push(nb); // This pushes the neighbor vertex to the stack
      }
    });
  }
  return [visited, path]; //This returns the visited vertices and the path
};

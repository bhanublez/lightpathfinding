//This is bfs algorithm that takes in a start node and returns an array of visited vertices and the path
export const bfs = (start) => {
  const visited = [start]; //This variable represents the visited vertices, which are the vertices that have been visited
  const visitQueue = []; //This variable represents the visit queue, which is the queue of vertices that are going to be visited
  visitQueue.push(start);
  const predecessors = []; //This variable represents the predecessors, which are the vertices that come before the current vertex
  predecessors[start.val.datatype] = null;
  let path = []; //This variable represents the path, which is the array of vertices that make up the path
  while (visitQueue.length) {
    const curr = visitQueue.shift(); //This variable represents the curr vertex
    //This if statement checks if the curr vertex is the target/end vertex
    if (curr.val.id === "target") {
      path = generatePath(start, predecessors); //This sets the path to the path that is built
      break;
    }
    curr.edges.forEach((edge) => {
      const nb = edge.end; //This variable represents the neighbor vertex
      //This if statement checks if the neighbor vertex is a wall
      if (nb.val.id === "wall") return;
      //This if statement checks if the neighbor vertex is not in the visited vertices
      if (!visited.includes(nb)) {
        visited.push(nb); //This pushes the neighbor vertex to the visited vertices
        predecessors[nb.val.datatype] = curr; //This sets the predecessor of the neighbor vertex to the current vertex
        visitQueue.push(nb); //This pushes the neighbor vertex to the visit queue
      }
    });
  }

  return [visited, path]; //This returns the visited vertices and the path
};

const generatePath = (start, backTrace) => {
  const goal = document.querySelector("#target").datatype; //This variable represents the goal vertex
  const stack = []; //This variable represents the stack, which is the stack of vertices that make up the path
  stack.push(); //This pushes the start vertex to the stack

  let present = backTrace[goal]; //This variable represents the current vertex

  //This while loop checks if the current vertex is not the start vertex
  while (present !== start) {
    stack.push(present);
    if (typeof present === "string") {
      present = backTrace[present];
    } else {
      present = backTrace[present.val.datatype]; //This variable represents the current vertex
    }
  }

  return stack.reverse(); //This returns the stack in reverse order
};

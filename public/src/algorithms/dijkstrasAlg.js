
// This function is an implementation of Dijkstra's algorithm, which is a weighted graph search algorithm that finds the shortest path between two nodes in a graph. It takes in a start node, a target node, and a list of vertices. It returns an array of visited nodes and an array of the shortest path between the start and target nodes.
export const dijkstraSearch = (start, target, vertices) => {
    const distances = {};//This variable represents the distances of the nodes from the start node
    const minHeap = [[start, 0]];//This variable represents the min heap, which is a data structure that stores the nodes in order of their distance from the start node

    //This for loop iterates through the vertices and sets the distance of each node to infinity
    for (let i=0; i<vertices.length;i++) {
        for(let j=0;j<vertices[i].length; j++) {
            if (vertices[i][j] !== start) distances[vertices[i][j].val.datatype] = Infinity;
        }
    }
    distances[start.val.datatype] = 0;//This sets the distance of the start node to 0
    const visited = [];//This variable represents the visited nodes

    //This while loop runs while the min heap is not empty
    while (minHeap.length) {
   
        const [node, distance] = minHeap.shift();//This variable represents the node with the shortest distance from the start node
        visited.push(node);//This pushes the node to the visited nodes
        //This if statement checks if the node is the target node
        if (node === target) {
            const path = [];//This variable represents the shortest path between the start and target nodes
            let current = node.parent;//This variable represents the current node
            //This while loop runs while the current node is not null
            while (current) {
                path.push(current)
                current = current.parent//This sets the current node to its parent
            }
            return [visited, path.reverse()];//This returns the visited nodes and the shortest path between the start and target nodes
          
        }
        //This for loop iterates through the edges of the current node
        node.edges.forEach(edge => {
            const nb = edge.end;//This variable represents the neighbor of the current node
            const weight = edge.weight;//This variable represents the weight of the edge between the current node and its neighbor
            if (nb.val.id === 'wall') return;//This checks if the neighbor is a wall
            let alt = distances[node.val.datatype] + weight;//This variable represents the new distance of the neighbor from the start node
      
            if (alt < distances[nb.val.datatype]) {//This checks if the new distance is less than the current distance of the neighbor
                distances[nb.val.datatype] = alt;//This sets the distance of the neighbor to the current node to the new distance
                nb.parent = node;//This sets the parent of the neighbor to the current node
                minHeap.push([nb, distances[nb.val.datatype]]);//This pushes the neighbor and its distance from the start node to the min heap
            }
            
        })
        minHeap.sort((a,b) => a[1] - b[1]);//This sorts the min heap
    } 
    return [visited, []]//This returns the visited nodes and the shortest path between the start and target nodes
}   
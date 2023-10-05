//Edge class is used to connect two vertices
export class Edge {
    //Edge class takes in a start vertex, end vertex, and weight
    constructor(start = null, end=null, weight=null) {
        this.start = start;//start vertex
        this.end = end;//end vertex
        this.weight = weight//weight of the edge
    }
}

//Vertex class is used to represent a node in a graph
export class Vertex {
    //Vertex class takes in a value, an array of edges, and x and y coordinates
    constructor(val,x,y) {
        this.val = val;//value of the vertex
        this.edges = [];//array of edges
        //x and y coordinates of the vertex
        this.x = x;
        this.y = y;
        this.g = 0;//g value of the vertex means the distance from the start vertex
        this.f = 0;//f value of the vertex means the sum of g and h
        this.h = 0;//h value of the vertex means the distance from the end vertex
        this.parent = null;//parent of the vertex
    }
    //This function adds an edge to the vertex
    addEdge(vertex, weight=null) {
        this.edges.push(new Edge(this, vertex, weight));//This creates a new edge and pushes it to the array of edges
    }
    //This function removes an edge from the vertex
    removeEdge(vertex) {
      //This filters out the edge that connects the vertex to the input vertex means simple term it removes the edge from the vertex
      this.edges = this.edges.filter((edge) => edge.end.val !== vertex.val);
    }    
    //This function adds the neighbors of the vertex    
    addNeighbors(arr, weight) {
        const vertical = this.x;//vertical coordinate of the vertex
        const horizontal = this.y;//horizontal coordinate of the vertex    
        //This if statement checks if the vertex is a wall and if it is, it returns
        if (horizontal > 0) this.edges.push(new Edge(this, arr[vertical][horizontal - 1], weight));
        if (horizontal < arr[vertical].length -1) this.edges.push(new Edge(this, arr[vertical][horizontal + 1], weight));
        if (vertical > 0) this.edges.push(new Edge(this, arr[vertical - 1][horizontal], weight));
        if (vertical < arr.length-1) this.edges.push(new Edge(this, arr[vertical + 1][horizontal], weight));
    }

}

//Graph class is used to represent a graph
export class Graph {
    constructor(isDirected=false, isWeighted=false) {//Graph class takes in a boolean value that represents whether the graph is directed and a boolean value that represents whether the graph is weighted
        this.isDirected = isDirected;//This variable represents whether the graph is directed
        this.isWeighted = isWeighted;//This variable represents whether the graph is weighted
        this.vertices = [];//This variable represents the vertices of the graph
    }

    //This function adds a vertex to the graph
    addVertex(val) {      
          
        const newVertex = new Vertex(val); //This creates a new vertex
        this.vertices.push(newVertex);//This pushes the new vertex to the array of vertices
        return newVertex;//This returns the new vertex
        
    }

    //This function removes a vertex from the graph
    addEdge(vertexOne, vertexTwo, weight) {

        vertexOne.addEdge(vertexTwo, weight);// This adds an edge from the first vertex to the second vertex
        if (!this.isDirected) return vertexTwo.addEdge(vertexOne, weight)//This checks if the graph is directed and if it is, it adds an edge from the second vertex to the first vertex
        return;
    }

    //This function removes an edge from the graph
    removeEdge(vertexOne, vertexTwo) {
        vertexOne.removeEdge(vertexTwo);//This removes the edge from the first vertex to the second vertex
        if (!this.isDirected) return vertexTwo.removeEdge(vertexOne)//This checks if the graph is directed and if it is, it removes the edge from the second vertex to the first vertex
        return;

    }
//This function removes a vertex from the graph
    addNeighbors(distance) {
        const weight = this.isWeighted ? distance:  null//This checks if the graph is weighted and if it is, it sets the weight to the distance
        //This for loop iterates through the vertices of the graph
        for (let i = 0; i < this.vertices.length; i++) {
            for(let j=0;j<this.vertices[i].length; j++) {
                this.vertices[i][j].addNeighbors(this.vertices, weight)//This adds the neighbors of the vertex
            }
        }
    }
    //This function converts a 1D array to a 2D array
    convertTo2DGraph(arr, width, height) {
    
        const arrToConvert = [...arr];//This variable represents the array to convert
        const towDArr = [];//This variable represents the 2D array
        //This for loop iterates through the array to convert
        for (let i=0; i<height; i++) {
            const line = [];//This variable represents a line in the 2D array
            //This for loop iterates through the width of the 2D array
            for (let j=0; j<width; j++) {
                line.push(new Vertex(arrToConvert[j], i,j));               
            }
            arrToConvert.splice(0, width);//This removes the first width elements of the array to convert
            towDArr.push(line);//This pushes the line to the 2D arrayS
        }
        this.vertices = towDArr;//This sets the vertices of the graph to the 2D array
    }
   
   
}


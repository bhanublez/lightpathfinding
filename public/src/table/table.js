import { setTarget, setStart } from "../utilities/utility.js";

// This file contains the function that creates the table
const START_X = 9;
const START_Y = 10;
const TARGET_X = 9;
const TARGET_Y = 50;

const tableBody = document.querySelector('.table-body');//This variable represents the table body

// This function creates the table
export const createTable = (width, height) => {    
   
  
    //This for loop iterates through the height of the table
    for (let i = 0; i < height; i++) {
        const tableRow = document.createElement('tr');//This variable represents a row in the table
        tableRow.id = `row ${i}`;
        
        
        for(let j=0; j<width; j++) {
            const tableNode = document.createElement('td');//This variable represents a node in the table
            tableNode.className = 'tableNode';//This sets the class of the node to tableNode
            tableNode.datatype = `${i}-${j}`; //This sets the datatype of the node to the coordinates of the node

            //This if statement checks if the node is the start node
            if (i === START_X && j === START_Y) {
                tableNode.id = 'start' //This sets the id of the node to start      
                
            } else if (i === TARGET_X && j === TARGET_Y) {
                tableNode.id = 'target';//This sets the id of the node to target           
            }
            else {
                tableNode.id = 'unvisited';
                tableNode.onclick = setTarget;
                tableNode.ondblclick = setStart;
            }
            tableRow.append(tableNode);//This appends the node to the row
        } 
        tableBody.append(tableRow);//This appends the row to the table body
        
    }
    
}


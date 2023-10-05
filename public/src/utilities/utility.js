
// Utility functions
export const setWall = (element) => {
    // This function sets the node to a wall 
    if (element.buttons === 1 && element.target.className === 'tableNode') {
        // This if statement checks if the left mouse button is clicked and if the target is a node
        if (element.target.id === 'unvisited' || element.target.id === 'visited') return element.target.id = 'wall';

    } else if (element.buttons === 2 && element.target.className === 'tableNode') {
        if (element.target.id === 'start' || element.target.id === 'target') return;// This if statement checks if the right mouse button is clicked and if the target is a node
        return element.target.id = 'unvisited'// This sets the node to unvisited
    }

}

// This function sets the target node
export const setTarget = (element) => {
    // This if statement checks if the target is a node
    const prevTarget = document.querySelector('#target');
    prevTarget ? prevTarget.id = 'unvisited' : null;

    element.target.id = 'target'
}

// This function sets the start node
export const setStart = (element) => {
    const prvStart = document.querySelector('#start');// This variable represents the previous start node
    prvStart ? prvStart.id = 'unvisited' : null;// This if statement checks if the previous start node exists

    element.target.id = 'start'// This sets the id of the node to start
}

// This function sets the node to unvisited
export const waitForMs = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));// This function waits for a certain amount of time
}

// This function sets the node to unvisited
export const clearTable = () => {
    enableAllButtons();// This enables all the buttons
    const nodes = document.querySelectorAll('.tableNode');// This variable represents all the nodes in the table
    nodes.forEach(node => {
        if (node.id === 'start' || node.id === 'target') return;// This if statement checks if the node is the start or target node
        node.id = 'unvisited'
        node.style.border = '1px solid black';
    })
}


// This function sets the node to unvisited
export const clearPrevSearch = () => {
    enableAllButtons();// This enables all the buttons
    const nodes = document.querySelectorAll('.tableNode');// This variable represents all the nodes in the table
    // This for loop iterates through the nodes
    nodes.forEach(node => {
        if (node.id === 'start' || node.id === 'target' || node.id === 'wall') return;// This if statement checks if the node is the start, target, or wall node
        node.id = 'unvisited';
    })
}

// This function sets the node to unvisited
export const randomize = (max) => {
    return  Math.floor(Math.random() * max);// This function returns a random number
}

// This function sets the node to unvisited
export const handleError = (msg) => {
    
    const prevMsg = document.querySelector('.description-content');// This variable represents the previous message
    prevMsg.innerHTML = '';// This clears the previous message

    prevMsg.append(msg);// This appends the message to the description content
}

// This function sets the node to unvisited
export const disableAllButtons = () => {
    const buttons = document.querySelectorAll('button');// This variable represents all the buttons
    buttons.forEach(btn => btn.disabled = true);  // This disables all the buttons
}

// This function sets the node to unvisited
export const enableAllButtons = () => {
    const buttons = document.querySelectorAll('button');// This variable represents all the buttons
    buttons.forEach(btn => btn.disabled = false);// This enables all the buttons
}
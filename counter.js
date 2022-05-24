// Defines the actions:
var Inc = 'inc';                     
var Dec = 'dec';                     
var Res = 'reset';                   

function update (action, model) {     // takes the current state
  switch(action) {                   // 
    case Inc: return model + 1;      // makes model go up by one
    case Dec: return model - 1;      // makes model go down by one
    case Res: return 0;              // brings state to 0
    default: return model;           // if theres no action return to the current state
  }                                  // (the default aways returns the current)
}

function view(model, signal) {
  return container([                           // DOM nodes stored in array
    button('+', signal, Inc),                  // itterate to return what is stored
    div('count', model),                       // make a dive with the model as text
    button('-', signal, Dec)/*,                  // decrement counter
    button('Reset', signal, Res) */             // reset counter
                               // make a div with the name of counter
    
  ]); 
} 

// Mount Function receives all of the MUV and mounts the applet in the "root" DOM Element chile idk
function mount(model, update, view, root_element_id, photo) {
  var root = document.getElementById(root_element_id); 
  function signal(action) {         
    return function callback() {     
      model = update(action, model); 
      empty(root);
      root.appendChild(view(model, signal));
      root.appendChild(div('id', root_element_id) )
      var img = document.createElement("img");
      img.src = photo;
      root.appendChild(img); 
    };
  };
  root.appendChild(view(model, signal));
  root.appendChild(div('id', root_element_id) )
  var img = document.createElement("img");
  img.src = photo;
  root.appendChild(img);     
}

// Helper funtions

// before re-rendering empty the contents of a given DOM element "node"
function empty(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
} 

function button(text, signal, action) {
  var button = document.createElement('button');
  var text = document.createTextNode(text);    
  button.appendChild(text);                   
  button.className = action;                   
  button.id = action;
  // console.log(signal, ' action:', action)
  button.onclick = signal(action);             
  return button;                               
} 

function div(divid, text) {
  var div = document.createElement('div');
  div.id = divid;
  div.className = divid;
  if(text !== undefined) { 
    var txt = document.createTextNode(text);
    div.appendChild(txt);
  }
  return div;
}


function container(elements) {
  var con = document.createElement('section');
  con.className = 'counter';
  elements.forEach(function(el) { con.appendChild(el) });

 

  return con;
}



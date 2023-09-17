// MODELO
var info = [];
var nuevoLi = document.createElement("li");



//CONTROLES
function indexContr() { 
document.getElementById("main").innerHTML = indexView(info);
updateItemCount();
};

function createContr(event){
    if(event.key === "Enter"){
        var tareas=document.getElementById("tareas").value
        info.push({tareas, completada:false});
        document.getElementById("tareas").value = "";
        indexContr();
    }
    
}
function deletetarea(i) {
    info.splice(i,1);
    indexContr();
}



//VISTA
function indexView (ubicacion){
    var i=0, 
    
    html= `
    <ul class="todo-list">
    
    `;
        while(i< ubicacion.length){
            html = html + 
                `<li class="">
                    <div class="view">
                        <div class="union"> 
                        <input class="toggle" onclick="checkContr(${i});" type="checkbox" ${ubicacion[i].completada ? 'checked' : ''} />
                        
                            <label>${info[i].tareas} </label>

                        </div>
                        
                        <button class="destroy" id="delete" data-my-id="${i}"></button>
                    </div>
                </li>
            `;

            i=i+1;
            var checkbox = document.getElementById("check");

        };
        
        
        return html + 
    `
    </ul>`;
};


function checkContr(i){
    info[i].completada = !info[i].completada;
    indexContr();
}

function updateItemCount() {
    var itemCount = info.length;
    var itemCountElement = document.getElementById("item-count");
    itemCountElement.textContent = itemCount; 
}

function borrarLista() {
    info = [];
    indexContr(); 
}
function mostrarCompletadas() {
    var tareasCompletadas = info.filter(item => item.completada);
    document.getElementById("main").innerHTML = indexView(tareasCompletadas);
}

function mostrarPendientes() {
    var tareasPendientes = info.filter(item => !item.completada);
    document.getElementById("main").innerHTML = indexView(tareasPendientes);
}

function mostrarTodo() {
    document.getElementById("main").innerHTML = indexView(info);
}

// EVENTOS
document.addEventListener('DOMContentLoaded', ev => indexContr());
document.addEventListener('click', ev => {
    if (ev.target.matches('#delete')) deletetarea(ev.target.dataset.myId);
    else if (ev.target.matches('#index')) indexContr();
    else if (ev.target.matches('#limpiar')) borrarLista();

})

//import 'bootstrap';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.js"

const userStack = {
    language : "JavaScript",
    framework : "Angular"
}

const user = {
    name : "Tema",
    age : "20",
    ...userStack
}

let state = {
    Data : [ {
            name : "SomethingOne",
            link : "#a",
            flag : 2,
            info : "About SomethingOne",
            id : 0,
        },
        {
            name : "SomethingTwo",
            link : "#a",
            flag : 0,
            info : "About SomethingTwo",
            id : 1,
        },
        {
            name : "SomethingThree",
            link : "#a",
            flag : 3,
            info : "About SomethingThree",
            id : 2,
        },
        {
            name : "SomethingFour",
            link : "#a",
            flag : 1,
            info : "About SomethingFour",
            id : 3,
        }
    ],
    sorted : false,
    //something more
}

const CreateAccordion_Item = (props) =>{
   
    let colors = ["red", "yellow", "green", "aquamarine"];

    let div_me = document.createElement("div");
    div_me.className = "accordion-item";

    let h2_me = document.createElement("h2");
    h2_me.className = "accordion-header";
    h2_me.id = `heading${props.id}`;
    

    let h2_me_button = document.createElement("button");
    h2_me_button.className = "accordion-button collapsed";
    h2_me_button.type = "button";
    h2_me_button.setAttribute('data-bs-toggle','collapse');
    h2_me_button.setAttribute('data-bs-target',`#collapse${props.id}`);
    h2_me_button.setAttribute('aria-expanded','false');
    h2_me_button.setAttribute('aria-controls',`#collapse${props.id}`);
    h2_me_button.innerHTML = `${props.name} ${props.id}`;
    h2_me_button.style.background = colors[props.flag];
    h2_me.appendChild(h2_me_button);

    let div_me_collapse = document.createElement("div");

    div_me_collapse.id = `collapse${props.id}`
    div_me_collapse.className = "accordion-collapse collapse";
    div_me_collapse.setAttribute('aria-labelledby', `heading${props.id}`);
    div_me_collapse.setAttribute('data-bs-parent','#accordionExample');

    let div_me_collapse_son = document.createElement('div');
    div_me_collapse_son.className = "accordion-body";
    div_me_collapse_son.innerHTML =  props.info; 
    
    div_me_collapse.appendChild(div_me_collapse_son);

    div_me.appendChild(h2_me);
    div_me.appendChild(div_me_collapse);

    return div_me;
}


const create_button = (ClassName, type, Function,text) =>{
    let button = document.createElement("button");
    button.type = type;
    button.className = ClassName;
    button.onclick = Function;
  
    button.innerHTML = text;
    return button;
}

const create_column = (ClassName) =>{
    let column = document.createElement("div");
    column.className = ClassName;
    return column;
}

const create_row = (ClassName) =>{
    let row = document.createElement("div");
    row.className = ClassName;
    return row;
}
                
const SortedAccordion = (Accordion, props) =>{
    if(props.sorted)
        return;
    Accordion.innerHTML = '';
    props.sorted = true;
    console.log(props);
    props.Data.sort( (a,b) => a.flag-b.flag);
    console.log(props);
    CreateListAccordion(Accordion, props)
    //sort data props
    //CreateListAccordion(A)
}


const CreateListAccordion = (Accordion, props) =>{
    props.Data.map( (el) => {
        Accordion.appendChild(CreateAccordion_Item(el));
    })
}
const CreateContainerListAccordion = (props) =>{
        
    let acc, container; // запоминаем "аккордион", чтобы в случае нажатия кнопки для сортировки очистить его и отрисовать отсортированным.
                        // контейнер запоминаем для того, чтобы добавлять строки и столбцы
    let row_first = create_row("row gy-2"), column_first_1 = create_column("col-auto"), column_first_2 = create_column("col-auto"),
    row_second = create_row("row"), column_second_1 = create_column("col-12");

    acc = document.createElement("div");
    container = document.createElement("div");
    acc.className = "accordion";    
    acc.id = "accordionExample";
    container.className = "container";

    document.body.appendChild(container);
    //document.body.appendChild(acc);

    let button1 = create_button("btn btn-primary", "button", () => {SortedAccordion(acc,props)}, "Сортировка по важности");
    let button2 = create_button("btn btn-primary", "button", () => {SortedAccordion(acc,props)}, "Сортировка по алфавиту");


    CreateListAccordion(acc,props);

    container.appendChild(row_first);
    row_first.appendChild(column_first_1);
    row_first.appendChild(column_first_2);
    column_first_1.appendChild(button1);
    column_first_2.appendChild(button2);

    container.appendChild(row_second);
    row_second.appendChild(column_second_1);
    column_second_1.appendChild(acc);

}

CreateContainerListAccordion(state);
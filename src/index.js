
//import 'bootstrap';
import "./check.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.js"

let state = {
    Data : [ {
            name : "DBCA",
            link : "#a",
            flag : 2,
            info : "About SomethingOne",
            id : 0,
        },
        {
            name : "CDBA",
            link : "#a",
            flag : 0,
            info : "About SomethingTwo",
            id : 1,
        },
        {
            name : "BACD",
            link : "#a",
            flag : 3,
            info : "About SomethingThree",
            id : 2,
        },
        {
            name : "ABCD",
            link : "#a",
            flag : 1,
            info : "About SomethingFour\nABOBA asdasdasadasdaadsssssssss dasdasdasdasdsadadasdad dasdsdas asdasdasdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
            id : 3,
        },
        {
            name : "FBACD",
            link : "#a",
            flag : 3,
            info : "About SomethingThree",
            id : 4,
        },
        {
            name : "KACD",
            link : "#a",
            flag : 3,
            info : "About SomethingThree",
            id : 5,
        },
        {
            name : "ZACD",
            link : "#a",
            flag : 1,
            info : "About SomethingThree",
            id : 6,
        },

    ],
    sortedFlag : false,
    sortedAlpha : false
    //something more
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
                
const SortedFlagAccordion = (Accordion, props) =>{
    if(props.sortedFlag)
        return;
    Accordion.innerHTML = '';
    props.sortedFlag = true;
    props.sortedAlpha = false;
    props.Data.sort( (a,b) => a.flag-b.flag);
    CreateListAccordion(Accordion, props);
}

const SortedAlhpavitAccordion = (Accordion, props) =>{
    if(props.sortedAlpha)
    return;
    Accordion.innerHTML = '';
    props.sortedFlag = false;
    props.sortedAlpha = true;
    props.Data.sort( (a,b) =>{
        if(a.name.toUpperCase() < b.name.toUpperCase())
            return -1;
        else
            return 1;
    })
    CreateListAccordion(Accordion, props);
}

const AddNewColumnToRow = (row, data, text) => {
    let column = create_column(text);
    column.appendChild(data);
    row.appendChild(column);
    return row;
}
const AddColumnToRow = (row, column) =>{
    row.appendChild(column);
    return row;
}

const CreateListAccordion = (Accordion, props) =>{
    props.Data.map( (el) => {
        Accordion.appendChild(CreateAccordion_Item(el));
    })
}

const newTab = (Link) =>{
    return () => {
        window.open(
            Link, '_blank'
        );
    };
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

    let div_me_collapse_container = document.createElement("div");
    div_me_collapse_container.className = "container";


    let div_me_collapse_son = document.createElement('div');
    div_me_collapse_son.className = "accordion-body";
    div_me_collapse_son.innerHTML =  props.info; 


    div_me_collapse_container.appendChild(AddNewColumnToRow(create_row("row"), div_me_collapse_son, "col-auto"));
  

    let button = create_button("btn btn-primary", "button", newTab("https://google.com"), "Link") //В функцию newTab можно передвать линки с пропса
    
    div_me_collapse_container.appendChild( AddNewColumnToRow(create_row("row"), button, "pb-2 col-auto"));

    
    div_me_collapse.appendChild(div_me_collapse_container);

    div_me.appendChild(h2_me);
    div_me.appendChild(div_me_collapse);



    return div_me;
}


const CreateContainerListAccordion = (props) =>{
        
    let acc, container; // запоминаем "аккордион", чтобы в случае нажатия кнопки для сортировки очистить его и отрисовать отсортированным.
                        // контейнер запоминаем для того, чтобы добавлять строки и столбцы
    let row_first = create_row("row gy-2"), row_second = create_row("row Scroll")

    acc = document.createElement("div");
    container = document.createElement("div");
    acc.className = "accordion";    
    acc.id = "accordionExample";
    container.className = "container";

    document.body.appendChild(container);


    let button1 = create_button("btn btn-primary", "button", () => {SortedFlagAccordion(acc,props)}, "Сортировка по важности");
    let button2 = create_button("btn btn-primary", "button", () => {SortedAlhpavitAccordion(acc,props)}, "Сортировка по алфавиту");


    CreateListAccordion(acc,props);

    container.appendChild(row_first);
    AddNewColumnToRow(row_first, button1, "col-auto");
    AddNewColumnToRow(row_first, button2, "col-auto");

    container.appendChild(row_second);
    AddNewColumnToRow(row_second, acc, "col-12");
}

CreateContainerListAccordion(state);
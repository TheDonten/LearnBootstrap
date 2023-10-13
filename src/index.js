
//import 'bootstrap';
import "./check.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.js"

let body = document.body;

let state_sort = false;

let obj_local = {
    Data :[
        {
            Date : "2022-11-15 19:26:33",
            Message: "The power input for power ssupply 1 is lost",
            flag : "critical"
        },
        {
            Date : "2022-11-15 19:26:29",
            Message : "Power supply redundancy is lost",
            flag : "critical"
        },
        {
            Date : "2022-10-26 18:26:29",
            Message : "The power input for power ssupply 2 is lost",
            flag : "critical"
        },
        {
            Date : "2022-10-23 11:46:33",
            Message : "The power supplies are redundant",
            flag : "info"
        },
        {
            Date : "2022-10-23 11:46:29",
            Message : "The inpurt power for power supply 2 has been restored",
            flag : "info"
        },
        {
            Date : "2020-10-23 13:46:29",
            Message : "Log was cleared",
            flag : "warning"
        },

    ]
}

let color_num = {
    critical: {
        color : 'rgba(231, 92, 92, 0.46)',
        num : 0
    },
    info : {
        color : 'rgb(255, 255, 255)',
        num : 2
    },
    warning : {
        color : 'rgba(233, 230, 77, 0.466)',
        num : 1
    }
}

const create_table_body = (el) =>{
    let tr = document.createElement("tr");
    let color = color_num[el.flag].color;

    tr.innerHTML = 
    `
        <td style="white-space: nowrap; background-color : ${color}; ">
            ${el.Date}
        </td>
        
        <td style="background-color : ${color};">
            ${el.Message}
        </td>
    `
    return tr;
}

const create_thead = () =>{
    let tr = document.createElement("tr");

    tr.innerHTML = 
    `
    <th class="w-auto" style="white-space: nowrap; min-width: 161px;">Date</th>
    <th class="w-100" style=padding-left: 0px;">Message</th>       
    `
    return tr;
}

const create_table_main = (obj_me) =>{
    
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let tr_HEAD = create_thead();//for thead

    tr_HEAD.style = "border-bottom: 1px black solid; border-top: 1px black solid;"
    table.className = "table";
    thead.style = "width: 100%;";
    table.appendChild(thead);
    table.appendChild(tbody)
    thead.appendChild(tr_HEAD);
    
    obj_me.Data.map( (el) => {
        tbody.appendChild(create_table_body(el))
    })

    return table;
}

const click_all = (obj, row_table) =>{
    let input = document.getElementById("input_me");
    let div = document.getElementById("div_main");
    input.value = "";
    row_table.innerHTML = '';
    row_table.appendChild(create_table_main(obj))
}

const findundstr = (obj, str,row_table) => {
    
    row_table.innerHTML = '';

    const regex = new RegExp(str, 'i');
    const temp = obj.Data.filter( (el) =>{
        const index = el.Message.search(regex);
        if( index !== -1)
                return true;
            else
                return false;
    })  

    row_table.appendChild(create_table_main({...obj, Data : temp}));
}

const click_sort = (obj, str, row_table) =>{
    let input = document.getElementById("input_me");
    let div = document.getElementById("div_main");
    input.value = "";
   

    const filtered = obj.Data.filter( (el) => {
        if(el.flag === str)
            return true
        else
            return false
    })
    row_table.innerHTML = '';
    row_table.appendChild(create_table_main({...obj, Data : filtered}))
    //div.appendChild(create_div_container({...obj, Data : filtered}))
    //add_events(obj);
}

const add_events = (obj, row_table) =>{
    let c = document.getElementById("critical");
    let w = document.getElementById("warning");
    let i = document.getElementById("info");
    let a = document.getElementById("all");
    let input = document.getElementById("input_me")

    c.addEventListener('click', () => {click_sort(obj, "critical", row_table)});
    w.addEventListener('click', () => {click_sort(obj, "warning", row_table)});
    i.addEventListener('click', () => {click_sort(obj, "info", row_table)});
    a.addEventListener('click', () => {click_all(obj,row_table)});
    input.addEventListener('input', () => {findundstr(obj, input.value,row_table)});
}

const create_div_container = (obj_me) =>{
    let div = document.createElement("div");
    div.className = "container-fluid m-0"
    div.innerHTML = 
    `
    <div class="row" style="padding-bottom: 12px;">
        <div class="col-12 text-start" style = "padding-left: 0px; padding-right: 8px;">
            <span style="font-size: 24px;">System Event Log</span>
        </div>
    </div>  
    <div class="row" style="padding-bottom: 12px;"}>
        <div class="col-auto" style="padding-left:0; padding-right:8;">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                    </button>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" id ="critical">Critical</a></li>
                    <li><a class="dropdown-item" id ="warning">Warning</a></li>
                    <li><a class="dropdown-item" id ="info">Info</a></li>
                    <li><a class="dropdown-item" id ="all">All</a></li>
                    </ul>
                </div>  
            </div>
        <div class="col p-0" style=padding-bottom: 8px;, padding-right:0px;>
            <input  id="input_me" type="text" class="form-control rounded-0"  placeholder="Поиск"/>
        </div>
    </div>
    `
    let row_table = document.createElement("div")
    row_table.className = "row";

    row_table.appendChild(create_table_main(obj_me))

    div.appendChild(row_table)


    return [div, row_table];
}



const initial_table = (obj_me) =>{
    let div = document.createElement("div");
    div.style = "margin-right: 10px; margin-left: 10px; margin-top: 10px";
    div.id = "div_main";
    let [div_container, row_table] = create_div_container(obj_me);
    div.appendChild(div_container);
    //div.appendChild(create_div_container(obj_me))
    document.body.appendChild(div);
    add_events(obj_me, row_table);
}


initial_table(obj_local);
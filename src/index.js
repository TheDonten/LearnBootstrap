
//import 'bootstrap';
import "./check.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.js"


import img_info from '../src/img/info-circle.svg'
import img_arrow from '../src/img/arrow-down.svg'
import img_warning from '../src/img/exclamation-triangle-fill.svg'
import img_check from '../src/img/check-circle-fill.svg'

let body = document.body;

let state_sort = false;


let str_to_int = {
    check : 0,
    warning : 1,
    not : 2,
    error : 3
}

let obj = {
    DataState:  [
        {
            Subsystem : "Network",
            Status : "Degraded",
            imgInfo : "warning",
            imgSrc : img_warning,
        },
        {
            Subsystem : "BIOS/Hardware Health",
            Status : "ok",
            imgInfo: "check",
            imgSrc : img_check,
        },
        {
            Subsystem : "Fan Rendundancy",
            Status : "Rendundancy",
            imgInfo: "check",
            imgSrc : img_check,
        },
        {
            Subsystem : "Agentless Managment Serice",
            Status : "Not available",
            imgInfo: "not",
            imgSrc : img_info,
        },
    ],
  }


const create_table_body = (el) =>{
    let tr = document.createElement("tr");
   
    tr.innerHTML = 
    `
        <td class="w-75" style="vertical-align: middle;">
            <div class="container m-0">
                <div class="row">
                    <div class = "col-auto" style="height : 43px; width : 43px"}> 
                                                
                    </div>
                    <div class = "col d-flex align-items-center" style="word-break: break-all;">
                         <span>${el.Subsystem}</span>
                    </div>
                </div>
            </div>
        </td>
        <td class="w-25" style="vertical-align: middle; padding-left: 15px; padding-right : 40px;">
            <div class="container m-0">
                <div class="row">
                    <div class = "col-auto d-flex align-items-center" style="height : 43px; width : 43px"}> 
                        <img src=${el.imgSrc} height={20} width={20}/>              
                    </div>
                    <div class = "col d-flex align-items-center" style="word-break: break-all; padding-left: 16px">
                        <span>${el.Status}</span>
                    </div>
                </div>
            </div>
        </td>      
    `
    return tr;
}



const create_thead = () =>{
    let tr = document.createElement("tr");

    tr.innerHTML = 
    `
                <th>
                    <div class="container m-0">
                            <div class="row">
                                <div class="col-auto" id="event_click_system">
                                    <img src="${img_arrow}" width="32" height="32"/>
                                </div>
                                <div class="col p-0 d-flex align-items-center" style="white-space: nowrap;">
                                    <span>System Diveces</span>
                                </div>
                            </div>
                    </div>
                </th>
                <th>
                    <div class="container m-0">
                            <div class="row">
                                <div class="col-auto" id="event_click_status">
                                    <img src="${img_arrow}" width="32" height="32"/>
                                </div>
                                <div class="col  d-flex align-items-center" style="white-space: nowrap;">
                                    <span>Status</span>
                                </div>
                            </div>
                    </div>
                </th>
                
    `
   
    return tr;
}

const create_table_main = (props) =>{
    
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
   

    props.DataState.map( (el) => {
        tbody.appendChild(create_table_body(el))
    })
    
    return [table,tbody];
}

const sort_1 = (elem,obj_me) =>{
    debugger
    elem.innerHTML = '';
    let array = obj_me.DataState.sort((a,b) =>{
        if(a.Subsystem.toUpperCase() < b.Subsystem.toUpperCase())
            return -1;
        else
            return 1;
    });
    array.map( (el) =>{
        elem.appendChild(create_table_body(el));
    })
}

const sort_2 = (elem,obj_me) =>{
    debugger
    elem.innerHTML = '';
    let array = obj_me.DataState.sort((a, b) => { return str_to_int[a.imgInfo] - str_to_int[b.imgInfo]});
    array.map( (el) =>{
        elem.appendChild(create_table_body(el));
    })
}


const addEventInit = (tbody,obj_me) =>{
    let click_system, click_status;
    click_system = document.getElementById("event_click_system");
    click_status = document.getElementById("event_click_status");

    click_system.addEventListener('click', () =>{sort_1(tbody, obj_me)} );
    click_status.addEventListener('click', () =>{sort_2(tbody,obj_me)});
}

const table_init = (obj_me) =>{
    let div = document.createElement("div");
    div.style = "margin-right: 10px; margin-left: 10px; margin-top: 10px";
    div.id = "div_main";
    let [table,tbody] = create_table_main(obj_me);
    div.appendChild(table);
    document.body.appendChild(div);
    addEventInit(tbody, obj_me);
}

table_init(obj);

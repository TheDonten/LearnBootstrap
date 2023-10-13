
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

let obj = {
    Data : [
        
        {
            id : 5,
            mac_address : "b4:7a:f1:d8:58:90",
            ip4 : "172.16.255.2",
            ip6 : "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            img_info : img_info,
            status : "Link Down",
            team : "N/A"
        },
        {
            id : 2,
            mac_address : "b4:7a:f1:d8:58:90",
            ip4 : "172.16.255.2",
            ip6 : "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            img_info : img_info,
            status : "Link Down",
            team : "N/A"
        },
        {
            id : 3,
            mac_address : "b4:7a:f1:d8:58:90",
            ip4 : "172.16.255.2",
            ip6 : "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            img_info : img_info,
            status : "Link Down",
            team : "N/A"
        },
        {
            id : 1,
            mac_address : "b4:7a:f1:d8:58:90",
            ip4 : "172.16.255.2",
            ip6 : "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            img_info : img_info,
            status : "Link Down",
            team : "N/A"
        },

    ]

}
const create_table_body = (el) =>{
    let tr = document.createElement("tr");
   
    tr.innerHTML = 
    `
        <td style="padding-left: 19px; vertical-align: middle;">
            <span>${el.id}</span>
        </td>
        <td style=" max-width: 100px; vertical-align: middle;">
            <span style="word-wrap: break-word; max-width: 100px;">${el.mac_address}</span>
        </td>
        <td class="text-start" style="vertical-align: middle;">
            <span>${el.ip4}</span>
        </td>
        <td class="text-start" style="word-break: break-all; vertical-align: middle;">
            <span>${el.ip6}</span>
        </td>
        <td>
        <div class="container m-0">
        <div class="row">
            <div class = "col-auto d-flex align-items-center">
                <img src="${el.img_info}"/>
            </div>
            <div class = "col d-flex align-items-center" style="word-break: break-all; padding-left: 16px;">
                <span>
                    ${el.status}
                </span>
            </div>
        </div>
        </div>
        </td>
        <td>
            <span>${el.team}</span>
        </td>       
    `
    return tr;
}

const sort_props = (div,obj_me) =>{
    debugger
    div.innerHTML = '';
    let array = {};
    if(!state_sort){
        array = obj_me.Data.sort( (a,b) => {return a.id - b.id})
        state_sort = true;
    }
    else{
        array = obj_me.Data.sort( (a,b) => {return b.id - a.id})
        state_sort = false;
    }
    div.appendChild(create_table_main({...obj_me, Data : array}));
    let element_click = document.getElementById("event_click")
    element_click.addEventListener('click', () => {sort_props(div,obj)})
}

const create_thead = () =>{
    let tr = document.createElement("tr");

    tr.innerHTML = 
    `
                <th class="col-auto">
                    <div class="container m-0">
                            <div class="row">
                                <div class="col-auto p-0" id="event_click">
                                    <img src="${img_arrow}" width="32" height="32"/>
                                </div>
                                <div class="col p-0 d-flex align-items-end" style="white-space: nowrap;">
                                    <span>Port</span>
                                </div>
                            </div>
                    </div>
                </th>
                 <th class= "col-sm-2">
                 <div class="container m-0">
                     <div class="row">
                         <div class="col-auto p-0">
                             <span>MAC Address</span>
                         </div>
                     </div>
                 </div>
             </th>
             <th class= "col-md-2">
                 <div class="container m-0">
                     <div class="row">
                         <div class="col-auto p-0">
                             <span>IPv4 Address</span>
                         </div>
                     </div>
                 </div>
             </th>
             <th  class= "col-md-3">
                 <div class="container m-0">
                     <div class="row">
                         <div class="col-auto p-0">
                             <span>IPv6 Address</span>
                         </div>
                     </div>
                 </div>
             </th>
             <th  class= "col-md-2">
                 <div class="container m-0">
                     <div class="row">
                         <div class="col-auto">
                             <span>Status</span>
                         </div>
                     </div>
                 </div>
            </th>
             <th class ="col-md-2">
                 <div class="container m-0">
                     <div class="row">
                         <div class="col-auto p-0">
                             <span>Team/Bridge</span>
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
   

    props.Data.map( (el) => {
        tbody.appendChild(create_table_body(el))
    })
    
    return table;
}

let div = document.createElement("div");
div.style = "margin-right: 10px; margin-left: 10px; margin-top: 10px";
div.id = "div_main";
div.appendChild(create_table_main(obj));
document.body.appendChild(div);
let element_click = document.getElementById("event_click")          //мех
element_click.addEventListener('click', () => {sort_props(div,obj)})


//import 'bootstrap';
import "./check.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.js"
import table_init from "./components/table1.js"

import img_info from '../src/img/info-circle.svg'
import img_arrow from '../src/img/arrow-down.svg'
import img_warning from '../src/img/exclamation-triangle-fill.svg'
import img_check from '../src/img/check-circle-fill.svg'

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
        {
            Subsystem : "1c responses",
            Status : "Not available",
            imgInfo: "not",
            imgSrc : img_info,
        },
        {
            Subsystem : "Fancing",
            Status : "Rendundancy",
            imgInfo: "check",
            imgSrc : img_check,
        },
    ],
  }


  let body = document.body;


const create_card_table = (obj,elem) =>{
    let div = document.createElement("div");
    div.className = "card me";
    let div_card_body = document.createElement("div");
    div_card_body.className = "card-body";
    div.appendChild(div_card_body);
    table_init(obj,div_card_body);
    elem.appendChild(div);
    //return div;
}

//display: flex;
//justify-content: center;

let div = document.createElement("div");
div.style = "display: flex; margin-right: 10px; margin-left: 10px; margin-top: 10px; justify-content: center;";
div.id = "div_main";

create_card_table(obj,div)
document.body.appendChild(div);
//table_init(obj,body);

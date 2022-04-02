import {DisplayInventory} from "./inventory.js";

export function Navigation(menu){
    switch(menu){
        case "Quest":
                document.getElementById("quest-container").style.display = "block";
                document.getElementById("shop-container").style.display = "none";
                document.getElementById("monster-container").style.display = "none";
            break;
            case "Shop":
                document.getElementById("quest-container").style.display = "none";
                document.getElementById("shop-container").style.display = "block";
                document.getElementById("monster-container").style.display = "none";
            break;
            case "Monster":
                DisplayInventory();
                document.getElementById("quest-container").style.display = "none";
                document.getElementById("shop-container").style.display = "none";
                document.getElementById("monster-container").style.display = "block";
                break;
    }
}
import {Player, CalcLvl, SetXpBar} from './player.js';

//List with all Quests
export const quest_list = [
    {id: 0, name: "Quest 1", img: "quest.jpg", energy_cost: 15, exp: 15, gold: 300, power_requirement: 1},
    {id: 1, name: "Quest 2", img: "quest.jpg", energy_cost: 150, exp: 150, gold: 3000, power_requirement: 100}
];

export function DisplayQuests(){
    //Find Quest-Container
    var container = document.getElementById("quest-container");

    if(container == null)
        return;

    quest_list.forEach(function(item){
        //Create Quest div and set values
        var tempNode = document.querySelector("div[data-type='template_Quest']").cloneNode(true);
        tempNode.style.display = "block";
        tempNode.onclick = function(){
            StartQuest(item.id);
        };
        tempNode.querySelector(".quest-icon").setAttribute("style", "background-image: url(img/" + item.img + ");");
        tempNode.querySelector(".quest-name").innerText = item.name;
        tempNode.querySelector(".quest-exp").innerText = item.exp + " EXP";
        tempNode.querySelector(".quest-gold").innerText = item.gold + " GOLD";
        tempNode.querySelector(".quest-energy-cost").innerText = item.energy_cost + " ENERGY";
        tempNode.querySelector(".quest-power-requirement").innerText = item.power_requirement + " POWER";

        container.insertAdjacentElement("beforeend", tempNode);
    });
}

export function StartQuest(quest_id){
    //Find Quest
    var curr_quest = quest_list.find(x => x.id == quest_id);
    
    if(curr_quest == null)
        return;

    if(Player.energy < curr_quest.energy_cost)
        return;

    if(Player.power < curr_quest.power_requirement)
        return;

    //Set Values
    Player.energy -= curr_quest.energy_cost;
    Player.xp += curr_quest.exp;
    Player.gold += curr_quest.gold;
    CalcLvl();
    SetXpBar();

    //Update HTML
    document.getElementById("profile-gold").innerText = Player.gold + " GOLD";
    document.getElementById("profile-energy").innerText = Player.energy + " ENERGY";
}
import { Player, UpdatePower, AddMonsterToPlayer } from "./player.js";
import { monster_list } from "./monster.js";

export var shop_items = [
  //{id: 0, img: "egg.png", cost: 150, chance: {Common: 86999, Rare: 98999, God: 99999, Immortal: 100000}}
  {
    id: 0,
    img: "egg.png",
    cost: 150,
    chance: { Common: 0.869, Rare: 0.12, God: 0.01, Immortal: 0.001 },
  },
];

export function DisplayShop() {
  //Find Quest-Container
  var container = document.getElementById("shop-list");

  if (container == null) return;

  container.replaceChildren("");

  shop_items.forEach(function (item) {
    //Create Quest div and set values
    var tempNode = document.querySelector("div[data-type='template_Shop']").cloneNode(true);
    tempNode.removeAttribute("data-type");
    tempNode.id = "shop-item-" + item.id;
    tempNode.style.display = "block";
    tempNode.onclick = function () {
      BuyItem(item.id);
    };
    tempNode.querySelector(".shop-item-icon").setAttribute("style", "background-image: url(img/shop_icons/" + item.img + ");");
    tempNode.querySelector(".shop-item-cost").innerText = item.cost + " GOLD";

    tempNode.querySelector(".shop-item-info").onclick = function () {
      SwitchView(item);
    };

    container.insertAdjacentElement("beforeend", tempNode);
  });
}

export function BuyItem(item_id) {
  //Find Quest
  var curr_item = shop_items.find((x) => x.id == item_id);

  if (curr_item == null) return;

  if (Player.gold < curr_item.cost) return;

  //Set Values
  Player.gold -= curr_item.cost;

  //TODO Animation
  //If Hatched Window Open, close it!
  var divHatch = document.getElementById("Egg-hatched");
  if (divHatch != null) divHatch.remove();

  HatchEgg(GetRandomMonster(curr_item));

  //Update HTML
  document.getElementById("profile-gold").innerText = Player.gold + " GOLD";
}

function HatchEgg(monster) {
  var container = document.getElementById("shop-container");

  var hatched = monster;

  //Give Player Monster
  AddMonsterToPlayer(hatched);

  //Display Hatched Monster
  if (document.getElementById("autoCloseHatch").checked == false) {
    var tempNode = document.querySelector("div[data-type='template_Egg-hatch']").cloneNode(true);
    tempNode.id = "Egg-hatched";
    tempNode.style.display = "block";
    tempNode.onclick = function () {
      document.getElementById("Egg-hatched").remove();
    };
    tempNode.querySelector(".egg-hatch-icon").setAttribute("style", "background-image: url(img/monster/" + hatched.img + ");");
    tempNode.querySelector(".egg-hatch-name").innerText = hatched.name;
    tempNode.querySelector(".egg-hatch-power").innerText = "POWER: " + hatched.power;
    tempNode.querySelector(".egg-hatch-close").innerText = "X";

    container.insertAdjacentElement("beforeend", tempNode);
  }
}

function GetRandomMonster(curr_item) {
  //Get Random number between 0-1
  let randomNumber = Math.random();

  var rarity = "";

  if (randomNumber <= curr_item.chance.Immortal) rarity = "Immortal";
  else if (randomNumber <= curr_item.chance.God) rarity = "God";
  else if (randomNumber <= curr_item.chance.Rare) rarity = "Rare";
  else rarity = "Common";

  var all_with_same_rarity = monster_list.filter((x) => x.rarity == rarity);

  var monster = all_with_same_rarity[Math.floor(Math.random() * all_with_same_rarity.length)];

  return monster;
}

function SwitchView(item) {
  var container = document.getElementById("shop-item-" + item.id);
  if (container == null) return;

  //If Picture View hide then reshow them else hide it
  if (container.querySelector("[id^='normal-view']").style.display == "none") {
    //Show Picture
    container.querySelector("[id^='normal-view']").style.display = "block";

    //Hide Chance
    container.querySelector("[id^='chance-view']").style.display = "none";
  } else {
    //Set Values
    container.querySelector(".shop-item-chance-common").innerText = "Common: " + item.chance.Common * 100 + "%";
    container.querySelector(".shop-item-chance-rare").innerText = "Rare: " + item.chance.Rare * 100 + "%";
    container.querySelector(".shop-item-chance-god").innerText = "God: " + item.chance.God * 100 + "%";
    container.querySelector(".shop-item-chance-immortal").innerText = "Immortal: " + item.chance.Immortal * 100 + "%";

    //Hide Picture
    container.querySelector("[id^='normal-view']").style.display = "none";

    //Show Chance
    container.querySelector("[id^='chance-view']").style.display = "block";
  }
}

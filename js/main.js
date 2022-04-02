import { Player, RefillEnergy, RefillStamina, SetXpBar } from './player.js';
import * as Quest from './quest.js';
import { Navigation } from './navigation.js';
import { DisplayShop } from './shop.js';

var IS_DEBUG = true;

Player.name = 'Penges';
Player.energy = 50000;
Player.gold = 10000;

function LoadingScreen() {
  var timeout = 5000;

  if (IS_DEBUG) timeout = 0;

  //Remove after Timeout the loading container and display game container
  setTimeout(function () {
    document.getElementById('loading-container').remove();

    Init();
    document.getElementById('game-container').style.display = 'flex';
  }, timeout);
}

function Init() {
  Load();
  //TODO Wenn Load keine Daten hat, kommt man zum Fenster wo man einen Char erstellen kann (Namen angeben!)
  InitHtml();
  //Load and Display Quests | Quests is always the start screen
  Quest.DisplayQuests(Player);
  document.getElementById('quest-container').style.display = 'block';

  //Start Loop
  Loop();
}

function InitHtml() {
  //#region Header
  //Set Values from Player to HTML
  document.getElementById('profile-name').innerText = Player.name;
  document.getElementById('profile-lvl').innerText = 'LVL: ' + Player.lvl;
  document.getElementById('profile-health').innerText = Player.health + ' HEALTH';
  document.getElementById('profile-energy').innerText = Player.energy + ' ENERGY';
  document.getElementById('profile-stamina').innerText = Player.stamina + ' STAMINA';
  document.getElementById('profile-gold').innerText = Player.gold + ' GOLD';
  document.getElementById('profile-attack-power').innerText = 'POWER: ' + Player.power;
  //#endregion
  //#region XP-BAR
  var xp_bar = document.getElementById('exp-bar');
  xp_bar.setAttribute('style', 'width: 0%;');
  xp_bar.ariaValueNow = Player.xp;
  xp_bar.ariaValueMax = Player.xp_for_lvl;
  document.getElementById('exp-bar-value').innerText = Player.xp + ' | ' + Player.xp_for_lvl;
  SetXpBar();
  //#endregion
  //#region Menubar
  document.getElementById('menubar-quest').onclick = function () {
    Navigation('Quest');
  };
  document.getElementById('menubar-shop').onclick = function () {
    Navigation('Shop');
  };
  document.getElementById('menubar-monster').onclick = function () {
    Navigation('Monster');
  };
  document.getElementById('menubar-save').onclick = function () {
    Save();
  };
  document.getElementById('menubar-load').onclick = function () {
    Load(true);
  };
  document.getElementById('menubar-reset').onclick = function () {
    Reset();
  };
  //#endregion
  //#region Shop
  DisplayShop();
  //#endregion
}

function Loop() {
  RefillEnergy();
  RefillStamina();
  //Save();
  //Load();
}

function Save() {
  //TODO Save animation
  localStorage.setItem('data', btoa(JSON.stringify(Player)));

  setTimeout(Save, 300000);
}

function Load(fromButton) {
  try {
    var data = JSON.parse(atob(localStorage.getItem('data')));
    Player.name = data['name'];
    Player.lvl = data['lvl'];
    Player.xp = data['xp'];
    Player.xp_for_lvl = data['xp_for_lvl'];
    Player.gold = data['gold'];
    Player.energy = data['energy'];
    Player.stamina = data['stamina'];
    Player.health = data['health'];
    Player.power = data['power'];
    Player.max_energy = data['max_energy'];
    Player.max_stamina = data['max_stamina'];
    Player.monsters = data['monsters'];

    if (fromButton) {
      InitHtml();
      SetXpBar();
    }
  } catch (Exeption) {
    InitHtml();
    //TODO Wenn Load keine Daten hat, kommt man zum Fenster wo man einen Char erstellen kann (Namen angeben!)
  }
}

function Reset() {
  localStorage.clear();
  location.reload();
}

LoadingScreen();

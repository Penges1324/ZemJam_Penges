export var Player = {
  name: 'No Name',
  lvl: 1,
  xp: 0,
  xp_for_lvl: 100,
  gold: 0,
  energy: 15,
  stamina: 0,
  health: 0,
  power: 1,
  max_energy: 50000,
  max_stamina: 50000,
  monsters: Array(),
};

export function SetXpBar() {
  //Calc the XP Percent for XP-BAR and Fill XP-BAR values
  var xp_Percent = (Player.xp / Player.xp_for_lvl) * 100;

  var xp_bar = document.getElementById('exp-bar');
  xp_bar.setAttribute('style', 'width:' + xp_Percent + '%;');
  xp_bar.ariaValueNow = Player.xp;
  xp_bar.ariaValueMax = Player.xp_for_lvl;

  document.getElementById('exp-bar-value').innerText = Player.xp + ' | ' + Player.xp_for_lvl;
}

export function CalcLvl() {
  //When Player got enough xp for lvl up
  while (Player.xp >= Player.xp_for_lvl) {
    Player.xp = Player.xp - Player.xp_for_lvl;
    //TODO XP Calc richtig machen
    Player.xp_for_lvl = Player.xp_for_lvl + 25;

    Player.lvl++;

    document.getElementById('profile-lvl').innerText = 'LVL: ' + Player.lvl;
  }
}

export function RefillEnergy() {
  //Refill every X-Time Energy and Update HTML
  if (Player.energy < Player.max_energy) {
    Player.energy++;

    document.getElementById('profile-energy').innerText = Player.energy + ' ENERGY';
  }

  setTimeout(RefillEnergy, 1000);
}

export function RefillStamina() {
  //Refill every X-Time Stamina and Update HTML
  if (Player.stamina < Player.max_stamina) {
    Player.stamina++;

    document.getElementById('profile-stamina').innerText = Player.stamina + ' STAMINA';
  }

  setTimeout(RefillStamina, 5000);
}

export function UpdatePower() {
  Player.power = 0;
  Player.monsters.forEach(function (monster) {
    Player.power += monster.count * monster.monster.power;
  });
  document.getElementById('profile-attack-power').innerText = 'POWER: ' + Player.power;
}

export function AddMonsterToPlayer(monster_to_add) {
  var in_inventory = Player.monsters.find((x) => x.monster.id == monster_to_add.id);

  //Monster in Inventory add + 1 to the count
  if (in_inventory != null) {
    in_inventory.count++;
  } else {
    Player.monsters.push({ count: 1, monster: monster_to_add });
  }

  UpdatePower();
}

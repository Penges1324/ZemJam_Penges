import { Player } from './player.js';

export function DisplayInventory() {
  var container = document.getElementById('monster-container');

  if (container == null) return;

  container.replaceChildren('');

  var rarityName = '';
  for (let i = 0; i < 4; i++) {
    //Set the Rarity
    if (i == 0) rarityName = 'Common';
    else if (i == 1) rarityName = 'Rare';
    else if (i == 2) rarityName = 'God';
    else if (i == 3) rarityName = 'Immortal';

    //Get the Rarity Template
    var tempNode = document.querySelector("div[data-type='template_Monster_Inventory']").cloneNode(true);
    tempNode.removeAttribute('data-type');
    tempNode.style.display = 'block';

    //Set Rarity Value
    tempNode.querySelector('.monster-rarity-name').innerText = rarityName;

    //Set to Monster list the Monster divs
    var monster_list = tempNode.querySelector('.monster-rarity-list');

    var monster_add = Player.monsters.filter((x) => x.monster.rarity == rarityName);
    monster_add.forEach(function (monster) {
      var tempNodeMonster = document.querySelector("div[data-type='template_Monster_Inventory_Monster']").cloneNode(true);
      tempNodeMonster.style.display = 'block';
      tempNodeMonster.querySelector('.monster-rarity-monster-count').innerText = monster.count;

      if (rarityName == 'Immortal')
        tempNodeMonster.setAttribute('style', 'width: 300px; background-image: url(img/monster/' + monster.monster.img + ');');
      else tempNodeMonster.setAttribute('style', 'background-image: url(img/monster/' + monster.monster.img + ');');

      monster_list.insertAdjacentElement('beforeend', tempNodeMonster);
    });

    //Insert into list
    tempNode.insertAdjacentElement('beforeend', monster_list);

    //Insert into Container
    container.insertAdjacentElement('beforeend', tempNode);
  }
}

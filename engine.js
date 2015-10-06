var name = "";
var cash = 0;
var invcon = [];
var invc = [];
var invu = [];
var invr = [];
var step = 0;
var inDungeon = false;
var using = 0;
var invback = 0;
var inBattle = false;
var hpmax = 0;
var hp = 0;
var xp = 0;
var xplvl = 0;
var lvl = 0;
var atk = 0;
var atkAdd = 0;
var crit = 0;
var def = 0;
var equip = "";
var enames1 = ["Haunted Blade", "Car", "Weed", "Guy", "Moron"];
var bossnames = ["Dragon", "Warrior"];
var ename = "";
var ehp = 0;
var eatk = 0;
var edef = 0;
/*Reference
Items: Protein Shake(20HP), Band-Aid(MAXHP), Beer(HP+15)
Equipment: Razor, Good Razor, Bowling Ball, Knife, Grenade
*/

function newGame() {
	window.name = prompt("What is your name?");
	window.cash = 0;
	window.inBattle = false;
	window.invcon = [];
	window.hpmax = 25;
	window.hp = 25;
	window.crit = 5;
	window.xp = 0;
	window.xplvl = 10;
	window.lvl = 1;
	window.atk = 3;
	window.atkAdd = 0;
	window.def = 0;
	window.equip = "";
	window.step = Math.floor((Math.random() * 20) + 5);
	document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
	document.getElementById("steps").innerHTML = "Steps: " + step;
	document.getElementById("text").innerHTML = "<h1>Welcome to Beard Quest</h1><br /><h3>You must travel these dangerous lands to find your lost beard!</h3>";
	document.getElementById("money").innerHTML = "Cash: " + cash;
	document.getElementById("commands").style.visibility = "visible";
	document.getElementById("battlec").style.visibility = "hidden";
	document.getElementById("townc").style.visibility = "hidden";
}

function invShow() {
	document.getElementById("invt").innerHTML = "Inventory(Consumables): " + invcon;
	document.getElementById("invtc").innerHTML = "Inventory(Common): " + invc;
	document.getElementById("invtu").innerHTML = "Inventory(Uncommon): " + invu;
	document.getElementById("invtr").innerHTML = "Inventory(Rare): " + invr;
}

function invHide() {
	document.getElementById("invt").innerHTML = "";
	document.getElementById("invtc").innerHTML = "";
	document.getElementById("invtu").innerHTML = "";
	document.getElementById("invtr").innerHTML = "";
}

function invUse() {
	window.using = prompt("What item are you using?");
	var invback = invcon.indexOf(using);
	if (invback === -1) {
		document.getElementById("text").innerHTML = using + " is not an item or isn't in your inventory!";
	} else {
		switch (using) {
			case "Protein Shake":
				window.hp = hp + 20;
				window.invcon.splice(invback, 1);
				if (hp > hpmax) {
					window.hp = hpmax;
					document.getElementById("text").innerHTML = name + " has recovered MAX Hp!";
					document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
				} else {
					document.getElementById("text").innerHTML = name + " has recovered 20 Hp!";
					document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
				}
				break;
			case "Band-Aid":
				window.hp = window.hpmax;
				window.invcon.splice(invback, 1);
				break;
			case "Beer":
				window.hpmax = window.hpmax + 15;
				window.invcon.splice(invback, 1);
				break;
			default:
				document.getElementById("text").innerHTML = "If this text comes up, something's missing or was done wrong!";
		}
	}
}

function travel () {
	window.step = step - 1;
	document.getElementById("steps").innerHTML = "Steps: " + step;
	if (window.inDungeon === false) {
		if (step === 0) {
			town();
		} else {
			generator();
		}
	} else {
		if (step === 0) {
			bossset();
		} else {
			generator();
		}
	}
	
}

function generator() {
	var rng = Math.floor((Math.random() * 3) + 1);
	if (window.inDungeon === false) {
		if (rng === 1) {
			enmset();
		} else if (rng === 2) {
			document.getElementById("text").innerHTML= "Nothing special here, how boring!";
		} else if (rng === 3) {
			document.getElementById("text").innerHTML= "Holy cow! You found a coinbag!";
			window.cash = cash + 2;
			document.getElementById("money").innerHTML = "Cash: " + cash;
		}
	} else {
		if (rng === 1) {
			enmset();
		} else if (rng === 2) {
			document.getElementById("text").innerHTML= "Nothing special here, how boring!";
		} else if (rng === 3) {
			document.getElementById("text").innerHTML= "Holy cow! You found a backpack!";
			window.invcon.push("Apple");
			window.cash = cash + 5;
			document.getElementById("money").innerHTML = "Cash: " + cash;
		}
	}
}

function town() {
	document.getElementById("text").innerHTML = "You have arrived in town";
	document.getElementById("townc").style.visibility = "visible";
	document.getElementById("commands").style.visibility = "hidden";
}

function inn() {
	window.hp = window.hpmax;
	document.getElementById("text").innerHTML = "You are healed";
	document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
}

function leaveTown() {
	document.getElementById("townc").style.visibility = "hidden";
	document.getElementById("commands").style.visibility = "visible";
	window.step = Math.floor((Math.random() * 30) + 10);
	document.getElementById("steps").innerHTML = "Steps: " + step;
}

function dungeon() {
	document.getElementById("text").innerHTML = "Welcome to the dungeon, sucker";
	window.inDungeon = true;
	document.getElementById("commands").style.visibility = "visible";
	document.getElementById("townc").style.visibility = "hidden";
	window.step = Math.floor((Math.random() * 30) + 5);
}

function enmset() {
	window.ename = enames1[Math.floor(Math.random() * enames1.length)];
	window.ehp = Math.floor((Math.random() * 10) + 1) * window.lvl;
	window.eatk = Math.floor((Math.random() * 5) + 2);
	window.edef = Math.floor((Math.random() * 2) + 1);
	window.estat = "";
	document.getElementById("estat").innerHTML = ename + ": " + ehp;
	document.getElementById("text").innerHTML = "Encountered a/n: " + ename;
	window.inBattle = true;
	document.getElementById("battlec").style.visibility = "visible";
	document.getElementById("commands").style.visibility = "hidden";
	
}

function bossset() {
	window.ename = bossnames[Math.floor(Math.random() * bossnames.length)];
	window.ehp = Math.floor((Math.random() * 15) + 10) * window.lvl;
	window.eatk = Math.floor((Math.random() * 7) + 3) * window.atk;
	window.edef = Math.floor((Math.random() * 10) + 4) * window.def;
	document.getElementById("text").innerHTML = ename + ": " + ehp;
	document.getElementById("text").innerHTML = "Encountered the: " + ename;
	window.inBattle = true;
	document.getElementById("battlec").style.visibility = "visible";
	document.getElementById("commands").style.visibility = "hidden";
}

function plyrAtk() {
	if (inBattle === true) {
		var rng = Math.floor(Math.random() * 100);
		if (rng <= crit) {
			window.ehp = ehp - ((atk + atkAdd) * 3);
			document.getElementById("estat").innerHTML = ename + ": " + ehp + "<br>" + "You landed a critical!";
			document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
		} else {
			window.ehp = ehp - (atk + atkAdd);
			document.getElementById("estat").innerHTML = ename + ": " + ehp;
			document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
		}
	if (ehp <= 0) {
		if (window.inDungeon === true) {
			plyrWinBoss();
		} else {
			plyrWin();
		}
	} else {
		enmAtk();
	}
	} else {
		document.getElementById("text").innerHTML="You aren't in battle!";
	}
}

function enmAtk() {
	window.hp = hp - eatk;
	if (hp <= 0) {
		plyrDie();
	} else {
		document.getElementById("estat").innerHTML = ename + ": " + ehp;
		document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
	}
}

function plyrWin() {
	window.inBattle = false;
	window.xp = xp + 3;
	window.cash = cash + eatk; 
	document.getElementById("text").innerHTML = name + " was victorious!";
	document.getElementById("estat").innerHTML = "";
	document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
	document.getElementById("money").innerHTML = "Cash: " + cash;
	if (xp >= xplvl) {
		window.lvl++;
		window.xplvl = xplvl * 2.5;
		window.xplvl = Math.round(xplvl);
		window.hpmax = hpmax * 1.5;
		window.hpmax = Math.round(hpmax);
		window.hp = hpmax;
		window.atk++;
		window.def++;
		document.getElementById("text").innerHTML = name + " has levled up to Level " + lvl;
		document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
	} else {
		console.log("Not enough XP to level up");
	}
	itemGet();
	document.getElementById("battlec").style.visibility = "hidden";
	document.getElementById("commands").style.visibility = "visible";
}

function plyrWinBoss() {
	window.inBattle = false;
	window.inDungeon = false;
	window.xp = xp + 50;
	window.cash = cash + (eatk + edef); 
	document.getElementById("text").innerHTML = name + " has defeated " + ename;
	document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
	document.getElementById("money").innerHTML = "Cash: " + cash;
	if (xp >= xplvl) {
		window.lvl++;
		window.xplvl = xplvl * 2.5;
		window.xplvl = Math.round(xplvl);
		window.hpmax = hpmax * 1.5;
		window.hpmax = Math.round(hpmax);
		window.hp = hpmax;
		window.atk++;
		window.def++;
		document.getElementById("text").innerHTML = name + " has levled up to Level " + lvl;
		document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
	} else {
		console.log("Not enough XP to level up, you did beat the boss though!");
	}
	document.getElementById("battlec").style.visibility = "hidden";
	document.getElementById("commands").style.visibility = "visible";
}

function plyrDie() {
	window.inBattle = false;
	document.getElementById("text").innerHTML = name + " was slain by: " + ename;
	document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax;
	document.getElementById("battlec").style.visibility = "hidden";
}

function itemGet() {
	var rng = Math.floor(Math.random() * 100);
	if (rng <= 10 & rng >1) {
		document.getElementById("text").innerHTML = name + " was victorious, and also found a 'Protein Shake'!";
		window.invcon.push("Protein Shake");
	} else if (rng === 1) {
		document.getElementById("text").innerHTML = name + " was victorious, and also found a 'Bowling Ball'!";
		window.invu.push("Bowling Ball");
	} else {
		document.getElementById("text").innerHTML = name + " was victorious!";
	}
}

function shop() {
	document.getElementById("text").innerHTML="Items for sale: 'Protein Shake($5)', 'Band-Aid($40)', 'Razor($20)'";
	var purchase = prompt("Enter the name of the item to purchase: ");
	switch (purchase) {
		case "Protein Shake":
			if (window.cash >= 5) {
				window.invcon.push("Protein Shake");
				window.cash = cash - 5;
			} else {
				document.getElementById("text").innerHTML="You don't have enough money for this!";
			}
		break;
		case "Band-Aid":
			if (window.cash >= 10) {
				window.invcon.push("Water");
				window.cash = cash - 10;
			} else {
				document.getElementById("text").innerHTML="You don't have enough money for this!";
			}
		break;
		case "Razor":
			if (window.cash >= 20) {
				window.invc.push("Razor");
				window.cash = cash - 20;
			} else {
				document.getElementById("text").innerHTML="You don't have enough money for this!";
			}
		break;
		case "Grenade":
			if (window.cash >= 40) {
				window.invr.push("Grenade");
				window.cash = cash - 40;
			} else {
				document.getElementById("text").innerHTML="You don't have enough money for this!";
			}
		default:
			document.getElementById("text").innerHTML="Item doesn't exist!";
	}
	document.getElementById("money").innerHTML="Cash: " + cash;
}

function equipSet() {
	var ques = prompt("What tier is the gear you're equipping?");
	if (ques === "Common") {
		var setting = prompt("What are you equiping?");
		var invback = invc.indexOf(setting);
		if (setting === "Unequip") {
			window.equip = "";
			window.atkAdd = 0;
		} else if (invback === -1){
			document.getElementById("text").innerHTML="Item doesn't exist!";
		} else {
			switch (setting) {
				case "Razor":
					window.atkAdd = atkAdd + 3;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				default: console.log("Something broke then!");
			}
		}
	} else if (ques === "Uncommon"){
		var setting = prompt("What are you equiping?");
		var invback = invu.indexOf(setting);
		if (setting === "Unequip") {
			window.equip = "";
			window.atkAdd = 0;
		} else if (invback === -1){
			document.getElementById("text").innerHTML="Item doesn't exist!";
		} else {
			switch (setting) {
				case "Good Razor":
					window.atkAdd = atkAdd + 5;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Bowling Ball":
					window.atkAdd = atkAdd + 8;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				default: console.log("Something broke then!");
			}
	}
	} else if (ques === "Rare")
		var setting = prompt("What are you equiping?");
		var invback = invu.indexOf(setting);
		if (setting === "Unequip") {
			window.equip = "";
			window.atkAdd = 0;
		} else if (invback === -1){
			document.getElementById("text").innerHTML="Item doesn't exist!";
		} else {
			switch (setting) {
				case "Knife":
					window.atkAdd = atkAdd + 10;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Grenade":
					window.atkAdd = atkAdd + 14;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				default: console.log("Something broke then!");
			}
		}
}

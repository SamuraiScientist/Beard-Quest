var name = "";
var cash = 0;
var invcon = [];
var invc = [];
var invu = [];
var invr = [];
var invs = [];
var step = 0;
var using = 0;
var hpmax = 0;
var hp = 0;
var xp = 0;
var xplvl = 0;
var lvl = 0;
var atk = 0;
var atkAdd = 0;
var crit = 0;
var def = 0;
var enames1 = ["Weed", "Guy", "Moron", "Steve", "That Guy"];
var enames2 = ["Haunted Blade", "Car", "Typewriter", "ERROR", "C:/>_enemy"];
var bossnames = ["Dragon", "Warrior", "That Guy You Punched", "The Moron's Family", "D://Win/beat/player1.exe", "The Number 6", "A Backpack", "Copyright Strike"];
var ename = "";
var ehp = 0;
var eatk = 0;
var edef = 0;
var bosses = 0;
var items = ["Protein Shake", "Band-Aid", "Beer", "Iron", "Vitamins", "Chips"];
var equipcom = ["Razor", "Bat", "Zero", "Bag"];
var equipuncom = ["Good Razor", "Bowling Ball"];
var equiprare = ["Knife", "Grenade"];
/*Reference
Items: Protein Shake(40HP), Band-Aid(MAXHP), Beer(HP+15), Iron(HP+40)
Equipment: Razor, Good Razor, Bowling Ball, Knife, Grenade
Equipment from bosses: Shadow Bag(From Backpack Boss)
*/

function newGame() {
	window.name = prompt("What is your name?");
	window.cash = 0;
	window.inBattle = false;
	window.inDungeon = false;
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
	window.bosses = 8;
	document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
	document.getElementById("steps").innerHTML = "Steps: " + step;
	document.getElementById("text").innerHTML = "<h1>Welcome to Beard Quest</h1><br /><h3>You must travel these dangerous lands to find your lost beard!</h3>";
	document.getElementById("money").innerHTML = "Cash: " + cash;
	document.getElementById("control").style.visibility = "hidden";
	document.getElementById("commands").style.visibility = "visible";
	document.getElementById("battlec").style.visibility = "hidden";
	document.getElementById("townc").style.visibility = "hidden";
}

function invShow() {
	document.getElementById("invt").innerHTML = "Inventory(Consumables): " + invcon;
	document.getElementById("invtc").innerHTML = "Inventory(Common): " + invc;
	document.getElementById("invtu").innerHTML = "Inventory(Uncommon): " + invu;
	document.getElementById("invtr").innerHTML = "Inventory(Rare): " + invr;
	document.getElementById("invts").innerHTML = "Inventory(Special): " + invs;
}

function invHide() {
	document.getElementById("invt").innerHTML = "";
	document.getElementById("invtc").innerHTML = "";
	document.getElementById("invtu").innerHTML = "";
	document.getElementById("invtr").innerHTML = "";
	document.getElementById("invts").innerHTML = "";
}

function invUse() {
	window.using = prompt("What item are you using?");
	var invback = invcon.indexOf(using);
	if (invback === -1) {
		document.getElementById("text").innerHTML = using + " is not an item or isn't in your inventory!";
	} else {
		switch (using) {
			case "Protein Shake":
				window.hp = hp + 40;
				window.invcon.splice(invback, 1);
				if (hp > hpmax) {
					window.hp = hpmax;
					document.getElementById("text").innerHTML = name + " has recovered MAX Hp!";
					document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
				} else {
					document.getElementById("text").innerHTML = name + " has recovered 40 Hp!";
					document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
				}
				break;
			case "Band-Aid":
				window.hp = window.hpmax;
				window.invcon.splice(invback, 1);
				document.getElementById("text").innerHTML = name + " has recovered MAX Hp!";
				document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
				break;
			case "Beer":
				window.hpmax = window.hpmax + 15;
				window.invcon.splice(invback, 1);
				document.getElementById("text").innerHTML = name + " increased MAX Hp by 15!";
				document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
				break;
			case "Iron":
				window.xpmax = window.hpmax + 40;
				window.invcon.splice(invback, 1);
				document.getElementById("text").innerHTML = name + " increased MAX Hp by 40!";
				document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
				break;
			case "Vitamins":
				window.atk = atk + 2;
				window.invcom.splice(invback, 1);
				document.getElementById("text").innerHTML = "Attack UP!";
				break;
			case "Chips":
				window.hp = hp + 80;
				window.invcon.splice(invback, 1);
				if (hp > hpmax) {
					window.hp = hpmax;
					document.getElementById("text").innerHTML = name + " has recovered MAX Hp!";
					document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
				} else {
					document.getElementById("text").innerHTML = name + " has recovered 80 Hp!";
					document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
				}
				break;
			default:
				document.getElementById("text").innerHTML = "If this text comes up, something's missing or was done wrong!";
		}
	}
}

function travel () {
	window.step = step - 1;
	document.getElementById("steps").innerHTML = "Steps: " + step;
	if (window.inDungeon == false) {
		if (step === 0) {
			town();
		} else {
			generator();
		}
	} else {
		if (step === 0) {
			bossenc();
		} else {
			generator();
		}
	}
	
}

function generator() {
	var rng = Math.floor((Math.random() * 100) + 1);
		if (rng <= 100 && rng >= 51) {
			enmset();
		} else if (rng <= 50 && rng >= 31) {
			flavorText();
		} else if (rng <= 30 && rng >= 16) {
			document.getElementById("text").innerHTML= "Holy cow! You found some cash";
			window.cash = cash + Math.floor((Math.random() + 10) + 2);
			document.getElementById("money").innerHTML = "Cash: " + cash;
		} else if (rng <= 15 && rng >= 11) {
			document.getElementById("text").innerHTML = "You found a random item, finders keepers!";
			var split1 = Math.floor((Math.random() * 1) + 0);
			if (split1 === 0) {
				findCon();
			} else {
				findEquip();
			}
		} else if (rng <= 10) {
			bossenc();
		}
}

function flavorText() {
	var rng = Math.floor((Math.random() * 100) + 1);
	if (rng <= 100 && rng >= 91) {
		document.getElementById("text").innerHTML = "Nothing here but trees, how boring!";
	} else if (rng <= 90 && rng >= 81) {
		document.getElementById("text").innerHTML = "You're in an empty cave... somehow.";
	} else if (rng <= 80 && rng >= 71) {
		document.getElementById("text").innerHTML = "Tip: Most purple weapons are A-MAZING!1!";
	} else if (rng <= 70 && rng >= 61) {
		document.getElementById("text").innerHTML = "You can smell a BBQ, no time to see though.";
	} else if (rng <= 60 && rng >= 51) {
		document.getElementById("text").innerHTML = "What are you standing around for, go find your beard!";
	} else if (rng <= 50 && rng >= 41) {
		document.getElementById("text").innerHTML = "You're in the middle of an intersection, weirdo";
	} else if (rng <= 40 && rng >= 31) {
		document.getElementById("text").innerHTML = "Tip: Be warned, one of the weapons DECREASES stats";
	} else if (rng <= 30 && rng >= 21) {
		document.getElementById("text").innerHTML = "You stop for a quick sip of coffee and go back to what you were doing.";
	} else if (rng <= 20 && rng >= 11) {
		document.getElementById("text").innerHTML = "You now that you might be close to your beard, or not";
	} else if (rng <= 10 && rng >= 1) {
		document.getElementById("text").innerHTML = "You're getting tired of all this flavor text, aren't you?";
	}
}

function findCon() {
	var itemGive = items[Math.floor(Math.random() * items.length)];
	window.invcon.push(itemGive);
}

function findEquip() {
	var split2 = Math.floor((Math.random() * 3) + 1);
	if (split2 === 1) {
		var comGive = equipcom[Math.floor(Math.random() * equipcom.length)];
		window.invc.push(comGive);
	} else if (split2 === 2) {
		var uncomGive = equipuncom[Math.floor(Math.random() * equipuncom.length)];
		window.invu.push(uncomGive);
	} else if (split2 === 3) {
		var rareGive = equiprare[Math.floor(Math.random() * equiprare.length)];
		window.invr.push(rareGive);
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

function enmset() {
	if (window.lvl <= 4 && window.lvl >= 1) {
		window.ename = enames1[Math.floor(Math.random() * enames1.length)];
		window.ehp = Math.floor((Math.random() * 10) + 1) * window.lvl;
		window.eatk = Math.floor((Math.random() * 5) + 2);
		window.edef = Math.floor((Math.random() * 2) + 1);
	} else if (window.lvl <= 9 && window.lvl >= 5) {
		window.ename = enames2[Math.floor(Math.random() * enames2.length)];
		window.ehp = Math.floor((Math.random() * 20) + 10) * window.lvl;
		window.eatk = Math.floor((Math.random() * 8) + 5) + window.atk;
		window.edef = Math.floor((Math.random() * 4) + 2) + window.atk;
	}
	window.estat = "";
	document.getElementById("estat").style.color = "lime";
	document.getElementById("estat").innerHTML = ename + ": " + ehp;
	document.getElementById("text").innerHTML = "Encountered a/n: " + ename;
	window.inBattle = true;
	document.getElementById("battlec").style.visibility = "visible";
	document.getElementById("commands").style.visibility = "hidden";
	
}

function bossenc() {
	window.ename = bossnames[Math.floor(Math.random() * bossnames.length)];
	window.ehp = Math.floor((Math.random() * 15) + 10) * window.lvl;
	window.eatk = Math.floor((Math.random() * 10) + 5) * window.lvl;
	window.edef = Math.floor((Math.random() * 10) + 5) * window.lvl;
	document.getElementById("estat").style.color = "orange";
	document.getElementById("estat").innerHTML = ename + ": " + ehp;
	document.getElementById("text").innerHTML = "Encountered the: " + ename;
	window.inBattle = true;
	document.getElementById("battlec").style.visibility = "visible";
	document.getElementById("commands").style.visibility = "hidden";
}

function finalBossSet() {
	document.getElementById("text").innerHTML = "To your horror,\nthe final boss,\nis your very beard...\nGet ready for the showdown of the ages!";
	window.ename = "Your Beard"; 
	window.ehp = Math.floor((Math.random() * 500) + 100) * window.lvl;
	window.eatk = Math.floor((Math.random() * 25) + 10) * window.atk;
	window.edef = Math.floor((Math.random() * 15) + 5) * window.def;
	document.getElementById("estat").style.color = "red";
	document.getElementById("estat").innerHTML = "Final Boss: " + ehp;
	window.inBattle = true;
	document.getElementById("battlec").style.visibility = "visible";
	document.getElementById("commands").style.visibility = "hidden";
}

function plyrAtk() {
	var rng = Math.floor(Math.random() * 100);
	if (rng <= crit) {
		window.ehp = ehp - ((atk + atkAdd) * 3);
		document.getElementById("estat").innerHTML = ename + ": " + ehp + "<br />" + "You landed a critical!";
		document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
	} else {
		window.ehp = ehp - (atk + atkAdd);
		document.getElementById("estat").innerHTML = ename + ": " + ehp;
		document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
	}
	if (ehp <= 0) {
		if (window.ename === "Warrior" || window.ename === "Dragon" || window.ename === "That Guy You Punched" || window.ename === "The Moron's Family" || window.ename === "The First Thing You Killed in the Beginning of your Quest" || window.ename === "The Number 6" || window.ename === "A Backpack" || window.ename === "Another Dragon") {
			plyrWinBoss();
		} else if (window.ename === "Your Beard") {
			plyrWinFinal();	
		} else {
			plyrWin();
		}
	} else {
		enmAtk();
	}
}

function run() {
	var running = Math.floor((Math.random() * 100) + 1);
	if (running >= 25) {
		document.getElementById("text").innerHTML = "You successfuly ran from " + ename;
		document.getElementById("estat").innerHTML = "";
		document.getElementById("battlec").style.visibility = "hidden";
		document.getElementById("commands").style.visibility = "visible";
	} else {
		document.getElementById("text").innerHTML = "You failed to run, hope you got to read this!";
		enmAtk();
	}
}

function enmAtk() {
	window.hp = hp - (eatk-def);
	if (hp <= 0) {
		plyrDie();
	} else {
		document.getElementById("estat").innerHTML = ename + ": " + ehp;
		document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax + " XP: " + xp + "|" + xplvl + " Lvl: " + lvl;
	}
}

function plyrWin() {
	window.inBattle = false;
	window.xp = xp + (window.eatk + window.lvl);
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
		window.atk = atk + Math.floor((Math.random() * 5) + 1);
		window.def = def + Math.floor((Math.random() * 3) + 0);
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
	window.xp = xp + (50 * window.lvl);
	window.cash = cash + (eatk + edef); 
	window.bosses = bosses - 1;
	document.getElementById("estat").innerHTML = "";
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
	bossWepGet();
	if (bosses <= 0) {
		var finale = confirm("You have beaten enough bosses to finally apporach the final boss and get back you beard!\nIf you don't think your ready, hit cancel and train some more, this message will comeback after beating another boss.");
		if (finale == true) {
			finalBossSet();
		} else {
			alert("I understand, no rush.");
		}
	}
}

function plyrWinFinal() {
	document.getElementById("estat").innerHTML = "";
	document.getElementById("control").style.visibility = "hidden";
	document.getElementById("commands").style.visibility = "hidden";
	document.getElementById("battlec").style.visibility = "hidden";
	document.getElementById("townc").style.visibility = "hidden";
	if (window.lvl >= 7) {
		document.getElementById("text").innerHTML = "After defeating your beard,\nyou pick it up, re-attach to your face,\nand take the bus home knowing noone can stop you."
	} else {
		document.getElementById("text").innerHTML = "After defeating your beard,\nyou pick it up, re-attach to your face,\nand realize your beard is to strong for you...";
	}
}

function plyrDie() {
	window.inBattle = false;
	document.getElementById("text").innerHTML = name + " was slain by: " + ename;
	document.getElementById("stat").innerHTML = "HP: " + hp + "|" + hpmax;
	document.getElementById("battlec").style.visibility = "hidden";
}

function itemGet() {
	var rng = Math.floor(Math.random() * 100);
	if (rng <= 10 & rng > 1) {
		document.getElementById("text").innerHTML = name + " was victorious, and also found a 'Protein Shake'!";
		window.invcon.push("Band-Aid");
	} else if (rng === 1) {
		document.getElementById("text").innerHTML = name + " was victorious, and also found a 'Bowling Ball'!";
		window.invu.push("Bowling Ball");
	} else {
		document.getElementById("text").innerHTML = name + " was victorious!";
	}
}

function bossWepGet() {
	if (window.ename === "A Backpack") {
		alert("You defeated the Backpack and got some sweet stuff!");
		window.cash = cash + 100;
		document.getElementById("money").innerHTML = "Easter Eggs: " + cash;
		window.invs.push("Shadow Bag");
	} else if (ename === "D://Win/beat/player1.exe") {
		alert("You took down that program and got folder!");
		window.cash = cash + 100;
		document.getElementById("money").innerHTML = "Cash: " + cash;
		window.invs.push("DMGinc.exe");
	} else if (ename === "The Number 6") {
		alert("You beat up a real number!");
		window.cash = cash + 100;
		document.getElementById("money").innerHTML = "Cash: " + cash;
		window.invs.push("66");
	} else if (ename === "Dragon") {
		alert("You've slain a dragon, in a RPG, how generic!");
		window.cash = cash + 500;
		document.getElementById("money").innerHTML = "Gold: " + cash;
		window.invs.push("Dragon's Breath");
	} else if (ename === "Warrior") {
		alert("Why do people still fight in the plains?");
		window.cash = cash + 100;
		document.getElementById("money").innerHTML = "Cash: " + cash;
		window.invs.push("Daggar");
	} else if (ename === "That Guy You Punched") {
		alert("Well, you sure beat him, again");
		window.cash = cash + 100;
		document.getElementById("money").innerHTML = "Cash: " + cash;
		window.invs.push("Boxing Gloves");
	} else if (ename === "The Moron's Family") {
		alert("I'm running out of things to print!");
		window.cash = cash + 100;
		document.getElementById("money").innerHTML = "Cash: " + cash;
		window.invs.push("Souls");
	} else if (ename === "Copyright Strike") {
		alert("Now if EVERYBODY could do that");
		window.cash = cash + 100;
		document.getElementById("money").innerHTML = "Cash: " + cash;
		window.invs.push("Copyright");
	}
}

function shop() {
	document.getElementById("text").innerHTML="Items for sale: 'Protein Shake($5)', 'Chips($10)', 'Razor($20)', 'Grenade($50)','Beer($100)'";
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
		case "Chips":
			if (window.cash >= 10) {
				window.invcon.push("Chips");
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
		break;
		case "Beer":
			if (window.cash >= 100) {
				window.invcon.push("Beer");
				window.cash = cash - 100;
			} else {
				document.getElementById("text").innerHTML="You don't have enough money for this!";
			}
		break;
		default:
			document.getElementById("text").innerHTML="Item doesn't exist!";
	}
	document.getElementById("money").innerHTML="Cash: " + cash;
}

function equipSet() {
	var ques = prompt("What tier is the gear you're equipping?");
	//Common
	if (ques === "Common") {
		var setting = prompt("What are you equiping?");
		var invback = invc.indexOf(setting);
		if (setting === "Unequip") {
			window.equip = "";
			window.atkAdd = 0;
		} else if (invback === -1){
			document.getElementById("text").innerHTML="Item doesn't exist!";
		} else {
			document.getElementById("equip").style.color= "lime";
			switch (setting) {
				case "Razor":
					window.atkAdd = atkAdd + 3;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Bat":
					window.atkAdd = atkAdd + 4;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Zero":
					window.atkAdd = atkAdd + 10;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Bag":
					window.atkAdd = atkAdd + 6;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				default: console.log("Something broke then!");
			}
		}
	//Uncommon
	} else if (ques === "Uncommon"){
		var setting = prompt("What are you equiping?");
		var invback = invu.indexOf(setting);
		if (setting === "Unequip") {
			window.equip = "";
			window.atkAdd = 0;
		} else if (invback === -1){
			document.getElementById("text").innerHTML="Item doesn't exist!";
		} else {
			document.getElementById("equip").style.color= "cyan";
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
	//Rare
	} else if (ques === "Rare") {
		var setting = prompt("What are you equiping?");
		var invback = invr.indexOf(setting);
		if (setting === "Unequip") {
			window.equip = "";
			window.atkAdd = 0;
		} else if (invback === -1){
			document.getElementById("text").innerHTML="Item doesn't exist!";
		} else {
			document.getElementById("equip").style.color = "red";
			switch (setting) {
				case "Knife":
					window.atkAdd = atkAdd + 10;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Grenade":
					window.atkAdd = atkAdd + 14;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Shadow Bag":
					window.atkAdd = atkAdd + 25;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				default: console.log("Something broke then!");
			}
		}
	//Boss Equipment is listed here Daggar, Souls, Copyright, Boxing Gloves
	} else if (ques === "Special") {
		var setting = prompt("Impressive! Which of the boss weapons are you equiping?");
		var invback = invs.indexOf(setting);
		if (invback === -1) {
			document.getElementById("text").innerHTML="Item doesn't exist!";
		} else {
			document.getElementById("equip").style.color = "#FF00FF";
			switch (setting) {
				case "Shadow Bag":
					window.atkAdd = atkAdd + 23;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "DMGinc.exe":
					window.atkAdd = atkAdd + 20;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "66":
					window.atkAdd = atkAdd + 66;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Dragon's Breath":
					window.atkAdd = atkAdd + 60;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Daggar":
					window.atkAdd = atkAdd + 45;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Boxing Gloves":
					window.atkAdd = atkAdd + -25;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Souls":
					window.atkAdd = atkAdd + 80;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				case "Copyright":
					window.atkAdd = atkAdd + 100;
					document.getElementById("equip").innerHTML="Equipped: " + setting;
				break;
				default: console.log("I broke the code!");
			}
		}
	}
}
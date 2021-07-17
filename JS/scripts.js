function losuj(wid,hei){
	num=wid*hei;
	for (x=0;x<num;x++){
		los = Math.floor(Math.random()*(num-x));
		wylosowane[x] = tab[los];
		tab.splice(los,1);
	}
}
function level(){
	poziom = "easy"
	all = document.getElementById("gra");
	all.innetHTML = "";
	all.innerHTML = '<nav><h1>GRA MEMO</h1></nav><div class="poziom_trudnosci"><div class="poziom" style="float: left; box-shadow:inset 0px 0px 0px 2px #ffffff;" id="easy" onclick="poziom_trudnosci(1)">Łatwy</div><div class="poziom" style="float: right" id="hard" onclick="poziom_trudnosci(2)">Trudny</div><div style="clear: both"></div></div><button style="margin: auto; display: block" onclick="start()">START</button>';
	clearInterval(downloadTimer);
}

function start(){
	all = document.getElementById("gra");
	if (poziom=="hard"){
		all.innerHTML = '<nav><h1>GRA MEMO</h1></nav><div class="pojemnik_plansza" style="width: 570px"><div id="plansza"></div><div id="countdown">Pozostało: --- sekund</div><button id="reset" onclick="reset()">RESET</button><button id="level" onclick="level()">Zmień poziom trudności</button></div>';
	}
	else {
		all.innerHTML = '<nav><h1>GRA MEMO</h1></nav><div class="pojemnik_plansza"><div id="plansza"></div><div id="countdown">Pozostało: --- sekund</div><button id="reset" onclick="reset()">RESET</button><button id="level" onclick="level()">Zmień poziom trudności</button></div>';
	}
	generator();
}

function generator(){
	plansza = document.getElementById("plansza");
	if (poziom == "easy"){
		tab=['A','B','C','D','E','F','G','H','I','J','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'];
		wylosowane=[];
		los=0;
		odkryte=[];
		ilosc = 20;
		losuj(4,5);
		num = 20;
		for (x=0;x<=num;x++){
			if (x == num){
				plansza.innerHTML += '<div style="clear:both" id="' +"k"+x+ '" onclick="odkryj(this)"></div>';
			}
			else{
				plansza.style.width = "560px";
				plansza.style.height = "470px";
				plansza.innerHTML += '<div class="kafelek" id="' +"k"+x+ '" onclick="odkryj(this)"></div>';
			}
		}
		czas();
	}
	else {
		tab=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','R','S','T','W','U','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','R','S','T','W','U'];
		wylosowane=[];
		los=0;
		odkryte=[];
		ilosc = 42;
		losuj(6,7);
		for (x=0;x<=num;x++){
			if (x == num){
				plansza.innerHTML += '<div style="clear:both" id="' +"k"+x+ '" onclick="odkryj(this)"></div>';
			}
			else{
				plansza.innerHTML += '<div class="kafelek-hard" id="' +"k"+x+ '" onclick="odkryj(this)"></div>';
				plansza.style.width = "590px";
				plansza.style.height = "510px";
			}
		}
		czas();
	}
}

function play_sound(nazwa){
	sound = document.getElementById(nazwa);
	sound.pause();
	sound.currentTime = 0;
	sound.play();
}

function odkryj(element){
	
	if (odkryte.length != 2){
		play_sound("click");
		element.innerHTML = wylosowane[element.id.substr(1)];	

		//element.style.boxShadow = "inset 0px 0px 0px 2px #B63F6B";
		element.style.backgroundColor = "#B63F6B";
		element.style.color = "white";
		if(odkryte[0]!=element.id.substr(1)){
			odkryte.push(element.id.substr(1));
			
			if(odkryte.length == 2){ 
			
				if(wylosowane[odkryte[0]] == wylosowane[odkryte[1]]){
					play_sound("good");
					var kafel1 = odkryte[0];
					var kafel2 = odkryte[1];
					document.getElementById("k"+kafel1).classList.add("kafelek_js");
					document.getElementById("k"+kafel2).classList.add("kafelek_js");
					odkryte = [];

					ilosc-=2;
					timeleft += 20;
					document.getElementById("countdown").style.transition = "none";
					document.getElementById("countdown").style.backgroundColor = "green";
					window.setTimeout(function(){document.getElementById("countdown").style.transition = "background-color 0.25s linear";document.getElementById("countdown").style.backgroundColor = "#B63F6B"},250);
				}
				else{
					var kafel1 = odkryte[0];
					var kafel2 = odkryte[1];
					window.setTimeout(zakryj, 750, kafel1, kafel2);
					document.getElementById("countdown").style.transition = "none";
					document.getElementById("countdown").style.backgroundColor = "red";
					window.setTimeout(function(){document.getElementById("countdown").style.transition = "background-color 0.25s linear";document.getElementById("countdown").style.backgroundColor = "#B63F6B"},250);
					timeleft -= 10;
				}
			}
		
			if(ilosc==0){
				play_sound("win");
				clearInterval(downloadTimer);
	    		document.getElementById("countdown").innerHTML = "Koniec"
	   			plansza = document.getElementById("plansza");
				plansza.innerHTML = "WYGRAŁEŚ!";
				plansza.classList.add("plansza_koniec");
				document.getElementById("reset").style.backgroundColor = "#4dd599";
			}
		}
	}
}
function zakryj(element1,element2){
	odkryte = [];
	document.getElementById("k"+element1).innerHTML = "";
	document.getElementById("k"+element1).style.color = "black";
	document.getElementById("k"+element1).style.backgroundColor = "white";
	document.getElementById("k"+element1).style.opacity = "0.8";


	document.getElementById("k"+element2).innerHTML = "";
	document.getElementById("k"+element2).style.color = "black";
	document.getElementById("k"+element2).style.backgroundColor = "white";
	document.getElementById("k"+element2).style.opacity = "0.8";
}

function reset(){
	plansza = document.getElementById("plansza");
	plansza.innerHTML = "";
	plansza.classList.remove("plansza_koniec");
	document.getElementById("reset").style.backgroundColor = "#B63F6B";
	clearInterval(downloadTimer);
	generator();
}

function czas(){
	if (poziom=="easy"){
		timeleft = 180;
	}
	else {
		timeleft = 250;
	}
	downloadTimer = setInterval(function(){
	  document.getElementById("countdown").innerHTML = "Pozostało: " + timeleft + " sekund";
	  timeleft -= 1;
	  if(timeleft <= 0){
	  	play_sound("lose")
	    clearInterval(downloadTimer);
	    document.getElementById("countdown").innerHTML = "Koniec"
	    plansza = document.getElementById("plansza");
		plansza.innerHTML = "KONIEC CZASU!";
		plansza.classList.add("plansza_koniec");
		document.getElementById("reset").style.backgroundColor = "#4dd599";
	  }
	}, 1000);
}
hist = [];
x = document.getElementById("easy");
poziom = "easy";
function poziom_trudnosci(num){
	if (num == 1){
		poziom = "easy";
		hard = document.getElementById("hard");
		easy = document.getElementById("easy");

		easy.style.boxShadow = "inset 0px 0px 0px 2px #ffffff";
		hard.style.boxShadow = "none";
	}
	else {
		poziom = "hard";
		hard = document.getElementById("hard");
		easy = document.getElementById("easy");

		hard.style.boxShadow = "inset 0px 0px 0px 2px #ffffff";
		easy.style.boxShadow = "none";
	}

} 

// scripts.js
const cards = document.querySelectorAll('.kafelek');

function flipCard() {
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));
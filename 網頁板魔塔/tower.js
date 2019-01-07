const z_ = "pics\\blank.jpg";
const w_ = "pics\\wall.jpg";
const b_ = "pics\\floor.jpg";
const d_ = "pics\\door.jpg";
const k_ = "pics\\key.jpg";
const g1 = "pics\\gem.jpg";
const g2 = "pics\\gem2.jpg";
const h_ = "pics\\bottle.jpg";
const m1 = "pics\\monster1.jpg";
const m2 = "pics\\monster2.jpg";
const m3 = "pics\\monster3.jpg";
const m4 = "pics\\monster4.jpg";
const m5 = "pics\\monster5.jpg";
const m6 = "pics\\monster6.jpg";
const m7 = "pics\\monster7.jpg";
const us = "pics\\up.jpg";
const ds = "pics\\down.jpg";
const s1 = "pics\\shop1.jpg";
const s2 = "pics\\shop2.jpg";
const h2 = "pics\\bottle2.jpg";
const sk = "pics\\sky.jpg";

var c = "pics\\character_1.jpg";

var main_hp;
var main_atk;
var main_def;
var gold;
var exp;
var key;
var main_floor;
var score;
var best_score = 0;

var screenMode = 0;
var shopType = 0;
var choice = 0;
var skip = 0;

var floor = [];
var enter = [];

var map; 
var c_x;
var c_y;

var bgMusic, punchMusic, stairMusic, itemMusic;
var pause = 1;

function setup() {
    var text = document.getElementById("text");
    restart();
    update();
    display();
    bgMusic = document.createElement("audio");
    bgMusic.src = "audio\\offlimits.mp3";
    bgMusic.loop = 1;
}

function bgm(){
    if(pause == 0){
        bgMusic.pause();
        pause = 1;
        text.innerHTML = "BGM: off<br>" + text.innerHTML;
    }
    else{
        bgMusic.play();
        pause = 0;
        text.innerHTML = "BGM: on<br>" + text.innerHTML;
    }
}

function save(){
    localStorage.setItem("floor", JSON.stringify(floor));
    localStorage.setItem("main_floor", JSON.stringify(main_floor));
    localStorage.setItem("main_hp", JSON.stringify(main_hp));
    localStorage.setItem("main_atk", JSON.stringify(main_atk));
    localStorage.setItem("main_def", JSON.stringify(main_def));
    localStorage.setItem("key", JSON.stringify(key));
    localStorage.setItem("gold", JSON.stringify(gold));
    localStorage.setItem("exp", JSON.stringify(exp));
    localStorage.setItem("c_y", JSON.stringify(c_y));
    localStorage.setItem("c_x", JSON.stringify(c_x));
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("c", c);
    text.innerHTML = "game saved<br>" + text.innerHTML;
}

function load(){
    var screen=document.getElementById("screen");
    floor = JSON.parse(localStorage.getItem("floor"));
    main_floor = JSON.parse(localStorage.getItem("main_floor"));
    main_hp = JSON.parse(localStorage.getItem("main_hp"));
    main_atk = JSON.parse(localStorage.getItem("main_atk"));
    main_def = JSON.parse(localStorage.getItem("main_def"));
    key = JSON.parse(localStorage.getItem("key"));
    gold = JSON.parse(localStorage.getItem("gold"));
    exp = JSON.parse(localStorage.getItem("exp"));
    c = localStorage.getItem("c");
    c_y = JSON.parse(localStorage.getItem("c_y"));
    c_x = JSON.parse(localStorage.getItem("c_x"));
    score = JSON.parse(localStorage.getItem("score"));
    screen.style.zIndex="-1";
    screenMode = 0;
    var skipButton=document.getElementById("skipButton");
    var restartButton=document.getElementById("restartButton");
    var saveButton=document.getElementById("saveButton");
    var loadButton=document.getElementById("loadButton");
    skipButton.disabled = false;
    restartButton.disabled = false;
    saveButton.disabled = false;
    loadButton.disabled = false;
    update();
    display();
    text.innerHTML = "game loaded<br>" + text.innerHTML;
}

function restart(){
    var screen=document.getElementById("screen");
	//first floor
    floor[0] = [];
    enter[0] = [8, 9, 2, 2];
    floor[0][0] = [w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
    floor[0][1] = [w_, w_, us, w_, k_, k_, w_, g1, g1, g1, w_];
    floor[0][2] = [w_, m1, m2, w_, k_, k_, w_, g2, g2, g2, w_];
    floor[0][3] = [w_, h_, m1, w_, w_, d_, w_, m5, m1, m5, w_];
    floor[0][4] = [w_, m1, g1, w_, m2, b_, w_, w_, d_, w_, w_];
    floor[0][5] = [w_, d_, w_, w_, b_, b_, b_, b_, b_, b_, w_];
    floor[0][6] = [w_, b_, b_, m1, b_, b_, w_, w_, d_, w_, w_];
    floor[0][7] = [w_, d_, w_, w_, w_, m4, w_, k_, b_, k_, w_];
    floor[0][8] = [w_, m5, k_, k_, w_, g2, w_, b_, b_, b_, w_];
    floor[0][9] = [w_, m5, k_, g2, w_, g1, w_, b_, b_, b_, w_];
    floor[0][10] =[w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
	
	//second floor
    floor[1] = [];
    enter[1] = [1, 1, 9, 1];
    floor[1][0] = [w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
    floor[1][1] = [w_, b_, ds, w_, s2, w_, s1, w_, us, k_, w_];
    floor[1][2] = [w_, h_, w_, w_, d_, d_, d_, w_, w_, b_, w_];
    floor[1][3] = [w_, h_, w_, b_, m2, w_, m2, b_, w_, m1, w_];
    floor[1][4] = [w_, h_, w_, m1, g1, w_, k_, m1, w_, m2, w_];
    floor[1][5] = [w_, m2, w_, m1, g1, w_, k_, m1, w_, m1, w_];
    floor[1][6] = [w_, g1, w_, m2, w_, w_, w_, m2, w_, b_, w_];
    floor[1][7] = [w_, d_, w_, g2, h_, h_, h_, g2, w_, b_, w_];
    floor[1][8] = [w_, m5, w_, w_, w_, d_, w_, w_, w_, m5, w_];
    floor[1][9] = [w_, m1, m5, k_, d_, b_, d_, k_, m5, m1, w_];
    floor[1][10] =[w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
	
	//third floor
    floor[2] = [];
    enter[2] = [8, 2, 2, 5];
    floor[2][0] = [w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
    floor[2][1] = [w_, z_, z_, z_, z_, z_, w_, b_, ds, b_, w_];
    floor[2][2] = [w_, w_, w_, w_, w_, w_, w_, g2, b_, g1, w_];
    floor[2][3] = [w_, m2, g1, m5, m2, b_, w_, w_, d_, w_, w_];
    floor[2][4] = [w_, m2, w_, w_, w_, m5, w_, k_, m5, k_, w_];
    floor[2][5] = [w_, h_, m4, us, w_, m5, d_, b_, b_, b_, w_];
    floor[2][6] = [w_, m2, w_, w_, w_, m5, w_, d_, w_, w_, w_];
    floor[2][7] = [w_, m2, g2, m5, m2, b_, w_, m2, h_, m2, w_];
    floor[2][8] = [w_, w_, w_, w_, w_, w_, w_, w_, w_, d_, w_];
    floor[2][9] = [w_, z_, z_, z_, z_, z_, w_, k_, k_, k_, w_];
    floor[2][10] =[w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
	
	//fourth floor
    floor[3] = [];
    enter[3] = [2, 5, 6, 5];
    floor[3][0] = [w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
    floor[3][1] = [w_, g2, g2, g2, m3, b_, d_, m1, m2, m1, w_];
    floor[3][2] = [w_, w_, w_, w_, w_, d_, w_, g1, m1, g1, w_];
    floor[3][3] = [w_, b_, h_, h_, h_, b_, w_, w_, d_, w_, w_];
    floor[3][4] = [w_, m2, w_, w_, w_, w_, w_, w_, m3, w_, w_];
    floor[3][5] = [w_, h_, h_, ds, w_, us, m6, w_, g2, w_, w_];
    floor[3][6] = [w_, m2, w_, w_, w_, w_, m4, w_, g1, w_, w_];
    floor[3][7] = [w_, m5, m5, m5, b_, w_, m4, w_, d_, w_, w_];
    floor[3][8] = [w_, w_, w_, w_, m4, w_, h_, m2, b_, m2, w_];
    floor[3][9] = [w_, g1, k_, k_, k_, w_, h_, k_, m2, k_, w_];
    floor[3][10] =[w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
	
	//fifth floor
    floor[4] = [];
    enter[4] = [5, 4, 5, 8];
    floor[4][0] = [w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
    floor[4][1] = [w_, g2, g2, g2, m4, b_, d_, b_, m2, m4, w_];
    floor[4][2] = [w_, b_, b_, b_, w_, d_, w_, k_, b_, m2, w_];
    floor[4][3] = [w_, b_, h_, h_, w_, b_, w_, g1, k_, b_, w_];
    floor[4][4] = [w_, m3, w_, w_, w_, b_, w_, w_, w_, h_, w_];
    floor[4][5] = [w_, d_, h_, g2, m3, ds, m3, g2, d_, b_, w_];
    floor[4][6] = [w_, m6, w_, w_, w_, w_, w_, w_, w_, h_, w_];
    floor[4][7] = [w_, b_, b_, m6, d_, b_, w_, g1, m2, b_, w_];
    floor[4][8] = [w_, m5, m5, b_, w_, b_, w_, m3, g2, m2, w_];
    floor[4][9] = [w_, g1, m5, b_, w_, us, w_, h2, m3, g1, w_];
    floor[4][10] =[w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
	
	//sixth floor
    floor[5] = [];
    enter[5] = [5, 9, -1, -1];
    floor[5][0] = [w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
    floor[5][1] = [w_, sk, sk, w_, b_, m7, b_, w_, sk, sk, w_];
    floor[5][2] = [w_, sk, sk, w_, b_, b_, b_, w_, sk, sk, w_];
    floor[5][3] = [w_, sk, sk, w_, w_, d_, w_, w_, sk, sk, w_];
    floor[5][4] = [w_, sk, sk, sk, w_, d_, w_, sk, sk, sk, w_];
    floor[5][5] = [w_, sk, sk, sk, w_, m6, w_, sk, sk, sk, w_];
    floor[5][6] = [w_, sk, sk, sk, w_, m6, w_, sk, sk, sk, w_];
    floor[5][7] = [w_, sk, sk, w_, w_, d_, w_, w_, sk, sk, w_];
    floor[5][8] = [w_, sk, sk, w_, b_, b_, b_, w_, sk, sk, w_];
    floor[5][9] = [w_, sk, sk, w_, b_, b_, b_, w_, sk, sk, w_];
    floor[5][10] =[w_, w_, w_, w_, w_, w_, w_, w_, w_, w_, w_];
	
	// initial value
    map = floor[0]; 
    c_x = 8;
    c_y = 9;
	
    main_hp = 1000;//1000
    main_atk = 10;//10
    main_def = 10;//10
    gold = 0;//0
    exp = 0;//0
    key = 1;//1
    main_floor = 1;//1
    score = 0;//0
    c = "pics\\character_1.jpg";
    screen.style.zIndex="-1";
    screenMode = 0;
    var skipButton=document.getElementById("skipButton");
    var restartButton=document.getElementById("restartButton");
    var saveButton=document.getElementById("saveButton");
    var loadButton=document.getElementById("loadButton");
    skipButton.disabled = false;
    restartButton.disabled = false;
    saveButton.disabled = false;
    loadButton.disabled = false;

    text.innerHTML = "";
    update();
    display();
}

function skipMode(){
    if(skip == 0) {
        skip = 1;
        text.innerHTML = "Skip battle mode: on<br>" + text.innerHTML;
    }
    else {
        skip = 0;
        text.innerHTML = "Skip battle mode: off<br>" + text.innerHTML;
    }
}

function winner(){
	//game clear
    var screen=document.getElementById("screen");
    screenMode = 4;
    var skipButton=document.getElementById("skipButton");
    var restartButton=document.getElementById("restartButton");
    var saveButton=document.getElementById("saveButton");
    var loadButton=document.getElementById("loadButton");
    skipButton.disabled = true;
    restartButton.disabled = true;
    saveButton.disabled = true;
    loadButton.disabled = true;

    score += main_hp;
    if(localStorage.getItem("best_score")!=null) best_score = localStorage.getItem("best_score");
    if(score>best_score) best_score = score;
    localStorage.setItem("best_score", best_score); 
    screen.innerHTML = "<h2 style='font-size: 3em;'>Congratulations!</h2><h2>You Win!</h2><h2>your score:"+ score +"</h2><h2>best score:"+ best_score +"</h2><h2 style='font-size: 0.5em;' onclick='restart()'>restart</h2>";
    screen.style.zIndex="1";
}

function display(){
    var i, j;
    var cell;
    for(i=0; i<11; i++){
        for(j=0; j<11; j++){
            cell = document.getElementById( "cell"+i+j );
            cell.innerHTML = '<img src="'+ map[i][j] +'">';
        }
    }
}

function update() {
    map = floor[main_floor - 1];
    map[c_y][c_x] = c;
    document.getElementById("hp").innerHTML = main_hp;
    document.getElementById("atk").innerHTML = main_atk;
    document.getElementById("def").innerHTML = main_def;
    document.getElementById("gold").innerHTML = gold;
    document.getElementById("exp").innerHTML = exp;
    document.getElementById("key").innerHTML = key;
    document.getElementById("floor").innerHTML = main_floor;
}

function move( x, y ) {
    var goal = map[c_y - y][c_x + x];

    if(x>0) c = "pics\\character_2.jpg";//right
    else if(x<0) c = "pics\\character_3.jpg";//left
    else if(y>0) c = "pics\\character_4.jpg";//back
    else if(y<0) c = "pics\\character_1.jpg";
	
	switch(goal){
		case b_:
				//road.
				map[c_y][c_x] = b_;
				map[c_y - y][c_x + x] = b_;
				c_y -= y;
				c_x += x;
				break;
				
		case d_ :
				//door.
				if(key > 0){
					key--;
					map[c_y - y][c_x + x] = b_;
				}
				else text.innerHTML = "Oops! you don't have a key!<br>" + text.innerHTML;
				break;
				
		case k_:
				//get a key.
				key++;
				map[c_y][c_x] = b_;
				map[c_y - y][c_x + x] = b_;
				c_y -= y;
				c_x += x;
				text.innerHTML = "key+1<br>" + text.innerHTML;
				break;
				
		case g1:
				// ruby.
				main_atk += 3;
				map[c_y][c_x] = b_;
				map[c_y - y][c_x + x] = b_;
				c_y -= y;
				c_x += x;
				itemMusic = document.createElement("audio");
				itemMusic.src = "audio\\powerup03.mp3";
				itemMusic.play();
				text.innerHTML = "attack+3<br>" + text.innerHTML;
				break;
		case g2:
				//sapphire
				main_def += 3;
				map[c_y][c_x] = b_;
				map[c_y - y][c_x + x] = b_;
				c_y -= y;
				c_x += x;
				itemMusic = document.createElement("audio");
				itemMusic.src = "audio\\powerup03.mp3";
				itemMusic.play();
				text.innerHTML = "defence+3<br>" + text.innerHTML;
				break;
		case h_:
			main_hp += 200;
			map[c_y][c_x] = b_;
			map[c_y - y][c_x + x] = b_;
			c_y -= y;
			c_x += x;
			itemMusic = document.createElement("audio");
			itemMusic.src = "audio\\powerup03.mp3";
			itemMusic.play();
			text.innerHTML = "hp+200<br>" + text.innerHTML;
			break;
		case h2:
			main_hp += main_hp;
			map[c_y][c_x] = b_;
			map[c_y - y][c_x + x] = b_;
			c_y -= y;
			c_x += x;
			itemMusic = document.createElement("audio");
			itemMusic.src = "audio\\powerup03.mp3";
			itemMusic.play();
			text.innerHTML = "hp+"+main_hp/2+"<br>" + text.innerHTML;
			break;
		case us:
				//go upstairs.
				map[c_y][c_x] = b_;
				floor[main_floor - 1] = map;
				main_floor++;
				map = floor[main_floor - 1];
				c_x = enter[main_floor - 1][0];
				c_y = enter[main_floor - 1][1];
				stairMusic = document.createElement("audio");
				stairMusic.src = "audio\\rpg_stairs1.mp3";
				stairMusic.play();
				break;
		case ds:
				//go down stairs.
				map[c_y][c_x] = b_;
				floor[main_floor - 1] = map;
				main_floor--;
				map = floor[main_floor - 1];
				c_x = enter[main_floor - 1][2];
				c_y = enter[main_floor - 1][3];
				stairMusic = document.createElement("audio");
        		stairMusic.src = "audio\\rpg_stairs1.mp3";
        		stairMusic.play();
				
		}
	
    if (goal.substr(5, 1)=='m'){
        if(battle(goal, x, y)) {}
        else text.innerHTML = "Oops! It's too strong!<br>" + text.innerHTML;
    }
	else if (goal.substr(5, 1)=='s'){
        shopType = goal;
        choice = 0;
        shop();
    }
    update();
    display();
}

function battle( monster, x, y ){
    var screen=document.getElementById("screen");
    var mon_hp, mon_atk, mon_def, mon_gold, mon_exp;
    var t;
    function loop(){
        punchMusic = document.createElement("audio");
        punchMusic.src = "audio\\punch2a.mp3";
        punchMusic.play();
        mon_hp -= mon_damage;
        main_hp -= main_damage;
        screen.innerHTML =  "<div style='width:50%;'><img src='pics\\character_1.jpg' style='display:block; margin:auto; float:none; border: 1px chocolate solid; margin-top:30px; margin-bottom:40px;'><h2>HP "+main_hp+"</h2><h2>ATK "+main_atk+"</h2><h2>DEF "+main_def+"</h2></div>";
        screen.innerHTML += "<div style='width:50%;'><img src="+monster+" style='display:block; margin:auto; float:none; border: 1px chocolate solid; margin-top:30px; margin-bottom:40px;'><h2>HP "+mon_hp+"</h2><h2>ATK "+mon_atk+"</h2><h2>DEF "+mon_def+"</h2></div>";
        screen.style.zIndex="1";
        if(mon_hp <= 0){
            screen.style.zIndex="-1";
            screenMode=0;
            var skipButton=document.getElementById("skipButton");
			var restartButton=document.getElementById("restartButton");
			var saveButton=document.getElementById("saveButton");
			var loadButton=document.getElementById("loadButton");
			skipButton.disabled = false;
			restartButton.disabled = false;
			saveButton.disabled = false;
			loadButton.disabled = false;
            map[c_y - y][c_x + x] = b_;
            text.innerHTML = "You win! gold+"+ mon_gold +" exp+"+ mon_exp +"!<br>" + text.innerHTML;
            gold += mon_gold;
            exp += mon_exp;
            score += mon_score;
            if(monster == m7) winner();
            update();
            display();
            clearInterval(t);
        }
    }
	// monster states
	switch(monster){
		case m1:
			//slime
			mon_hp = 50;
			mon_atk = 15;
			mon_def = 5;
			mon_gold = 3;
			mon_exp = 2;
			mon_score = 10;
			break;
		case m2:
			//skeleton
			mon_hp = 200;
			mon_atk = 40;
			mon_def = 15;
			mon_gold = 15;
			mon_exp = 10;
			mon_score = 50;
			break;
		case m3:
			//golem
			mon_hp = 2500;
			mon_atk = 150;
			mon_def = 150;
			mon_gold = 55;
			mon_exp = 50;
			mon_score = 150;
			break;
		case m4: 
			//knight
			mon_hp = 1550;
			mon_atk = 150;
			mon_def = 70;
			mon_gold = 50;
			mon_exp = 50;
			mon_score = 100;
			break;
		case m5:
			//bat
			mon_hp = 150;
			mon_atk = 30;
			mon_def = 10;
			mon_gold = 6;
			mon_exp = 6;
			mon_score = 200;
			break;
		case m6:
			//magician
			mon_hp = 3000;
			mon_atk = 320;
			mon_def = 200;
			mon_gold = 100;
			mon_exp = 100;
			mon_score = 300;
			break;
		case m7:
			//boss
			mon_hp = 15000;
			mon_atk = 500;
			mon_def = 350;
			mon_gold = 0;
			mon_exp = 0;
			mon_score = 10000;
		
	}
    var mon_damage = main_atk - mon_def;
    if(mon_damage <= 0)
        return 0;
    var main_damage = mon_atk - main_def;
    if(main_damage < 0) main_damage = 0;
    var damageTaken = main_damage*Math.ceil(mon_hp / mon_damage);
    console.log(damageTaken);
    if(main_hp < damageTaken) return 0;
    if(monster==m6 && main_hp*0.7 < damageTaken) return 0;

    if(monster==m6) main_hp = Math.floor(main_hp*0.7);
    if(skip==1){
        do {
            if(mon_hp<=0) break;
            mon_hp -= mon_damage;
            main_hp -= main_damage;
        } while (mon_hp > 0)
        map[c_y - y][c_x + x] = b_;
        text.innerHTML = "You win! gold+"+ mon_gold +" exp+"+ mon_exp +"!<br>" + text.innerHTML;
        gold += mon_gold;
        exp += mon_exp;
        score += mon_score;
        if(monster == m7) winner();
        punchMusic = document.createElement("audio");
        punchMusic.src = "audio\\punch2a.mp3";
        punchMusic.play();
    }
    else {
        //mon_hp -= mon_damage;
        //main_hp -= main_damage;
        screen.innerHTML =  "<div style='width:50%;'><img src='pics\\character_1.jpg' style='display:block; margin:auto; float:none; border: 1px chocolate solid; margin-top:30px; margin-bottom:40px;'><h2>HP "+main_hp+"</h2><h2>ATK "+main_atk+"</h2><h2>DEF "+main_def+"</h2></div>";
        screen.innerHTML += "<div style='width:50%;'><img src="+monster+" style='display:block; margin:auto; float:none; border: 1px chocolate solid; margin-top:30px; margin-bottom:40px;'><h2>HP "+mon_hp+"</h2><h2>ATK "+mon_atk+"</h2><h2>DEF "+mon_def+"</h2></div>";
        screen.style.zIndex="1";
        screenMode=3;
        var skipButton=document.getElementById("skipButton");
        var restartButton=document.getElementById("restartButton");
        var saveButton=document.getElementById("saveButton");
        var loadButton=document.getElementById("loadButton");
        skipButton.disabled = true;
        restartButton.disabled = true;
        saveButton.disabled = true;
        loadButton.disabled = true;
        t=setInterval(loop,500);
    }
    return 1;
}

function shop(){
    var screen=document.getElementById("screen");
    if(shopType == s2) {
		// gold shop
        screenMode=1;
        var skipButton=document.getElementById("skipButton");
        var restartButton=document.getElementById("restartButton");
        var saveButton=document.getElementById("saveButton");
        var loadButton=document.getElementById("loadButton");
        skipButton.disabled = true;
        restartButton.disabled = true;
        saveButton.disabled = true;
        loadButton.disabled = true;
        screen.innerHTML =  "<table>";
        screen.innerHTML += "<tr><h2>Welcome to the shop!<br>You can use 25 gold to:</h2></tr>";
        if(choice==0) screen.innerHTML += "<tr><h2 class='choicen'>+800 hp</h2></tr>";
        else screen.innerHTML += "<tr><h2>+800 hp</h2></tr>";
        if(choice==1) screen.innerHTML += "<tr><h2 class='choicen'>+5 attack</h2></tr>";
        else screen.innerHTML += "<tr><h2>+5 attack</h2></tr>";
        if(choice==2) screen.innerHTML += "<tr><h2 class='choicen'>+5 defence</h2></tr>";
        else screen.innerHTML += "<tr><h2>+5 defence</h2></tr>";
        if(choice==3) screen.innerHTML += "<tr><h2 class='choicen'>exit</h2></tr>";
        else screen.innerHTML += "<tr><h2>exit</h2></tr>";
        screen.innerHTML += "</table>";
    }
    else if(shopType == s1) {
		// exp shop
        screenMode=2;
        var skipButton=document.getElementById("skipButton");
        var restartButton=document.getElementById("restartButton");
        var saveButton=document.getElementById("saveButton");
        var loadButton=document.getElementById("loadButton");
        skipButton.disabled = true;
        restartButton.disabled = true;
        saveButton.disabled = true;
        loadButton.disabled = true;
        screen.innerHTML =  "<table>";
        screen.innerHTML += "<tr><h2>You can use 100 exp to:</h2></tr>";
        if(choice==0) screen.innerHTML += "<tr><h2 class='choicen'>Level up!</h2></tr>";
        else screen.innerHTML += "<tr><h2>Level up!</h2></tr>";
        screen.innerHTML += "<tr><h2>Or use 30 exp to:</h2></tr>";
        if(choice==1) screen.innerHTML += "<tr><h2 class='choicen'>+10 attack</h2></tr>";
        else screen.innerHTML += "<tr><h2>+10 attack</h2></tr>";
        if(choice==2) screen.innerHTML += "<tr><h2 class='choicen'>+10 defence</h2></tr>";
        else screen.innerHTML += "<tr><h2>+10 defence</h2></tr>";
        if(choice==3) screen.innerHTML += "<tr><h2 class='choicen'>exit</h2></tr>";
        else screen.innerHTML += "<tr><h2>exit</h2></tr>";
        screen.innerHTML += "</table>";
    }
    screen.style.zIndex="1";
}

function DoIt(){
    if(screenMode == 1){
		//gold shop
        switch(choice){
		case 0:
            if(gold >= 25){
                gold-=25;
                main_hp+=800;
                text.innerHTML = "hp+800<br>" + text.innerHTML;
            }
			else
				text.innerHTML = "You dont have enough gold!<br>" + text.innerHTML;
			break;
        case 1:
            if(gold >= 25){
                gold-=25;
                main_atk+=5;
                text.innerHTML = "attack+5<br>" + text.innerHTML;
             }
			 else
				text.innerHTML = "You dont have enough gold!<br>" + text.innerHTML;
			 break;
        case 2:
            if(gold >= 25){
                gold-=25;
                main_def+=5;
                text.innerHTML = "defence+10<br>" + text.innerHTML;
            }
			else
				text.innerHTML = "You dont have enough gold!<br>" + text.innerHTML;
			break;
        case 3:
            screenMode = 0;
            var skipButton=document.getElementById("skipButton");
            var restartButton=document.getElementById("restartButton");
            var saveButton=document.getElementById("saveButton");
            var loadButton=document.getElementById("loadButton");
            skipButton.disabled = false;
            restartButton.disabled = false;
            saveButton.disabled = false;
            loadButton.disabled = false;
            var screen=document.getElementById("screen");
            screen.style.zIndex="-1";
			break;
		default:
			console.log(choice);
			break;
        }
    }
    else if(screenMode == 2){
		//exp shop1 
        switch(choice){
		case 0:
            if(exp >= 100){
                exp-=100;
                main_hp+=500;
                main_atk+=20;
                main_def+=20;
                text.innerHTML = "Level UP! hp+500 attack+20 defence+20<br>" + text.innerHTML;
            }
			else
				text.innerHTML = "You dont have enough experience point!<br>" + text.innerHTML;
			break;
        
       case 1:
            if(exp >= 30){
                exp-=30;
                main_atk+=10;
                text.innerHTML = "attack+10<br>" + text.innerHTML;
            }
			else
				text.innerHTML = "You dont have enough experience point!<br>" + text.innerHTML;
			break;
        
        case 2:
            if(exp >= 30){
                exp-=30;
                main_def+=10;
                text.innerHTML = "defence+10<br>" + text.innerHTML;
            }
			else
				text.innerHTML = "You dont have enough experience point!<br>" + text.innerHTML;
			break;
        
        case 3:
            screenMode = 0;
            var skipButton=document.getElementById("skipButton");
            var restartButton=document.getElementById("restartButton");
            var saveButton=document.getElementById("saveButton");
            var loadButton=document.getElementById("loadButton");
            skipButton.disabled = false;
            restartButton.disabled = false;
            saveButton.disabled = false;
            loadButton.disabled = false;
            var screen=document.getElementById("screen");
            screen.style.zIndex="-1";
			break;
		default:
			console.log(choice);
			break;
        }
		
	}
		itemMusic = document.createElement("audio");
        itemMusic.src = "audio\\powerup03.mp3";
        itemMusic.play();
}

window.onkeyup = function (e) {
    var keyboard = e.keyCode ? e.keyCode : e.which;
    pressKey(keyboard);
}

function pressKey(keyboard) {
	//user press keyboard
	console.log(screenMode)
    if(screenMode == 0){
        if (keyboard == 87) move(0, 1);//w
        else if (keyboard == 83) move(0, -1);//s
        else if (keyboard == 68) move(1, 0);//d
        else if (keyboard == 65) move(-1, 0);//a
        else if (keyboard == 90) save();//z
        else if (keyboard == 88) load();//x
    }
    else if(screenMode == 1 || screenMode == 2){
        if (keyboard == 83){
            if(choice < 3) choice++;
            shop();
        }
        else if (keyboard == 87) {
            if(choice > 0) choice--;
            shop();
        }
        else if (keyboard == 32) {
            DoIt();
        }
    }
    else if(screenMode == 4){
        if (keyboard == 32) restart();
    }
    console.log(keyboard);
    update();
    display();
}
function assert(statement){
	if(statement){
		return 'passed';
	}else{
		throw 'Assertion error: Failed assert'
	};
}

const LSto={
	"stats":{
		"gold":0,
		"RateClicks":1,
		"RateSec":0,
		"priceRC":50,
		"priceRS":150,
		"priceCap":500,
		"CurrStore":0,
		"MaxStore":1000,
		"AutoUpg":false,
		"GoldRush":false,
	},
	save:function(){
		this.stats.gold=gold;
		this.stats.RateClicks=RateClicks;
		this.stats.RateSec=RateSec;
		this.stats.priceRC=priceRC;
		this.stats.priceRS=priceRS;
		this.stats.priceCap=priceCap;
		this.stats.CurrStore=CurrStore;
		this.stats.MaxStore=MaxStore;
		this.stats.AutoUpg=AutoUpg;
		this.stats.GoldRush=GoldRush;
		if(localStorage.getItem('GSts')){localStorage['GSts']=btoa(JSON.stringify(this.stats))}
	},
	load:function(){this.stats=JSON.parse(atob(localStorage.getItem('GSts')));},
	getGameCode:function(){return btoa(JSON.stringify(this.stats))},
}

if(localStorage.getItem('GSts')){
	try{
		LSto.load();
	}catch(e){
		console.error('A Storage-Load-Error occured. Game reseted.')
		console.warn('Don\'t try to tamper!')
		LSto.save();
	}
}else{
	localStorage.setItem('GSts',LSto.stats);
}

function loadGame(){
	try{
		loadingAGame=true;
		let strCode=JSON.parse(atob(document.getElementById('InpGameCode').value));
		assert(('gold' in strCode)&&(typeof strCode.gold == 'number'));
		assert(('RateClicks' in strCode)&&(typeof strCode.RateClicks == 'number'));
		assert(('RateSec' in strCode)&&(typeof strCode.RateSec == 'number'));
		assert(('priceRC' in strCode)&&(typeof strCode.priceRC == 'number'));
		assert(('priceRS' in strCode)&&(typeof strCode.priceRS == 'number'));
		assert(('priceCap' in strCode)&&(typeof strCode.priceCap == 'number'));
		assert(('CurrStore' in strCode)&&(typeof strCode.CurrStore == 'number'));
		assert(('MaxStore' in strCode)&&(typeof strCode.MaxStore == 'number'));
		assert(('AutoUpg' in strCode)&&(typeof strCode.AutoUpg == 'boolean'));
		assert(('GoldRush' in strCode)&&(typeof strCode.GoldRush == 'boolean'));
		gold=strCode.gold;
		RateClicks=strCode.RateClicks;
		RateSec=strCode.RateSec;
		priceRC=strCode.priceRC;
		priceRS=strCode.priceRS;
		priceCap=strCode.priceCap;
		CurrStore=strCode.CurrStore;
		MaxStore=strCode.MaxStore;
		AutoUpg=strCode.AutoUpg;
		GoldRush=strCode.GoldRush;
		LSto.save();
		location.reload();
	}catch(e){
		alert('Invalid Game Code!');
		console.error(e.name+': '+e.message);
	}finally{
		loadingAGame=false;
	}
}

function copyCode(){
	navigator.clipboard.writeText(LSto.getGameCode());
	document.getElementById('DispCopy').innerHTML='<span style="color:#00dd00">Copied.</span>';
	setTimeout(()=>{document.getElementById('DispCopy').innerHTML=''},500);
}
	

var gold=LSto.stats.gold;
var RateClicks=LSto.stats.RateClicks;
var RateSec=LSto.stats.RateSec;
var priceRC=LSto.stats.priceRC;
var priceRS=LSto.stats.priceRS;
var priceCap=LSto.stats.priceCap;
var CurrStore=LSto.stats.CurrStore;
var MaxStore=LSto.stats.MaxStore;
var ATS;
var ATW;
var AutoUpg=LSto.stats.AutoUpg;
var GoldRush=LSto.stats.GoldRush;
var Storing=false;
var Withdrawing=false;
var loadingAGame=false;

//Log Window
const Logs = {
	LBD : document.getElementById('LogFrame').contentWindow.document.body ,
	add : function(str){
		if(this.LBD){
			this.LBD.innerHTML = '<p><pre>'+str+'</pre></p><hr>' + this.LBD.innerHTML;
		}
	},
	clr : function(){
		if(this.LBD){
			this.LBD.innerHTML = '';
		}
	}
}
//

function update(){
	if(document.getElementById('GoldCount')){document.getElementById('GoldCount').innerHTML=Math.floor(gold);};
	if(document.getElementById('gpc')){document.getElementById('gpc').innerHTML=Math.floor(RateClicks);};
	if(document.getElementById('gps')){document.getElementById('gps').innerHTML=Math.floor(RateSec);};
	if(document.getElementById('prgpc')){document.getElementById('prgpc').innerHTML=Math.floor(priceRC);};
	if(document.getElementById('prgps')){document.getElementById('prgps').innerHTML=Math.floor(priceRS);};
	if(document.getElementById('amountStorage')){document.getElementById('amountStorage').innerHTML=Math.floor(CurrStore);};
	if(document.getElementById('maxStorage')){document.getElementById('maxStorage').innerHTML=Math.floor(MaxStore);};
	if(document.getElementById('prsc')){document.getElementById('prsc').innerHTML=Math.floor(priceCap);};
	if(document.getElementById('portion')){
		document.getElementById('portion').max=MaxStore;
		document.getElementById('portion').value=CurrStore;
	};
	if(!loadingAGame){LSto.save();};
}

function grind(){
	gold += RateClicks;
}

function upgc(){
	if(gold >= priceRC && priceRC != Infinity){
		if(RateClicks <= 1){
			RateClicks++;
		}else{
			RateClicks *= 1.3;
		}
		gold -= priceRC;
		if(priceRC <= 250){
			priceRC += 30;
		}else{
			priceRC *= 1.2;
		}
		Logs.add('Upgraded Gold per Clicks (manual)');
	}else{
		alert('Not enough Gold.');
	}
}

function upgcAu(){
	if(gold >= priceRC && priceRC != Infinity){
		if(RateClicks <= 1){
			RateClicks++;
		}else{
			RateClicks *= 1.3;
		}
		gold -= priceRC;
		if(priceRC <= 250){
			priceRC += 30;
		}else{
			priceRC *= 1.2;
		}
	}
}

function upgs(){
	if(gold >= priceRS && priceRS != Infinity){
		if(RateSec <= 1){
			RateSec++;
		}else{
			RateSec *= 1.24;
		}
		gold -= priceRS;
		if(priceRS <= 350){
			priceRS += 50;
		}else{
			priceRS *= 1.2;
		}
		Logs.add('Upgraded Gold per sec (manual)')
	}else{
		alert('Not enough Gold.');
	}
}

function upgsAu(){
	if(gold >= priceRS && priceRS != Infinity){
		if(RateSec <= 1){
			RateSec++;
		}else{
			RateSec *= 1.24;
		}
		gold -= priceRS;
		if(priceRS <= 150){
			priceRS += 50;
		}else{
			priceRS *= 1.2;
		}
	}
}

function upsc(){
	if(gold >= priceCap && priceCap != Infinity){
		MaxStore *= 2.5;
		priceCap *= 1.35;
		gold -= priceCap;
		Logs.add('Upgraded Storage Capacity');
	}else{
		alert('Not enough Gold.');
	}
}

function acau(){
	if(gold >=10000){
		AU.innerHTML='<input type="checkbox" name="ch" /> Auto-Upgrade Gold per Click<br><input type="checkbox" name="ch" /> Auto-Upgrade Gold per sec';
		gold -= 10000;
		AutoUpg=true;
		Logs.add('<span style="color:#00ff00">Unlocked Auto-Upgrader</span>');
	}else{
		alert('Not enough Gold.');
	}
}

function autoUP(){
	if(AutoUpg && document.getElementsByName('ch')){
		if(document.getElementsByName('ch')[0].checked && !document.getElementsByName('ch')[1].checked){upgcAu();}
		if(!document.getElementsByName('ch')[0].checked && document.getElementsByName('ch')[1].checked){upgsAu();}
		if(document.getElementsByName('ch')[0].checked && document.getElementsByName('ch')[1].checked){
			if(Math.min(priceRS, priceRC)==priceRS){
				upgsAu();
			}else{
				upgcAu();
			}
		}
	}
}

function acgb(){
	if(gold >= 1e+100 && document.getElementsByName('ch').length != 0){
		if(!document.getElementsByName('ch')[0].checked && !document.getElementsByName('ch')[1].checked){
			if(!Withdrawing && !Storing){
				gold=2;
				RateClicks=0;
				RateSec=0;
				GoldRush=true;
				document.getElementById('dispGB').innerHTML = '<hr><br><span style="color:gold;font-size:100pt">!!!Gold Rush!!!</span>';
				Logs.add('<span style="color:gold">(The End.)</span>');
			}else{
				alert('Storing/Withdrawing Progress!');
			}
		}else{
			alert('Untick the checkboxes first!');
		}
	}else{
		alert('Reach the given gold count first and unlock the Auto-Upgrader first.');
	}
}
//store
function stReq(){
	if(!Withdrawing && !Storing){
		ATS = parseInt(AmountToStore.value);
		if((ATS <= gold) && (ATS <= Math.floor(MaxStore)-Math.floor(CurrStore))){
			Storing=true;
			SCooldown.innerHTML=' Storing... <progress value="0" max="30" id="SCD" ></progress>';
			Logs.add('Storing request...');
		}
	}
}

function st(){
	if((ATS <= gold) && (ATS <= Math.floor(MaxStore)-Math.floor(CurrStore))){
		gold -= ATS;
		CurrStore += ATS;
		Storing=false;
		SCooldown.innerHTML='';
		Logs.add('<span style="color:#00dd00">Stored '+Math.floor(ATS)+' Gold</span>');
	}else{
		SCooldown.innerHTML=' <span style="color:#ff0000">Failed.</span>';
		setTimeout(()=>{SCooldown.innerHTML=''},500);
		Storing=false;
		Logs.add('<span style="color:#ff0000">Failed to store '+Math.floor(ATW)+' Gold</span>')
	}
}

function stAll(){
	if(!Withdrawing && !Storing){
		ATS=Math.min(gold, Math.floor(MaxStore)-Math.floor(CurrStore));
		Storing=true;
		SCooldown.innerHTML=' Storing... <progress value="0" max="30" id="SCD" ></progress>';
		Logs.add('Storing request...');
	}
}
//
//Withdraw
function wdReq(){
	if(!Withdrawing && !Storing){
		ATW = parseInt(AmountToWithdraw.value);
		if(ATW <= CurrStore){
			Withdrawing=true;
			WCooldown.innerHTML=' Withdrawing... <progress value="0" max="30" id="WCD" ></progress>';
			Logs.add('Withdrawing request...');
		}
	}
}

function wd(){
	if(ATW <= CurrStore){
		gold += ATW;
		CurrStore -= ATW;
		Withdrawing=false;
		WCooldown.innerHTML=''
		Logs.add('Withdrew '+Math.floor(ATW)+' Gold');
	}else{
		WCooldown.innerHTML=' <span style="color:#ff0000">Failed.</span>';
		setTimeout(()=>{WCooldown.innerHTML=''},500);
		Withdrawing=false;
		Logs.add('<span style="color:#ff0000">Failed to withdraw '+Math.floor(ATW)+' Gold</span>')
	}
}

function wdAll(){
	if(!Withdrawing && !Storing){
		ATW=CurrStore;
		Withdrawing=true;
		WCooldown.innerHTML=' Withdrawing... <progress value="0" max="30" id="WCD" ></progress>';
		Logs.add('Withdrawing request...');
	}
}	
//

document.addEventListener('keydown', (event)=>{if(event.keyCode==13){alert('You are not allowed to use Enter.')}});

//work-cycle
var i=9999;
var InfMessage=true
function work(){
	setTimeout(()=>{
		if(GoldRush){
			if(i%3 == 0){
				gold=gold**2;
			}
		}else{
			autoUP();
			if(i%10 == 0){
				gold += RateSec;
			}
		};
		if(i <= 0){
			i=9999
		}else{
			i--
		};
		if(gold==Infinity && InfMessage){
			InfMessage=false;
			setTimeout(()=>{if(confirm('Congrats! You reached Infinity! Do you want to restart?')){resetGame()}},500);
		}
		if(Storing){
			if(document.getElementById('SCD')){
				if(SCD.value >= 30){
					st();
				}else{
					SCD.value++;
				}
			}
		}
		if(Withdrawing){
			if(document.getElementById('WCD')){
				if(WCD.value >= 30){
					wd()
				}else{
					WCD.value++;
				}
			}
		}
		update();
		work();
	}, 100)
}
//

window.onload=()=>{
	if(GoldRush){
		document.getElementById('dispGB').innerHTML = '<hr><br><span style="color:gold;font-size:100pt">!!!Gold Rush!!!</span>';
	}else{
		document.getElementById('dispGB').innerHTML = `<h2><p><span style="color:#00dd00" >Storage:</span>&nbsp;<span id="amountStorage" ></span>&nbsp;/&nbsp;<span id="maxStorage"></span>&nbsp;Gold&nbsp;&nbsp;<progress id="portion" value="0" max="1000" ></progress></p></h2>
														<hr>
														<p><button class="btn" id="bt" onclick="javascript:grind();update()" ><span style="font-size:40pt" >&#9935;&nbsp;Grind.&nbsp;&#9935;</span></button></p>
														<hr>
														<p>
														<button onclick="javascript:stReq()" >Store</button><input type="number" value="1" min="0" max="1000" id="AmountToStore" />&nbsp;&nbsp;<button onclick="javascript:stAll()" >Store Max.</button>&nbsp;<span id="SCooldown" ></span>
														</p><p>
														<button onclick="javascript:wdReq()" >Withdraw</button><input type="number" value="1" min="0" max="1000" id="AmountToWithdraw" />&nbsp;&nbsp;<button onclick="javascript:wdAll()" >Withdraw All.</button>&nbsp;<span id="WCooldown" ></span>
														</p>
														<hr>
														<h3><u>Gold-Upgrades</u></h3>
														<p><button onclick="javascript:upgc();update()" >&uArr;&nbsp;Upgrade Gold per Click.</button>&nbsp;<span id="gpc" ></span>&nbsp;Gold/Click&nbsp;&nbsp;Price:<span id="prgpc" ></span></p>
														<p><button onclick="javascript:upgs();update()" >&uArr;&nbsp;Upgrade Gold per sec.</button>&nbsp;<span id="gps" ></span>&nbsp;Gold/sec.&nbsp;&nbsp;Price:<span id="prgps" ></span></p>
														<hr>
														<h3><u>Storage-Upgrades</u></h3>
														<p><button onclick="javascript:upsc();update()" >&uArr;&nbsp;Upgrade Storage capacity.</button>&nbsp;&nbsp;Price:<span id="prsc" ></span></p>
														<hr>
														<p id="AU" ><button onclick="javascript:acau();update()" >Unlock Auto-Upgrader</button>&nbsp;Price:10000</p>
														<hr>
														<p>
														<button onclick="javascript:acgb();update()">Activate Gold Rush!</button><br>
														<p>Requires:<br>
														&nbsp;&bull;&nbsp;Unlocked Auto-Upgrader<br>
														&nbsp;&bull;&nbsp;Both Auto-Upgrades turned off (Untick both checkboxes.)<br>
														&nbsp;&bull;&nbsp;At least 1e+100 Gold<br>
														</p>
<p><pre>
Information:
Gold will be generated very rapid.
You won't need to upgrade anything or to grind the gold.
</pre></p>
														</p>`;
		if(AutoUpg){
			document.getElementById('AU').innerHTML='<input type="checkbox" name="ch" /> Auto-Upgrade Gold per Click<br><input type="checkbox" name="ch" /> Auto-Upgrade Gold per sec';
		}else{
			document.getElementById('AU').innerHTML='<button onclick="javascript:acau();update()" >Unlock Auto-Upgrader</button>&nbsp;Price:10000';
		}
	}
	document.getElementById('LoadGameBtn').addEventListener('click',loadGame);
	document.getElementById('CopyGCBtn').addEventListener('click',copyCode);
	update();
	work();
}

function resetGame(){
	localStorage.removeItem('GSts');
	location.reload();
}


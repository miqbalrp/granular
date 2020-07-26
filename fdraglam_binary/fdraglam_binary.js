/* 
	fdraglam_new.js
	Laminar flow drag force on collidable spherical grain
	(with some major modification).
	
	Sparisoma Viridi
	Iqbal Rahmadhan
	
	20190531
	0533	Start modifying oneIntruder.js to become 	@rumah
			fdraglam.js
	0546	Has removed all vibration related			@rumah
	0614	Has inserted fluidization tools				@rumah
	
	
	note: 
	for setting position don't forget to look at
	- initParams()
	- drawSystem()
	- Vect3CenterMass
	or just search "i&2==0" and "N/2"
*/

// Define global variables for walls
var L, R;
var w1, w2, w3, w4, w5, w6, w7, w8;
var WL, WR, WT, WB;
var wall, Nw, kw;

// Define global variables for parameters
var gacc, kcol, gcol;

// Define global variables for simulation
var tstep, tbeg, tend, tdata, tproc, proc, t, Ndata, idata, tflow;

// Define global variables for coordinates
var ymin, zmin, ymax, zmax, YMIN, ZMIN, YMAX, ZMAX;

// Define global variables for box
var boxh, boxw, boxt;

// Define global variables for grains
var diag1, diag2, rhog1, rhog2, numg, geng, r, v, m, D;

// Define global variables for fluid
var velf, etaf, rhof, rhof1;

// Define global variables for visual elements
var taInPar; 	// text area for input parameters
var caOut; 		// output canvas 
var taOutPar;	// text area for output paramaters
var taOutParH;	// header for taOutParam
var taCons;		// text area for console
var taOutPos;	// text area for output position
var taInPos;	// text area for input position
var teIn;
var inIN;

var btClear, btLoad, btRead, btStart, btInfo, btHelp, btFlow;

var cScale = 4.000;
var taOutParON = true;
var ff = 0;

main();

function main(){
	setElementsLayout();
	
	initParams();
}

// Set layout of all elements
function setElementsLayout() {

	document.body.style.background = "#eee" // "#B3FFF9";
	document.body.align = "center";
	
	// Create text header
	header0 = document.createElement("h1");
	header0.innerHTML = "Laminar Flow Drag Force";
	header0.align = "center";

	// Create output canvas & size
	caOut = document.createElement("canvas");
	caOut.width = 280;
	caOut.height = 760/2;
	boxw = caOut.width*0.001;
	boxh = caOut.height*0.001;
	caOut.style.width = caOut.width + "px";
	caOut.style.height = caOut.height + "px";
	caOut.style.float = "left";
	caOut.style.border = "#aaa 10px solid"

	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);
	YMIN = 0;
	ZMIN = caOut.height;
	YMAX = caOut.width;
	ZMAX = 0;
	
	// Create text area for input parameters
	taInPar = document.createElement("textarea");
	taInPar.style.width = "270px";
	taInPar.style.height = (parseInt(caOut.style.height)/2)+"px";
	taInPar.style.overflowY = "scroll";
	taInPar.style.overflowX = "scroll";
	taInPar.style.float = "left";
	taInPar.style.background = "#fff";
	
	// Create header text area for input parameters 
	taInParH = document.createElement("textarea");
	taInParH.style.width = parseInt(taInPar.style.width)+"px";
	taInParH.style.height = "15px";
	taInParH.style.float = "left";
	taInParH.style.background = "#eee";
	tout(taInParH, "-------- Input parameters --------");

		
	// Create text area for "console"
	taCons = document.createElement("textarea");
	taCons.style.width = "270px";	
	taCons.style.height = (parseInt(caOut.style.height)/2)
						+"px";;
	taCons.style.overflowY = "scroll";
	taCons.style.overflowX = "scroll";
	taCons.style.float = "left";
	taCons.style.background = "#fff";
	
	// Create header text area for console 
	taConsH = document.createElement("textarea");
	taConsH.style.width = parseInt(taInPar.style.width)+"px";
	taConsH.style.height = "15px";
	taConsH.style.float = "left";
	taConsH.style.background = "#eee";
	tout(taConsH, "------------- Console -------------");

	// Create text area for output parameters
	taOutPar = document.createElement("textarea");
	taOutPar.style.width = 270+"px";	
	taOutPar.style.height = (parseInt(taInPar.style.height) 
						+ parseInt(taCons.style.height))/2 
						+ "px";
	taOutPar.style.overflowY = "scroll";
	taOutPar.style.overflowX = "scroll";
	taOutPar.style.float = "left";
	taOutPar.style.background = "#fff";

	// Create header text area for output parameters 
	taOutParH = document.createElement("textarea");
	taOutParH.style.width = parseInt(taOutPar.style.width)+"px";
	taOutParH.style.height = "15px";
	taOutParH.style.float = "left";
	taOutParH.style.background = "#eee";
	tout(taOutParH, "-------- Output parameters --------");
	
	// Create text area for input position
	taInPos = document.createElement("textarea");
	taInPos.style.width = "270px";
	taInPos.style.height = (parseInt(taInPar.style.height) 
						+ parseInt(taCons.style.height))/2 
						+ "px";
	taInPos.style.overflowY = "scroll";
	taInPos.style.float = "left";
	taInPos.style.background = "#fff";
	tout(taInPos, "YGET -0.13284057471273739 -0.10188027311819571 -0.08627008492283529 -0.07064973090706111 -0.023745510503015654 -0.008098287021055322 0.023208334958105876 0.05452621153667597 0.07018843079744393 0.10150470035928591 0.132679680663087 -0.11744616789784233 -0.09415691938567804 -0.07851733067152249 -0.039387145328066045 -0.031590916132529526 0.007553331662072845 0.031043999901817807 0.038866061672948614 0.08585066739627735 0.11712852851146541 0.12519235246082358 -0.12562795698868723 -0.10983362223286083 -0.08641845768300427 -0.05502208539063447 -0.023799729418577498 -0.015937628048707308 0.015380746887586646 0.062377713379591186 0.07805078201993404 0.1094362982014068 0.11729329231726464 -0.13289031906368817 -0.10202989599981442 -0.0628805658999246 -0.04723880417149125 -0.03946638983488139 -0.000280052484294102 0.02321853473969046 0.046709459565352836 0.07024939526462821 0.10161974674843982 0.13283659157288638 -0.11759810394134443 -0.11015735047057244 -0.07078015523811709 -0.0551275235017507 -0.016002521088341316 -0.008129239153422752 0.007543837975455823 0.038894235820458284 0.09373342430856114 0.08593191954927475 0.1254246874273199 -0.12922655981111256 -0.10246678467840266 -0.09443744664746412 -0.06306915717075838 -0.047382745158548734 -0.0003101531506939857 0.015382646624399374 0.05457089512016608 0.0781506024402413 0.10959427779305052 0.11739676451489849 -0.13272731676892427 -0.11803972237165188 -0.07875238526612942 -0.05534595765563741 -0.03169364074777717 -0.008188380024412214 0.031075113950061156 0.0624577788145842 0.0938541249558028 0.10175337453748931 0.13279581328448864 -0.11082383375051551 -0.09494498523659278 -0.08677958262812936 -0.07106583695931054 -0.0396261094503633 -0.0003486551820095624 0.0075291172175153236 0.04676674327166919 0.07037327076932295 0.08607034574875008 0.10984888033496794 -0.13230032222117377 -0.08722556413916022 -0.0791407723467261 -0.047602270660079354 -0.023906892434720432 0.015396789128985846 0.023245002600611287 0.038958443335178436 0.05466836779284898 0.09407513670848838 0.12820000774925366 -0.118723800492476 -0.10301734954128512 -0.07141564558489043 -0.06336405017809012 -0.0318475399544856 -0.016096709040011526 0.031139263088799163 0.04687809237618172 0.06261255044528365 0.10206001235658778 0.11767038736550803 -0.13225852782322156 -0.09535383183624345 -0.05561662700347856 -0.024038467402294587 -0.008255938069746274 0.0075233097236037366 0.023299446711815785 0.03907224033030371 0.07060301809864297 0.07834290553077138 0.13265123904712875 -0.11112853919022425 -0.08765287277490616 -0.07950462434468018 -0.039824939913841645 -0.016196071118302676 -0.00038056397331704127 0.03124209606813066 0.054840884606695554 0.0786725977379412 0.08635126131286489 0.11035102373552338 -0.12466345837725477 -0.11068066583595652 -0.06366912122699005 -0.04783945022718145 -0.03201537510182039 0.015431937292826613 0.03922524514741019 0.0470508138390464 0.08678891750604169 0.09449821017353704 0.13207928904075603 -0.13213095055932025 -0.09814146714880599 -0.07176618357884036 -0.04002778146873696 -0.02417029226758865 -0.008317673862914349 0.007531605532208701 0.06285978177045401 0.07092585195990331 0.10266740490665222 0.11848280247980524 -0.11822040595472756 -0.1037195606805324 -0.06397963393203918 -0.055892238452809356 -0.03217647466303943 -0.0004025549456429918 0.023378806529211624 0.05507304379108387 0.06313212031916995 0.07902916506809604 0.1322333229207763 -0.13215350854015506 -0.0879401334296544 -0.07991340077981723 -0.048071930162029784 -0.01628756542337109 0.015480232907900697 0.04724524252352459 0.05529353513647195 0.06337308808316347 0.09494967573606036 0.11094557943424306 -0.11848090822143362 -0.08017811106419448 -0.0720486924354684 -0.04020657464035514 -0.024286364015516693 -0.008368623045435829 0.03136233085456524 0.04742256205290741 0.07120905000098468 0.08711771718771384 0.118396770519481 -0.1321798151818425 -0.09657256555050316 -0.056128797435138864 -0.04826071857551896 -0.016363572024139496 0.007547205258151053 0.03937780201680737 0.05548885676800018 0.07932986609789135 0.10298511028734814 0.13216909249236664 -0.10414425521464628 -0.07228391664116096 -0.06421296417032878 -0.03231122191013839 -0.00841071050638539 -0.0004177032363713066 0.02346232659885052 0.039506597460818825 0.08745815688467479 0.09530030719874182 0.1320797231407045 -0.11833672679560882 -0.0882357574450529 -0.05632353893393905 -0.04035581237743681 0.0075613100375907065 0.015527697508500549 0.0314735617861943 0.07147307814608046 0.10423168627536018 0.1101740914577455 0.11811438884407557 -0.09636454665319534 -0.08848698119863595 -0.08037837024978846 -0.02438244357078985 -0.016426901362889185 0.02353220848224949 0.031551626030677835 0.04754786075042072 0.06358168401949071 0.11805347591428372 0.13201502100687507 -0.1320586620056891 -0.0643987670421875 -0.04841505432633998 -0.0324237086076652 -0.00043082086256920183 0.015559083193848185 0.007561664539689575 0.03958537219608575 0.07958517606381747 0.096356131150115 0.13179956082382638 -0.11746396610098879 -0.13125901583263705 -0.04047152364285655 -0.02447568492372237 -0.01648493443909591 -0.008435164928727264 0.02356890437348138 0.05561866865660937 \n"+
					"ZGET 0.007520195478364653 0.007516382222676339 0.007531684974277225 0.00755673370966309 0.007595665636855503 0.007599045747556224 0.0075945399946289235 0.007574947938528581 0.007560375563860488 0.007536478597985276 0.007549860394399244 0.007555807575510941 0.02117718158184456 0.021225757343497357 0.007588130983602996 0.02130029772057552 0.0075986491908230595 0.02129396912722665 0.007586626043467599 0.007545906262240751 0.007529757061671148 0.02114601401141767 0.02123427961547068 0.021154550098315766 0.03489362825797324 0.007575579930642284 0.03502944893906056 0.021307757602935677 0.02130456949413882 0.021253419851808564 0.021225559273089355 0.02118205829913544 0.03482636003977107 0.035172370898802666 0.03480892970504648 0.021261948905381422 0.021285735874167853 0.03501513103437553 0.02130909496476208 0.03502257359969445 0.02127690046281712 0.03493599257366287 0.03484860781055324 0.034727070122066835 0.03478005518287988 0.04837135933622024 0.03495188976359634 0.034990477989691335 0.04877123057385102 0.035035146389285766 0.03503289239849402 0.03500349378025307 0.021199657074873236 0.034890158000182345 0.048485564745070445 0.05049596808019921 0.06217111087708347 0.04854693123527923 0.048695745566825224 0.048733889872466775 0.04877406602261934 0.048767030771692525 0.034974727598203297 0.048618259165021625 0.04848611687152618 0.06213583187365188 0.06598076517186155 0.06176719017575588 0.04863797339563459 0.06244940548097827 0.04875825268550753 0.06252254456724106 0.04874950333966022 0.04867689858901061 0.048546846359382965 0.0621952921774085 0.06237493482658647 0.07574699920062608 0.07595152104452076 0.06230989558218079 0.062393326727503765 0.06248792290773069 0.076281135991653 0.0625216516965218 0.048720091742162144 0.06238146391090969 0.06229845406470678 0.07580121625950652 0.08168649928945149 0.08973243797222907 0.07607255866648133 0.07621210091336465 0.06251163101483136 0.07627556995350968 0.06250883035313677 0.06248287252925724 0.06244151635572036 0.07596755230590539 0.07745884084183383 0.08946134028900084 0.08957590954677273 0.08984029999165953 0.07615342122706754 0.07625088939028474 0.07627316954827391 0.07625589126282345 0.07622018653152249 0.07616505163185457 0.08961908518673546 0.08932012895864404 0.09760597297156608 0.10340761498979151 0.08992608553002712 0.09002182862114308 0.09004124018221149 0.09004503282217363 0.09003354357044888 0.09000553771279128 0.08988701113864173 0.07608484818062822 0.09273416830850298 0.10330003801550353 0.11715533875644595 0.10351285634973653 0.08998475670790627 0.10379917462931874 0.10381409432523005 0.10379297808405177 0.08995824631285296 0.10359935956396593 0.08978364988281447 0.10322381420977507 0.11148870061710535 0.11918266266151195 0.10362943141565575 0.10371130437941227 0.10376602415841996 0.10381219446465186 0.11755114877411692 0.10375416191478437 0.11728845669102907 0.10346736871346654 0.10852833556600068 0.12538632338925604 0.1289887818739538 0.1173198431822789 0.11750443523750533 0.11755352014925231 0.1175811880250275 0.11759007205025437 0.10369172607675958 0.1174130887871813 0.117121876850674 0.11676694003448326 0.13323234297725586 0.14380355283526022 0.1311357785993546 0.11742919811086483 0.13130414740780394 0.13136685468336048 0.11758068134317237 0.11749740690624602 0.13123344074330762 0.13112040009303744 0.12441674332138279 0.14123561883212282 0.14466513766643344 0.13098526389332973 0.13123653008096453 0.13134611009587438 0.13136818610519888 0.1313067147169504 0.14506148187217693 0.1588185417470444 0.1309527979425176 0.13079958769691138 0.14919884335977981 0.15856698225305332 0.14484254394768187 0.14505370059335382 0.14511038082228445 0.14514341798050126 0.13134942530745225 0.1588921200057952 0.14496721322808614 0.14482861896872756 0.14796336899280899 0.15720575412607965 0.15809439675562384 0.14496716319113587 0.15880737822580676 0.15892182083115014 0.14515599323724793 0.14511920006270998 0.17267114385674912 0.15870332287767555 0.144623250759706 0.14020856615110824 0.17216656684359977 0.1724555714555935 0.15870486805336195 0.15887727787902964 0.1727391048264663 0.1589454981024419 0.14514845267134838 0.172720129395983 0.17243909799101628 0.1585490393296027 0.15612723470341286 0.16507866548718483 0.17231392792937555 0.17257322956478255 0.17265116689459076 0.17275286408799184 0.15894902987012186 0.1589320977876335 0.1725765785877006 0.17178114007831502 0.19373013525282076 0.16388227448212325 0.1860901477647454 0.19999529574635722 0.18622298768504122 0.1727050557099894 0.1865404883133733 0.17274844801644895 0.1865560309781511 0.18651501844665783 0.18645278532273687 0.17983612308310684 0.17205599593176366 0.17317696558388512 0.18636081396292367 0.1864437076142988 0.1864941841988059 0.1865615432468731 0.1865716286707637 0.20040488047767982 0.20037192446036248 0.18634684079880076 0.18569482057126102 0.1880232597481101 0.18102444746366217 0.18912626234640526 0.20030670392888814 0.20034295818815018 0.21418357338989308 0.20037703778395785 0.2004013500472765 0.20030932563707068");
	
	// Create header text area for input/output position 
	taInPosH = document.createElement("textarea");
	taInPosH.style.width = parseInt(taInPar.style.width)+"px";
	taInPosH.style.height = "15px";
	taInPosH.style.float = "left";
	taInPosH.style.background = "#eee";
	tout(taInPosH, "------ Input/output position ------");
	
	// Create buttons
	btClear = document.createElement("button");
	btClear.innerHTML = "Clear";
	btClear.style.width = "75px";
	btClear.addEventListener("click", buttonClick);

	btLoad = document.createElement("button");
	btLoad.innerHTML = "Load";
	btLoad.style.width = "75px";
	btLoad.addEventListener("click", buttonClick);
		
	btRead = document.createElement("button");
	btRead.innerHTML = "Read";
	btRead.style.width = "75px";
	btRead.disabled = true;
	btRead.addEventListener("click", buttonClick);

	btStart = document.createElement("button");
	btStart.innerHTML = "Start Simulation";
	btStart.style.width = "75px";
	btStart.disabled = true;
	btStart.addEventListener("click", buttonClick);
	
	btGetPosition = document.createElement("button");
	btGetPosition.innerHTML = "Show Pos";
	btGetPosition.style.width = "75px";
	btGetPosition.addEventListener("click", buttonClick);

	btInfo = document.createElement("button");
	btInfo.innerHTML = "Info";
	btInfo.style.width = "75px";
	btInfo.addEventListener("click", buttonClick);
	
	btHelp = document.createElement("button");
	btHelp.innerHTML = "Help";
	btHelp.style.width = "75px";
	btHelp.addEventListener("click", buttonClick);	
	
	btFlow = document.createElement("button");
	btFlow.innerHTML = "Flow On";
	btFlow.style.width = "75px";
	btFlow.disabled = true;
	btFlow.addEventListener("click", buttonClick);
	
	// Create header division
	var divHead = document.createElement("div");
	divHead.style.width = parseInt(caOut.style.width) + 10
						+ parseInt(btClear.style.width)
						+ parseInt(taInPar.style.width)
						+ parseInt(taInPos.style.width)
						+ 30 + "px";
	divHead.style.height = 50 + "px";
	divHead.style.align = "center";
	
	// Create dynamic division 
	var divDyn = document.createElement("div");
	divDyn.style.width = parseInt(caOut.style.width)+25+"px";
	divDyn.style.height = parseInt(caOut.style.height)
					+"px";
	divDyn.style.float = "left"
					
	// Create dynamic division 1 -> caOut + taOutPar
	var divDyn1 = document.createElement("div");
	divDyn1.style.width = parseInt(caOut.style.width)	
					+ "px";
	divDyn1.style.height = parseInt(caOut.style.height)
					+ 10 + "px";
	divDyn1.float = "left";
					
	// Create button division
	var divBut = document.createElement("div");
	divBut.style.width = "80px";
	divBut.style.height = parseInt(caOut.style.height) + "px";
	divBut.style.float = "left";
	divBut.style.background = "#eee"

	// Create control division
	var divCont1 = document.createElement("div");
	divCont1.style.width = 270 + 10 + "px";
	divCont1.style.height = parseInt(divBut.style.height);
	divCont1.style.float = "left";

	var divCont2 = document.createElement("div");
	divCont2.style.width = 270 + 10 + "px";
	divCont2.style.height = parseInt(divBut.style.height);
	divCont2.style.float = "left";

	// Create main division
	var divMain = document.createElement("div");
	divMain.style.width = parseInt(divDyn.style.width)
						+ parseInt(divBut.style.width)
						+ parseInt(divCont1.style.width)
						+ parseInt(divCont2.style.width)
						+ "px";
	divMain.style.height = parseInt(caOut.style.height)
//						+ parseInt(taOutParH.style.height)
//						+ parseInt(taOutPar.style.height)
						"px";
	divMain.style.background = "#fff";
	divMain.style.align = "center";

	// Create label and input range
	teIn = document.createElement("text");
	teIn.innerHTML = "Flow";
	teIn.style.fontSize = "10pt";
	inIn = document.createElement("input");
	inIn.type = "range";
	inIn.style.transform = "rotate(270deg)";
	inIn.style.width = "65px";
	inIn.style.height = "100px";
	inIn.value = 0;
	inIn.addEventListener("input", changeFluidVelocity);
	
	// Set layout of visual component
	document.body.append(divHead);
		divHead.append(header0);
	document.body.append(divMain);
		divMain.append(divDyn);
			divDyn.append(divDyn1);
				divDyn1.append(caOut);
			divMain.append(divBut);
				divBut.append(btClear);
				divBut.append(btLoad);
				divBut.append(btRead);
				divBut.append(btStart);
				divBut.append(btGetPosition);
				divBut.append(btInfo);
				divBut.append(btHelp);
				divBut.append(btFlow);
				divBut.append(teIn);
				divBut.append(inIn);
		divMain.append(divCont1);
			divCont1.append(taInParH);
			divCont1.append(taInPar);
			divCont1.append(taConsH);
			divCont1.append(taCons);
		divMain.append(divCont2);
			divCont2.append(taInPosH);
			divCont2.append(taInPos);
			divCont2.append(taOutParH);
			divCont2.append(taOutPar);
}

// Change fluid up velocity
function changeFluidVelocity() {
	var val = event.target.value;
	var v = val;	
	if (v == 0) {
		rhof = 1.2;
	} else {
		rhof = rhof1;
	}
	tout(taCons, "Flow\n");
	tout(taCons, "velocity is changed to " + v + " %\n");
	tout(taCons, "fluid density is " + rhof + " kg/m3\n\n");
}

// Draw system in the box
function drawSystem(){
	var cx = caOut.getContext("2d");
	for(var i = 0; i < numg; i++) {
		var yy = r[i].y;
		var zz = r[i].z;
		var R1 = transform(yy, zz);
		var R2 = transform(yy + 0.5 * D[i], zz);
		
		cx.beginPath();
		cx.arc(R1.Y, R1.Z, (R2.Y - R1.Y), 0, 2 * Math.PI); 
		if(i%2==0) {
		//if(i<numg/2){
			cx.fillStyle = "#0E9944";		// for grains 1: green
		} else {
			cx.fillStyle = "#0000FF";
		}
		cx.closePath();
		cx.fill();
		
		cx.beginPath();
		cx.arc(R1.Y, R1.Z, (R2.Y - R1.Y), 0, 2*Math.PI);
		cx.strokeStyle = "#000";
		cx.stroke();
	}
	
	// Transform real coordinates to canvas coordinates
	function transform(yy, zz) {
		var YY = (yy - ymin) / (ymax - ymin) * (YMAX - YMIN)
			+ YMIN;
		var ZZ = (zz - zmin) / (zmax - zmin) * (ZMAX - ZMIN)
			+ ZMIN;
		return {Y: YY, Z: ZZ};
	}
}
	
// Clear all
function clearAll() {
	taInPar.value = "";
	taOutPar.value = "";
	clearCanvas();
}

function clearCanvas() {
	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);	
}

// Load parameters to taOutPar
function loadParameters() {
	var lines = "";
	lines += "# Environment\n";
	lines += "GACC 9.807\n";    // Gravitation      m/s2
	lines += "KCOL 1000\n";     // Normal constant N/m
	lines += "GCOL 100\n";      // Normal constant  N/m
	lines += "RHOF 1000\n";		// Air density 		kg/m3
	lines += "VELF 20\n";		// Fluid velocity	m/s
	lines += "ETAF 8.90E-4\n";	// Fluid visco at 25C	N.s/m2
	
	lines += "\n";
	lines += "# Simulation\n";
	lines += "TSTEP 0.001\n";   // Time step        s
	lines += "TBEG 0\n";        // Initial time     s
	lines += "TEND 10.00\n";      // Final time       s
	lines += "TDATA 0.01\n";    // Data period      s
	lines += "TPROC 1.00\n";    // Event period     ms
	lines += "TFLOW 10.00\n";	// Fluid flow time 	s
	
	lines += "\n";
	lines += "# Grains\n";
	lines += "DIAG1 0.004\n"    // Grains diameter  m
	lines += "DIAG2 0.004\n"    // Grains diameter  m
	lines += "RHOG1 500\n";    // Grains density 1 kg/m3
	lines += "RHOG2 1700\n";    // Grains density 2 kg/m3
	lines += "NUMG 250\n";      // Number of grains -
	lines += "GENG 0\n";        // Generation type  0 random
	lines += "FIXPOS 1\n"		// 1 if input position	
	
	var ta = arguments[0];
	ta.value = lines;
	ta.scrollTop = ta.scrollHeight;
}

// Read parameters
function readParameters() {
	var lines = arguments[0].value;
	
	// Get parameters information
	gacc = getValue(lines, "GACC");
	kcol = getValue(lines, "KCOL");
	gcol = getValue(lines, "GCOL");
	rhof = getValue(lines, "RHOF"); rhof1 = rhof;
	velf = getValue(lines, "VELF");
	etaf = getValue(lines, "ETAF");

	// Get simulation information
	tstep = getValue(lines, "TSTEP");
	tbeg = getValue(lines, "TBEG");
	tend = getValue(lines, "TEND");
	tdata = getValue(lines, "TDATA");
	tproc = getValue(lines, "TPROC");
	tflow = getValue(lines, "TFLOW");

	// Get grains information
	diag1 = getValue(lines, "DIAG1")*cScale;
	diag2 = getValue(lines, "DIAG2")*cScale;
	rhog1 = getValue(lines, "RHOG1");
	rhog2 = getValue(lines, "RHOG2");
	numg = getValue(lines, "NUMG");
	geng = getValue(lines, "GENG");
	fixpos = getValue(lines, "FIXPOS");
}

function initParams(){
	t = tbeg;
	
	// initial fluid is air
	//rhof = 1.2;
	
	// initial fluid is water
	rhof = rhof1;

	// Get coordinates information
	ymin = -0.5*boxw;   	//getValue(lines, "YMIN");
	zmin = 0;				//getValue(lines, "ZMIN");
	ymax = 0.5*boxw;        //getValue(lines, "YMAX");
	zmax = boxh;			//getValue(lines, "ZMAX");

	// Get box information
	// boxh = caOut.height; //getValue(lines, "BOXH");
	// boxw = caOut.width; //getValue(lines, "BOXW");
	// boxt = caOut.width; //getValue(lines, "BOXT");

	
	// Define box size, width = 2R, height = L
	R = 0.5 * boxw; // m, boxt = boxw
	L = boxh;       // m
		
	// Define 8 points for box corners
	w1 = new Vect3(R, -R, 0);
	w2 = new Vect3(R, R, 0);
	w3 = new Vect3(-R, -R, 0);
	w4 = new Vect3(-R, R, 0);
	w5 = new Vect3(R, -R, L);
	w6 = new Vect3(R, R, L);
	w7 = new Vect3(-R, -R, L);
	w8 = new Vect3(-R, R, L);
	
	// Define 4 walls using previous points
	WL = [w1, w3, w7, w5];
	WR = [w2, w6, w8, w4];
	WT = [w5, w7, w8, w6];
	WB = [w1, w2, w4, w3];
	wall = [WL, WR, WT, WB];
	Nw = wall.length;
	
	// Calculate center of each wall
	wL = vect3Average(WL);
	wR = vect3Average(WR);
	wT = vect3Average(WT);
	wB = vect3Average(WB);
	
	// Define grains properties
	r = [];
	v = [];
	m = [];
	D = [];
	if(geng == 0) {
		for(var i = 0; i < numg; i++) {
			if(i%2==0){
			//if(i<numg/2){
				D.push(diag1);
				var Rg = 0.5 * diag1;
				var Vg = (4 * Math.PI / 3) * Rg * Rg * Rg;		
				//var Vg = Math.PI * Rg * Rg * 0.008;			 // 0.008 : thick * cScale		
				m.push(rhog1 * Vg);
			} else {
				D.push(diag2);
				var Rg = 0.5 * diag2;
				var Vg = (4 * Math.PI / 3) * Rg * Rg * Rg;	
				//var Vg = Math.PI * Rg * Rg * 0.008;
				m.push(rhog2 * Vg);
			}
			v.push(new Vect3());
		}
		
		var Nperlayer = parseInt(0.75 * boxw / ((diag2+0.1*diag2)));
		var dx = boxw / Nperlayer
		var Nlayer = Math.ceil(numg / Nperlayer);

		if(fixpos == 0) {
			var k = 0;
			for(var i = 0; i < Nlayer; i++) {
				for(var j = 0; j < Nperlayer; j++) {
					var x = 0;
					var rndy = 0.1 * dx * Math.random();
					var rndz = 0.1 * dx * Math.random();
					var y = -0.5 * boxw + (j + 0.5) * dx + rndy;
					var z = (i + 0.5) * dx + rndz;
					r.push(new Vect3(x, y, z));
					k++;
					if(k >= numg) {
						break;
					}
				}
			}
			tout(taCons, "Slightly random grains position "
			+ "are generated\n\n");
		} else if(fixpos == 1) {
			// Read position
			readPosition(taInPos);
			
			for (var i=0; i < numg; i++) {
				var x = 0;
				var y = yGetPosition[i];
				var z = zGetPosition[i];
				r.push(new Vect3(x,y,z));
			}	
			tout(taCons, "Grain positions are generated from input data\n\n");
		}
	}
	
	// Initialize simulation parameters
	Ndata = Math.floor(tdata / tstep);
	idata = Ndata;
}

function simulate() {
    if (t >= tend) {
        btStart.innerHTML = "Start Simulation";
        btStart.disabled = true;
        btRead.disabled = false;
		btGetPosition.disabled = false;
        taInPar.disabled = false;
        tout(taCons, "Simulation stops, t = end\n\n");
        clearInterval(proc);
    }	
    if (taOutParON == false && t==tbeg) {
		tout(taOutPar, "Output parameters are not displayed\n");
	}
	if (idata == Ndata) {
        var digit = -Math.floor(Math.log10(tdata));
        var tt = t.toExponential(digit);
		var segCoeff = vect3CentreMass(r).toFixed(digit+2);
		if (t == tbeg){
			tout(taOutPar, "\n\n#t\tsegregation\n");
        } else if (t > tbeg) {
			tout(taOutPar, tt + "\t" + segCoeff + "\n");
		}
		clearCanvas();
        drawSystem();
        idata = 0;
    }
	
	// Stop velf if t > tflow
	if (t >= tflow){
		velf = 0;
	}	
	
    var F = [];
    for (var i = 0; i < numg; i++) {
        F.push(new Vect3());
    }
	
	// gravitational force
    for (var i = 0; i < numg; i++) {
        var Fg = new Vect3(0, 0, m[i] * -gacc);
        F[i] = Vect3.add(F[i], Fg);
    }
	
	// buoyancy force
    for (var i = 0; i < numg; i++) {
        var Rg = 0.5 * D[i];
        //var Vg = (4 * Math.PI / 3) * Rg * Rg * Rg;
        var Vg = Math.PI * Rg * Rg * 0.008;
		var Fb = new Vect3(0, 0, rhof * gacc * Vg);
        F[i] = Vect3.add(F[i], Fb);
    }
	
	// Calculate force due to viscosity
	for(var i = 0; i < numg; i++) {
		var Rg = 0.5 * D[i];
		var yR = r[i].y / (0.5 * boxw);
		var vzy = velf * 0.01 * inIn.value * (1 - yR * yR); 
		var vf = new Vect3(0, 0, vzy);
		var vrel = Vect3.sub(vf, v[i]);
		var Ff = Vect3.mul(6 * Math.PI * etaf * Rg, vrel);
		F[i] = Vect3.add(F[i], Ff);
	}
	
	
	// normal force with wall
    for (var i = 0; i < numg; i++) {
        var Fw = new Vect3();
        for (var j = 0; j < Nw; j++) {
            var wj = wall[j];
            var wc = vect3Average(wj);
            var Rg = 0.5 * D[i];			
            var nw = Vect3.cross(
				Vect3.sub(wj[1], wj[0]), 
				Vect3.sub(wj[3], wj[0])
			).unit();
            var rij = Vect3.dot(Vect3.sub(r[i], wc), nw);
            var ksi = Math.max(0, Rg - rij);
			var fw1 = Vect3.mul(kcol*ksi, nw);

			var vWall = new Vect3();
			var vij = Vect3.sub(v[i], vWall);
			var uij = vij.len() * Math.sign(ksi);
			var ksidot = uij * Math.sign(ksi);
			var fw2 = Vect3.mul(-gcol*ksidot*m[i],vij.unit()); 
            Fw = Vect3.add(Fw, Vect3.add(fw1,fw2));
			//Fw = Vect3.add(Fw,fw1);
        }
        F[i] = Vect3.add(F[i], Fw);
    }
	
	// normal force with other grain
    for (var i = 0; i < numg; i++) {
        var Fn = new Vect3();
        for (var j = 0; j < numg; j++) {
            if (j != i) {
				var rij = Vect3.sub(r[i], r[j]);
				var nij = rij.unit();
				var lij = rij.len();
				var ksi = Math.max(0, 0.5 * (D[i] + D[j]) - lij);
				var fn1 = kcol * ksi;
				var Fn1 = Vect3.mul(fn1, nij);				
				
				var meff = m[i]*m[j]/(m[i]+m[j]);
				var vij = Vect3.sub(v[i], v[j]);
				var uij = vij.len() * Math.sign(ksi);
				var ksidot = uij * Math.sign(ksi);
				var fn2 = -gcol * ksidot * meff;
				var Fn2 = Vect3.mul(fn2, vij.unit());				
				
				Fn = Vect3.add(Fn, Vect3.add(Fn1, Fn2));		

            }
        }
        F[i] = Vect3.add(F[i], Fn);
    }
	
	// // -bv
	// for (var i = 0; i < numg; i++) {
		// var b = -0.24;
		// var Fbb = Vect3.mul(b,v[i]);
		
		// F[i] = Vect3.add(Fn, Fbb);
	// }
		
    for (var i = 0; i < numg; i++) {
        var a = Vect3.div(F[i], m[i]);
        v[i] = Vect3.add(v[i], Vect3.mul(tstep, a));
        r[i] = Vect3.add(r[i], Vect3.mul(tstep, v[i]));
    }
    idata++;
    t += tstep;
}

// Get position each grain
function getPosition() {
	tout(taInPos, "// Get position at t="+t+"\n");
	tout(taInPos,"YGET ");
	for(var i=0; i<numg; i++){
		tout(taInPos, r[i].y);
		if(i<(numg-1)) {
			tout(taInPos, " ")
			}
	}
	tout(taInPos, "\n");
	
	tout(taInPos,"ZGET ");
	for(var i=0; i<numg; i++){
		tout(taInPos, r[i].z);
		if(i<(numg-1)) {
			tout(taInPos, " ")
			}
	}			
}

// Read position function
function readPosition() {
	var lines = arguments[0].value;
	yGetPosition = [];
	zGetPosition = [];
	
	for(var num=0; num<numg; num++) {
		yGetPosition[num] = getValueArray(lines, "YGET", num);
		zGetPosition[num] = getValueArray(lines, "ZGET", num);
	}
}


// Get value from a line inside parameter textarea
function getValue(lines, key) {
	var value = undefined;
	var line = lines.split("\n");
	var N = line.length;
	for(var i = 0; i < N; i++) {
		var col = line[i].split(" ");
		if(col[0] == key) {
			value = parseFloat(col[1]);
		}
	}
	return value;
}

// Get value from a line inside parameter textarea
function getValueArray(lines, key, num) {
	var value = undefined;
	var line = lines.split("\n");
	var N = line.length;
	for(var i = 0; i < N; i++) {
		var col = line[i].split(" ");
		if(col[0] == key) {
			value = parseFloat(col[num+1]);
		}
	}
	return value;
}

// Do something when buttons clicked
function buttonClick() {
	// Get target and verbose to taCons
	var target = event.target;
	var cap = target.innerHTML;
	tout(taCons, cap + "\n");
	
	// Perform according to the clicked button
	if(cap == "Load") {
		loadParameters(taInPar);
		btRead.disabled = false;
		tout(taCons, "Parameters are loaded\n\n");
	} else if(cap == "Clear") {
		clearAll();
		btRead.disabled = true;
		btStart.disabled = true;
		tout(taCons, "All are cleared except this element\n\n");
	} else if(cap == "Read") {
		readParameters(taInPar);
		tout(taCons, "\nParameters are read\n\n");
		initParams();
		clearCanvas();
		drawSystem();
		btStart.disabled = false;
		btFlow.disabled = false;
	} else if(cap == "Start Simulation") {
		target.innerHTML = "Stop Simulation";
		btRead.disabled = true;
		btGetPosition.disabled = true;
		taInPar.disabled = true;
		tout(taCons, "Simulation starts\n\n");
		proc = setInterval(simulate, tproc);
	} else if(cap == "Stop Simulation") {
		target.innerHTML = "Start Simulation";
		btRead.disabled = false;
		btGetPosition.disabled = false;
		taInPar.disabled = false;
		tout(taCons, "Simulation stops at t = " + t.toFixed(4) + "\n\n");
		clearInterval(proc);
	} else if(cap == "Show Pos") {
		taInPos.value = "";
		getPosition();
		tout(taCons, "Get position is done\n");
	} else if(cap == "Flow On") {
		target.innerHTML = "Flow Off";
		rhof = rhof1;
		tout(taCons, "fluid density is " + rhof + " kg/m3\n\n");
	} else if(cap == "Flow Off") {
		target.innerHTML = "Flow On";
		rhof = 1.2;
		tout(taCons, "fluid density is " + rhof + " kg/m3\n\n");
	}
	
	
	else if(cap == "Info") {
		tout(taCons, "oneIntrude.js -- 20190522\n"
			+ "Brazil Nut Effet on single intruder systems "
			+ "Sparisoma Viridi | "
			+ "https://github.com/dudung/butiran"
			+ "\n"
			+ "Muhammad Iqbal Rahmadhan Putra | "
			+ "miqbalrp@gmail.com"

		);
	}else if(cap == "Help"){
		alert(""
			+ "|Clear|  ->  Clear all input and output area\n"
			+ "|Load|  ->  Load default input parameters\n"
			+ "|Read|  ->  Read input parameters\n"
			+ "|Start Simulation|  ->  Start simulation\n"
			+ "|Show Pos|  ->  Show current position each grain\n"
			+ "|Info|  ->  Show program description\n"
			+ "|Help|  ->  Get help\n\n"
			+ "additional : \n"
			+ " - to set input position as grain positions change 'FIXPOS' to 1\n"
			+ " - all parameters are in SI-units"
			+ " \n\n\n"
			+ "'Dan kebahagiaan itu dapat ditemukan di sebutir pasir gurun, seperti kata Sang Alkemis. Karena sebutir pasir adalah suatu momen penciptaan, dan alam semesta telah menghabiskan waktu jutaan tahun untuk menciptakannya.'- The Alchemist, Paulo Coelho" 

		);
	}
		
}

function vect3Average() {
    var r = arguments[0];
    var N = r.length;
    var c = new Vect3;
    for (var i = 0; i < N; i++) {
        c = Vect3.add(c, r[i]);
    }
    c = Vect3.div(c, N);
    return c;
}


function vect3CentreMass() {
	var r = arguments[0];
	var N = r.length;
	
	var sumx1 = 0;
	var sumy1 = 0;
	var sumz1 = 0;
	
	for(var i = 0; i<N; i=i+2) {
	//for(var i=0; i<N/2; i=i+1) {	
		sumx1 = sumx1 + r[i].x;
		sumy1 = sumy1 + r[i].y;
		sumz1 = sumz1 + r[i].z;
	}
		
	var CoMx1 = sumx1/N;
	var CoMy1 = sumy1/N;
	var CoMz1 = sumz1/N;
	
	var sumx2 = 0;
	var sumy2 = 0;
	var sumz2 = 0;
	
	for(var i = 1; i<N; i=i+2) {
	//for(var i = N/2; i<N; i=i+1) { 
		sumx2 = sumx2 + r[i].x;
		sumy2 = sumy2 + r[i].y;
		sumz2 = sumz2 + r[i].z;
	}
		
	var CoMx2 = sumx2/N;
	var CoMy2 = sumy2/N;
	var CoMz2 = sumz2/N;
	
	var deltaCoM = Math.sqrt(Math.pow((CoMx1-CoMx2),2) + Math.pow((CoMy1-CoMy2),2) + Math.pow((CoMz1-CoMz2),2))
	
	var zmax = r[0].z;
	var zmin = r[0].z;
	var ymax = r[0].y;
	var ymin = r[0].y;
	var xmax = r[0].x;
	var xmin = r[0].x;
	
	for(var i = 1; i < N; i++) {
		if(r[i].z > zmax) {
			zmax = r[i].z;
		}
		if(r[i].z < zmin) {
			zmin = r[i].z;
		}
		if(r[i].y > ymax) {
			ymax = r[i].y;
		}
		if(r[i].y < ymin) {
			ymin = r[i].y;
		}
		if(r[i].x > xmax) {
			xmax = r[i].x;
		}
 		if(r[i].x < xmin) {
			xmin = r[i].x;
		}
	}

	var normalizedDeltaCoM = deltaCoM*100/(Math.sqrt(Math.pow((zmax-zmin),2)+Math.pow((ymax-ymin),2)+Math.pow((xmax-xmin),2)));
	return normalizedDeltaCoM;
}
// Display text in an output textarea
function tout() {
	var taOut = arguments[0];
	var msg = arguments[1];
	taOut.value += msg;
	taOut.scrollTop = taOut.scrollHeight;
}


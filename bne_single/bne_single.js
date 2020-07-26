/* 
	simulationTa.js
	Binary mixture grain with vertical vibration

	Sparisoma Viridi
	Iqbal Rahmadhan
	
	20190509
	1416	Begin build with reference to fdraglam.js 	@lab
	1537	Set element layout							@lab
	0000	Finish set element layout					@kost
	
	(work on simple program)
	
	20190515
	1452	Begin build shaker							@lab
	1913	Finish build shaker and binary mixture 
			grain 										@kost
	2011	How to make vibrator stop?					@kost
	
	20190520
	1053	Make particular case: one intruder			@kost
	
	20190522
	----	Finishing one intruder case					@kost & @lab
	
	20190523
	0500	Insert mass effectif factor on Fn			@kost	
			gcoll ~ 400
	
	20190705
			For ANN case
*/

// Define fundamental variables
var Nexp;
var kcol_min, kcol_max;
var gcol_min, gcol_max;
var numg_bed_min, numg_bed_max;
var diag_int_min, diag_int_max, diag_int_ori;
var diag_bed_min, diag_bed_max, diag_bed_ori;
var rhog_int_min, rhog_int_max;
var rhog_bed_min, rhog_bed_max;
var Amp_min, Amp_max, Amp_ori;
var freq_min, freq_max;

// Define global variables for walls
var L, R;
var w1, w2, w3, w4, w5, w6, w7, w8;
var WL, WR, WT, WB;
var wall, Nw, kw;

// Define global variables for parameters
var gacc, kcol, gcol;

// Define global variables for simulation
var tstep, tbeg, tend, tdata, tproc, proc, t, Ndata, idata, tdelay, tvibmax, tdummy;

// Define global variables for coordinates
var ymin, zmin, ymax, zmax, YMIN, ZMIN, YMAX, ZMAX;

// Define global variables for box
var boxh, boxw, boxt;

// Define global variables for grains
var diag_int, diag_bed, rhog_int, rhog_bed, intnum, numg2, geng, r, v, m, D;

// Define global variables for shaker
var avib1, yvib1, vvib1, avib2, yvib2, vvib2;
var Amp, freq, omega, xvib, vibh, h, vibOn, tvib, gamma;

// Define global variables for paramaters
var Zs, degree, nexp;

// Define global variables for visual elements
var taInPar 	// text area for input parameters
var caOut 		// output canvas 
var taOutPar	// text area for output paramaters
var taOutParH	// header for taOutParam
var taCons		// text area for console
var taOutPos	// text area for output position
var taInPos	// text area for input position

var btClear, btLoad, btRead, btStart, btStartVib, btInfo, btHelp;

var cScale = 4.000;
var taOutParON = true;

main()

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
	header0.innerHTML = "Vertical Vibration on One Intruder System";
	header0.align = "center";

	// Create output canvas & size
	caOut = document.createElement("canvas");
	caOut.width = 351;
	caOut.height = 760;
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
	taInPar.style.width = "500px";
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
	taCons.style.width = parseInt(taInPar.style.width)+"px";	
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

	btStartVib = document.createElement("button");
	btStartVib.innerHTML = "Stop Vibration";
	btStartVib.style.width = "75px";
	btStartVib.disabled = false;
	btStartVib.addEventListener("click", buttonClick);
	
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
	divCont1.style.width = parseInt(taInPar.style.width)+10+"px";
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
				divBut.append(btStartVib);
				divBut.append(btGetPosition);
				divBut.append(btInfo);
				divBut.append(btHelp);
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
		if(i==0) {
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

	var VIB1 = transform(-boxw,yvib1);
	var VVIB1 = transform(1,0.8);
	cx.beginPath();
	cx.rect(VIB1.Y, VIB1.Z,VVIB1.Y,2);
	cx.fillStyle = "#000";
	cx.fill();
	cx.closePath();
	
	var VIB2 = transform(-boxw,yvib2);
	var VVIB2 = transform(1,0.8);
	cx.beginPath();
	cx.rect(VIB2.Y, VIB2.Z,VVIB2.Y,2);
	cx.fillStyle = "#000";
	cx.fill();
	cx.closePath();	
	
	
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
	taOutPos.value = "";
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
	lines += "KCOL_MIN 1000\n";      // Normal constant  N/m
	lines += "KCOL_MAX 2000\n";      // Normal constant  N/m
	lines += "GCOL_MIN 300\n";      // Normal constant  N/m
	lines += "GCOL_MAX 400\n";      // Normal constant  N/m
	lines += "RHOF 1.2\n";		// Air density kg/m3
	lines += "MIUF 0.02\n";		// Friction damping
	
	lines += "\n";
	lines += "# Simulation\n";
	lines += "NEXP 20\n";
	lines += "TSTEP 0.001\n";   // Time step        s
	lines += "TBEG 0\n";        // Initial time     s
	lines += "TEND 11\n";       // Final time      s
	lines += "TDATA 0.01\n";    // Data period      s
	lines += "TPROC 0.01\n";    // Event period     s
	lines += "TDELAY 1.00\n";    // Event period	s
	lines += "TVIBMAX 3.00\n";    // Event period	s

	lines += "\n";
	lines += "# Vibrator\n";
	lines += "AMP_MIN 0.0065\n";		// Shaker amplitud	m
	lines += "AMP_MAX 0.0085\n";		// Shaker amplitud	m
	lines += "FREQ_MIN 10\n";			// Shaker frequency	Hz
	lines += "FREQ_MAX 50\n";			// Shaker frequency	Hz
	lines += "VIBH 0.19\n";		// Shaker height	m
	
	lines += "\n";
	lines += "# Grains\n";
	lines += "DIAG_INT_MIN 0.0120\n"    // Intruder diameter  m
	lines += "DIAG_INT_MAX 0.0150\n"    // Intruder diameter  m
	lines += "DIAG_BED_MIN 0.0040\n"    // Grains diameter  m
	lines += "DIAG_BED_MAX 0.0080\n"    // Grains diameter  m
	lines += "RHOG_INT_MIN 700\n";    	// Grains density 1 kg/m3
	lines += "RHOG_INT_MAX 900\n";    	// Grains density 1 kg/m3
	lines += "RHOG_BED_MIN 1000\n";    	// Grains density 2 kg/m3
	lines += "RHOG_BED_MAX 1200\n";    	// Grains density 2 kg/m3
	lines += "NUMG_BED_MIN 100\n";      // Number of grains -
	lines += "NUMG_BED_MAX 200\n";      // Number of grains -
	lines += "GENG 0\n";        	// Generation type  0 random
	lines += "FIXPOS 0\n"			// 1 if input position	
	lines += "NORMAL_TYPE 0\n"		// 
	
	var ta = arguments[0];
	ta.value = lines;
	ta.scrollTop = ta.scrollHeight;
}

// Read parameters
function readParameters() {
	var lines = arguments[0].value;
	
	N_exp = getValue(lines,"NEXP");
	
	// Get parameters information
	gacc = getValue(lines, "GACC");
	kcol_min = getValue(lines, "KCOL_MIN");
	kcol_max = getValue(lines, "KCOL_MAX");	
	gcol_min = getValue(lines, "GCOL_MIN");
	gcol_max = getValue(lines, "GCOL_MAX");
	rhof = getValue(lines, "RHOF");
	miuf = getValue(lines, "MIUF");

	// Get simulation information
	tstep = getValue(lines, "TSTEP");
	tbeg = getValue(lines, "TBEG");
	tend = getValue(lines, "TEND");
	tdata = getValue(lines, "TDATA");
	tproc = getValue(lines, "TPROC")*100;
	tdelay = getValue(lines, "TDELAY");
	tend = tend + tdelay;
	tvibmax = getValue(lines, "TVIBMAX");	
	
	// Get shaker information
	Amp_min = getValue(lines, "AMP_MIN");
	Amp_max = getValue(lines, "AMP_MAX");
	freq_min = getValue(lines, "FREQ_MIN");
	freq_max = getValue(lines, "FREQ_MAX");
	h = getValue(lines, "VIBH") * cScale;

	// Get grains information
	diag_int_min = getValue(lines, "DIAG_INT_MIN");
	diag_int_max = getValue(lines, "DIAG_INT_MAX");
	diag_bed_min = getValue(lines, "DIAG_BED_MIN");
	diag_bed_max = getValue(lines, "DIAG_BED_MAX");
	rhog_int_min = getValue(lines, "RHOG_INT_MIN");
	rhog_int_max = getValue(lines, "RHOG_INT_MAX");	
	rhog_bed_min = getValue(lines, "RHOG_BED_MIN");
	rhog_bed_max = getValue(lines, "RHOG_BED_MAX");
	numg_bed_min = getValue(lines, "NUMG_BED_MIN");
	numg_bed_max = getValue(lines, "NUMG_BED_MAX");	
	geng = getValue(lines, "GENG");
	fixpos = getValue(lines, "FIXPOS");
	normalType = getValue(lines, "NORMAL_TYPE");
}

function initParams(){
	t = tbeg;
	tvib = 0.000;
	tdummy = 0.000;
	vibOn = false;

	// Generate random parameters
	kcol = Math.floor(Math.random()*(kcol_max-kcol_min)+kcol_min);
	gcol = Math.floor(Math.random()*(gcol_max-gcol_min)+gcol_min);
	Amp_ori = (Math.random()*(Amp_max-Amp_min)+Amp_min);
	Amp = Amp_ori * cScale;	
	freq_ori = (Math.random()*(freq_max-freq_min)+freq_min);	
	freq = freq_ori;
	diag_int_ori = (Math.random()*(diag_int_max-diag_int_min)+diag_int_min);
	diag_int = diag_int_ori * cScale;
	diag_bed_ori = (Math.random()*(diag_bed_max-diag_bed_min)+diag_bed_min);
	diag_bed = diag_bed_ori * cScale;
	rhog_int = (Math.random()*(rhog_int_max-rhog_int_min)+rhog_int_min);	
	rhog_bed = (Math.random()*(rhog_bed_max-rhog_bed_min)+rhog_bed_min);
	numg_bed = Math.floor(Math.random()*(numg_bed_max-numg_bed_min)+numg_bed_min);
	numg	 = numg_bed + 1;
	
	// Get coordinates information
	ymin = -0.5*boxw;   	//getValue(lines, "YMIN");
	zmin = -Amp;						//getValue(lines, "ZMIN");
	ymax = 0.5*boxw;        	//getValue(lines, "YMAX");
	zmax = boxh;			//getValue(lines, "ZMAX");
	
	// Define box size, width = 2R, height = L
	R = 0.5 * boxw; // m, boxt = boxw
	L = boxh;       // m
	
	// Set initial condition of shaker
	omega = 2*Math.PI*freq;

	// Calculate normalized acceleration 
	gamma = (Amp / cScale) * omega * omega / gacc;

	yvib1 = Amp*Math.sin(omega*t+Math.PI);
	vvib1 = Amp*omega*Math.cos(omega*t+Math.PI);
	
	yvib2 = yvib1+h;
	vvib2 = vvib1;	
	
	// Define 8 points for box corners
	w1 = new Vect3(R, -R, yvib1);
	w2 = new Vect3(R, R, yvib1);
	w3 = new Vect3(-R, -R, yvib1);
	w4 = new Vect3(-R, R, yvib1);
	w5 = new Vect3(R, -R, yvib2);
	w6 = new Vect3(R, R, yvib2);
	w7 = new Vect3(-R, -R, yvib2);
	w8 = new Vect3(-R, R, yvib2);
	
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
			if(i==0){
				D.push(diag_int);
				var Rg = 0.5 * diag_int;
				//var Vg = (4 * Math.PI / 3) * Rg * Rg * Rg;		
				var Vg = Math.PI * Rg * Rg * 0.008;			 // 0.008 : thick * cScale		
				m.push(rhog_int * Vg);
			} else {
				D.push(diag_bed);
				var Rg = 0.5 * diag_bed;
				//var Vg = (4 * Math.PI / 3) * Rg * Rg * Rg;	
				var Vg = Math.PI * Rg * Rg * 0.008;
				m.push(rhog_bed * Vg);
			}
			v.push(new Vect3());
		}
		
		var Nperlayer = parseInt(0.75 * boxw / ((diag_bed)));
		var dx = boxw / Nperlayer
		var Nlayer = Math.ceil(numg / Nperlayer);

		if(fixpos == 0) {
			var k = 0;
			for(var i = 0; i < Nlayer; i++) {
				for(var j = 0; j < Nperlayer; j++) {
					if (k==0) {		// intruder
						r.push(new Vect3(0,0,0.5*D[0]));
					}
					var x = 0;
					var rndy = 0.1 * dx * Math.random();
					var rndz = 0.1 * dx * Math.random();
					var y = -0.5 * boxw + (j + 0.5) * dx + rndy;
					var z = (i+1) * dx + rndz + D[0];
					r.push(new Vect3(x, y, z));
					k++;
					if(k >= numg) {
						break;
					}
				}
			}
			//tout(taCons, "Slightly random grains position "
			//+ "are generated\n\n");
		} else if(fixpos == 1) {
			// Read position
			readPosition(taInPos);
			
			for (var i=0; i < numg; i++) {
				var x = 0;
				var y = yGetPosition[i];
				var z = zGetPosition[i];
				r.push(new Vect3(x,y,z));
			}	
			//tout(taCons, "Grain positions are generated from input data\n\n");
		}
	}
	
	// Initialize simulation parameters
	Ndata = Math.floor(tdata / tstep);
	idata = Ndata;
}

function loopSimulate() {
	initParams();
	clearCanvas();
	drawSystem();
	tout(taCons, "\n#" + nexp
				+ "\t" + kcol
				+ "\t" + gcol
				+ "\t" + numg_bed
				+ "\t" + diag_int_ori.toFixed(4)
				+ "\t" + diag_bed_ori.toFixed(4)
				+ "\t " + rhog_int.toFixed(2)
				+ "\t " + rhog_bed.toFixed(2)
				+ "\t " + freq.toFixed(2)
				+ "\t " + Amp_ori.toFixed(2)
				+ "\t " + gamma.toFixed(2)		
				);
	proc = setInterval(simulate, tproc);
	nexp = nexp + 1;
}

function simulate() {
    if (t >= tend) {
        btStart.innerHTML = "Start Simulation";
        btStart.disabled = true;
        btRead.disabled = false;
        taInPar.disabled = false;
        //tout(taCons, "Simulation stops, t = end\n\n");
        clearInterval(proc);
		if (nexp < N_exp) {
			loopSimulate();			
		}
    }
	
	if (t > tdelay) {
		if (t.toExponential(3) == tdelay.toExponential(3)) {
			//var z_intruder = ((r[0].z-yvib1)/diag_bed).toExponential(2);
			var z_intruder = getRise().toFixed(4);
			
			tout(taCons, "\t" 
				+ z_intruder + "\t" 
				+ getDegree() + "\t" 
				+ centerofmass(r,m,gacc).toFixed(4)
				);
		}
		vibOn = true;
	}
	
	if (t > (tend - tdelay)) {
		vibOn = false;
		if (t.toExponential(5) == tend.toExponential(5)){
			//var z_intruder = ((r[0].z-yvib1)/diag_bed).toExponential(2);
			var z_intruder = getRise().toFixed(4);

			tout(taCons, "\t" 
				+ z_intruder + "\t" 
				+ getDegree() + "\t" 
				+ centerofmass(r,m,gacc).toFixed(4)
				+ classification(z_intruder)
				);
		}
	}
		
    if (taOutParON == false && t==tbeg) {
		tout(taOutPar, "Output parameters are not displayed\n");
	}
	
	if (idata == Ndata) {
        var digit = -Math.floor(Math.log10(tdata));
        var tt = t.toExponential(digit);
		if (taOutParON == true) { // && vibOn == true) {
			if (t == 0) {
				tout(taOutPar, "-- Experiment #" + nexp +" begin \n");
			}
			//var z_intruder = ((r[0].z-yvib1)/diag_bed).toExponential(2);
			//var z_intruder = getRise().toFixed(4);

			tout(taOutPar, t.toFixed(2) + " s / " + tend.toFixed(2) + " s\n");
			if (t >= tend) {
				tout(taOutPar, "\n");
			}
		}
        clearCanvas();
        drawSystem();
        idata = 0;
    }
		
	if(vibOn == true){
		yvib1 = Amp*Math.sin(omega*tvib+Math.PI);
		vvib1 = Amp*omega*Math.cos(omega*tvib+Math.PI);
		vvib2 = vvib1;
		yvib2 = h + yvib1;	
		tvib = tvib + tstep;
	} else {
		vvib1 = 0;
		vvib2 = 0;
	}

	var ww1,ww2,ww3,ww4,ww5,ww6,ww7,ww8, WWL,WWR, WWT, WWB;
	// redefine wall top and bottom
	ww1 = new Vect3(R, -R, yvib1);
    ww2 = new Vect3(R, R, yvib1);
    ww3 = new Vect3(-R, -R, yvib1);
    ww4 = new Vect3(-R, R, yvib1);
    ww5 = new Vect3(R, -R, yvib2);
    ww6 = new Vect3(R, R, yvib2);
    ww7 = new Vect3(-R, -R, yvib2);
    ww8 = new Vect3(-R, R, yvib2);
	
    WWL = [ww1, ww3, ww7, ww5];
    WWR = [ww2, ww6, ww8, ww4];
    WWT = [ww5, ww7, ww8, ww6];
    WWB = [ww1, ww2, ww4, ww3];
    wall = [WWL, WWR, WWT, WWB];
	
    var F = [];
    for (var i = 0; i < numg; i++) {
        F.push(new Vect3());
    }
	
	// gravitational force
    for (var i = 0; i < numg; i++) {
        var Fg = new Vect3(0, 0, m[i] * -gacc);
        F[i] = Vect3.add(F[i], Fg);
    }
	
	// calculate damping background
	for (var i = 0; i < numg; i++) {
		var Fdrag = Vect3.mul(-miuf,v[i]);
        F[i] = Vect3.add(F[i], Fdrag);
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
				Vect3.sub(wj[2], wj[0])
			).unit();
            var rij = Vect3.dot(Vect3.sub(r[i], wc), nw);
            var ksi = Math.max(0, Rg - rij);
			var fw1 = Vect3.mul(kcol*ksi, nw);
			
			if (j==2 || j==3) {
				var vWall = new Vect3(0,0,vvib1);
			} else {
				var vWall = new Vect3();
			}
			var vij = Vect3.sub(v[i], vWall);
			var uij = vij.len() * Math.sign(ksi);
			var ksidot = uij * Math.sign(ksi);
			var fw2 = Vect3.mul(-gcol*ksidot*m[i],vij.unit()); 
			
			var hertzian = Math.sqrt((Rg - rij)/(Rg));
            Fw = Vect3.add(Fw, Vect3.add(fw1,fw2));
			
        }
        F[i] = Vect3.add(F[i], Fw);
    }
	
	if(normalType==0){
		// normal force with other grain (Silbert --> with meff)
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
	}

	else if(normalType==1){
		// normal force with other grain (Silbert Hertzian --> with meff)
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
					var hertzian = Math.sqrt(ksi/(0.5*(D[i]+D[j])));
					Fn = Vect3.add(Fn, Vect3.mul(hertzian,Vect3.add(Fn1, Fn2)));		

				}
			}
			F[i] = Vect3.add(F[i], Fn);
		}		

	}
	else if(normalType==2){
		// normal force with other grain (Schafer --> without meff)
		for (var i = 0; i < numg; i++) {
			var Fn = new Vect3();
			for (var j = 0; j < numg; j++) {
				if (j != i) {
					var rij = Vect3.sub(r[i], r[j]);
					var nij = rij.unit();
					var lij = rij.len();
					var ksi = Math.max(0, 0.5 * (D[i] + D[j]) - lij);
					var fn1 = kcol/1 * ksi;
					var Fn1 = Vect3.mul(fn1, nij);				

					var vij = Vect3.sub(v[i], v[j]);
					var uij = vij.len() * Math.sign(ksi);
					var ksidot = uij * Math.sign(ksi);
					var gcoln = gcol/1000;
					var fn2 = -gcoln * ksidot;
					var Fn2 = Vect3.mul(fn2, vij.unit());				
					
					Fn = Vect3.add(Fn, Vect3.add(Fn1, Fn2));		

				}
			}
			F[i] = Vect3.add(F[i], Fn);
		}
	}


			
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
			tout(taInPos, " ");
			}
	}
	tout(taInPos, "\n");
	
	tout(taInPos,"ZGET ");
	for(var i=0; i<numg; i++){
		tout(taInPos, r[i].z);
		if(i<(numg-1)) {
			tout(taInPos, " ");
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
	//tout(taCons, cap + "\n");
	
	// Perform according to the clicked button
	if(cap == "Load") {
		loadParameters(taInPar);
		btRead.disabled = false;
		tout(taCons, "\n#exp"		
					+ "\tkn"
					+ "\tgn"
					+ "\tn_bed"
					+ "\td_int"
					+ "\td_bed"
					+ "\trho_int"
					+ "\trho_bed"
					+ "\tfreq"
					+ "\tamp"
					+ "\tgamma"
					+ "\tzint_i"
					+ "\tdeg_i"
					+ "\tE_pot"
					+ "\tzint_f"
					+ "\tdeg_f"
					+ "\tE_pot"
					+ "\tClass"
					+ "\n");
		nexp = 0;
	} else if(cap == "Clear") {
		clearAll();
		btRead.disabled = true;
		btStart.disabled = true;
		tout(taCons, "All are cleared except this element\n\n");
	} else if(cap == "Read") {
		readParameters(taInPar);
		btStart.disabled = false;
		tout(taOutPar, "READ\n");
		initParams();
		clearCanvas();
		drawSystem();
		tout(taCons, "\n#" + nexp
					+ "\t" + kcol
					+ "\t" + gcol
					+ "\t" + numg_bed
					+ "\t" + diag_int_ori.toFixed(4)
					+ "\t" + diag_bed_ori.toFixed(4)
					+ "\t " + rhog_int.toFixed(2)
					+ "\t " + rhog_bed.toFixed(2)
					+ "\t " + freq.toFixed(2)
					+ "\t " + Amp_ori.toFixed(6)
					+ "\t " + gamma.toFixed(2)		
					);
	} else if(cap == "Start Simulation") {
		target.innerHTML = "Stop Simulation";
		btRead.disabled = true;
		btGetPosition.disabled = true;
		btStartVib.disabled = false;
		taInPar.disabled = true;

		proc = setInterval(simulate, tproc);
		nexp = nexp + 1;
	
	} else if(cap == "Stop Simulation") {
		target.innerHTML = "Start Simulation";
		btRead.disabled = false;
		btGetPosition.disabled = false;
		taInPar.disabled = false;
		btStartVib.innerHTML = "Start Vibration";
		btStartVib.disabled = false;
		//tout(taCons, "Simulation stops at t = " + t + "\n\n");
		clearInterval(proc);
	} else if(cap == "Stop Vibration") {
		target.innerHTML = "Start Vibration";
		vibOn = false;
		//tout(taCons, "Vibration off\n\n");
	} else if(cap == "Start Vibration") {
		target.innerHTML = "Stop Vibration";
		vibOn = true;
		//tout(taCons, "Vibration on\n\n");
	}
	else if(cap == "Show Pos") {
		taInPos.value = "";
		getPosition();
		//tout(taCons, "Get position is done\n");
	}else if(cap == "Info") {
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
			+ "|Start Vibration|  ->  Start vibration on shaker as sine wave\n"
			+ "|Show Pos|  ->  Show current position each grain\n"
			+ "|Info|  ->  Show program description\n"
			+ "|Help|  ->  Get help\n\n"
			+ "additional : \n"
			+ " - to set intruder number change 'INTNUM' parameters\n"
			+ " - to set input position as grain positions change 'FIXPOS' to 1\n"
			+ " - all parameters are in SI-units"
			+ " \n\n\n"
			+ "'Dan kebahagiaan itu dapat ditemukan di sebutir pasir gurun, seperti kata Sang Alkemis. Karena sebutir pasir adalah suatu momen penciptaan, dan alam semesta telah menghabiskan waktu jutaan tahun untuk menciptakannya.'- The Alchemist, Paulo Coelho" 

		);
	}		
}

function getDegree() {
	var Degree = 0;
	for (var i=1; i<numg-1; i++) {
		for (var j=i+1; j<numg; j++) {
			var deuclid = Math.sqrt(
							(r[i].y-r[j].y)*(r[i].y-r[j].y)
							+(r[i].z-r[j].z)*(r[i].z-r[j].z));
			if (deuclid < (0.5*(D[i]+D[j]))) {
				Degree = Degree + 1;
			}
		}
	}
	return Degree;
}



function getRise() {
	var zmax = r[1].z;
	var zmin = r[1].z;
	for (var i = 2; i < numg; i++) {
		if (zmax < r[i].z) {
			zmax = r[i].z;
		}
		if (zmin > r[i].z) {
			zmin = r[i].z;
		}
	}
	var z_int = r[0].z - zmin;
	var h_bed = zmax - zmin;
	var z_rise = z_int/h_bed;
	
	return z_rise;
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

function centerofmass() {
	var r = arguments[0];
	var m = arguments[1];
	var gacc = arguments[2];
	var N = r.length;
	
	var sumx = 0;
	var sumy = 0;
	var sumz = 0;
	
	for(var i = 1; i<N; i=i+1) {
		sumx = sumx + r[i].x;
		sumy = sumy + r[i].y;
		sumz = sumz + r[i].z;
	}
		
	var CoMx = sumx/N;
	var CoMy = sumy/N;
	var CoMz = sumz/N;
	
	var Epot = m[i]*gacc*CoMz; 
	return CoMz;
}

function classification() {
	var z_intruder = arguments[0];
	if(z_intruder >= 0.75) {
		return "\tA"} else if (z_intruder >= 0.5 && z_intruder <0.75) {
		return "\tB"} else if (z_intruder >= 0.25 && z_intruder <0.5) {
		return "\tC"} else if (z_intruder < 0.25) {
		return "\tD"};
}

// Display text in an output textarea
function tout() {
	var taOut = arguments[0];
	var msg = arguments[1];
	taOut.value += msg;
	taOut.scrollTop = taOut.scrollHeight;
}
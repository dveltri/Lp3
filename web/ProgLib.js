var ColorTable=[{
Nombre:"Off"			,Valor:"0"},{
Nombre:"Red"			,Valor:"1"},{
Nombre:"Yellow"			,Valor:"2"},{
Nombre:"Green"			,Valor:"4"},{
Nombre:"Red+Yellow"		,Valor:"3"},{
Nombre:"Green+Yellow"		,Valor:"6"},{
Nombre:"+ Flashing 1hz Red"		,Valor:"17"},{
Nombre:"+ Flashing 1hz Yellow"	,Valor:"18"},{
Nombre:"+ Flashing 1hz Green"	,Valor:"20"},{
Nombre:"+ Flashing 1hz Red+Yellow"	,Valor:"19"},{
Nombre:"+ Flashing 1hz Green+Yellow"	,Valor:"22"},{
Nombre:"+ Flashing 2hz Red"		,Valor:"33"},{
Nombre:"+ Flashing 2hz Yellow"	,Valor:"34"},{
Nombre:"+ Flashing 2hz Green"	,Valor:"36"},{
Nombre:"+ Flashing 2hz Red+Yellow"	,Valor:"35"},{
Nombre:"+ Flashing 2hz Green+Yellow"	,Valor:"38"},{
Nombre:"- Flashing 1hz Red"		,Valor:"81"},{
Nombre:"- Flashing 1hz Yellow"	,Valor:"82"},{
Nombre:"- Flashing 1hz Green"	,Valor:"84"},{
Nombre:"- Flashing 1hz Red+Yellow"	,Valor:"83"},{
Nombre:"- Flashing 1hz Green+Yellow"	,Valor:"86"},{
Nombre:"- Flashing 2hz Red"		,Valor:"97"},{
Nombre:"- Flashing 2hz Yellow"	,Valor:"98"},{
Nombre:"- Flashing 2hz Green"	,Valor:"100"},{
Nombre:"- Flashing 2hz Red+Yellow"	,Valor:"99"},{
Nombre:"- Flashing 2hz Green+Yellow"	,Valor:"102"},{
Nombre:"Error Code"		,Valor:"7"}];
var RGBcolor=["rgb(0,0,0)","rgb(192,0,0)","rgb(192,192,0)","rgb(0,0,0)","rgb(0,192,0)"];
var CIntReg=15;
var IntReg=[{
Type:"Int",Nombre:"THIS",Valor:null},{
Type:"Int",Nombre:"HEAP",Valor:null},{
Type:"Int",Nombre:"CPLCS",Valor:null},{
Type:"Int",Nombre:"FPHASES",Valor:null},{
Type:"Int",Nombre:"RPHASES",Valor:null},{
Type:"Int",Nombre:"VPHASES",Valor:null},{
Type:"Int",Nombre:"GPHASES",Valor:null},{
Type:"Int",Nombre:"CLOOPS",Valor:null},{
Type:"Int",Nombre:"VINPUTS",Valor:null},{
Type:"Int",Nombre:"CINPUTS",Valor:null},{
Type:"Int",Nombre:"COUTPUTS",Valor:null},{
Type:"Int",Nombre:"RUN",Valor:null},{
Type:"Int",Nombre:"RTC",Valor:null},{
Type:"Int",Nombre:"VOLT",Valor:null},{
Type:"Int",Nombre:"Temperature",Valor:null},{
Type:"Int",Nombre:"TOLCD",Valor:null},{
Type:"Int",Nombre:"KEY",Valor:null},{
Type:"Int",Nombre:"OPTUI",Valor:null},{
Type:"Bit",Nombre:"debug.opct",Valor:null},{
Type:"Bit",Nombre:"debug.hw",Valor:null},{
Type:"Bit",Nombre:"debug.can",Valor:null},{
Type:"Byt",Nombre:"debug.rtc",Valor:null},{
Type:"Bit",Nombre:"debug.script",Valor:null},{
Type:"Bit",Nombre:"debug.plc",Valor:null},{
Type:"Bit",Nombre:"debug.http",Valor:null},{
Type:"Bit",Nombre:"debug.error",Valor:null},{
Type:"Bit",Nombre:"debug.gps",Valor:null}];

var PlanGen={
PLNTYP:0,
PHC:1,
SEC:"",
SYCPLC:7,
SYCPLCTOU:60000,
CHGSTSSTP:[0,0,0,0,0,0],
LCLCHGPLN:0,
//-------------------
LCLSYCTCI:120,
LCLSYCTOF:0,
LCLSYCSEQSTP:[1,2,0],
LCLSYCSTSSTP:[1,1,3],
LCLSYCTSTSTP:[30,60,90],
LCLSYCDEMSTP:[4,0,0],
LCLSYCDEMSTS:[2,0,0],
LCLSYCCLRDEM:[0,4,0],
DEMPRI:[0,0],
//-------------------
LCLASYSEQSTP:[2,2,0],
LCLASYSTSSTP:[1,2,3],
LCLASYTNOSTP:[30,7,30],
LCLASYTMASTP:[60,20,60],
LCLASYTEXSTP:[5,5,5],
LCLASYTMISTP:[10,10,10],
LCLASYDEXSTP:[0,0,0],
LCLASYDEMSTP:[4,0,0],
LCLASYSTPDEM:[1,0,0],
LCLASYCLRDEM:[0,4,0],
//-------------------
OTUSEQSTS:[3,3,1],	//EOTU
OTUDEMSTS:[4],		//UxD
OTUSTSDEM:[2],		//UDG
OTUDEMCLR:[0,4,0],	//UCD
//-------------------
MACSEQSTP:[1,2,0],	//SIMC
MACSTSSTP:[1,2,3],	//MCSS
}

function ChkJmp(sts1,sts2)
{
	if(GlobalParms.MODEL.indexOf("RT")!=-1)
	{
		for(var i=0;i<OTU.CftPLCs[PlcIdx].length;i++)
		{
			if(parseInt(OTU.CftPLCs[PlcIdx][i][0])==sts1)
				if(parseInt(OTU.CftPLCs[PlcIdx][i][1])==sts2)
					return false;
		}
	}
	return true;
}

function ModInVal(id,valor,range)
{
	var temp=0;
	temp=parseInt(document.getElementById(id).innerHTML);
	if(range[0]<=(temp+valor))
		if(range[1]>=(temp+valor))
			temp+=valor;
	temp-=(temp%Math.abs(valor));
	document.getElementById(id).innerHTML=temp;
}

function MkLine(ccode,color,Y,X,X3,Start,End)
{
	var out="";
	if (X3<End)
	{
		if (ccode&0x30)
			return "<path stroke-dasharray=\"5,5\" d=\"M"+X+" "+Y+" "+X3+" "+Y+"\" stroke="+color+" fill=\"none\" stroke-width=\"6\" />";
		else
			return "<line id=\"svg_13\" y2=\""+Y+"\" x2=\""+X3+"\" y1=\""+Y+"\" x1=\""+X+"\" stroke="+color+" fill=\"none\" stroke-width=\"8\"/>";
	}
	else
	{
		if (ccode&0x30)
			out="<path stroke-dasharray=\"5,5\" d=\"M"+X+" "+Y+" "+End+" "+Y+"\" stroke="+color+" fill=\"none\" stroke-width=\"6\" />";
		else
			out="<line id=\"svg_13\" y2=\""+Y+"\" x2=\""+End+"\" y1=\""+Y+"\" x1=\""+X+"\" stroke="+color+" fill=\"none\" stroke-width=\"8\"/>";
		//------------------------------------------
		if (ccode&0x30)
			out+="<path stroke-dasharray=\"5,5\" d=\"M"+Start+" "+Y+" "+(X3%End)+" "+Y+"\" stroke="+color+" fill=\"none\" stroke-width=\"6\" />";
		else
			out+="<line id=\"svg_13\" y2=\""+Y+"\" x2=\""+(X3%End)+"\" y1=\""+Y+"\" x1=\""+Start+"\" stroke="+color+" fill=\"none\" stroke-width=\"8\"/>";
	}
	return out;
}

/*function DrawPlnSynL(Plan,Text)
{
	var out=""
	var fullscaleX = document.body.clientWidth;
	fullscaleX-=((fullscaleX/100)*15);
	var fullscaleY = document.body.clientHeight;
	var phases=PLCs[PlcIdx].Phases.length;
	var xstp = fullscaleX/240; //Plan.LCLASYSEQSTP.length;
	xstp=Math.round(xstp);
	var yspt = 14;//(fullscaleY/3)/phases;
	yspt=Math.round(yspt);
	var sts=0;
	var sts1=0;
	var color=0;
	var ccode=0;
	var Cy=(50+(phases*10));
	var Cx=Cy;
	var G=0;
	var G0=0;
	var G1=0;
	var G2=0;
	var G3=0;
	var TC=parseInt(Plan.LCLSYCTCI);
	//------------------------------------------------
	var svg="";
	var stp=0;
	out+="<svg height=\""+(Cy*2)+"\" width=\""+(Cx*2)+"\" xmlns=\"http://www.w3.org/2000/svg\">";
	out+="<g>";
	G=Math.round(360/TC);
	//stp=parseInt(Plan.LCLSYCSEQSTP[Plan.LCLSYCSEQSTP.length-1]);
	
	G3=parseInt(Plan.LCLSYCTSTSTP[Plan.LCLSYCSEQSTP.length-1]);
	if(!G3)G3=TC;
	G3=G*G3
	sts=parseInt(Plan.LCLSYCSTSSTP[Plan.LCLSYCSEQSTP.length-1])-1;
	G3%=360;
	var lock=0;
	do
	{
		sts1=sts;
		sts=parseInt(Plan.LCLSYCSTSSTP[stp])-1;
		G0=G3;
		G2=GetEvT(PLCs[PlcIdx],sts1,sts);
		G3+=G*G2;
		color="#404040";
		if(G0!=G3)
			svg+=GenArc(Cx,Cy,(40+(10*phases)),G0,G3,color);
		G0=G3;
		G3=parseInt(Plan.LCLSYCTSTSTP[stp]);
		if(!G3)G3=TC;
		G3=G*G3;
		for(var phase=0;phase<phases;phase++)
		{
			if(sts!=254)
				ccode=PLCs[PlcIdx].Sts[sts].Colors[phase];
			else
				ccode=PHASEs[PLCs[PlcIdx].Phases[phase]].FState;
			color="#404040";
			if ((ccode&0x07)==0x07)
				ccode=0x12;
			if (ccode&1)color="#F00000";
			if (ccode&2)color="#C0C000";
			if (ccode&4)color="#00A000";
			if (ccode&0x30)
				svg+=GenArc(Cx,Cy,(40+(10*(phases-phase))),G0,G3,color);
			else
				svg+=GenArc(Cx,Cy,(40+(10*(phases-phase))),G0,G3,color);
			svg+="<circle cx=\""+Cx+"\" cy=\""+Cy+"\" r=\""+(40+(10*(phases-phase)))+"\" style=\"stroke:rgb(255,255,255);stroke-width:1\" fill=\"none\" />";
		}
		stp=parseInt(Plan.LCLSYCSEQSTP[stp]);
		lock++;
	}
	while(stp!=0 && lock<=Plan.LCLSYCSEQSTP.length);
	svg+="<circle cx=\""+Cx+"\" cy=\""+Cx+"\" r=\"40\" stroke=\"FFFFFF\" stroke-width=\"3\" fill=\"#FFFFFF\" />";
	out+="<text fill=\"#000000\" x=\"2\" y=\"13\" stroke-width=\"0\" font-size=\"14\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">["+Text+"]</text>";		
	out+=svg;
	out+="<line x1=\""+Cx+"\" y1=\""+Math.round(Cy/2)+"\" x2=\""+Cx+"\" y2=\""+Math.round(Cy+(Cy/2))+"\" style=\"stroke:rgb(0,0,0);stroke-width:1\" />";
	out+="<line x1=\""+Math.round(Cy/2)+"\" y1=\""+Cy+"\" x2=\""+Math.round(Cx+(Cx/2))+"\" y2=\""+Cy+"\" style=\"stroke:rgb(0,0,0);stroke-width:1\" />";
	out+="</g>";
	out+="</svg>";
	return out;
}// */

function GenArc(x,y,r,gs,ge,color)
{
	var out="";
	gs=450-gs;
	ge=450-ge;
	if(gs<ge){t=gs;gs=ge;ge=t;}
	var scx=0;
	var scy=0;
	var ecx=0;
	var ecy=0;
	while((gs-ge)>180)
	{
		scx=cosDeg(gs)*r;
		scx=Math.round(scx);
		scy=sinDeg(gs)*r;
		scy=Math.round(scy);
		ecx=cosDeg(gs-180)*r;
		ecx=Math.round(ecx);
		ecy=sinDeg(gs-180)*r;
		ecy=Math.round(ecy);
		out+="<path d=\"M"+x+" "+y+" L"+(scx+x)+" "+(y-scy)+" A"+r+" "+r+" 0 0 1 "+(ecx+x)+" "+(y-ecy)+" L"+x+" "+y+" z\" fill=\""+color+"\" stroke=\"color\" stroke-width=\"1\" />";
		gs-=180;
	}
	scx=cosDeg(gs)*r;
	scx=Math.round(scx);
	scy=sinDeg(gs)*r;
	scy=Math.round(scy);
	ecx=cosDeg(ge)*r;
	ecx=Math.round(ecx);
	ecy=sinDeg(ge)*r;
	ecy=Math.round(ecy);
	out+="<path d=\"M"+x+" "+y+" L"+(scx+x)+" "+(y-scy)+" A"+r+" "+r+" 0 0 1 "+(ecx+x)+" "+(y-ecy)+" L"+x+" "+y+" z\" fill=\""+color+"\" stroke=\"color\" stroke-width=\"1\" />";
	return out;
}

function sinDeg(num)
{
	num=Math.sin((num/180)*Math.PI);
	return Math.round(num*1000)/1000;
}

function cosDeg(num)
{
	num=Math.cos((num/180)*Math.PI);
	return Math.round(num*1000)/1000;
}

function chgColor(plc,nsts,ColIdx,posibles)
{
	var temp=posibles.indexOf(PLCs[plc].Sts[nsts].Colors[ColIdx]);
	temp++;
	temp%=posibles.length;
	PLCs[plc].Sts[nsts].Colors[ColIdx]=posibles[temp];
	ReDraw(-1);
}

function ChgColSts(nsts,j)
{
	if(true==ChkCFTSts(nsts,j))
	{
		if(GlobalParms.MODEL.indexOf("RT")!=-1)
		{
			MSKtemp=MSKC_ORV.slice();
		}
		else
		{
			MSKtemp=MSKC_ORVvar.slice();
		}
	}
	else
	{
		MSKtemp=MSKC_OR.slice();
	}
	PLCs[PlcIdx].Sts[nsts].Colors[j]=chgColor2(PLCs[PlcIdx].Sts[nsts].Colors[j],MSKtemp);
	ReDraw(conf_sts);
}

function ChkCFTSts(nsts,ncolor)
{
	var color=4;
	var PhN=0;
	PhN=PLCs[PlcIdx].Phases[ncolor]
	if(!(color&0x30) && color&0x06 && PHASEs[PhN].Sec.length)
	{
		for (var i = 0; i<PHASEs[PhN].Sec.length; i++)
		{
			xcolorn=(PHASEs[PhN].Sec[i].phase-PLCs[PlcIdx].Phases[0]);
			if(!(PLCs[PlcIdx].Sts[nsts].Colors[xcolorn]&0x30) && PLCs[PlcIdx].Sts[nsts].Colors[xcolorn]&0x06)
				return false;
		}
	}
	return true;
}

function chgColor2(temp,posibles)
{
	temp=posibles.indexOf(temp);
	if(temp!=-1)
	{
		temp++;
		temp%=posibles.length;
	}
	else
		temp=0;
	return posibles[temp];
}

function color2svg(ColorCode,text)
{
var vh=5;
var out="";
var vbgcolor="#808080";
if((ColorCode&128) && ColorCode<255)
	vbgcolor="#000000";
out+="<svg width=\"34\" height=\"";
if(ColorCode>255)
	out+=(vh+800);
else
	out+=(vh+33);
out+="\" xmlns=\"http://www.w3.org/2000/svg\">\n\
<defs>\n\
	<marker id=\"se_marker_end_svg_11\" markerUnits=\"strokeWidth\" orient=\"auto\" viewBox=\"0 0 100 100\" markerWidth=\"5\" markerHeight=\"5\" refX=\"50\" refY=\"50\">\n\
	<path d=\"m100,50l-100,40l30,-40l-30,-40l100,40z\" fill=\"#FF0000\" stroke=\"#FF0000\" stroke-width=\"10\"/>\n\
	</marker>\n\
	<marker id=\"se_marker_end_svg_12\" markerUnits=\"strokeWidth\" orient=\"auto\" viewBox=\"0 0 100 100\" markerWidth=\"5\" markerHeight=\"5\" refX=\"50\" refY=\"50\">\n\
	<path d=\"m100,50l-100,40l30,-40l-30,-40l100,40z\" fill=\"#FFFF00\" stroke=\"#FFFF00\" stroke-width=\"10\"/>\n\
	</marker>\n\
	<marker id=\"se_marker_end_svg_13\" markerUnits=\"strokeWidth\" orient=\"auto\" viewBox=\"0 0 100 100\" markerWidth=\"5\" markerHeight=\"5\" refX=\"50\" refY=\"50\">\n\
	<path d=\"m100,50l-100,40l30,-40l-30,-40l100,40z\" fill=\"#00FF00\" stroke=\"#00FF00\" stroke-width=\"10\"/>\n\
	</marker>\n\
	<linearGradient id=\"svg_111\" x1=\"0\" y1=\"0.5\" x2=\"1\" y2=\"0.5\">\n\
	<stop offset=\"0\" stop-color=\"#808080\"/>\n\
	<stop offset=\"1\" stop-color=\"#000000\"/>\n\
	</linearGradient>\n\
</defs>\n";
if((ColorCode&7)==0 || ColorCode>255)
{
	//out+="<rect fill=\"url(#svg_111)\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"CC_OFF\"/>\n";
	out+="<rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_9\"/>\n";
	out+="<line id=\"svg_6\" x1=\"2\" y1=\""+(vh+16)+"\" x2=\"32\" y2=\""+(vh+16)+"\" stroke=\"#000000\" fill=\"#404040\" stroke-width=\"8\"/>\n";
}
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x01 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_ATR\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_9\"/>\n\
	 <line id=\"svg_8\" x1=\"3\" y1=\""+(vh+16)+"\" x2=\"32\" y2=\""+(vh+16)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"8\" stroke-dasharray=\"4,4\"/>\n\
	</g>\n";
/*	 <line fill=\"#404040\" stroke=\"#FF0000\" x1=\"5\" y1=\""+(vh+25)+"\" x2=\"23\" y2=\""+(vh+9)+"\" id=\"svg_11\" marker-end=\"url(#se_marker_end_svg_11)\"/>\n\ */
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x02 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_ATA\">\n\
	 <rect id=\"svg_17\" fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\"/>\n\
	 <line id=\"svg_18\" x1=\"3\" y1=\""+(vh+16)+"\" x2=\"32\" y2=\""+(vh+16)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"8\" stroke-dasharray=\"4,4\"/>\n\
	</g>\n";
/*	 <line id=\"svg_19\" fill=\"#404040\" stroke=\"#FFFF00\" x1=\"5\" y1=\""+(vh+25)+"\" x2=\"23\" y2=\""+(vh+9)+"\" marker-end=\"url(#se_marker_end_svg_12)\"/>\n\ */
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x04 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_ATG\">\n\
	 <rect id=\"svg_21\" fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\"/>\n\
	 <line id=\"svg_22\" x1=\"3\" y1=\""+(vh+16)+"\" x2=\"32\" y2=\""+(vh+16)+"\" stroke=\"#00FF00\" fill=\"#404040\" stroke-width=\"8\" stroke-dasharray=\"4,4\"/>\n\
	</g>\n";
/*	 <line id=\"svg_23\" fill=\"#404040\" stroke=\"#00FF00\" x1=\"5\" y1=\""+(vh+25)+"\" x2=\"23\" y2=\""+(vh+9)+"\" marker-end=\"url(#se_marker_end_svg_13)\"/>\n\ */
if(ColorCode>255)vh+=50;
if((ColorCode&0x77)==0x04 || ColorCode>255)
out+="<g id=\"CC_G\" transform=\"scale(1, 1)\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_7\"/>\n\
	 <line id=\"svg_6\" x1=\"2\" y1=\""+(vh+16)+"\" x2=\"32\" y2=\""+(vh+16)+"\" stroke=\"#00ff00\" fill=\"#404040\" stroke-width=\"8\"/>\n\
	</g>\n";
if(ColorCode>255)vh+=50;
if((ColorCode&0x77)==0x02 || ColorCode>255)
out+="<g id=\"CC_A\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_5\"/>\n\
	 <line id=\"svg_4\" x1=\"2\" y1=\""+(vh+16)+"\" x2=\"32\" y2=\""+(vh+16)+"\" stroke=\"#ffff00\" fill=\"#404040\" stroke-width=\"8\"/>\n\
	</g>\n";
if(ColorCode>255)vh+=50;
if((ColorCode&0x77)==0x01 || ColorCode>255)
out+="<g id=\"CC_R\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_3\"/>\n\
	 <line id=\"svg_2\" x1=\"2\" y1=\""+(vh+16)+"\" x2=\"32\" y2=\""+(vh+16)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"8\"/>\n\
	</g>\n";
if(ColorCode>255)vh+=50;
if((ColorCode&0x77)==0x06 || ColorCode>255)
out+="<g id=\"CC_AG\">\n\
	 <rect id=\"svg_28\" fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\"/>\n\
	 <line id=\"svg_29\" x1=\"2\" y1=\""+(vh+12)+"\" x2=\"32\" y2=\""+(vh+12)+"\" stroke=\"#FFff00\" fill=\"#404040\" stroke-width=\"2\"/>\n\
	 <line id=\"svg_29\" x1=\"2\" y1=\""+(vh+20)+"\" x2=\"32\" y2=\""+(vh+20)+"\" stroke=\"#00ff00\" fill=\"#404040\" stroke-width=\"8\"/>\n\
	</g>\n";
if(ColorCode>255)vh+=50;
if((ColorCode&0x77)==0x03 || ColorCode>255)
out+="<g id=\"CC_RA\">\n\
	 <rect id=\"svg_34\" fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\"/>\n\
	 <line id=\"svg_35\" x1=\"2\" y1=\""+(vh+12)+"\" x2=\"32\" y2=\""+(vh+12)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"8\"/>\n\
	 <line id=\"svg_35\" x1=\"2\" y1=\""+(vh+20)+"\" x2=\"32\" y2=\""+(vh+20)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"2\"/>\n\
	</g>\n";
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x06 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_ATAG\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_37\"/>\n\
	 <line id=\"svg_18\" x1=\"3\" y1=\""+(vh+12)+"\" x2=\"32\" y2=\""+(vh+12)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"2\" stroke-dasharray=\"4,4\"/>\n\
	 <line x1=\"2\" y1=\""+(vh+20)+"\" x2=\"32\" y2=\""+(vh+20)+"\" stroke=\"#00ff00\" fill=\"#404040\" stroke-width=\"2\" id=\"svg_39\"/>\n\
	</g>\n";
/*	 <line id=\"svg_19\" fill=\"#404040\" stroke=\"#FFFF00\" x1=\"5\" y1=\""+(vh+25)+"\" x2=\"23\" y2=\""+(vh+9)+"\" marker-end=\"url(#se_marker_end_svg_12)\"/>\n\ */
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x03 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_ATRA\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_41\"/>\n\
	 <line id=\"svg_18\" x1=\"3\" y1=\""+(vh+20)+"\" x2=\"32\" y2=\""+(vh+20)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"2\" stroke-dasharray=\"4,4\"/>\n\
	 <line x1=\"2\" y1=\""+(vh+12)+"\" x2=\"32\" y2=\""+(vh+12)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"2\" id=\"svg_43\"/>\n\
	</g>\n";
/*	 <line id=\"svg_19\" fill=\"#404040\" stroke=\"#FFFF00\" x1=\"5\" y1=\""+(vh+25)+"\" x2=\"23\" y2=\""+(vh+9)+"\" marker-end=\"url(#se_marker_end_svg_12)\"/>\n\ */
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x41 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_DTR\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_87\"/>\n\
	 <line x1=\"3\" y1=\""+(vh+16)+"\" x2=\"32\" y2=\""+(vh+16)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"2\" stroke-dasharray=\"4,4\" id=\"svg_88\"/>\n\
	</g>\n";
/*	 <line fill=\"#404040\" stroke=\"#FF0000\" x1=\"5\" y1=\""+(vh+9)+"\" x2=\"23\" y2=\""+(vh+25)+"\" marker-end=\"url(#se_marker_end_svg_11)\" id=\"svg_89\"/>\n\ */
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x42 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_DTA\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_91\"/>\n\
	 <line x1=\"3\" y1=\""+(vh+16)+"\" x2=\"32\" y2=\""+(vh+16)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"2\" stroke-dasharray=\"4,4\" id=\"svg_92\"/>\n\
	</g>\n";
/*	 <line fill=\"#404040\" stroke=\"#FFFF00\" x1=\"5\" y1=\""+(vh+9)+"\" x2=\"23\" y2=\""+(vh+25)+"\" marker-end=\"url(#se_marker_end_svg_12)\" id=\"svg_93\"/>\n\*/
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x44 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_DTG\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_95\"/>\n\
	 <line x1=\"3\" y1=\""+(vh+16)+"\" x2=\"32\" y2=\""+(vh+16)+"\" stroke=\"#00FF00\" fill=\"#404040\" stroke-width=\"2\" stroke-dasharray=\"4,4\" id=\"svg_96\"/>\n\
	</g>\n";
/*	 <line fill=\"#404040\" stroke=\"#00FF00\" x1=\"5\" y1=\""+(vh+9)+"\" x2=\"23\" y2=\""+(vh+25)+"\" marker-end=\"url(#se_marker_end_svg_13)\" id=\"svg_97\"/>\n\ */
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x46 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_DTAG\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_99\"/>\n\
	 <line x1=\"3\" y1=\""+(vh+12)+"\" x2=\"32\" y2=\""+(vh+12)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"2\" stroke-dasharray=\"4,4\" id=\"svg_100\"/>\n\
	 <line x1=\"2\" y1=\""+(vh+20)+"\" x2=\"32\" y2=\""+(vh+20)+"\" stroke=\"#00ff00\" fill=\"#404040\" stroke-width=\"2\" id=\"svg_102\"/>\n\
	</g>\n";
	 /*<line fill=\"#404040\" stroke=\"#FFFF00\" x1=\"5\" y1=\""+(vh+9)+"\" x2=\"23\" y2=\""+(vh+25)+"\" marker-end=\"url(#se_marker_end_svg_12)\" id=\"svg_101\"/>\n\*/
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x43 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_DTRA\">\n\
	 <rect fill=\""+vbgcolor+"\" stroke=\"#000000\" x=\"1\" y=\""+vh+"\" width=\"32\" height=\"32\" id=\"svg_104\"/>\n\
	 <line x1=\"2\" y1=\""+(vh+12)+"\" x2=\"32\" y2=\""+(vh+12)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"2\" id=\"svg_107\"/>\n\
	 <line x1=\"3\" y1=\""+(vh+20)+"\" x2=\"32\" y2=\""+(vh+20)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"2\" stroke-dasharray=\"4,4\" id=\"svg_105\"/>\n\
	</g>\n";
/*	 <line fill=\"#404040\" stroke=\"#FFFF00\" x1=\"5\" y1=\""+(vh+9)+"\" x2=\"23\" y2=\""+(vh+25)+"\" marker-end=\"url(#se_marker_end_svg_12)\" id=\"svg_106\"/>\n\ */
//if((ColorCode&0x30) && ColorCode<255) out+="<text fill=\"#00FFFF\" stroke-width=\"0\" x=\"29\" y=\""+(vh+8)+"\" id=\"svg_112\" font-size=\"9\" font-family=\"Fantasy\" text-anchor=\"middle\" font-weight=\"bold\">"+((ColorCode>>4)&3)+"</text>\n";	
if(text)
	out+="<text fill=\"#000000\" stroke-width=\"0\" x=\"13\" y=\"16\" id=\"svg_113\" font-size=\"12\" font-family=\"Fantasy\" text-anchor=\"middle\" font-weight=\"bold\">"+text+"</text>\n";
out+="</svg>\n";
if(ColorCode==255)
	out="<font size=\"1\" face=\"arial\">"+Str_no_Change+"<br /></font>\n";
return out;
}

function AddIntReg()
{
	if(!GParms)
		return;
	var idx=0;
	IntReg.length=CIntReg;
	for(var i=0;i<(GParms.N_Actives_Inputs+16);i++)
	{
		idx=IntReg.length;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="in["+i+"].in";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="in["+i+"].val";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="in["+i+"].count";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="in["+i+"].time";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="in["+i+"].rst";
		IntReg[idx].Valor=null;
	}
	for(var i=0;i<(GParms.N_Actives_Outputs+4);i++)
	{
		idx=IntReg.length;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="out["+i+"].val";
		IntReg[idx].Valor=null;
	}
	for(var i=0;i<GParms.N_Actives_Controlers;i++)
	{
		idx=IntReg.length;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="PLC["+i+"].flags";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="PLC["+i+"].plan";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Bit";
		IntReg[idx].Nombre="PLC["+i+"].lamp";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Bit";
		IntReg[idx].Nombre="PLC["+i+"].service";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Str";
		IntReg[idx].Nombre="PLC["+i+"].name";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Byt";
		IntReg[idx].Nombre="PLC["+i+"].phases";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="PLC["+i+"].error";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Bit";
		IntReg[idx].Nombre="PLC["+i+"].Emergency";
		IntReg[idx].Valor=null;
	}
}

function CheckSpecialCharacters(data)
{
	 var iChars = " !@#$%^&*()+=-[]\\\';,/{}|\":<>?~"; 
	 for (var i = 0; i < data.length; i++) 
	 {
		if (iChars.indexOf(data.charAt(i)) != -1) 
	{
			alert ("Your string has special characters. \nThese are not allowed.");
	 return true;
		}
	}
	return false;
}

function ChekInst(linea) 
{
	for(var i=0; i<insttable2.length; i++) 
	{
		if (linea.indexOf(insttable2[i].Valor)!=-1)
		return true;
	}
	return false;
}

function GetVRT(iPHASEs,ph)
{
	var tiempo=0;
	if(ph>iPHASEs.length)
		return tiempo;
	var V2R=iPHASEs[ph].V2R;
	for(var i=0;i<V2R.length;i++)
	{
		tiempo+=V2R[i].Tiempo;
	}
	return tiempo;
}

function GetRVT(iPHASEs,ph)
{
	var tiempo=0;
	if(ph>iPHASEs.length)
		return tiempo;
	var R2V=iPHASEs[ph].R2V;
	for(var i=0;i<R2V.length;i++)
	{
		tiempo+=R2V[i].Tiempo;
	}
	return tiempo;
}

function GetEvT(PLC,sts1,sts2)
{
	if(sts1<0 || sts2<0)return 0;
	var tiempovr=0;
	var tiemporv=0;
	var tiempot=0;
	if(PLC.Sts.length>sts1 && PLC.Sts.length>sts2)
	{
		for(var i=0;i<PLC.Sts[sts1].Colors.length;i++)
		{
			if(PLC.Sts[sts1].Colors[i]!=PLC.Sts[sts2].Colors[i])
			{
				if(PLC.Sts[sts1].Colors[i]==4)
				{
					tiempot=GetVRT(PHASEs,PLC.Phases[i]);
					if(tiempovr<tiempot)
						tiempovr=tiempot;
				}
				else
				{
					tiempot=GetRVT(PHASEs,PLC.Phases[i]);
					if(tiemporv<tiempot)
						tiemporv=tiempot;
				}
			}
		}
		return tiempovr+tiemporv;
	}
	else
		return 0;
}

function GetTmin2(PLC,sts1,sts2)
{
	if(sts1<0 || sts2<0)return 0;
	var ev=0;
	var tiempo=0;
	var tiempot=0;
	var ph=0;
	if(PLC.Sts.length>sts1 && PLC.Sts.length>sts2)
	{
		RemoveUnusedItem(PLC.Sts[sts1].Colors);
		for(var i=0;i<PLC.Sts[sts1].Colors.length;i++)
		{
			if(//
			(PLC.Sts[sts1].Colors[i]!=0) && // no estaba apagado
			((PLC.Sts[sts1].Colors[i]&0xF2)==0) && // no es titilante y no tiene amarillo el estado donde estaba
			((PLC.Sts[sts2].Colors[i]&0xF2)==0) && // no es titilante y no tiene amarillo el estado donde va
			(PLC.Sts[sts1].Colors[i]!=PLC.Sts[sts2].Colors[i]))	//los colores son diferentes
			{
				ph=PLC.Phases[i];
				if(PLC.Sts[sts2].Colors[i]==4)
				{
					tiempot=PHASEs[ph].MiGT;
					ev=PHASEs[ph].R2V.length
					if(ev && PHASEs[ph].R2V[ev-1].Color==4)
						tiempot-=PHASEs[ph].R2V[ev-1].Tiempo;
				}
				else
				{
					tiempot=PHASEs[ph].MiRT;
					ev=PHASEs[ph].V2R.length
					if(ev && PHASEs[ph].V2R[ev-1].Color==1)
						tiempot-=PHASEs[ph].V2R[ev-1].Tiempo;
				}
				if(tiempo<tiempot)
					tiempo=tiempot;
			}
		}
		return tiempo;
	}
	else
		return 0;
}

function GetTmin(PLC,sts)
{
	if(sts<0)return 0;
	var tiempo=0;
	var tiempot=0;
	var ph=0;
	if(PLC.Sts.length>sts)
	{
		for(var i=0;i<PLC.Sts[sts].Colors.length;i++)
		{
			ph=PLC.Phases[i];
			if(PLC.Sts[sts].Colors[i]==4)
				tiempot=PHASEs[ph].MiGT;
			if(PLC.Sts[sts].Colors[i]==1)
				tiempot=PHASEs[ph].MiRT;
			if(tiempo<tiempot)
				tiempo=tiempot;
		}
		return tiempo;
	}
	else
		return 0;
}

function SubSts(Nsts)
{
	PLCs[PlcIdx].Sts.splice(Nsts,1);
	ModParm("pPLCs.Sts");
}

function AddSts()
{
	var Nsts=PLCs[PlcIdx].Sts.length
	PLCs[PlcIdx].Sts[Nsts]=new Object();
	PLCs[PlcIdx].Sts[Nsts].TMAX=120;
	PLCs[PlcIdx].Sts[Nsts].TMIN=3;
	PLCs[PlcIdx].Sts[Nsts].Colors= new Array();
	for (var j = 0; j<PLCs[PlcIdx].Phases.length; j++)
		PLCs[PlcIdx].Sts[Nsts].Colors[j]=1;
}

function ShowStss()
{
	var out="";
	out+="<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Add_State+"\" size=\"8\" onclick=\"AddSts();ReDraw(conf_sts);\"/>\n";
	out+="<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" width=\"90%\">\n";
	out+="<tr>\n";
	for (var j=0;j<PLCs[PlcIdx].Sts.length;j++) 
	{
		out+="<td valign=\"top\" align=\"center\">\n";
		out+=ShowSts(j);
		out+="</td>\n";			
	}
	out+="</tr>\n";
	out+="<tr>\n";
	for (var j = 0; j<PLCs[PlcIdx].Sts.length; j++) 
	{
		out+="<td valign=\"top\" align=\"center\">\n";
		out+="<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Del_State+"\" size=\"8\" onclick=\"SubSts("+j+");ReDraw(conf_sts);\"/>\n";
		out+="</td>\n";			
	}
	out+="</tr>\n";
	out+="</table>\n";
	return out;
}

function ChkMax(nsts,valor)
{
	if(ChkParm('PLAN.STS.TMPE',valor)==true	|| 0==valor)
	{
		if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
		{
			if(GetTmin(PLCs[PlcIdx],nsts)<valor || 0==valor)
				return	true;
			else
				return	false;
		}
		return	true;
	}
	else
	{
		return	false;
	}
}

function ShowSts(nsts)
{
	var colorn=0;
	var out="";
	out+="<table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"#c0c0c0\" >\n";
	out+="<tr>\n";
	out+="<td align=\"center\" >\n";
	out+="<font size=\"1\" face=\"arial\">\n";
	out+="<b>&#160;";
	out+=String.fromCharCode(65+nsts);
	out+="&#160;</b></font>\n</td>\n";
	out+="</tr>\n";
	while(PLCs[PlcIdx].Sts[nsts].Colors.length<PLCs[PlcIdx].Phases.length)
		PLCs[PlcIdx].Sts[nsts].Colors.push(1);
	PLCs[PlcIdx].Sts[nsts].Colors.length=PLCs[PlcIdx].Phases.length;
	for (var j = 0; j<PLCs[PlcIdx].Phases.length; j++) 
	{
		PhN=PLCs[PlcIdx].Phases[j]
		if(!(PLCs[PlcIdx].Sts[nsts].Colors[j]&0x30) && (PLCs[PlcIdx].Sts[nsts].Colors[j]&0x06) && PHASEs[PhN].Sec.length)
		{
			for (var i = 0; i<PHASEs[PhN].Sec.length; i++)
			{
				colorn=(PHASEs[PhN].Sec[i].phase-PLCs[PlcIdx].Phases[0]);
				if(!(PLCs[PlcIdx].Sts[nsts].Colors[colorn]&0x30) && (PLCs[PlcIdx].Sts[nsts].Colors[colorn]&0x06))
					PLCs[PlcIdx].Sts[nsts].Colors[j]=0;
			}
		}
		out+="<tr>\n";
		out+="<td align=\"center\" valign=\"middle\" onclick=\"ChgColSts("+nsts+","+j+");\" >\n"; //this.innerHTML=color2svg(PLCs["+PlcIdx+"].Sts["+nsts+"].Colors["+j+"],'G"+(PLCs[PlcIdx].Phases[j]+1)+"');
		out+=color2svg(PLCs[PlcIdx].Sts[nsts].Colors[j],"G"+(PLCs[PlcIdx].Phases[j]+1));
		out+="</td>\n";
		out+="</tr>\n";
	}
	out+="<tr>\n";
	out+="<td align=\"center\">\n";
	out+="<font size=\"1\" face=\"arial\">TMPE</font><br />\n";
	out+="<input type=\"text\" class=\"INTEXT\" value=\""+PLCs[PlcIdx].Sts[nsts].TMAX+"\" size=\"3\" maxlength=\"3\" onchange=\"if(ChkMax("+nsts+",parseInt(this.value))==true){PLCs["+PlcIdx+"].Sts["+nsts+"].TMAX=parseInt(this.value);ModParm('PLAN.STS.TMPE');}else{this.value=PLCs["+PlcIdx+"].Sts["+nsts+"].TMAX;}\" onkeyup=\"\"/>\n";
	out+="</td>\n";
	out+="</tr>\n";
/*	out+="<tr>\n";
	out+="<td align=\"center\">\n";
	out+="<font size=\"1\" face=\"arial\">TmPE</font><br />\n";
	out+="<input type=\"text\" class=\"INTEXT\" value=\""+PLCs[PlcIdx].Sts[nsts].TMIN+"\" size=\"3\" maxlength=\"3\" onchange=\"if(ChkParm('PLAN.STS.TmPE',parseInt(this.value))==true){PLCs["+PlcIdx+"].Sts["+nsts+"].TMIN=parseInt(this.value);ModParm('PLAN.STS.TmPE');}else{this.value=PLCs["+PlcIdx+"].Sts["+nsts+"].TMIN;}\" onkeyup=\"\"/>\n";
	out+="</td>\n";
	out+="</tr>\n";// */
	out+="</table>\n";
	//alert(out);
	return out;
}

var EdPlan=0;
var DataPlan="";
//===============================================================================
function ClonePlan(Plc)
{
	PlnIdx=PLCs[Plc].Plans.length;
	PLCs[Plc].Plans[PlnIdx]= new Object();
	PLCs[Plc].Plans[PlnIdx]=owl.deepCopy(PlanGen);
	PlanGen=PLCs[Plc].Plans[PlnIdx];
	if(PlcIdx!=Plc)
	{
		PlcIdx=Plc;
		ReDraw(-1);
	}
	else
	{
		ShowPlanWizard(3);
	}
}

function SelEditPln(OBJ)
{
	PlnIdx=parseInt(OBJ.value);
	PlanGen=null;
	PlanGen=PLCs[PlcIdx].Plans[PlnIdx];
	ShowPlanWizard(3);
}
function UpDatePlnPrm()
{
	var Plans=PLCs[PlcIdx].Plans;
	for(var i=0;i<Plans.length;i++)
	{
		Plans[i].PLNTYP=parseInt(Plans[i].PLNTYP);
		Plans[i].PHC=parseInt(Plans[i].PHC);
		if(Plans[i].PHC!=0)
			SetPhConf(PLCs[PlcIdx].EV[Plans[i].PHC-1]);
		else
			SetPhConf(GlobalParms.phconf);
		switch(Plans[i].PLNTYP)
		{
			case 0:// PLAN ASYNC
			{
				UpdateAsy1(Plans[i]);
			}
			break;
			case 1:// PLAN SYNC1
			{
				UpdateSyn1(PLCs[PlcIdx],Plans[i]);
			}
			break;
			case 2:// PLAN SYNC2
			{
				UpdateSyn2(PLCs[PlcIdx],Plans[i]);
			}
			break;
		}
	}
}
function ShowPlanWizard(WizardStp)
{
	var out="";
	switch(WizardStp)
	{
		case 1://control manual
		{
			out+="<font size=\"1\" face=\"arial\">SECUENCIA CONTROL MANUAL</font><br />\n";
			out+="<table align=\"center\" border=\"1\" width=\"90%\">\n";
			out+="<tr>";
			out+="<td valign=\"top\">\n";
			out+="<a href=\"\" onclick=\"PlanGen.MACSEQSTP.push(0);PlanGen.MACSTSSTP.push(1);ShowPlanWizard(1);return false;\">\n";
			out+="<img border=\"0\" src=\"../../img/add.png\" width=\"25\" height=\"25\"/>\n";
			out+="</a>\n";
			out+=ShowMACPLN();
			out+="<a href=\"\" onclick=\"PlanGen.MACSEQSTP.pop();PlanGen.MACSTSSTP.pop();ShowPlanWizard(1);return false;\">\n";
			out+="<img src=\"../../img/error1.jpg\" width=\"25\" height=\"25\" border=\"0\" />\n";
			out+="</a>\n";
			out+="</td>\n";
			out+="</tr>\n";
			out+="</table>\n";
		}
		break;
		case 2://control otu
		{
			while(PlanGen.OTUDEMCLR.length<PLCs[PlcIdx].Sts.length)
				PlanGen.OTUDEMCLR.push(0);
			out+="<font size=\"1\" face=\"arial\">SECUENCIA CONTROL CENTRAL</font>\n";
			out+="<table align=\"center\" border=\"1\" width=\"90%\">\n";
			out+="<tr><td valign=\"top\">\n";
			if(PlanGen.OTUSEQSTS.length)
			{
				if(PlanGen.OTUSEQSTS.length>=PlanGen.OTUSTSDEM.length)
				{
					out+="<a href=\"\" onclick=\"PlanGen.OTUDEMSTS.push(0);PlanGen.OTUDEMCLR.push(0);ShowPlanWizard(2);return false;\">\n";
					out+="<img border=\"0\" src=\"../../img/add.png\" width=\"25\" height=\"25\"/>\n";
					out+="</a>";
				}
				out+="<font size=\"1\" face=\"arial\">Demandas</font><br/>\n";
				out+=ShowOTUDEM();
				out+="<a href=\"\" onclick=\"DelOTUDEM();ShowPlanWizard(2);return false;\">\n";
				out+="<img src=\"../../img/error1.jpg\" width=\"25\" height=\"25\" border=\"0\" />\n";
				out+="</a>\n";
			}
			out+="</td>\n";
			out+="<td valign=\"top\">\n";
			out+="<a href=\"\" onclick=\"PlanGen.OTUSEQSTS.push(1);ShowPlanWizard(2);return false;\">\n";
			out+="<img border=\"0\" src=\"../../img/add.png\" width=\"25\" height=\"25\"/>\n";
			out+="</a>\n";
			out+=ShowOTUSEQSTS();
			out+="<a href=\"\" onclick=\"PlanGen.OTUSEQSTS.pop();ShowPlanWizard(2);return false;\">\n";
			out+="<img src=\"../../img/error1.jpg\" width=\"25\" height=\"25\" border=\"0\" />\n";
			out+="</a>\n";
			out+="</td>\n";
			out+="</tr>\n";
			out+="</table>\n";
		}
		break;
		case 3:// control local
		{
			//------------------------------------------------------------
			if(ErrorMsg && ErrorMsg!="")
				out+="<font size=\"3\" face=\"arial\">"+ErrorMsg+"</font>\n";
			out+="<table align=\"center\" border=\"0\" cellpadding=\"5\" cellspacing=\"5\"	width=\"90%\">\n";
			out+="<tr>\n";
			//------------------------------------------------------------
			out+="<td valign=\"top\">\n";
			/*/-------------------------
			out+="<select id=\"NewPlnPhc\" tabindex=\"\" class=\"INTEXT\">\n";
			out+="<option value=\"0\">"+Str_Default+" "+Str_OTU_Menu2+"</option>\n";
			for(var i=1;i<=PLCs[PlcIdx].EV.length;i++)
			{
				out+="<option value=\""+i+"\">"+Str_OTU_Menu2+" "+i+"</option>\n";
			}
			out+="</select>\n";
			//-------------------------*/
			out+="<select class=\"INTEXT\" onchange=\"if(parseInt(this.value)>=0){AddNewPlan(parseInt(this.value));ModParm('PLAN.Ls');}ShowPlanWizard(3);\">\n";
			out+=GenOptions(OptNEWPLNTYP,-1);
			out+="</select>\n";
			out+="</td>\n";
			out+="</tr>\n";
			//------------------------------------------------------------
			out+="<tr>\n";
			out+="<td valign=\"top\">\n";
			out+="<select tabindex=\"\" class=\"INTEXT\" onchange=\"SelEditPln(this);\">\n";
			for(var i=0;i<PLCs[PlcIdx].Plans.length;i++)
			{
				out+="<option value=\""+i+"\" ";
				if(PlnIdx==i)out+=" selected=\"selected\"";
				out+=">Edite	Plano"+(i+1)+"</option>\n";
			}
			out+="</select>\n";
			if(PLCs[PlcIdx].Plans.length)
			{
				out+="<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Delet+" Plano?\" onclick=\"DelAllPlans();\"/>\n";
				out+="<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Copy+" Plano?\" onclick=\"ClonePlan("+PlcIdx+");\"/>\n";
				if(PLCs.length>1)
				{
					out+="<select tabindex=\"\" class=\"INTEXT\" onchange=\"if(this.value>0)ClonePlan(this.value-1);\">\n";
					out+="<option value=\"0\" ></option>\n";
					for(var count=0;count<PLCs.length;count++)
					{
						if(PlcIdx!=count)
							out+="<option value=\""+(count+1)+"\" >"+Str_Copy+" "+Str_Plan+"->"+Str_GP_Controllers+""+(count+1)+"</option>\n";
					}
					out+="</select>\n";
				}
			}
			out+="</td>\n";
			//------------------------------------------------------------
			out+="</tr>\n";
			out+="<tr>\n";
			out+="<td valign=\"top\">\n";
			if(PlanGen)
			{
				PlanGen.PLNTYP=parseInt(PlanGen.PLNTYP);
				PlanGen.PHC=parseInt(PlanGen.PHC);
				if(PlanGen.PHC!=0)
					SetPhConf(PLCs[PlcIdx].EV[PlanGen.PHC-1]);
				else
					SetPhConf(GlobalParms.phconf);
				switch(PlanGen.PLNTYP)
				{
					case 0:// PLAN ASYNC
					{
						UpdateAsy1(PLCs[PlcIdx],PlanGen);
						//------------------------------------------------------------
						out+=ShowPLNASY();
						//------------------------------------------------------------
						var Plan=owl.deepCopy(PlanGen);
						var count=CountItem(PlanGen.LCLASYSTPDEM,0);
						count=(1<<count);
						var stp=0;
						var bit=0;
						var lock=0;
						for(var i=0;i<count;i++)
						{
							Plan=owl.deepCopy(PlanGen);
							bit=0;
							stp=0;
							lock=0;
							do
							{
								if(Plan.LCLASYSTPDEM[stp]>0)
								{
									bit++;
									if(i&bit)
									{
										Plan.LCLASYSEQSTP[stp]=Plan.LCLASYSTPDEM[stp];
									}
								}
								stp=Plan.LCLASYSEQSTP[stp];
								lock++;
							}
							while(stp!=0 && lock<=Plan.LCLASYSEQSTP.length);
							if(stp!=0 && lock>Plan.LCLASYSEQSTP.length)
								alert("Error in Sequence of steps Dead Lock");
							out+=DrawPlnAsy(Plan,("Dem "+i.toString(2)))+"<br />";
						}
					}
					break;
					case 1:// PLAN SYNC1
					{
						UpdateSyn1(PLCs[PlcIdx],PlanGen);
						//------------------------------------------------------------
						out+=ShowPLNSYN();
						LOG(SaveSplan1(PLCs[PlcIdx],GlobalParms,PlanGen));
						//------------------------------------------------------------
						var Plan=owl.deepCopy(PlanGen);
						var count=CountItem(PlanGen.LCLSYCDEMSTP,0);
						count=(1<<count);
						var stp=0;
						var bit=0;
						var Nstp=0;
						var lock=0;
						for(var i=0;i<count;i++)
						{
							Plan=owl.deepCopy(PlanGen);
							bit=0;
							stp=0;
							lock=-1;
							do
							{
								Nstp=Plan.LCLSYCSEQSTP[stp];
								if(Plan.LCLSYCDEMSTP[stp]>0)
								{
									bit++;
									if(i&bit)
									{
										Plan.LCLSYCSTSSTP[Nstp]=Plan.LCLSYCDEMSTS[stp];
									}
								}
								stp=Nstp;
								lock++;
							}
							while(stp!=0 && lock<=Plan.LCLSYCSEQSTP.length);
							if(stp!=0 && lock>Plan.LCLSYCSEQSTP.length)
								alert("Error in Sequence of steps Dead Lock");
							out+=DrawPlnSyn(Plan,("Dem "+i.toString(2)))+"<br />";
						}
					}
					break;
					case 2:// PLAN SYNC2
					{
						UpdateSyn2(PLCs[PlcIdx],PlanGen);
						//------------------------------------------------------------
						out+=ShowPLNSYN2();
						LOG(SaveSplan2(PLCs[PlcIdx],GlobalParms,PlanGen));
						//------------------------------------------------------------
						var Plan=owl.deepCopy(PlanGen);
						var count=CountItem(PlanGen.LCLSYCDEMSTP,0);
						count=(1<<count);
						var stp=0;
						var bit=0;
						var Nstp=0;
						var lock=0;
						for(var i=0;i<count;i++)
						{
							Plan=owl.deepCopy(PlanGen);
							bit=0;
							stp=0;
							lock=-1;
							do
							{
								Nstp=Plan.LCLSYCSEQSTP[stp];
								if(Plan.LCLSYCDEMSTP[stp]>0)
								{
									bit++;
									if(i&bit)
									{
										Plan.LCLSYCSTSSTP[Nstp]=Plan.LCLSYCDEMSTS[stp];
									}
								}
								stp=Nstp;
								lock++;
							}
							while(stp!=0 && lock<=Plan.LCLSYCSEQSTP.length);
							if(stp!=0 && lock>Plan.LCLSYCSEQSTP.length)
								alert("Error in Sequence of steps Dead Lock");
							out+=DrawPlnSyn2(Plan,("Dem "+i.toString(2)))+"<br />";
						}
					}
					break;
				}
			}
			out+="</td>\n";
			out+="</tr>\n";
			out+="</table>\n";
		}
		break;
	}
	//alert(svg);
	document.getElementById("HOME1").innerHTML=out;
}
//===============================================================================
function ShowMACPLN()
{
	var out="";
	var select=0;
	out+="<table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"#c0c0c0\" >\n";
	out+="<tr>\n";
	for (var j = 0; j<PlanGen.MACSEQSTP.length; j++) 
	{
		out+="<td align=\"center\" valign=\"middle\">\n";
		out+="<select class=\"INTEXT\" onchange=\"PlanGen.MACSTSSTP["+j+"]=parseInt(this.value);ModParm('PLAN.MC');ShowPlanWizard(1);\">\n";
		{
			select=0;
			for(var i=0;i<PLCs[PlcIdx].Sts.length;i++)
			{
				if(ChkJmp(PlanGen.MACSTSSTP[((j+PlanGen.MACSEQSTP.length-1)%PlanGen.MACSEQSTP.length)],(i+1)))
				{
					out+="<option value=\""+(i+1)+"\" ";
					if(PlanGen.MACSTSSTP[j]==(i+1))
					{
						out+=" selected=\"selected\"";
						select=(i+1);
					}
					out+=">"+String.fromCharCode(65+i)+"</option>\n";
				}
			}
			if(!select)
				PlanGen.MACSTSSTP[j]=1;
			
		}
		out+="</select><br/>\n";
		out+="<select class=\"INTEXT\" onchange=\"PlanGen.MACSEQSTP["+j+"]=parseInt(this.value);ModParm('PLAN.MC');ShowPlanWizard(1);\">\n";
		select=0;
		for(var i=0;i<PlanGen.MACSEQSTP.length;i++)
		{
			if(ChkJmp(PlanGen.MACSTSSTP[j],PlanGen.MACSTSSTP[i]))
			{
				out+="<option value=\""+i+"\" ";
				if(PlanGen.MACSEQSTP[j]==i)
				{
					out+=" selected=\"selected\"";
					select=(i+1);
				}
				out+=">De passo"+(j+1)+" para passo"+(i+1)+"</option>\n";
			}
		}
		if(!select)
			PlanGen.MACSEQSTP[j]=0;
		out+="</select>\n";
		out+="</td>\n";
	}
	out+="</tr>\n";
	out+="</table>\n";
	//alert(out);
	return out;
}
//===============================================================================
function DelOTUDEM()
{
	var val=0;
	val=PlanGen.OTUDEMSTS[PlanGen.OTUDEMSTS.length-1];
	PlanGen.OTUDEMSTS.pop();
	for (var j = 0;j<PlanGen.OTUDEMCLR.length;j++)
	{
		if(PlanGen.OTUDEMCLR[j]==val)
			PlanGen.OTUDEMCLR[j]=0;	//.splice(j,1);
	}
}
function ShowOTUDEM()
{
	var out="";
	/*if(PlanGen.OTUSEQSTS.length<PlanGen.OTUDEMSTS.length)
		for (var j = 0; j<PlanGen.OTUDEMSTS.length; j++) 
			PlanGen.OTUSEQSTS[j]=1;// */
	if(PlanGen.OTUSTSDEM.length<PlanGen.OTUDEMSTS.length)
		for (var j = 0; j<PlanGen.OTUDEMSTS.length; j++) 
			PlanGen.OTUSTSDEM[j]=1;
	out+="<table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"#c0c0c0\" >\n";
	for (var j = 0; j<PlanGen.OTUDEMSTS.length; j++) //-1
	{
		out+="<tr>\n";
		out+="<td align=\"center\" valign=\"middle\">\n";
		out+="<select class=\"INTEXT\" onchange=\"PlanGen.OTUDEMSTS["+j+"]=parseInt(this.value);ModParm('PLAN.OTU');ShowPlanWizard(2);\">\n";
		out+="<option value=\"0\"></option>\n";
		for(var i=1;i<=(HW_IOS+parseInt(GlobalParms.Inputs)+parseInt(GlobalParms.Loops));i++)
		{
			out+="<option value=\""+i+"\" ";
			if(PlanGen.OTUDEMSTS[j]==i)out+=" selected=\"selected\"";
			out+=">Input "+i+"</option>\n";
		}
		out+="</select>\n";
		out+="</td>\n";
		out+="<td align=\"center\" valign=\"middle\">\n";
		out+="<select class=\"INTEXT\" onchange=\"PlanGen.OTUSTSDEM["+j+"]=parseInt(this.value);ModParm('PLAN.OTU');ShowPlanWizard(2);\">\n";
		out+="<option value=\""+PlanGen.OTUSEQSTS[j]+"\">"+String.fromCharCode(64+PlanGen.OTUSEQSTS[j])+"</option>\n";
		var select=0;
		for(var i=0;i<PLCs[PlcIdx].Sts.length;i++)
		{
			if(ChkJmp(PlanGen.OTUSEQSTS[j],(i+1)))
			{
				out+="<option value=\""+(i+1)+"\" ";
				if(PlanGen.OTUSTSDEM[j]==(i+1))
				{
					out+=" selected=\"selected\"";
					select=(i+1);
				}
				out+=">"+String.fromCharCode(65+i)+"</option>\n";
			}
		}
		if(!select)
			PlanGen.OTUSTSDEM[j]=PlanGen.OTUSEQSTS[j];
		out+="</select>\n";
		out+="</td>\n";
		out+="</tr>\n";
	}
	out+="</table>\n";
	//alert(out);
	return out;
}
function ShowOTUSEQSTS()
{
	var out="";
	var select=0;
	out+="<table border=\"1\" width=\"100%\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"#c0c0c0\" >\n";
	out+="<tr>\n";
	for (var j = 0; j<PlanGen.OTUDEMCLR.length; j++) 
	{
		PlanGen.OTUDEMCLR[j]=0;
	}
	for (var j = 0; j<PlanGen.OTUDEMSTS.length; j++) 
	{
		if(PlanGen.OTUDEMSTS[j])
			PlanGen.OTUDEMCLR[PlanGen.OTUSTSDEM[j]-1]=PlanGen.OTUDEMSTS[j];
	}
	for (var j = 0; j<PlanGen.OTUSEQSTS.length; j++) 
	{
		out+="<td align=\"center\" valign=\"top\">\n";
		out+="<select class=\"INTEXT\" onchange=\"PlanGen.OTUSEQSTS["+j+"]=parseInt(this.value);ModParm('PLAN.OTU');ShowPlanWizard(2);\">\n";
		{
			select=0;
			for(var i=0;i<PLCs[PlcIdx].Sts.length;i++)
			{
				if(ChkJmp(PlanGen.OTUSEQSTS[j],(i+1)))
				{
					out+="<option value=\""+(i+1)+"\" ";
					if(PlanGen.OTUSEQSTS[j]==(i+1))
					{
						select=(i+1);
						out+=" selected=\"selected\"";
					}
					out+=">From:"+String.fromCharCode(65+j)+"->"+String.fromCharCode(65+i)+"</option>\n";
				}
			}
			if(!select)
				PlanGen.OTUSEQSTS[j]=1;
		}
		out+="</select>\n";
		if(PlanGen.OTUDEMCLR[j])
		{
			out+="<br/><font size=\"1\" face=\"arial\">Limpia In[";
			out+=PlanGen.OTUDEMCLR[j];
			out+="]</font>\n";
		}
		out+="</td>\n";
	}
	out+="</tr>\n";
	out+="</table>\n";
	//alert(out);
	return out;
}
//===============================================================================
function RcvES3(Dados)
{
	var Plan= new Array();
	var Code = Dados.responseText;
	Code=Code.split('\n\n');
	var p=0;
	while(p<Code.length)
	{
		Code[p]=RemoveUnuseChar(Code[p]);
		Code[p]=Code[p].trim();
		if(Code[p]=="")
		{
			Code.splice(p,1);
		}
		else
		{
			Plan[p]=new Object();
			Code[p]=Code[p].split('\n');
			var j=0;
			//----------------------------------------------------
			while(j<Code[p].length)
			{
				Code[p][j]=RemoveUnuseChar(Code[p][j]);
				Code[p][j]=Code[p][j].trim();
				if(Code[p][j]=="")
				{
					Code[p].splice(j,1);
				}
				else
				{
					Code[p][j]=Code[p][j].split(':');
					j++;
				}
			}
			//----------------------------------------------------
			for(j=0;j<Code[p].length;j++)
			{
				switch(Code[p][j][0])
				{
					case "PLNTYP":
						Plan[p]=myNewEasyPlan(parseInt(Code[p][j][1]));
					break;
					case "DEMPRI":
						Plan[p].DEMPRI=ConvToInt(Code[p][j][1].split(','));
					break;
					case "PHC":
						Plan[p].PHC=parseInt(Code[p][j][1]);
					break;
					case "SEC":
						Plan[p].SEC=Code[p][j][1];
					break;
					case "SYCPLC":
						Plan[p].SYCPLC=Code[p][j][1];
					break;
					case "SYCPLCTOU":
						Plan[p].SYCPLCTOU=Code[p][j][1];
					break;
					case "CHGSTSSTP":
						Plan[p].CHGSTSSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					//-----------------------------------------------
					case "LCLCHGPLN":
						Plan[p].LCLCHGPLN=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLSYCTCI":
						Plan[p].LCLSYCTCI=parseInt(Code[p][j][1]);
					break;
					case "LCLSYCTOF":
						Plan[p].LCLSYCTOF=parseInt(Code[p][j][1]);
					break;
					case "LCLSYCSEQSTP":
						Plan[p].LCLSYCSEQSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLSYCSTSSTP":
						Plan[p].LCLSYCSTSSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLSYCTSTSTP":
						Plan[p].LCLSYCTSTSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLSYCDEMSTP":
						Plan[p].LCLSYCDEMSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLSYCDEMSTS":
						Plan[p].LCLSYCDEMSTS=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLSYCCLRDEM":
						Plan[p].LCLSYCCLRDEM=ConvToInt(Code[p][j][1].split(','));
					break;
					//-----------------------------------------------
					case "LCLASYSEQSTP":
						Plan[p].LCLASYSEQSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLASYSTSSTP":
						Plan[p].LCLASYSTSSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLASYTNOSTP":
						Plan[p].LCLASYTNOSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLASYTMASTP":
						Plan[p].LCLASYTMASTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLASYTEXSTP":
						Plan[p].LCLASYTEXSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLASYTMISTP":
						Plan[p].LCLASYTMISTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLASYDEXSTP":
						Plan[p].LCLASYDEXSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLASYDEMSTP":
						Plan[p].LCLASYDEMSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLASYSTPDEM":
						Plan[p].LCLASYSTPDEM=ConvToInt(Code[p][j][1].split(','));
					break;
					case "LCLASYCLRDEM":
						Plan[p].LCLASYCLRDEM=ConvToInt(Code[p][j][1].split(','));
					break;
					//------------------------------------------------
					case "OTUSEQSTS":
						Plan[p].OTUSEQSTS=ConvToInt(Code[p][j][1].split(','));
					break;
					case "OTUDEMSTS":
						Plan[p].OTUDEMSTS=ConvToInt(Code[p][j][1].split(','));
					break;
					case "OTUSTSDEM":
						Plan[p].OTUSTSDEM=ConvToInt(Code[p][j][1].split(','));
					break;
					case "OTUDEMCLR":
						Plan[p].OTUDEMCLR=ConvToInt(Code[p][j][1].split(','));
					break;
					case "MACSEQSTP":
						Plan[p].MACSEQSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					case "MACSTSSTP":
						Plan[p].MACSTSSTP=ConvToInt(Code[p][j][1].split(','));
					break;
					//---------------------------------------
				}
			}
			p++;
		}
	}
	//if(Plan.length==1)Plan=Plan[0];
	return Plan;
}
function DelAllPlans()
{
	if(confirm(Str_RemoveMessage))
	{
		PLCs[PlcIdx].Plans.length=PlnIdx;
		PlnIdx-=1;
		PlanGen=PLCs[PlcIdx].Plans[PlnIdx];
		HolyDays=owl.deepCopy(PLCs[PlcIdx].HolyDays);
		WeekDays=owl.deepCopy(PLCs[PlcIdx].WeekDays);
		TimeScheduler=owl.deepCopy(PLCs[PlcIdx].TimeScheduler);
		CloneSch();
		ShowPlanWizard(3);
	}
}
function DelAllPlan()
{
	if(confirm(Str_RemoveMessage))
	{
		PLCs[PlcIdx].Plans.length=(PLCs[PlcIdx].Plans.length-1);
		PlnIdx=0;
		PlanGen=PLCs[PlcIdx].Plans[PlnIdx];
		ShowPlanWizard(3);
	}
}
function myNewEasyPlan(PLNTYP)
{
	switch(PLNTYP)
	{
		case 0:
			var PlanGen={
				PLNTYP:0,
				PHC:0,
				SEC:"sec.sec",
				DEMPRI:[0],
				LCLCHGPLN:0,
				LCLASYSEQSTP:[0],
				LCLASYSTSSTP:[1],
				LCLASYTNOSTP:[7],
				LCLASYTMASTP:[20],
				LCLASYTEXSTP:[5],
				LCLASYTMISTP:[10],
				LCLASYDEXSTP:[0],
				LCLASYDEMSTP:[0],
				LCLASYSTPDEM:[0],
				LCLASYCLRDEM:[0],
				}
		break;
		case 1:
			var PlanGen={
				PLNTYP:1,
				PHC:0,
				SEC:"sec.sec",
				DEMPRI:[0],
				LCLCHGPLN:0,
				LCLSYCTCI:120,
				LCLSYCTOF:0,
				LCLSYCSEQSTP:[0],
				LCLSYCSTSSTP:[1],
				LCLSYCTSTSTP:[0],
				LCLSYCDEMSTP:[0],
				LCLSYCDEMSTS:[0],
				LCLSYCCLRDEM:[0],
				}
		break;
		case 2:
			var PlanGen={
				PLNTYP:2,
				PHC:0,
				SEC:"sec.sec",
				DEMPRI:[0],
				LCLCHGPLN:0,
				LCLSYCTCI:120,
				LCLSYCTOF:0,
				LCLSYCSEQSTP:[0],
				LCLSYCSTSSTP:[1],
				LCLSYCTSTSTP:[10],
				LCLSYCDEMSTP:[0],
				LCLSYCDEMSTS:[0],
				LCLSYCCLRDEM:[0],
				}
		break;
	}
	return PlanGen;
}
function AddNewPlan(PLNTYP)
{
	PlnIdx=PLCs[PlcIdx].Plans.length;
	PLCs[PlcIdx].Plans[PlnIdx]= new Object();
	PLCs[PlcIdx].Plans[PlnIdx]=myNewEasyPlan(PLNTYP);//owl.deepCopy(PlanGen);
	if(document.getElementById("NewPlnPhc"))
		PlanGen.PHC=parseInt(document.getElementById("NewPlnPhc").value);
	PlanGen=PLCs[PlcIdx].Plans[PlnIdx];
}
function fmenor(vec)
{
	var pos=0;
	for(var j=1;j<vec.length;j++) 
	{
		if(vec[pos]>vec[j])
			pos=j;
	}
	return pos;
}
//-----------------------------------------------------------------------
var SwFF=7;//14
var SwEnMc=9;//15
var SwCmMc=8;//16
var OutAdv=10;
var OutMc=11;
var OutRemote=12;
//-----------------------------------------------------------------------
var IniPlan="#VAR:\n\
Nsts=1\n\
Tsts=0\n\
Csts=0\n\
Cstp=0\n\
Nstp=255\n\
tstart=0\n\
MCTR=0\n\
Nmode=0\n\
Cmode=1\n\
temp=0\n\
wait=0\n\
DEMA=0\n\
FlasCtrl=0\n";
//---------------------------------------------------------
var EndPlan="end\n";
//---------------------------------------------------------
percent=70;

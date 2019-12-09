var PlnIdx=0;
var ErrorMsg="";
//LCL=Local
//SYC=Syncronico
//PLC=PLC
//ASY=No_Syncronico
//OTU=Timpo real (OTU)
//MAC=Manual Control
//STS=Estado
//TCI=Tiempo de Ciclo
//TOF=Tiempo de 
//TOU=TimeOut
//SEQ=Secuencia
//STP=Step
//SEC=Matris de conflicto
//TST=Tiempode de Estado
//DEM=Demanda
//PRI=Prioridida
//CLR=Clear
//TNO=Tiempo Normal
//CHG=Change
//===============================================================================
function UpdateAsy1(PLC,Plan)
{
	var Tmin2=0;
	var nstp=0;
	Plan.PHC=parseInt(Plan.PHC);
	while(PlanGen.LCLASYSTSSTP.length<PlanGen.LCLASYSEQSTP.length)
		PlanGen.LCLASYSTSSTP.push(0);
	while(PlanGen.LCLASYTNOSTP.length<PlanGen.LCLASYSEQSTP.length)
		PlanGen.LCLASYTNOSTP.push(0);
	while(PlanGen.LCLASYTMASTP.length<PlanGen.LCLASYSEQSTP.length)
		PlanGen.LCLASYTMASTP.push(0);
	while(PlanGen.LCLASYTEXSTP.length<PlanGen.LCLASYSEQSTP.length)
		PlanGen.LCLASYTEXSTP.push(0);
	while(PlanGen.LCLASYTMISTP.length<PlanGen.LCLASYSEQSTP.length)
		PlanGen.LCLASYTMISTP.push(0);
	while(PlanGen.LCLASYDEXSTP.length<PlanGen.LCLASYSEQSTP.length)
		PlanGen.LCLASYDEXSTP.push(0);
	while(PlanGen.LCLASYDEMSTP.length<PlanGen.LCLASYSEQSTP.length)
		PlanGen.LCLASYDEMSTP.push(0);
	while(PlanGen.LCLASYSTPDEM.length<PlanGen.LCLASYSEQSTP.length)
		PlanGen.LCLASYSTPDEM.push(0);
	while(PlanGen.LCLASYCLRDEM.length<PlanGen.LCLASYSEQSTP.length)
		PlanGen.LCLASYCLRDEM.push(0);
	for (var j = 0; j<Plan.LCLASYSEQSTP.length; j++) 
	{
		Plan.LCLASYSEQSTP[j]=parseInt(Plan.LCLASYSEQSTP[j]);
		Plan.LCLASYSTSSTP[j]=parseInt("0"+Plan.LCLASYSTSSTP[j]);
		if(!Plan.LCLASYSTSSTP[j])
			Plan.LCLASYSTSSTP[j]=255;
		
		Plan.LCLASYSTSSTP[j]=parseInt(Plan.LCLASYSTSSTP[j]);
		nstp=((j+Plan.LCLASYSEQSTP.length-1)%Plan.LCLASYSEQSTP.length);
		Tmin2=GetTmin2(PLC,Plan.LCLASYSTSSTP[nstp]-1,Plan.LCLASYSTSSTP[j]-1)
		
		Plan.LCLASYTNOSTP[j]=parseInt(Plan.LCLASYTNOSTP[j]);
		if(Tmin2>Plan.LCLASYTNOSTP[j])
			Plan.LCLASYTNOSTP[j]=Tmin2;
		
		Plan.LCLASYTEXSTP[j]=parseInt(Plan.LCLASYTEXSTP[j]);
		
		Plan.LCLASYTMASTP[j]=parseInt(Plan.LCLASYTMASTP[j]);
		if(Tmin2>Plan.LCLASYTMASTP[j])
			Plan.LCLASYTMASTP[j]=Tmin2+Plan.LCLASYTEXSTP[j];
		
		Plan.LCLASYTMISTP[j]=parseInt(Plan.LCLASYTMISTP[j]);
		if(Tmin2>Plan.LCLASYTMISTP[j])
			Plan.LCLASYTMISTP[j]=Tmin2;
		
		Plan.LCLASYDEXSTP[j]=parseInt(Plan.LCLASYDEXSTP[j]);
		Plan.LCLASYSTPDEM[j]=parseInt(Plan.LCLASYSTPDEM[j]);
		Plan.LCLASYCLRDEM[j]=0;
		Plan.LCLASYDEMSTP[j]=parseInt(Plan.LCLASYDEMSTP[j]);
		if(Plan.LCLASYDEMSTP[j]==0)
			Plan.DEMPRI[j]=0;
	}
	Plan.LCLASYSTSSTP.length=Plan.LCLASYSEQSTP.length;
	Plan.LCLASYTNOSTP.length=Plan.LCLASYSEQSTP.length;
	Plan.LCLASYTMASTP.length=Plan.LCLASYSEQSTP.length;
	Plan.LCLASYTEXSTP.length=Plan.LCLASYSEQSTP.length;
	Plan.LCLASYTMISTP.length=Plan.LCLASYSEQSTP.length;
	Plan.LCLASYDEXSTP.length=Plan.LCLASYSEQSTP.length;
	Plan.LCLASYDEMSTP.length=Plan.LCLASYSEQSTP.length;
	Plan.LCLASYSTPDEM.length=Plan.LCLASYSEQSTP.length;
	Plan.DEMPRI.length=Plan.LCLASYSEQSTP.length;
	for (var j = 0; j<Plan.LCLASYSEQSTP.length; j++) 
	{
		if(parseInt(Plan.LCLASYTNOSTP[j])==0)
			Plan.LCLASYTNOSTP[j]=10;
		if(Plan.LCLASYDEMSTP[j])
			Plan.LCLASYCLRDEM[Plan.LCLASYSTPDEM[j]]=Plan.LCLASYDEMSTP[j];
	}	
}

function DrawPlnAsy(Plan,Text)
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
	var Y=0;
	var X=0;
	var X1=0;
	var X2=0;
	var X3=10;
	var XEV=0;
	//------------------------------------------------
	var svg="";
	var stp=0;
	sts=parseInt(Plan.LCLASYSTSSTP[Plan.LCLASYSEQSTP.length-1])-1;
	var lock=0;
	do
	{
		X+=X3;
		sts1=sts;
		sts=parseInt(Plan.LCLASYSTSSTP[stp])-1;
		XEV=GetEvT(PLCs[PlcIdx],sts1,sts);
		X3=xstp*XEV;
		for(var phase=0;phase<phases;phase++)
		{
			Y=(36+(yspt*phase));
			svg+="<line id=\"svg_13\" y2=\""+Y+"\" x2=\""+(X+X3)+"\" y1=\""+Y+"\" x1=\""+X+"\" stroke=\"#404040\" fill=\"none\" stroke-width=\"8\"/>";
		}
		Y=(36+(yspt*phase));
		svg+="<text fill=\"#000000\" x=\""+X+"\" y=\""+Y+"\" stroke-width=\"0\" font-size=\"14\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">["+XEV+"]</text>";
		X+=X3;
		if(Plan.LCLASYDEXSTP[stp])
		{
			X1=(xstp*parseInt(Plan.LCLASYTMISTP[stp]));
			X2=(xstp*parseInt(Plan.LCLASYTNOSTP[stp]));
			X3=(xstp*parseInt(Plan.LCLASYTMASTP[stp]));
		}
		else
		{
			X1=0;
			X2=0;
			X3=(xstp*parseInt(Plan.LCLASYTNOSTP[stp]));
		}
		for(var phase=0;phase<phases;phase++)
		{
			if(sts==253)
				ccode=0;
			else
				if(sts==254)
					ccode=PHASEs[PLCs[PlcIdx].Phases[phase]].FState;
				else
					ccode=PLCs[PlcIdx].Sts[sts].Colors[phase];
			color="\"#404040\"";
			if ((ccode&0x07)==0x07)
				ccode=0x12;
			if (ccode&1)color="\"#F00000\"";
			if (ccode&2)color="\"#C0C000\"";
			if (ccode&4)color="\"#00A000\"";
			Y=(36+(yspt*phase));
			if (ccode&0x30)
				svg+="<path stroke-dasharray=\"10,10\" d=\"M"+X+" "+Y+" "+(X+X3)+" "+Y+"\" stroke="+color+" fill=\"none\" stroke-width=\"6\" />";
			else
				svg+="<line id=\"svg_13\" y2=\""+Y+"\" x2=\""+(X+X3)+"\" y1=\""+Y+"\" x1=\""+X+"\" stroke="+color+" fill=\"none\" stroke-width=\"8\"/>";
		}
		svg+="<text fill=\"#000000\" x=\""+X+"\" y=\"26\" stroke-width=\"0\" font-size=\"14\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">["+String.fromCharCode(64+Plan.LCLASYSTSSTP[stp])+"]</text>";
		if(X1!=0)
		{
			svg+="<line id=\"svg_13\" y2=\""+(Y+4)+"\" x2=\""+(X+X1)+"\" y1=\"18\" x1=\""+(X+X1)+"\" stroke=\"#000000\" fill=\"none\" stroke-width=\"2\"/>";
			svg+="<line id=\"svg_13\" y2=\""+(Y+4)+"\" x2=\""+(X+X2)+"\" y1=\"18\" x1=\""+(X+X2)+"\" stroke=\"#800080\" fill=\"none\" stroke-width=\"2\"/>";
			svg+="<line id=\"svg_13\" y2=\""+(Y+4)+"\" x2=\""+(X+X3)+"\" y1=\"18\" x1=\""+(X+X3)+"\" stroke=\"#000000\" fill=\"none\" stroke-width=\"2\"/>";
		}
		Y=(36+(yspt*phase));
		svg+="<text fill=\"#000000\" x=\""+X+"\" y=\""+Y+"\" stroke-width=\"0\" font-size=\"14\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">["+Plan.LCLASYTNOSTP[stp]+"]</text>";
		stp=parseInt(Plan.LCLASYSEQSTP[stp]);
		lock++;
	}
	while(stp!=0 && lock<=Plan.LCLASYSEQSTP.length);
	out+="<svg width=\""+(16+(X+X3))+"\" height=\""+(50+(yspt*phases))+"\" xmlns=\"http://www.w3.org/2000/svg\">\
	<rect fill=\"#FFFFFF\" stroke=\"#000000\" stroke-width=\"1\" x=\"1\" y=\"2\" width=\""+(14+(X+X3))+"\" height=\""+(48+(yspt*phases))+"\" />";
	out+="<text fill=\"#000000\" x=\"10\" y=\"13\" stroke-width=\"0\" font-size=\"14\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">["+Text+"]</text>";		
	out+=svg;
	out+="</svg>";
	return out;
}

//===============================================================================
function ModAsyTime(ELMT,J)
{
	var Tmin2=0;
	if(PlanGen.LCLASYSTSSTP[J]<=PLCs[PlcIdx].Sts.length)
	{
		if(PLCs[PlcIdx].Sts[PlanGen.LCLASYSTSSTP[J]-1].TMAX==0 || PLCs[PlcIdx].Sts[PlanGen.LCLASYSTSSTP[J]-1].TMAX>parseInt(ELMT.value))
		{
			Tmin2=GetTmin2(PLCs[PlcIdx],PlanGen.LCLASYSTSSTP[((J+PlanGen.LCLASYSEQSTP.length-1)%PlanGen.LCLASYSEQSTP.length)]-1,PlanGen.LCLASYSTSSTP[J]-1);
			if(ChkParm('PLAN.TIME',parseInt(ELMT.value))==true && (Tmin2<=parseInt(ELMT.value)))
			{
				PlanGen.LCLASYTNOSTP[J]=parseInt(ELMT.value);
				ModParm('PLAN.TIME');
				ShowPlanWizard(3);
			}
			else
				ELMT.value=PlanGen.LCLASYTNOSTP[J];
		}
		else
			ELMT.value=PlanGen.LCLASYTNOSTP[J];
	}
	else
		ELMT.value=PlanGen.LCLASYTNOSTP[J];
}

function ShowPLNASY()
{
	var TRSTP="";
	var TRSTS="";
	var TRTIM="";
	var TRLxD="";
	var TRDELLSTP="";
	var TRCDL="";
	var out="";
	var Tmin2=0;
	for (var j = 0; j<PlanGen.LCLASYSEQSTP.length; j++) 
	{
		PlanGen.LCLASYSEQSTP[j]=parseInt(PlanGen.LCLASYSEQSTP[j]);
		if(!PlanGen.LCLASYSTSSTP[j])
			PlanGen.LCLASYSTSSTP[j]=255;
		PlanGen.LCLASYSTSSTP[j]=parseInt(PlanGen.LCLASYSTSSTP[j]);
		Tmin2=GetTmin2(PLCs[PlcIdx],PlanGen.LCLASYSTSSTP[((j+PlanGen.LCLASYSEQSTP.length-1)%PlanGen.LCLASYSEQSTP.length)]-1,PlanGen.LCLASYSTSSTP[j]-1)
		if(Tmin2<=parseInt(PlanGen.LCLASYTNOSTP[j]))
			PlanGen.LCLASYTNOSTP[j]=parseInt(PlanGen.LCLASYTNOSTP[j]);
		else
			PlanGen.LCLASYTNOSTP[j]=Tmin2;
		PlanGen.LCLASYTEXSTP[j]=parseInt(PlanGen.LCLASYTEXSTP[j]);
		if(Tmin2<=parseInt(PlanGen.LCLASYTMASTP[j]))
			PlanGen.LCLASYTMASTP[j]=parseInt(PlanGen.LCLASYTMASTP[j]);
		else
			PlanGen.LCLASYTMASTP[j]=Tmin2+PlanGen.LCLASYTEXSTP[j];
		if(Tmin2<=parseInt(PlanGen.LCLASYTMISTP[j]))
			PlanGen.LCLASYTMISTP[j]=parseInt(PlanGen.LCLASYTMISTP[j]);
		else
			PlanGen.LCLASYTMISTP[j]=Tmin2;
		PlanGen.LCLASYDEXSTP[j]=parseInt(PlanGen.LCLASYDEXSTP[j]);
		PlanGen.LCLASYDEMSTP[j]=parseInt(PlanGen.LCLASYDEMSTP[j]);
		PlanGen.LCLASYSTPDEM[j]=parseInt(PlanGen.LCLASYSTPDEM[j]);
		PlanGen.LCLASYCLRDEM[j]=0;
		if(PlanGen.LCLASYDEMSTP[j]==0)
			PlanGen.DEMPRI[j]=0;
	}
	PlanGen.LCLASYSTSSTP.length=PlanGen.LCLASYSEQSTP.length;
	PlanGen.LCLASYTNOSTP.length=PlanGen.LCLASYSEQSTP.length;
	PlanGen.LCLASYTMASTP.length=PlanGen.LCLASYSEQSTP.length;
	PlanGen.LCLASYTEXSTP.length=PlanGen.LCLASYSEQSTP.length;
	PlanGen.LCLASYTMISTP.length=PlanGen.LCLASYSEQSTP.length;
	PlanGen.LCLASYDEXSTP.length=PlanGen.LCLASYSEQSTP.length;
	PlanGen.LCLASYDEMSTP.length=PlanGen.LCLASYSEQSTP.length;
	PlanGen.LCLASYSTPDEM.length=PlanGen.LCLASYSEQSTP.length;
	PlanGen.DEMPRI.length=PlanGen.LCLASYSEQSTP.length;
	for (var j = 0; j<PlanGen.LCLASYSEQSTP.length; j++) 
	{
		if(parseInt(PlanGen.LCLASYTNOSTP[j])==0)
			PlanGen.LCLASYTNOSTP[j]=10;
		if(PlanGen.LCLASYDEMSTP[j])
			PlanGen.LCLASYCLRDEM[PlanGen.LCLASYSTPDEM[j]]=PlanGen.LCLASYDEMSTP[j];
	}
	out+="<table width=\"100%\" border=\"1\" align=\"rigth\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"#c0c0c0\">\n";
	out+="<tr>";
	out+="<td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">";
	if(parseInt(PlanGen.PLNTYP)==0)
		out+="[ Aislado ]";
	else
		out+="[ Sincronizado ]";
	out+="</font></td>\n";
	out+="<td align=\"rigth\" valign=\"middle\">";
	//----------------------------------------
	out+="<select class=\"INTEXT\" onchange=\"PlanGen.PHC=parseInt(this.value);ShowPlanWizard(3);\">\n";
	out+="<option value=\"0\">"+Str_Default+" "+Str_OTU_Menu2+"</option>\n";
	for(var i=1;i<=PLCs[PlcIdx].EV.length;i++)
	{
		out+="<option value=\""+i+"\"";
		if(PlanGen.PHC==i)out+=" selected=\"selected\"";
		out+=">"+Str_OTU_Menu2+" "+i+"</option>\n";
	}
	out+="</select>\n";
	//----------------------------------------
	out+="</td>\n";
	out+="<td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\"></font>";
	out+="</td>\n";
	out+="</tr>\n";
	TRSTP="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\"><input type=\"button\" class=\"INTEXT2\" value=\""+Str_Add_Step+"\" size=\"10\" onclick=\"PlanGen.LCLASYSEQSTP.push(0);ShowPlanWizard(3);\" tabindex=\"1\" /></font></td>\n";
	TRSTS="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">"+Str_Stss+"</font></td>\n";
	TRTIM="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">"+Str_Times+"</font></td>\n";
	TRLxD="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">"+Str_jumps+"</font></td>\n";
	TRCDL="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">"+Str_free_dem+"</font></td>\n";
	TRDELLSTP="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\"></font></td>\n";
	for (var j = 0; j<PlanGen.LCLASYSEQSTP.length; j++) 
	{
		//-----------------------------------------------------------
		TRSTP+="<td align=\"left\" valign=\"middle\">\n";
		TRSTP+="<select tabindex=\""+(2+(10*j))+"\" class=\"INTEXT\" onchange=\"PlanGen.LCLASYSEQSTP["+j+"]=parseInt(this.value);ShowPlanWizard(3);\">\n";
		var select=0;
		for(var i=0;i<PlanGen.LCLASYSEQSTP.length;i++)
		{
			if(ChkJmp(PlanGen.LCLASYSTSSTP[j],PlanGen.LCLASYSTSSTP[(i%PlanGen.LCLASYSEQSTP.length)]))
			{
				TRSTP+="<option value=\""+i+"\" ";
				if(PlanGen.LCLASYSEQSTP[j]==i)
				{
					TRSTP+=" selected=\"selected\"";
					select=(i+1);
				}
				TRSTP+=">"+Str_FromStep+(j+1)+Str_ToStep+(i+1)+"</option>\n";
			}
		}
		if(!select)
			PlanGen.LCLASYSEQSTP[j]=0;
		TRSTP+="</select>\n";
		TRSTP+="</td>\n";
		//-----------------------------------------------------------
		TRSTS+="<td align=\"left\" valign=\"top\">\n";
		TRSTS+="<select  tabindex=\""+(3+(10*j))+"\" class=\"INTEXT\" onchange=\"PlanGen.LCLASYSTSSTP["+j+"]=parseInt(this.value);ShowPlanWizard(3);\">\n";
		TRSTS+="<option value=\"255\" ";
		if(PlanGen.LCLASYSTSSTP[j]==255)TRSTS+=" selected=\"selected\"";
		TRSTS+=">FF</option>\n";
		var select=0;
		for(var i=0;i<PLCs[PlcIdx].Sts.length;i++)
		{
			if(ChkJmp(PlanGen.LCLASYSTSSTP[((j+PlanGen.LCLASYSEQSTP.length-1)%PlanGen.LCLASYSEQSTP.length)],(i+1)))
			{
				TRSTS+="<option value=\""+(i+1)+"\" ";
				if(PlanGen.LCLASYSTSSTP[j]==(i+1))
				{
					TRSTS+=" selected=\"selected\"";
					select=(i+1);
				}
				TRSTS+=">"+String.fromCharCode(65+i)+"</option>\n";
			}
		}
		//if(!select)PlanGen.LCLASYSTSSTP[j]=255;
		TRSTS+="</select>\n";
		TRSTS+="</td>\n";
		//-----------------------------------------------------------
		TRTIM+="<td align=\"left\" valign=\"top\">\n";
		TRTIM+="<select tabindex=\""+(5+(10*j))+"\" class=\"INTEXT\" onchange=\"PlanGen.LCLASYDEXSTP["+j+"]=parseInt(this.value);ShowPlanWizard(3);\">\n";
		TRTIM+="<option value=\"0\">No "+Str_variable_time+"</option>\n";
		for(var i=1;i<=(HW_IOS+parseInt(GlobalParms.Inputs)+parseInt(GlobalParms.Loops));i++)
		{
			TRTIM+="<option value=\""+i+"\" ";
			if(PlanGen.LCLASYDEXSTP[j]==i)TRTIM+=" selected=\"selected\"";
			TRTIM+=">dem "+i+"</option>\n";
		}
		TRTIM+="</select>\n";
		TRTIM+=Str_Typo_of_STS+"<br />";
		if(PlanGen.LCLASYDEXSTP[j]!=0)
		{
			TRTIM+="<input tabindex=\""+(6+(10*j))+"\" type=\"text\" class=\"INTEXT\" value=\""+PlanGen.LCLASYTMASTP[j]+"\" size=\"3\" maxlength=\"3\" onchange=\"if(parseInt(this.value)>PlanGen.LCLASYTMISTP["+j+"]){PlanGen.LCLASYTMASTP["+j+"]=parseInt(this.value);}else{this.value=PlanGen.LCLASYTMASTP["+j+"];}ShowPlanWizard(3);\"/>\n";
			TRTIM+=Str_Max_Time_STS+"<br />";
			TRTIM+="<input tabindex=\""+(7+(10*j))+"\" type=\"text\" class=\"INTEXT\" value=\""+PlanGen.LCLASYTEXSTP[j]+"\" size=\"3\" maxlength=\"3\" onchange=\"if(PlanGen.LCLASYTMISTP["+j+"]>=parseInt(this.value)){PlanGen.LCLASYTEXSTP["+j+"]=parseInt(this.value);}else{this.value=PlanGen.LCLASYTEXSTP["+j+"];}ShowPlanWizard(3);\"/>\n";
			TRTIM+=Str_Ext_Time_STS+"<br />";
			TRTIM+="<input tabindex=\""+(8+(10*j))+"\" type=\"text\" class=\"INTEXT\" value=\""+PlanGen.LCLASYTMISTP[j]+"\" size=\"3\" maxlength=\"3\" onchange=\"if(parseInt(this.value)>=PlanGen.LCLASYTEXSTP["+j+"]){PlanGen.LCLASYTMISTP["+j+"]=parseInt(this.value);}else{this.value=PlanGen.LCLASYTMISTP["+j+"];}ShowPlanWizard(3);\"/>\n";
			TRTIM+=Str_Min_Time_STS+"<br />";
		}
		TRTIM+="<input tabindex=\""+(4+(10*j))+"\" type=\"text\" class=\"INTEXT\" value=\""+PlanGen.LCLASYTNOSTP[j]+"\" size=\"3\" maxlength=\"3\" onchange=\"ModAsyTime(this,"+j+");\"/>\n";
		if(PlanGen.LCLASYDEXSTP[j]!=0)
			TRTIM+=Str_Fail_DEX_Time_STS+"<br />";
		else
			TRTIM+=Str_Normal_Time_STS+"<br />";
		TRTIM+="</td>\n";
		//-----------------------------------------------------------
		TRLxD+="<td align=\"left\" valign=\"top\">\n";
		TRLxD+="<select tabindex=\""+(9+(10*j))+"\" class=\"INTEXT\" onchange=\"PlanGen.LCLASYDEMSTP["+j+"]=parseInt(this.value);PlanGen.DEMPRI["+j+"]=0;ShowPlanWizard(3);\">\n";
		TRLxD+="<option value=\"0\">"+Str_not_jump+"</option>\n";
		for(var i=1;i<=(HW_IOS+parseInt(GlobalParms.Inputs)+parseInt(GlobalParms.Loops));i++)
		{
			TRLxD+="<option value=\""+i+"\" ";
			if(PlanGen.LCLASYDEMSTP[j]==i)TRLxD+=" selected=\"selected\"";
			TRLxD+=">Demanda "+i+"</option>\n";
		}
		TRLxD+="</select>\n";
		if(PlanGen.LCLASYDEMSTP[j])
		{
			TRLxD+="<select tabindex=\""+(10+(10*j))+"\" class=\"INTEXT\" onchange=\"if(this.value){PlanGen.LCLASYSTPDEM["+j+"]=parseInt(this.value);ShowPlanWizard(3);}\">\n";
			var select=0;
			for(var i=0;i<PlanGen.LCLASYSEQSTP.length;i++)
			{
				if(ChkJmp(PlanGen.LCLASYSTSSTP[j],PlanGen.LCLASYSTSSTP[(i%PlanGen.LCLASYSEQSTP.length)]))
				{
					TRLxD+="<option value=\""+i+"\" ";
					if(PlanGen.LCLASYSTPDEM[j]==i)
					{
						TRLxD+=" selected=\"selected\"";
						select=(i+1);
					}
					TRLxD+=">"+Str_goto_Step+(i+1)+"</option>\n";
				}
			}
			if(!select)
				PlanGen.LCLASYSTPDEM[j]=0;
			TRLxD+="</select>\n";
			if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
			{
				TRLxD+="["+Str_Priority+"<input type=\"checkbox\" onchange=\"if(this.checked==true){PlanGen.DEMPRI["+j+"]=PlanGen.LCLASYDEMSTP["+j+"];}else{PlanGen.DEMPRI["+j+"]=0;}ShowPlanWizard(3);\" ";
				if(PlanGen.DEMPRI[j]!=0)
					TRLxD+= "checked=\"checked\"";
				TRLxD+= "/> ]";
			}
		}
		TRLxD+="</td>\n";
		//-----------------------------------------------------------
		TRCDL+="<td align=\"right\" valign=\"top\">\n";
		if(PlanGen.LCLASYCLRDEM[j])
			TRCDL+="<font size=\"1\" face=\"arial\">Limpa Dem["+PlanGen.LCLASYCLRDEM[j]+"]</font>\n";
		else
			TRCDL+=" ";
		TRCDL+="</td>\n";
		//-----------------------------------------------------------
		TRDELLSTP+="<td align=\"left\" valign=\"top\">\n";
		TRDELLSTP+="<input tabindex=\""+(11+(10*j))+"\" type=\"button\" class=\"INTEXT2\" value=\""+Str_Del_Sep+"\" size=\"10\" onclick=\"\
		PlanGen.LCLASYSEQSTP.splice("+j+",1);\
		PlanGen.LCLASYSTSSTP.splice("+j+",1);\
		PlanGen.LCLASYTNOSTP.splice("+j+",1);\
		PlanGen.LCLASYTMASTP.splice("+j+",1);\
		PlanGen.LCLASYTEXSTP.splice("+j+",1);\
		PlanGen.LCLASYTMISTP.splice("+j+",1);\
		PlanGen.LCLASYDEXSTP.splice("+j+",1);\
		PlanGen.LCLASYDEMSTP.splice("+j+",1);\
		PlanGen.LCLASYSTPDEM.splice("+j+",1);\
		PlanGen.LCLASYCLRDEM.splice("+j+",1);\
		ShowPlanWizard(3);\"/>";
		TRDELLSTP+="</td>\n";
		//-----------------------------------------------------------
	}
	TRSTS+="</tr>\n";
	TRTIM+="</tr>\n";
	TRSTP+="</tr>\n";
	TRLxD+="</tr>\n";
	TRCDL+="</tr>\n";
	TRDELLSTP+="</tr>\n";
	out+=TRSTP;
	out+=TRSTS;
	out+=TRTIM;
	out+=TRLxD;
	out+=TRCDL;
	out+=TRDELLSTP;
	out+="</table>\n";
	return out;
}

function SaveAplan(PLC,Parms,Plan)
{
	if(Plan.PHC!=0)
		SetPhConf(PLC.EV[Plan.PHC-1]);
	else
		SetPhConf(Parms.phconf);
	UpdateAsy1(PLC,Plan);
	var out="\tgoto INICIO\n";
	var i=0;
	var DEMPRI= new Array();
	Plan.CHGSTSSTP= new Array();
	for(var j=0;j<PLC.Sts.length;j++) 
	{
		Plan.CHGSTSSTP[j]=0;
		if((i=Plan.LCLASYSTSSTP.indexOf(j+1))!=-1)
			Plan.CHGSTSSTP[j]=i;
	}
	//---------------------------------------------------------
	if(Parms.MODEL.indexOf("M3")!=-1)
		out+="#CFT:sec.sec;\n";
	else
		out+="#CFT:"+PLC.Sec.replace("//","/")+";\n";
	out+="#MCT:\n";
	out+=IniPlan;
	out+="//--------------------------------------------\n";
	out+="PLCS="+((1<<Parms.Controllers)-1)+"\n";
	out+="STS2STP,0,"+Plan.CHGSTSSTP.toString()+"\n";
	out+="//--------------------------------------------\n";
	if(PLC.McPlan)
	{
		if(PLC.McPlan.SYCPLCTOU)
			out+="SYPTO="+PLC.McPlan.SYCPLCTOU+"\n";
		if(PLC.McPlan.MACSEQSTP)
			out+="SIMC,"+PLC.McPlan.MACSEQSTP.toString()+"\n";
		if(PLC.McPlan.MACSTSSTP)
			out+="MCSS,"+PLC.McPlan.MACSTSSTP.toString()+"\n";
	}
	out+="//--------------------------------------------\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		if(PLC.OTUPlan)
		{
			if(PLC.OTUPlan.OTUSEQSTS)
			{
				out+="EOTU,1,"+PLC.OTUPlan.OTUSEQSTS.toString();
				for(var j=PLC.OTUPlan.OTUSEQSTS.length;j<PLC.Sts.length;j++) 
				{
					out+=",1";
				}
				out+="\n";
			}
			if(PLC.OTUPlan.OTUDEMSTS)
				out+="UxD,"+PLC.OTUPlan.OTUDEMSTS.toString()+",0\n";
			if(PLC.OTUPlan.OTUSTSDEM)
				out+="UDG,"+PLC.OTUPlan.OTUSTSDEM.toString()+",0\n";
			if(PLC.OTUPlan.OTUDEMCLR)
				out+="UCD,0,"+PLC.OTUPlan.OTUDEMCLR.toString()+",0\n";
		}
	}
	out+="//--------------------------------------------\n";
	out+="CHGP="+Plan.LCLCHGPLN+"\n";
	out+="SIPL,"+Plan.LCLASYSEQSTP.toString()+"\n";
	out+="EIPL,"+Plan.LCLASYSTSSTP.toString()+"\n";
	out+="//--------------------------------------------\n";
	out+="TNP"
	for(var j=0;j<Plan.LCLASYTNOSTP.length;j++)
		out+=","+(Plan.LCLASYTNOSTP[j]*1000)
	out+="\n";
	out+="DACT,"+Plan.LCLASYDEXSTP.toString()+"\n";
	out+="TXP";
	for(var j=0;j<Plan.LCLASYTEXSTP.length;j++)
	{
		if(Plan.LCLASYDEXSTP[j]!=0)
			out+=","+(Plan.LCLASYTEXSTP[j]*1000);
		else
			out+=",0";
	}
	out+="\n";
	if(Parms.MODEL.indexOf("GW4")!=-1 || Parms.MODEL.indexOf("GW")==-1)
	{
		out+="TIP";
		for(var j=0;j<Plan.LCLASYTMISTP.length;j++)
		{
			if(Plan.LCLASYDEXSTP[j]!=0)
				out+=","+((Plan.LCLASYTMISTP[j]-Plan.LCLASYTEXSTP[j])*1000);
			else
				out+=",0";
		}
		out+="\n";
		out+="TAP";
		for(var j=0;j<Plan.LCLASYTMASTP.length;j++)
		{
			if(Plan.LCLASYDEXSTP[j]!=0)
				out+=","+((Plan.LCLASYTMASTP[j]-(Plan.LCLASYTMISTP[j]-Plan.LCLASYTEXSTP[j]) )*1000);
			else
				out+=",0";
		}
	}
	else
	{
		out+="TIP";
		for(var j=0;j<Plan.LCLASYTMISTP.length;j++)
			out+=","+(Plan.LCLASYTMISTP[j]*1000)
		out+="\n";
		out+="TAP";
		for(var j=0;j<Plan.LCLASYTMASTP.length;j++)
			out+=","+(Plan.LCLASYTMASTP[j]*1000)
	}		
	out+="\n";
	out+="//--------------------------------------------\n";
	out+="LxD,"+Plan.LCLASYDEMSTP.toString()+"\n";
	out+="LgI,"+Plan.LCLASYSTPDEM.toString()+"\n";
	out+="CDL,"+Plan.LCLASYCLRDEM.toString()+"\n";
	out+="PRI,"+Plan.DEMPRI.toString()+"\n";
	out+="//--------------------------------------------\n";
	out+="Tmax,0"
	for(var j=0;j<PLC.Sts.length;j++)
		out+=","+PLC.Sts[j].TMAX;
	out+="\n";
	for(var j=0;j<PLC.Sts.length;j++)
	{
		RemoveUnusedItem(PLC.Sts[j].Colors);
		out+="Color"+(j+1)+","+PLC.Sts[j].Colors.toString()+"\n";
	}
	out+="ColorVT";
	for(var j=0;j<PLC.Phases.length;j++)
		out+=",1";
	out+="\n";
	out+="ColorFF";
	for(var j=0;j<PLC.Phases.length;j++)
		out+=","+PHASEs[PLC.Phases[j]].FState;
	out+="\n";
	out+="ColorSL";
	for(var j=0;j<PLC.Phases.length;j++)
		out+=",0";
	out+="\n";
	out+="//--------------------------------------------\n";
	out+="SETSTS\n";
	for (var j = 0; j<PLC.Sts.length; j++) 
	{
		out+="\t!= "+(j+1)+" Nsts\n";
		out+="\tphases Color"+(j+1)+"\n";
	}
	out+="\t== 255 Nsts FLAS\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		out+="\tmov 0 otu.fr\n";
	}
	out+="\t== 254 Nsts SLOF\n";
	out+="\t== Nsts Csts\n";
	out+="\tmov TIMERS tstart\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		out+="\tmov Nsts otu.step\n";
	}
	out+="\tmov Nsts Csts\n";
	out+="\treturn\n";
	out+="//--------------------------------------------\n";
	out+="INICIO\n"; 
	//if(Parms.MODEL.indexOf("M4")!=-1)
	{
		if(Plan.PHC!=0)
			out+="ldphc /"+PlcIdx+"/phc"+Plan.PHC+".ini\n";
		else
			out+="ldphc /phconf.ini\n";
	}
	if(Parms.MODEL.indexOf("GW4")!=-1 || Parms.MODEL.indexOf("GW")==-1)
	{
		out+="clrpri\n";
	}	
	out+=SelIObyModel(Parms.MODEL);
	if(SwEnMc!=0)
	{
		out+="mov 1 io["+SwEnMc+"].rdy\n";
		out+="mov 1 io["+SwEnMc+"].wmu\n";
	}
	if(SwCmMc!=0)
		out+="mov io["+SwCmMc+"].val MCTR\n";
	out+="mov TIMERS tstart\n\
	sub 1 tstart\n\
	goto MAIN\n\
	\n\
	MAIN\n";
	if(SwEnMc!=0)
		out+="mov 1 io["+SwEnMc+"].rdy\n";
	out+="> Csts 253 NOMAX\n\
	== Tmax[Csts] 0 NOMAX\n\
	mov TIMERS temp\n\
	sub tstart temp\n\
	> Tmax[Csts] temp\n\
	call LOCKSTS\n\
	NOMAX\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		out+="== 1 otu.faislado NOCTRLO\n\
		== 1 otu.sl CTRLOTU\n\
		== 1 otu.ff CTRLOTU\n\
		== 0 otu.aislado CTRLOTU\n";
	}
	out+="NOCTRLO\n";
	if(SwEnMc!=0)
	{
		out+="mov 1 io["+SwEnMc+"].enable\n";
		out+="== 1 io["+SwEnMc+"].in CTRMAN\n";
	}
	out+="goto CTRLISO\n\
	\n\
	CTRMAN\n\
	mov 1 Nmode\n\
	call CHKMODE\n\
	delay 1000\n";
	if(SwCmMc!=0)
		out+="== io["+SwCmMc+"].val MCTR MAIN\n";
	out+="WAITBTOFF\n\
	delay 200\n";
	if(SwCmMc!=0)
		out+="== 1 io["+SwCmMc+"].in WAITBTOFF\n";
	out+="mov SIMC[Cstp] Nstp\n";
	if(OutAdv!=0)
		out+="mov 0 io["+OutAdv+"].val\n";
	out+="FSTP0\n\
	mov Nstp Cstp\n\
	mov MCSS[Cstp] Nsts\n\
	call SETSTS\n\
	tmin\n\
	mov 0 temp\n\
	KEEPWAIT\n\
	delay 1000\n\
	add 1000 temp\n\
	mov 3 PLC[THIS].vsync\n";
	if(SwEnMc!=0)
		out+="== 0 io["+SwEnMc+"].in OUTWAIT\n";
	out+="> temp SYPTO\n\
	ifpsync PLCS KEEPWAIT\n\
	OUTWAIT\n\
	wkuplc PLCS\n\
	delay 2000\n\
	mov 0 PLC[THIS].vsync\n";
	if(SwCmMc!=0)
		out+="mov io["+SwCmMc+"].val MCTR\n";
	if(OutAdv!=0)
		out+="mov 255 io["+OutAdv+"].val\n";
	out+="goto MAIN\n\
	\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		out+="CTRLOTU\n\
		mov 2 Nmode\n\
		call CHKMODE\n\
		mov EOTU[Csts] Tsts\n\
		mov 0 wait\n\
		call FNCDemOTU\n\
		otu Tsts Nsts\n\
		chksts Nsts otu.step\n\
		mov otu.step Nsts\n\
		time 2000\n\
		== Nsts Csts\n\
		call CLDsts\n\
		call SETSTS\n\
		goto MAIN\n";
	}
	out+="\n\
	CTRLISO\n\
	mov 0 Nmode\n\
	call CHKMODE\n\
	mov SIPL[Cstp] Nstp\n";
	if(Parms.MODEL.indexOf("GW4")==-1)
	{
		out+="call CLDstp\n";
	}
	//out+="ldeil\n";	
	out+="call FNCDemISO\n\
	== Nstp Cstp SAMESTP\n\
	mov EIPL[Nstp] Nsts\n\
	mov Nstp Cstp\n\
	!= Cstp CHGP SAMESTP\n";
	if(Parms.Version)
	{
		var ver=Parms.Version;
		ver%=1000000;
		if(ver<180800)
		{
			out+="mov 1 PLC[THIS].NexChg;\n";
		}
	}
	else
	{
		out+="mov 1 PLC[THIS].NexChg;\n";
	}
	out+="agenda\n";
	out+="ldeil\n";
	if(Parms.MODEL.indexOf("GW4")!=-1 || Parms.MODEL.indexOf("GW")==-1)
	{
		out+="== io["+SwFF+"].in 0 SAMESTP\n";
		out+="phases ColorVT\n";
		out+="delay 3000\n";
		out+="KEPISFF\n";
		out+="phases ColorFF\n";
		out+="delay 5000\n";
		out+="!= io["+SwFF+"].in 0 KEPISFF\n";
		out+="phases ColorVT\n";
		out+="delay 3000\n";
		out+="call LOCAL\n";
	}
	out+="FSTPL\n\
	SAMESTP\n\
	call SETSTS\n";
	if(Parms.MODEL.indexOf("GW4")!=-1 || Parms.MODEL.indexOf("GW")==-1)
	{
		out+="call CLDstp\n";
		out+="call PRIstp\n";
	}
	out+="== 0 DACT[Cstp] STPNACT\n\
	mov DACT[Cstp] temp\n";
	out+="== 1 io[temp].fail STPNACT\n";
	out+="delay TIP[Cstp]\n";
	out+="xtime io[temp].val TXP[Cstp] TAP[Cstp]\n";
	out+="goto MAIN\n\
	STPNACT\n\
	time TNP[Cstp]\n\
	goto MAIN\n\
	\n\
	FNCDemISO\n\
	mov LxD[Cstp] temp\n\
	!= 0 temp\n\
	return\n\
	!= io[temp].inh 0\n\
	return\n\
	mov 1 DEMA\n\
	mov LgI[Cstp] Nstp\n\
	return\n\n";

	out+="CLDstp\n\
	== 1 DEMA\n\
	return\n\
	!= CDL[Cstp] 0\n\
	return\n\
	mov CDL[Cstp] temp\n\
	mov 0 DEMA\n\
	mov 0 io[temp].inh\n\
	mov 0 io[temp].wmu\n\
	return\n\n";
	if(Parms.MODEL.indexOf("GW4")!=-1 || Parms.MODEL.indexOf("GW")==-1)
	{
		out+="PRIstp\n\
		!= 0 PRI[Cstp]\n\
		return\n\
		mov PRI[Cstp] temp\n\
		mov 1 io[temp].wmu\n\
		return\n\n";
	}
	out+="FLAS\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		out+="== 1 otu.ff FLASCENTRAL\n\
		mov 1 otu.fr\n";
	}
	out+="phases ColorFF\n\
	return\n\
	\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		out+="FLASCENTRAL\n\
		phases ColorVT\n\
		delay 2000\n\
		mov 0 temp\n\
		WAITFF\n\
		delay 1000\n\
		add 1000 temp\n\
		mov 1 PLC[THIS].vsync\n\
		== 0 otu.ff KEPFF\n\
		> temp SYPTO\n\
		ifpsync PLCS WAITFF\n\
		wkuplc PLCS\n\
		KEPFF\n\
		mov 0 otu.sr\n\
		mov 1 otu.fr\n\
		phases ColorFF\n\
		delay 2000\n\
		== 1 otu.sl KEPSL\n\
		== 1 otu.ff KEPFF\n\
		mov 0 PLC[THIS].vsync\n\
		phases ColorVT\n\
		delay 3000\n\
		mov TIMERS tstart\n\
		mov 3 Cmode\n\
		mov 0 otu.step\n\
		mov 0 otu.fr\n\
		return MAIN\n\
		\n\
		SLOF\n\
		mov 1 otu.faislado\n\
		phases ColorVT\n\
		delay 2000\n\
		mov 0 temp\n\
		WAITSL\n\
		delay 1000\n\
		add 1000 temp\n\
		mov 1 PLC[THIS].vsync\n\
		== 0 otu.sl KEPSL\n\
		> temp SYPTO\n\
		ifpsync PLCS WAITSL\n\
		wkuplc PLCS\n\
		KEPSL\n\
		mov 1 otu.faislado\n\
		mov 0 otu.fr\n\
		mov 1 otu.sr\n\
		phases ColorSL\n\
		delay 2000\n\
		== 1 otu.sl KEPSL\n\
		mov 0 PLC[THIS].vsync\n\
		mov 0 otu.faislado\n\
		== 1 otu.ff KEPFF\n\
		phases ColorFF\n\
		delay 5000\n\
		phases ColorVT\n\
		delay 3000\n\
		mov TIMERS tstart\n\
		mov 3 Cmode\n\
		mov 0 otu.step\n\
		mov 0 otu.sr\n\
		return MAIN\n\
		\n\
		CLDsts\n\
		== 0 otu.aislado\n\
		return\n\
		mov UCD[Csts] temp\n\
		== 0 temp\n\
		mov 0 io[temp].inh\n\
		return\n\
		\n\
		FNCDemOTU\n\
		mov UxD[wait] temp\n\
		== 0 temp NDOTU\n\
		== io[temp].inh 0\n\
		mov UDG[wait] Tsts\n\
		add 1 wait\n\
		goto FNCDemOTU\n\
		NDOTU\n\
		== 0 otu.sl\n\
		mov 254 Tsts\n\
		== 0 otu.ff\n\
		mov 255 Tsts\n\
		return\n\
		\n";
	}
	out+="LOCKSTS\n\
	== Nmode 0 LKM0\n\
	== Nmode 1 LKM1\n\
	== Nmode 2 LKM2\n\
	LKM0\n\
	error 16 'TiempoMaximo\n\
	return\n\
	LKM1\n";
	if(SwEnMc!=0)
		out+="mov 1 io["+SwEnMc+"].fail\n";
	out+="return\n\
	LKM2\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		out+="mov 1 otu.faislado\n";
	}
	out+="return\n\
	\n\
	CHKMODE\n\
	!= Nmode Cmode\n\
	return\n\
	== Nmode 0 LOCAL\n\
	== Nmode 1 MANUAL\n\
	== Nmode 2 CENTRAL\n\
	mov Nmode Cmode\n\
	return\n\
	\n\
	MANUAL\n";
	if(OutAdv!=0)
		out+="mov 0 io["+OutAdv+"].val\n";
	if(OutMc!=0)
		out+="mov 255 io["+OutMc+"].val\n";
	if(OutRemote!=0)
		out+="mov 0 io["+OutRemote+"].val\n";
	out+="mov TIMERS tstart\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		out+="mov 1 otu.mc\n";
	}
	out+="mov 0 Nstp\n";
	if(SwFF!=0)
		out+="mov 1 io["+SwFF+"].enable\n";
	out+="mov Nmode Cmode\n";
	if(SwEnMc!=0)
	{
		out+="mov 0 io["+SwEnMc+"].wmu\n";
		out+="== 0 io["+SwEnMc+"].in\n";
	}
	out+="return FSTP0\n\
	return MAIN\n\
	\n\
	CENTRAL\n";
	if(OutAdv!=0)
		out+="mov 0 io["+OutAdv+"].val\n";
	if(OutMc!=0)
		out+="mov 0 io["+OutMc+"].val\n";
	if(OutRemote!=0)
		out+="mov 255 io["+OutRemote+"].val\n";
	out+="mov TIMERS tstart\n\
	mov 0 Csts\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		out+="mov 0 otu.mc\n";
	}
	if(SwFF!=0)
		out+="mov 0 io["+SwFF+"].enable\n";
	if(SwEnMc!=0)
	{
		out+="mov 0 io["+SwEnMc+"].rdy\n";
		out+="mov 0 io["+SwEnMc+"].wmu\n";
		out+="mov 0 io["+SwEnMc+"].enable\n";
		out+="mov 0 io["+SwEnMc+"].fail\n";
	}
	out+="mov Nmode Cmode\n\
	return\n";
	out+="\n\
	LOCAL\n";
	if(OutAdv!=0)
		out+="mov 0 io["+OutAdv+"].val\n";
	if(OutMc!=0)
		out+="mov 255 io["+OutMc+"].val\n";
	if(OutRemote!=0)
		out+="mov 0 io["+OutRemote+"].val\n";
	out+="mov TIMERS tstart\n";
	if(Parms.MODEL.indexOf("RT")!=-1)
	{
		out+="mov 0 otu.mc\n";
	}
	if(SwFF!=0)
		out+="mov 1 io["+SwFF+"].enable\n";
	if(SwEnMc!=0)
	{
		out+="mov 1 io["+SwEnMc+"].rdy\n";
		out+="mov 1 io["+SwEnMc+"].wmu\n";
		out+="mov 1 io["+SwEnMc+"].enable\n";
		out+="mov 0 io["+SwEnMc+"].fail\n";
	}
	out+="mov 0 Nstp\n\
	!= Cmode 2\n\
	mov STS2STP[Csts] Nstp\n\
	mov Nstp Cstp\n\
	mov EIPL[Nstp] Nsts\n\
	mov Nmode Cmode\n\
	return FSTPL\n";
	out+=EndPlan;
	return out;
}
//===============================================================================
percent=75;

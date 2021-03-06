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
function UpdateNTCIP(PLC,Plan)
{
	var sts=0;
	var sts1=0;
	var stp=0;
	var X3=0;
	var TC=0;
	var XEV=0;
	Plan.PLNTYP=parseInt(Plan.PLNTYP);
	Plan.PHC=parseInt(Plan.PHC);
	//-------------------------------------------------
	while(Plan.LCLSYCSTSSTP.length<Plan.LCLSYCSEQSTP.length)
		Plan.LCLSYCSTSSTP.push(0);
	while(Plan.LCLSYCTSTSTP.length<Plan.LCLSYCSEQSTP.length)
		Plan.LCLSYCTSTSTP.push(0);
	while(Plan.LCLSYCDEMSTP.length<Plan.LCLSYCSEQSTP.length)
		Plan.LCLSYCDEMSTP.push(0);
	while(Plan.LCLSYCDEMSTS.length<Plan.LCLSYCSEQSTP.length)
		Plan.LCLSYCDEMSTS.push(0);
	while(Plan.LCLSYCCLRDEM.length<Plan.LCLSYCSEQSTP.length)
		Plan.LCLSYCCLRDEM.push(0);
	while(Plan.DEMPRI.length<Plan.LCLSYCSEQSTP.length)
		Plan.DEMPRI.push(0);
	Plan.LCLSYCSTSSTP.length=Plan.LCLSYCSEQSTP.length;
	Plan.LCLSYCTSTSTP.length=Plan.LCLSYCSEQSTP.length;
	Plan.LCLSYCDEMSTP.length=Plan.LCLSYCSEQSTP.length;
	Plan.LCLSYCDEMSTS.length=Plan.LCLSYCSEQSTP.length;
	Plan.DEMPRI.length=Plan.LCLSYCSEQSTP.length;
	//-------------------------------------------------
	for(var lock=0;lock<Plan.LCLSYCSEQSTP.length;lock++)
	{
		X3=parseInt(Plan.LCLSYCTSTSTP[stp]);
		sts=parseInt(Plan.LCLSYCSTSSTP[stp])-1;
		stp=parseInt(Plan.LCLSYCSEQSTP[stp]);
		sts1=parseInt(Plan.LCLSYCSTSSTP[stp])-1;
		XEV=GetEvT(PLC,sts,sts1);
		TC+=X3+XEV;
	}
	Plan.LCLSYCTCI=parseInt(TC);
}

function DrawPlnNTCIP(Plan,Text)
{
	var out=""
	var phases=PLCs[PlcIdx].Phases.length;
	var TC=0;
	var sts=0;
	var sts1=0;
	var color=0;
	var ccode=0;
	var Error="";
	var svg="";
	var Y=0;
	var X=0;
	var X3=0;
	var Tm=0;
	var XEV=0;
	var nstp=0;
	var stp=0;
	//-------------------------------------------------
	for(var lock=0;lock<Plan.LCLSYCSEQSTP.length;lock++)
	{
		X3=parseInt(Plan.LCLSYCTSTSTP[stp]);
		sts=parseInt(Plan.LCLSYCSTSSTP[stp])-1;
		stp=parseInt(Plan.LCLSYCSEQSTP[stp]);
		sts1=parseInt(Plan.LCLSYCSTSSTP[stp])-1;
		XEV=GetEvT(PLCs[PlcIdx],sts,sts1);
		TC+=X3+XEV;
	}
	Plan.LCLSYCTCI=parseInt(TC);
	//-------------------------------------------------
	var fullscaleX = document.body.clientWidth;
	fullscaleX-=((fullscaleX/100)*15);	// -%15
	fullscaleX=Math.round(fullscaleX);
	fullscaleX-=(fullscaleX%TC);
	var	xstp = fullscaleX/TC;
		xstp=Math.round(xstp);
	var fullscaleY = document.body.clientHeight;
	var yspt = 14;
	yspt=Math.round(yspt);
	//------------------------------------------------
	stp=0;
	sts0=parseInt(Plan.LCLSYCSTSSTP[Plan.LCLSYCSEQSTP.length-1])-1;
	for(var lock=0;lock<Plan.LCLSYCSEQSTP.length;lock++)
	{
		//-------------------------------------------------------------------------------------------------------------------------------------------- Tiempo de Estado
		nstp=parseInt(Plan.LCLSYCSEQSTP[stp]);
		sts=parseInt(Plan.LCLSYCSTSSTP[stp])-1;
		sts1=parseInt(Plan.LCLSYCSTSSTP[nstp])-1;
		X3=parseInt(Plan.LCLSYCTSTSTP[stp]);
		svg+="<text fill=\"#000000\" x=\""+(X*xstp)+"\" y=\"26\" stroke-width=\"0\" font-size=\"10\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">\
		["+String.fromCharCode(64+Plan.LCLSYCSTSSTP[stp])+":"+X3+"s]</text>";
		//Stp:"+stp+" Sts: svg+="<line id=\"svg_13\" x1=\""+X+"\" x2=\""+X+"\" y1=\""+10+"\" y2=\""+200+"\" stroke=\"#F000F0\" fill=\"none\" stroke-width=\"2\"/>";
		//-----------------------------------------
		for(var phase=0;phase<phases;phase++)
		{
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
			}
			Y=(36+(yspt*phase));
			svg+=MkLine(ccode,color,Y,(X*xstp),((X+X3)*xstp),0,fullscaleX);
		}
		//-------------------------------------------------------------------------------------------------------------------------------------------- Tiempo Minimo de Estado
		{
			Tm=0;
			if(sts0!=sts)
				Tm=GetTmin2(PLCs[PlcIdx],sts0,sts);
			if(Tm)
			{
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
					if (ccode&1)color="\"#800000\"";
					if (ccode&2)color="\"#606000\"";
					if (ccode&4)color="\"#008000\"";
					Y=(36+(yspt*phase));
					svg+=MkLine(ccode,color,Y,(X*xstp),((X+Tm)*xstp),0,fullscaleX);
				}
				Y=(36+(yspt*phases));
				svg+="<text fill=\"#000000\" x=\""+(X*xstp)+"\" y=\""+Y+"\" stroke-width=\"0\" font-size=\"10\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">[Tm:"+Tm+"]</text>";
			}
		}
		//-------------------------------------------------------------------------------------------------------------------------------------------- Tiempo Entre Verde
		{
			XEV=GetEvT(PLCs[PlcIdx],sts,sts1);
			if(XEV)
			{
				for(var phase=0;phase<phases;phase++)
				{
					Y=(36+(yspt*phase));
					ccode=0;
					color="\"#909040\"";
					svg+=MkLine(ccode,color,Y,((X+X3)*xstp),((X+X3+XEV)*xstp),0,fullscaleX);
				}
				Y=(36+(yspt*phases));
				svg+="<text fill=\"#000000\" x=\""+((X+X3)*xstp)+"\" y=\""+Y+"\" stroke-width=\"0\" font-size=\"10\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">[EV:"+XEV+"]</text>";
			}
		}
		//--------------------------------------------------------------------------------------------------------------------------------------------
		if((Tm+1)>X3)
		{
			if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
			{
				PlanGen.LCLSYCTSTSTP[nstp]+=(Tm-X3)+1;
			}
			Error+="["+Str_Error_Time_Stp+"	"+String.fromCharCode(64+Plan.LCLSYCSTSSTP[stp])+"]";
			svg+="<line id=\"svg_13\" x1=\""+(((X+X3)*xstp)%fullscaleX)+"\" x2=\""+(((X+X3)*xstp)%fullscaleX)+"\" y1=\""+5+"\" y2=\""+(45+(yspt*phases))+"\" stroke=\"#F000F0\" fill=\"none\" stroke-width=\"2\"/>";
		}
		//--------------------------------------------------------------------------------------------------------------------------------------------
		X+=X3;
		X+=XEV;
		sts0=sts;
		stp=nstp;
	}
	PlanGen.LCLSYCTCI=X;
	out+="<svg width=\""+(20+fullscaleX)+"\" height=\""+(50+(yspt*phases))+"\" xmlns=\"http://www.w3.org/2000/svg\">\n";
	out+="<rect fill=\"#EFEFEF\" stroke=\"#000000\" stroke-width=\"0\" x=\"0\" y=\"1\" width=\""+(16+fullscaleX)+"\" height=\""+(48+(yspt*phases))+"\" />";
	out+="<text fill=\"#000000\" x=\"10\" y=\"14\" stroke-width=\"0\" font-size=\"10\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">["+Text+"]</text>";		
	if(Error!="")
	{
		ErrorMsg=Error;
		setTimeout("alert('"+Text+":"+Error+"')",500);
		out+="<text fill=\"#E00000\" x=\"200\" y=\"16\" stroke-width=\"0\" font-weight=\"900\" font-size=\"14\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">"+Error+"</text>";		
		if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
			setTimeout("ShowPlanWizard(3)",2500);
	}
	else
	{
		ErrorMsg=Error;
	}
	out+=svg;
	out+="</svg>";
	return out;
}

function ModSynTimeNTCIP(ELMT,J)
{
	var tTSTSTP=0;
	/*for(var i=0;i<PlanGen.LCLSYCSEQSTP.length;i++)
	{
		if(i!=J)
		tTSTSTP+=PlanGen.LCLSYCTSTSTP[i];
	}//*/
	tTSTSTP+=parseInt(ELMT.value);
	if(ChkParm('PLAN.SYN.TIME',parseInt(ELMT.value))==true) // && (PlanGen.LCLSYCTCI>=tTSTSTP)
			{
		PlanGen.LCLSYCTSTSTP[J]=parseInt(ELMT.value);
		ModParm('PLAN.SYN.TIME');
				ShowPlanWizard(3);
			}
			else
	{
		ELMT.value=PlanGen.LCLSYCTSTSTP[J];
	}
}

function AddSynStpNTCIP()
{
	PlanGen.LCLSYCSEQSTP.push(0);
	PlanGen.LCLSYCSTSSTP.push(1);
	PlanGen.LCLSYCTSTSTP.push(10);
	for(var j=0;j<PlanGen.LCLSYCSEQSTP.length;j++) 
		PlanGen.LCLSYCSEQSTP[j]=((j+1)%PlanGen.LCLSYCSEQSTP.length);
	ShowPlanWizard(3);
}

function DelSynStpNTCIP(j)
{
	PlanGen.LCLSYCSEQSTP.splice(j,1);
	PlanGen.LCLSYCSTSSTP.splice(j,1);
	PlanGen.LCLSYCTSTSTP.splice(j,1);
	PlanGen.LCLSYCDEMSTP.splice(j,1);
	PlanGen.LCLSYCDEMSTS.splice(j,1);
	PlanGen.LCLSYCCLRDEM.splice(j,1);
	for(var j=0;j<PlanGen.LCLSYCSEQSTP.length;j++) 
		PlanGen.LCLSYCSEQSTP[j]=((j+1)%PlanGen.LCLSYCSEQSTP.length);
	ShowPlanWizard(3);
}

function ModSynTCicleNTCIP(OBJ)
{
	var temp=0;
	if(ChkParm('PLAN.CYCLE',parseInt(OBJ.value))==true)
	{
		temp=PlanGen.LCLSYCTCI
		PlanGen.LCLSYCTCI=parseInt(OBJ.value);
		for (var j = 0; j<PlanGen.LCLSYCSEQSTP.length; j++)
			PlanGen.LCLSYCTSTSTP[j]=Math.round((PlanGen.LCLSYCTSTSTP[j]/temp)*PlanGen.LCLSYCTCI);
		ModParm('PLAN.CYCLE');
		ShowPlanWizard(3);
	}
	else
	{
		OBJ.value=PlanGen.LCLSYCTCI;
	}
}

function ModSynTOffsetNTCIP(OBJ)
{
	var temp=0;
	if(ChkParm('PLAN.SYN.TIME',parseInt(OBJ.value))==true)
	{
		PlanGen.LCLSYCTOF=parseInt(OBJ.value);
		ModParm('PLAN.CYCLE');
		ShowPlanWizard(3);
	}
	else
	{
		OBJ.value=PlanGen.LCLSYCTOF;
	}
}

function ShowPLNSYNNTCIP()
{
	var TRSTP="";
	var TRSTS="";
	var TRTIM="";
	var TRLxD="";
	var TRDELLSTP="";
	var TRCDL="";
	var out="";
	for (var j = 0; j<PlanGen.LCLSYCSEQSTP.length; j++) 
	{
		PlanGen.LCLSYCSEQSTP[j]=((j+1)%PlanGen.LCLSYCSEQSTP.length);
		PlanGen.LCLSYCSTSSTP[j]=parseInt(PlanGen.LCLSYCSTSSTP[j]);
		PlanGen.LCLSYCTSTSTP[j]=parseInt(PlanGen.LCLSYCTSTSTP[j]);
		PlanGen.LCLSYCDEMSTP[j]=parseInt(PlanGen.LCLSYCDEMSTP[j]);
		PlanGen.LCLSYCDEMSTS[j]=parseInt(PlanGen.LCLSYCDEMSTS[j]);
		if(PlanGen.LCLSYCDEMSTS[j]==0)
			PlanGen.LCLSYCDEMSTS[j]=1;
		PlanGen.LCLSYCCLRDEM[j]=0;
		if(PlanGen.LCLSYCDEMSTP[j]==0)
			PlanGen.DEMPRI[j]=0;
	}
	PlanGen.LCLSYCSTSSTP.length=PlanGen.LCLSYCSEQSTP.length;
	PlanGen.LCLSYCTSTSTP.length=PlanGen.LCLSYCSEQSTP.length;
	PlanGen.LCLSYCDEMSTP.length=PlanGen.LCLSYCSEQSTP.length;
	PlanGen.LCLSYCDEMSTS.length=PlanGen.LCLSYCSEQSTP.length;
	PlanGen.DEMPRI.length=PlanGen.LCLSYCSEQSTP.length;
	for (var j = 0; j<PlanGen.LCLSYCSEQSTP.length; j++) 
	{
		if(PlanGen.LCLSYCDEMSTP[j])
			PlanGen.LCLSYCCLRDEM[((j+1)%PlanGen.LCLSYCSEQSTP.length)]=PlanGen.LCLSYCDEMSTP[j];
	}
	out+="<table width=\"100%\" border=\"0\" align=\"rigth\" cellpadding=\"2\" cellspacing=\"2\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"#c0c0c0\">\n";
	out+="<tr>";
	out+="<td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">";
	out+="[ Sincronizado ]";
	out+="</font></td>\n";
	out+="<td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">";
	out+="[ "+Str_OTU_Menu2+" "+(PlanGen.PHC+1)+" ]";
	out+="</font>";
	out+="</td>\n";
	out+="<td align=\"rigth\" valign=\"middle\">";
	out+="<font size=\"1\" face=\"arial\">"+Str_GB_Temp_All_Cicle+"["+(PlanGen.LCLSYCTCI)+"] </font>";
	//out+="<input tabindex=\"\" type=\"text\" class=\"INTEXT\" value=\""+(PlanGen.LCLSYCTCI)+"\" size=\"3\" maxlength=\"3\" onchange=\"ModSynTCicle2(this);\"/>\n";
	if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
	{
		out+="<font size=\"1\" face=\"arial\">"+Str_Discrepancy+"</font>";
		out+="<input tabindex=\"\" type=\"text\" class=\"INTEXT\" value=\""+(PlanGen.LCLSYCTOF)+"\" size=\"3\" maxlength=\"3\" onchange=\"ModSynTOffset2(this);\"/>\n";
	}
	out+="</td>\n";
	out+="</tr>\n";
	//TRSTP="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\"><input type=\"button\" class=\"INTEXT2\" value=\"Add Step\" size=\"10\" onclick=\"AddSynStp2();\" tabindex=\"1\" /></font></td>\n";
	TRSTS="<tr>";
	TRSTS+="<td align=\"rigth\" valign=\"middle\">";
	TRSTS+="<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Add_State+"\" size=\"10\" onclick=\"AddSynStp2();\" tabindex=\"1\" />";
	TRSTS+="<font size=\"1\" face=\"arial\">"+Str_Stss+":</font>";
	TRSTS+="</td>\n";
	TRTIM="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">"+Str_Times+"</font></td>\n";
	TRLxD="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">"+Str_jumps+"</font></td>\n";
	TRCDL="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">"+Str_free_dem+"</font></td>\n";
	TRDELLSTP="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\"></font></td>\n";
	for (var j = 0; j<PlanGen.LCLSYCSEQSTP.length; j++) 
	{
		//-----------------------------------------------------------
		TRSTS+="<td align=\"left\" valign=\"top\">\n";
		TRSTS+="<select  tabindex=\""+(3+(10*j))+"\" class=\"INTEXT\" onchange=\"PlanGen.LCLSYCSTSSTP["+j+"]=parseInt(this.value);ShowPlanWizard(3);\">\n";
		TRSTS+="<option value=\"255\" ";
		if(PlanGen.LCLSYCSTSSTP[j]==255)TRSTS+=" selected=\"selected\"";
		TRSTS+=">FF</option>\n";
		var select=0;
		for(var i=0;i<PLCs[PlcIdx].Sts.length;i++)
		{
			if(ChkJmp(PlanGen.LCLSYCSTSSTP[((j+PlanGen.LCLSYCSEQSTP.length-1)%PlanGen.LCLSYCSEQSTP.length)],(i+1)))
			{
				TRSTS+="<option value=\""+(i+1)+"\" ";
				if(PlanGen.LCLSYCSTSSTP[j]==(i+1))
				{
					TRSTS+=" selected=\"selected\"";
					select=(i+1);
				}
				TRSTS+=">"+String.fromCharCode(65+i)+"</option>\n";
			}
		}
		//if(!select)PlanGen.LCLASYSEQSTP[j]=255;
		TRSTS+="</select>\n";
		TRSTS+="</td>\n";
		//-----------------------------------------------------------
		TRTIM+="<td align=\"left\" valign=\"top\">\n";
		TRTIM+=Str_Normal_Time_STS+"<input tabindex=\""+(4+(10*j))+"\" type=\"text\" class=\"INTEXT\" value=\""+PlanGen.LCLSYCTSTSTP[j]+"\" size=\"3\" maxlength=\"3\" onchange=\"ModSynTime2(this,"+j+");\"/>\n";
		TRTIM+="<br />";
		TRTIM+="</td>\n";
		//-----------------------------------------------------------
		TRLxD+="<td align=\"left\" valign=\"top\">\n";
		TRLxD+="<select tabindex=\""+(9+(10*j))+"\" class=\"INTEXT\" onchange=\"PlanGen.LCLSYCDEMSTP["+j+"]=parseInt(this.value);PlanGen.LCLSYCDEMSTS["+j+"]=PlanGen.LCLSYCSTSSTP["+j+"];PlanGen.DEMPRI["+j+"]=0;ShowPlanWizard(3);\">\n";
		TRLxD+="<option value=\"0\">"+Str_not_jump+"</option>\n";
		for(var i=1;i<=(HW_IOS+parseInt(GlobalParms.Inputs)+parseInt(GlobalParms.Loops));i++)
		{
			TRLxD+="<option value=\""+i+"\" ";
			if(PlanGen.LCLSYCDEMSTP[j]==i)TRLxD+=" selected=\"selected\"";
			TRLxD+=">"+Str_Demand+" "+i+"</option>\n";
		}
		TRLxD+="</select>\n";
		if(PlanGen.LCLSYCDEMSTP[j])
		{
			TRLxD+="<select tabindex=\""+(10+(10*j))+"\" class=\"INTEXT\" onchange=\"if(this.value){PlanGen.LCLSYCDEMSTS["+j+"]=parseInt(this.value);ShowPlanWizard(3);}\">\n";
			for(var i=0;i<PLCs[PlcIdx].Sts.length;i++)
			{
				if(ChkJmp(PlanGen.LCLSYCSTSSTP[j],(i+1)))
				{
					TRLxD+="<option value=\""+(i+1)+"\" ";
					if(PlanGen.LCLSYCDEMSTS[j]==(i+1))
					{
						TRLxD+=" selected=\"selected\"";
					}
					TRLxD+=">"+Str_Next_Stp+" "+String.fromCharCode(65+i)+"</option>\n";
				}
			}
			TRLxD+="</select>\n";
			if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
			{
				TRLxD+="["+Str_Priority+"<input type=\"checkbox\" onchange=\"if(this.checked==true){PlanGen.DEMPRI["+j+"]=PlanGen.LCLSYCDEMSTP["+j+"];}else{PlanGen.DEMPRI["+j+"]=0;}ShowPlanWizard(3);\" ";
				if(PlanGen.DEMPRI[j]!=0)
					TRLxD+= "checked=\"checked\"";
				TRLxD+= "/> ]";
			}
		}
		TRLxD+="</td>\n";
		//-----------------------------------------------------------
		TRCDL+="<td align=\"right\" valign=\"top\">\n";
		if(PlanGen.LCLSYCCLRDEM[j])
			TRCDL+="<font size=\"1\" face=\"arial\">Limpa Dem["+PlanGen.LCLSYCCLRDEM[j]+"]</font>\n";
		else
			TRCDL+=" ";
		TRCDL+="</td>\n";
		//-----------------------------------------------------------
		TRDELLSTP+="<td align=\"left\" valign=\"top\">\n";
		TRDELLSTP+="<input tabindex=\""+(11+(10*j))+"\" type=\"button\" class=\"INTEXT2\" value=\""+Str_Del_Sep+"\" size=\"10\" onclick=\"DelSynStp2("+j+");\"/>";
		TRDELLSTP+="</td>\n";
		//-----------------------------------------------------------
	}
	TRSTS+="</tr>\n";
	TRTIM+="</tr>\n";
	TRSTP+="</tr>\n";
	TRLxD+="</tr>\n";
	TRCDL+="</tr>\n";
	TRDELLSTP+="</tr>\n";
	//out+=TRSTP;
	out+=TRSTS;
	out+=TRLxD;
	out+=TRCDL;
	out+=TRTIM;
	out+=TRDELLSTP;
	out+="</table>\n";
	//alert(out);
	UpdateNTCIP(PlanGen);
	LOG(SaveSplanNTCIP());
	return out;
}

function SaveSplanNTCIP()
{
	var out="\tgoto INICIO\n";
	var i=0;
	var temp1=0;
	var temp2=0;
	var XEV=0;
	var DEMPRI= new Array();
	PlanGen.CHGSTSSTP= new Array();
	for(var j=0;j<PLCs[PlcIdx].Sts.length;j++) 
	{
		PlanGen.CHGSTSSTP[j]=0;
		if((i=PlanGen.LCLSYCSTSSTP.indexOf(j+1))!=-1)
			PlanGen.CHGSTSSTP[j]=i;
	}
	for(var j=0;j<PlanGen.LCLSYCSEQSTP.length;j++) 
	{
		PlanGen.LCLSYCSEQSTP[j]=((j+1)%PlanGen.LCLSYCSEQSTP.length);
		if(PlanGen.LCLSYCDEMSTP[j])
			PlanGen.LCLSYCCLRDEM[((j+1)%PlanGen.LCLSYCSEQSTP.length)]=PlanGen.LCLSYCDEMSTP[j];
	}
	i=0;
	{
		//---------------------------------------------------------
		if(GlobalParms.MODEL.indexOf("M3")!=-1)
			out+="#CFT:sec.sec;\n";
		else
			out+="#CFT:"+PLCs[PlcIdx].Sec.replace("//","/")+";\n";
		out+="#MCT:"+(Plan.LCLSYCTCI*1100)+"\n";
		out+=IniPlan;
		out+="//--------------------------------------------\n";
		out+="PLCS="+((1<<PLCs.length)-1)+"\n";
		out+="SYPTO="+PLCs[PlcIdx].McPlan.SYCPLCTOU+"\n";
		out+="STS2STP,0,"+PlanGen.CHGSTSSTP.toString()+"\n";
		out+="SIMC,"+PLCs[PlcIdx].McPlan.MACSEQSTP.toString()+"\n";
		out+="MCSS,"+PLCs[PlcIdx].McPlan.MACSTSSTP.toString()+"\n";
		out+="//--------------------------------------------\n";
		if(GlobalParms.MODEL.indexOf("RT")!=-1)
		{
			out+="EOTU,1,"+PLCs[PlcIdx].OTUPlan.OTUSEQSTS.toString();
			for(var j=PLCs[PlcIdx].OTUPlan.OTUSEQSTS.length;j<PLCs[PlcIdx].Sts.length;j++) 
			{
				out+=",1";
			}
			out+="\n";
			out+="UxD,"+PLCs[PlcIdx].OTUPlan.OTUDEMSTS.toString()+",0\n";
			out+="UDG,"+PLCs[PlcIdx].OTUPlan.OTUSTSDEM.toString()+",0\n";
			out+="UCD,0,"+PLCs[PlcIdx].OTUPlan.OTUDEMCLR.toString()+",0\n";
		}
		//--------------------------------------------------------------------------
		var TIM2STP;
		var POS2STP;
		TIM2STP=owl.deepCopy(PlanGen.LCLSYCTSTSTP);
		stp=parseInt(PlanGen.LCLSYCSEQSTP[PlanGen.LCLSYCSEQSTP.length-1]);
		temp2=0;
		for(var j=0;j<TIM2STP.length;j++) 
		{
			if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
			{
				temp2+=TIM2STP[j];
				sts=parseInt(PlanGen.LCLSYCSTSSTP[stp])-1;
				stp=parseInt(PlanGen.LCLSYCSEQSTP[stp]);
				sts1=parseInt(PlanGen.LCLSYCSTSSTP[stp])-1;
				temp2+=PlanGen.LCLSYCTOF;
				TIM2STP[j]=temp2%PlanGen.LCLSYCTCI;
				XEV=GetEvT(PLCs[PlcIdx],sts,sts1);
				temp2+=XEV;
			}
			TIM2STP[j]=TIM2STP[j]*1000;
		}
		POS2STP=owl.deepCopy(PlanGen.LCLSYCSEQSTP);
		POS2STP.unshift(POS2STP[POS2STP.length-1]);
		POS2STP.pop();//*/
		var pos=fmenor(TIM2STP)
		for(var j=0;j<pos;j++) 
		{
			TIM2STP[TIM2STP.length]=TIM2STP[0];
			TIM2STP.shift();
			POS2STP[POS2STP.length]=POS2STP[0];
			POS2STP.shift();
		}
		out+="T2SP,"+TIM2STP.toString()+","+(PlanGen.LCLSYCTCI*1100)+"\n";
		out+="P2SP,"+POS2STP.toString()+",0\n";
		//--------------------------------------------------------------------------
		out+="//--------------------------------------------\n";
		out+="Lstps="+PlanGen.LCLSYCSEQSTP.length+"\n";
		out+="CHGP="+PlanGen.LCLCHGPLN+"\n";
		out+="TCicle="+(PlanGen.LCLSYCTCI*1000)+"\n";
		out+="//--------------------------------------------\n";
		out+="SIPL,"+PlanGen.LCLSYCSEQSTP.toString()+"\n";
		out+="EIPL,"+PlanGen.LCLSYCSTSSTP.toString()+"\n";
		out+="TIPL"
		var j=0;
		stp=parseInt(PlanGen.LCLSYCSEQSTP[PlanGen.LCLSYCSEQSTP.length-1]);
		temp2=0;
		do
		{
			sts=parseInt(PlanGen.LCLSYCSTSSTP[stp])-1;
			stp=parseInt(PlanGen.LCLSYCSEQSTP[stp]);
			sts1=parseInt(PlanGen.LCLSYCSTSSTP[stp])-1;
			temp1=PlanGen.LCLSYCTSTSTP[(j%PlanGen.LCLSYCTSTSTP.length)];
			temp2+=temp1;
			temp1=temp2;
			XEV=GetEvT(PLCs[PlcIdx],sts,sts1);
			temp2+=XEV;
			if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
			{
				temp1+=PlanGen.LCLSYCTOF;
				temp1%=PlanGen.LCLSYCTCI;
			}
			out+=","+(temp1*1000)
			j++;
		}
		while(j<PlanGen.LCLSYCTSTSTP.length);
		out+=","+(PlanGen.LCLSYCTCI*1000)+"\n";
		out+="//--------------------------------------------\n";
		out+="LxD,"+PlanGen.LCLSYCDEMSTP.toString()+"\n";
		out+="LgI,"+PlanGen.LCLSYCDEMSTS.toString()+"\n";
		out+="CDL,"+PlanGen.LCLSYCCLRDEM.toString()+"\n";
		out+="PRI,"+PlanGen.DEMPRI.toString()+"\n";
		out+="//--------------------------------------------\n";
		out+="Tmax,0"
		for(var j=0;j<PLCs[PlcIdx].Sts.length;j++)
			out+=","+PLCs[PlcIdx].Sts[j].TMAX
		out+="\n";
		for(var j=0;j<PLCs[PlcIdx].Sts.length;j++)
			out+="Color"+(j+1)+","+PLCs[PlcIdx].Sts[j].Colors.toString()+"\n";
		out+="ColorVT";
		for(var j=0;j<PLCs[PlcIdx].Phases.length;j++)
			out+=",1";
		out+="\n";
		out+="ColorFF";
		for(var j=0;j<PLCs[PlcIdx].Phases.length;j++)
			out+=","+PHASEs[PLCs[PlcIdx].Phases[j]].FState;
		out+="\n";
		out+="ColorSL";
		for(var j=0;j<PLCs[PlcIdx].Phases.length;j++)
			out+=",0";
		out+="\n";
		out+="//--------------------------------------------\n";
		out+="SETSTS\n";
		for (var j = 0; j<PLCs[PlcIdx].Sts.length; j++) 
		{
			out+="\t!= "+(j+1)+" Nsts\n";
			out+="\tphases Color"+(j+1)+"\n";
		}
		out+="\t== 255 Nsts FLAS\n";
		if(GlobalParms.MODEL.indexOf("RT")!=-1)
		{
			out+="\tmov 0 otu.fr\n";
		}
		out+="\t== 254 Nsts SLOF\n";
		out+="\t== Nsts Csts\n";
		out+="\tmov TIMERS tstart\n";
		if(GlobalParms.MODEL.indexOf("RT")!=-1)
		{
			out+="\tmov Nsts otu.step\n";
		}
		out+="\tmov Nsts Csts\n";
		out+="\treturn\n";
		out+="//--------------------------------------------\n";
		out+="INICIO\n";
		//if(GlobalParms.MODEL.indexOf("M4")!=-1)
		{
			if(PlanGen.PHC!=0)
				out+="ldphc /"+PlcIdx+"/phc"+PlanGen.PHC+".ini\n";
			else
				out+="ldphc /phconf.ini\n";
		}
	}
	if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
	{
		out+="clrpri\n";
	}
	out+=SelIObyModel(GlobalParms.MODEL);
	if(SwEnMc!=0)
		out+="mov 1 io["+SwEnMc+"].rdy\n";
	if(SwEnMc!=0)
		out+="mov 1 io["+SwEnMc+"].wmu\n";
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
	if(GlobalParms.MODEL.indexOf("RT")!=-1)
	{
	out+="== 1 otu.faislado NOCTRLO\n\
	== 1 otu.sl CTRLOTU\n\
	== 1 otu.ff CTRLOTU\n\
	== 0 otu.aislado CTRLOTU\n";
	}
out+="NOCTRLO\n";
	if(SwEnMc!=0)
		out+="mov 1 io["+SwEnMc+"].enable\n";
	if(SwEnMc!=0)
		out+="== 1 io["+SwEnMc+"].in CTRMAN\n";
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
	if(GlobalParms.MODEL.indexOf("RT")!=-1)
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
	call CHKMODE\n";
if(GlobalParms.MODEL.indexOf("GW4")==-1)
	out+="call CLDstp\n";
out+="mov SIPL[Cstp] Nstp\n\
	mov EIPL[Nstp] Nsts\n\
	call FNCDemISO\n\
	mov Nstp Cstp\n\
	!= Cstp CHGP SAMESTP\n";
	if(GlobalParms.Version)
	{
		var ver=GlobalParms.Version;
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
if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
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
if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
{
	out+="call CLDstp\n";
	out+="call PRIstp\n";
}
out+="tmin\n\
	sync TCicle TIPL[Cstp]\n\
	goto MAIN\n\
\n\
FNCDemISO\n\
	mov LxD[Cstp] temp\n\
	!= 0 temp\n\
	return\n\
	!= io[temp].inh 0\n\
	return\n\
	mov 1 DEMA\n\
	mov LgI[Cstp] Nsts\n\
	return\n\n";
out+="CLDstp\n";
out+="== 1 DEMA\n";
out+="return\n";
out+="!= CDL[Cstp] 0\n\
	return\n\
	mov CDL[Cstp] temp\n\
	mov 0 DEMA\n\
	mov 0 io[temp].inh\n\
	mov 0 io[temp].wmu\n\
	return\n\n";
if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
{
out+="PRIstp\n\
	!= PRI[Cstp] 0\n\
	return\n\
	mov PRI[Cstp] temp\n\
	mov 1 io[temp].wmu\n\
	return\n\n";
}
out+="FLAS\n";
if(GlobalParms.MODEL.indexOf("RT")!=-1)
{
	out+="== 1 otu.ff FLASCENTRAL\n\
	mov 1 otu.fr\n";
}
	out+="phases ColorFF\n\
	return\n\
	\n";
if(GlobalParms.MODEL.indexOf("RT")!=-1)
{
out+="FLASCENTRAL\n\
	phases ColorVT\n";
if(GlobalParms.MODEL.indexOf("GW4")==-1)
{
out+="delay 2000\n\
	mov 0 temp\n\
WAITFF\n\
	delay 1000\n\
	add 1000 temp\n\
	mov 1 PLC[THIS].vsync\n\
	== 0 otu.ff KEPFF\n\
	> temp SYPTO\n\
	ifpsync PLCS WAITFF\n\
	wkuplc PLCS\n";
}
else
{
out+="delay 3000\n";
}
out+="KEPFF\n\
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
	phases ColorVT\n";
if(GlobalParms.MODEL.indexOf("GW4")==-1)
{
out+="delay 2000\n\
	mov 0 temp\n\
WAITSL\n\
	delay 1000\n\
	add 1000 temp\n\
	mov 1 PLC[THIS].vsync\n\
	== 0 otu.sl KEPSL\n\
	> temp SYPTO\n\
	ifpsync PLCS WAITSL\n\
	wkuplc PLCS\n";
}
else
{
out+="delay 3000\n";
}
out+="KEPSL\n\
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
if(GlobalParms.MODEL.indexOf("RT")!=-1)
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
	if(GlobalParms.MODEL.indexOf("RT")!=-1)
	{
	out+="mov 1 otu.mc\n";
	}
	out+="mov 0 Nstp\n";
	if(SwFF)
		out+="mov 1 io["+SwFF+"].enable\n";
	out+="mov Nmode Cmode\n";
	if(SwEnMc!=0)
		out+="== 0 io["+SwEnMc+"].in\n";
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
	if(GlobalParms.MODEL.indexOf("RT")!=-1)
	{
	out+="mov 0 otu.mc\n";
	}
	if(SwFF!=0)
		out+="mov 0 io["+SwFF+"].enable\n";
	if(SwEnMc!=0)
		out+="mov 0 io["+SwEnMc+"].enable\n";
	if(SwEnMc!=0)
		out+="mov 0 io["+SwEnMc+"].fail\n";
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
	if(GlobalParms.MODEL.indexOf("RT")!=-1)
	{
	out+="mov 0 otu.mc\n";
	}
	
	if(SwFF!=0)
		out+="mov 1 io["+SwFF+"].enable\n";
	if(SwEnMc!=0)
		out+="mov 1 io["+SwEnMc+"].enable\n";
	out+="sync TCicle 0 wait\n\
	mov 0 Nstp\n\
	dif TCicle wait\n\
	add TCicle wait\n\
	sub 3000 wait\n\
	mod TCicle wait\n\
	call T2STP\n\
	!= Cmode 2\n\
	mov STS2STP[Csts] Nstp\n\
	mov Nstp Cstp\n\
	mov EIPL[Nstp] Nsts\n\
	mov Nmode Cmode\n\
	return FSTPL\n\
\n\
T2STP\n\
	delay 10\n\
	> T2SP[Nstp] wait FINDSTP\n\
	add 1 Nstp\n\
	goto T2STP\n\
FINDSTP\n\
	mov P2SP[Nstp] Nstp\n\
	return\n";
	out+=EndPlan;
	return out;
}
//===============================================================================
percent=86;

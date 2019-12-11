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
function UpdateSyn1(PLC,Plan)
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
	sts1=parseInt(Plan.LCLSYCSTSSTP[Plan.LCLSYCSEQSTP.length-1])-1;
	for(var j=0;j<Plan.LCLSYCSEQSTP.length;j++)
	{
		Plan.LCLSYCSEQSTP[j]=((j+1)%Plan.LCLSYCSEQSTP.length);
		Plan.LCLSYCSTSSTP[j]=parseInt(Plan.LCLSYCSTSSTP[j]);
		Plan.LCLSYCTSTSTP[j]=parseInt(Plan.LCLSYCTSTSTP[j]);
		Plan.LCLSYCDEMSTP[j]=parseInt(Plan.LCLSYCDEMSTP[j]);
		Plan.LCLSYCDEMSTS[j]=parseInt(Plan.LCLSYCDEMSTS[j]);
		if(Plan.LCLSYCDEMSTS[j]==0)
			Plan.LCLSYCDEMSTS[j]=1;
		Plan.LCLSYCCLRDEM[j]=0;
		if(Plan.LCLSYCDEMSTP[j]!=0)
			Plan.LCLSYCCLRDEM[((j+1)%Plan.LCLSYCSEQSTP.length)]=Plan.LCLSYCDEMSTP[j];
		if(Plan.LCLSYCDEMSTP[j]==0)
			Plan.DEMPRI[j]=0;
		X3=parseInt(Plan.LCLSYCTSTSTP[stp]);
		sts=parseInt(Plan.LCLSYCSTSSTP[stp])-1;
		XEV=GetEvT(PLC,sts1,sts);
		stp=parseInt(Plan.LCLSYCSEQSTP[stp]);
		sts1=parseInt(Plan.LCLSYCSTSSTP[stp])-1;
		TC+=X3+XEV;
	}
	Plan.LCLSYCTCI=parseInt(TC);
}

function DrawPlnSyn(Plan,Text)
{
	var out=""
	var phases=PLCs[PlcIdx].Phases.length;
	var TC=parseInt(Plan.LCLSYCTCI);
	var sts=0;
	var sts1=0;
	var color=0;
	var ccode=0;
	var Error="";
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
	//-------------------------------------------------
	var Y=0;
	var X=0;
	var X3=0;
	var M3=0;
	var Tm=0;
	var XEV=0;
	//------------------------------------------------
	var svg="";
	var stp=0;
	sts1=parseInt(Plan.LCLSYCSTSSTP[Plan.LCLSYCSEQSTP.length-1])-1;
	for(var lock=0;lock<Plan.LCLSYCSEQSTP.length;lock++)
	{
		//-------------------------------------------------------------------------------------------------------------------------------------------- Tiempo de Estado
		sts=parseInt(Plan.LCLSYCSTSSTP[stp])-1;
		X=parseInt(Plan.LCLSYCTSTSTP[stp])
		pos=parseInt(Plan.LCLSYCSEQSTP[stp]);
		if(X>=parseInt(Plan.LCLSYCTSTSTP[pos]))
			X3=(TC-X)+parseInt(Plan.LCLSYCTSTSTP[pos]);
		else
			X3=parseInt(Plan.LCLSYCTSTSTP[pos])-X;
		M3=X3;
		X*=xstp;
		X3*=xstp;
		svg+="<text fill=\"#000000\" x=\""+X+"\" y=\"26\" stroke-width=\"0\" font-size=\"14\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">["+String.fromCharCode(64+Plan.LCLSYCSTSSTP[stp])+":"+M3+"]</text>";
		//svg+="<line id=\"svg_13\" x1=\""+X+"\" x2=\""+X+"\" y1=\""+10+"\" y2=\""+200+"\" stroke=\"#F000F0\" fill=\"none\" stroke-width=\"2\"/>";
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
			svg+=MkLine(ccode,color,Y,X,(X+X3),0,fullscaleX);
		}
		//-------------------------------------------------------------------------------------------------------------------------------------------- Tiempo Entre Verde
		XEV=GetEvT(PLCs[PlcIdx],sts1,sts);
		if(XEV)
		{
			X3=xstp*XEV;
			for(var phase=0;phase<phases;phase++)
			{
				Y=(36+(yspt*phase));
				ccode=0;
				color="\"#404040\"";
				svg+=MkLine(ccode,color,Y,X,(X+X3),0,fullscaleX);
			}
			Y=(36+(yspt*phases));
			svg+="<text fill=\"#000000\" x=\""+X+"\" y=\""+Y+"\" stroke-width=\"0\" font-size=\"10\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">[EV:"+XEV+"]</text>";
		}
		//-------------------------------------------------------------------------------------------------------------------------------------------- Tiempo Minimo de Estado
		X=X+X3;
		Tm=0;
		if(sts1!=sts)
			Tm=GetTmin2(PLCs[PlcIdx],sts1,sts);
		if(Tm)
		{
			X3=xstp*Tm;
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
				svg+=MkLine(ccode,color,Y,X,(X+X3),0,fullscaleX);
			}
			Y=(36+(yspt*phases));
			svg+="<text fill=\"#000000\" x=\""+X+"\" y=\""+Y+"\" stroke-width=\"0\" font-size=\"10\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">[Tm:"+Tm+"]</text>";
		}
		//--------------------------------------------------------------------------------------------------------------------------------------------
		if((Tm+XEV+1)>M3)
		{
			if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
			{
				PlanGen.LCLSYCTSTSTP[pos]+=((Tm+XEV)-M3)+1;
				PlanGen.LCLSYCTSTSTP[pos]%=PlanGen.LCLSYCTCI;
				PlanGen.LCLSYCTCI++;
			}
			Error+="["+Str_Error_Time_Stp+"	"+String.fromCharCode(64+Plan.LCLSYCSTSSTP[stp])+"]";
			svg+="<line id=\"svg_13\" x1=\""+((X+X3)%fullscaleX)+"\" x2=\""+((X+X3)%fullscaleX)+"\" y1=\""+5+"\" y2=\""+(45+(yspt*phases))+"\" stroke=\"#F000F0\" fill=\"none\" stroke-width=\"2\"/>";
		}
		sts1=sts;
		stp=parseInt(Plan.LCLSYCSEQSTP[stp]);
	}
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

//===============================================================================
function ModSynTime(ELMT,J)
{
	var tTSTSTP=0;
	/*for(var i=0;i<PlanGen.LCLSYCSEQSTP.length;i++)
	{
		if(i!=J)
		tTSTSTP+=PlanGen.LCLSYCTSTSTP[i];
	}// */
	tTSTSTP+=parseInt(ELMT.value);
	if(ChkParm('PLAN.SYN.TIME',parseInt(ELMT.value))==true && (PlanGen.LCLSYCTCI>=tTSTSTP))
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

function AddSynStp()
{
	PlanGen.LCLSYCSEQSTP.push(0);
	PlanGen.LCLSYCSTSSTP.push(1);
	for(var j=0;j<PlanGen.LCLSYCSEQSTP.length;j++) 
		PlanGen.LCLSYCSEQSTP[j]=((j+1)%PlanGen.LCLSYCSEQSTP.length);
	ShowPlanWizard(3);
}
function DelSynStp(j)
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

function ModSynTCicle(OBJ)
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

function ModSynTOffset(OBJ)
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

function ShowPLNSYN()
{
	var TRSTP="";
	var TRSTS="";
	var TRTIM="";
	var TRLxD="";
	var TRDELLSTP="";
	var TRCDL="";
	var out="";
	out+="<table width=\"100%\" border=\"0\" align=\"rigth\" cellpadding=\"2\" cellspacing=\"2\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"#c0c0c0\">\n";
	out+="<tr>";
	out+="<td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">";
	out+="[ Sincronizado br]";
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
	out+="<td align=\"rigth\" valign=\"middle\">";
	out+="<font size=\"1\" face=\"arial\">"+Str_GB_Temp_All_Cicle+"</font>";
	out+="<input tabindex=\"\" type=\"text\" class=\"INTEXT\" value=\""+(PlanGen.LCLSYCTCI)+"\" size=\"3\" maxlength=\"3\" onchange=\"ModSynTCicle(this);\"/>\n";
	if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
	{
		out+="<font size=\"1\" face=\"arial\">"+Str_Discrepancy+"</font>";
		out+="<input tabindex=\"\" type=\"text\" class=\"INTEXT\" value=\""+(PlanGen.LCLSYCTOF)+"\" size=\"3\" maxlength=\"3\" onchange=\"ModSynTOffset(this);\"/>\n";
	}
	out+="</td>\n";
	out+="</tr>\n";
	//TRSTP="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\"><input type=\"button\" class=\"INTEXT2\" value=\"Add Step\" size=\"10\" onclick=\"AddSynStp();\" tabindex=\"1\" /></font></td>\n";
	TRSTS="<tr><td align=\"rigth\" valign=\"middle\"><font size=\"1\" face=\"arial\">"+Str_Stss+":\
	<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Add_State+"\" size=\"10\" onclick=\"AddSynStp();\" tabindex=\"1\" /></font></td>\n";
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
		TRTIM+="<input tabindex=\""+(4+(10*j))+"\" type=\"text\" class=\"INTEXT\" value=\""+PlanGen.LCLSYCTSTSTP[j]+"\" size=\"3\" maxlength=\"3\" onchange=\"ModSynTime(this,"+j+");\"/>\n";
		TRTIM+=Str_Time_2_Start_STS+"<br />";
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
		TRDELLSTP+="<input tabindex=\""+(11+(10*j))+"\" type=\"button\" class=\"INTEXT2\" value=\""+Str_Del_Sep+"\" size=\"10\" onclick=\"DelSynStp("+j+");\"/>";
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
	return out;
}

function SaveSplan1(PLC,Parms,Plan)
{
	UpdateSyn1(PLC,Plan);
	var out="\tgoto INICIO\n";
	var i=0;
	var temp1=0;
	var XEV=0;
	var DEMPRI= new Array();
	Plan.CHGSTSSTP= new Array();
	for(var j=0;j<PLC.Sts.length;j++) 
	{
		Plan.CHGSTSSTP[j]=0;
		if((i=Plan.LCLSYCSTSSTP.indexOf(j+1))!=-1)
			Plan.CHGSTSSTP[j]=i;
	}
	for(var j=0;j<Plan.LCLSYCSEQSTP.length;j++) 
	{
		Plan.LCLSYCSEQSTP[j]=((j+1)%Plan.LCLSYCSEQSTP.length);
		if(Plan.LCLSYCDEMSTP[j])
			Plan.LCLSYCCLRDEM[((j+1)%Plan.LCLSYCSEQSTP.length)]=Plan.LCLSYCDEMSTP[j];
	}
	i=0;
	{
		//---------------------------------------------------------
		if(Parms.MODEL.indexOf("M3")!=-1)
			out+="#CFT:sec.sec;\n";
		else
			out+="#CFT:"+PLC.Sec.replace("//","/")+";\n";
		out+="#MCT:"+(Plan.LCLSYCTCI*1100)+"\n";
		out+=IniPlan;
		out+="//--------------------------------------------\n";
		out+="PLCS="+((1<<Parms.Controllers)-1)+"\n";
		out+="STS2STP,0,"+Plan.CHGSTSSTP.toString()+"\n";
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
		//--------------------------------------------------------------------------
		var TIM2STP;
		var POS2STP;
		TIM2STP=owl.deepCopy(Plan.LCLSYCTSTSTP);
		for(var j=0;j<TIM2STP.length;j++) 
		{
			temp1=TIM2STP[j];
				temp1+=Plan.LCLSYCTOF;
				temp1%=Plan.LCLSYCTCI;
			TIM2STP[j]=temp1*1000;
		}
		POS2STP=owl.deepCopy(Plan.LCLSYCSEQSTP);
		POS2STP.unshift(POS2STP[POS2STP.length-1]);
		POS2STP.pop();
		var pos=fmenor(TIM2STP)
		for(var j=0;j<pos;j++) 
		{
			TIM2STP[TIM2STP.length]=TIM2STP[0];
			TIM2STP.shift();
			POS2STP[POS2STP.length]=POS2STP[0];
			POS2STP.shift();
		}
		out+="T2SP,"+TIM2STP.toString()+","+(Plan.LCLSYCTCI*1100)+"\n";
			out+="P2SP"+(",0".repeat(POS2STP.length))+",0\n";
		//--------------------------------------------------------------------------
		out+="//--------------------------------------------\n";
		out+="Lstps="+Plan.LCLSYCSEQSTP.length+"\n";
		out+="CHGP="+Plan.LCLCHGPLN+"\n";
		out+="TCicle="+(Plan.LCLSYCTCI*1000)+"\n";
		out+="//--------------------------------------------\n";
		out+="SIPL,"+Plan.LCLSYCSEQSTP.toString()+"\n";
		out+="EIPL,"+Plan.LCLSYCSTSSTP.toString()+"\n";
		out+="TIPL"
		var j=0;
		do
		{
			j++;
			temp1=Plan.LCLSYCTSTSTP[(j%Plan.LCLSYCTSTSTP.length)];
				temp1+=Plan.LCLSYCTOF;
				temp1%=Plan.LCLSYCTCI;
			out+=","+(temp1*1000)
		}
		while(j<Plan.LCLSYCTSTSTP.length);
		out+=","+(Plan.LCLSYCTCI*1000)+"\n";
		out+="//--------------------------------------------\n";
		out+="LxD,"+Plan.LCLSYCDEMSTP.toString()+"\n";
		out+="LgI,"+Plan.LCLSYCDEMSTS.toString()+"\n";
		out+="CDL,"+Plan.LCLSYCCLRDEM.toString()+"\n";
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
			if(Plan.PHC!=0)
				out+="ldphc /"+PlcIdx+"/phc"+Plan.PHC+".ini\n";
			else
				out+="ldphc /phconf.ini\n";
		}
	out+=SelIObyModel(Parms.MODEL);
	if(SwEnMc!=0)
	{
		out+="mov 1 io["+SwEnMc+"].rdy\n";
		out+="mov 1 io["+SwEnMc+"].wmu\n";
	}
	if(SwCmMc!=0)
	{
		out+="mov io["+SwCmMc+"].val MCTR\n";
	}
	out+="mov TIMERS tstart\n\
	sub 1 tstart\n\
	goto MAIN\n\
\n\
MAIN\n";
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
\n";
if(SwEnMc!=0)
{
out+="CTRMAN\n\
	mov 1 Nmode\n\
	call CHKMODE\n\
	delay 1000\n";
	if(SwCmMc!=0)
	{
		out+="== io["+SwCmMc+"].val MCTR MAIN\n";
	}
out+="WAITBTOFF\n\
	delay 200\n";
	if(SwCmMc!=0)
	{
		out+="== 1 io["+SwCmMc+"].in WAITBTOFF\n";
	}
	out+="mov SIMC[Cstp] Nstp\n";
	if(OutAdv!=0)
	{
		out+="mov 0 io["+OutAdv+"].val\n";
	}
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
	{
		out+="== 0 io["+SwEnMc+"].in OUTWAIT\n";
	}
	out+="> temp SYPTO\n\
	ifpsync PLCS KEEPWAIT\n\
OUTWAIT\n\
	wkuplc PLCS\n\
	delay 2000\n\
	mov 0 PLC[THIS].vsync\n";
	if(SwCmMc!=0)
	{
		out+="mov io["+SwCmMc+"].val MCTR\n";
	}
	if(OutAdv!=0)
	{
		out+="mov 255 io["+OutAdv+"].val\n";
	}
	out+="goto MAIN\n\
\n";
}
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
	call CLDstp\n\
	mov SIPL[Cstp] Nstp\n\
	mov EIPL[Nstp] Nsts\n\
	call FNCDemISO\n\
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
	if(SwFF!=0)
	{
		out+="== io["+SwFF+"].in 0 SAMESTP\n";
		out+="phases ColorVT\n";
	if(Parms.IniRed)
		out+="delay "+(Parms.IniRed*1000)+"\n";
	else
		out+="delay 3000\n";
		out+="KEPISFF\n";
		out+="phases ColorFF\n";
	if(Parms.IniFsh)
		out+="delay "+(Parms.IniFsh*1000)+"\n";
	else
		out+="delay 5000\n";
		out+="!= io["+SwFF+"].in 0 KEPISFF\n";
		out+="phases ColorVT\n";
	if(Parms.IniRed)
		out+="delay "+(Parms.IniRed*1000)+"\n";
	else
		out+="delay 3000\n";
		out+="call LOCAL\n";
	}
	out+="FSTPL\n\
	SAMESTP\n\
	call SETSTS\n";
	/*demanda prioritaria
	{
		out+="call CLDstp\n";
		out+="call PRIstp\n";
	}// */
	out+="sync TCicle TIPL[Cstp]\n";
	out+="goto MAIN\n\
	\n\
	FNCDemISO\n\
	mov LxD[Cstp] temp\n\
	!= 0 temp\n\
	return\n\
	!= io[temp].inh 0\n\
	return\n\
	mov 1 DEMA\n\
	mov LgI[Cstp] Nsts\n\
	return\n\
	\n\
CLDstp\n\
	== 1 DEMA\n\
	return\n\
	!= CDL[Cstp] 0\n\
	return\n\
	mov CDL[Cstp] temp\n\
	mov 0 DEMA\n\
	mov 0 io[temp].inh\n\
	mov 0 io[temp].wmu\n\
	return\n\
	\n";
/*if(Parms.MODEL.indexOf("GW4")!=-1 || Parms.MODEL.indexOf("GW")==-1)
{
out+="\
PRIstp\n\
	!= PRI[Cstp] 0\n\
	return\n\
	mov PRI[Cstp] temp\n\
	mov 1 io[temp].wmu\n\
	return\n\n";
}// */
out+="\
FLAS\n";
if(Parms.MODEL.indexOf("RT")!=-1)
{
	out+="\
	== 1 otu.ff FLASCENTRAL\n\
	mov 1 otu.fr\n";
}
	out+="phases ColorFF\n\
	return\n\
	\n";
if(Parms.MODEL.indexOf("RT")!=-1)
{
out+="\
FLASCENTRAL\n\
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
\n";
}
if(Parms.MODEL.indexOf("RT")!=-1)
{
out+="\
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
\n";
}
else
{
out+="\
SLOF\n\
	phases ColorVT\n\
	delay 2000\n\
	phases ColorSL\n\
	delay 2000\n\
	return MAIN\n\
\n";
}
if(Parms.MODEL.indexOf("RT")!=-1)
{
out+="\
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
	{
out+=  "mov 0 io["+SwEnMc+"].rdy\n\
		mov 0 io["+SwEnMc+"].inh\n\
		mov 1 io["+SwEnMc+"].fail\n";
	}
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
	if(SwFF)
		out+="mov 1 io["+SwFF+"].enable\n";
	out+="mov Nmode Cmode\n";
	if(SwEnMc!=0)
	{
		out+="mov 1 io["+SwEnMc+"].rdy\n";
		out+="mov 1 io["+SwEnMc+"].wmu\n";
		out+="mov 0 io["+SwEnMc+"].inh\n";
		out+="mov 0 io["+SwEnMc+"].fail\n";
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
		out+="mov 0 io["+SwEnMc+"].inh\n";
		out+="mov 0 io["+SwEnMc+"].fail\n";
		out+="mov 0 io["+SwEnMc+"].enable\n";
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
		out+="mov 0 io["+SwEnMc+"].rdy\n";
		out+="mov 1 io["+SwEnMc+"].wmu\n";
		out+="mov 0 io["+SwEnMc+"].inh\n";
		out+="mov 0 io["+SwEnMc+"].fail\n";
	}
out+="call T2STP\n\
	mov Nstp Cstp\n\
	!= Cmode 2\n\
	mov STS2STP[Csts] Nstp\n\
	mov EIPL[Nstp] Nsts\n\
	mov Nmode Cmode\n\
	return SAMESTP\n\
\n\
T2STP\n\
	mov CHGP Nstp\n\
FINDSTPA\n\
	mov EIPL[Nstp] Nsts\n\
	mov 0 temp\n";
	for (var j=0;j<PLC.Sts.length;j++) 
	{
		out+="\t!= "+(j+1)+" Nsts\n";
		out+="\ttim2sts Color"+(j+1)+" temp\n";
	}
out+="sync TCicle 0 wait\n\
	dif TCicle wait\n\
	mod TCicle wait\n\
	add wait temp\n\
	add 500 temp\n\
	mod TCicle temp\n\
	> temp T2SP[Nstp]\n\
	return\n\
	mov SIPL[Nstp] Nstp\n\
	goto FINDSTPA";
	out+=EndPlan;
	return out;
}
//===============================================================================
percent=80;

// ReDraw(conf_ev)
var CEV=0;
var BCEV=0;

function GetEv()
{	
	if(CEV==(PLCs[PlcIdx].EV.length+1))
	{
		SetPhConf(GlobalParms.phconf);
		PLCs[PlcIdx].EV[CEV-1]=genEv();
	}
	if(CEV>PLCs[PlcIdx].EV.length)
		CEV=0;
	if(CEV!=0)
		SetPhConf(PLCs[PlcIdx].EV[CEV-1]);
	else
		SetPhConf(GlobalParms.phconf);
}

function SetEv()
{
	if(CEV!=0)
		PLCs[PlcIdx].EV[CEV-1]=genEv();
	else
		GlobalParms.phconf=genPhc();
}

function EntreVerdes()
{	
	var list = "";
	var index = PlcIdx;
	var ph=0;
	if(BCEV!=CEV)
	{
		if(CEV!=0)
			SetPhConf(PLCs[PlcIdx].EV[CEV-1]);
		else
			SetPhConf(GlobalParms.phconf);
		BCEV=CEV;
	}
	list +="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\" >\n";
	list +="	<tr bordercolor=\"Silver\">\n";
	list +="		<td colspan=\"6\" align=\"center\">\n";		
	list +=				Str_Stage_EV + "\n";
	//-----------------------------------------------------
	list+="<select tabindex=\"\" class=\"INTEXT\" onchange=\"CEV=parseInt(this.value);GetEv();ReDraw(conf_ev);\">\n";
	list+="<option value=\"0\">"+Str_Default+" "+Str_OTU_Menu2+"</option>\n";
	for(var i=1;i<=PLCs[PlcIdx].EV.length;i++)
	{
		list+="<option value=\""+i+"\" ";
		if(CEV==i)list+=" selected=\"selected\"";
		list+=">"+Str_OTU_Menu2+" "+i+"</option>\n";
	}
	list+="<option value=\""+(PLCs[PlcIdx].EV.length+1)+"\">"+Str_New+" "+Str_OTU_Menu2+"</option>\n";
	list+="</select>\n";
	list+="<input type=\"button\" class=\"INTEXT2\" id=\"GPbS\" value=\""+Str_check_Conf+"\" onclick=\"SetEv();\" />\n";
	//-----------------------------------------------------
	list +="		</td>\n";
	list +="	</tr>\n";
	for (var i=0; i<PLCs[index].Phases.length; i++)
	{
		ph=PLCs[index].Phases[i];
		list +="	<tr bordercolor=\"Silver\">\n";
		list +="		<td align=\"middle\">\n";		
		list +="			G" + (ph+1);
		list +="		</td>\n";
		list +="		<td bgcolor=\"#292929\" align=\"middle\">\n";		
		list +=				color2svg(1,"G"+(ph+1));
		list +="		</td>\n";		
		list +="		<td align=\"middle\">\n";		
		list +="			<table border=\"0\">\n";	
		list +="				<tr bordercolor=\"Silver\">\n";
		for (var j=0; j<PHASEs[ph].R2V.length; j++)
		{
			if(PHASEs[ph].R2V[j].Tiempo>0)
			{
				list +="				<td align=\"right\">\n";
				list +="					<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n";
				list +="						<tr><td align=\"center\" >\n";
				list +="								<img src=\"../../img/up.png\" width=\"20\" height=\"20\" border=\"0\" onclick=\"addTimeEV('R2V',"+ph+","+j+");\"></img>\n";
				list +="						</td></tr>\n";
				list +="						<tr>\n";
				list +="							<td align=\"center\" valign=\"middle\" onclick=\"PHASEs["+ph+"].R2V["+j+"].Tiempo=3;PHASEs["+ph+"].R2V["+j+"].Color=chgColor2(PHASEs["+ph+"].R2V["+j+"].Color,MSKEVRV);this.innerHTML=color2svg(PHASEs["+ph+"].R2V["+j+"].Color,''+PHASEs["+ph+"].R2V["+j+"].Tiempo);\" >\n";
				list +=									color2svg(PHASEs[ph].R2V[j].Color,""+PHASEs[ph].R2V[j].Tiempo);		
				list +="							</td>\n";
				list +="						</tr>\n";
				list +="						<tr><td align=\"center\" >\n";
				list +="								<img src=\"../../img/down.png\" width=\"20\" height=\"20\" border=\"0\" onclick=\"removeTimeEV('R2V',"+ph+","+j+");\"></img>\n";
				list +="						</td></tr>\n";
				list +="					</table>\n";
				list +="				</td>\n";
			}
		}
		list +="					<td  align=\"right\" valign=\"middle\" >\n";
		list +="						<img src=\"../../img/add.png\" width=\"28\" height=\"28\" border=\"0\" onclick=\"addEV('R2V',"+ph+");\"></img>\n";
		list +="					</td>\n";
		list +="					<td  align=\"right\" valign=\"middle\" >\n";
		list +="						<img src=\"../../img/remove.png\" width=\"31\" height=\"31\" border=\"0\" onclick=\"removeEV('R2V',"+ph+");\"></img>\n";
		list +="					</td>\n";
		list +="				</tr>\n";
		list +="			</table>\n";
		list +="		</td>\n";

		list +="		<td bgcolor=\"#292929\" align=\"middle\">\n";
		list +=				color2svg(4,"G"+(ph+1));	
		list +="		</td>\n";
		list +="		<td align=\"middle\">\n";
		
		list +="			<table border=\"0\">\n";	
		list +="				<tr bordercolor=\"Silver\">\n";
		for (var j=0; j<PHASEs[ph].V2R.length; j++)
		{
			if(PHASEs[ph].V2R[j].Tiempo>0)
			{
				list +="				<td align=\"right\">\n";
				list +="					<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n";
				list +="						<tr><td align=\"center\">\n";
				list +="								<img src=\"../../img/up.png\" width=\"20\" height=\"20\" border=\"0\" onclick=\"addTimeEV('V2R',"+ph+","+j+");\"></img>\n";
				list +="						</td></tr>\n";
				list +="						<tr>\n";
				if(j>0)
				{
					list +="							<td  align=\"center\" valign=\"middle\" onclick=\"PHASEs["+ph+"].V2R["+j+"].Tiempo=3;PHASEs["+ph+"].V2R["+j+"].Color=chgColor2(PHASEs["+ph+"].V2R["+j+"].Color,MSKEV);this.innerHTML=color2svg(PHASEs["+ph+"].V2R["+j+"].Color,''+PHASEs["+ph+"].V2R["+j+"].Tiempo);\" >\n";
				}
				else
				{
					if((PHASEs[ph].V2R[j].Color&0x31)==1)
					{
						PHASEs[ph].V2R[j].Color=2;
						PHASEs[ph].V2R[j].Tiempo=3;
					}
					list +="							<td  align=\"center\" valign=\"middle\" onclick=\"PHASEs["+ph+"].V2R["+j+"].Tiempo=3;PHASEs["+ph+"].V2R["+j+"].Color=chgColor2(PHASEs["+ph+"].V2R["+j+"].Color,MSKEV1);this.innerHTML=color2svg(PHASEs["+ph+"].V2R["+j+"].Color,''+PHASEs["+ph+"].V2R["+j+"].Tiempo);\" >\n";
				}
				list +=									color2svg(PHASEs[ph].V2R[j].Color,""+PHASEs[ph].V2R[j].Tiempo);		
				list +="							</td>\n";
				list +="						</tr>\n";
				list +="						<tr><td align=\"center\">\n";
				list +="								<img src=\"../../img/down.png\" width=\"20\" height=\"20\" border=\"0\" onclick=\"removeTimeEV('V2R',"+ph+","+j+");\"></img>\n";
				list +="						</td></tr>\n";
				list +="					</table>\n";
				list +="				</td>\n";
			}
		}	
		list +="					<td  align=\"right\" valign=\"middle\" >\n";
		list +="						<img src=\"../../img/add.png\" width=\"28\" height=\"28\" border=\"0\" onclick=\"addEV('V2R',"+ph+");\"></img>\n";
		list +="					</td>\n";
		list +="					<td  align=\"right\" valign=\"middle\" >\n";
		if(PHASEs[ph].V2R.length>1)
		list +="						<img src=\"../../img/remove.png\" width=\"31\" height=\"31\" border=\"0\" onclick=\"removeEV('V2R',"+ph+");\"></img>\n";			
		list +="					</td>\n";
		list +="				</tr>\n";				
		
		list +="			</table>\n";		
		list +="		</td>\n";
		list +="		<td bgcolor=\"#292929\" align=\"middle\">\n";
		list +=				color2svg(1,"G"+(ph+1));	
		list +="		</td>\n";
		list +="	</tr>\n";				
	}	
	list +="</table>\n";
	return list;	
}

function addEV(tipo, fase)
{
	var last = 0;
	var newEV = {Color: 2, Tiempo: 3};
	
	if(tipo == "V2R")
	{
		last = PHASEs[fase].V2R.length;
		if(last<=7)
			PHASEs[fase].V2R.splice(last,0,newEV);
	}
	if(tipo == "R2V")
	{
		last = PHASEs[fase].R2V.length;
		if(last<=7)
			PHASEs[fase].R2V.splice(last,0,newEV);
	}
	ReDraw(conf_ev);
}

function removeEV(tipo, fase)
{
	var last = 0;
	
	if(tipo == "V2R")
	{
		last = PHASEs[fase].V2R.length -1;
		//if (confirm(Str_EV_RemoveMessage)) 
		{
			PHASEs[fase].V2R.splice(last,1);	
		}	
	}
	if(tipo == "R2V")
	{
		last = PHASEs[fase].R2V.length -1;
		//if (confirm(Str_EV_RemoveMessage)) 
		{
			PHASEs[fase].R2V.splice(last,1);	
		}	
	}
	ReDraw(conf_ev);
}

function addTimeEV(tipo, fase , ev)
{
	if(tipo == "V2R")
	{
		if(PHASEs[fase].V2R[ev].Color==1)
		{
			if(ChkParm("EV.TIME.R",PHASEs[fase].V2R[ev].Tiempo+1))
				PHASEs[fase].V2R[ev].Tiempo++;
		}
		else if(PHASEs[fase].V2R[ev].Color==17 || PHASEs[fase].V2R[ev].Color==18)
		{
			if(ChkParm("EV.TIME.r",PHASEs[fase].V2R[ev].Tiempo+1))
				PHASEs[fase].V2R[ev].Tiempo++;
		}
		else if(PHASEs[fase].V2R[ev].Color==2)
		{
			if(ChkParm("EV.TIME.Y",PHASEs[fase].V2R[ev].Tiempo+1))
				PHASEs[fase].V2R[ev].Tiempo++;
		}
		else
		{
			PHASEs[fase].V2R[ev].Tiempo++;
		}
	}
	if(tipo == "R2V")
	{
		if(PHASEs[fase].R2V[ev].Color==1)
		{
			if(ChkParm("EV.TIME.R",PHASEs[fase].R2V[ev].Tiempo+1))
				PHASEs[fase].R2V[ev].Tiempo++;
		}
		else if(PHASEs[fase].R2V[ev].Color==17 || PHASEs[fase].R2V[ev].Color==18)
		{
			if(ChkParm("EV.TIME.r",PHASEs[fase].R2V[ev].Tiempo+1))
				PHASEs[fase].R2V[ev].Tiempo++;
		}
		else if(PHASEs[fase].R2V[ev].Color==2)
		{
			if(ChkParm("EV.TIME.Y",PHASEs[fase].R2V[ev].Tiempo+1))
				PHASEs[fase].R2V[ev].Tiempo++;
		}
		else
		{
			PHASEs[fase].R2V[ev].Tiempo++;
		}
	}
	ReDraw(conf_ev);
}

function removeTimeEV(tipo, fase , ev)
{
	if(tipo == "V2R")
	{
		if(PHASEs[fase].V2R[ev].Color==1)
		{
			if(ChkParm("EV.TIME.R",PHASEs[fase].V2R[ev].Tiempo-1))
				PHASEs[fase].V2R[ev].Tiempo--;
		}
		else if(PHASEs[fase].V2R[ev].Color==17 || PHASEs[fase].V2R[ev].Color==18)
		{
			if(ChkParm("EV.TIME.r",PHASEs[fase].V2R[ev].Tiempo-1))
				PHASEs[fase].V2R[ev].Tiempo--;
		}
		else if(PHASEs[fase].V2R[ev].Color==2)
		{
			if(ChkParm("EV.TIME.Y",PHASEs[fase].V2R[ev].Tiempo-1))
				PHASEs[fase].V2R[ev].Tiempo--;
		}
		else
		{
			PHASEs[fase].V2R[ev].Tiempo--;
		}
	}
	if(tipo == "R2V")
	{
		if(PHASEs[fase].R2V[ev].Color==1)
		{
			if(ChkParm("EV.TIME.R",PHASEs[fase].R2V[ev].Tiempo-1))
				PHASEs[fase].R2V[ev].Tiempo--;
		}
		else if(PHASEs[fase].R2V[ev].Color==17 || PHASEs[fase].R2V[ev].Color==18)
		{
			if(ChkParm("EV.TIME.r",PHASEs[fase].R2V[ev].Tiempo-1))
				PHASEs[fase].R2V[ev].Tiempo--;
		}
		if(PHASEs[fase].R2V[ev].Color==2)
		{
			if(ChkParm("EV.TIME.Y",PHASEs[fase].R2V[ev].Tiempo-1))
				PHASEs[fase].R2V[ev].Tiempo--;
		}
		else
		{
			PHASEs[fase].R2V[ev].Tiempo--;
		}
	}
	ReDraw(conf_ev);
}

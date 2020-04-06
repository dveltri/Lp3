//**********************************************************************************************************
// Arquivo - arne.js - Contem fun��es para programa��o das fun��es OTU no controlador MCP+
//
// Desenvolvido por    : Eng. M�rcio Jos� Soares
// Data                : 07/04/2014
// Linguagem           : JavaScript
// Plataforma de testes: Placa MCP+ REV3.0 Brasil 
//**********************************************************************************************************
var BitSel=0;
var MaxNrBit = 32;
var QtDem=0;
var nrplansel = -1;

var FncPrms = new Array();
FncPrms[0] = ["Demanda"			,"Dn"	,"PLC"	,"Inp"	,"0"];
FncPrms[1] = ["Todas as Demandas"		,"DX"	,"PLCs"	,"0"	,"0"];
FncPrms[2] = ["Piscante"		,"FF"	,"PLCs"	,"0"	,"0"];
FncPrms[3] = [Str_Stage			,"Fn"	,"PLC"	,"Sts"	,"Inp"];
FncPrms[4] = [""				,"HI"	,"PLCs"	,"Inp"	,"0"];
FncPrms[5] = ["Lamp off"		,"SL"	,"PLCs"	,"0"	,"0"];
FncPrms[6] = ["Alterar Relogio"		,"TS"	,"Hs"	,"Min"	,"0"];
FncPrms[7]=0;
FncPrms[8]=0;
FncPrms[9]=0;
FncPrms[10] = ["Controller Fail","CF"	,"PLCs"	,"0"	,"0"];
FncPrms[11] = ["Sync"			,"CS"	,"1"	,"0"	,"0"];
FncPrms[12] = ["Demand Fail"	,"DF"	,"0"	,"0"	,"0"];
FncPrms[13] = ["Piscante"		,"FR"	,"PLCs"	,"0"	,"0"];
FncPrms[14] = ["Estado"			,"Gn"	,"PLC"	,"Sts"	,"0"];
FncPrms[15] = [""				,"GP"	,"PLCs"	,"0"	,"0"];
FncPrms[16] = ["Lamp Off"		,"LE"	,"PLCs"	,"0"	,"0"];
FncPrms[17] = ["Lamp Error"		,"LFn"	,"PLCs"	,"0"	,"0"];
FncPrms[18] = ["Contrl Manual"	,"MC"	,"PLCs"	,"0"	,"0"];
FncPrms[19] = ["Demand"			,"SDn"	,"InpSF"	,"0"	,"0"];

function compare(a,b) 
{
  if (a.NBit < b.NBit)
     return -1;
  if (a.NBit > b.NBit)
    return 1;
  return 0;
}
function DelCtrl(value)
{
	OTU.BitCofigRx.splice(value-1,1);
	BitSel=1;
}
function DelRply(value)
{
	OTU.BitCofigTx.splice(value-1,1);
	BitSel=33;
}
function AddCtrl(value)
{
	var x=OTU.BitCofigRx.length;
	OTU.BitCofigRx[x]= new Object();
	OTU.BitCofigRx[x].NBit=value-1;
	OTU.BitCofigRx[x].Fnc="-";
	OTU.BitCofigRx[x].Parms=[0,0,0];
	BitSel=1;
	OTU.BitCofigRx.sort(compare);
}
function AddRply(value)
{
	var x=OTU.BitCofigTx.length;
	OTU.BitCofigTx[x]= new Object();
	OTU.BitCofigTx[x].NBit=value;
	OTU.BitCofigTx[x].Fnc="-";
	OTU.BitCofigTx[x].Parms=[0,0,0];
	BitSel=33;
	OTU.BitCofigTx.sort(compare);
}
function GetPrmFnc(Fnc,prm)
{
	for(var idx=0;idx<FncPrms.length;idx++)
	{
		if(FncPrms[idx])
		{
			if(Fnc==FncPrms[idx][1])
				return FncPrms[idx][prm];
		}
	}
}
//---------------------------------------------------------------------------
function GetCtrl()
{
	var out="";
	var x=0;
	var z=0;
	var sts=0;
	var idx=0;
	var plc=0;
	var QtDem = 1*((9+parseInt(GlobalParms.Inputs)+parseInt(GlobalParms.Loops)));
	var QtDem = IOs.length;
	out += "<table border=\"0\" align=\"left\" cellpadding=\"0\" cellspacing=\"0\" width=\"30%\">\n";
	//---------------------------------------------------------------------------------------------------
	{
		out += "<tr bgcolor=\"#C0F0C0\">\n";
		out += "<td valign=\"middle\" align=\"left\">\n";
		out += "<select class=\"INTEXT\" onchange=\"if(this.value){AddCtrl(this.value);ShwArne0();}\" >\n";
		out += "<option value=\"0\">Add "+Str_Ctrl_OTU+" Bit</option>\n";
		for(idx=0;idx<MaxNrBit;idx++)
		{
			;
			for(x=0;x<OTU.BitCofigRx.length;x++)
			{
				if(idx == OTU.BitCofigRx[x].NBit)
					break;
			}
			if(x==OTU.BitCofigRx.length)
			{
					out += "<option value=\""+(idx+1)+"\">"+Str_Ctrl_OTU+" "+(idx+1)+"</option>\n";
			}
		}
		out += "</select>";	//Este objeto ir� permitir ao usu�rio controlar os itens de uma lista de op��es criada com o tag HTML
		out += "</td>";
		out += "<td valign=\"middle\" align=\"left\">\n";
		out += "<select class=\"INTEXT\" onchange=\"if(this.value){DelCtrl(this.value);ShwArne0();}\" >\n";
		out += "<option value=\"0\">Dell "+Str_Ctrl_OTU+" Bit</option>\n";
		for(idx=0;idx<OTU.BitCofigRx.length;idx++)
		{
				out += "<option value=\""+(idx+1)+"\">Del "+Str_Ctrl_OTU+" "+(OTU.BitCofigRx[idx].NBit+1)+"</option>\n";
		}
		out += "</select>";	
		out += "</td>";
		out += "<td valign=\"middle\" align=\"left\">\n";
		out += "<select class=\"INTEXT\" onchange=\"if(this.value){AddRply(this.value-1);ShwArne0();}\" >\n";
		out += "<option value=\"0\">Add "+Str_Reply_OTU+" Bit</option>\n";
		for(idx=0;idx<MaxNrBit;idx++)
		{
			for(x=0;x<OTU.BitCofigTx.length;x++)
			{
				if(idx == OTU.BitCofigTx[x].NBit)
					break;
			}
			if(x==OTU.BitCofigTx.length)
			{
					out += "<option value=\""+(idx+1)+"\">"+Str_Reply_OTU+" "+(idx+1)+"</option>\n";
			}
		}
		out += "</select>";	
		out += "</td>";
		out += "<td valign=\"middle\" align=\"left\">\n";
		out += "<select class=\"INTEXT\" onchange=\"if(this.value){DelRply(this.value);ShwArne0();}\" >\n";
		out += "<option value=\"0\">Dell "+Str_Reply_OTU+" Bit</option>\n";
		for(idx=0;idx<OTU.BitCofigTx.length;idx++)
		{
				out += "<option value=\""+(idx+1)+"\">Del "+Str_Reply_OTU+" "+(OTU.BitCofigTx[idx].NBit+1)+"</option>\n";
		}
		out += "</select>";	
		out += "</td>";
		out += "</tr>";	
	}
	//---------------------------------------------------------------------------------------------------
	if(BitSel)
	{
		if(BitSel>32)
		{
			var bitsel = BitSel-32-1;
			bitsel%=OTU.BitCofigTx.length;
			var Type=Str_Reply_OTU;
			var VecN="BitCofigTx";
			var Parms=OTU.BitCofigTx[bitsel].Parms;
			var BitN=	OTU.BitCofigTx[bitsel].NBit;
			var Fnc=	OTU.BitCofigTx[bitsel].Fnc;
		}
		else
		{
			var bitsel = BitSel-1;
			bitsel%=OTU.BitCofigRx.length;
			var Type=Str_Ctrl_OTU;
			var VecN="BitCofigRx";
			var Parms=OTU.BitCofigRx[bitsel].Parms;
			var BitN=	OTU.BitCofigRx[bitsel].NBit;
			var Fnc=	OTU.BitCofigRx[bitsel].Fnc;
		}
		//---------------------------------------------------------------------------------------------------
		{
			out += "<tr bgcolor=\"#A0C0A0\">\n";
			out += "<td valign=\"middle\" align=\"left\">\n";
			out += Type +" Bit";
			out += "</td>";
			out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
			out += (parseInt(BitN)+1);
			out += "</td>";
			out += "</tr>";	
		}
		//---------------------------------------------------------------------------------------------------
		{
			out += "<tr bgcolor=\"#C0F0C0\" >\n";
			out += "<td valign=\"middle\" align=\"left\">\n";
			out += Str_OTU_Command;
			out += "</td>";
			out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
			out += "<select class=\"INTEXT\" onchange=\"OTU."+VecN+"["+bitsel+"].Fnc=this.value;ShwArne0();\" >\n";
			out += "<option value=\"-\" > - </option>\n";
			if(Type==Str_Ctrl_OTU)
			{
				for(idx=0;idx<10;idx++)
				{
					if(FncPrms[idx])
					{
						out += "<option value=\""+FncPrms[idx][1]+"\" ";
						if(Fnc==FncPrms[idx][1])
						{
							z=idx;
							out += "selected=\"selected\"";
						}
						out += ">("+FncPrms[idx][1]+")"+FncPrms[idx][0]+"</option>\n";
					}
				}
			}
			else
			{
				for(idx=10;idx<FncPrms.length;idx++)
				{
					if(FncPrms[idx])
					{
						out += "<option value=\""+FncPrms[idx][1]+"\" ";
						if(Fnc==FncPrms[idx][1])
						{
							z=idx;
							out += "selected=\"selected\"";
						}
						out += ">("+FncPrms[idx][1]+")"+FncPrms[idx][0]+"</option>\n";
					}
				}
			}
			out += "</select>\n";
			out += "</td>";
			out += "</tr>";	
		}
		//---------------------------------------------------------------------------------------------------
		if(Fnc != "-")
		{
			for(var prm=0;prm<FncPrms[z].length;prm++)
			{
				Color="bgcolor=\"#C0F0C0\"";
				if ((prm%2)==0)
					Color="bgcolor=\"#A0C0A0\"";
				out += "<tr "+Color+">\n";
				//-------------------------------------  controllers	 ---------------------------------------
				if (FncPrms[z][prm+2] == "PLCs")
				{
					out += "<td valign=\"middle\" align=\"left\">\n";
					out += Str_GP_Controllers+" \n";
					out += "</td>";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">";
					for(idx=0;idx<PLCs.length;idx++)
					{
							out += "["+(idx+1)+"<input type=\"checkbox\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]^="+(1<<idx)+";ShwArne0();\" "
							if(Parms[prm]&(1<<idx))
								out += "checked=\"checked\"";
							out += "/>] ";
					}
					out += "</td>";
				}
				//-------------------------------------  controller	 ---------------------------------------
				if (FncPrms[z][prm+2] == "PLC")
				{
					plc=parseInt(Parms[prm]);
					out += "<td valign=\"middle\" align=\"left\">\n";
					out += Str_Controllers+" \n";
					out += "</td>";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					for(idx=0;idx<PLCs.length;idx++)
					{
						out += "["+Str_Controllers+(idx+1)+"<input type=\"radio\" name=\"SelPlc\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]="+(idx+1)+";ShwArne0();\" ";
						if(Parms[prm]==(idx+1))
							out += " checked=\"checked\""
						out += "/>] ";
					}
					out += "</td>";
				}
				//-------------------------------------  Estados	 ---------------------------------------
				if (FncPrms[z][prm+2] == "Sts" && plc)
				{
					sts=parseInt(Parms[prm]);
					out += "<td valign=\"middle\" align=\"left\">\n";
					out += Str_Stage+"\n";
					out += "</td>";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					for(idx=0;idx<PLCs[plc-1].Sts.length;idx++)
					{
						out += "["+String.fromCharCode(65+idx)+"<input type=\"radio\" name=\"SelSts\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]="+(idx+1)+";ShwArne0();\" ";
						if(Parms[prm]==(idx+1))
							out += " checked=\"checked\""
						out += "/>] ";
					}
					out += "</td>";
				}
				//-------------------------------------  entradas	 ---------------------------------------
				if (FncPrms[z][prm+2] == "Inp"  && plc)
				{
					if(plc && sts)
					{
						for(var dem=0;dem<PLCs[plc-1].OTUPlan.OTUDEMSTS.length;dem++)
						{
							if(PLCs[plc-1].OTUPlan.OTUDEMSTS[dem]!=0 && PLCs[plc-1].OTUPlan.OTUSTSDEM[dem]==sts)
							{
								if(Parms[prm]!=PLCs[plc-1].OTUPlan.OTUDEMSTS[dem])
								{
									Parms[prm]=PLCs[plc-1].OTUPlan.OTUDEMSTS[dem];
									setTimeout("ShwArne0();",200); //Faz com que uma express�o seja avaliada ap�s um determinado tempo (milissegundos)
								}
								break;
							}
						}
					}
					out += "<td valign=\"middle\" align=\"left\">\n";
					out += Str_OTU_Demand+"\n";
					out += " Disable<input type=\"radio\" name=\"SelDem\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]=0;ShwArne0();\" ";
					if(Parms[prm]==0)
						out += " checked=\"checked\""
					out += "/>";
					out += "</td>";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					x=0;
					for(idx=0;idx<QtDem;idx++)
					{
						//indexof retorna a posi��o �ndice dentro da string, se o �ndice n�o estiver na string, indexof retorna -1, se retornar -1 entra no if
						if(((IOs[idx].Type&1)==1) && (IOs[idx].Enable!=0) && (IOs[idx].Name.indexOf("Bot")!=-1)) 
						{
							out +="[";
							if(idx<9)
								out +="0";
							out += (idx+1);
							out+="("+IOs[idx].Name+")<input type=\"radio\" name=\"SelDem\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]="+(idx+1)+";ShwArne0();\" ";
							if(Parms[prm]==(idx+1))
								out += " checked=\"checked\""
							out += "/>] ";
							if((x%5)==4)
								out += "<br/>";
							x++;
						}
					}
					out += "</td>";
				}
				//-------------------------------------  entradas Sin Filtro ---------------------------------------
				if (FncPrms[z][prm+2] == "InpSF")
				{
					out += "<td valign=\"middle\" align=\"left\">\n";
					out += Str_OTU_Demand+"\n";
					out += " Disable<input type=\"radio\" name=\"SelDem\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]=0;ShwArne0();\" ";
					if(Parms[prm]==0)
						out += " checked=\"checked\""
					out += "/>";
					out += "</td>";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					x=0;
					for(idx=0;idx<QtDem;idx++)
					{
						if(((IOs[idx].Type&1)==1) && (IOs[idx].Enable!=0) && (IOs[idx].Name.indexOf("Bot")!=-1))
						{
							out +="[";
							if(idx<9)
								out +="0";
							out += (idx+1);
							out+="("+IOs[idx].Name+")<input type=\"radio\" name=\"SelDem\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]="+(idx+1)+";ShwArne0();\" ";
							if(Parms[prm]==(idx+1))
								out += " checked=\"checked\""
							out += "/>] ";
							if((x%5)==4)
								out += "<br/>";
							x++;
						}
					}
					out += "</td>";
				}
				//-------------------------------------  Horas	 ---------------------------------------
				if (FncPrms[z][prm+2] == "Hs")
				{
					out += "<td valign=\"middle\" align=\"left\">Hora:</td>\n";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					out += "<select class=\"INTEXT\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]=this.value;ShwArne0();\" >\n";
					for(idx=0;idx<24;idx++)
					{
							out += "<option value=\""+idx+"\""
							if(Parms[prm]==idx)
								out += " selected=\"selected\"";
							out += ">"+idx+"</option>\n";
					}
					out += "</select>\n";
					out += "</td>";
				}
				//-------------------------------------  Min	 ---------------------------------------
				if (FncPrms[z][prm+2] == "Min")
				{
					out += "<td valign=\"middle\" align=\"left\">Minuto:</td>\n";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					out += "<select class=\"INTEXT\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]=this.value;ShwArne0();\" >\n";
					for(idx=0;idx<60;idx++)
					{
							out += "<option value=\""+idx+"\""
							if(Parms[prm]==idx)
								out += " selected=\"selected\"";
							out += ">"+idx+"</option>\n";
					}
					out += "</select>\n";
					out += "</td>";
				}
				//-------------------------------------  0	 ---------------------------------------
				out += "</tr>";	
			}
		}
	}
	//-----------------------------------------------------------------------------------------------------------------------------
	out += "</table>";
	return out;
}

function ShwArne0()
{
	var out="";
	var count2=0;
	var QtAnel = 1*(GlobalParms.Controllers);
	var QtDem = 1*((9+parseInt(GlobalParms.Inputs)+parseInt(GlobalParms.Loops)));
	out += "<table border=\"0\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" >\n";
	out += "<tr>\n";
	//--------------------------------------------------------------------------------------------------- Str_Ctrl_OTU
	out += "<td align=\"center\" valign=\"top\">\n";
	{
		out += "<table border=\"0\" align=\"right\" cellpadding=\"2\" cellspacing=\"0\" width=\"60%\">\n";
		out += "<tr >\n";
		out += "<td align=\"center\" colspan=\"6\" bgcolor=\"#C0C0C0\">"+Str_Ctrl_OTU+"</td>\n"; /*bgcolor: cor de fundo #C0C0C0 rgb(192, 192, 192) */
		out += "</tr>\n";
		for(count2=0;count2<OTU.BitCofigRx.length;count2++)
		{
			var Color="";
			if ((count2%2)==1)
				Color="bgcolor=\"#F0F0F0\"";
			if((count2+1)==BitSel)
				Color="bgcolor=\"#40FF40\"";//cor de fundo
			out += "<tr "+Color+">\n";
			out += "<td align=\"center\" >\n";
			out += "<input type=\"radio\" id=\"SelBit\" onchange=\"BitSel="+(count2+1)+";ShwArne0();\""
			if((count2+1)==BitSel)
				out += " checked=\"checked\""
			out += " />";
			out += "</td>\n";
			out += "<td align=\"center\"><font size=\"1\">"+(OTU.BitCofigRx[count2].NBit+1)+"</font></td>\n";
			out += "<td align=\"left\"><font size=\"1\">("+OTU.BitCofigRx[count2].Fnc+")"+GetPrmFnc(OTU.BitCofigRx[count2].Fnc,0)+"</font></td>\n";
			for(idx=0;idx<3;idx++)
			{
				if (GetPrmFnc(OTU.BitCofigRx[count2].Fnc,idx+2) == "0")
					OTU.BitCofigRx[count2].Parms[idx]="0";
				if (GetPrmFnc(OTU.BitCofigRx[count2].Fnc,idx+2) == "1")
					OTU.BitCofigRx[count2].Parms[idx]="1";
				if(OTU.BitCofigRx[count2].Parms[idx])
					out += "<td align=\"center\"><font size=\"1\">"+OTU.BitCofigRx[count2].Parms[idx]+"</font></td>\n";
			}
			out += "</tr>\n";
		}
		out += "</table>";
	}
	out += "</td>\n";
	//--------------------------------------------------------------------------------------------------- Str_Reply_OTU
	out += "<td align=\"center\" valign=\"top\">\n";
	{
		out += "<table  border=\"0\" align=\"left\" cellpadding=\"2\" cellspacing=\"0\" width=\"60%\">\n";
		out += "<tr>\n";
		out += "<td align=\"center\" colspan=\"6\" bgcolor=\"#C0C0C0\">"+Str_Reply_OTU+"</td>\n";
		out += "</tr>\n";
		for(count2=0;count2<OTU.BitCofigTx.length;count2++)
		{
			var Color="";
			if ((count2%2)==1)
				Color="bgcolor=\"#F0F0F0\"";
			if((count2+32+1)==BitSel)
				Color="bgcolor=\"#40FF40\"";
			out += "<tr "+Color+">\n";
			out += "<td align=\"center\" >\n";
			out += "<input type=\"radio\" id=\"SelBit\" onchange=\"BitSel="+(count2+32+1)+";ShwArne0();\""
			if((count2+32+1)==BitSel)
				out += " checked=\"checked\""
			out += " />";
			out += "</td>\n";
			out += "<td align=\"center\"><font size=\"1\">"+(OTU.BitCofigTx[count2].NBit+1)+"</font></td>\n";
			out += "<td align=\"left\"><font size=\"1\">("+OTU.BitCofigTx[count2].Fnc+")"+GetPrmFnc(OTU.BitCofigTx[count2].Fnc,0)+"</font></td>\n";
			for(idx=0;idx<3;idx++)
			{
				if (GetPrmFnc(OTU.BitCofigTx[count2].Fnc,idx+2) == "0")
					OTU.BitCofigTx[count2].Parms[idx]="0";
				if (GetPrmFnc(OTU.BitCofigTx[count2].Fnc,idx+2) == "1")
					OTU.BitCofigTx[count2].Parms[idx]="1";
				if(OTU.BitCofigTx[count2].Parms[idx])
					out += "<td align=\"center\"><font size=\"1\">"+OTU.BitCofigTx[count2].Parms[idx]+"</font></td>\n";
			}
			out += "</tr>\n";
		}
		out += "</table>";
	}
	out += "</td>\n";
	//---------------------------------------------------------------------------------------------------
	out += "<td align=\"center\" valign=\"top\">\n";
	//---------------------------------------- G1G2
	{
		out += "<table border=\"0\" bgcolor=\"#F0F0F0\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" width=\"30%\">\n";
		out += "<tr>\n";
		out += "<td align=\"center\" >\n";
		out += "<font size=\"2\">Config G1 G2 bit</font>";
		out += "</td>\n";
		out += "<td align=\"center\" colspan=\"5\" >\n";
		out += "<select class=\"INTEXT\" onchange=\"OTU.G1G2=this.value;ShwArne0();\" >\n";
		OTU.G1G2&=3;
		switch(OTU.G1G2)
		{
			case 0:
			case 3:
				OTU.G1G2=0;
				out += "<option value=\"0\" selected=\"selected\">"+Str_Lack+"</option>\n";
				out += "<option value=\"1\">"+Str_FO+"</option>\n";
				out += "<option value=\"2\">"+Str_Manual_CTRL+"</option>\n";
			break;
			case 1:
				out += "<option value=\"0\">"+Str_Lack+"</option>\n";
				out += "<option value=\"1\"  selected=\"selected\">"+Str_FO+"</option>\n";
				out += "<option value=\"2\">"+Str_Manual_CTRL+"</option>\n";
			break;
			case 2:
				out += "<option value=\"0\">"+Str_Lack+"</option>\n";
				out += "<option value=\"1\">"+Str_FO+"</option>\n";
				out += "<option value=\"2\" selected=\"selected\">"+Str_Manual_CTRL+"</option>\n";
			break;
		}
		out += "</select>\n";
		out += "</td>\n";
		out += "</tr>\n";
		//--------------------------------------- FO
		out += "<tr>\n";
		out += "<td align=\"center\" >\n";
		out += "<font size=\"2\">Config FO bit</font>";
		out += "</td>\n";
		out += "<td align=\"center\" colspan=\"5\" >\n";
		out += "<select class=\"INTEXT\" onchange=\"OTU.FO=this.value;ShwArne0();\" >\n";
		if(OTU.FO == 0)
			out += "<option value=\"0\" selected=\"selected\"> - </option>\n";
		else
			out += "<option value=\"0\"> - </option>\n";
		for(var idx=0;idx<MaxNrBit;idx++)
		{
			out += "<option value=\""+(idx+1)+"\" ";
			if((idx+1) == OTU.FO)
				out +="selected=\"selected\"";
			out += ">"+(idx+1)+"</option>\n";
		}
		out += "</select>\n";
		out += "</td>\n";
		out += "</tr>\n";
		out += "</table>";
	}
	out += "</td>\n";
	//---------------------------------------------------------------------------------------------------
	{
		out += "<td align=\"center\" valign=\"top\" >\n";
		out +=GetCtrl()+"<br/>";
		out +="<textarea id=\"filecsv\" class=\"INTEXT\" rows=\"16\" cols=\"75\" onkeyup=\"\"></textarea><br/>";
		out +="<input type=\"button\" class=\"INTEXT2\" value=\"decode\" onclick=\"decode();\"/>";
		out += "</td>";
	}
	out += "</tr>\n";
	out += "</table>";
	//---------------------------------------------------------------------------------------------------
	document.getElementById("HOME1").innerHTML=out; 
	/*O objeto document armazena todas as caracteristicas da pagina HTML, sempre 
	que � feito algo no <body> � armazenado no document, nele � armazenado cor das letras, cor da p�gina e etc*/
}

function decode()
{
	var out;
	var temp;
	var temp2;
	var Datos=document.getElementById('filecsv').value;
	Datos=Remplace(Datos,"\n\n","\n");
	Datos=Remplace(Datos,"\r\n","\n");
	Datos=Datos.split("\n");
	for (var a=0;a<Datos.length;a++)
	{
		if(Datos[a].indexOf("#")!=-1 || Datos[a]=="")
		{
			Datos.splice(a,1);
			a--;
		}
		else
		{
			temp=Datos[a].indexOf("\"");
			temp2=Datos[a].indexOf("\"",temp+1);
			if(temp!=-1)
			{
				out=Datos[a];
				Datos[a]=out.substr(0, temp)+out.substr(temp2);
			}
			Datos[a]=Datos[a].split(",");
			temp=Datos[a][0];
			Datos[a][0]=Datos[a][5];
			Datos[a][5]=temp;
			if(Datos[a][3].indexOf("In")!=-1)
				Datos[a][0]="Tx"+(parseInt(Datos[a][0])-1);
			else
				Datos[a][0]="Rx"+(parseInt(Datos[a][0])-1);
			//Datos[a].splice(7,1);
			Datos[a].splice(6,10);
			Datos[a].splice(4,1);
			Datos[a].splice(3,1);
			temp=Datos[a][2];
			Datos[a][2]=Datos[a][3].slice(-1);
			Datos[a][3]=temp;
			if(Datos[a][1]=="LO")
			{
				Datos[a][1]="SL";
				//Datos[Datos.length]='J91221,FO,1,Out,"FA: Controller force bits for stage",1,0,0';
			}
			for(var idx=0;idx<FncPrms.length;idx++)
			{
				if(FncPrms[idx][1]==Datos[a][1])
					break;
			}
			if(idx>=FncPrms.length)
			{
				Datos.splice(a,1);
				a--;
			}
			if(Datos[a][1]=="TS")
			{
				Datos[a][2]="2";
				Datos[a][3]="0";
			}	
			if(Datos[a][1]=="FF")
			{
				Datos[a][2]="255";
			}	
			if(Datos[a][1]=="FR")
			{
				Datos[a][2]="255";
			}	
			if(Datos[a][1]=="SL")
			{
				Datos[a][2]="255";
			}	
			if(Datos[a][1]=="DX")
			{
				Datos[a][2]="255";
			}	
			if(Datos[a][1]=="MC")
			{
				Datos[a][2]="255";
			}	
			if(Datos[a][1]=="CF")
			{
				Datos[a][2]="255";
			}	
		}
	}
	if(GlobalParms.MODEL.indexOf("GW4")==-1)
	{
		if(GlobalParms.MODEL.indexOf("GW3M4")!==-1)
		{
			out="Comm:3\nG1G2:0\n\nCFT0:\nCFT1:\nCFT2:\nCFT3:\n\n";
		}
		else
		{
			out="Comm:2\nG1G2:0\n\nCFT0:\nCFT1:\nCFT2:\nCFT3:\n\n";
		}
	}
	if(GlobalParms.MODEL.indexOf("GW4")!=-1)
		out="Comm:6\nG1G2:0\n\nCFT0:\nCFT1:\nCFT2:\nCFT3:\n\n";
	for (var a=0;a<Datos.length;a++)
	{
		out+=Datos[a]+"\n";
	}
	out+="\n"
	for (var a=0;a<Datos.length;a++)
	{
		out+=Datos[a]+"\n";
	}
	RcvOTU2(out);
	ShwArne0();
}

//**********************************************************************************************************
// Fun��o selplanN - seleciona o plano do Anel a ser for�ado
//
// Entradas - nenhuma
// Sa�das   - nenhuma 
//**********************************************************************************************************
function selplanN()
{
	
	var e;
	var myValue;
	var ComboName;
	ComboName = "selplan"
	e = document.getElementById(ComboName);					//pega elemento Combo
	myValue = 1*(e.options[e.selectedIndex].value);	
	nrplansel = myValue;
	//alert(myValue);
	ShwArne1();
}

//**********************************************************************************************************
// Fun��o myRestPlan - restaura plano ap�s ter for�ado um
//
// Entradas - nenhuma
// Sa�das   - nenhuma 
//**********************************************************************************************************
function myRestPlan()
{	
	GetUrlB(PrgEd[SrcIdx].host+'/web/rldsch.dgv',fncnone);
}

//**********************************************************************************************************
// Fun��o myForcePlanCont - verifica se n�mero digitado para plano a ser for�ado � valido 
//                          e for�a o plano em caso afirmativo
//
// Entradas - nenhuma
// Sa�das   - nenhuma 
//**********************************************************************************************************
function myForcePlanCont()
{
	var snxchg;
	var pos1 = 0;
	var pos2 = 0;
	if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
		snxchg = 1*(document.getElementById("NxChgPlan").value);
	else
		snxchg = 1*(document.getElementById("NxChgPlan").value*60);
	if(isNaN(snxchg) || snxchg <=0)
	{											//se n�o for n�mero ou menor que zero e maior igual a 98
		alert('Erro!!! Tempo invalido!!');										//alerta o erro com um bot�o "ok"
		inputFocus="NxChgPlan";
		if(inputFocus)document.getElementById(inputFocus).focus();		//entra em foco
		return;
	}
	
	if(nrplansel > -1)
	{
		myurl = PrgEd[SrcIdx].host+"/web/runplans.dgv?splan%27"+nrplansel+"&splc%27"+(PlcIdx+1)+"&snxchg%27"+(snxchg+1);
		GetUrlB(myurl,fncnone);
	}
	else
	{
		alert('Erro!!! Plano nao selecionado!!');										//alerta o erro
		inputFocus="selplan";
		if(inputFocus)document.getElementById(inputFocus).focus();		//entra em foco
		return;
	}
}

function OptTime()
{
	var out="";
	var d1=(24*60*60);
    var n = new Date();
	var ofh=0;
	var ofm=0;
	var n2 = n.getFullYear()+"/"+(n.getMonth()+1)+"/"+n.getDate()+" 00:00:00";
	n2=new Date(n2);
	var rtc=parseInt(n2.getTime()/1000);
	rtc-=(n2.getTimezoneOffset()*60);
    n = n.toLocaleTimeString();
    n=n.split(':');
    n[0]=parseInt(n[0]);
	ofh=n[0];
	ofm=parseInt(n[1]);
    n[1]=ofm+7;
    n[1]-=(n[1]%5);
		if(n[1]>=60)
		{
			n[1]-=60;
			n[0]++;
			n[0]%=24;
		}
  	for(var h=0;h<24;h++)
    {
      for(var m=0;m<60;m++)
      {
      	if(((h*60)+m)>=((n[0]*60)+n[1]))
					d1=0;
				out+="<option value=\""+((rtc+d1+(h*60*60)+(m*60)))+"\"";
      	if(h==n[0] && m==n[1])
					out+= " selected=\"selected\" ";
				out+=" >"+("0"+h).slice(-2)+":"+("0"+m).slice(-2)+":00";
				if(d1)
					out+=" +1D";
				out+="</option>\n";
			}
		}
    return out;
}
//**********************************************************************************************************
// Fun��o ShwArne1 - pega o n�mero de um plano para for�ar o mesmo
//
// Entradas - nenhuma
// Sa�das   - nenhuma 
//**********************************************************************************************************
function ShwArne1()
{
	var out = "";
	var nxchg = 0;					//pega n�mero do plano do usu�rio
	var count1=0;
	var name="";
	var p=0;
	var pln=0;

	out = "<table id=\"myForceT0\" border=\"1\" align=\"center\">\n";	
	out += "<tr><td align=\"left\" valign=\"middle\" colspan=\"2\"><font size=\"1\"> ";
	for(var j=0;j<PLCs.length;j++)
	{
		out += PLCs[j].Name
		out += "("+Str_Storage_plans+":"+PLCs[j].Plans.length;
		out += Str_User_plans+":"+PLCs[j].Plans.length+")<br/>";
	}
	out += Str_Force_info+"</font></td></tr>\n";
	out += "<tr><td  align=\"left\" valign=\"middle\">"+Str_Plan_Number+":</td>\n";
	out += "<td align=\"left\" valign=\"middle\">\n";
	out += "<select name=\"selplan\" id=\"selplan\" onchange=\"nrplansel=this.value\" >\n";
	if(nrplansel == -1)
		out += "<option value=\"-1\" selected=\"selected\"><font size=\"1\"> - </font></option>\n";
	else
		out += "<option value=\"-1\"><font size=\"1\"> - </font></option>\n";
	if(nrplansel == 99)
		out += "<option value=\"99\" selected=\"selected\"><font size=\"1\">"+Str_flashing_Plan+"</font></option>\n";
	else
		out += "<option value=\"99\"><font size=\"1\">"+Str_flashing_Plan+"</font></option>\n";
	//-------------------------------------------------
	if(nrplansel == 97)
		out += "<option value=\"97\" selected=\"selected\"><font size=\"1\">"+Str_Off_Plan+"</font></option>\n";
	else
		out += "<option value=\"97\"><font size=\"1\">"+Str_Off_Plan+"</font></option>\n";
	//-----------------------------------------------------------------------------------
	var Cplans=255;
	Cplans=PLCs[0].Plans.length;
	for(var j=0;j<PLCs.length;j++)
	{
		if(Cplans>PLCs[j].Plans.length)
			Cplans=PLCs[j].Plans.length;
		if(Cplans>(PLCs[j].PlanList.length-2))
			Cplans=PLCs[j].PlanList.length-2;
	}
	/*if(Cplans<=0)
		return ""; // */
	for(pln=0;pln<Cplans;pln++)
	{
		if(pln+1 == nrplansel)
			out += "<option value=\""+(pln+1)+"\" selected=\"selected\"><font size=\"1\">"+Str_Plan+(pln+1)+"</font></option>\n";
		else
			out += "<option value=\""+(pln+1)+"\"><font size=\"1\">"+Str_Plan+(pln+1)+"</font></option>\n";
	}
	out += "</select>";
	out += "</td></tr>\n";
	out += "<tr><td align=\"left\" valign=\"middle\">"+Str_period+" [min]:</td>";
	out += "<td align=\"left\" valign=\"middle\">";
	//--------------------------------------------------------
	if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
	{
		out += "<select name=\"NxChgPlan\" id=\"NxChgPlan\" >\n";
		out += OptTime();
		out += "</select>";
	}
	else
	{
		out += "<input name=\"NxChgPlan\" id=\"NxChgPlan\" type=\"TEXT\" size=\"3\" value=\""+nxchg+"\" />";
	}
	//--------------------------------------------------------
	out += "</td></tr>\n";
	out += "<tr><td align=\"left\" valign=\"middle\" colspan=\"2\"><input type=\"button\" class=\"INTEXT2\" onclick=\"myForcePlanCont();\" value=\""+Str_Force_Plan+"\" /></td></tr>\n";
	out += "<tr><td align=\"left\" valign=\"middle\" colspan=\"2\"><input type=\"button\" class=\"INTEXT2\" onclick=\"myRestPlan();\" value=\""+Str_Rest_Plan+"\" /></td></tr>\n";
	out += "</table>\n";
	//alert(out);
	//inputFocus="myPlanN2";													//declara qual elemento recebe o foco
	return out;
	//alert(PlcIdx);
}


//**********************************************************************************************************
//**********************************************************************************************************
// Fun��es para setar os steps n�o permitidos
//**********************************************************************************************************
//**********************************************************************************************************


//**********************************************************************************************************
// Fun��o selcftest - seleciona ponto de conflito "x a y"
//
// Entradas - x - est�gio de sa�da; y - est�gio de destino
// Sa�das   - nenhuma 
//**********************************************************************************************************
function selcftest(nrc1, nrc2)
{
	var ChkbName = "";
	var pos = 0;
	var aux = -1;
	var alt = 0;
	for(pos=0;pos<OTU.CftPLCs[nrcftplc].length;pos++)
	{
		if((nrc1 == OTU.CftPLCs[nrcftplc][pos][0]) && (nrc2 == OTU.CftPLCs[nrcftplc][pos][1]))
		{
			aux = pos;
			break;
		}
	}
	ChkbName = "selcftest_"+nrc1+"a"+nrc2;	
	if(aux >= 0)
	{			//se pediu para alterar, do it !!!	
		if (document.getElementById(ChkbName).checked == true)
		{
			OTU.CftPLCs[nrcftplc][aux][0] = nrc1;
			OTU.CftPLCs[nrcftplc][aux][1] = nrc2; 
		}
		else
		{
			OTU.CftPLCs[nrcftplc].splice(aux,2);
		}
	}
	else
	{																							//n�o � para alterar, ent�o cria!!!
		if (document.getElementById(ChkbName).checked == true)
		{
			if((OTU.CftPLCs[nrcftplc].length == 1) && (OTU.CftPLCs[nrcftplc][0].length == 0))
			{
				OTU.CftPLCs[nrcftplc][OTU.CftPLCs[nrcftplc].length-1].splice(0,0,nrc1,nrc2);
			}
			else
			{	
				OTU.CftPLCs[nrcftplc].length++;
				OTU.CftPLCs[nrcftplc][OTU.CftPLCs[nrcftplc].length-1] = new Array(2);
				OTU.CftPLCs[nrcftplc][OTU.CftPLCs[nrcftplc].length-1][0] = nrc1;
				OTU.CftPLCs[nrcftplc][OTU.CftPLCs[nrcftplc].length-1][1] = nrc2; 
			}
		}
	}
}

//**********************************************************************************************************
// Fun��o selcftplc- seleciona conflito
//
// Entradas - nenhuma
// Sa�das   - nenhuma 
//**********************************************************************************************************
function selcftplc()
{
	
	var e;
	var myValue;
	var ComboName;
		
	ComboName = "selcftplc"
		
	e = document.getElementById(ComboName);					//pega elemento Combo
	myValue = 1*(e.options[e.selectedIndex].value);	
	
	nrcftplc = myValue;
	
	//alert(myValue);
	
	ShwArne2();
	
}

//**********************************************************************************************************
// Fun��o ShwArne2 - mostra tela para configurar est�gios conflitantes
//
// Entradas - nenhuma
// Sa�das   - nenhuma 
//**********************************************************************************************************
function ShwArne2()
{
	var out = "";
	var count1 = 0;
	var count2 = 0;
	var count3 = 0;
	var prima = 0;
	var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','W','X','Y','Z'];
	nrcftplc = PlcIdx;
	out = "<br /><br /><br />\n";
	out += "<table id=\"mycftplc1\" border=\"1\" align=\"center\">\n";	
	out += "<tr><td  align=\"left\" valign=\"middle\">\n";
	out += "<font size=\"2\">"+Str_conflict_transition+" CFT"+(nrcftplc+1)+"</font>\n";
	nrcftplc = PlcIdx;
	out += "</td></tr>\n";
	if(nrcftplc != -1)
	{												//se selecionou alguma coisa
		if(PLCs[PlcIdx].Sts.length > 0)
		{							//e j� tem est�gios, monta tela para definir conflitos
			out += "<tr><td  align=\"left\" valign=\"middle\">\n";
			out += "<table id=\"mycftplc2\" border=\"1\" align=\"center\">\n";
			for(count1=0;count1<(PLCs[PlcIdx].Sts.length+1);count1++)
			{
				out += "<tr>\n";				
				for(count2=0;count2<(PLCs[PlcIdx].Sts.length+1);count2++)
				{
					out += "<td  align=\"center\" valign=\"middle\">\n";
					if(!count1 && (count2 > 0))
					{
						out += "<font size=\"1\">"+alpha[count2-1]+"</font>\n";
					}
					else
					{
						if(!count2 && (count1 > 0))
						{
							out += "<font size=\"1\">&#160;"+alpha[count1-1]+"&#160;</font>\n";
						}
						else
						{
							prima = 0;
							if(OTU.CftPLCs[nrcftplc].length > 0)
							{
								for(count3=0;count3<OTU.CftPLCs[nrcftplc].length;count3++)
								{
									if(((count1 == OTU.CftPLCs[nrcftplc][count3][0]) && (count2 == OTU.CftPLCs[nrcftplc][count3][1])) && (count1 != count2))
									{
										out += "<input type=\"checkbox\" id=\"selcftest_"+count1+"a"+count2+"\" checked=\"checked\" onchange=\"selcftest("+count1+","+count2+")\" />";
										prima = 1;
										break;
									}
									else
									{
										out += "<font size=\"1\">&#160;</font>\n";
									}
								}
								if(!prima)
								{
									if(!(!count1 && !count2) && (count1 != count2))
									{
										out += "<input type=\"checkbox\" id=\"selcftest_"+count1+"a"+count2+"\" onchange=\"selcftest("+count1+","+count2+")\" />";
									}
									else
									{
										out += "<font size=\"1\">&#160;</font>\n";
									}
									prima = 1;
								}
							}
						}
					}
					out += "</td>\n";
				}
				out += "</tr>\n";
			}
			out += "</table>\n";
			out += "</td></tr>\n";
		}
	}
	out += "</table>\n";
	document.getElementById("HOME2").innerHTML=out;
	
}

percent=90;

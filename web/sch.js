var HolyDays= new Array();
var WeekDays= new Array();
var TimeScheduler= new Array();

function StartNewScheduler()
{
	var out="";
	UpFile='/ag.sch';
	UpType='txt';
	ProcessAgenda(out);
}

function RcvAgenda(Datos)
{
	Datos=Datos.responseText;
	ProcessAgenda(Datos);
}

function ProcessAgenda(Datos)
{
	Datos=Datos.split("\n");
	var idxHD=0;
	var idxWD=0;
	var idxTS=0;
	var idx=0;
	HolyDays.length=0;
	WeekDays.length=0;
	TimeScheduler.length=0;
	for(var i=0;i<Datos.length;i++)
	{
		Datos[i]=RemoveUnuseChar(Datos[i]);
		//----------------------------------
		if(idxHD && Datos[i].length)
		{
			idx=HolyDays.length;
			HolyDays[idx]=new Object();
			HolyDays[idx].Date=Datos[i].split(" = ")[0];
			HolyDays[idx].TimeScheduler=Datos[i].split(" = ")[1];
		}
		else
		{
			idxHD=0;
		}
		//- - - - - - - - - - - - - - - - - 
		if(idxWD && Datos[i].length)
		{
			idx=WeekDays.length;
			WeekDays[idx]=new Object();
			WeekDays[idx].Date=Datos[i].split(" ")[0];
			WeekDays[idx].TimeScheduler=Datos[i].split(" ");
			WeekDays[idx].TimeScheduler.splice(0,1);
		}
		else
		{
			idxWD=0;
		}
		//-----------------------------------
		if(Datos[i].indexOf("[Holidays & Dates]")!=-1)
		{
			HolyDays.length=0;
			idxHD=i+1;
		}
		if(Datos[i].indexOf("[weeks]")!=-1)
		{
			WeekDays.length=0;
			idxWD=i+1;
		}
	}
	for(var i=0;i<Datos.length;i++)
	{
		if(Datos[i].indexOf("[")!=-1 && Datos[i].indexOf("]")!=-1 && Datos[i].indexOf("[weeks]")==-1 && Datos[i].indexOf("[Holidays & Dates]")==-1)
		{
			idx=TimeScheduler.length;
			TimeScheduler[idx]=new Object();
			TimeScheduler[idx].Nombre=Datos[i].replace(']','');
			TimeScheduler[idx].Nombre=Datos[i].replace('[','');
			TimeScheduler[idx].Nombre=TimeScheduler[idx].Nombre.replace(']','');
			TimeScheduler[idx].Hs=new Array();
			var idx2=0;
			i++;
			while(i<Datos.length && Datos[i].length)
			{
				idx2=TimeScheduler[idx].Hs.length;
				TimeScheduler[idx].Hs[idx2]=new Object();
				TimeScheduler[idx].Hs[idx2].Time=Datos[i].split(" ")[0];
				TimeScheduler[idx].Hs[idx2].Plan=Datos[i].split(" ")[1];
				i++;
			}
		}
	}
	//ShowAgenda();
}

function SchDelItemH(Item)
{
  HolyDays.splice(Item,1);
  setTimeout('ReDraw(Refresh);',500);
}

function SchDelItemW(Item)
{
  WeekDays.splice(Item,1);
  setTimeout('ReDraw(Refresh);',500);
}

function SchDelItemTT(Item)
{
  TimeScheduler.splice(Item,1);
  setTimeout('ReDraw(Refresh);',500);
}

function SchDelItemT(idx,idx2)
{
  TimeScheduler[idx].Hs.splice(idx2,1);
  setTimeout('ReDraw(Refresh);',500);
}

function SchAddItemH(Item)
{
	var idx=HolyDays.length
	var temp=0;
	temp=document.getElementById("MnewHd").options[document.getElementById("MnewHd").selectedIndex].value
	if(temp<10)temp="0"+temp;
	temp=document.getElementById("DnewHd").options[document.getElementById("DnewHd").selectedIndex].value+"/"+temp;
	if(temp.length==4)temp="0"+temp;
	temp+="/????";
	var tablt="";
	tablt=document.getElementById("htable").options[document.getElementById("htable").selectedIndex].value;
	var i=0;
	while(i<idx && HolyDays[i].Date!=temp)
		i++;
	if(i==idx && tablt!="")
	{
		HolyDays[idx]=new Object();
		HolyDays[idx].Date=temp;
		HolyDays[idx].TimeScheduler=tablt;
	}
	setTimeout('ReDraw(Refresh);',500);
}

function SchAddItemW(Item)
{
	var idx=WeekDays.length
	var temp=0;
	temp=document.getElementById("MnewWd").options[document.getElementById("MnewWd").selectedIndex].value
	if(temp<10)temp="0"+temp;
	temp=document.getElementById("DnewWd").options[document.getElementById("DnewWd").selectedIndex].value+"/"+temp;
	if(temp.length==4)temp="0"+temp;
	temp+="/????";
	var tablt= new Array();
	for(var j=0;j<7;j++)
		tablt[j]=document.getElementById(("Tablas"+j)).options[document.getElementById(("Tablas"+j)).selectedIndex].value;
	var i=0;
	while(i<idx && WeekDays[i].Date!=temp)
		i++;
	if(i==idx && tablt.indexOf("")==-1)
	{
		WeekDays[idx]=new Object();
		WeekDays[idx].Date=temp;
		WeekDays[idx].TimeScheduler=new Array();
		for(var j=0;j<7;j++)
			WeekDays[idx].TimeScheduler[j]=tablt[j];
	}
	setTimeout('ReDraw(Refresh);',500);
}

function SchAddItemTT()
{
	var name=prompt("Ingrese el nombre");
	name=name.trim();
	if(name!="")
	{
		idx=TimeScheduler.length;
		TimeScheduler[idx]=new Object();
		TimeScheduler[idx].Nombre=name;
		TimeScheduler[idx].Hs=new Array();
		setTimeout('ReDraw(Refresh);',500);
	}
}

function SchCpyItemTT(idx2)
{
	var name=prompt("Ingrese el nombre");
	if(name!="")
	{
		idx=TimeScheduler.length;
		TimeScheduler[idx]=new Object();
		TimeScheduler[idx].Nombre=name;
		TimeScheduler[idx].Hs=new Array();
		TimeScheduler[idx].Hs=TimeScheduler[idx2].Hs;
	}
	setTimeout('ReDraw(Refresh);',500);
}

function SchAddItemT(idx)
{
	idx2=TimeScheduler[idx].Hs.length;
	var temp=document.getElementById(("TSsec"+idx)).options[document.getElementById(("TSsec"+idx)).selectedIndex].value;
	if(temp.length==1)temp="0"+temp;
	temp=":"+temp;
	temp=document.getElementById(("TSmin"+idx)).options[document.getElementById(("TSmin"+idx)).selectedIndex].value+temp;
	if(temp.length==4)temp="0"+temp;
	temp=":"+temp;
	temp=document.getElementById(("TSHs"+idx)).options[document.getElementById(("TSHs"+idx)).selectedIndex].value+temp;
	if(temp.length==7)temp="0"+temp;
	var tablt="";
	tablt=document.getElementById(("TSPlan"+idx)).options[document.getElementById(("TSPlan"+idx)).selectedIndex].value;
	var i=0;
	while(i<idx2 && TimeScheduler[idx].Hs[i].Time!=temp)
		i++;
	if(i==idx2 && tablt!="")
	{
		TimeScheduler[idx].Hs[idx2]=new Object();
		TimeScheduler[idx].Hs[idx2].Time=temp;
		TimeScheduler[idx].Hs[idx2].Plan=tablt;
	}
	setTimeout('ReDraw(Refresh);',500);
}

function CloneSch()
{
	ModParm("PLCs.Sch");
	for(var idx=0;idx<TimeScheduler.length;idx++)
	{
		var idx2=0;
		while(idx2<TimeScheduler[idx].Hs.length)
		{
			for(var p=0;p<GlobalParms.Controllers;p++)
			{
				if(99!=parseInt(TimeScheduler[idx].Hs[idx2].Plan) && 98!=parseInt(TimeScheduler[idx].Hs[idx2].Plan))
				{
					if(TimeScheduler[idx].Hs[idx2].Plan>PLCs[p].Plans.length)
					{
						if(TimeScheduler[idx].Hs.length>1)
						{
							TimeScheduler[idx].Hs.splice(idx2,1);
							if(idx2)idx2--
						}
						else
						{
							TimeScheduler[idx].Hs[idx2].Plan=99;
						}
					}
				}
			}
			idx2++
		}
	}
	for(var j=0;j<GlobalParms.Controllers;j++)
	{
		PLCs[j].HolyDays=owl.deepCopy(HolyDays);
		PLCs[j].WeekDays=owl.deepCopy(WeekDays);
		PLCs[j].TimeScheduler=owl.deepCopy(TimeScheduler);
	}	
}

function MakeSch()
{
	PLCs[PlcIdx].HolyDays=owl.deepCopy(HolyDays);
	PLCs[PlcIdx].WeekDays=owl.deepCopy(WeekDays);
	PLCs[PlcIdx].TimeScheduler=owl.deepCopy(TimeScheduler);
	ModSch();
}

function MakeSchToFile(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	if(!Prg.PLCs[PlcIdx])
		return "";
	UpFile=Prg.PLCs[PlcIdx].Scheduler+"";
	var temp=UpFile.indexOf("ag.sch");
	if(temp!=-1)
	{
		UpPath=Prg.PLCs[PlcIdx].Scheduler.slice(0,temp);
		UpFile=Prg.PLCs[PlcIdx].Scheduler.slice(temp);
	}
	out="[Holidays & Dates]\n"
	for(var i=0;i<Prg.PLCs[PlcIdx].HolyDays.length;i++)
		out+=Prg.PLCs[PlcIdx].HolyDays[i].Date+" = "+Prg.PLCs[PlcIdx].HolyDays[i].TimeScheduler+"\n";
	out+="\n[weeks]\n"
	for(var i=0;i<Prg.PLCs[PlcIdx].WeekDays.length;i++)
	{
		temp="";
		for(var j=0;j<7;j++)
			temp+=Prg.PLCs[PlcIdx].WeekDays[i].TimeScheduler[j]+" ";
		out+=Prg.PLCs[PlcIdx].WeekDays[i].Date+" "+temp+"\n";
	}
	for(var idx=0;idx<Prg.PLCs[PlcIdx].TimeScheduler.length;idx++)
	{
		out+="\n["+Prg.PLCs[PlcIdx].TimeScheduler[idx].Nombre+"]\n";
		for(var idx2=0;idx2<Prg.PLCs[PlcIdx].TimeScheduler[idx].Hs.length;idx2++)										//continua inserindo restante da agenda
			out+=Prg.PLCs[PlcIdx].TimeScheduler[idx].Hs[idx2].Time+" "+Prg.PLCs[PlcIdx].TimeScheduler[idx].Hs[idx2].Plan+"\n";
		
	}
	UpData=out;
	return UpData;
}

function MkTS(ArgIdx,Sel)
{
	out="";
	out+="<select id=\""+ArgIdx+"\" class=\"INTEXT\">\n";
	out+="<option value=\"\"></option>\n";
	for(var j=0;j<TimeScheduler.length;j++)
	{
		out+="<option value=\""+TimeScheduler[j].Nombre+"\"";
		if(TimeScheduler[j].Nombre==Sel)
			out+=" selected=\"selected\"";
		out+=" >"+HTMLEncode(TimeScheduler[j].Nombre)+"</option>\n";
	}
	out+="</select>\n";
	return out;
}

function MkTSF(ArgIdx,Sel)
{
	var Cplans=0;
	out="";
	out+="<select id=\""+ArgIdx+"\" class=\"INTEXT\">\n";
	out+="<option value=\"\"></option>\n";
	//----------------------------------
	out+="<option value=\"97\"";
	if(97==Sel)
		out+=" selected=\"selected\"";
	out+=" >"+Str_Off_Plan+"</option>\n";
	//----------------------------------
	out+="<option value=\"99\"";
	if(99==Sel)
		out+=" selected=\"selected\"";
	out+=" >"+Str_flashing_Plan+"</option>\n";
	//----------------------------------
	Cplans=PLCs[0].Plans.length;
	for(var j=0;j<PLCs.length;j++)
	{
		if(Cplans>PLCs[j].Plans.length);
			Cplans=PLCs[j].Plans.length
	}
	for(var j=0;j<Cplans;j++)
	{
		out+="<option value=\""+(j+1)+"\"";
		if((j+1)==Sel)
			out+=" selected=\"selected\"";
		out+=" >"+Str_Plan+" "+(j+1)+"</option>\n";
	}
	out+="</select>\n";
	return out;
}

function MkSelDay(obj,Mes)
{
	var dim=[31,29,31,30,31,30,31,31,30,31,30,31];
	out="";
	out+=Str_Date+":<select id=\"D"+obj+"\" class=\"INTEXT\">\n";
	for(var j=1;j<=dim[Mes-1];j++)
		out+="<option value=\""+j+"\">"+j+"</option>\n";
	out+="</select>\n";
	out+=" "+Str_Month+":<select id=\"M"+obj+"\" class=\"INTEXT\" onchange=\"MkSelDay('"+obj+"',this.value);\">\n";
	for(var j=1;j<=12;j++)
	{
		out+="<option value=\""+j+"\"";
		if(j==Mes) out+=" selected=\"selected\"";
		out+=">"+j+"</option>\n";
	}
	out+="</select>\n";
	document.getElementById(obj).innerHTML=out;
}

function sortfuncDate(a,b)
{
	return((b.Date.split("/").reverse().join(""))<(a.Date.split("/").reverse().join("")));
}

function sortfuncTime(a,b)
{
	return((b.Time)<(a.Time));
}

function ShowAgenda()
{
	var NowT=new Date();
	var vlast="";
	out="<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" width=\"100%\">\n";
	out+="<tr>\n<td align=\"left\">\n";
//	out+="<input type=\"button\" class=\"INTEXT2\" value=\""+Str_check_Conf+"\" onclick=\"MakeSch();\" /><br/>\n";
	out+="<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Clones_Sch+"\" onclick=\"CloneSch();\" />\n";
	out+="</td></tr>\n"
	out+="<tr>\n<td align=\"center\">\n";
	out+="<br/><table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" bgcolor=\"#FFFFFF\" width=\"50%\">\n";
	out+="<tr>";
	out+="<td align=\"center\" colspan=\"3\">\n<font size=\"1\" face=\"arial\">"+Str_Holidays;
	out+="</font>\n</td>";
	out+="</tr>\n";
	out+="<tr>";
	out+="<td align=\"center\"><a href=\"\" onclick=\"SchAddItemH();return false;\">\n";
	out+="<img src=\"../../img/add.png\" width=\"16\" height=\"16\" border=\"0\" />\n";
	out+="</a></td>";
	out+="<td align=\"center\">\n<font size=\"1\" face=\"arial\">"
	out+="<div id=\"newHd\"></div>";
	out+="</font>\n</td>";
	out+="<td align=\"center\">\n<font size=\"1\" face=\"arial\">"
	out+=MkTS("htable","");
	out+="</font>\n</td>";
	out+="</tr>\n";
	HolyDays=HolyDays.sort(sortfuncDate);
	for(var i=0;i<HolyDays.length;i++)
	{
		out+="<tr>";
		out+="<td align=\"center\"><a href=\"\" onclick=\"SchDelItemH("+i+");return false;\">\n";
		out+="<img src=\"../../img/error1.jpg\" width=\"16\" height=\"16\" border=\"0\" />\n";
		out+="</a></td>";
		out+="<td align=\"center\">\n<font size=\"1\" face=\"arial\">"
		out+=HolyDays[i].Date;
		out+="</font>\n</td>";
		out+="<td align=\"center\">\n<font size=\"1\" face=\"arial\">"
		out+=HolyDays[i].TimeScheduler;
		out+="</font>\n</td>";
		out+="</tr>\n";
	}
	out+="</table>\n";
	out+="</td></tr>\n";
	out+="<tr>\n<td align=\"center\"><br/>\n";
	out+="<table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" bgcolor=\"#FFFFFF\" width=\"100%\">\n";
	out+="<tr>";
	out+="<td align=\"center\" colspan=\"9\">\n<font size=\"1\" face=\"arial\">"+Str_weektable;
	out+="</font>\n</td>";
	out+="</tr>\n";
	//------------------------------------------------------------------
	out+="<tr>";
	out+="<td align=\"center\"><a href=\"\" onclick=\"SchAddItemW();return false;\">\n";
	out+="<img src=\"../../img/add.png\" width=\"16\" height=\"16\" border=\"0\" />\n";
	out+="</a></td>";
	out+="<td align=\"center\">\n<font size=\"1\" face=\"arial\">"
	out+="<div id=\"newWd\"></div>";
	out+="</font>\n</td>";
	for(var j=0;j<7;j++)
	{
		out+="<td align=\"center\" id=\"\">\n<font size=\"1\" face=\"arial\">";
		out+=Str_DaysName[j];
		out+="<br/>"
		out+=MkTS(("Tablas"+j),"");
		out+="</font>\n</td>";
	}
	out+="</tr>\n";
	WeekDays=WeekDays.sort(sortfuncDate);
	for(var i=0;i<WeekDays.length;i++)
	{
		out+="<tr>";
		out+="<td align=\"center\"><a href=\"\" onclick=\"SchDelItemW("+i+");return false;\">\n";
		out+="<img src=\"../../img/error1.jpg\" width=\"16\" height=\"16\" border=\"0\" />\n";
		out+="</a></td>";
		out+="<td align=\"center\">\n<font size=\"1\" face=\"arial\">"
		out+=WeekDays[i].Date;
		out+="</font>\n</td>";
		for(var j=0;j<7;j++)
		{
			out+="<td align=\"center\" id=\"\">\n<font size=\"1\" face=\"arial\">"
			if(WeekDays[i].TimeScheduler[j])out+=WeekDays[i].TimeScheduler[j];
			out+="</font>\n</td>";
		}
		out+="</tr>\n";
	}
	out+="</table>\n";
	out+="</td></tr>\n"
	out+="<tr>\n<td align=\"left\"><br/>\n";
	out+="<input type=\"button\" class=\"INTEXT2\" value=\""+Str_New+" "+Str_Time+" "+Str_scheduler+"\" onclick=\"SchAddItemTT();\" />\n";
	out+="</td></tr>\n"
	for(var idx=0;idx<TimeScheduler.length;idx++)
	{
		out+="<tr>\n<td align=\"center\"><br/>\n";
		out+="<table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" bgcolor=\"#FFFFFF\" width=\"50%\">\n";
		out+="<tr>";
		out+="<td align=\"center\" colspan=\"3\">\n<font size=\"1\" face=\"arial\"><a href=\"\" onclick=\"SchDelItemTT("+idx+");return false;\">\n";
		out+="<img src=\"../../img/error1.jpg\" width=\"16\" height=\"16\" border=\"0\" alt=\"Delet\" />\n";
		out+="</a>["+TimeScheduler[idx].Nombre;
		out+="]<a href=\"\" onclick=\"SchCpyItemTT("+idx+");return false;\">\n";
		out+="<img src=\"../../img/cpy.jpg\" width=\"16\" height=\"16\" border=\"0\" alt=\""+Str_Copy+"\" />\n";
		out+="</a></font>\n</td>";
		out+="</tr>\n";
		out+="<tr>";
		out+="<td align=\"center\"><a href=\"\" onclick=\"SchAddItemT("+idx+");return false;\">\n";
		out+="<img src=\"../../img/add.png\" width=\"16\" height=\"16\" border=\"0\" />\n";
		out+="</a></td>";
		out+="<td align=\"center\">\n<font size=\"1\" face=\"arial\">"
		out+="<select id=\"TSHs"+idx+"\" class=\"INTEXT\">\n";
		for(var j=0;j<24;j++)
			out+="<option value=\""+j+"\">"+j+"</option>\n";
		out+="</select>:\n";
		out+="<select id=\"TSmin"+idx+"\" class=\"INTEXT\">\n";
		for(var j=0;j<60;j++)
			out+="<option value=\""+j+"\">"+j+"</option>\n";
		out+="</select>:\n";
		out+="<select id=\"TSsec"+idx+"\" class=\"INTEXT\">\n";
		for(var j=0;j<60;j++)
			out+="<option value=\""+j+"\">"+j+"</option>\n";
		out+="</select>\n";
		out+="</font>\n</td>";
		out+="<td align=\"center\">\n<font size=\"1\" face=\"arial\">"
		out+=MkTSF("TSPlan"+idx,"");
		out+="</font>\n</td>";
		out+="</tr>\n";
		TimeScheduler[idx].Hs=TimeScheduler[idx].Hs.sort(sortfuncTime);
		for(var idx2=0;idx2<TimeScheduler[idx].Hs.length;idx2++)
		{
			//alert("TimeScheduler"+idx+" "+idx2+":"+TimeScheduler[idx][idx2].Time+" "+TimeScheduler[idx][idx2].Plan);
			out+="<tr>";
			out+="<td align=\"center\"><a href=\"\" onclick=\"SchDelItemT("+idx+","+idx2+");return false;\">\n";
			out+="<img src=\"../../img/error1.jpg\" width=\"16\" height=\"16\" border=\"0\" />\n";
			out+="</a></td>";
			out+="<td align=\"center\">\n<font size=\"1\" face=\"arial\">"
			out+=TimeScheduler[idx].Hs[idx2].Time;
			out+="</font>\n</td>";
			out+="<td align=\"center\" id=\"\">\n<font size=\"1\" face=\"arial\">";
			if(99==parseInt(TimeScheduler[idx].Hs[idx2].Plan))
				out+=Str_flashing_Plan;
			else
				out+=TimeScheduler[idx].Hs[idx2].Plan;
			out+="</font>\n</td>";
			out+="</tr>\n";
		}
		out+="</table>\n";
		out+="</td></tr>\n"
	}
	out+="</table>\n";
	return out;
}

function buildCal(m, y, cM, cH, cDW, cD, brdr)
{
	var mn=['January','February','March','April','May','June','July','August','September','October','November','December'];
	
	var oD = new Date(y, m-1, 1); //DD replaced line to fix date bug when current day is 31st
	oD.od=oD.getDay()+1; //DD replaced line to fix date bug when current day is 31st

	var todaydate=new Date() //DD added
	var scanfortoday=(y==todaydate.getFullYear() && m==todaydate.getMonth()+1)? todaydate.getDate() : 0 //DD added
	var dim=[31,0,31,30,31,30,31,31,30,31,30,31];
	dim[1]=(((oD.getFullYear()%100!=0)&&(oD.getFullYear()%4==0))||(oD.getFullYear()%400==0))?29:28;
	var t='<div class="'+cM+'">\n<table class="'+cM+'" cols="7" cellpadding="0" border="'+brdr+'" cellspacing="0">\n<tr align="center">\n';
	t+='<td colspan="7" align="center" class="'+cH+'">'+mn[m-1]+' - '+y+'</td>\n</tr>\n<tr align="center">\n';
	for(var s=0;s<7;s++)
		t+='<td class="'+cDW+'">'+"DLMMJVS".substr(s,1)+'</td>\n';
	t+='</tr>\n<tr align="center">\n';
	for(var i=1;i<=42;i++)
	{
		var x=((i-oD.od>=0)&&(i-oD.od<dim[m-1]))? i-oD.od+1 : ' ';
		if (x==scanfortoday) //DD added
			x='<span id="today">'+x+'</span>\n' //DD added
		t+='<td class="'+cD+'">'+x+'</td>\n';
		if((i)%7==0 && x==' ')
			break;
		if(((i)%7==0)&&(i<36))
		{
			t+='</tr>\n<tr align="center">\n';
		}
	}
	return t+='</tr>\n</table>\n</div>\n';
}

percent=100;

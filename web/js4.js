Resource.Infs = new Array(8);
var Hsize=2;
var ioflags= new Array(Hsize);
var tiempo= new Array(Hsize);
var ocupacion= new Array(Hsize);
var conteo= new Array(Hsize);
var ioLTC= new Array(Hsize);
var hindex=-1;
var hindexO;
var Number_Of_Inputs=0;

function fnc0()
{
	if(URLs.length && enProceso==false)
	{
		GetUrl(URLs[0],FNCs[0]);
		FNCs.splice(0,1);
		URLs.splice(0,1);
		return;
	}
	if(Resource.MoniBit)
	{
		switch(true)
		{
		//-----------------------------------------------------------
		case ((Resource.MoniBit&PoolData)==1):
			GetUrl(PrgEd[SrcIdx].host+"/GbVars.bin",RcvMoni);
		break;
		//-----------------------------------------------------------
		case ((Resource.MoniBit&PoolData)==2):
			GetUrl(PrgEd[SrcIdx].host+"/plcs.bin",RcvMoni);
		break;
		//-----------------------------------------------------------
		case ((Resource.MoniBit&PoolData)==4):
			GetUrl(PrgEd[SrcIdx].host+"/phases.bin",RcvMoni);
		break;
		//-----------------------------------------------------------
		case ((Resource.MoniBit&PoolData)==8):
			GetUrl(PrgEd[SrcIdx].host+"/ios.bin",RcvMoni);
		break;
		//-----------------------------------------------------------
		case ((Resource.MoniBit&PoolData)==16):
			GetUrl(PrgEd[SrcIdx].host+"/task.cgi",RcvMoni);
		break;
		//-----------------------------------------------------------
		case ((Resource.MoniBit&PoolData)==32):
			GetUrl(PrgEd[SrcIdx].host+"/"+PlcIdx+"iplc.bin",RcvMoni);
		break;
		//-----------------------------------------------------------
		case ((Resource.MoniBit&PoolData)==64):
		RcvMoni();
		break;
		//-----------------------------------------------------------
		case ((Resource.MoniBit&PoolData)==128):
		RcvMoni();
		break;
		//-----------------------------------------------------------
		case ((Resource.MoniBit&PoolData)==256):
		RcvMoni();
		break;
		default:
		RcvMoni();
		break;
		//-----------------------------------------------------------
		}
	}
	//=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=
	if(Reload)
	{
		document.getElementById("StatusIcon").innerHTML="";
		//-----------------------------------------------------------
		//-----------------------------------------------------------
		if((Reload&0x800)!=0)
			document.getElementById("StatusIcon").innerHTML+="<img border=\"0\" src=\"../../img/sts/mod.jpg\" width=\"20\" height=\"20\" onclick=\"alert(getReloadStatus());\" title=\""+Str_Reload_All_Plans+"\"/>";
		//-----------------------------------------------------------
		if((Reload&0xF0)!=0)
			document.getElementById("StatusIcon").innerHTML+="<img border=\"0\" src=\"../../img/sts/sch.jpg\" width=\"20\" height=\"20\" onclick=\"alert(getReloadStatus());\" title=\""+Str_Reload_All_Plans+"\"/>";
		//-----------------------------------------------------------
		if((Reload&0xF)!=0)
			document.getElementById("StatusIcon").innerHTML+="<img border=\"0\" src=\"../../img/sts/plan.png\" width=\"20\" height=\"20\" onclick=\"alert(getReloadStatus());\" title=\""+Str_Reload_All_Plans+"\"/>";
		//-----------------------------------------------------------
		if((Reload&0x700)!=0)
			document.getElementById("StatusIcon").innerHTML+="<img border=\"0\" src=\"../../img/sts/rst.jpg\" width=\"20\" height=\"20\" onclick=\"alert(getReloadStatus());\" title=\""+Str_Reload_All_Plans+"\"/>";
		//-----------------------------------------------------------
	}
	else
		document.getElementById("StatusIcon").innerHTML="";
	//=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=
}

function RcvMoni(Datos)
{
	var out="";
	if(Datos)
	{
		if(Datos.status==200)
		{
			switch(Resource.MoniBit&PoolData)
			{
				//-----------------------------------------------------------
				case 1:
					Resource.Infs[0]=rcvGbVars(Datos);
				break;
				//-----------------------------------------------------------
				case 2:
					Resource.Infs[1]=rcvTcSts(Datos);
				break;
				//-----------------------------------------------------------
				case 4:
					Resource.Infs[2]=rcvphases3(Datos);
				break;
				//-----------------------------------------------------------
				case 8:
					Resource.Infs[3]=rcvIOs(Datos);
				break;
				//-----------------------------------------------------------
				case 16:
					Resource.Infs[4]=rcvtask(Datos);
				break;
				//-----------------------------------------------------------
				case 32:
					Resource.Infs[5]=rcvInterprete(Datos);
				break;
				//-----------------------------------------------------------
				default:
					out=="No Immplemented["+Datos.getAllResponseHeaders()+"]";
				break;
				//-----------------------------------------------------------
			}
		}
		else
		{
			out=Datos.status+" "+Datos.statusText;
		}
		for(var i=0;i<Resource.Infs.length;i++)
		{
			if(Resource.Element && (Resource.MoniBit&(1<<i)) && Resource.Infs[i])
				out+=Resource.Infs[i];
		}
		if(out!="" && Resource.MoniBit)
		{
			try
			{
				Resource.Element.innerHTML=out;
			}
			catch(err)
			{
				alert(err.message+":\n"+out);
			}
		}
	}
	PoolData<<=1;
	if(PoolData&256)PoolData=1;
}

function rcvGbVars(Datos)
{
	var RTC=Datos.getResponseHeader("Content-Type");
	var count=-1;
	if(RTC)
		count=RTC.indexOf("RTC:");
	var dat;
	if(count!=-1)
	{
		count+=4;
		RTC=RTC.substring(count);
		RTC=parseInt(RTC);
		RTC*=1000;
		dat = new Date(RTC);
		RTC+=(dat.getTimezoneOffset()*60000);
		dat = new Date(RTC);
	}
	else
		dat="";// */
	//----------------------
	Datos=Datos.responseText;
	var temp="";
	var count;
	var tempV;
	var out="("+Datos.length+")";
	out="<table border=\"1\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n";
	//---------------------------------
	out+="<tr align=\"center\" bgcolor=\"#808080\" width=\"100%\">\n\
	<td width=\"50%\"><font size=\"2\" face=\"arial\"> "+Str_Parameter+" </font></td>\n\
	<td width=\"50%\"><font size=\"2\" face=\"arial\"> "+Str_Value+" </font></td>\n\
	</tr>\n";
	//---------------------------------
	out+="<tr bgcolor=\"#E0E0E0\">\n";
	out+="<td><font size=\"1\" face=\"arial\"> "+Str_Version+" </font></td>\n";
	temp=Datos.substring(20,24);
	tempV=ByToInt(temp);
	GlobalParms.Version=tempV;
	if(PrgEd[SrcIdx].GlobalParms)
		PrgEd[SrcIdx].GlobalParms.Version=tempV;
	out+="<td align=\"right\"><font size=\"1\" face=\"arial\">"+(GlobalParms.Version/1000000)+"</font></td>";
	out+="</tr>\n";
	//---------------------------------
	out+="<tr>\n";
	out+="<td><font size=\"1\" face=\"arial\"> "+Str_Voltage+" </font></td>\n";
	temp=Datos.substring(12,16);
	tempV=ByToInt(temp);
	out+="<td align=\"right\"><font size=\"1\" face=\"arial\">"+(tempV/100)+"</font></td>";
	out+="</tr>\n";
	//---------------------------------
	temp=Datos.substring(57,61);
	tempV=ByToInt(temp);
	out+="<tr>\n";
	out+="<td colspan=\"2\">\n";
	//out+=HexEncode(Datos.substring(57,60))+"<br />";
	out+="<font size=\"1\" face=\"arial\"> Log:";
	if(GlobalParms.MODEL.indexOf("M3")!=-1)
		out+=(tempV&0x07);
	if(GlobalParms.MODEL.indexOf("M4")!=-1)
		out+=(tempV&0xFF);
	out+="</font>\n<br/>";
	//out+="<font size=\"1\" face=\"arial\"> Sync:"+  ((tempV>> 8)&0x03)+"</font>\n";
	//out+="<font size=\"1\" face=\"arial\"> RTCfix:"+((tempV>>10)&0x03)+"</font>\n";
	out+="<font size=\"1\" face=\"arial\"> "+Str_door+":"+	((tempV>>14)&0x01)+"</font>\n<br/>";
	//out+="<font size=\"1\" face=\"arial\"> UpdateRTC:"+	((tempV>>16)&0x01)+"</font>\n";
	out+="<b><font size=\"1\" face=\"arial\" ";
	if(GlobalParms.MODEL.indexOf("M3")!=-1)
	{
		if((tempV>>7)&0x01)
			if((tempV>>6)&0x01)
				out+="color='green'";
			else
				out+="color='red'";
	}
	else
	{
		if((tempV>>13)&0x01)
			if((tempV>>12)&0x01)
				out+="color='green'";
			else
				out+="color='red'";
	}
	out+=">\nGPS</font></b>";
	out+="</td>\n";
	out+="</tr>\n";
	//out+="<tr>\n<td colspan=\"2\">\n";
	//out+=HexEncode(Datos.substring(64,68))+"<br />";
	//out+=HexEncode(Datos.substring(68,72))+"<br />";
	//out+="</td></tr>\n";
	//---------------------------------
	out+="<tr>\n";
	out+="<td colspan=\"2\" align=\"center\"><font size=\"1\" face=\"arial\" "
	if((tempV>>16)&0x01)
			out+="color='green'";
		else
			out+="color='blue'";
	out+=">"+Str_Controllers+":";
	temp=Datos.substring(16,20); 
	tempV=ByToInt(temp);
	if(tempV!=0)
	{
		tempV*=1000;
		dat = new Date(tempV);
		tempV+=(dat.getTimezoneOffset()*60000);
		dat = new Date(tempV);
	}
	else
		dat="";
	temp=""+dat;
	out+=temp.substring(0, 24)+"</font></td>";
	out+="</tr>\n";
	//---------------------------------
	out+="<tr>\n";
	out+="<td colspan=\"2\" align=\"center\"><font size=\"1\" face=\"arial\">PC:";
	ourDate = new Date();
	out+=ourDate;
	out+="</font></td>";
	out+="</tr>\n"; // */
	//---------------------------------
	temp=Datos.substring(24,28);
	tempV=ByToInt(temp);
	if(tempV)
	{
		out+="<tr>\n";
		out+="<td><font size=\"1\" face=\"arial\"> "+Str_TC_in_Err+" </font></td>\n";
		out+="<td align=\"right\"><font size=\"1\" face=\"arial\">"
		for(var count=0;count<10;count++)
			if(tempV&(1<<count))
				out+=(count+1)+"<br />";
		out+="</font></td></tr>\n";
	}
	//---------------------------------
	out+="<tr bgcolor=\"#E0E0E0\">\n";
	out+="<td colspan=\"2\" align=\"center\"><font size=\"1\" face=\"arial\">";
	temp=Datos.substring(28,32);//Error_Flags[1]=48-52
	tempV=ByToInt(temp);
	if(tempV)
	{
		if(tempV&4)out+=Str_Over_Voltage+"<br />";
		if(GlobalParms.MODEL.indexOf("M4")!=-1)
		{
			if(tempV&2)out+=Str_Crit_Voltage+"<br />";
			if(tempV&1)out+=Str_Min_Voltage+"<br />";
		}
		if(GlobalParms.MODEL.indexOf("M3")!=-1)
		{
			if(tempV&1)out+=Str_Crit_Voltage+"<br />";
			if(tempV&2)out+=Str_Min_Voltage+"<br />";
		}
	}
	else
		out+=Str_Normal_Voltage+"<br />";
	out+="</font></td></tr>\n";
	//---------------------------------
	out+="<tr>\n";
	out+="<td><font size=\"1\" face=\"arial\"> "+Str_Temperature+" </font></td>\n";
	tempV=Datos.charCodeAt(56);
	out+="<td align=\"right\"><font size=\"1\" face=\"arial\">"+tempV+"</font></td>";
	out+="</tr>\n";
	//---------------------------------
	out+="</table>\n";
	return out;
}
//=================================================
function rcvTcSts(Datos)
{
 Datos=Datos.responseText;
 var pPLC=0;
 var count=0;
 var pPLCs=Datos.length;
 var temp="";
 var tempV=0;
 var out="";
 if((Datos.length%StructSizePLC)!=0)
 {
	 pPLCs-=(Datos.length%StructSizePLC);
	 out+="!";
 }
 //---------------------------------
 out+="<table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" bgcolor=\"LightGrey\" width=\"100%\">\n";
// <td><font size=\"2\" face=\"arial\"> "+Str_Controller_Number+" </font></td>\n
 out+="<tr align=\"center\" bgcolor=\"#808080\">\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Name+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Mode+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Plan+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Conflict_File+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Phase_server+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Errors+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Sinc+" </font></td>\n\
 </tr>\n";
 while(pPLC<pPLCs)
 {
	//---------------------------------
	Datos=Datos.substring(temp);
	out+="<tr align=\"center\" ";
	if (count==0)
		out+="bgcolor=\"#E0E0E0\"";
	out+=">\n";
	count^=1;
	//---------------------------------
	temp=String(Datos.substring(pPLC+43,pPLC+68));
	temp=temp.substring(0,temp.search("\0"));
	//out+="<td><font size=\"1\" face=\"arial\">"+temp+"</font></td>\n";// name
	//---------------------------------
	out+="<td>\n<font size=\"1\" face=\"arial\">";
	temp=Datos.substring(pPLC+152,pPLC+156);
	tempV=ByToInt(temp);
	//out+=tempV;
	out+=Str_Controller
	out+=(pPLC/StructSizePLC)+1;
	out+="</font></td>\n";									//PLC
	//---------------------------------
	out+="<td>\n<font size=\"1\" face=\"arial\">";
	tempV=Datos.charCodeAt(pPLC+0);
	if((tempV&0x0F)==0)out+=Str_MD_Error;
	if((tempV&0x0F)==1)out+=Str_MD_Flashing;
//	if((tempV&0x0F)==2)out+=Str_MD_Off;
//	if((tempV&0x0F)==3)out+=Str_MD_Normal;
//	if((tempV&0x0F)==4)out+=Str_MD_Normal_lock;
//	if((tempV&0x0F)==5)out+=Str_MD_Remote;
//	if((tempV&0x0F)==6)out+=Str_MD_Manual;
//	if((tempV&0x0F)==7)out+=Str_MD_StpByStp;
	if(tempV&64)
		out+="<br />"+Str_Lamp_Off;
	else
		out+="<br />"+Str_Lamp_On;
	if(tempV&128)out+="<br />"+Str_Service_On;
	out+="</font></td>";											// mode
	//---------------------------------
	temp=Datos.substring(pPLC+28,pPLC+44);
	temp=temp.substring(0,temp.search("\0"));
	out+="<td><font size=\"1\" face=\"arial\">"+temp+"<br/>";
	//----------------------------------
	temp=Datos.substring(pPLC+92,pPLC+96);
	tempV=ByToInt(temp);
	out+=Str_LSTCHG+"[";
	tempV*=1000;
	dat = new Date(tempV);
	tempV+=(dat.getTimezoneOffset()*60000);
	dat = new Date(tempV);
	temp=""+dat;
	out+=temp.substring(0, 24)+"]<br/>";	
	//----------------------------------
	temp=Datos.substring(pPLC+96,pPLC+100);
	tempV=ByToInt(temp);
	out+=Str_NXCHG+"[";
	tempV*=1000;
	dat = new Date(tempV);
	tempV+=(dat.getTimezoneOffset()*60000);
	dat = new Date(tempV);
	temp=""+dat;
	out+=temp.substring(0, 24)+"]<br/>";
	//----------------------------------
	tempV=Datos.charCodeAt(pPLC+147);
	out+=Str_NXPLAN+"["+tempV+"]<br/>";	
	out+="</font></td>\n";// plan file
	//---------------------------------
	temp=String(Datos.substring(pPLC+131,pPLC+147));
	temp=temp.substring(0,temp.search("\0"));
	out+="<td><font size=\"1\" face=\"arial\">"+temp+"</font></td>\n";// matris de conflicto
	//---------------------------------
	out+="<td><font size=\"1\" face=\"arial\">"+Datos.charCodeAt(pPLC+151)+"</font></td>\n";// phase1
	//---------------------------------
	temp=Datos.substring(pPLC+164,pPLC+168);
	tempV=ByToInt(temp); //convierte el codigo de error
	out+="<td><font size=\"1\" face=\"arial\">";
	if(tempV)
	{
		temp=String(Datos.substring(pPLC+168,pPLC+StructSizePLC));
		temp=Remplace(temp,"<","&#60;");
		temp=Remplace(temp,">","&#62;");
//		temp=temp.substring("&#60;",temp.search("<"));
//		temp=temp.substring("&#62;",temp.search(">"));
		temp=temp.substring(0,temp.search("\0"));
		//out+=tempV+"<br />\n"+temp;
		out+=temp;
	}
	out+="</font></td>\n";// string of error
	//out+="</font></td>\n</tr>\n";// string of error
	//---------------------------------
	out+="<td><font size=\"1\" face=\"arial\">";
	temp=Datos.substring(pPLC+4,pPLC+28);
	temp=temp.substring(0,temp.search("\0")); 
	out+= temp+"</font></td></tr>\n";				// sync ref
	//--------------------------------------------- //Márcio - 26/06/2013
	//temp=Datos.substring(pPLC+28,pPLC+44);
	//temp=temp.substring(5,temp.search(".eil"));		//isola apenas o número do controlador
	//out += "<tr><td>\n";
	//out += "plano = "+temp;
	//out += "</td></tr>\n";
	//---------------------------------
	pPLC+=StructSizePLC;
 }
 out+="</table>\n";
 return out;// */
}

function SortTask(a,b)
{
	return(b[1]<a[1]);
}
//=================================================
function rcvIOs(Datos)
{
	hindexO=hindex;
	hindex++;
	if(hindex>=Hsize)
		hindex=0;
	var out="";
	var temp="";
	var inidx=0;
	var itemp=0;
	Datos=Datos.responseText;
	if((Datos.length%StructSizeIO)!=0)
		return "";
	Number_Of_Inputs=(Datos.length/StructSizeIO)
	ioflags[hindex]= new Array(Number_Of_Inputs);
	tiempo[hindex]= new Array(Number_Of_Inputs);
	ocupacion[hindex]= new Array(Number_Of_Inputs);
	conteo[hindex]= new Array(Number_Of_Inputs);
	ioLTC[hindex]= new Array(Number_Of_Inputs);
	//----------------------------------------------------
	while(inidx<Number_Of_Inputs)
	{
		//--------------------------------- flags
		temp=Datos.substring(StructSizeIO*inidx+0,StructSizeIO*inidx+4);
		itemp=ByToInt(temp);
		ioflags[hindex][inidx]=itemp;		
		if(itemp&1)// es entrada?
		{
			//--------------------------------- Muestras
			temp=Datos.substring((StructSizeIO*inidx)+4,(StructSizeIO*inidx)+8);
			itemp=ByToInt(temp);
			/*if(hindexO!=-1 && tiempo[hindexO][inidx]==itemp)
			{
					hindex=hindexO;
					if(hindexO!=-1)
						return	rcvIOs2();
					else
						return "";
			}// */
			tiempo[hindex][inidx]=itemp;
			//--------------------------------- ocupacion
			temp=Datos.substring((StructSizeIO*inidx)+8,(StructSizeIO*inidx)+12);
			itemp=ByToInt(temp);
			ocupacion[hindex][inidx]=itemp;
			//---------------------------------	count
			temp=Datos.substring((StructSizeIO*inidx)+12,(StructSizeIO*inidx)+16);
			itemp=ByToInt(temp);
			conteo[hindex][inidx]=itemp;
			//--------------------------------- LTC
			temp=Datos.substring((StructSizeIO*inidx)+16,(StructSizeIO*inidx)+20);
			itemp=ByToInt(temp);
			ioLTC[hindex][inidx]=itemp;
			LOG("["+inidx+",Input]T:"+tiempo[hindex][inidx]+" O:"+ocupacion[hindex][inidx]+" C:"+conteo[hindex][inidx]);
		}
		else
		{
			tiempo[hindex][inidx]=hindex;
			//----------------------------
			temp=Datos.substring(StructSizeIO*inidx+4,StructSizeIO*inidx+8);
			itemp=ByToInt(temp);
			tiempo[hindex][inidx]=itemp;
			//----------------------------
			temp=Datos.substring(StructSizeIO*inidx+8,StructSizeIO*inidx+12);
			itemp=ByToInt(temp);
			ocupacion[hindex][inidx]=itemp;
			conteo[hindex][inidx]=hindex;
			LOG("["+inidx+",Output]T:"+tiempo[hindex][inidx]+" O:"+(ocupacion[hindex][inidx]!=0));
		}
		inidx++;
	}
	if(hindexO!=-1)
		return	rcvIOs2();
	else
		return "";
}
function rcvIOs2()
{
	var temp=0;
	var Tcount=0;
	var out="";
	var ocup=0;
	var count=0;
	var times=0;
	//---------------------------------Title
	out="<br/><table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"#c0c0c0\" width=\"30%\">\n";
	out+="<tr>\n";
	out+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+Str_Title_io+"&#160;</b></font></td>\n";
	out+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+Str_MN_Info+"&#160;</b></font></td>\n";
	out+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+Str_Count+"&#160;</b></font></td>\n";
	out+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+Str_Occupation+"&#160;</b></font></td>\n";
	out+="</tr>\n";
	while(Tcount<Number_Of_Inputs)
	{
		out+="<tr>\n";
		out+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+(Tcount+1)+"&#160;</b>";
		out+="("+IOs[Tcount].Name+")";
		out+="</font></td>\n";
		temp=ioflags[hindex][Tcount];
		if(ioflags[hindex] && ioflags[hindex][Tcount]&1)
		{
			out+="<td align=\"center\"><font size=\"2\" face=\"arial\">&#160;"+Str_Inputs+"&#160;<b>";
			if(ioflags[hindex][Tcount]&0x10)
				out+=Str_Enabled;
			else
				out+=Str_disabled;
			if(ioflags[hindex][Tcount]&0x20)
				out+=" "+Str_Fail;
			temp=(temp>>8)&0x3F;
			if(temp&0x3F)
				out+="<br/>"+Str_Priority+":";
			if(temp&1)
				out+="1 ";
			if(temp&2)
				out+="2 ";
			if(temp&4)
				out+="3 ";
			if(temp&8)
				out+="4";
			out+="</b>&#160;</font></td>\n";
			count=(conteo[hindex][Tcount]-conteo[hindexO][Tcount]);
			ocup=(ocupacion[hindex][Tcount]-ocupacion[hindexO][Tcount]);
			times=(tiempo[hindex][Tcount]-tiempo[hindexO][Tcount]);
			out+="<td align=\"center\"><font size=\"2\" face=\"arial\">&#160;"+count+"&#160;</font></td>\n";
			out+="<td align=\"center\"><font size=\"2\" face=\"arial\">&#160;%";
			if(times==0)
			{
				if(ioflags[hindex][Tcount]&0x02)
					ocup=100;
				else
					ocup=0;
			}
			else
			{
				ocup=Math.round((1000*ocup)/times)/10;
			}
			out+=ocup;
			out+="&#160;</font></td>\n";
		}
		else
		{
			out+="<td align=\"center\"><font size=\"2\" face=\"arial\">&#160;"+Str_Output+"&#160;</font></td>\n";
			out+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;&#160;</b></font></td>\n";
			out+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+ocupacion[hindex][Tcount]+"&#160;</b></font></td>\n";
		}
		out+="</tr>\n";
		Tcount++;
	}
	out+="</table>\n";
	return out;
}
//=================================================
function rcvLogs(Datos)
{
	var temp="";
	var tempV=0;
	var count=0;
	Datos=Datos.responseText;
	document.getElementById("sample15Title").innerHTML="LOGS";//["+Datos.length+"]";
	temp=Datos.substring(0,4);
	tempV=ByToInt(temp);
	Datos=Datos.substring(4);
	if (LOG_Index>tempV)
	{
		temp=Datos.substring(LOG_Index);
		Datos=temp+Datos.substring(4,tempV);
	}
	else
		Datos=Datos.substring(LOG_Index,tempV);
	LOG_Index=tempV;
	count=Datos.length;
	document.getElementById("sizeofLog").innerHTML=count;
	if(!count)
		return;
	Datos=HTMLEncode(Datos);
	document.getElementById("LogTC").innerHTML+=Datos;
	count=document.getElementById("LogTC").innerHTML.length-20000;
	if(count>0)
		document.getElementById("LogTC").innerHTML=document.getElementById("LogTC").innerHTML.substring(count);
	document.getElementById("LogTC").scrollTop = document.getElementById("LogTCscc").offsetTop+document.getElementById('LogTC').scrollTop+55;
	LOGdirect(document.getElementById("LogTC").scrollTop +" "+ document.getElementById("LogTCscc").offsetTop);
}

function rcvtask(Datos)
{
	Datos=Datos.responseText;
	//---------------------------------
	Datos=Datos.split("\n");
	var out;
	var temp2;
	var temp4;
	var temp5;
	var i=0;

	Datos=Datos[1]
	Datos=Datos.split("|");
	Datos.splice(Datos.length-1,1);
	temp4=Datos[1].split(",")[1];
	Datos.splice(0,2);
	//Datos=Datos[1].split("|");
	//temp4=Datos[1].split(",")[1];
	for(var i=0;i<Datos.length;i++)
	{
		Datos[i]=Datos[i].split(",");
	}
	Datos=Datos.sort(SortTask);
	out="<tr align=\"center\" bgcolor=\"#808080\">\n\
	<td><font size=\"2\" face=\"arial\">"+Str_Task_Name+"</font></td>\n\
	<td><font size=\"2\" face=\"arial\">"+Str_Task_Number+"</font></td>\n\
	<td><font size=\"2\" face=\"arial\">"+Str_Status+"</font></td>\n\
	<td><font size=\"2\" face=\"arial\">"+Str_Priority+"</font></td>\n\
	<td><font size=\"2\" face=\"arial\">"+Str_Memory+"</font></td>\n\
	<td><font size=\"2\" face=\"arial\">%"+Str_Process+"</font></td>\n\
	<td><font size=\"2\" face=\"arial\">stack</font></td>\n\
	</tr>\n";
	for (i=0;i<Datos.length;i++)
	{
		out+="<tr align=\"center\" ";
		if (i%2)
		out+="bgcolor=\"#E0E0E0\"";
		out+=">\n";
		out+="<td><font size=\"1\" face=\"arial\">"
		out+=Datos[i][1];
		out+="</font></td>\n";
		out+="<td><font size=\"1\" face=\"arial\">"
		out+=i
		out+="</font></td>\n";
		out+="<td><font size=\"1\" face=\"arial\">"
		temp2=Datos[i][2];
		if(temp2=='B') out+=Str_WAITING;
		if(temp2=='R') out+=Str_READY;
		if(temp2=='D') out+=Str_DELETED;
		if(temp2=='S') out+=Str_WAITING_DATA;
		out+="</font></td>\n";
		out+="<td><font size=\"1\" face=\"arial\">"
		out+=Datos[i][3];
		out+="</font></td>\n";
		out+="<td><font size=\"1\" face=\"arial\">"
		out+=Datos[i][4];
		out+="</font></td>\n";
		out+="<td><font size=\"1\" face=\"arial\">"
		temp5=Datos[i][5];
		out+=Math.round((temp5/temp4)*10000)/100;
		out+="</font></td>\n";

		/*out+="<td><font size=\"1\" face=\"arial\">"
		out+=Datos[i][6];
		out+="</font></td>\n";
		out+="<td><font size=\"1\" face=\"arial\">"
		out+=Datos[i][7];
		out+="</font></td>\n";// */

		out+="<td><font size=\"1\" face=\"arial\">"
		out+=(Datos[i][7]-Datos[i][6]);
		out+="</font></td>\n";
		out+="</tr>\n";
		//LOG(task+" "+Nombre+" "+state+" "+priority+" "+stack+"<br />");
	}
	return out;
}

function loadArq(Datos)
{
	Datos=Datos.responseText;
	Datos=Datos.substring(Datos.indexOf("<svg "));
	document.getElementById("DistFis").innerHTML=Datos;
	document.getElementById("sample8").style.width="420px"
	if (winList['sample8'])
	{
		winList['sample8'].open();
	}
}
//=================================================
function rcvphases(Datos)
{
 var RTC=Datos.getResponseHeader("Content-Type");
 var count=RTC.indexOf("RTC:");
 if(count!=-1)
 {
	count+=4;
	 RTC=RTC.substring(count);
	 RTC=parseInt(RTC);
	RTC*=1000;
	dat = new Date(RTC);
	RTC+=(dat.getTimezoneOffset()*60000);
	var dat = new Date(RTC);
 }
 else
	var dat="";
 count=0;
 Datos=Datos.responseText;
 var phase=0;
 var phases=Datos.length;
 var temp="";
 var tempV=0;
 var out=0;
 var color=0;
 dat=0;
 //---------------------------------
 out="<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FFFFFF\" bgcolor=\"#FFFFFF\" id=\"phases\" width=\"100%\">\
 <tr align=\"center\" bgcolor=\"#808080\">\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Number+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Status+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Extra_Data+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Error+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Last_Time_Green+" </font></td>\n\
 <td><font size=\"2\" face=\"arial\"> "+Str_Controller+" </font></td>\n\
 </tr>\n";
 color="#E0E0E0";
 while(phase<phases)
 {
	temp=HexEncode(Datos.substring(phase+0,phase+4));
	if(!phase)
		LOGdirect(temp);
	else
		LOG(temp);
	//---------------------------------
	Datos=Datos.substring(temp);
	out+="<tr align=\"center\" ";
	if (count==0)
		out+="bgcolor=\"#E0E0E0\"";
	out+=">\n";
	count^=1;
	//---------------------------------//Numero de phase
		out+="<td><font size=\"1\" face=\"arial\">"+((phase/PhasesStructSize)+1)+"</font></td>\n"; 
	//--------------------------------- //Estado
	tempV=Datos.charCodeAt(phase+0);
	out+="<td width=\"5\" valign=\"middle\" >\n";//+(tempV>>4)+" "+(tempV&0x0F);
	if ((tempV&0x07)==0x07)
	{
		tempV&=0xF0;
		tempV|=0x12;
	}
	out+=color2svg(tempV);
	/*if (tempV&0xF0)
	{
		out+="<b><font size=\"1\" face=\"arial\" color=\"#000000\">";
		if (tempV&0x80)out+="S";
		if (tempV&0x40)out+="F";
		if (tempV&0x30)out+="T";
		out+="</font></b><br />\n";
	}
	out+="<svg width=\"22\" height=\"50\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n"
	out+="<rect x=\"0\" y=\"3\" width=\"20\" height=\"44\" fill=\"#000000\" stroke-width=\"0\" stroke=\"black\"/>\n"
	out+="<rect x=\"3\" y=\"6\" width=\"20\" height=\"44\" fill=\"#404040\" stroke-width=\"0\" stroke=\"black\"/>\n"
		color="\"#600000\"";
		if (tempV&1)color="\"#F00000\"";
	out+="<circle cx=\"13\" cy=\"16\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill="+color+"/>\n"
		color="\"#606000\"";
		if (tempV&2)color="\"#F0F000\"";
	out+="<circle cx=\"13\" cy=\"28\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill="+color+"/>\n"
		color="\"#006000\"";
		if (tempV&4)color="\"#00F000\"";
	out+="<circle cx=\"13\" cy=\"40\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill="+color+"/>\n"
	out+="</svg>\n"
	// */
	out+="</td>\n";
	//--------------------------------- Extra Data
	out+="<td><font size=\"1\" face=\"arial\">Current:";
	temp=Datos.substring(phase+17,phase+18);
	tempV=ByToSht(temp);
	if(tempV)
		out+=tempV;
	else
		out+="-";
	color=Datos.charCodeAt(phase+1);
	out+=" Color:";
	out+=(color&0x0F);
	//temp=HexEncode(Datos.substring(phase+28,phase+29));
	//out+=temp;
	color=(color/16)&0x0F;
	//-------------------------------------
	temp=Datos.substring(phase+19,phase+20);
	tempV=ByToSht(temp);
	out+="<br />";
	if(color&1)
		out+=tempV+"homs";
	else
		out+=tempV/1000+"w";
	out+=" ["+Datos.charCodeAt(phase+12)+"w]";
	//-------------------------------------
	temp=Datos.substring(phase+21,phase+22);
	tempV=ByToSht(temp);
	out+="<br />";
	if(color&2)
		out+=tempV+"homs";
	else
		out+=tempV/1000+"w";
	out+=" ["+Datos.charCodeAt(phase+13)+"w]";
	//-------------------------------------
	temp=Datos.substring(phase+23,phase+24);
	tempV=ByToSht(temp);
	out+="<br />";
	if(color&4)
		out+=tempV+"homs";
	else
		out+=tempV/1000+"w";
	out+=" ["+Datos.charCodeAt(phase+14)+"w]";
	//-------------------------------------
	out+="</font></td>\n";// */
	//--------------------------------- Error code
	out+="<td><font size=\"1\" face=\"arial\">";
	tempV=Datos.charCodeAt(phase+24);
	if (tempV&1)out+=Str_Lack_Red+"<br />\n";
	if (tempV&2)out+=Str_Lack_Yellow+"<br />\n";
	if (tempV&4)out+=Str_Lack_Green+"<br />\n";
	if (tempV&8)out+="Min Green Time<br />\n";
	if (tempV&16)out+=Str_Lack_Red.toLowerCase()+"<br />\n";
	if (tempV&32)out+=Str_Lack_Yellow.toLowerCase()+"<br />\n";
	if (tempV&64)out+=Str_Lack_Green.toLowerCase()+"<br />\n";
	if (tempV&128)out+="Min Red Time<br />\n";
	tempV=Datos.charCodeAt(phase+25);
	if (tempV&1)out+=Str_Err_Electric_Red+"<br />\n";
	if (tempV&2)out+=Str_Err_Electric_Yellow+"<br />\n";
	if (tempV&4)out+=Str_Err_Electric_Green+"<br />\n";
	if (tempV&8)out+="Err Report<br />\n";
	if (tempV&16)out+="Err Flag Flashing<br />\n";
	if (tempV&32)out+="Err Flag Flank<br />\n";
	if (tempV&64)out+="Err Flag Service<br />\n";
	if (tempV&128)out+="Err Signal Sync<br />\n";
	out+=HexEncode(Datos.substring(phase+24,phase+28))+"<br />\n";
	out+=HexEncode(Datos.substring(phase+28,phase+32))+"<br />\n";
	out+="</font></td>\n";
	// */
	//--------------------------------- Ultimo cambio de Verde
	out+="<td align=\"center\" valign=\"middle\"><font size=\"1\" face=\"arial\">\n";
	//temp=Datos.substring(phase+8,phase+12);
	//tempV=ByToInt(temp);
	//out+="LTR:"+tempV+"<br />";// */
	//temp=Datos.substring(phase+12,phase+16);
	//tempV=ByToInt(temp);
	//out+="LTW:"+tempV+"<br />";// */

	temp=Datos.substring(phase+40,phase+44);
	tempV=ByToInt(temp);
	if(tempV!=0)
	{
		tempV*=1000;
		dat = new Date(tempV);
		tempV+=(dat.getTimezoneOffset()*60000);// */
		dat = new Date(tempV);
	}
	else
		dat="";
	out+="LTG:"+dat+"<br />";// */
	temp=Datos.substring(phase+20,phase+24);
	tempV=ByToInt(temp);
	out+="Sec:"+tempV;// */+"<br />"
	out+="</font></td>\n";
	//--------------------------------- PLC address
	tempV=Datos.charCodeAt(phase+2);
	out+="<td><font size=\"1\" face=\"arial\">"+(tempV&0x0F)+"</font></td>\n";
	//---------------------------------
	out+="</tr>";
	phase+=PhasesStructSize;
 } 
 out+="</table>";
 return out;
}

function rcvphases2(Datos)
{
 Datos=Datos.responseText;
 var phaseC=0;
 var phase=0;
 var color=null;
 var phases=Datos.length;
 var temp=0;
 var flags=0;
 var out=0;
 //---------------------------------Title
 out=document.getElementById("sample8Title");
 out.innerHTML=Str_Intersection;
 //---------------------------------
 while(phase<phases)
 {
	//--------------------------------- //Estado
	flags=0;
	tempV=Datos.charCodeAt(phase+0);
	if (tempV&0xF0)
	{
		if (tempV&0x80)flags+=8;
		if (tempV&0x40)flags+=4;
		if (tempV&0x30)flags+=1;
	}
	//------------------------------------------------------------
	out = document.getElementById("phase"+phaseC+"R");
	if(out!=null)
	{
		if(tempV&1)
		{
			color=" rgb(240,0,0)";
			temp=getgroup(out,"style","fill");
			if(flags&1 && color==temp)
				color=" rgb(127,127,127)";
			setgroup(out,"style", "fill:"+color);
		}
		else
			setgroup(out,"style", "fill:rgb(127,127,127)");
	}
	//------------------------------------------------------------
	out = document.getElementById("phase"+phaseC+"Y");
	if(out!=null)
	{
		if(tempV&2)
		{
			color=" rgb(240,240,0)";
			temp=getgroup(out,"style","fill");
			if(flags&1 && color==temp)
				color=" rgb(127,127,127)";
			setgroup(out,"style", "fill:"+color);
		}
		else
			setgroup(out,"style", "fill:rgb(127,127,127)");
	}
	//------------------------------------------------------------
	out = document.getElementById("phase"+phaseC+"G");
	if(out!=null)
	{
		if(tempV&4)
		{
			color=" rgb(0,240,0)";
			temp=getgroup(out,"style","fill");
			if(flags&1 && color==temp)
				color=" rgb(127,127,127)";
			setgroup(out,"style", "fill:"+color);
		}
		else
			setgroup(out,"style", "fill:rgb(127,127,127)");
	}
	//------------------------------------------------------------
	if(out==null)
	{
		out = document.getElementById("phase"+phaseC);
		switch(tempV&7)
		{
			case 1:
				color=" rgb(240, 0, 0)";
			break;
			case 2:
				color=" rgb(240, 240, 0)";
			break;
			case 4:
				color=" rgb(0, 240, 0)";
			break;
			default:
				color=" rgb(127, 127, 127)";
			break;
		}
		if(out!=null)
		{
			if(flags&1)
			{
				tempV=getgroup(out,"style","fill");
				if(tempV==color)
				color=" rgb(127, 127, 127)";
			}
			setgroup(out,"style", "fill:"+color);//+";stroke:"+color
		}
	}
	phase+=PhasesStructSize;
	phaseC++;
 }
}

function rcvphases3(Datos)
{
	var sts3=0;
	var lstX=-1;
	var sts2=0;
	var RTC=Datos.getResponseHeader("Content-Type");
	var count=RTC.indexOf("RTC:");
	if(count!=-1)
	{
		count+=4;
		RTC=RTC.substring(count);
		RTC=parseInt(RTC);
		RTC*=1000;
		dat = new Date(RTC);
		RTC+=(dat.getTimezoneOffset()*60000);
		var dat = new Date(RTC);
	}
	else
		var dat="";// */
	dat = new Date();
	Datos=Datos.responseText;
	if((Datos.length%PhasesStructSize)==0)
	{
		var PhObj=new Object();
		PhObj.Datos=Datos.slice();
		PhObj.Date=dat;
		PhHist.push(PhObj);
		PhHist.shift();
		if(PhHist[PhHist.length-1])
		{
			Datos=PhHist[PhHist.length-1].Datos.slice();
			dat=PhHist[PhHist.length-1].Date;
		}
		else
		{
			Datos=0;
			dat=""
		}
	}
	count=0;
	var phase=0;
	var Y,X;
	var State=null;
	var phases=Datos.length;
	phases/=PhasesStructSize;
	var temp=0;
	var flags=0;
	var out=0;
	var yspt=14;
	var currents=0;
	var sts=0;
	var dat1 = new Date();
	var dat2="";
	var out2="";
	//---------------------------------
	out="<svg width=\""+(fullscaleX+65)+"\" height=\""+(150+(yspt*phases))+"\" xmlns=\"http://www.w3.org/2000/svg\">\
	<title>"+Str_Phase_Status+" "+PhHist.length+" "+dat+"</title>\
	<defs>\
		<linearGradient id=\"grad1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\
		  <stop offset=\"0%\" style=\"stop-color:rgb(255,255,250);stop-opacity:1\" />\
		  <stop offset=\"100%\" style=\"stop-color:rgb(255,255,255);stop-opacity:0\" />\
		</linearGradient>\
	</defs>\
	<rect fill=\"#FFFFFF\" stroke=\"#FFFFFF\" x=\"1\" y=\"1\" width=\""+(fullscaleX+65)+"\" height=\""+(150+(yspt*phases))+"\" id=\"fondo\"/>";
	for(var phase=0;phase<phases;phase++)
	{
		//--------------------------------- PLC Number
		temp=Datos.substring((phase*PhasesStructSize)+16,(phase*PhasesStructSize)+18);
		currents=ByToSht(temp);
		tempV=Datos.charCodeAt((phase*PhasesStructSize)+3);
		tempV&=0x07;
		//--------------------------------- color
		tempV=Datos.charCodeAt((phase*PhasesStructSize)+0);
		out+="<text fill=\"#000000\" x=\""+(fullscaleX+3)+"\" y=\""+(22+(yspt*phase))+"\" stroke-width=\"0\" font-size=\"14\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">["+(phase+1)+"]"+(currents)+"mA</text>";
	}
	for(var temp=0;temp<(fullscaleX/Pxs);temp++)
	{
		if(PhHist[temp])
		{
			Datos=PhHist[temp].Datos;
			dat=PhHist[temp].Date;
		}
		else
		{
			Datos=0;
			dat=""
		}
		X=(fullscaleX-(Pxs*(PhHist.length-temp)))+5;
		sts=0;
		for(var phase=0;phase<phases;phase++)
		{
			if(Datos)
				tempV=Datos.charCodeAt((phase*PhasesStructSize)+0);
			else
				tempV=0;
			color="\"#404040\"";
			if ((tempV&0x07)==0x07)
			{
				tempV=Datos.charCodeAt((phase*PhasesStructSize)+2);
				//tempV=0x12;
			}
			if(tempV!=0)
				sts+=((tempV&7)<<(3*phase));
			if (tempV&1)color="\"#F00000\"";
			if (tempV&2)color="\"#D0D000\"";
			if (tempV&4)color="\"#00C000\"";
			Y=(20+(yspt*phase));
			if (tempV&0x30)
			{
				out+="<line id=\"svg_13\" y1=\""+Y+"\" x1=\""+X+"\" y2=\""+Y+"\" x2=\""+(X+(Pxs/4))+"\" stroke="+color+" fill=\"none\" stroke-width=\"6\"/>";
				out+="<line id=\"svg_13\" y1=\""+Y+"\" x1=\""+(X+(Pxs/2))+"\" y2=\""+Y+"\" x2=\""+(X+(Pxs/2)+(Pxs/4))+"\" stroke="+color+" fill=\"none\" stroke-width=\"6\"/>";
			}
			else
			{
				if((tempV&3)==3)
				{
					out+="<line id=\"svg_13\" y2=\""+(Y-2)+"\" x2=\""+(X+(Pxs))+"\" y1=\""+(Y-2)+"\" x1=\""+X+"\" stroke=\"#F00000\" fill=\"none\" stroke-width=\"4\"/>";
					out+="<line id=\"svg_13\" y2=\""+(Y+2)+"\" x2=\""+(X+(Pxs))+"\" y1=\""+(Y+2)+"\" x1=\""+X+"\" stroke=\"#D0D000\" fill=\"none\" stroke-width=\"4\"/>";
				}
				else
				{
					if((tempV&6)==6)
					{
						out+="<line id=\"svg_13\" y2=\""+(Y-2)+"\" x2=\""+(X+(Pxs))+"\" y1=\""+(Y-2)+"\" x1=\""+X+"\" stroke=\"#D0D000\" fill=\"none\" stroke-width=\"4\"/>";
						out+="<line id=\"svg_13\" y2=\""+(Y+2)+"\" x2=\""+(X+(Pxs))+"\" y1=\""+(Y+2)+"\" x1=\""+X+"\" stroke=\"#00C000\" fill=\"none\" stroke-width=\"4\"/>";
					}
					else
					{
						out+="<line id=\"svg_13\" y2=\""+Y+"\" x2=\""+(X+(Pxs))+"\" y1=\""+Y+"\" x1=\""+X+"\" stroke="+color+" fill=\"none\" stroke-width=\"8\"/>";
					}
				}
			}
		}
		if(sts3==0 && (sts&7)==4)
		{
			sts3=sts;
		}
		if(dat!="")
		{
			out+="<g transform=\"translate("+(X+8)+" "+(15+(yspt*(phases)))+")\">\
			<text fill=\"#000000\" x=\"-5\" y=\"5\" transform=\"rotate(50)\" stroke-width=\"0\" font-size=\"9\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">";
			if( dat1.getSeconds()!=dat.getSeconds() || (sts2!=sts) )
				out+=""+dat.getMinutes()+":"+dat.getSeconds()+" "; //+dat.getHours()+":"
			dat1=dat;
			if(sts2!=sts)
			{
				//-----------------------------------------------------
				if( dat2!="" )
					out+=" ("+Math.round((dat.getTime()-dat2.getTime())/100)/10+")";
				dat2=dat;
				sts2=sts;
				//-----------------------------------------------------
				if( sts3==sts )
				{
					if(lstX!=-1)
					{
						out+="-> "+Math.round((PhHist[temp].Date.getTime()-PhHist[lstX].Date.getTime())/100)/10;
					}
					else
					{
						lstX=temp;
						if(lstX==0)lstX=-1;
					}
				}
				//-----------------------------------------------------
			}
			out+="</text></g>";
		}
	}
	out+="<rect fill=\"url(#grad1)\" stroke-width=\"0\" x=\"1\" y=\"1\" width=\""+(fullscaleX/6)+"\" height=\""+(150+(yspt*phases))+"\"/>";
	out+="</svg>";
	return out;
}
//=================================================

function rcvInterprete(Datos)
{
	var StepName=["Run","Pause"];
	var out="";
	var temp="";
	var tempi=0;
	var pInterp=new Object();
	Datos=Datos.responseText;
	pInterp.run=Datos.charCodeAt(0);
	pInterp.script_file=Datos.substring(1,16);
	pInterp.script_file=pInterp.script_file.substring(0,pInterp.script_file.search("\0"));
	pInterp.reg=new Object();
	pInterp.reg.CurrentDate=Datos.substring(16,31);
	pInterp.reg.CurrentDate=pInterp.reg.CurrentDate.substring(0,pInterp.reg.CurrentDate.search("\0"));
	pInterp.reg.CurrentTable=Datos.substring(31,46);
	pInterp.reg.CurrentTable=pInterp.reg.CurrentTable.substring(0,pInterp.reg.CurrentTable.search("\0"));
	pInterp.reg.NexTime=Datos.substring(46,56);
	pInterp.reg.NexTime=pInterp.reg.NexTime.substring(0,pInterp.reg.NexTime.search("\0"));
	temp=Datos.substring(56,60);
	pInterp.reg.last_sync=ByToInt(temp);
	temp=Datos.substring(68,72);
	pInterp.reg.LSTCHG=ByToInt(temp);
	temp=Datos.substring(72,76);
	pInterp.reg.MCT=ByToInt(temp);
	temp=Datos.substring(76,80);
	pInterp.reg.NEXCHG=ByToInt(temp);

	temp=Datos.substring(92,96);
	pInterp.RTC=ByToInt(temp);	//utemp
	temp=Datos.substring(96,100);
	temp=ByToInt(temp)
	pInterp.StkIdx=(temp&7);
	pInterp.RunSync=(temp&8);	
	temp=Datos.substring(104,108);
	pInterp.code_size=ByToInt(temp);
	pInterp.ptr_code= new Array();
	
	temp=Datos.substring(280,284);
	pInterp.ptr_code[0]=ByToInt(temp);
	temp=Datos.substring(284,288);
	pInterp.ptr_code[1]=ByToInt(temp);
	temp=Datos.substring(288,292);
	pInterp.ptr_code[2]=ByToInt(temp);
	temp=Datos.substring(292,296);
	pInterp.ptr_code[3]=ByToInt(temp);
	temp=Datos.substring(296,300);
	pInterp.StartCode=ByToInt(temp);
	pInterp.code=Datos.substring(300);
	//---------------------------------------------------------------------------------------------------------------
	temp=pInterp.code.substring((pInterp.ptr_code[pInterp.StkIdx]-pInterp.StartCode));
	tempi=temp.search("\0");
	temp=pInterp.code.substring(0,(pInterp.ptr_code[pInterp.StkIdx]-pInterp.StartCode)+tempi);
	temp+="Â«";
	temp+=pInterp.code.substring((pInterp.ptr_code[pInterp.StkIdx]-pInterp.StartCode)+tempi);
	pInterp.code=temp;
	pInterp.code=decompilador(pInterp.code);
	//---------------------------------------------------------------------------------------------------------------
	tempi=pInterp.code.search("Â«");
	temp=HTMLEncode(pInterp.code.substring(0,tempi));
	temp+="&#160;&#160;&#160;<b><font size=\"2\" face=\"arial\" color=\"#FFFFFF\">&#60;&#60;----["+(pInterp.ptr_code[pInterp.StkIdx]-pInterp.StartCode)+":"+(pInterp.RTC-pInterp.reg.last_sync)+"]</font></b>\n";
	temp+=HTMLEncode(pInterp.code.substring(tempi+1));
	pInterp.code=temp;
	//alert(pInterp.code);// */
	//---------------------------------------------------------------------------------------------------------------
	out+="<table border=\"0\" cellpadding=\"4\" cellspacing=\"0\" bgcolor=\"#000000\"  width=\"%100\">\n\
	<tr><td align=\"left\">\n\
	<div id=\"interpCode\" style=\"overflow:auto;height: 1050px; width: 500px;color:#00FF00;font-family:Terminal;font-size:8px;\" ondblclick=\"this.innerHTML='';\">\n";
	out+=pInterp.code;
	out+="</div>\n\
	</td><td align=\"left\">\n\
	<div id=\"interpVars\" style=\"overflow:auto;height: 1050px; width: 300px;color:#00FF00;font-family:Terminal;font-size:8px;\" >\n";
	out+="File Name ["+HTMLEncode(pInterp.script_file)+"]<br />\n";
	out+="Time Scheduler ["+HTMLEncode(pInterp.reg.CurrentTable)+"<br />\n";
	out+="Date ["+HTMLEncode(pInterp.reg.CurrentDate)+"]<br />\n";
	out+="Nex Time ["+HTMLEncode(pInterp.reg.NexTime)+"]<br />\n";
	out+="Step [";
	if(pInterp.run>1)
		out+=pInterp.run;
	else
		out+=StepName[pInterp.run];
	out+="]<br />\n";
	out+="LTS [";
	if(pInterp.reg.last_sync!=0)
	{
		temp=(pInterp.reg.last_sync+1)*1000;
		dat = new Date(temp);
		temp+=(dat.getTimezoneOffset()*60000);
		temp = new Date(temp);
	}
	else
		temp="";// */
	out+=temp;
	out+="]<br />\n";
	out+="RTC [";
	if(pInterp.RTC!=0)
	{
		temp=(pInterp.RTC)*1000;
		dat = new Date(temp);
		temp+=(dat.getTimezoneOffset()*60000);
		temp = new Date(temp);
	}
	else
		temp="";// */
	out+=temp;
	out+="]<br />\n";
	out+="RunTime ["+(pInterp.RTC-pInterp.reg.last_sync)+"]<br />\n";
	out+="Stack Deep ["+pInterp.StkIdx+"]<br />\n";
	out+="Run Sync ["+pInterp.RunSync+"]<br />\n";
	out+="Code size ["+pInterp.code_size+"]<br />\n";
	out+="ptr_code[Stkdeep]:"+pInterp.ptr_code[pInterp.StkIdx]+"<br />\n"; // */
	out+="Start Code:"+pInterp.StartCode+"<br />\n"; // */
	out+="MCT ["+(pInterp.reg.MCT)+"]<br />\n"; // */
	//-------------------------------
	out+="LSTCHG [";
	//out+=pInterp.reg.LSTCHG;
	temp=(pInterp.reg.LSTCHG)*1000;
	dat = new Date(temp);
	temp+=(dat.getTimezoneOffset()*60000);
	temp = new Date(temp);
	out+=temp;// */
	out+="]<br />\n";
	//-------------------------------
	out+="NEXCHG [";
	temp=(pInterp.reg.NEXCHG)*1000;
	dat = new Date(temp);
	temp+=(dat.getTimezoneOffset()*60000);
	temp = new Date(temp);
	out+=temp;
	out+="]<br />\n"; // */
	out+="</div>\n\
	</td></tr>\n\
	</table>\n";
	return out;
/*	tempi=pInterp.code.search("----");
	temp=pInterp.code.split("\n");
	temp=temp.length+tempi;
	LOG(CtrlIdx+" "+temp);
	if(document.getElementById("dbgscrl").checked)
		document.getElementById("interpCode").scrollTop =(temp/8)+55;//+document.getElementById('interpCode').scrollTop // */
}

percent=28;

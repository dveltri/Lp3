var AllConf="";
function SetRemote()
{
	Reload|=0x100;
	if(GlobalParms.MODEL.indexOf("M3")!=-1)
	{
		HW_IOS=9;
		PhasesStructSize=56;
	}
	if(GlobalParms.MODEL.indexOf("M4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
	{
		HW_IOS=16;
		PhasesStructSize=60;
	}
}

//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function chkAdvance()
{
	if(ChkParm("GlobalParms.FlasCA",parseInt(document.getElementById("GlobalParms.FlasCA").value))==true)
		GlobalParms.FlasCA=parseInt(document.getElementById("GlobalParms.FlasCA").value);
	if(ChkParm("GlobalParms.Time_Cap",parseInt(document.getElementById("GlobalParms.Time_Cap").value))==true)
		GlobalParms.Time_Cap=parseInt(document.getElementById("GlobalParms.Time_Cap").value);
	if(ChkParm("GlobalParms.Alert_Over_Voltage",parseInt(document.getElementById("GlobalParms.Alert_Over_Voltage").value))==true)
		GlobalParms.Alert_Over_Voltage=parseInt(document.getElementById("GlobalParms.Alert_Over_Voltage").value)*100;
	if(ChkParm("GlobalParms.Normal_Voltage",parseInt(document.getElementById("GlobalParms.Normal_Voltage").value))==true)
		GlobalParms.Normal_Voltage=parseInt(document.getElementById("GlobalParms.Normal_Voltage").value)*100;
	if(ChkParm("GlobalParms.Error_Minimal_Voltage",parseInt(document.getElementById("GlobalParms.Error_Minimal_Voltage").value))==true)
		GlobalParms.Error_Minimal_Voltage=parseInt(document.getElementById("GlobalParms.Error_Minimal_Voltage").value)*100;
	if(ChkParm("GlobalParms.Error_Critical_Voltage",parseInt(document.getElementById("GlobalParms.Error_Critical_Voltage").value))==true)
		GlobalParms.Error_Critical_Voltage=parseInt(document.getElementById("GlobalParms.Error_Critical_Voltage").value)*100;
}
function SendStartup(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	seek=0;
	var dt;
	UpFile="startup.ini"
	chkAdvance();
	var ip=Prg.GlobalParms.ETH0;
	if(Prg.GlobalParms.ID)
		UpData+="ID "+Remplace(Prg.GlobalParms.ID," ","_")+"\n";
	else
		UpData+=Remplace("ID "+Prg.GlobalParms.ETH0+"\n",",",".");
	UpData+="MAC 00-01";
	for(var i=0;i<ip.length;i++)
	{
		ip[i]=parseInt(ip[i]);
		temp=""+ip[i].toString(16).toUpperCase();
		if(temp.length==1)
			UpData+="-0"+temp
		else
			UpData+="-"+temp
	}
	UpData+="\n";
	UpData+="Model "+Prg.GlobalParms.MODEL+"\n";
	if(Prg.GlobalParms.Version)
		UpData+="Ver "+Prg.GlobalParms.Version+"\n";
	UpData+=Remplace("ETH0 "+Prg.GlobalParms.ETH0+"\n",",",".");
	if(Prg.GlobalParms.MODEL.indexOf("M3")!=-1)
	{
		UpData+=Remplace("NETMASK0 "+Prg.GlobalParms.NETMASK0+"\n",",",".");
	}
	else
	{
		UpData+=Remplace("NETMASK "+Prg.GlobalParms.NETMASK0+"\n",",",".");
	}
	if(Prg.GlobalParms.MODEL.indexOf("M3")!=-1)
	{
		UpData+=Remplace("MACDGW "+Prg.GlobalParms.MACDGW+"\n",",","-");
	}
	else
	{
		UpData+=Remplace("DGW "+Prg.GlobalParms.DGW+"\n",",",".");
	}
	UpData+="LOG "+Prg.GlobalParms.LOG+"\n";
	UpData+="Flashing "+Prg.GlobalParms.Flashing+"\n";
	UpData+="FlasCA "+Prg.GlobalParms.FlasCA+"\n";
	UpData+="Loops "+Prg.GlobalParms.Loops+"\n";
	///UpData+="Loop Type "+Prg.GlobalParms.Loop_Type+"\n";
	UpData+="Virtual Inputs "+Prg.GlobalParms.Virtual_Inputs+"\n";
	UpData+="Inputs "+Prg.GlobalParms.Inputs+"\n";
	UpData+="Outputs "+Prg.GlobalParms.Outputs+"\n";
	UpData+="Phases "+Prg.GlobalParms.Phases+"\n";
	UpData+="Virtual Phases "+Prg.GlobalParms.Virtual_Phases+"\n";
	UpData+="Remote Phases 0\n";
	UpData+="Groups Phases "+Prg.GlobalParms.Groups_Phases+"\n";
	UpData+="Controllers "+Prg.GlobalParms.Controllers+"\n";
	UpData+="Time Out Electrical Error "+Prg.GlobalParms.Time_Out_Electrical_Error+"\n";
	UpData+="Time Out Consumption Error "+Prg.GlobalParms.Time_Out_Consumption_Error+"\n";
	UpData+="Alert Over Voltage "+Prg.GlobalParms.Alert_Over_Voltage+"\n";
	UpData+="Normal Voltage "+Prg.GlobalParms.Normal_Voltage+"\n";
	UpData+="Error Minimal Voltage "+Prg.GlobalParms.Error_Minimal_Voltage+"\n";
	UpData+="Error Critical Voltage "+Prg.GlobalParms.Error_Critical_Voltage+"\n";
	UpData+="Web Access Code Ro "+Prg.GlobalParms.Web_Access_Code_RO+"\n";
	UpData+="Web Access Code R/W "+Prg.GlobalParms.Web_Access_Code_RW+"\n";
	UpData+="Time Zone GMT "+Prg.GlobalParms.Time_Zone_GMT+"\n";
	if((Prg.GlobalParms.MODEL.indexOf("GW4")!=-1 || Prg.GlobalParms.MODEL.indexOf("GW")==-1 || Prg.GlobalParms.MODEL.indexOf("M3")!=-1))
	UpData+="Enable GPS "+Prg.GlobalParms.Enable_GPS+"\n";
	UpData+="Time Cap 0\n";
	UpData+="VoltDes "+Prg.GlobalParms.VoltDes+"\n";
	UpData+="VoltPen "+Prg.GlobalParms.VoltPen+"\n";
	if(Prg.GlobalParms.IniFsh)
		UpData+="IniFsh "+Prg.GlobalParms.IniFsh+"\n";
	else
		UpData+="IniFsh 5\n";
	if(Prg.GlobalParms.IniRed)
		UpData+="IniRed "+Prg.GlobalParms.IniRed+"\n";
	else
		UpData+="IniRed 3\n";
	if(Prg.GlobalParms.ATZ && (Prg.GlobalParms.MODEL.indexOf("GW4")!=-1 || Prg.GlobalParms.MODEL.indexOf("GW")==-1))
	{
		var ATZ=owl.deepCopy(Prg.GlobalParms.ATZ);
		for(var i=0;i<ATZ.length;i+=2)
		{
			dt = new Date(ATZ[i]+" 00:00:00 GMT+0:00");
			ATZ[i]=parseInt(dt.getTime()/1000);
		}
		UpData+="ATZ ";
		//UpData+="\n";
		for(var i=0;i<ATZ.length;i+=2)
		{
			for(var x=0;x<32;x+=8)
			{
				temp=(ATZ[i]>>x)&0xFF;
				temp=""+temp.toString(16).toUpperCase();
				if(temp.length==1)
					UpData+="&0"+temp;
				else
					UpData+="&"+temp;
			}
			//UpData+=" ";
			for(var x=0;x<32;x+=8)
			{
				temp=(ATZ[i+1]>>x)&0xFF;
				temp=""+temp.toString(16).toUpperCase();
				if(temp.length==1)
					UpData+="&0"+temp;
				else
					UpData+="&"+temp;
			}
			//UpData+="\n";
		}
		UpData+="\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function genPhc()
{
	var out="";
	var Tout="";
	var Ttime=0;
	for(var j=0;j<PHASEs.length;j++)
	{
		if(PHASEs[j].FlagsWeb==0)
		{
			out+=""+PHASEs[j].Numero;
			out+=","+Math.abs(PHASEs[j].MskError);
			out+=","+PHASEs[j].FState;
			out+=","+(PHASEs[j].MiRT+(PHASEs[j].AMiRT<<8));
			out+=" "+(PHASEs[j].MiYT+(PHASEs[j].AMiYT<<8));
			out+=" "+(PHASEs[j].MiGT+(PHASEs[j].AMiGT<<8));
			out+=","+PHASEs[j].MaRT;
			out+=" "+PHASEs[j].MaYT;
			out+=" "+PHASEs[j].MaGT;
			out+=","+PHASEs[j].TOEE;
			out+=","+PHASEs[j].TOEC;
			out+=","
			Tout="";
			Ttime=0;
			for(var i=(PHASEs[j].R2V.length-1);i>-1;i--)
			{
				if(PHASEs[j].R2V[i].Color && (PHASEs[j].R2V[i].Tiempo>0))
				{
					Tout="R"+PHASEs[j].R2V[i].Color+":"+(Ttime+PHASEs[j].R2V[i].Tiempo)+Tout;
					Ttime+=PHASEs[j].R2V[i].Tiempo;
				}
			}
			out+=Tout+"R4:0";
			Tout="";
			Ttime=0;
			for(var i=(PHASEs[j].V2R.length-1);i>-1;i--)
			{
				if(PHASEs[j].V2R[i].Color && (PHASEs[j].V2R[i].Tiempo>0))
				{
					Tout="V"+PHASEs[j].V2R[i].Color+":"+(Ttime+PHASEs[j].V2R[i].Tiempo)+Tout;
					Ttime+=PHASEs[j].V2R[i].Tiempo;
				}
			}
			out+=Tout+"V1:0";
			out+=","+PHASEs[j].PotLR;
			out+=" "+PHASEs[j].PotLY;
			out+=" "+PHASEs[j].PotLG;
			out+=","+PHASEs[j].LampTyp;
			out+="\n";
		}
	}
	return out;
}
function genEv()
{
	var out="";
	var Tout="";
	var Ttime=0;
	var j=0;
	if(!PLCs[PlcIdx])
	 return "";
	for(var x=0;x<PLCs[PlcIdx].Phases.length;x++)
	{
		j=PLCs[PlcIdx].Phases[x];
		if(PHASEs[j].FlagsWeb==0)
		{
			out+=""+PHASEs[j].Numero;
			out+=",";
			out+=",";
			out+=",";
			out+=",";
			out+=",";
			out+=",";
			out+=",";
			Tout="";
			Ttime=0;
			if(PHASEs[j].R2V.length)
				for(var i=(PHASEs[j].R2V.length-1);i>-1;i--)
				{
					if(PHASEs[j].R2V[i].Color && PHASEs[j].R2V[i].Tiempo>0)
					{
						Tout="R"+PHASEs[j].R2V[i].Color+":"+(Ttime+PHASEs[j].R2V[i].Tiempo)+Tout;
						Ttime+=PHASEs[j].R2V[i].Tiempo;
					}
				}
			out+=Tout+"R4:0";
			Tout="";
			Ttime=0;
			if(PHASEs[j].V2R.length)
				for(var i=(PHASEs[j].V2R.length-1);i>-1;i--)
				{
					if(PHASEs[j].V2R[i].Color && PHASEs[j].V2R[i].Tiempo>0)
					{
						Tout="V"+PHASEs[j].V2R[i].Color+":"+(Ttime+PHASEs[j].V2R[i].Tiempo)+Tout;
						Ttime+=PHASEs[j].V2R[i].Tiempo;
					}
				}
			out+=Tout+"V1:0";
			out+=",";
			out+=",";
			out+="\n";
		}
	}
	return out;
}
function SendPhConf(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData=Prg.GlobalParms.phconf+"\n";
	UpFile="phconf.ini"
	seek=0;
	return UpData;
}
function SendEv(Prg)
{
	UpMode=10;
	UpPath="/"+PlcIdx;
	UpType="txt";
	UpData="";
	if(PlcIdx<Prg.PLCs.length)
	{
		if(CEV<Prg.PLCs[PlcIdx].EV.length)
		{
			UpData=Prg.PLCs[PlcIdx].EV[CEV]+"\n";
		}
	}
	UpFile="phc"+(CEV+1)+".ini"
	seek=0;
	//alert(UpData);UpMode=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendPlc(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="plcs.ini"
	seek=0;
	for(var count=0;count<Prg.PLCs.length;count++)
	{
		UpData+="\n";
		UpData+="Number:"+Prg.PLCs[count].Number+"\n";
		UpData+="Name:"+Prg.PLCs[count].Name+"\n";
		UpData+="Plan:"+Prg.PLCs[count].Plan+"\n";
		UpData+="Flashing:"+Prg.PLCs[count].Flashing+"\n";
		UpData+="SyncRef:"+Prg.PLCs[count].SyncRef+"\n";
		UpData+="Scheduler:"+Prg.PLCs[count].Scheduler+"\n";
		UpData+="Location:"+Prg.PLCs[count].Location+"\n";
		UpData+="Server:"+Prg.PLCs[count].Server+"\n";
		UpData+="Phases:,"+Prg.PLCs[count].Phases+"\n";
		UpData+="Phase1:"+Prg.PLCs[count].Phase1+"\n";
		UpData+="Error Out:"+Prg.PLCs[count].ErrorOut+"\n";
		UpData+="Sec:"+Remplace(Prg.PLCs[count].Sec,'//','/')+"\n";
		UpData+="Svg:"+Prg.PLCs[count].Svg+"\n";
		for(var i=0;i<Prg.PLCs[count].Sts.length;i++)
		{
			RemoveUnusedItem(Prg.PLCs[count].Sts[i].Colors);
			UpData+="Sts:"+Prg.PLCs[count].Sts[i].Colors+"."+Prg.PLCs[count].Sts[i].TMAX+"."+Prg.PLCs[count].Sts[i].TMIN+"\n";
		}
	}
	//alert(UpData);
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendOPCT(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="OPCT.ini"
	seek=0;
	for(var i=0;i<Prg.OPCT.length;i++)
	{
		for(var j=0;j<(Prg.OPCT[i].length-1);j++)
		{
			UpData+=Prg.OPCT[i][j]+":";
		}
		UpData+=Prg.OPCT[i][j]+"\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendIP(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="ip.ini";
	for(var count=0;count<Prg.Links.length;count++)
	{
		UpData+=Prg.Links[count][0]
		for(var seek=1;seek<Prg.Links[count].length;seek++)
		{
			UpData+=","+Prg.Links[count][seek];
		}
		UpData+="\n";
	}
	seek=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendSec(Prg)
{
	UpMode=10;
	UpPath=Remplace(PLCs[PlcIdx].Sec,"sec.sec","");
	UpType="txt";
	UpData="";
	UpFile="sec.sec";
	var PhN=0;
	if(!Prg.PLCs[PlcIdx])
		return "";
	var plcph=Prg.PLCs[PlcIdx].Phases;
	for(var j=0;j<plcph.length;j++)
	{
		PhN=parseInt(plcph[j]);
		if(PhN<PHASEs.length && Prg.PHASEs[PhN].FlagsWeb==0)
		{
			UpData+="("+PhN+")";
			for(var i=0;i<Prg.PHASEs[PhN].Sec.length;i++)
			{
				UpData+="["+Prg.PHASEs[PhN].Sec[i].phase+","+Prg.PHASEs[PhN].Sec[i].time+"]";
			}
			UpData+="\n"
		}
	}
	seek=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendDGV(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	seek=0;
	UpFile="dgvsoft.ini"
	UpData=DgvSoft;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendDgvP(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	seek=0;
	UpFile="dgvp.ini"
	UpData=Prg.DgvP.slice();
	for(var j=0;j<UpData.length;j++)
	{
		UpData[j]=UpData[j].join("=");
	}
	UpData=UpData.join("\n");
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendSdgvP(Prg)
{
	var temp="";
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpFile="sdgvp.ini"
	UpData ="SDgvP.Link="+Prg.SdgvP.Link+"\n"
	UpData+="SDgvP.SrvId="+Prg.SdgvP.Tsk[0].IDsrv+"\n"
	UpData+="SDgvP.debug="+Prg.SdgvP.Debug+"\n"
	if(Prg.SdgvP.Tsk)
	{
		for(var idx=0;idx<Prg.SdgvP.Tsk.length;idx++)
		{
			UpData+="SDgvP.Tsk"+idx+","+Prg.SdgvP.Tsk[idx].Period+",20,"+Prg.SdgvP.Tsk[idx].IDsrv+",255,"+Prg.SdgvP.Tsk[idx].Sck+","+Prg.SdgvP.Tsk[idx].Sck+",0,0,0";
			switch(Prg.SdgvP.Tsk[idx].Sck)
			{
				case 2:
				{
					UpData+=",0,0,0,0";
				}
				break;
				case 252:
				{
					for(var i=0;i<Prg.SdgvP.Tsk[idx].cmps.length;i++)
					{
						if(GlobalParms.MODEL.indexOf("M3")!=-1)
						{
							seek=DgvPM3.indexOf(Prg.SdgvP.Tsk[idx].cmps[i]);
							if(seek!=-1)
							{
								temp+=DgvPM3[seek+1];
							}
						}
						if(GlobalParms.MODEL.indexOf("M4")!=-1)
						{
							seek=DgvPM4.indexOf(Prg.SdgvP.Tsk[idx].cmps[i]);
							if(seek!=-1)
							{
								temp+=DgvPM4[seek+1];
							}
						}
					}
					seek=temp.split(",").length-1;
					UpData+=","+(seek&0x000000FF);
					UpData+=","+(seek&0x0000FF00);
					UpData+=","+(seek&0x00FF0000);
					UpData+=","+(seek&0xFF000000);
					UpData+=temp
				}
				break;
			}
			UpData+="\n"
		}
	}
	seek=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendIteris()
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="iteris.ini"
	seek=0;
	for(var i=0;i<Iteris.length;i++)
	{
		for(var j=0;j<(Iteris[i].length-1);j++)
		{
			UpData+=Iteris[i][j]+":";
		}
		UpData+=Iteris[i][j]+"\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendGPS(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="gps.ini"
	seek=0;
	for(var i=0;i<Prg.GPS.length;i++)
	{
		for(var j=0;j<(Prg.GPS[i].length-1);j++)
		{
			UpData+=Prg.GPS[i][j]+":";
		}
		UpData+=Prg.GPS[i][j]+"\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendNTP(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="ntp.ini"
	seek=0;
	for(var i=0;i<Prg.NTP.length;i++)
	{
		for(var j=0;j<(Prg.NTP[i].length-1);j++)
		{
			UpData+=Prg.NTP[i][j]+":";
		}
		UpData+=Prg.NTP[i][j]+"\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendErrCfg(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="error.ini"
	seek=0;
	for(var i=0;i<Prg.ErrorsCfg.length;i++)
	{
		if(Prg.ErrorsCfg[i][0])
		{
			if(Prg.ErrorsCfg[i][1])
			{
				UpData+=Prg.ErrorsCfg[i][0];
				if(Prg.ErrorsCfg[i][2])
					UpData+=Prg.ErrorsCfg[i][2];
				else
					UpData+=":";
				UpData+=Prg.ErrorsCfg[i][1]+"\n";
			}
		}
	}
	//alert(UpData);
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendMaster(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="master.ini"
	seek=0;
	for(var i=0;i<Prg.Master.length;i++)
	{
		for(var j=0;j<(Prg.Master[i].length-1);j++)
		{
			UpData+=Prg.Master[i][j]+":";
		}
		UpData+=Prg.Master[i][j]+"\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendDefIn(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="def_in.ini"
	seek=0;
	for(var i=0;i<Prg.DefIn.length;i++)
	{
		for(var j=0;j<(Prg.DefIn[i].length-1);j++)
		{
			UpData+=Prg.DefIn[i][j]+":";
		}
		UpData+=Prg.DefIn[i][j]+"\n";
	}
	for (var i=0; i<Prg.IOs.length; i++)
	{
		UpData+="I/O:"+i;
		UpData+=","+Prg.IOs[i].Enable;
		UpData+=","+Prg.IOs[i].Type;
		UpData+=","+Prg.IOs[i].neg;
		UpData+=","+Prg.IOs[i].Flank;
		UpData+=","+Prg.IOs[i].TimeOut;
		UpData+=","+Prg.IOs[i].FailSts;
		UpData+=","+Prg.IOs[i].Plcs;
		UpData+=","+Prg.IOs[i].Name;
		UpData+="\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==

function SendOTU(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="OTU.ini"
	seek=0;
	UpData+="Comm:"+Prg.OTU.Link+"\n";
	UpData+="G1G2:"+Prg.OTU.G1G2+"\n";
	UpData+="\n";
	if(Prg.OTU.CftPLCs.length)
	{
		Prg.OTU.CftPLCs.length=GlobalParms.Controllers;
		for(var i=0;i<GlobalParms.Controllers;i++)
		{
			UpData+="CFT"+i+":"
			if(Prg.OTU.CftPLCs[i])
			{
				if(Prg.OTU.CftPLCs[i].length)
				{
					if(Prg.OTU.CftPLCs[i][0].length)
					{
						if(Prg.OTU.CftPLCs[i][0][0]>0 && Prg.OTU.CftPLCs[i][0][1]>0)
						{
							UpData+=Prg.OTU.CftPLCs[i][0][0]+"a"+Prg.OTU.CftPLCs[i][0][1];
							for(var j=1;j<Prg.OTU.CftPLCs[i].length;j++)
							{
								if(Prg.OTU.CftPLCs[i][j].length)
								if(Prg.OTU.CftPLCs[i][j][0]>0 && Prg.OTU.CftPLCs[i][j][1]>0)
								UpData+=","+Prg.OTU.CftPLCs[i][j][0]+"a"+Prg.OTU.CftPLCs[i][j][1];
							}
						}
					}
				}
			}
			UpData+="\n";
		}
		UpData=Remplace(UpData,",\n","\n");
	}
	else
		UpData+="//CFT:\n";	
	UpData+="\n";
	for(var i=0;i<Prg.OTU.BitCofigRx.length;i++)
	{
		UpData+="Rx"+Prg.OTU.BitCofigRx[i].NBit+","+Prg.OTU.BitCofigRx[i].Fnc+","+Prg.OTU.BitCofigRx[i].Parms+"\n";
	}
	UpData+="\n";
	for(var i=0;i<Prg.OTU.BitCofigTx.length;i++)
	{
		UpData+="Tx"+Prg.OTU.BitCofigTx[i].NBit+","+Prg.OTU.BitCofigTx[i].Fnc+","+Prg.OTU.BitCofigTx[i].Parms+"\n";
	}
	if(Prg.OTU.FO)
	UpData+="Tx"+(Prg.OTU.FO-1)+",FO\n";
	//alert(UpData);UpMode=0;
	return UpData;
}
function SendOTUPlan(OTUPlan)
{
	UpMode=10;
	UpPath="/"+PlcIdx;
	UpType="txt";
	UpData="";
	if(!OTUPlan)
	 return "";
	if(OTUPlan.OTUSEQSTS.length==0)OTUPlan.OTUSEQSTS[0]=0;
	if(OTUPlan.OTUDEMSTS.length==0)OTUPlan.OTUDEMSTS[0]=0;
	if(OTUPlan.OTUSTSDEM.length==0)OTUPlan.OTUSTSDEM[0]=0;
	if(OTUPlan.OTUDEMCLR.length==0)OTUPlan.OTUDEMCLR[0]=0;
	UpData+="OTUSEQSTS:"+OTUPlan.OTUSEQSTS.toString()+"\n";
	UpData+="OTUDEMSTS:"+OTUPlan.OTUDEMSTS.toString()+"\n";
	UpData+="OTUSTSDEM:"+OTUPlan.OTUSTSDEM.toString()+"\n";
	UpData+="OTUDEMCLR:"+OTUPlan.OTUDEMCLR.toString()+"\n";
	UpFile="planotu.es3"
	seek=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendMcPlan(McPlan)
{
	if(!McPlan)
		return "";
	if(McPlan.SYCPLCTOU==0)McPlan.SYCPLCTOU=60000;
	if(McPlan.MACSEQSTP.length==0)McPlan.MACSEQSTP[0]=0;
	if(McPlan.MACSTSSTP.length==0)McPlan.MACSTSSTP[0]=1;
	UpMode=10;
	UpPath="/"+PlcIdx;
	UpType="txt";
	UpData="";
	UpData+="SYCPLCTOU:"+McPlan.SYCPLCTOU.toString()+"\n";
	UpData+="MACSEQSTP:"+McPlan.MACSEQSTP.toString()+"\n";
	UpData+="MACSTSSTP:"+McPlan.MACSTSSTP.toString()+"\n";
	UpFile="planmc.es3"
	seek=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendPlans(Plans)
{
	UpMode=10;
	UpPath="/"+PlcIdx;
	UpType="txt";
	UpData="";
	if(!Plans)
		return "";
	for(var i=0;i<Plans.length;i++)
	{
		UpData+="PLNTYP:"+Plans[i].PLNTYP+"\n";
		UpData+="PHC:"+Plans[i].PHC+"\n";
		UpData+="LCLCHGPLN:"+Plans[i].LCLCHGPLN+"\n";
		UpData+="LCLSYCTOF:"+Plans[i].LCLSYCTOF+"\n";
		UpData+="DEMPRI:"+Plans[i].DEMPRI.toString()+"\n";
		if(Plans[i].PLNTYP==0)
		{
			UpData+="LCLASYSEQSTP:"+Plans[i].LCLASYSEQSTP.toString()+"\n";
			UpData+="LCLASYSTSSTP:"+Plans[i].LCLASYSTSSTP.toString()+"\n";
			UpData+="LCLASYTNOSTP:"+Plans[i].LCLASYTNOSTP.toString()+"\n";
			UpData+="LCLASYTMASTP:"+Plans[i].LCLASYTMASTP.toString()+"\n";
			UpData+="LCLASYTEXSTP:"+Plans[i].LCLASYTEXSTP.toString()+"\n";
			UpData+="LCLASYTMISTP:"+Plans[i].LCLASYTMISTP.toString()+"\n";
			UpData+="LCLASYDEXSTP:"+Plans[i].LCLASYDEXSTP.toString()+"\n";
			UpData+="LCLASYDEMSTP:"+Plans[i].LCLASYDEMSTP.toString()+"\n";
			UpData+="LCLASYSTPDEM:"+Plans[i].LCLASYSTPDEM.toString()+"\n";
			UpData+="LCLASYCLRDEM:"+Plans[i].LCLASYCLRDEM.toString()+"\n";
		}
		if(Plans[i].PLNTYP==1)
		{
			UpData+="LCLSYCTCI:"+Plans[i].LCLSYCTCI+"\n";
			UpData+="LCLSYCSEQSTP:"+Plans[i].LCLSYCSEQSTP.toString()+"\n";
			UpData+="LCLSYCSTSSTP:"+Plans[i].LCLSYCSTSSTP.toString()+"\n";
			UpData+="LCLSYCTSTSTP:"+Plans[i].LCLSYCTSTSTP.toString()+"\n";
			UpData+="LCLSYCDEMSTP:"+Plans[i].LCLSYCDEMSTP.toString()+"\n";
			UpData+="LCLSYCDEMSTS:"+Plans[i].LCLSYCDEMSTS.toString()+"\n";
			UpData+="LCLSYCCLRDEM:"+Plans[i].LCLSYCCLRDEM.toString()+"\n";
		}
		if(Plans[i].PLNTYP==2)
		{
			UpData+="LCLSYCTCI:"+Plans[i].LCLSYCTCI+"\n";
			UpData+="LCLSYCSEQSTP:"+Plans[i].LCLSYCSEQSTP.toString()+"\n";
			UpData+="LCLSYCSTSSTP:"+Plans[i].LCLSYCSTSSTP.toString()+"\n";
			UpData+="LCLSYCTSTSTP:"+Plans[i].LCLSYCTSTSTP.toString()+"\n";
			UpData+="LCLSYCDEMSTP:"+Plans[i].LCLSYCDEMSTP.toString()+"\n";
			UpData+="LCLSYCDEMSTS:"+Plans[i].LCLSYCDEMSTS.toString()+"\n";
			UpData+="LCLSYCCLRDEM:"+Plans[i].LCLSYCCLRDEM.toString()+"\n";
		}
		if(i<(Plans.length-1))
			UpData+="\n";
	}
	UpFile="plans.es3"
	seek=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendPlan98A(Prg)
{
	UpMode=10;
	UpPath="/0";
	UpType="eil";
	if(!PLCs[PlcIdx])
		return "";
	SelIObyModel(Prg.GlobalParms.MODEL);
	if(GlobalParms.MODEL.indexOf("M3")!=-1)
		UpData="#CFT:sec.sec;\n";
	else
		UpData="#CFT:"+Prg.PLCs[PlcIdx].Sec.replace("//","/")+";\n";
	UpData+="\
	#MCT:;\n\
	phases ,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16\n\
	delay 2000\n\
	phases ,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7\n\
	mov 0 temp;\n\
	loop1;\n\
	add 1 temp;\n";
	//UpData+="mov 1 PLC[temp].lamp;\n";
	//UpData+="mov 1 PLC[temp].service\n";
	UpData+="mov 9 PLC[temp].dbug\n";
	UpData+="< temp CPLCS loop1;\n";
	if(SwEnMc!=0)
		UpData+="mov 0 io["+SwEnMc+"].fail\n";
	for (var i=0; i<Prg.IOs.length && i<(Prg.GlobalParms.HwIo+Prg.GlobalParms.Inputs+Prg.GlobalParms.Loops); i++)
	{
		if(Prg.IOs[i].Enable==0)
			UpData+="mov 0 io["+(i+1)+"].enable\n";
		else
		{
			if((Prg.IOs[i].Type&3)==2)
			{
				UpData+="mov 0 io["+(i+1)+"].type\n";
			}
			else
			{
				if(Prg.IOs[i].neg)
				UpData+="mov 1 io["+(i+1)+"].neg\n";
				if(Math.round(Prg.IOs[i].TimeOut/256)!=0)
				UpData+="mov "+Math.round(Prg.IOs[i].TimeOut/256)+" io["+(i+1)+"].timef\n";
				if(!Prg.IOs[i].FailSts)
				UpData+="mov 0 io["+(i+1)+"].inf\n";
				if(Prg.IOs[i].Plcs!=0)
				UpData+="mov "+Prg.IOs[i].Plcs+" io["+(i+1)+"].plcs\n"; 
			}
			if((Prg.IOs[i].Type&3)==0)
			{
				UpData+="mov 0 io["+(i+1)+"].type\n";
			}
		}
	}
	//UpData+="phases ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0;\n\
	//delay 100\n";
	for (var i=0; i<Prg.IOs.length && i<(Prg.GlobalParms.HwIo+Prg.GlobalParms.Inputs+Prg.GlobalParms.Loops); i++)
	{
		if(Prg.IOs[i].Enable!=0)
			if((Prg.IOs[i].Type&3)==2)
				UpData+="mov 0 io["+(i+1)+"].val\n";
	}
	if(SwFF!=0)
		UpData+="mov 0 io["+SwFF+"].fail\n";
	if(SwEnMc!=0)
		UpData+="mov 0 io["+SwEnMc+"].fail\n";
	if(SwCmMc!=0)
		UpData+="mov 0 io["+SwCmMc+"].fail\n";
	UpData+="INICIO\n";
	if(Prg.GlobalParms.MODEL.indexOf("RT")!=-1)
	{
		UpData+="mov 0 otu.mc\n";
	}
	if(Prg.GlobalParms.MODEL.indexOf("RT")!=-1)
	{
		UpData+="mov 1 otu.fr\n";
	}
	UpData+="mov 3 PLC[THIS].NexChg;\n";
	UpData+="agenda\n";
	UpData+="phases ,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7\n";
	if(Prg.GlobalParms.IniFsh)
		UpData+="delay "+(Prg.GlobalParms.IniFsh*1000)+"\n";
	else
		UpData+="delay 5000\n";
	if(Prg.GlobalParms.MODEL.indexOf("RT")!=-1)
	{
		UpData+="mov 0 otu.fr\n";
	}
	UpData+="phases ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1;\n";
	if(Prg.GlobalParms.IniRed)
		UpData+="delay "+(Prg.GlobalParms.IniRed*1000)+"\n";
	else
		UpData+="delay 3000\n";
	UpData+="ldeil\n\
	goto INICIO\n\
	#VAR;\n\
	int temp=0;\n\
	end\n";
	UpFile="plan98.eil"
	UpData=compilador(UpData);
	seek=0;
	return UpData;
}

function SendPlan99(Prg)
{
	var out="";
	UpMode=10;
	UpPath="/0";
	UpType="eil";
	if(GlobalParms.MODEL.indexOf("M3")!=-1)
		out+="#CFT:sec.sec;\n";
	else
		out+="#CFT:"+Prg.PLCs[PlcIdx].Sec.replace("//","/")+";\n";
	out+="#MCT:\n\
	phases ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n";
	if(Prg.GlobalParms.IniRed)
		out+="delay "+(Prg.GlobalParms.IniRed*1000)+"\n";
	else
		out+="delay 3000\n";
	out+="INICIO\n\
	mov 3 PLC[THIS].NexChg\n\
	agenda\n\
	phases ,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7\n\
	delay 10000\n\
	ldeil\n\
	goto INICIO\n\
	end\n";
	UpFile="plan99.eil"
	UpData=compilador(out);
	seek=0;
	return out;
}
function SendPlan97(Prg)
{
	var out="";
	UpMode=10;
	UpPath="/0";
	UpType="eil";
	if(GlobalParms.MODEL.indexOf("M3")!=-1)
		out+="#CFT:sec.sec;\n";
	else
		out+="#CFT:"+Prg.PLCs[PlcIdx].Sec.replace("//","/")+";\n";
	out+="#MCT:\n\
	phases ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n";
	if(Prg.GlobalParms.IniRed)
		out+="delay "+(Prg.GlobalParms.IniRed*1000)+"\n";
	else
		out+="delay 3000\n";
	out+="INICIO\n\
	mov 3 PLC[THIS].NexChg\n\
	agenda\n\
	phases ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n\
	delay 10000\n\
	ldeil\n\
	goto INICIO\n\
	end\n";
	UpFile="plan97.eil"
	UpData=compilador(out);
	seek=0;
	return out;
}
percent=25;

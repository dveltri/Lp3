
var MenuHtml=[
/*0*/"<td align=\"center\" valign=\"middle\"><a href=\"\" onclick=\"ReDraw(home_home);return false;\"><img border=\"0\" src=\"../../img/home.png\" width=\"128\" height=\"128\" title=\""+Str_Home+"\" /></a></td>\n",
/*1*/"<td align=\"center\" valign=\"middle\"><a href=\"\" onclick=\"ReDraw(home_moni);return false;\" ><img border=\"0\" src=\"../../img/info.png\" width=\"128\" height=\"128\" title=\""+Str_MN_Info+"\" /></a></td>\n",
/*2*/"<td align=\"center\" valign=\"middle\"><a href=\"\" onclick=\"ReDraw(home_conf);return false;\"><img border=\"0\" src=\"../../img/tools1.png\" width=\"128\" height=\"128\" title=\""+Str_MN_Config+"\" /></a></td>\n",
/*3*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_ip);return false;\"><img border=\"0\" src=\"../../img/ip2.png\" width=\"128\" height=\"128\" title=\""+Str_GP_ETH_Address+"\" /></a></td>\n",
/*4*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_hw_mods);return false;\"><img border=\"0\" src=\"../../img/plc0.png\" width=\"128\" height=\"128\" title=\""+Str_hardware+"\"/></a></td>\n",
/*5*/"5",
/*6*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_errors);return false;\"><img border=\"0\" src=\"../../img/errors1.png\" width=\"128\" height=\"128\" title=\""+Str_Ocorr+"\"/></a></td>\n",
/*7*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_otu);return false;\"><img border=\"0\" src=\"../../img/otu2.png\" width=\"128\" height=\"128\" title=\""+Str_OTU+"\"/></a></td>\n",
/*8*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_gps);return false;\"><img border=\"0\" src=\"../../img/clock1.png\" width=\"128\" height=\"128\" title=\""+Str_clock+"\"/></a></td>\n",
/*9*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_avanz);return false;\"><img border=\"0\" src=\"../../img/avanz2.png\" width=\"128\" height=\"128\" title=\""+Str_General+"\"/></a></td>\n",
/*10*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_phases);return false;\"><img border=\"0\" src=\"../../img/semaphore.png\" width=\"128\" height=\"128\" title=\""+Str_Config_Phases+"\"/></a></td>\n",

/*11*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_sec);return false;\"><img border=\"0\" src=\"../../img/sec3.png\" width=\"128\" height=\"128\" title=\""+Str_Conflict+"\"/></a></td>\n",
/*12*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"CEV=0;GetEv();ReDraw(conf_ev);return false;\"><img border=\"0\" src=\"../../img/ev0.png\" width=\"128\" height=\"128\" title=\""+Str_Stage_EV+"\"/></a></td>\n",
/*13*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_sts);return false;\"><img border=\"0\" src=\"../../img/sts0.png\" width=\"128\" height=\"128\" title=\""+Str_Status+"\"/></a></td>\n",
/*14*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"GoSch();return false;\"><img border=\"0\" src=\"../../img/agenda.png\" width=\"128\" height=\"128\" title=\""+Str_scheduler+"\"/></a></td>\n",
/*15*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_plan);return false;\"><img border=\"0\" src=\"../../img/plan2.png\" width=\"128\" height=\"128\" title=\""+Str_Plans+"\"/></a></td>\n",

/*16*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(moni_errors);return false;\"><img border=\"0\" src=\"../../img/errors.png\" width=\"128\" height=\"128\" title=\""+Str_Ocorr+"\"/></a></td>\n",
/*17*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(moni_general);return false;\"><img border=\"0\" src=\"../../img/mongen.png\" width=\"128\" height=\"128\" title=\""+Str_clock+"\"/></a></td>\n",
/*18*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(moni_plcs);return false;\"><img border=\"0\" src=\"../../img/monplc.png\" width=\"128\" height=\"128\" title=\""+Str_Controllers+"\" /></a></td>\n",
/*19*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(moni_phases);return false;\"><img border=\"0\" src=\"../../img/phases.png\" width=\"128\" height=\"128\" title=\""+Str_Config_Phases+"\"/></a></td>\n",
/*20*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(moni_io);return false;\"><img border=\"0\" src=\"../../img/io0.png\" width=\"128\" height=\"128\" title=\""+Str_Input_Output+"\"/></a></td>\n",
/*21*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(moni_task);return false;\"><img border=\"0\" src=\"../../img/taskmoni.png\" width=\"128\" height=\"128\" title=\"Task Monitor\"/></a></td>\n",
/*22*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(moni_plans);return false;\"><img border=\"0\" src=\"../../img/monplc3.png\" width=\"128\" height=\"128\" title=\"Debug\"/></a></td>\n",
/*23*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_io);return false;\"><img border=\"0\" src=\"../../img/io1.png\" width=\"128\" height=\"128\" title=\""+Str_Input_Output+"\"/></a></td>\n",
/*24*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_planMC);return false;\"><img border=\"0\" src=\"../../img/handCtrl.png\" width=\"128\" height=\"128\" title=\""+Str_Plan_Control_Manual+"\"/></a></td>\n",
/*25*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_planOTU);return false;\"><img border=\"0\" src=\"../../img/otu2.png\" width=\"128\" height=\"128\" title=\""+Str_Plan_Centralized+"\"/></a></td>\n",
/*26*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_plansLcl);return false;\"><img border=\"0\" src=\"../../img/plan1.png\" width=\"128\" height=\"128\" title=\""+Str_Plan_Local+"\"/></a></td>\n",
/*27*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(conf_FrcPln);return false;\"><img border=\"0\" src=\"../../img/frcpln.png\" width=\"128\" height=\"128\" title=\"Force Plan\"/></a></td>\n",
"28",
"29",
/*30*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"goPrevPlc();return false;\"><img border=\"0\" src=\"../../img/left.png\" width=\"128\" height=\"128\" title=\""+Str_prev+"\" /></a></td>\n",
/*31*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"goNextPlc();return false;\"><img border=\"0\" src=\"../../img/right.png\" width=\"128\" height=\"128\" title=\""+Str_next+"\"/></a></td>\n",
/*32*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"ReDraw(home_plcs2);return false;\"><img border=\"0\" src=\"../../img/plcn"+(PlcIdx+1)+".png\" width=\"128\" height=\"128\" title=\""+Str_Controllers+"\"/></a></td>\n",
"33",
"34",
"35",
"36",
"37",
"38",
/*39*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"SendConf();ReDraw(home_home);return false;\"><img border=\"0\" src=\"../../img/save.png\" width=\"64\" height=\"64\" title=\""+Str_Upload+"\" /></a></td>\n",
/*40*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"if(confirm(Str_sureQ)==true){GetUrlB(PrgEd[SrcIdx].host+'/web/rldall.dgv',fncnone);}return false;\"><img border=\"0\" src=\"../../img/reset1.png\" width=\"64\" height=\"64\" title=\""+Str_Reset+"\" /></a></td>\n",
/*41*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"if(confirm(Str_sureQ)==true){GetUrlB(PrgEd[SrcIdx].host+'/web/rldpln.dgv',fncnone);}return false;\"><img border=\"0\" src=\"../../img/rstpln0.png\" width=\"64\" height=\"64\" title=\""+Str_Reload_All_Plans+"\"/></a></td>\n",
/*42*/"<td align=\"center\" valign=\"middle\">\n<a href=\"\" onclick=\"if(confirm(Str_sureQ)==true){GetUrlB(PrgEd[SrcIdx].host+'/web/rldsch.dgv',fncnone);}return false;\"><img border=\"0\" src=\"../../img/scheduller0.png\" width=\"64\" height=\"64\" title=\""+Str_reload_scheduler+"\"/></a></td>\n",
];

function goNextPlc()
{
	PlcIdx++;
	if(PlcIdx>=GlobalParms.Controllers)
		PlcIdx=0;
	ReDraw(Refresh);
}

function goPrevPlc()
{
	PlcIdx--;
	if(PlcIdx<0)
		PlcIdx=(GlobalParms.Controllers-1);
	ReDraw(Refresh);
}

function GetMenu(Items)
{
	var out="";
	var i=0;
	out+="<table  border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  style=\"BORDER-TOP-WIDTH: 1px; BORDER-LEFT-WIDTH: 1px; BORDER-BOTTOM-WIDTH: 1px; WIDTH: 80%; HEIGHT: 80%; BORDER-RIGHT-WIDTH: 1px\" align=\"center\" background=\"\">\n<tr>\n";
	if(srvacc==1)
	{
		while(i<Items.length)
		{
			switch(Items[i])
			{
				//case home_home:
				//case home_moni:
				//case home_conf:
				case conf_ip:
				case conf_hw_mods:
				//case home_plcs:
				case conf_errors:
				case conf_otu:
				case conf_gps:
				case conf_avanz:
				case conf_phases:
				case conf_sec:
				case conf_ev:
				case conf_sts:
				//case conf_sch:
				//case conf_plan:
				case moni_errors:
				//case moni_general:
				//case moni_plcs:
				//case moni_phases:
				//case moni_io:
				case moni_task:
				case moni_plans:
				case conf_io:
				//case conf_planMC:
				//case conf_planOTU:
				//case conf_plansLcl:
				case conf_FrcPln:
				//case Prev_Plc:
				//case Next_Plc:
				//case Conf_save:
				//case Ctrl_Sch:
				//case Ctrl_Plns:
				//case Ctrl_Rst:
					Items.splice(i,1);
				break;
				default:
					i++;
				break;
			}
		}
	}
	for(i=0;i<Items.length;i++)
	{
		switch(Items[i])
		{
			//-----------------------------------------------------
			case home_conf:
				out+=MenuHtml[home_conf];
				if(PrgEd.length>0)
				{
					out+=MenuHtml[Conf_save];
					out+=MenuHtml[Ctrl_Sch];
					out+=MenuHtml[Ctrl_Plns];
					out+=MenuHtml[Ctrl_Rst];
				}
			break;
			//-----------------------------------------------------
			case home_plcs:
				out+="<td align=\"center\" valign=\"middle\">\n";
				out+="<a href=\"\" onclick=\"ReDraw(home_plcs);return false;\"><img border=\"0\" src=\"../../img/plcr0.png\" width=\"128\" height=\"128\" title=\""+Str_Controllers+"\" /><br /><font size=\"2\" face=\"arial\">"+Str_Controllers+"</font></a>\n";
				if(Refresh>=home_plcs)
					out+="<a href=\"\" onclick=\"ReDraw(home_plcs);return false;\"><img border=\"0\" src=\"../../img/plcn"+(PlcIdx+1)+".png\" width=\"64\" height=\"64\" title=\""+Str_MN_Config+"\" /><br /><font size=\"2\" face=\"arial\">"+Str_MN_Config+"</font></a>\n";
				out+="</td>\n";
			break;
			//-----------------------------------------------------
			default:
				if(MenuHtml.length>Items[i])
					out+=MenuHtml[Items[i]];
				else
					out+=Items[i];
			break;
		}
	}
	out+="</tr>\n</table>\n";
	return out;
}

function GoSch()
{
	HolyDays=owl.deepCopy(PLCs[PlcIdx].HolyDays);
	WeekDays=owl.deepCopy(PLCs[PlcIdx].WeekDays);
	TimeScheduler=owl.deepCopy(PLCs[PlcIdx].TimeScheduler);
	ReDraw(conf_sch);
}

function ReDraw(Fnc)
{
	if(Fnc>=0)
		Refresh=Fnc;
	ClearAllHome();
	LOG("Refresh:"+Refresh);
	switch(Refresh)
	{
		//-----------------------------------------------------
		case home_home:
			request=GetUrl('../AddCtrl.jsp',RcvSvrSrc);
			ShwAddSrcCtl();
			document.getElementById("HOME0").innerHTML=GetMenu([home_home]);
			if(PrgEd.length>0)
			{
				if(PrgEd[SrcIdx].Typ)
					document.getElementById("HOME1").innerHTML=GetMenu([home_moni,home_conf]);
				else
					if(Errors.length>0)
						document.getElementById("HOME1").innerHTML=GetMenu([moni_errors,home_conf]);
					else
						document.getElementById("HOME1").innerHTML=GetMenu([home_conf]);
			}
			//document.getElementById("HOME2").innerHTML=GetMenu([Ctrl_Sch,Ctrl_Plns,Ctrl_Rst]);
		break;
		//-----------------------------------------------------
		case home_moni:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_moni]);
			if(Errors.length>0)
				document.getElementById("HOME1").innerHTML=GetMenu([moni_errors,moni_general,moni_plcs,moni_phases,moni_io]); //moni_task,moni_plans
			else
				document.getElementById("HOME1").innerHTML=GetMenu([moni_general,moni_plcs,moni_phases,moni_io]);
		break;
		//-----------------------------------------------------
		case home_conf:
			{
				document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf]);
				if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1 || GlobalParms.MODEL.indexOf("SAD-V3M4")!=-1)
				{
					if(GlobalParms.MODEL.indexOf("RT")!=-1)
						document.getElementById("HOME1").innerHTML=GetMenu([conf_ip,conf_hw_mods,home_plcs,conf_io,conf_errors,conf_otu,conf_gps,conf_avanz]);
					else
						document.getElementById("HOME1").innerHTML=GetMenu([conf_ip,conf_hw_mods,home_plcs,conf_io,conf_errors,conf_gps,conf_avanz]);
				}
				else
				{
					if(GlobalParms.MODEL.indexOf("RT")!=-1)
						document.getElementById("HOME1").innerHTML=GetMenu([conf_ip,conf_hw_mods,home_plcs,conf_io,conf_otu,conf_gps]);
					else
						document.getElementById("HOME1").innerHTML=GetMenu([conf_ip,conf_hw_mods,home_plcs,conf_io,conf_gps]);
				}
			}
		break;
		//-----------------------------------------------------
		case conf_ip:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,conf_ip]);
			document.getElementById('HOME1').innerHTML=ShwEthernet();
			document.getElementById('HOME2').innerHTML="<font size=\"2\" face=\"arial\">"+Str_Conf_Links+"</font><br />\n";
			if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1)
			{
				document.getElementById('HOME2').innerHTML+=ShwGenComa(Links,"Links",10);
			}
			else
			{
				if(GlobalParms.MODEL.indexOf("M3")!=-1)
					document.getElementById('HOME2').innerHTML+=ShwGenComa(Links,"Links",1);
				if(GlobalParms.MODEL.indexOf("M4")!=-1)
					document.getElementById('HOME2').innerHTML+=ShwGenComa(Links,"Links",9);
			}
			document.getElementById('HOME2').innerHTML+="<font size=\"2\" face=\"arial\">"+Str_Dgvp_Titel+"</font><br />\n";
			document.getElementById('HOME2').innerHTML+=ShwGen(DgvP,"DgvP")
			//-----------------------------
			document.getElementById('HOME3').innerHTML="<font size=\"2\" face=\"arial\">"+Str_Conf_OPCT+"</font><br />\n";
			document.getElementById('HOME3').innerHTML+=ShwGenComa(OPCT,"OPCT",null);
			//-----------------------------
			ShowDgvpConf("HOME4");
		break;
		//-----------------------------------------------------
		case conf_hw_mods:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,conf_hw_mods]);
			document.getElementById('HOME1').innerHTML=ShwTCHW();
		break;
		//-----------------------------------------------------
		case home_plcs:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,home_plcs]);
			var icons=[conf_phases,conf_sec,conf_ev,conf_sts,conf_plan,conf_sch];
			if (PLCs.length>1)
			{
			//if (PlcIdx>0)
				icons.unshift(Prev_Plc);
			//if (PlcIdx<(GlobalParms.Controllers-1))
				icons.push(Next_Plc);
			}
			document.getElementById("HOME1").innerHTML=GetMenu(icons);
			document.getElementById("HOME2").innerHTML=HomePlcrConf();
		break;
		//-----------------------------------------------------
		case conf_io:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,conf_io]);
			document.getElementById('HOME1').innerHTML=ShwIos();
		break;
		//-----------------------------------------------------
		case conf_errors:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,conf_errors]);
			document.getElementById('HOME1').innerHTML=ShwFBNO0();
		break;
		//-----------------------------------------------------
		case conf_otu:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,conf_otu]);
			ShwArne0();
		break;
		//-----------------------------------------------------
		case conf_gps:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,conf_gps]);
			document.getElementById('HOME1').innerHTML=ShwClock();
			document.getElementById('HOME2').innerHTML=ShwGen(GPS,"GPS");
			if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1)
				document.getElementById('HOME3').innerHTML=ShwGen(NTP,"NTP");
			LOG(SendStartup(PrgEd[SrcIdx]));
			UpMode=0;
		break;
		//-----------------------------------------------------
		case conf_avanz:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,conf_avanz]);
			document.getElementById('HOME1').innerHTML=ShwAdvance();
		break;
		//-----------------------------------------------------
		case conf_phases:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,home_plcs,conf_phases]);
			document.getElementById('HOME1').innerHTML=ShwPHHW();
		break;
		//-----------------------------------------------------
		case conf_sec:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,home_plcs,conf_sec]);
			document.getElementById("HOME1").innerHTML=ShwSec();
		break;
		//-----------------------------------------------------
		case conf_ev:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,home_plcs,conf_ev]);
			document.getElementById("HOME1").innerHTML=EntreVerdes();
		break;
		//-----------------------------------------------------
		case conf_sts:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,home_plcs,conf_sts]);
			document.getElementById("HOME1").innerHTML=ShowStss();
			if(GlobalParms.MODEL.indexOf("RT")!=-1)
				ShwArne2();
		break;
		//-----------------------------------------------------
		case conf_sch:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,home_plcs,conf_sch]);
			document.getElementById("HOME1").innerHTML=ShowAgenda();
			MkSelDay("newHd",1);
			MkSelDay("newWd",1);
		break;
		//-----------------------------------------------------
		case conf_plan:
			if(PLCs[PlcIdx].Sts.length==0)
				ReDraw(conf_sts);
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,home_plcs,conf_plan]);
			if(GlobalParms.MODEL.indexOf("RT")!=-1)
				document.getElementById("HOME1").innerHTML=GetMenu([conf_planMC,conf_planOTU,conf_plansLcl]);
			else
				document.getElementById("HOME1").innerHTML=GetMenu([conf_planMC,conf_plansLcl]);
		break;
		//-----------------------------------------------------
		case conf_planMC:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,home_plcs,conf_plan,conf_planMC]);
			PlanGen=PLCs[PlcIdx].McPlan;
			ShowPlanWizard(1);
		break;
		//-----------------------------------------------------
		case conf_planOTU:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,home_plcs,conf_plan,conf_planOTU]);
			PlanGen=PLCs[PlcIdx].OTUPlan;
			ShowPlanWizard(2);
		break;
		//-----------------------------------------------------
		case conf_plansLcl:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,home_plcs,conf_plan,conf_plansLcl]);
			PlnIdx=0;
			if(PLCs[PlcIdx].Plans.length)
				PlanGen=PLCs[PlcIdx].Plans[PlnIdx];
			else
				PlanGen=0;
			ShowPlanWizard(3);
		break;
		//-----------------------------------------------------
		case conf_FrcPln:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_conf,conf_FrcPln]);
			document.getElementById("HOME1").innerHTML=ShwArne1();
		break;
		//-----------------------------------------------------
		case moni_errors:
			if(PrgEd[SrcIdx].Typ)
				document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_moni,moni_errors]);
			else
				document.getElementById("HOME0").innerHTML=GetMenu([home_home,moni_errors]);
			document.getElementById("HOME1").innerHTML=ShowErrorFileList();
		break;
		//-----------------------------------------------------
		case moni_general:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_moni,moni_general]);
			Resource.MoniBit=1;
			PoolData=1;
			Resource.Element=document.getElementById("HOME1");
			document.getElementById("HOME2").innerHTML="<br/><select id=\"ClockOffSet\" class=\"INTEXT\">\n"+GenOptions(OptSyncClock,0)+"</select><input type=\"button\" class=\"INTEXT2\" value=\""+Str_Sync+"\" onclick=\"UpDateRtc();return false\" />\n";
		break;
		//-----------------------------------------------------
		case moni_plcs:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_moni,moni_plcs]);
			Resource.MoniBit=2;
			PoolData=1;
			Resource.Element=document.getElementById("HOME1");
			if(PLCs.length)
				document.getElementById("HOME2").innerHTML=ShwArne1();
		break;
		//-----------------------------------------------------
		case moni_phases:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_moni,moni_phases]);
			Resource.MoniBit=4;
			PoolData=1;
			Resource.Element=document.getElementById("HOME1");
		break;
		//-----------------------------------------------------
		case moni_io:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_moni,moni_io]);
			Resource.MoniBit=8;
			PoolData=1;
			Resource.Element=document.getElementById("HOME1");
		break;
		//-----------------------------------------------------
		case moni_task:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_moni,moni_task]);
			Resource.MoniBit=16;
			PoolData=1;
			Resource.Element=document.getElementById("HOME1");
		break;
		//-----------------------------------------------------
		case moni_plans:
			document.getElementById("HOME0").innerHTML=GetMenu([home_home,home_moni,moni_plans]);
			Resource.MoniBit=32;
			PoolData=1;
			var icons=[];
			if (PLCs.length>1)
			{
				if (PlcIdx>0)
					icons.unshift(Prev_Plc);
				if (PlcIdx<(GlobalParms.Controllers-1))
					icons.push(Next_Plc);
			}
			document.getElementById("HOME1").innerHTML=GetMenu(icons);
			Resource.Element=document.getElementById("HOME2");
		break;
		//-----------------------------------------------------
	}
}
//--------------------------------------------------
function HomePlcrConf()
{
	var out="";
	out+="<table  border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  style=\"BORDER-TOP-WIDTH: 1px; BORDER-LEFT-WIDTH: 1px; BORDER-BOTTOM-WIDTH: 1px; WIDTH: 80%; HEIGHT: 80%; BORDER-RIGHT-WIDTH: 1px\" align=\"center\" >\n";
	//--------------------------
	out+="<tr>\n";
	out+="<td align=\"center\" valign=\"middle\" colspan=\"2\">\n";
	out+="[";
	for(var x=0;x<PLCs[PlcIdx].Phases.length;x++)
		out+=" G"+(PLCs[PlcIdx].Phases[x]+1);
	out+=" ]\n";
	out+="</td>\n";
	out+="</tr>\n"
	//--------------------------
	out+="<tr>\n";
	out+="<td align=\"center\" valign=\"top\">\n";
	out+=" [ Plan List ]<br />\n";
	for(var i=0;i<PLCs[PlcIdx].PlanList.length;i++)
		out+=" [ "+PLCs[PlcIdx].PlanList[i].Name+" ]<br />\n";
	out+="</td>\n";
	out+="<td align=\"center\" valign=\"top\">\n";
	out+=" [ Entre verde List ]<br />\n";
	for(var i=0;i<PLCs[PlcIdx].PhcList.length;i++)
		out+=" [ "+PLCs[PlcIdx].PhcList[i].Name+" ]<br />\n";
	out+="</td>\n";
	out+="</tr>\n";
	//--------------------------
	out+="</table>\n";
	return out;
}
//--------------------------------------------------
var DelErr=0;
var DelIdxAll=1;
function DelAllErrors()
{
	if(DelIdxAll<Errors.length)
	{
		if(PrgEd[SrcIdx].Typ)
		{
			GetUrlB(PrgEd[SrcIdx].host+"/"+PrgEd[SrcIdx].DGVFTP+"?mode=256&path="+Errors[DelIdxAll].Path+"&file="+Errors[DelIdxAll].Name,NextDelError);
		}
	}
}

function NextDelError(Datos)
{
	if(Datos.status==200)
	{
		DelIdxAll++;
		if(DelIdxAll<Errors.length)
		{
			DelAllErrors();
		}
		else
		{
			DelIdxAll=1;
			Errors.length=1;
			ReDraw(moni_errors);
			percent=0;
			LoadConfSrc();
		}
	}
}

function ShowErrorFileList()
{
	var temp=""
	var out="";
	var pidx=0;
	if(PrgEd[SrcIdx].Typ!=0)
	{
		out+="<a href=\"\" onclick=\"if(confirm('"+Str_Delet+"?')){DelAllErrors();}return false;\">\n";
		out+="<img src=\"../../img/remove.png\" width=\"20\" height=\"20\" alt=\"Delete All\" border=\"0\"   />";
		out+="</a>";
	}
	out+="<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  align=\"center\" >\n";
	//--------------------------
	out+="<tr>\n";
	out+="<td align=\"left\" valign=\"top\">\n";
	out+="<font size=\"1\" face=\"arial\">\n";
	for(var x=0;x<Errors.length;x++)
	{
		temp=Errors[x].Name.substr(2);
		out+="<a href=\""+PrgEd[SrcIdx].host+(Errors[x].Path+"/").replace("//","/")+HTMLEncode(Errors[x].Name)+"?WAC="+WAC+"\" target=\"_blank\">\n";
		out+="<img src=\"../../img/save1.png\" width=\"20\" height=\"20\" border=\"0\" />";
		out+="</a>";
		out+="<a href=\"\" onclick=\"UpFile='"+HTMLEncode(Errors[x].Name)+"';UpPath='"+Errors[x].Path+"';UpType='txt';rcvERR(Errors["+x+"].Datos);return false\">\n";
		out+="[";
		if(Errors[x].Path=="/err" || Errors[x].Path=="/err/")
			out+=Str_General;
		else
		{
			pidx=parseInt(Errors[x].Path.substr(1));
			if(pidx<PLCs.length)
				out+=PLCs[pidx].Name;
			else
				out+="No Name";
		}
		out+=":"+temp.substring(4,6)+"/"+temp.substring(2,4)+"/"+temp.substring(0,2)+"]\n";
		out+="</a>\n";
		if(x>0)
		{
			out+="<a href=\"\" onclick=\"if(confirm('"+Str_Delet+" ["+HTMLEncode(Errors[x].Name)+"]?')){DelErr="+x+";"
			out+="GetUrlB('"+PrgEd[SrcIdx].host+"/"+PrgEd[SrcIdx].DGVFTP+"?mode=256&#38;path="+HTMLEncode(Errors[x].Path)+"&#38;file="+HTMLEncode(Errors[x].Name)+"',UpdateErrorList);"
			out+="}return false;\">\n";
			out+="<img src=\"../../img/defile.png\" width=\"16\" height=\"16\" border=\"0\" />";
			out+="</a>";
		}
		out+="<br/>";
	}
	out+="</font>\n";
	out+="</td>\n";
	out+="<td align=\"left\" valign=\"top\" width=\"80%\" >\n";
	out+="<div id=\"ErrorFile\">\n";
	out+="<table width=\"100%\" border=\"0\" id=\"tabelaError\" align=\"center\">\n";
	out+="<tr>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#D3D3D3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_Cod_Ocorr+"</font>";
	out+="</td>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#D3D3D3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_Descr_Ocorr+"</font>";
	out+="</td>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#D3D3D3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_DtHr_Ocorr+"</font>";
	out+="</td>\n";
	out+="</tr>\n";
	out+="</table>\n";
	out+="</div>\n";
	out+="</td>\n";
	out+="</tr>\n";
	//--------------------------
	out+="</table>\n";
	return out;
}

function UpdateErrorList(Datos)
{
	if(Datos.status==200)
	{
		Errors.splice(DelErr,1);
	}
	ReDraw(moni_errors);
}

function rcvERR(Dados)
{
	var out = "";
	var idx = 0;
	var ErrorFile = new Array();
	var ErrorList = new Array();
	var aux = new Array();
	ErrorFile.length = 0;
	ErrorList.length = 0;
	aux.length = 0;
	//Dados=Remplace(Dados,"<","&#60;");
	//Dados=Remplace(Dados,">","&#62;");
	ErrorFile = Dados.split("\n");
	var i=0;
	while(i<ErrorFile.length)
	{
		ErrorFile[i]=RemoveUnuseChar(ErrorFile[i]);
		ErrorFile[i]=ErrorFile[i].trim();
		if(ErrorFile[i]=="")
		{
			ErrorFile.splice(i,1);
		}
		else
		{
			ErrorList[idx] = new Object();
			ErrorList[idx].CodErr=0;
			ErrorList[idx].DescrErr="";
			ErrorList[idx].DtHrErr="";
			aux = ErrorFile[i].split(",");
			if(aux[0])ErrorList[idx].CodErr = aux[0];
			if(aux[1])ErrorList[idx].DescrErr = aux[1];
			if (aux.length > 3)
				ErrorList[idx].DtHrErr = aux[aux.length-1];
			else
				if(aux[2])
					ErrorList[idx].DtHrErr = aux[2];
			idx++;
			i++;
		}
	}
	out+="<table width=\"98%\" border=\"0\" id=\"tabelaError\" align=\"left\">\n";
	out+="<tr>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#A3A3A3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_Cod_Ocorr+"</font>";
	out+="</td>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#A3A3A3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_Descr_Ocorr+"</font>";
	out+="</td>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#A3A3A3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_DtHr_Ocorr+"</font>";
	out+="</td>\n";
	out+="</tr>\n";
	for(var i=0;i<ErrorList.length;i++)
	{
		out+="<tr ";
		if(i%2)out+="bgcolor=\"#40FF40\""
		out+=">\n";
		out+="<td align=\"center\" valign=\"middle\">\n";
		out+="<font size=\"1\" face=\"arial\">\n"+ErrorList[i].CodErr+"</font>";
		out+="</td>\n";
		out+="<td align=\"center\" valign=\"middle\">\n";
		out+="<font size=\"1\" face=\"arial\">\n"+HTMLEncode(ErrorList[i].DescrErr)+"</font>";
		out+="</td>\n";
		out+="<td align=\"center\" valign=\"middle\">\n";
		out+="<font size=\"1\" face=\"arial\">\n"+ErrorList[i].DtHrErr+"</font>";
		out+="</td>\n";
		out+="</tr>";
	}
	out+="</table>\n";
	document.getElementById("ErrorFile").innerHTML=out;
}

function ShwEthernet()
{
	var out="\
	<font size=\"2\" face=\"arial\">"+Str_Conf_ETH+"</font><br />\n\
	<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_Name+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input name=\"GlobalParms.ID\" id=\"GlobalParms.ID\" class=\"INTEXT\" size=\"25\" value=\""+GlobalParms.ID+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+"</font>\n\
	</td>\n\
	</tr>\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_ETH_Address+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">\n\
	<input id=\"GlobalParms.ETH0\" class=\"INTEXT\" size=\"1\" maxlength=\"3\"  value=\""+GlobalParms.ETH0[0]+"\" />\n\
	<input id=\"GlobalParms.ETH1\" class=\"INTEXT\" size=\"1\" maxlength=\"3\"  value=\""+GlobalParms.ETH0[1]+"\" />\n\
	<input id=\"GlobalParms.ETH2\" class=\"INTEXT\" size=\"1\" maxlength=\"3\"  value=\""+GlobalParms.ETH0[2]+"\" />\n\
	<input id=\"GlobalParms.ETH3\" class=\"INTEXT\" size=\"1\" maxlength=\"3\"  value=\""+GlobalParms.ETH0[3]+"\" />\n\
	</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_IP+"</font>\n\
	</td>\n\
	</tr>\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_Sub_Net_Mask_Address+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">\n\
	<input id=\"GlobalParms.NETMASK0\" class=\"INTEXT\" size=\"1\" maxlength=\"3\"  value=\""+GlobalParms.NETMASK0[0]+"\" />\n\
	<input id=\"GlobalParms.NETMASK1\" class=\"INTEXT\" size=\"1\" maxlength=\"3\"  value=\""+GlobalParms.NETMASK0[1]+"\" />\n\
	<input id=\"GlobalParms.NETMASK2\" class=\"INTEXT\" size=\"1\" maxlength=\"3\"  value=\""+GlobalParms.NETMASK0[2]+"\" />\n\
	<input id=\"GlobalParms.NETMASK3\" class=\"INTEXT\" size=\"1\" maxlength=\"3\"  value=\""+GlobalParms.NETMASK0[3]+"\" />\n\
	</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_NMSK+"</font>\n\
	</td>\n\
	</tr>\n\
	<tr align=\"left\">\n";
	if(GlobalParms.MODEL.indexOf("M3")!=-1)
	{
		out+="<td border=\"0\">\n\
		<font size=\"1\" face=\"arial\">"+Str_GP_DGWMAC_Address+"</font>\n\
		</td>\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">\n\
		<input id=\"GlobalParms.DGWMAC0\" class=\"INTEXT\" size=\"1\" maxlength=\"2\" value=\""+GlobalParms.MACDGW[0]+"\" />\n\
		<input id=\"GlobalParms.DGWMAC1\" class=\"INTEXT\" size=\"1\" maxlength=\"2\" value=\""+GlobalParms.MACDGW[1]+"\" />\n\
		<input id=\"GlobalParms.DGWMAC2\" class=\"INTEXT\" size=\"1\" maxlength=\"2\" value=\""+GlobalParms.MACDGW[2]+"\" />\n\
		<input id=\"GlobalParms.DGWMAC3\" class=\"INTEXT\" size=\"1\" maxlength=\"2\" value=\""+GlobalParms.MACDGW[3]+"\" />\n\
		<input id=\"GlobalParms.DGWMAC4\" class=\"INTEXT\" size=\"1\" maxlength=\"2\" value=\""+GlobalParms.MACDGW[4]+"\" />\n\
		<input id=\"GlobalParms.DGWMAC5\" class=\"INTEXT\" size=\"1\" maxlength=\"2\" value=\""+GlobalParms.MACDGW[5]+"\" />\n\
		</font>\n\
		</td>\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">"+Str_GP_DGWMAC+"</font>\n\
		</td>\n";
	}
	else
	{
		out+="<td border=\"0\">\n\
		<font size=\"1\" face=\"arial\">"+Str_GP_DGW_Address+"</font>\n\
		</td>\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">\n\
		<input id=\"GlobalParms.DGW0\" class=\"INTEXT\" size=\"1\" maxlength=\"3\" value=\""+GlobalParms.DGW[0]+"\" />\n\
		<input id=\"GlobalParms.DGW1\" class=\"INTEXT\" size=\"1\" maxlength=\"3\" value=\""+GlobalParms.DGW[1]+"\" />\n\
		<input id=\"GlobalParms.DGW2\" class=\"INTEXT\" size=\"1\" maxlength=\"3\" value=\""+GlobalParms.DGW[2]+"\" />\n\
		<input id=\"GlobalParms.DGW3\" class=\"INTEXT\" size=\"1\" maxlength=\"3\" value=\""+GlobalParms.DGW[3]+"\" />\n\
		</font>\n\
		</td>\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">"+Str_GP_DGW+"</font>\n\
		</td>\n";
	}
	out+="</tr>\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_WACTrw+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input name=\"GlobalParms.WACVrw\" id=\"GlobalParms.WACVrw\" class=\"INTEXT\" size=\"5\" value=\""+GlobalParms.Web_Access_Code_RW+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_WACC+"</font>\n\
	</td>\n\
	</tr>\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_WACTro+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input name=\"GlobalParms.WACVro\" id=\"GlobalParms.WACVro\" class=\"INTEXT\" size=\"5\" value=\""+GlobalParms.Web_Access_Code_RO+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_WACC+"</font>\n\
	</td>\n\
	</tr>\n\
	<tr bordercolor=\"Silver\">\n\
	<td align=\"middle\" colspan=\"3\">\n\
	<input type=\"button\" class=\"INTEXT2\" id=\"GPbS\" value=\""+Str_check_Conf+"\" onclick=\"CheckEthernet();\" />\n\
	</td>\n\
	</tr>\n\
	</table>\n";
	return out;
}

/*
	<font size=\"1\" face=\"arial\">"+Str_GP_Controllers+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" >\n\
	"+Str_Group+"<input type=\"text\" name=\"IDgrp\"  onkeypress=\"return blockSpecialChar(event)\" value=\"";
	if(GlobalParms.ID[0])
		out+=GlobalParms.ID[0];
	out+="\"/>\
	"+Str_Name+"<input type=\"text\" name=\"IDuid\"  onkeypress=\"return blockSpecialChar(event)\" value=\"";
	if(GlobalParms.ID[1])
		out+=GlobalParms.ID[1];
	out+="\"/>\
	</font>\n\
	</td>\n\
	<td>\n\
*/

function ShwTCHW()
{
	UpdateSizeOfStruct();
	var out="\
	<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_Controllers+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" >\n\
	<select class=\"INTEXT\" onchange=\"if(ChkParm('GlobalParms.Controllers',parseInt(this.value))==true){GlobalParms.Controllers=parseInt(this.value);UpdateSizeOfStruct();ModParm('GlobalParms.Controllers');}\">\n";
	out+=GenOptions(OptControllers,GlobalParms.Controllers);
	out+="</select>\n\
	</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_NC+"</font>\n\
	</td>\n\
	</tr>\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_Phases+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" >\n\
	<select class=\"INTEXT\" onchange=\"if(ChkParm('GlobalParms.Phases',parseInt(this.value))==true){GlobalParms.Phases=parseInt(this.value);UpdateSizeOfStruct();ModParm('GlobalParms.Phases');}\">\n";
	if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1)
		out+=GenOptions(OptOPB2,GlobalParms.Phases);
	if(GlobalParms.MODEL.indexOf("MAC-TC1")!=-1)
		out+=GenOptions(OptMpt5,GlobalParms.Phases);
	if(GlobalParms.MODEL.indexOf("GW1")!=-1)
		out+=GenOptions(OptMpt3,GlobalParms.Phases);
	if(GlobalParms.MODEL.indexOf("GW2")!=-1 || GlobalParms.MODEL.indexOf("GW3")!=-1)
		out+=GenOptions(OptMpt4,GlobalParms.Phases);
	if(GlobalParms.MODEL.indexOf("GW4")!=-1)
		out+=GenOptions(OptMpt5,GlobalParms.Phases);
	if(GlobalParms.MODEL.indexOf("MSTC-V1M3")!=-1)
		out+=GenOptions(OptMpt5,GlobalParms.Phases);
	if(GlobalParms.MODEL.indexOf("SAD-V1")!=-1)
		out+=GenOptions(OptMpt5,GlobalParms.Phases);
	if(GlobalParms.MODEL.indexOf("SAD-V2")!=-1)
		out+=GenOptions(OptMpt4,GlobalParms.Phases);
	if(GlobalParms.MODEL.indexOf("SAD-V3")!=-1)
		out+=GenOptions(OptMpt5,GlobalParms.Phases);
	out+="</select>\n\
	</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_Phases_1+"</font>\n\
	</td>\n\
	</tr>\n";
	if(GlobalParms.MODEL.indexOf("Flex4")!=-1) //solo para Flx4
	{
		out+="<tr align=\"left\">\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">"+Str_GP_Loops+"</font>\n\
		</td>\n\
		<td>\n\
		<font size=\"1\" face=\"arial\" >\n\
		<select class=\"INTEXT\" onchange=\"if(ChkParm('GlobalParms.Loops',parseInt(this.value))==true){GlobalParms.Loops=parseInt(this.value);UpdateSizeOfStruct();ModParm('GlobalParms.Loops');}\">\n";
			out+=GenOptions(OptMDV,GlobalParms.Loops);
		out+="</select>\n\
		</font>\n\
		</td>\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">"+Str_GP_Loops_1+"</font>\n\
		</td>\n\
		</tr>\n";
	}
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_Time_flashing+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input id=\"GlobalParms.IniFsh\" onchange=\"GlobalParms.IniFsh=parseInt(this.value);\" class=\"INTEXT\" size=\"5\" value=\""+GlobalParms.IniFsh+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_Time_Red+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input id=\"GlobalParms.IniRed\" onchange=\"GlobalParms.IniRed=parseInt(this.value);\" class=\"INTEXT\" size=\"5\" value=\""+GlobalParms.IniRed+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_Sync_Ref+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input id=\"PLCs.SyncRef\" onchange=\"PLCs[PlcIdx].SyncRef=this.value;\" class=\"INTEXT\" size=\"15\" value=\""+PLCs[PlcIdx].SyncRef+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="</table>\n";
	return out;
}

function ShwClock()
{
	var out="";
	if(GlobalParms.MODEL.indexOf("GW4")==-1)
	{
		out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n";
		if(GlobalParms.MODEL.indexOf("M3")!=-1)
		{
			out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_GP_GPS_Port+"</font>\n\
			</td>\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">\n\
			<select class=\"INTEXT\" onchange=\"if(ChkParm('GlobalParms.Enable_GPS',parseInt(this.value))==true){GlobalParms.Enable_GPS=parseInt(this.value);ModParm('GlobalParms.Enable_GPS');}\">\n";
			out+=GenOptions(OptGpsLinks,GlobalParms.Enable_GPS);
			out+="</select>\n\
			</font>\n\
			</td>\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_GP_GPS_Port_1+"</font>\n\
			</td>\n\
			</tr>\n";
		}
		out+="<tr align=\"left\">\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">"+Str_GP_Time_Zone+"</font>\n\
		</td>\n\
		<td colspan=\"2\">\n\
		<select class=\"INTEXT\" onchange=\"if(ChkParm('GlobalParms.Time_Zone_GMT',parseInt(this.value))==true){GlobalParms.Time_Zone_GMT=parseInt(this.value);ModParm('GlobalParms.Time_Zone_GMT');}\">\n";
		out+=GenOptions(OptTimeZone,GlobalParms.Time_Zone_GMT);
		out+="</select>\n\
		</td>\n\
		</tr>\n\
		</table>\n";
	}
	if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1)
	{
		if(GlobalParms.ATZ)
		{
		}
		else
		{
			GlobalParms.ATZ=new Array(40);
		}
		out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n";
		for(var i=0;i<40;i+=2)
		{
			if(!GlobalParms.ATZ[i])
				GlobalParms.ATZ[i]="2017/01/01";
			if(!GlobalParms.ATZ[i+1])
				GlobalParms.ATZ[i+1]=-180;
			out+="<tr align=\"left\">\n\
			<td>\n\
			<input onchange=\"GlobalParms.ATZ["+i+"]=this.value;ModParm('GlobalParms.ETH');\" class=\"INTEXT\" size=\"10\" maxlength=\"10\"  value=\""+GlobalParms.ATZ[i]+"\" />\n\
			</td>\n\
			<td colspan=\"2\">\n\
			<select class=\"INTEXT\" onchange=\"GlobalParms.ATZ["+(i+1)+"]=this.value;ModParm('GlobalParms.ETH');\" >\n";
			out+=GenOptions(OptTimeZone,GlobalParms.ATZ[i+1]);
			out+="</select>\n\
			</td>\n\
			</tr>\n";
		}
		out+="</table>\n";
	}
	return out;
}

function ShwAdvance()
{
	var out="\
	<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_Log_Out+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">\n\
	<select id=\"GlobalParms.LOG\" class=\"INTEXT\" onchange=\"\">\n";
	out+=GenOptions(OptLogLinks,GlobalParms.LOG);
	out+="</select>\n\
	</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_LOG+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	 <td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_FUT+"</font>\n\
	</td>\n\
	<td>\n\
	<select id=\"GlobalParms.Flashing\" class=\"INTEXT\" onchange=\"\">\n";
	out+=GenOptions(OptFlashingHz,GlobalParms.Flashing);
	out+="</select>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_FUC+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_FDT+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" >\n\
	<input id=\"GlobalParms.FlasCA\" class=\"INTEXT\" size=\"3\" value=\""+GlobalParms.FlasCA+"\" />\n\
	</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_FDC+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_Time_Capture_Inputs+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input id=\"GlobalParms.Time_Cap\" class=\"INTEXT\" size=\"3\" value=\""+GlobalParms.Time_Cap_In+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_TCIT+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_AOVT+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input id=\"GlobalParms.Alert_Over_Voltage\" class=\"INTEXT\" size=\"3\" value=\""+(GlobalParms.Alert_Over_Voltage/100)+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_AOVC+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_NVT+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input id=\"GlobalParms.Normal_Voltage\" class=\"INTEXT\" size=\"3\" value=\""+(GlobalParms.Normal_Voltage/100)+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_NVTC+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_EMVT+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input id=\"GlobalParms.Error_Minimal_Voltage\" class=\"INTEXT\" size=\"3\" value=\""+(GlobalParms.Error_Minimal_Voltage/100)+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_EMVC+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_ECVT+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input id=\"GlobalParms.Error_Critical_Voltage\" class=\"INTEXT\" size=\"3\" value=\""+(GlobalParms.Error_Critical_Voltage/100)+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_ECVC+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="<tr bordercolor=\"Silver\">\n\
	<td align=\"middle\" colspan=\"3\">\n\
	<input type=\"button\" class=\"INTEXT2\" id=\"GPbS\" value=\""+Str_check_Conf+"\" onclick=\"chkAdvance();\" />\n\
	</td>\n\
	</tr>\n\
	</table>\n";
	return out;
}
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

function sortI(seg1,seg2)
{
	return (seg1>seg2);
}

//--------------------------------------------------
function DelPhPlc(j)
{
	var i=PLCs[PlcIdx].Phases[j];
	PHASEs[i].PLC=0;
	PLCs[PlcIdx].Phases.splice(j,1);
	PLCs[PlcIdx].Phases=PLCs[PlcIdx].Phases.sort(sortI);
	RstEvs();
	RstCfts();
	ModParm('pPLCs.Phases');
	ReDraw(conf_phases);
}
function AddPhToPlc(Obj)
{
	if(parseInt(Obj.value)>0 && parseInt(Obj.value)<=(GlobalParms.Phases+GlobalParms.Virtual_Phases+GlobalParms.Groups_Phases))
	{
		PLCs[PlcIdx].Phases.push(parseInt(Obj.value)-1);
		PHASEs[parseInt(Obj.value)-1].PLC=(PlcIdx+1);
		PLCs[PlcIdx].Phases=PLCs[PlcIdx].Phases.sort(sortI);
		RstEvs();
		RstCfts();
		ModParm('pPLCs.Phases');
		ReDraw(Refresh);
	}
}
//--------------------------------------------------
function ShwPHHW()
{
	var j=0;	
	for(j=0;j<PLCs[PlcIdx].Phases.length;j++)
		PLCs[PlcIdx].Phases[j]=parseInt(PLCs[PlcIdx].Phases[j]);
	PLCs[PlcIdx].Phases=PLCs[PlcIdx].Phases.sort(sortI);
	//------------------------------------------------------------------------------------
	var out="<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"FFFFFF\" width=\"100%\">\n";
	out+="<tr bgcolor=\"#E0E0E0\">\n";
	out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">";
	out+="<select name=\"PLCofPHASE\" id=\"PLCofPHASE\" class=\"INTEXT\" onchange=\"AddPhToPlc(this);\">\n\
	<option value=\"0\">"+Str_Add+"</option>\n";
	for(var i=0;i<(GlobalParms.Phases+GlobalParms.Virtual_Phases+GlobalParms.Groups_Phases);i++)
	{
		if(!PHASEs[i].PLC)
		{
			out+="<option value=\""+(i+1)+"\">"+Str_Phase+(i+1)+"</option>\n";
		}
	}
	out+="</select>\n";// */
	out+="</font></td>\n";
	out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">"+Str_Flashing+"</font></td>\n";
	out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">"+Str_Phase_Errors_Disable+"</font></td>\n";
	out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">"+Str_Time_minimum_Green+"</font></td>\n";
	if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1)
		out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">"+Str_Time_minimum_Yellow+"</font></td>\n";
	out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">"+Str_Time_minimum_Red+"</font></td>\n";
	if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1)
	{
		out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">"+Str_Time_maximum_Green+"</font></td>\n";
		out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">"+Str_Time_maximum_Yellow+"</font></td>\n";
		out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">"+Str_Time_maximum_Red+"</font></td>\n";
	}
	out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">"+Str_GP_TOET+"</font></td>\n";
	out+="\t<td align=\"center\"><font size=\"2\" face=\"arial\">"+Str_GP_TOCT+"</font></td>\n";
	out+="</tr>\n";
	for(var j=0;j<PLCs[PlcIdx].Phases.length;j++)
	{
		var i=PLCs[PlcIdx].Phases[j];
		if(i<PHASEs.length)
		{
			out+="<tr ";
			if ((j%2)==1)
				out+="bgcolor=\"#E0E0E0\"";
			out+=">\n";
			out+="\t<td align=\"center\">";
			out+="<img src=\"../../img/error.jpg\" width=\"16\" height=\"16\" border=\"0\" onclick=\"DelPhPlc("+j+");\"/>";
			out+="<font size=\"2\" face=\"arial\">G"+(i+1)+"</font>\n";
			/*out+="<select name=\"PLCofPHASE\" id=\"PLCofPHASE\" class=\"INTEXT\" onchange=\"\">\n\
			<option value=\"0\">Libre</option>\n";
			for(var p=0;p<GlobalParms.Controllers;p++)
			{
				out+="<option value=\""+p+"\"";
				if((p+1)==parseInt(PHASEs[i].PLC))out+=" selected=\"selected\"";
				out+=">"+PLCs[p].Name+"</option>\n";
			}		
			out+="</select>\n"// */
			out+="</td>\n";
			out+="<td align=\"center\" valign=\"middle\" onclick=\"ModParm('PHASEs.FState');PHASEs["+i+"].FState=chgColor2(PHASEs["+i+"].FState,MSKCOLORFF);this.innerHTML=color2svg(PHASEs["+i+"].FState,'');\" >\n";
			out+=color2svg(PHASEs[i].FState,"");
			out+="</td>\n";
			out+="\t<td align=\"left\"><font size=\"1\" face=\"arial\">";
			if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1)
			{
				out+="<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"FFFFFF\" width=\"100%\">\n";
				out+="<tr bgcolor=\"#E0E0E0\">\n";
				out+="\t<td align=\"left\" bgcolor=\"FFC0C0\">\n";
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x00000003;\" id=\"PhEr"+i+"8\"  "+(PHASEs[i].MskError&0x00000003?"checked=\"checked\"":"")+" />"+Str_No+" "+Str_Err_Electric_Red+"<br />\n";
				if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4i")!=-1)
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x00000004;\" id=\"PhEr"+i+"4\"  "+(PHASEs[i].MskError&0x00000004?"checked=\"checked\"":"")+" />"+Str_No+" "+Str_Partial_Lack_Red+"<br />\n";
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x01000000;\" id=\"PhEr"+i+"0\"  "+(PHASEs[i].MskError&0x01000000?"checked=\"checked\"":"")+" />"+Str_No+" Total "+Str_Lack_Red+"<br />\n";
				out+="\t</td>\n";
				out+="</tr>\n";
				out+="<tr bgcolor=\"#E0E0E0\">\n";
				out+="\t<td align=\"left\" bgcolor=\"FFFFC0\">\n";
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x00000030;\" id=\"PhEr"+i+"9\"  "+(PHASEs[i].MskError&0x00000030?"checked=\"checked\"":"")+" />"+Str_No+" "+Str_Err_Electric_Yellow+"<br />\n";
				if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4i")!=-1)
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x00000040;\" id=\"PhEr"+i+"5\"  "+(PHASEs[i].MskError&0x00000040?"checked=\"checked\"":"")+" />"+Str_No+" "+Str_Partial_Lack_Yellow+"<br />\n";
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x02000000;\" id=\"PhEr"+i+"1\"  "+(PHASEs[i].MskError&0x02000000?"checked=\"checked\"":"")+" />"+Str_No+" Total "+Str_Lack_Yellow+"<br />\n";
				out+="\t</td>\n";
				out+="</tr>\n";
				out+="<tr bgcolor=\"#E0E0E0\">\n";
				out+="\t<td align=\"left\" bgcolor=\"#C0FFC0\">\n";
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x00000300;\" id=\"PhEr"+i+"10\" "+(PHASEs[i].MskError&0x00000300?"checked=\"checked\"":"")+" />"+Str_No+" "+Str_Err_Electric_Green+"<br />\n";
				if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4i")!=-1)
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x00000400;\" id=\"PhEr"+i+"6\"  "+(PHASEs[i].MskError&0x00000400?"checked=\"checked\"":"")+" />"+Str_No+" "+Str_Partial_Lack_Green+"<br />\n";
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x04000000;\" id=\"PhEr"+i+"2\"  "+(PHASEs[i].MskError&0x04000000?"checked=\"checked\"":"")+" />"+Str_No+" Total "+Str_Lack_Green+"<br />\n";
				out+="\t</td>\n";
				out+="</tr>\n";
				out+="<tr bgcolor=\"#E0E0E0\">\n";
				out+="\t<td align=\"left\">\n";
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x00015000;\" id=\"PhEr"+i+"3\"  "+(PHASEs[i].MskError&0x00015000?"checked=\"checked\"":"")+" />"+Str_No+" "+Str_Check_Time_minimum+"<br />\n";
				out+="<input type=\"checkbox\" onclick=\"PHASEs["+i+"].MskError^=0x80000000;\" id=\"PhEr"+i+"11\" "+(PHASEs[i].MskError&Math.abs(0x80000000)?"checked=\"checked\"":"")+" />"+Str_No+" "+Str_Fail_Report+"<br />\n";
				//out+="<input class=\"INTEXT\"  id=\"PhEr"+i+"\" size=\"2\" maxlength=\"5\" value=\""+PHASEs[i].MskError+"\" />";
				out+="\t</td>\n";
				out+="</tr>\n";
				out+="</table>";
			}
			else
			{
				if(GlobalParms.MODEL.indexOf("M4")!=-1)
				{
					out+="<input type=\"checkbox\" id=\"PhEr"+i+"0\" onclick=\"PHASEs["+i+"].MskError^=0x01000000;\" "+(PHASEs[i].MskError&0x01000000?"checked=\"checked\"":"")+" />"+Str_No+" Total "+Str_Lack_Red+"<br />\n";
					out+="<input type=\"checkbox\" id=\"PhEr"+i+"1\" onclick=\"PHASEs["+i+"].MskError^=0x02000000;\" "+(PHASEs[i].MskError&0x02000000?"checked=\"checked\"":"")+" />"+Str_No+" Total "+Str_Lack_Yellow+"<br />\n";
					out+="<input type=\"checkbox\" id=\"PhEr"+i+"2\" onclick=\"PHASEs["+i+"].MskError^=0x04000000;\" "+(PHASEs[i].MskError&0x04000000?"checked=\"checked\"":"")+" />"+Str_No+" Total "+Str_Lack_Green+"<br />\n";
					out+="<input type=\"checkbox\" id=\"PhEr"+i+"3\" onclick=\"PHASEs["+i+"].MskError^=0x00011000;\" "+(PHASEs[i].MskError&0x00011000?"checked=\"checked\"":"")+" />"+Str_Check_Time_minimum+"<br />\n";
				}
				else
				{
					out+="<input type=\"checkbox\" id=\"PhEr"+i+"0\" onclick=\"PHASEs["+i+"].MskError^=0x00000001;\" "+(PHASEs[i].MskError&0x00000001?"checked=\"checked\"":"")+" />"+Str_No+" Total "+Str_Lack_Red+"<br />\n";
					out+="<input type=\"checkbox\" id=\"PhEr"+i+"1\" onclick=\"PHASEs["+i+"].MskError^=0x00000002;\" "+(PHASEs[i].MskError&0x00000002?"checked=\"checked\"":"")+" />"+Str_No+" Total "+Str_Lack_Yellow+"<br />\n";
					out+="<input type=\"checkbox\" id=\"PhEr"+i+"2\" onclick=\"PHASEs["+i+"].MskError^=0x00000004;\" "+(PHASEs[i].MskError&0x00000004?"checked=\"checked\"":"")+" />"+Str_No+" Total "+Str_Lack_Green+"<br />\n";
					out+="<input type=\"checkbox\" id=\"PhEr"+i+"3\" onclick=\"PHASEs["+i+"].MskError^=0x00000008;\" "+(PHASEs[i].MskError&0x00000008?"checked=\"checked\"":"")+" />"+Str_Check_Time_minimum+"<br />\n";
				}
			}
			out+="</font></td>\n";
			//------------------------------------------------------------------------*/
			out+="\t<td align=\"center\" valign=\"top\">\n";
			out+="<img src=\"../../img/up.png\"   width=\"20\" height=\"20\" border=\"0\" onclick=\"ModInVal('Ph"+i+"_MiGT',1,[1,255]);\"></img>\n";
			out+="<font size=\"1\" face=\"arial\" id=\"Ph"+i+"_MiGT\" >"+PHASEs[i].MiGT+"</font>\n";
			out+="<img src=\"../../img/down.png\" width=\"20\" height=\"20\" border=\"0\" onclick=\"ModInVal('Ph"+i+"_MiGT',-1,[1,255]);\"></img>\n";
			/*if(OTU.Link==0)
				out+="<input type=\"checkbox\" id=\"Ph"+i+"_AMiGT\" "+(PHASEs[i].AMiGT&1?"checked=\"checked\"":"")+" />Automatico?<br />\n";// */
			out+="</td>\n";
			//------------------------------------------------------------------------*/
			/*out+="\t<td align=\"center\" valign=\"top\">\n";
			out+="<input id=\"PhTmy\" class=\"INTEXT\" size=\"2\" maxlength=\"2\" value=\""+PHASEs[i].MiYT+"\" /><br/>\n";
			if(OTU.Link==0)
				out+="<input type=\"checkbox\" id=\"PhTmyA"+i+"\" "+(PHASEs[i].AMiYT&1?"checked=\"checked\"":"")+" />Automatico?<br />\n";
			out+="</td>\n";
			//------------------------------------------------------------------------*/
			out+="\t<td align=\"center\" valign=\"top\">\n";
			out+="<img src=\"../../img/up.png\"   width=\"20\" height=\"20\" border=\"0\" onclick=\"ModInVal('Ph"+i+"_MiRT',1,[0,255]);\"></img>\n";
			out+="<font size=\"1\" face=\"arial\" id=\"Ph"+i+"_MiRT\" >"+PHASEs[i].MiRT+"</font>\n";
			out+="<img src=\"../../img/down.png\" width=\"20\" height=\"20\" border=\"0\" onclick=\"ModInVal('Ph"+i+"_MiRT',-1,[0,255]);\"></img>\n";
			/*if(OTU.Link==0)
				out+="<input type=\"checkbox\" id=\"Ph"+i+"_AMiRT\" "+(PHASEs[i].AMiRT&1?"checked=\"checked\"":"")+" />Automatico?<br />\n";//*/
			out+="</td>\n";
			//========================================================================*/
			/*out+="\t<td align=\"center\" valign=\"top\">\n";
			out+="<input id=\"PhTMg"+i+"\" class=\"INTEXT\" size=\"2\" maxlength=\"2\" value=\""+PHASEs[i].MaGT+"\" />\n";
			out+="</td>\n";
			//------------------------------------------------------------------------*/
			/*out+="\t<td align=\"center\" valign=\"top\">\n";
			out+="<input id=\"PhTMy"+i+"\" class=\"INTEXT\" size=\"2\" maxlength=\"2\" value=\""+PHASEs[i].MaYT+"\" />\n";
			out+="</td>\n";
			//------------------------------------------------------------------------*/
			/*out+="\t<td align=\"center\" valign=\"top\">\n";
			out+="<input id=\"PhTMr"+i+"\" class=\"INTEXT\" size=\"2\" maxlength=\"2\" value=\""+PHASEs[i].MaRT+"\" />\n";
			out+="</td>\n";
			//========================================================================*/
			out+="\t<td align=\"center\" valign=\"top\">\n";
			//out+="<img src=\"../../img/up.png\"   width=\"20\" height=\"20\" border=\"0\" onclick=\"ModInVal('TOEE"+i+"',32,[0,1023]);\"></img>\n";
			out+="<font size=\"1\" face=\"arial\" id=\"TOEE"+i+"\" >"+PHASEs[i].TOEE+"</font>\n";
			//out+="<img src=\"../../img/down.png\" width=\"20\" height=\"20\" border=\"0\" onclick=\"ModInVal('TOEE"+i+"',-32,[0,1023]);\"></img>\n";
			out+="</td>\n";
			out+="\t<td align=\"center\" valign=\"top\">\n";
			//out+="<img src=\"../../img/up.png\"   width=\"20\" height=\"20\" border=\"0\" onclick=\"ModInVal('TOEC"+i+"',32,[0,1023]);\"></img>\n";
			out+="<font size=\"1\" face=\"arial\" id=\"TOEC"+i+"\" >"+PHASEs[i].TOEC+"</font>\n";
			//out+="<img src=\"../../img/down.png\" width=\"20\" height=\"20\" border=\"0\" onclick=\"ModInVal('TOEC"+i+"',-32,[0,1023]);\"></img>\n";
			out+="</td>\n";// */
			//========================================================================*/
			out+="</tr>\n";
		}
	}
	out+="<tr>\n";
	out+="\t<td align=\"center\" colspan=\"6\"><input type=\"button\" class=\"INTEXT2\" value=\""+Str_check_Conf+"\" onclick=\"Setdphc();\" /></td>\n";
	out+="</tr>\n";
	out+="</table>";
	//alert(out);
	return out;
}
//--------------------------------------------------
function ModCft(j,i)
{
	Obj1=document.getElementById("CFT"+i+""+j);
	Obj2=document.getElementById("CFT"+j+""+i);
	Obj1.value=String.trim(Obj1.value);
	Obj2.value=String.trim(Obj2.value);
	if(isNaN(Obj1.value)==true)
		Obj1.value="";
	if(isNaN(Obj2.value)==true)
		Obj2.value="";
	if(Obj2.value!=Obj1.value)
	{
		if(Obj1.value!="")
		{
			if(Obj2.value=="")
				Obj2.value=0;
		}
		else
			Obj2.value="";
	}
}

function ShwSec()
{
	var out="";
	out+="<table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" bgcolor=\"LightGrey\" >\n";
	out+="\t<tr valign=\"middle\">\n";
	out+="\t\t<td align=\"center\">";
	out+="<input type=\"button\" class=\"INTEXT2\" value=\""+Str_check_Conf+"\" onclick=\"ModSec();LogPHASEs();\" />\n";
	out+="</td>\n";
	var x=0;
	var X=0;
	for(var x=0;x<PLCs[PlcIdx].Phases.length;x++)
	{
		i=PLCs[PlcIdx].Phases[x];
		{
			out+="\t\t<td align=\"center\">";
			out+="G"+(i+1)+"";
			out+="</td>\n";
		}
	}
	out+="\t</tr>\n";
	for(var y=0;y<PLCs[PlcIdx].Phases.length;y++)
	{
		i=PLCs[PlcIdx].Phases[y];
		out+="\t<tr valign=\"middle\">\n";
		out+="\t\t<td align=\"center\">";
		out+="G"+(i+1)+"";
		out+="</td>\n";
		for(var x=0;x<PLCs[PlcIdx].Phases.length;x++)
		{
			j=PLCs[PlcIdx].Phases[x];
			out+="\t\t<td align=\"center\">";
			if(i!=j)
			{
				out+="<input id=\"CFT"+i+""+j+"\" size=\"1\" maxlength=\"2\" class=\"INTEXT\" onkeyup=\"ModCft("+j+","+i+");\" value=\" ";
				for(var S=0;S<PHASEs[i].Sec.length;S++)
				{
					if(j==PHASEs[i].Sec[S].phase)
						out+=PHASEs[i].Sec[S].time;
				}
				out+="\" />";
			}
			out+="</td>\n";
		}
		out+="\t</tr>\n";
	}
	out+="</table>\n";
	return out;
}

//--------------------------------------------------
function ShwGen(FLS,title)
{
	var out="<table border=\"1\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n";
	out+="<tr bordercolor=\"Silver\">\n\
	<td align=\"middle\" colspan=\"3\">\n\
	<font size=\"1\" face=\"arial\">"+title+"</font>\n\
	</td>\n\
	</tr>\n";//*/
	for(var i=0;i<FLS.length;i++)
	{
		out+="<tr align=\"left\">\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">"+FLS[i][0]+"</font>\n\
		</td>\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">\
		<input onchange=\""+title+"["+i+"][1]=this.value;\" class=\"INTEXT\" size=\"10\" value=\"";
		if(FLS[i][1])
			out+=FLS[i][1];
		out+="\" />\
		</font>\n\
		</td>\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">";
		if(FLS[i][2])
			out+=FLS[i][2];
		out+="</font>\n\
		</td>\n\
		</tr>\n";
	}
	out+="</table>\n";
	return out;
}

function ShwGenComa(FLS,title,off)
{
	var out="<table border=\"1\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n";
	out+="<tr bordercolor=\"Silver\">\n\
	<td align=\"middle\" colspan=\"3\">\n\
	<font size=\"1\" face=\"arial\">"+title+"</font>\n\
	</td>\n\
	</tr>\n";//*/
	for(var i=0;i<FLS.length;i++)
	{
		out+="<tr align=\"left\">\n";
			out+="<td>\n\
			<font size=\"1\" face=\"arial\">"+(i+off)+"</font>\n\
			</td>\n";
		for(var j=0;j<FLS[i].length;j++)
		{
			out+="<td>\n\
			<font size=\"1\" face=\"arial\">\
			<input onchange=\""+title+"["+i+"]["+j+"]=this.value;\" class=\"INTEXT\" size=\"10\" value=\"";
			if(FLS[i][j])
				out+=FLS[i][j];
			out+="\" />\
			</font>\n\
			</td>\n";
		}
		out+="</tr>\n";
	}
	out+="</table>\n";
	return out;
}

function ShowDgvpConf(ObjID)
{
	var idx=0;
	var i=0;
	var tmp=0;
	var out="";
	out+="<font size=\"2\" face=\"arial\">"+Str_Conf_DgvP+"</font><br />\n";
	out+="<table border=\"0\" cellpadding=\"2\" cellspacing=\"0\" align=\"center\" background=\"\" style=\"border-collapse:collapse;border:2px solid #000000;\">\n";
	//---------------------------------------------------------------------
	{
		out+="<tr align=\"center\" bgcolor=\"#C0C0C0\" >\n";
		out+="	<td align=\"center\">\n";
		out+="		<font size=\"1\" face=\"arial\">"+Str_Parameter+"</font>\n";
		out+="	</td>\n";
		out+="	<td align=\"center\" valign=\"middle\">\n";
		out+="		<font size=\"1\" face=\"arial\">"+Str_Config+"</font>\n";
		out+="	</td>\n";
		out+="</tr>\n";
	}
	//---------------------------------------------------------------------
	{
		out+="<tr align=\"center\" bgcolor=\"#C0C0C0\">\n";
		out+="	<td align=\"center\">\n";
		out+="		<font size=\"1\" face=\"arial\">"+Str_Dgvp_Link+"</font>\n";
		out+="	</td>\n";
		out+="	<td align=\"center\" valign=\"middle\">\n";
		out+="		<input  value=\""+SdgvP.Link+"\" onkeyup=\"SdgvP.Link=this.value;\" class=\"INTEXT\" size=\"5\" maxlength=\"5\" />\n";
		out+="	</td>\n";
		out+="</tr>\n";
	}
	//---------------------------------------------------------------------
	if(SdgvP.Tsk)
	{
		for(var idx=0;idx<SdgvP.Tsk.length;idx++)
		{
			out+="<tr align=\"center\" bgcolor=\"#C0C0C0\">\n";
			out+="	<td align=\"rigth\">\n";
			out+="		<font size=\"1\" face=\"arial\">"+Str_Dgvp_srvid+"</font><br />\n";
			out+="		<font size=\"1\" face=\"arial\">"+Str_period+"</font><br />\n";
			out+="	</td>\n";
			out+="	<td align=\"left\" valign=\"middle\">\n";
			out+="		<input value=\""+SdgvP.Tsk[idx].IDsrv+"\" onkeyup=\"SdgvP.Tsk["+idx+"].IDsrv=this.value;\" class=\"INTEXT\" size=\"5\" maxlength=\"5\"  />\n<br/>";
			out+="		<input  value=\""+SdgvP.Tsk[idx].Period+"\" onkeyup=\"SdgvP.Tsk["+idx+"].Period=this.value;\" class=\"INTEXT\" size=\"5\" maxlength=\"5\" />\n";
			out+="	</td>\n";
			out+="</tr>\n";
			//---------------------------------------------------------------------
			out+="<tr align=\"center\" bgcolor=\"#C0C0C0\">\n";
			out+="	<td align=\"center\">\n";
			out+="<select onchange=\"SdgvP.Tsk["+idx+"].Sck=this.value;\" class=\"INTEXT\" >\n";
			out+=GenOptions(OptDgvPCmd,SdgvP.Tsk[idx].Sck);
			out+="</select>\n"
			out+="	</td>\n";
			switch(SdgvP.Tsk[idx].Sck)
			{
				case 2:
				{
					out+="	<td align=\"center\" valign=\"middle\">\n";
					out+="		<font size=\"1\" face=\"arial\">Version Info</font>\n";
					out+="	</td>\n";
				}
				break;
				case 252:
				{
					out+="	<td align=\"left\" valign=\"middle\">\n";
					i=0;
					while(i<SdgvP.Tsk[idx].cmps.length)
					{
						tmp=LsCmps.indexOf(SdgvP.Tsk[idx].cmps[i]);
						if(tmp!=-1)
						{
							out+="<input type=\"button\" class=\"INTEXT1\" value=\"[X]";
							out+=LsCmpsTxt[tmp];
							out+="\" onclick=\"SdgvP.Tsk["+idx+"].cmps.splice("+i+",1);ShowDgvpConf('"+ObjID+"');return false;\" /><br />\n";
							i++;
						}
						else
						{
							out+=SdgvP.Tsk[idx].cmps.splice(i,1);
							i=0;
						}
					}
					out+="<br />["+Str_Add+":<select class=\"INTEXT\" onchange=\"if(this.selectedIndex>0){SdgvP.Tsk["+idx+"].cmps[SdgvP.Tsk["+idx+"].cmps.length]=LsCmps[this.selectedIndex-1];}ShowDgvpConf('"+ObjID+"');\" >\n";
					out+="<option></option>\n";
					out+=GenOptionsVi(LsCmpsTxt,null);
					out+="</select>]\n"
					out+="	</td>\n";
				}
				break;
			}
			out+="</tr>\n";
		}
	}
	//---------------------------------------------------------------------
	out+="</table>\n";
	if(ObjID!=null)
		document.getElementById(ObjID).innerHTML=out;
	return out;
}

/*
function ShwSerial(select)
{
	if(select=="New")
	{
		alert(select)
		select=Comm.length;
		Comm[select]=new Object();
		Comm[select].Speed="9600";
		Comm[select].Config="8N1";
	}
	else
		select--;
	//---------------------------------Title
	txt=document.getElementById("sample7Title");
	txt.innerHTML=Str_Serial+" "+Str_Port;
	//---------------------------------
	var count=0;
	out="<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" bgcolor=\"LightGrey\" width=\"100%\">\n";
	out+="<tr><td align=\"left\">\n<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Save_Conf+"\" onclick=\"SendSerial();\" />\n</td>";
	out+="<td align=\"center\"><font size=\"1\" face=\"arial\"> </font></td>\n";
	out+="<td align=\"right\"><select class=\"INTEXT\" onchange=\"ShwSerial(this.value);\" value=\""+select+"\">\n";
	for(var count=0;count<Comm.length;count++)
	{
		out+="<option value=\""+(count+1)+"\"";
		if(select==count)
			out+=" selected=\"selected\"";
		out+=">"+Comm[count][0]+" "+(count+1)+"</option>\n";
	}
	out+="<option>New Can</option>\n";
	out+="<option>New UDP</option>\n";
	out+="<option>New TCPc</option>\n";
	out+="<option>New TCPs</option>\n";
	out+="</select></td>\n</tr>\n";
	out+="</table><br />\n\n";
	out+="<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" bgcolor=\"LightGrey\" width=\"100%\">\n";
	var j=1;
	switch(Comm[select][0])
	{
		case "Can":
		out+="<tr align=\"left\">\n\
		<td><font size=\"1\" face=\"arial\"> Board </font></td>\n\
		<td align=\"right\"><select class=\"INTEXT\" onchange=\"Comm["+select+"]["+j+"]=this.value;\" value=\""+Comm[select][j]+"\">\n";
		out+="<option>"+Comm[select][j]+"</option>\n\
		<option>1</option>\n\
		<option>2</option>\n\
		<option>3</option>\n\
		<option>4</option>\n";
		out+="</select></td>\n</tr>";
		j++
		case "Ser":
		out+="<tr align=\"left\">\n\
		<td><font size=\"1\" face=\"arial\">"+Str_Baud_Rate+"</font></td>\n\
		<td align=\"right\"><select class=\"INTEXT\" onchange=\"Comm["+select+"]["+j+"]=this.value;\" >\n\
		<option>"+Comm[select][j]+"</option>\n\
		<option>110</option>\n\
		<option>300</option>\n\
		<option>600</option>\n\
		<option>1200</option>\n\
		<option>2400</option>\n\
		<option>4800</option>\n\
		<option>9600</option>\n\
		<option>14400</option>\n\
		<option>19200</option>\n\
		<option>28800</option>\n\
		<option>38400</option>\n\
		<option>56000</option>\n\
		<option>57600</option>\n\
		<option>64000</option>\n\
		<option>115200</option>\n";
		out+="</select></td>\n</tr>";
		j++;
	out+="<tr align=\"left\">\n\
		<td><font size=\"1\" face=\"arial\">"+Str_Parity+"</font></td>\n\
		<td align=\"right\"><select class=\"INTEXT\" onchange=\"Comm["+select+"]["+j+"]=Comm["+select+"]["+j+"][0]+this.value[0]+Comm["+select+"]["+j+"][2];\">\n";
		out+="<option>"+Comm[select][j][1]+"</option>\n\
		<option>Even</option>\n\
		<option>Mark</option>\n\
		<option>None</option>\n\
		<option>Odd</option>\n\
		<option>Space</option>\n";
		out+="</select></td>\n</tr>";
	out+="<tr align=\"left\">\n\
		<td><font size=\"1\" face=\"arial\">"+Str_Data_Bit+"</font></td>\n\
		<td align=\"right\"><select class=\"INTEXT\" onchange=\"Comm["+select+"]["+j+"][0]=this.value;\" value=\""+Comm[select][j][0]+"\">\n";
		out+="<option>"+Comm[select][j][0]+"</option>\n\
		<option>8</option>\n\
		<option>7</option>\n\
		<option>6</option>\n\
		<option>5</option>\n\
		<option>4</option>\n";
		out+="</select></td>\n</tr>";
	out+="<tr align=\"left\">\n\
		<td><font size=\"1\" face=\"arial\">"+Str_Stop_Bits+"</font></td>\n\
		<td align=\"right\"><select class=\"INTEXT\" onchange=\"Comm["+select+"]["+j+"][2]=this.value;\" value=\""+Comm[select][j][2]+"\">\n";
		out+="<option>"+Comm[select][j][2]+"</option>\n\
		<option>1</option>\n\
		<option>2</option>\n";
		out+="</select></td>\n</tr>";
		break;
		case "cTCP":
		case "UDP":
		out+="\n\
		<tr align=\"left\"><td><font size=\"1\" face=\"arial\"> IP Target </font></td>\n\
		<td align=\"right\"><input class=\"INTEXT\" size=\"15\" maxlength=\"15\"  onchange=\"Comm["+select+"][1]=this.value;\" value=\""+Comm[select][1]+"\" /></td>\n</tr>\
		<tr align=\"left\"><td><font size=\"1\" face=\"arial\"> Port Source </font></td>\n\
		<td align=\"right\"><input class=\"INTEXT\" size=\"15\" maxlength=\"15\"  onchange=\"Comm["+select+"][2]=this.value;\" value=\""+Comm[select][2]+"\" /></td>\n</tr>\
		<tr align=\"left\"><td><font size=\"1\" face=\"arial\"> Port Target </font></td>\n\
		<td align=\"right\"><input class=\"INTEXT\" size=\"15\" maxlength=\"15\"  onchange=\"Comm["+select+"][3]=this.value;\" value=\""+Comm[select][3]+"\" /></td>\n</tr>\
		<tr align=\"left\"><td><font size=\"1\" face=\"arial\"> Time Out To Send </font></td>\n\
		<td align=\"right\"><input class=\"INTEXT\" size=\"15\" maxlength=\"15\"  onchange=\"Comm["+select+"][4]=this.value;\" value=\""+Comm[select][4]+"\" /></td>\n</tr>\
		<tr align=\"left\"><td><font size=\"1\" face=\"arial\"> Buffer Size </font></td>\n\
		<td align=\"right\"><input class=\"INTEXT\" size=\"15\" maxlength=\"15\"  onchange=\"Comm["+select+"][5]=this.value;\" value=\""+Comm[select][5]+"\" /></td>\n</tr>";
		break;
		case "sTCP":
		out+="\n\
		<tr align=\"left\"><td><font size=\"1\" face=\"arial\"> Server Port </font></td>\n\
		<td align=\"right\"><input class=\"INTEXT\" size=\"15\" maxlength=\"15\"  onchange=\"Comm["+select+"][1]=this.value;\" value=\""+Comm[select][1]+"\" /></td>\n</tr>\
		<tr align=\"left\"><td><font size=\"1\" face=\"arial\"> Time Out To Send </font></td>\n\
		<td align=\"right\"><input class=\"INTEXT\" size=\"15\" maxlength=\"15\"  onchange=\"Comm["+select+"][2]=this.value;\" value=\""+Comm[select][2]+"\" /></td>\n</tr>\
		<tr align=\"left\"><td><font size=\"1\" face=\"arial\"> Buffer Size </font></td>\n\
		<td align=\"right\"><input class=\"INTEXT\" size=\"15\" maxlength=\"15\"  onchange=\"Comm["+select+"][3]=this.value;\" value=\""+Comm[select][3]+"\" /></td>\n</tr>";
		break;
	}
	out+="</table>";
	document.getElementById("CFGINI").innerHTML=out;
}

// */
percent=15;

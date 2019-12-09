var PrgBk= new Array();
var PrgEd= new Array();
//--------------------------------------------------
var SrcIdx=0;
var TrgIdx=0;
//----------------------
var BasePath="/";
var SvrIp="localhost";
//-------------------------------------------------- variables de la Web
var Reload=0x000;
var ObjInterval;
var Refresh=0;
var dest=0;
var language="ES";
var TcType=0;
var WAC=12345;
var Log_En=0;
var srvacc=0;
var FoceCompile=0;
var SendOrAlert=1;
var AlertPlans=1;
var RefreshApi;
var PoolData=0;
//---------------------------------
var percent2=0;
var percent=0;
//---------------------------------
var PlcIdx=0;
var ErrIdx=0;
var Resource= new Object();
//---------------------------------
var Pxs=12;
var fullscaleX=1080;
var PhHist= new Array(fullscaleX/Pxs);
var PhHistCant=0;
//-------------------------------------------------- Objetos de systema
var Maxlen=200;//620
var UpData="";
var UpMode=0;
var UpPath="";
var UpFile="";
var UpType="";
var seek=0;
var FilterFileList="";
var FileList;
var GlobalVars;
//-------------------------------------------------- Objetos de systema
var GlobalParms = new Object();
GlobalParms.PLCs = new Array();
GlobalParms.PHASEs = new Array();
GlobalParms.IOs = new Array();
GlobalParms.Srv = new Array();
var PLCs = GlobalParms.PLCs;
var PHASEs = GlobalParms.PHASEs;
var IOs = GlobalParms.IOs;
var Srv = GlobalParms.Srv;
var Links = new Array();
var NTP = new Array();
var GPS = new Array();
var ErrorsCfg = new Array();
var Errors = new Array();
//--------------------------------------------------- Modulos
var DgvP = new Array();
var SdgvP = new Array();
var OTU = new Object();
var DefIn = new Array();
var OPCT = new Array();
var Master = new Object();
var Iteris = new Object();
var DgvSoft = new Array();
//--------------------------------------------------- const
var PhasesStructSize=56;
var StructSizePLC=268;
var StructSizeIO=28;
var HW_IOS=9;
OptDgvPCmd=[2,"Info. Version Modelo",252,"Inf. Tiempo Real"];
var LsCmps=		 ["RTC",
								"Voltage",
								"PlcMode",
								"Nplan",
								"Cph",
								"Cio",
								"PhColor",
								"PhRColor",
								"PhCurrent",
								"PhError",
								"IOsts"];

var LsCmpsTxt=	[Str_DgvP_Date,
								 Str_DgvP_Voltage,
								 Str_DgvP_Mode,
								 Str_DgvP_Plan,
								 Str_DgvP_Cph,
								 Str_DgvP_Cio,
								 Str_DgvP_PhSts,
								 Str_DgvP_PhStsR,
								 Str_DgvP_PhCurr,
								 Str_DgvP_PhErrors,
								 Str_DgvP_IOsts];

var DgvPM3=			[
"RTC"							,",6,16,0,4",
"Voltage"						,",6,12,0,4",
"PlcMode"						,",6,0,32,2",
"Nplan"							,",6,147,32,1",
"Cph"							,",6,36,16,1",
"Cio"							,",6,32,16,1",
"PhColor"						,",12,0,48,1,56,0,36,16",
"PhRColor"						,",12,1,48,1,56,0,36,16",
"PhCurrent"						,",12,16,48,2,56,0,36,16",
"PhError"						,",12,24,48,4,56,0,36,16",
"IOsts"							,",12,0,64,1,28,0,32,16",];

var DgvPM4=			[
"RTC"							,",6,16,0,4",
"Voltage"						,",6,12,0,4",
"PlcMode"						,",6,0,32,2",
"Nplan"							,",6,147,32,1",
"Cph"							,",6,36,16,1",
"Cio"							,",6,32,16,1",
"PhColor"						,",12,0,48,1,60,0,36,16",
"PhCurrent"						,",12,16,48,2,60,0,36,16",
"PhError"						,",12,24,48,4,60,0,36,16"];
//---------------------------------------------------
var home_home		=0;
var home_moni		=1;
var home_conf		=2;
var conf_ip			=3;
var conf_hw_mods	=4;
var home_plcs		=5;
var conf_errors		=6;
var conf_otu		=7;
var conf_gps		=8;
var conf_avanz		=9;
var conf_phases		=10;
var conf_sec		=11;
var conf_ev			=12;
var conf_sts		=13;
var conf_sch		=14;
var conf_plan		=15;
var moni_errors		=16;
var moni_general	=17;
var moni_plcs		=18;
var moni_phases		=19;
var moni_io			=20;
var moni_task		=21;
var moni_plans		=22;
var conf_io			=23;
var conf_planMC		=24;
var conf_planOTU	=25;
var conf_plansLcl	=26;
var conf_FrcPln		=27;
var Prev_Plc		=30;
var Next_Plc		=31;
var Conf_save		=39;
var Ctrl_Sch		=40;
var Ctrl_Plns		=41;
var Ctrl_Rst		=42;
//---------------------------------------------------
Resource={
Page:0,
Conf:0,
Moni:0,
MoniBit:0,
};

IOs=[{
Enable:1,
Type:1,
Flank:1,
shNivel:0,
FailSts:0,
TimeOut:10,
neg:0,
},]

GlobalParms={
ID:"none",
MAC:"00-00-00-A8-00-A1",
ETH0:"192.168.0.161",
NETMASK0:"255.255.0.0",
DGW:"192.168.0.1",
MACDGW:"FF-FF-FF-FF-FF-FF",
MODEL:"GW1M4FT",
LOG:"1",
Flashing:"1",
FlasCA:50,
Loops:0,
Inputs:0,
Outputs:0,
Virtual_Inputs:0,
Phases:0,
Virtual_Phases:0,
Groups_Phases:0,
Controllers:1,
Time_Out_Electrical_Error:120,
Time_Out_Consumption_Error:250,
Alert_Over_Voltage:1600,
Normal_Voltage:1200,
Error_Minimal_Voltage:1100,
Error_Critical_Voltage:1050,
Web_Access_Code_RW:"12345",
Web_Access_Code_Ro:"54321",
Time_Zone_GMT:-180,
Enable_GPS:0,
Time_Cap:0,
};

pPLCs=[{
Number:0,
Name:"Anel1",
Plan:"98",
Flashing:"99",
SyncRef:"??/??/????A00:01:00",
Scheduler:"/ag1.sch",
Location:"-34.629331,-58.42561",
Server:"",
Phase1:"0",
ErrorOut:"0",
Svg:"",
Sec:"",
ErrorList:[],
PlanList:[],
Sts:[],
EvFiles:[],
HolyDays:"",
WeekDays:"",
TimeScheduler:"",
}];

OTU={
Link:0,
BitCofigRx:0,
BitCofigTx:0,
FO:0,
G1G2:0,
CftPLCs:0,
};

var Plans=[{
Type:0,
Numero:1,
TCicle:120,
TOffset:0,
Phc:["/0/phc0.ini",""],
Secu:[1,2,0],
Sts:[0,1,2],
Sts2Stp:[0,0,0],
StpSch:[1,0,0],
StpFnc:[0,0,0],
//StpTyp:[0,0,0],
}];

var FncASINC={
TimeNormal:0,
Input:0,
Go2Stp:0,
ClearInp:0,
};
var FncActuado={
TimeNormal:0,
TimeMax:0,
TimeExt:0,
TimeMin:0,
Input:0,
};
var FncOtu={
Time2Start:0,
Input:0,
Go2Stp:0,
ClearInp:0,
};
//---------------------------------------------------
MSKCOLORFF=	[0,17,18]; 				//off,r,y
MSKCOLORST=	[0,1,4];	  			//off,R,V
MSKC_OR=	[0,1,18,17];	  		//off,R,V
MSKC_ORV=	[0,1,2,3,4,17,18,19,20];//off,R,A,RA,V,r,ra,v
MSKC_ORVvar=[0,1,2,3,4,17,18,19,20];//off,R,A,RA,V,r,ra,v
MSKC_ORAV=	[0,1,2,4];	  			//off,R,V
MSKEV=		[1,2,3,17,18,19,20,22];	//R,A,RA,r,a,ra,v,va
MSKEV1=		[2,17,18,20];	  	//A,r,a,v
MSKEVRV=	[1,2,3,4,17,18,20,22];		//R,A,RA,V,r,a,v,va
MSKALL=		[0,1,2,3,4,17,18,19,20,22];//off,R,A,RA,V,r,ra,v,va
var MSKtemo=[];
//---------------------------------------------------
//OptAddSrc=["RT","RT","Fx","Fx","Remote Controler","Remote Controler"]		
OptAddSrc=[
"DGV-uTC1-M4"	,"DGV uTC1",
"GW1M3FT"		,"GW1(M3)",
"GW2M3FT"		,"GW2(M3)",
"GW3M3RT"		,"GW3 Tempo Real(M3)",
"GW1M4FT"		,"GW1(M4)",
"GW2M4FT"		,"GW2(M4)",
"GW3M4RT"		,"GW3 Tempo Real(M4)",
"GW4M4RT"		,"GW4 Tempo Real",
"MAC-TC1M4"		,"MAC-Tc1 Tempo Real",
"STC-S4M3"		,"SUTEC Controler",
"MSTC-V1M3"		,"MsTraffic STC",
"SAD-V1M4"		,"Cosmos TSC 1",
"SAD-V2M4"		,"Cosmos TSC 2",
"SAD-V3M4"		,"Cosmos TSC 4"];

OptOPB2=["2","1 OPB","4","2 OPB","6","3 OPB","8","4 OPB","10","5 OPB","12","6 OPB"];
OptMpt3=["2","1 MPT3","4","2 MPT3","6","3 MPT3","8","4 MPT3","10","5 MPT3","12","6 MPT3"];
OptMpt4=["2","1 MPT4","4","2 MPT4","6","3 MPT4","8","4 MPT4","10","5 MPT4","12","6 MPT4","14","7 MPT4","16","8 MPT4"];
OptMpt5=["4","1 MPT","8","2 MPT","12","3 MPT","16","4 MPT","20","5 MPT","24","6 MPT"];
OptMDV=["0","0 MDV8","8","1 MDV8","16","2 MDV8"];
OptMDV4=["0","0 MDV4","4","1 MDV4"];
OptFlashingHz=["1","1hz","2","2hz","4","4hz","6","6hz","8","8hz","10","10hz","12","12hz","14","14hz"];
OptLogLinks=["0","Web","1","Serial 1","2","Serial 2","3","Serial 3","4","Serial 4","5","Serial 5","6","Serial 6","7","Serial 7","8","Serial 8"];
OptTimeZone=[-720,"GMT -12:00 Eniwetok, Kwajalein",-660,"GMT -11:00 Midway Island, Samoa",-600,"GMT -10:00 Hawaii",-540,"GMT -09:00 Alaska",-480,"GMT -08:00 Pacific Time US &amp; Canada",-420,"GMT -07:00 Mountain Time US &amp; Canada",-360,"GMT -06:00 Central Time US &amp; Canada, Mexico City",-300,"GMT -05:00 Eastern Time US &amp; Canada, Bogota, Lima",-240,"GMT -04:00 Atlantic Time Canada, Caracas, La Paz",-210,"GMT-03:30 Newfoundland",-180,"GMT -03:00 Brazil, Buenos Aires, Georgetown",-120,"GMT -02:00 Mid-Atlantic",-60,"GMT -01:00 Azores, Cape Verde Islands",0,"GMT 0 Western Europe Time, London, Lisbon, Casablanca",60,"GMT +01:00 Brussels, Copenhagen, Madrid, Paris",120,"GMT +02:00 Kaliningrad, South Africa",180,"GMT +03:00 Baghdad, Riyadh, Moscow, St. Petersburg",210,"GMT +03:30 Tehran",240,"GMT +04:00 Abu Dhabi, Muscat, Baku, Tbilisi",270,"GMT +04:30 Kabul",300,"GMT +05:00 Ekaterinburg, Islamabad, Karachi, Tashkent",330,"GMT +05:30 Bombay, Calcutta, Madras, New Delhi",360,"GMT +06:00 Almaty, Dhaka, Colombo",420,"GMT +07:00 Bangkok, Hanoi, Jakarta",480,"GMT +08:00 Beijing, Perth, Singapore, Hong Kong",540,"GMT +09:00 Tokyo, Seoul, Osaka, Sapporo, Yakutsk",570,"GMT +09:30 Adelaide, Darwin",600,"GMT +10:00 Eastern Australia, Guam, Vladivostok",660,"GMT +11:00 Magadan, Solomon Islands, New Caledonia",720,"GMT +12:00 Auckland, Wellington, Fiji, Kamchatka"];
//---------------------------------------------------
var IntReg=[
{Type:"Int",Nombre:"THIS",Valor:null},
{Type:"Int",Nombre:"HEAP",Valor:null},
{Type:"Int",Nombre:"CPLCS",Valor:null},
{Type:"Int",Nombre:"FPHASES",Valor:null},
{Type:"Int",Nombre:"RPHASES",Valor:null},
{Type:"Int",Nombre:"VPHASES",Valor:null},
{Type:"Int",Nombre:"GPHASES",Valor:null},
{Type:"Int",Nombre:"CLOOPS",Valor:null},
{Type:"Int",Nombre:"VINPUTS",Valor:null},
{Type:"Int",Nombre:"CINPUTS",Valor:null},
{Type:"Int",Nombre:"COUTPUTS",Valor:null},
{Type:"Int",Nombre:"RUN",Valor:null},
{Type:"Int",Nombre:"RTC",Valor:null},
{Type:"Int",Nombre:"VOLT",Valor:null},
{Type:"Int",Nombre:"Temperature",Valor:null},
{Type:"Int",Nombre:"TOLCD",Valor:null},
{Type:"Int",Nombre:"KEY",Valor:null},
{Type:"Int",Nombre:"OPTUI",Valor:null},
{Type:"Bit",Nombre:"debug.opct",Valor:null},
{Type:"Bit",Nombre:"debug.hw",Valor:null},
{Type:"Bit",Nombre:"debug.can",Valor:null},
{Type:"Byt",Nombre:"debug.rtc",Valor:null},
{Type:"Bit",Nombre:"debug.iohw",Valor:null},
{Type:"Bit",Nombre:"debug.plc",Valor:null},
{Type:"Bit",Nombre:"debug.http",Valor:null},
{Type:"Bit",Nombre:"debug.error",Valor:null},
{Type:"Bit",Nombre:"debug.gps",Valor:null}];

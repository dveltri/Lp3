var Str_ConfirmPHC = "Alerta al modificar parametro se borraran configuraciones que dependan de ellas\nEsta seguro?";
var Str_No="No";
var Str_GP_Time_flashing="Time flashing";
var Str_GP_Time_Red="Time all Red";
var Str_FromStep="From step";
var Str_ToStep="to step";
var Str_Count="Count";
var Str_Occupation="Occupation";
var Str_Enabled="Enabled";
var Str_Title_io="Inputs and Outputs";
var Str_Demand = "Demand";
var Str_ChkParm = ":\nParametro sin informacion de consistencia o nombre erroneo!";
var Str_ChkParmTyp = ":\nParametro sin tipo de dato definido!";
var Str_Next_Stp="Next step of state";
var Str_Del_Sep="Delete step";
var Str_Check_Time_minimum="Check Time Minimum?";
var Str_looking_for_difference="Looking for difference:";
var Str_conflict_transition="Transi&#231;&#227;o Prohibida:";
var Str_Target="Target";
var Str_Source="Source";
var Str_Storage_plans="Plans in SD-card(.eil)"
var Str_User_plans="Plans on editor(.es3)"
var Str_Force_info="For foce plan you have got equivalent plan number in storage and editor plan"
var Str_Typ_Src="Source type";
var Str_States_STP="States of Steps";
var Str_Sequense_STP="Sequence of Step";
var Str_Time_2_Start_STS="Time of Cycle to Start State";
var Str_Fail_DEX_Time_STS="(Detetor em falla)Fix Time of STS";
var Str_Normal_Time_STS="Normal Time of STS";
var Str_Max_Time_STS="Maximum Time of STS";
var Str_Ext_Time_STS="Extension Time of STS";
var Str_Min_Time_STS="Minimal Time of STS";
var Str_Typo_of_STS="Type of stste";
var Str_not_jump="Not jump";
var Str_Stps="Steps";
var Str_Stss="States";
var Str_Times="Times";
var Str_jumps="jumps";
var Str_free_dem="Free Demand";
var Str_sureQ="Are you sure?";
var Str_RemoveMessage="Are you sure to remove?";
var Str_RemoveMessagePlans="Are you sure to remove? all plans and all schedullers";
var Str_Default="Default";
var Str_Add_State="Add State";
var Str_Add_Step="Add Step";
var Str_Del_State="Delet State";
var Str_origin="origin";
var Str_Enable="Enable";
var Str_Disable="disable";
var Str_disabled="disabled";
var Colors=["vermelha","amarela","verde"];
var Str_Flank="Flank";
var Str_start_up_nivel="Start Up Nivel";
var Str_State="State";
var Str_next="Next";
var Str_prev="Previous";
var Str_Isolated="isolated";
var Str_variable_time="variable time";
var Str_goto_Step="goto to step";
var Str_to="to";
var Str_Home="Home";
var Str_clock="Clock";
var Str_hardware="Hardware";
var Str_LSTCHG="Last Change of Plan";
var Str_NXCHG="Next Change of Plan";
var Str_NXPLAN="Demanded Plan";
var Str_Plan_Centralized="Plan Centralized";
var Str_Plan_Local="Plan Local";
var Str_Plan_Control_Manual="Plan Control Manual";
//Menu
var Str_MN_Config="Config";
var Str_MN_Info="Info";
var Str_MN_Tools="Tools";
var Str_check_Conf="Check and Set";
//SubMenu (Config)
var Str_period="period";
var Str_General="General";
var Str_Controllers="Controller";
Str_Controllers2="Controllers";
var Str_Add_Conflict="Add Conflict";
var Str_Conflict="Conflict";
var Str_Matrix="Matrix";
var Str_Show_Plans="List of Plans";
var Str_Show_Conflicts="List of Conflicts";
var Str_Show_Scheduler="List of Scheduler";
var Str_Lack="Lack";
var Str_Config_Comms="Config Comms";
var Str_Config_Iteris="Config Iteris";
var Str_Config_OPCT="Config OPCT";
var Str_Config_Inputs="Config Imputs";
var Str_Flow_Program="Flow Program";
var Str_Easy_Program="Easy Program";
var Str_New_scheduler="New Scheduler";
var Str_scheduler="Scheduler";
var Str_Config_Phases="Config Phases";				//M�rcio - TESC - 26/03/2013

//SubMenu (Info)
var Str_Status="Status";
var Str_StsVcontrollers="Status Ctrls Virt.";
var Str_Phases="Phases";
var Str_Process="Process";
var Str_Input="Input";
var Str_Inputs="Inputs";
var Str_Fail_level="Fail Level";
var Str_Fail="Fail";
var Str_io_Time_out="Tiemeout";
var Str_Input_Output="Inputs Outputs";
var Str_All_Inputs="All Imputs";
var Str_About="About";					//M�rcio - 14/08/2012
var Str_OTU="Out Station";					//M�rcio - 14/08/2012

//SubMenu (Tools)
var Str_FilerManager="File Manager";
var Str_LogOut="LogOut";
var Str_Restart="Restart";
var Str_Save_Windows="Save Windows";
var Str_Orientation="Orientation";
var Str_Location="Location";
var Str_Debugger="Debugger";

//Window General
var Str_Conf_ETH="Configuracion Ethernet";
var Str_GP_MAC_Address="MAC Address:";
var Str_GP_MAC="Especifique la direccion MAC (Media Access Control)";
var Str_GP_ETH_Address="ETH0 Address:";
var Str_GP_IP="Especifique la direccion IP del controlador";
var Str_GP_Sub_Net_Mask_Address="Sub Net Mask:";
var Str_GP_NMSK="Set the net work sub net mask";
var Str_GP_DGWMAC_Address="Default Gate Way MAC:";
var Str_GP_DGWMAC="Direccion MAC correspondiente al puerta de enlace por descarte (default gate way)";
var Str_GP_DGW_Address="Default Gate Way IP:";
var Str_GP_DGW="Direccion ip correspondiente al puerta de enlace por descarte (default gate way)";
var Str_GP_Log_Out="Log Link";
var Str_GP_LOG="Especifique el destino de los logs";
var Str_GP_FUT="flashing frequency";
var Str_GP_FUC="Setup flashing frequency in Hz";
var Str_GP_FDT="Cycle Activity";
var Str_GP_FDC="Cycle Activity in %";
var Str_GP_Loops="Loops:";
var Str_GP_Loops_1="Especifique la cantidad de loops que tiene el sistema";
var Str_GP_Inputs="Imputs:";
var Str_GP_Inputs_1="Especifique la cantidad de inputs adicionales que tiene el sistema";
var Str_GP_Phases="Phases:";
var Str_GP_Phases_1="Especifica la cantidad de Movimiento que Tiene conectadas el controlador";
var Str_GP_PhasesV="Virtual Phase:";
var Str_GP_PhasesV_1="Especifica la cantidad de Movimiento Virtuales del controlador";
var Str_GP_PhasesG="Groups Phases:";
var Str_GP_PhasesG_1="Especifica la cantidad de Movimiento Grupales del controlador";
var Str_GP_Controllers="Controllers:";
var Str_GP_NC="Especifica la cantidad de controladores virtuales";
var Str_GP_TOET="Time Out Electrical Error:";
var Str_GP_TOEC="Especifica el tiempo de espera ante error electricos";
var Str_GP_TOCT="Time Out Consumption Error:";
var Str_GP_TOCC="Especifica el tiempo de espera antes aceptar un error de consumo";
var Str_GP_AOVT="Alerta de Sobre tension:";
var Str_GP_AOVC="Especifica el nivel de tension en que generara la alerta";
var Str_GP_NVT="Normal Voltage:";
var Str_GP_NVTC="Especifica el nivel de tension en que trabajan las lampars";
var Str_GP_EMVT="Error de baja tension:";
var Str_GP_EMVC="Especifica el nivel de baja tension";
var Str_GP_ECVT="Error de tension Critico:";
var Str_GP_ECVC="Especifica el nivel de tension Critico";
var Str_GP_WACTro="Codigo de Accesso Web User:";
var Str_GP_WACT="C&#243;digo de Acesso Web";
var Str_GP_WACTrw="Codigo de Accesso Web Admin:";
var Str_GP_WACC="Especifica Codigo de Accesso Web";
var Str_GP_Time_Capture_Inputs="Time Capture Imputs";
var Str_GP_TCIT="Time to capture inputs in minits";
var Str_GP_GPS_Port="GPS Port";
var Str_GP_GPS_Port_1="Seleccione el puerto en el que se encuentra conectado el GPS"; 
var Str_GP_Time_Zone="Time Zone GMT";
var Str_GP_Time_Zone_1="Seleccione la Zona horaria";
var Str_GP_Save_Conf="Save Config Basic";

var Str_reload_scheduler="Reload Scheduler";
//Window Controllers
var Str_Number="Number";
var Str_Name="Name";
var Str_Initial_Plan="Initial Plan";
var Str_Off_Plan="Lamp Off Plan";
var Str_flashing_Plan="Flashing Plan";
var Str_Sync_Ref="Ref. of Sync";
var Str_scheduler="Scheduler";
var Str_Server="Server";
var Str_Phase_server="Phase central";
var Str_Output_of_Error="Output of Error";
var Str_Intersection="Intersection";
var Str_Phase_server="Central Phase";

//ph conf
var Str_Fail_Report="Fail comunication";
var Str_Partial_Lack_Red="Partial Lack Red";
var Str_Partial_Lack_Yellow="Partial Lack Yellow";
var Str_Partial_Lack_Green="Partial Lack Green";
//wind flow conflic
var Str_Conflict="Conflict";
var Str_Upload="Upload";
var Str_Time_Green="time green";
var Str_Open_Flow="Open flow";
var Str_Close_Flow="Close flow";
var Str_Open="Open";
var Str_Delet="Delet";
var Str_filename="filename";

//Alerts
var Str_Alert_General="Debe abrir el panel de general primero";
var Str_Error_Model="Error, update Model in startup.ini";

//Window Lack
var Str_Lack_of_Lamps="Lack of Lamps";
var Str_Power_of_Red_Lamp="Power of Red Lamp";
var Str_Power_of_Yellow_Lamp="Power of Yellow Lamp";
var Str_Power_of_Green_Lamp="Power of Green Lamp";

//Window group 
var Str_Group_Phase="Group Phase";

//Debugger
var Str_Reload_All_Plans="Reload All Plans";
var Str_Reload="Reload";

//Serial Port
var Str_Baud_Rate="Baud Rate";
var Str_Parity="Parity";
var Str_Data_Bit="Data Bit";
var Str_Stop_Bits="Stop Bits";

//Iteris
var Str_Alert_Get_Comm="please Get Config Comms";
var Str_Iteris_Title="Config Iteris";
var Str_Parameter="Parameter";
var Str_Value="Value";
var Str_Refresh_Time="Refresh Time";
var Str_Select_Comm="Select Link";

//OPCT
var Str_OPCT_Parameters="Parameter";
var Str_OPCT_Description="Description";
var Str_Time_to_Normal_Mode="Time to normal mode";
var Str_comm="Comm";
var Str_offset_inputs="offset inputs";
var Str_slave="slave";
var Str_Group="Group";
var Str_Communication_port="Communication port";
var Str_Time_to_change_normal_mode="Time to change normal mode";

//def inputs
var Str_door="Door";
var Str_UPS="UPS";
var Str_Battery="Battery";
var Str_Flashing="Flashing";
var Str_Lamp="Lamp";
var Str_Stp_by_Stp="Stp by Stp";

// Flow Program

var Str_Add_Instruction="Add Instruction"
var	Str_Add="Add";
var	Str_Add_Variable="Add Variable";
var	Str_Add_Function="Add function";
//New Plan
var Str_Plans="Planos";
var Str_Plan="Plan";
var Str_Plan_Number="Plan Number";
var Str_GB_Plan_Number="Este debe ser mayor que 0 y menor que 255";
var Str_GB_Plan_Number_1="Introdusca el Numero de Plan";
var Str_Temp_All_Cicle="Temp All Cicle";
var Str_GB_Temp_All_Cicle="Introdusca el Tiempo de Ciclo";
var Str_Discrepancy="Discrepancy";	//defasagem
var Str_GB_Discrepancy="Introdusca el Defazaje";
var	Str_Safety_Cycle_Time="Safety Cycle Time";	//Tiempo de seguridad de Ciclo
var	Str_GB_Safety_Cycle_Time="Enter the Safety Cycle Time";	//Introdusca el Tiempo de seguridad de Ciclo
var Str_Conflict_File="Conflict File";
var Str_GB_Conflict_File="";	//Introdusca el nombre del archivo de control de conflictos y entre verdes
var Str_Qtd_Phase="Phases";
var Str_Number_Phase="Phase";             // Marcio - 16/08/2012
var Str_GB_Qtd_Phase="";	//Introdusca la cantidad de Movimiento que manejara el plan
var Str_Main="Crear Main";
var Str_Name_Stage="Name Of Stage";
var Str_GB_Name_Stage="";	//Este no puede poseer caracateres especiales ni espacios
var Str_Type_Stage="Type of Stage";
var Str_GB_Type_Stage="Select one type of stage";	//seleccione un tipo de estado
var Str_Stage="Stage";		//Paso
var Str_Stage_Normal="Normal";
var Str_Stage_EV="Entre Verde";
var Str_Color="Color";
var Str_Off="Apagado";
var Str_Red="Red";		//Rojo
var Str_Yellow="Yellow";		//Amarillo
var Str_Green="Green";		//Verde
var Str_Red_Yellow="Red_Yellow";		//Rojo+Amarillo
var Str_Green_Yellow="Green Yellow";		//Verde+Amarillo
var Str_no_Change="No Change"; 		//Sin Cambio
var Str_No_Flashing="No Flashing";
var Str_Flashing= "Flashing";		//Flashing
var Str_Flashing_Compensated="Flashing Compensated";	//Flashing Compensado
var Str_Ascendant="ascendant";
var Str_Falling="falling";
var Str_Lights_Out="Lights Out";	//Salida de Lampara
var Str_On="On";
var Str_Off="Off";
var Str_Other_Stage="Other Stage";

var Str_Clones_Sch="Check and Set to All PLC";
var Str_Holidays="Holidays";
var mn=['January','February','March','April','May','June','July','August','September','October','November','December'];
var Str_New_Time_scheduler="New Time scheduler";
var Str_DaysName=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var Str_Month="Month";
var Str_Day="Day";
var Str_weektable="Week Tabel";

//vari�veis para nova tela de gera��o de planos
var Str_NewEasy_Program="New Easy Program";					
var Str_NewEasy_Plans="Plans";								
var	Str_NewEasy_InitSeq="Make Init Seq.";					
var	Str_Est_Time_YellowP="Yellow Blink Time";				
var	Str_Est_Time_RedT="Red Total Time";						
var Str_Red_Total="Total Red";
var Str_Yellow_Blink="Blink Yellow";
	
//Gen�ricas
var Str_Mov="Move";											// - Troca string Mov: em Easy Program
var Str_Sync="Sync";				
var Str_Labels="Labels";			
var Str_Condic="Condition";			
var Str_Copy="Copy";				
var Str_seg = "security";			
var Str_flashing_Plan="Flashing Plan";

var Str_logic_state="Transitions";
var Str_ocup="Load";
var Str_restart_plan="Reload plans";
var Str_reload_page="Need to reload the web page";

var Str_Time = "Delay";

var Str_seg = "security";				
var Str_extend = "extended";			
var Str_maximum = "maximum";			
var Str_Comp_Program = "Assembler";		
var Str_Plan_Type = "Type of plan";		
var Str_Force_Plan = "Force plan";		
var Str_Rest_Plan = "Restore plans";	
var Str_Sinc = "Sync point";			
var Str_board = "Board type";			
var Str_boardH = "Select the board type";

var Str_FilePlan = "Plans";
var	Str_FileConf = "Conflict";
var	Str_FileSch  = "Scheduler";
var	Str_Files    = "Files";

var Str_no_select = "No selected";
var Str_Ocorr     = "Errors";			
var Str_Cod_Ocorr = "Error Code";		
var	Str_Descr_Ocorr = "Error Info";		
var	Str_DtHr_Ocorr = "Error Date / Hour";
var Str_Day = "Day";					
var	Str_Month = "Month";				
var	Str_Year = "Year";					
var Str_Seek = "Busca";					
var Str_New_Seek = "New Seek";			

var Str_tp_controller = "Controller type => ";
var Str_New_Easy_Seq = "Make init sequence";

var Str_Config_OTU = "Config OTU";

var Str_Ctrl_OTU   = "Control";
var	Str_Reply_OTU  = "Reply";
var Str_OTU_Command = "Command";
var	Str_OTU_Demand= "Demand";

var	Str_OTU_Menu1 = " IN/OUT Bits";
var	Str_OTU_Menu2 = " Between green";
var	Str_OTU_Menu3 = " Conflict Sequence";

var Str_OTU_CEV = " Colors";
var Str_Control = " Controls";
	
var Str_FO = "Focus off";
var	Str_Manual_CTRL = "Manual Control";
var Str_Excesso = "Excess of";	
var Str_Bord_off = "Lack of board";

var Str_GP_UART0="Especifique la velocidad de comunicacion para el USART 0 Ej.:9600";
var Str_GP_UART1="Especifique la velocidad de comunicacion para el USART 1 Ej.:9600";

var Str_PhaseV="Virtual Phase:";
var Str_PhaseG="Groups Phases:";

var Str_Config="Config";
var Str_Info="Info";
var Str_Add="Add";
var Str_Alerts="Alerts";
var Str_Attrib="Attributes";

var Str_Bit="Bit";
var Str_Byte="Byte";
var Str_Controller="Controller";
var Str_TC_in_Err ="Controller in Err";

var Str_Controller_Number="Controller Number";
var Str_Controller_Status="Controller Status";
var Str_Controllers_Parameters ="Config of Controllers";
var Str_Crit_Voltage="Critical Voltage";
var Str_Capture="Capture";

//var Str_Comms="Comms";
var Str_Cycle="Cycle";
var Str_Color="Color";
var Str_Code="Code";
var Str_Call="Call";
var Str_Close="Close";
var Str_Change="Change";

var Str_Conflict="Conflict";
var Str_Compile="Compile";
var Str_Description="Description";
var Str_Disable="disable";
var Str_Date="Date";
var Str_Door="Door";
var Str_Delet="Delet";
var Str_Errors="Errors";
var Str_Error="Error";
var Str_Edit="Edit";
var Str_Electrical="Electrical";

var Str_File="File";
var Str_Function="Function";

var Str_Flow="Flow";

var Str_Group="Group";
var Str_General_Status="General Status";
var Str_General_Parameters ="General Parameters";

var Str_Green="Green";
var Str_Integer="Integer";

var Str_Instruction="Instruction";

var Str_Phase_Errors_Disable="Disable Phases Errors";
var Str_Time_minimum_Green="Minimun time of green";
var Str_Time_minimum_Yellow="Minimun time of yellow";
var Str_Time_minimum_Red="Minimun time of red";
var Str_Time_maximum_Green="Maximun time of green";
var Str_Time_maximum_Yellow="Maximun time of yellow";
var Str_Time_maximum_Red="Maximun time of red";

var Str_Min_Voltage="Low Voltage";
var Str_Last_Time_Green="Last Green";
var Str_Jump_To="Jump to";
var Str_Memory="Memory";
var Str_Mode="Mode";
var Str_minimum="minimum";
var Str_Make="Make";

var Str_Ouputs="Ouputs";
var Str_of="of";
var Str_Partial="Partial";
var Str_Phase="Phase";


var Str_Red="Red";

var Str_language="Language";


var Str_Lamp="Lamp";
var Str_Lack_Red="Lack Red";
var Str_Lack_Yellow="Lack Yellow";
var Str_Lack_Green="Lack Green";
var Str_Err_Electric_Red="Err Electric Red";
var Str_Err_Electric_Yellow="Err Electric yellow ";
var Str_Err_Electric_Green="Err Electric Green";
var Str_Firmware="Firmware";
var Str_Received="Received";
var Str_Rx_id_ok="Received Ok";
var Str_MD_Off="Mode off";
var Str_MD_Error="Mode Error";
var Str_MD_Remote="Mode Remote";
var Str_MD_Manual="Mode Manual";
var Str_MD_Normal="Mode stand-alone";
var Str_MD_Normal_lock="Mode local scheduler";
var Str_New="New";

var Str_Normal_Voltage="Normal Voltage";
var Str_Voltage="Voltage";

var Str_Output="Ouput";
var Str_Offset="Offset";
var Str_Open="Open";
var Str_Over_Voltage="Over Voltage";
var Str_Phase_Status="Phase Status";
var Str_Port="Port";
var Str_Program="Program";
var Str_Plan="Plan";
var Str_Plans="Plans";
var Str_WAITING="WAITING";
var Str_READY="READY";
var Str_DELETED="DELETED";
var Str_WAITING_DATA="WAITING DATA";

var Str_Priority="Priority";
var Str_Passwords="Password";
var Str_Power="Power";
var Str_Plan_Editor="Plan editor";
var Str_Transmitted="Transmitted";
var Str_Temperature="Temperature";
var Str_MD_Flashing="Mode Flashing";
var Str_MD_StpByStp="Step by Step Mode";
var Str_Set="Set";


var Str_Size="Size";

var Str_Serial="Serial";
var Str_Conf_OPCT="Configuracionde protocolo Abierto";

var Str_Short="Short";
var Str_save="Save";
var Str_Type="Type";
var Str_Task_Name="Task Name";
var Str_Time="Time";
var Str_Time_out="Time Out (min)";
var Str_Task_Number="Task Number";

var Str_Conf_Links="Configuracion de enlaces"
var Str_Dgvp_Titel="Driver DgvP";
var Str_Dgvp_drv="Driver Name";
var Str_Dgvp_srvid="DGVP Server ID";
var Str_Dgvp_Link="DGVP Link";
var Str_Dgvp_ID="Device ID";
var Str_Dgvp_ipport="DGVP UDP port";
var Str_Dgvp_cmps="DGVP Info Description";

var Str_Conf_DgvP="Configuracionde de Reportes Automatico";
var Str_DgvP_Date				="Hora del equipo";
var Str_DgvP_Voltage		="Voltage";
var Str_DgvP_Mode				="Mode";
var Str_DgvP_Plan				="Numero de Plan";
var Str_DgvP_Cph				="Cantidad de Movimientos";
var Str_DgvP_Cio				="Cantidad de I/O";
var Str_DgvP_PhSts			="Color del Movimientos";
var Str_DgvP_PhStsR			="Retornos de Color";
var Str_DgvP_PhCurr			="Corriente de Movimientos";
var Str_DgvP_PhErrors		="Errores de Movimientos";
var Str_DgvP_IOsts			="Estado Detectores";

var Str_Uploading="Uploading";
var Str_Neg="Neg";

var Str_Vcontrollers="Virtual Controllers";
var Str_Voltage="Voltage";
var Str_Version="Version";

var Str_Variable="Variable";

var Str_Save_Conf="Save config";
var Str_Extra_Data="Extra Data";
var Str_DaysName=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var Str_Red="Red";
var Str_Yellow="Yellow";
var Str_Green="Green";

var Str_Lamp_Off="Foco Desligado";
var Str_Lamp_On="Foco ligado";
var Str_Service_On="Modu Test";
var Str_Error_Time_Stp="Time Error on step";

//******************************************* Fabiano Nogueira 10/04/2014
var Str_Error_ErrorCode = "Error Code";
var Str_Error_ErrorCodeSpecify="Specify error code to edit";
var Str_Error_LogInFile="Log in file";
var Str_Error_Flashing="Flashing";
var Str_Error_FlashingAll="Flashing All";
var Str_Error_All="All";
var Str_Error_RemoveMessage="Are you sure to remove error";
var Str_Error_Description="Description";
var Str_Error_SelectNewError="Selecect new error";
var Str_EV_RemoveMessage="Are you sure to remove last intergreen?";
var Str_Reset="Reset";

var OptSyncClock=[3,"Clock +3",2,"Clock +2",1,"Clock +1",0,"Clock +0"];
//var OptInputTyp=[0,"Saida Fija",1,"Entrada Fija",2,"Saida cambiable",3,"Entrada cambiable",5,"Loop Fijo"]		
var OptInputV=[0,"0",1,"1"];
var OptInputFlk=[0,"Count in 0",1,"Count in 1"];
var OptNEWPLNTYP=[-1,"Nuevo Plano!",0,"Nuevo plano Aislado",2,"Nuevo plano Sincronizado",1,"Nuevo plano Sincronizado BR"];
var OptPLNTYP=[0,"Aislado",1,"Sincronizado"];
var OptInputShin=[0,(Str_start_up_nivel+" 0"),1,(Str_start_up_nivel+" 1")];
var OptControllers=["1","1 "+Str_Controllers+"","2","2 "+Str_Controllers2+"","3","3 "+Str_Controllers2+"","4","4 "+Str_Controllers2+""];
var OptGpsLinks=["0",Str_Disable,"1","Serial 1","2","Serial 2","3","Interno"];

//******************************************* Fabiano Nogueira 10/04/2014
var Str_Error_Src_Not_found="Error Source not found";
var Str_Errors_Str=["Alert[0],Inicio de operacion - Version:%u.%u\n",
"Alert[1],LDO power not OK reset",
"Alert[2],Software reset",
"Alert[3],Watchdog reset",
"Alert[4],Brown-out reset",
"Alert[5],Power on reset",
"Alert[6],External reset",
"El modulo %s no puede utilizar el link %u ya que esta siendo utilizado por el modulo %s\n",
"Nao corresponde a uma instrucao valida\n",
"Div 0 [%s] script[%s] PC[%u] [%s]\n",
"Error en el tipo de argumento [%s] script[%s] PC[%u] [%s]\n",
"Error Sintaxis [%s] script[%s] PC[%u] [%s]\n",
"Error en el cantidad de argumentos [%s] script[%s] PC[%u] [%s]\n",
"Desbordamiento de memoria\n",
"No se encontro el destino del salto [%s] script[%s] PC[%u] [%s]\n",
"Retorno sin destino\n",
"No definido",
"Error Sintaxis [%s] script[%s] PC[%u] [%s]\n",
"Str_Script_Err_CT\n",
"El PLC [%s] No se pudo cambiar de plan [%s]-X->[%s]\n",
"Nao foi possivel alocar memoria para X \n",
"%s access to Sd Card\n",
"Nao foi poss�vel alocar a memoria para o arquivo de configuracao X\n",
"Error [%s] access to file %s\n",
"A fase %u de %s ja pertence a %s\n",
"A fase %u %s designada esta fora do intervalo \n",
"Nao foi possivel alocar memoria para o arquivo de configuracao %s \n",
"A conexao %u esta sendo usado por %s \n",
"Leitura no RTC - Erro de comunicacao %s\n",
"Escrita no RTC - Erro de comunicacao %s\n",
"Nivel de tensao alto %u\n",
"Nivel de tensao baixo %u\n",
"Nivel de tensao critico %u\n",
"Porta aberta\n",
"Porta fechada\n",
"Anel %s Chave de foco On\n",
"Anel %s Chave de foco Off\n",
"Anel %s mudou para modo Normal\n",
"Anel %s mudou para modo Remoto\n",
"Anel %s mudou para modo Off\n",
"Anel %s mudou para modo Piscante\n",
"Anel %s mudou para modo Manual\n",
"A comunicacao com a placa da fase %u foi registrada pela ultima vez por [%u] ms \n",
"Problema eletrico em lampada %s na fase: %u tension: %d\n",
"Problema eletrico em uma lampada vermelha na fase: %u \n",
"Problema eletrico em uma lampada amarela na fase: %u\n",
"Problema eletrico em uma lampada verde na fase: %u\n",
"Lampada vermelha queimada na fase: %u\n",
"Lampada amarela queimada na fase: %u\n",
"Lampada verde queimada na fase: %u\n",
"Falta total de lamparas en el movimiento:%u color:%s\n",
"Falta parcial de lampadas na fase: %u cor:%s\n",
"Sobre carga en el movimiento:%u color:%s\n",
"Erro em outro anel\n",
"O tempo de seguranca do ciclo do anel %s foi superado no ultimo sync %u<%u\n",
"Nao foi possivel alocar memoria para ler a agenda\n",
"Error %s access to file [%s]\n",
"Nome do arquivo de agenda nao configurado\n",
"Nao foi possivel encontrar a tabela [Holidays & Dates] in %s\n",
"EOF unspected looking [Holidays & Dates] in %s\n",
"Nao foi poss�vel encontrar a tabela [weeks]\n",
"A data nao tem uma tabela alocada\n",
"A instrucao e grande demais para o buffer de processamento\n",
"Conflito entre fase[%u].%X<->fase[%u].%X\n",
"Conflito entre fase[%u]<->fase[%u] tempo transcorrido %us tempo de seguranca:%us\n",
"Tempo minimo de verde [%ums]<[%ums] na fase: %u\n",
"Tempo minimo de vermelho [%ums]<[%ums] na fase: %u\n",
"O plano %s nao tem um arquivo de conflito designado\n",
"O plano %s nao tem um tempo de seguranca de ciclo configurado\n",
"Salto de estado n�o permitidos\n",
"Error de secuancia de color en fase[%u]\n",
"Nao foi possivel alocar memoria para o arquivo %s\n",
"Error %s access to file [%s]\n",
"O interpretador retornou um erro [%d] PC[%u] [%s]\n",
"O interpretador reportou um transbordo de memoria\n"];

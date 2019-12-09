loadjscssfile("entreverde","./EntVerde.js", "js");
loadjscssfile("ios","./IOs.js", "js");
var  error_index=0;
var  error=0;

function ShwFBNO0()
{	
	var out="";	
	var code = ErrorsCfg[error_index][0] == "All"?Str_Error_All:ErrorsCfg[error_index][0];
	var flag = ErrorsCfg[error_index][1];
	var flag_flashingAll = (flag & 48)?"":((flag & 8)?"":"checked=\"yes\"");
	var flag_flashing = (flag & 48)?"":"checked=\"yes\"";
	var flag_LogInFile = (flag & 4)?"":"checked=\"yes\"";		
	var combo = comboErrors();
						
		
	out +="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\" style=\"width:600px;\">\n";
	out +="	<tr align=\"left\">\n";
	out +="		<td>\n";
	out +="			<font size=\"1\" face=\"arial\">"+Str_Error_ErrorCode+"</font>\n";
	out +="		</td>\n";
	out +="		<td align=\"left\">\n";
	out +="			<input type=\"button\" class=\"INTEXT2\" id=\"GPbS\" value=\"&#9650;\" onclick=\"previousError();\" />\n";
	out +="			<font size=\"1\" face=\"arial\">\n";
	out +="				<input id=\"txtErrorCode\" class=\"INTEXT\" size=\"3\" maxlength=\"3\"  value=\""+code+"\" disabled=\"yes\"/>\n";
	out +="			</font>\n";
	out +="			<input type=\"button\" class=\"INTEXT2\" id=\"GPbS\" value=\"&#9660;\" onclick=\"nextError();\" />\n";
	out +="		</td>\n";
	out +="		<td>\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr bordercolor=\"Silver\">\n";
	out +="		<td align=\"middle\" colspan=\"3\">\n";
	out +="			"+(code==Str_Error_All?Str_Error_All:HTMLEncode(Str_Errors_Str[parseInt(code)]))+"\n";
	out +="		</td>\n";
	out +="	</tr>\n";
		
	out +="	<tr align=\"left\">\n";
	out +="		<td>\n";
	out +="			<font size=\"1\" face=\"arial\">\n";
	out +="				<input id=\"chkLogInFile\" type=\"checkbox\" class=\"INTEXT\" size=\"2\" maxlength=\"3\" "+flag_LogInFile+"/>"+Str_Error_LogInFile+"\n";
	out +="			</font>\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr align=\"left\">\n";
	out +="		<td>\n";
	out +="			<font size=\"1\" face=\"arial\">\n";
	out +="				<input id=\"chkFlashing\" type=\"checkbox\" class=\"INTEXT\" size=\"2\" maxlength=\"3\" "+flag_flashing+" onclick=\"enableFlashingAll();\" />"+Str_Error_Flashing+"\n";
	out +="			</font>\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr align=\"left\">\n";
	out +="		<td>\n";
	out +="			<font size=\"1\" face=\"arial\">\n";
	out +="				<input id=\"chkFlashingAll\" type=\"checkbox\" class=\"INTEXT\" size=\"2\" maxlength=\"3\" "+flag_flashingAll+"  />"+Str_Error_FlashingAll+"\n";
	out +="			</font>\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr bordercolor=\"Silver\">\n";
	out +="		<td align=\"right\" colspan=\"3\">\n";
	out +="			<img src=\"../../img/add.png\" width=\"30\" height=\"30\" border=\"0\" onclick=\"openNewErrorDiv();\"></img>\n";	
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr bordercolor=\"Silver\">\n";
	out +="		<td align=\"middle\" colspan=\"3\">\n";
	out +="			<div id=\"newError\" style=\"display:none;\">\n";
	out +=				combo;
	out +="				<img style=\"vertical-align: bottom;\" src=\"../../img/ok2.png\" width=\"30\" height=\"30\" border=\"0\" onclick=\"addError();\"></img>\n";
	out +="			</div>\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr bordercolor=\"Silver\">\n";
	out +="		<td align=\"middle\" colspan=\"3\">\n";
	out +="			<input type=\"button\" class=\"INTEXT2\" id=\"GPbS\" value=\""+Str_check_Conf+"\" onclick=\"CheckErrors();\" />\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr bordercolor=\"Silver\">\n";
	out +="		<td align=\"middle\" colspan=\"3\">\n";
	out +=			listErrors(error_index);
	out +="		</td>\n";
	out +="	</tr>\n";
	out +="</table>\n";
		
	return out;
}

function openNewErrorDiv()
{
	document.getElementById("newError").style.display = 'block';
}

function comboErrors()
{
	var combo = "";
	var achou = 0;
	
	combo += "<select id=\"errorList\" onchange=\"selectedError()\" style=\"height:30px;\" >\n";
	combo += "	<option value=\"0\">"+ HTMLEncode(Str_Error_SelectNewError) +"</option>\n";
	for (var i=9; i<Str_Errors_Str.length; i++)
	{
		for (var j=0; j<ErrorsCfg.length; j++)
		{
			if(ErrorsCfg[j][0] == i)
				achou = 1;			
		}
		if(achou == 1)
			achou = 0;		
		else
			combo += "	<option value=\""+ i +"\">"+ HTMLEncode("("+i+") "+Str_Errors_Str[i]) +"</option>\n";	
		
	}
	combo += "</select>\n";	
	return combo;
}

function selectedError()
{
	var list = document.getElementById("errorList");
	error = list.options[list.selectedIndex].value;
	
}

function listErrors(highlighted)
{
	var list = "";
	var code = "";
	var flag = 0;
	var flag_flashingAll="";
	var flag_flashing="";
	var flag_LogInFile="";
	var color="";
	var ok = "<img src=\"../../img/ok.png\" width=\"20\" height=\"20\" border=\"0\"></img>";
	
	
	list +="<table width=\"100%\" border=\"1\">\n";
	list +="	<tr bordercolor=\"Silver\">\n";
	list +="		<td align=\"middle\" colspan=\"3\">\n";
	list +=				"ID\n" ;
	list +="		</td>\n";
	list +="		<td align=\"middle\" colspan=\"3\">\n";
	list +=				Str_Error_Flashing+"\n" ;
	list +="		</td>\n";
	list +="		<td align=\"middle\" colspan=\"3\">\n";
	list +=				Str_Error_FlashingAll+"\n" ;
	list +="		</td>\n";
	list +="		<td align=\"middle\" colspan=\"3\">\n";
	list +=				Str_Error_LogInFile+"\n" ;
	list +="		</td>\n";
	list +="		<td align=\"middle\" colspan=\"3\">\n";
	list +=				"X"+"\n" ;
	list +="		</td>\n";
	list +="	</tr>\n";
	
	for (var i=0; i<ErrorsCfg.length; i++)
	{		
		code = ErrorsCfg[i][0] == "All"?Str_Error_All:ErrorsCfg[i][0];
		flag = ErrorsCfg[i][1];
		flag_flashingAll = (flag & 48)?"":((flag & 8) ?"":ok);
		flag_flashing = (flag & 48)?"":ok;
		flag_LogInFile = (flag & 4)?"":ok;		
		color= highlighted == i?"#3399FF":"#FFFFFF";

		list +="	<tr bordercolor=\"Silver\">\n";
		list +="		<td bgcolor=\""+color+"\" align=\"middle\" colspan=\"3\">\n";
		list +=				code +"\n" ;
		list +="		</td>\n";
		list +="		<td bgcolor=\""+color+"\" align=\"middle\" colspan=\"3\">\n";
		list +=				flag_flashing+"\n" ;
		list +="		</td>\n";
		list +="		<td bgcolor=\""+color+"\" align=\"middle\" colspan=\"3\">\n";
		list +=				flag_flashingAll+"\n" ;
		list +="		</td>\n";
		list +="		<td bgcolor=\""+color+"\" align=\"middle\" colspan=\"3\">\n";
		list +=				flag_LogInFile+"\n" ;
		list +="		</td>\n";
		list +="		<td bgcolor=\""+color+"\" align=\"middle\" colspan=\"3\">\n";
		if(code != Str_Error_All)
		{
			list +="		<img src=\"../../img/remove.png\" width=\"20\" height=\"20\" border=\"0\" onclick=\"removeError("+ i +");\"></img>\n";		
		}
		list +="		</td>\n";		
		list +="	</tr>\n";				
	}	
	list +="</table>\n";

	return list;
}

function enableFlashingAll()
{
	if(document.getElementById("chkFlashing").checked)
		document.getElementById("chkFlashingAll").disabled = false;
	else
	{		
		document.getElementById("chkFlashingAll").disabled = true;
		document.getElementById("chkFlashingAll").checked = false;
	}
}

function nextError()
{
	error_index++;
	if(error_index == ErrorsCfg.length)
		error_index = 0;
	ReDraw(conf_errors);
	enableFlashingAll();
}

function previousError()
{
	error_index--;
	if(error_index == -1)
		error_index = ErrorsCfg.length-1;
	ReDraw(conf_errors);
	enableFlashingAll();
}

function chkparm1(name, valeu)
{
	return true;
}

function removeError(index)
{
	code = ErrorsCfg[index][0] == "All"?Str_Error_All:ErrorsCfg[index][0];
	if (confirm(Str_Error_RemoveMessage + " " + code +'?')) 
	{
		ErrorsCfg.splice(index,1);	
		error_index = 0;
	}		
	ReDraw(conf_errors);
	enableFlashingAll();
}

function addError()
{
	var last = ErrorsCfg.length;
	var newError = [error,0];
	if(error != 0)
	{
		ErrorsCfg.splice(last,0,newError);
		error_index = 0;
	}
	error = 0;
	ReDraw(conf_errors);
	enableFlashingAll();
}

function CheckErrors()
{
	var code = document.getElementById("txtErrorCode").value;
	var flag = 0;
	flag +=	document.getElementById("chkLogInFile").checked?0:4;	
	flag +=	document.getElementById("chkFlashingAll").checked?0:8;
	flag +=	document.getElementById("chkFlashing").checked?0:48;			
	
	if(chkparm1("erros[].codigo", code) && chkparm1("erros[].flag", flag))
	{	
		ErrorsCfg[error_index][1] = flag;
	}
	else
	{
		alert("Error"); //Caixa de alerta com um botao "ok"
	}
	ReDraw(conf_errors);
	enableFlashingAll();
}

percent=95;

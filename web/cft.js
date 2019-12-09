var traffic_flow = new Array();
var traffic_flow_idx=0;
var traffic_flow_Open=0;
var Ctrlphases;
var FileNameCFT="";

function rcvCFT2(Datos)
{
	FileNameCFT=UpFile;
	var Cantflow=0;
	Datos=Datos.responseText;
	Datos=Datos.split("//Graphicflows\n");
	if(Datos.length>1)
	{
		Datos[1]=Datos[1].replace("//",""); //Replace troca os valores dentro de uma string
		CtrlIdx=parseInt(Datos[1]);
		Datos=Datos[2];
		Datos=Datos.split("//Flow:");
		Cantflow=Datos.length-1;
		traffic_flow.length=0;
		for(var i=1;i<Datos.length;i++)
		{
			Datos[i]=Datos[i].split(":");
			traffic_flow[i-1]= new Object();
			traffic_flow[i-1].phase=Datos[i][0];
			traffic_flow[i-1].Tgreen=Datos[i][1];
			traffic_flow[i-1].Cftphases=Datos[i][3].split(",");
			traffic_flow[i-1].FlowVec= new Array();
			Datos[i][2]=Datos[i][2].split(",");
			for(var j=1;j<Datos[i][2].length;j++)
			{
				Datos[i][2][j]=Datos[i][2][j].split("|");
				traffic_flow[i-1].FlowVec[j-1]=new Object();
				traffic_flow[i-1].FlowVec[j-1].x=Datos[i][2][j][0];
				traffic_flow[i-1].FlowVec[j-1].y=Datos[i][2][j][1];
			}
		}
		GetUrlB(PrgEd[SrcIdx].host+"/web/"+CtrlParms[CtrlIdx].Svg+"",loadArqCFT);
	}
	else
		alert("WOF\n"+Datos);
}

function rcvCFT(Datos)
{
	if (!GParms || !CtrlParms)
	{
		alert("Debe abrir el panel de parametros general primero, el de controladores y seleccione el controlador");
		return
	}	
	Datos=Datos.responseText;
	Datos=Datos.split('\n');
	for(var i=0;i<Datos.length;i++)
	{
		Datos[i]=Datos[i].split('[');
		for(var j=0;j<Datos[i].length;j++)
		{
			Datos[i][j]=Datos[i][j].replace("(",""); 
			Datos[i][j]=Datos[i][j].replace(")","");  // troca os valores dentro de uma string
			Datos[i][j]=Datos[i][j].replace("]",""); 
			Datos[i][j]=Datos[i][j].split(',');
		}
	}
	//----------------------------------------------------------------------------
	FileNameCFT=UpFile;
	Ctrlphases=CtrlParms[CtrlIdx].Phases.split(',');
	for(var i=1;i<Ctrlphases.length;i++)
	{
		if (parseInt(Ctrlphases[i])>=(parseInt(GParms.N_Actives_Phases)+parseInt(GParms.N_Actives_Phases_V)))
		{
			Ctrlphases.splice(i,1);
		}
	}
	txt=document.getElementById("sample7Title");
	txt.innerHTML=Str_Conflict;
	out="";
	document.getElementById("sample7").style.width=""+(50*Ctrlphases.length)+"px"
	document.getElementById("CFGINI").innerHTML=out;
	document.getElementById("CFGINI").style.height=""+(25*Ctrlphases.length)+"px";
	if (winList['sample7'])
		winList['sample7'].open();
		//----------------------------------------------------------
}

function SendCftFileUp2()
{
	var timeg=0;
	Ctrlphases=CtrlParms[CtrlIdx].Phases.split(',');
	for(var i=1;i<Ctrlphases.length;i++)
	{
		if (parseInt(Ctrlphases[i])>=parseInt(GParms.N_Actives_Phases))
		{
			Ctrlphases.splice(i,1);
		}
	}
	UpData="";
	for(var i=1;i<Ctrlphases.length;i++)
	{
		UpData+="("+Ctrlphases[i]+")";
		for(j=1;j<Ctrlphases.length;j++)
		{
			if(i!=j)
			{
				if(document.getElementById("CFT"+i+""+j+"").value)
				{
					timeg=document.getElementById("CFT"+i+""+j+"").value;
					if(timeg!="")
						UpData+="["+Ctrlphases[j]+","+timeg+"]";
				}
			}
		}
		UpData+="\n";
	}
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpFile=document.getElementById("FileNameCFT").value;
	seek=0;
	rcvUpFileFileEdit();
}

function loadArqCFT2()
{
	FileNameCFT=UpFile;
	Ctrlphases=CtrlParms[CtrlIdx].Phases.split(',');
	for(var i=1;i<Ctrlphases.length;i++)
	{
		LOG("ph"+Ctrlphases[i]);
		if (parseInt(Ctrlphases[i])>=(parseInt(GParms.N_Actives_Phases)+parseInt(GParms.N_Actives_Phases_V)))
		{
			Ctrlphases.splice(i,1);
			i--;
		}
	}
	txt=document.getElementById("sample7Title");
	txt.innerHTML=Str_Conflict;
	out="";
	out+="<table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" bgcolor=\"LightGrey\" width=\"100%\">\n";
	out+="\t<tr valign=\"middle\">\n";
	out+="\t\t<td align=\"center\">";
	out+="<input type=\"button\" class=\"INTEXT\" value=\""+Str_Upload+"\" onclick=\"SendCftFileUp2();\" />\n";
	out+="<input id=\"FileNameCFT\" type=\"text\" class=\"INTEXT\" value=\"";
	if(FileNameCFT.length>1)
		out+=FileNameCFT;
	else
		out+="sec00.sec";
	out+="\" size=\"8\" maxlength=\"8\"/>\n";
	out+="</td>\n";
	for(var j=1;j<Ctrlphases.length;j++)
	{
		out+="\t\t<td align=\"center\">";
		out+=""+Ctrlphases[j]+"";
		out+="</td>\n";
	}
	out+="\t</tr>\n";
	for(var i=1;i<Ctrlphases.length;i++)
	{
		out+="\t<tr valign=\"middle\">\n";
		out+="\t\t<td align=\"center\">";
		out+=""+Ctrlphases[i]+"";
		out+="</td>\n";
		for(var j=1;j<Ctrlphases.length;j++)
		{
			out+="\t\t<td align=\"center\">";
			if(i!=j)
			{
				out+="<input id=\"CFT"+i+""+j+"\" size=\"1\" maxlength=\"2\" class=\"INTEXT\" onkeyup=\"if(document.getElementById('CFT"+j+""+i+"').value=='')document.getElementById('CFT"+j+""+i+"').value=0;\" value=\"\" />";
//				out+="<input id=\"CFT"+i+""+j+"\" size=\"1\" maxlength=\"2\" class=\"INTEXT\" value=\"\" />";
			}
			out+="</td>\n";
		}
		out+="\t</tr>\n";
	}
	out+="</table>\n";
	document.getElementById("sample7").style.width=""+(50*Ctrlphases.length)+"px"
	document.getElementById("CFGINI").innerHTML=out;
	document.getElementById("CFGINI").style.height=""+(25*Ctrlphases.length)+"px";
	if (winList['sample7'])
		winList['sample7'].open();
		//----------------------------------------------------------
}

function loadArqCFT(Datos)
{
	Ctrlphases=CtrlParms[CtrlIdx].Phases.split(',');
	Datos=Datos.responseText;
	Datos=Datos.substring(Datos.indexOf("<svg "));
	out="<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" bgcolor=\"LightGrey\" width=\"100%\"><tr>\n";
	out+="<td align=\"left\">\n";
	out+=Datos;
	out+="\n</td>";
	out+="<td align=\"rigth\" valign=\"top\">\n";
	out+="<table border=\"1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FfFfFf\" bgcolor=\"LightGrey\" width=\"100%\">\n";
	out+="<tr><td align=\"center\" id=\"OptionCFT\">";
	out+="</td></tr>\n";
	out+="<tr><td align=\"left\" id=\"SelPhs\">";
	out+="</td></tr>\n";
	out+="<tr><td align=\"left\" id=\"SetGreT\">";
	out+="</td></tr>\n";
	out+="<tr><td align=\"center\" >\n<input id=\"EditVect\" type=\"button\" class=\"INTEXT2\" value=\""+Str_Open+"\" onclick=\"traffic_flow_Open^=1;svgaddobj2();\" />\n</td></tr>\n";
	out+="<tr><td align=\"center\" >\n<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Delet+"\" onclick=\"delTF();\" />\n</td></tr>\n";
	out+="<tr><td align=\"center\" >\n<input id=\"FileNameCFT\" type=\"text\" class=\"INTEXT\" value=\"";
	if(FileNameCFT.length>1)
		out+=FileNameCFT;
	else
		out+=Str_filename;
	out+="\" size=\"16\" maxlength=\"8\"/>\n</td></tr>\n";
	out+="<tr><td align=\"center\" >\n<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Upload+"\" onclick=\"SendCftFileUp();\" />\n</td></tr>\n";
	out+="</table>\n";
	out+="</td></tr>\n"
	out+="</table>\n";
	document.getElementById("sample8").style.width="600px"
	document.getElementById("DistFis").innerHTML=out;
	if (winList['sample8'])
		winList['sample8'].open();
	document.getElementById('bodyFile').setAttributeNS(null,'onclick','GetMouseClick(evt)');
	//----------------------------------------------------------
	var svgNS = "http://www.w3.org/2000/svg";
	var node = document.createElementNS(svgNS, "g");
	node.setAttributeNS(null, "id", "SvgCftObj");
	document.getElementById("bodyFile").appendChild(node);
	//----------------------------------------------------------
	svgaddobj2();
}

function MakeSec()
{
	var phases= new Array();
	var out2="\n//Graphicflows\n//"+CtrlIdx+"\n//Graphicflows\n";
	//----------------------------------------------------
	for(var i=0;i<traffic_flow.length;i++)
	{
		out2+="//Flow:"+traffic_flow[i].phase+":";
		out2+=traffic_flow[i].Tgreen+":";
		for(var j=0;j<traffic_flow[i].FlowVec.length;j++)
		{
			out2+=","+traffic_flow[i].FlowVec[j].x+"|"+traffic_flow[i].FlowVec[j].y;
		}
		out2+=":"+traffic_flow[i].Cftphases.toString()+"\n";
		if(traffic_flow[i].Cftphases.length)
		{
			if(!phases[traffic_flow[i].phase])
				phases[traffic_flow[i].phase]="";
			for(var j=0;j<traffic_flow[i].Cftphases.length;j++)
			{
				phases[traffic_flow[i].phase]+="["+traffic_flow[traffic_flow[i].Cftphases[j]].phase+","+traffic_flow[traffic_flow[i].Cftphases[j]].Tgreen+"]";
			}
		}
	}
	var out="";
	for(var i=0;i<phases.length;i++)
	{
		if(phases[i])
			out+="("+i+")"+phases[i]+"\n";
	}
	out+=out2;
	return out;
}

function addTF()
{
	traffic_flow_idx=traffic_flow.length;
	traffic_flow[traffic_flow_idx]= new Object();
	traffic_flow[traffic_flow_idx].phase="x";
	traffic_flow[traffic_flow_idx].Tgreen="1";
	traffic_flow[traffic_flow_idx].FlowVec= new Array();
	traffic_flow[traffic_flow_idx].Cftphases=new Array();
	traffic_flow_Open=1;
	svgaddobj2();
}

function delTF()
{
	if(traffic_flow[traffic_flow_idx])
		traffic_flow.splice(traffic_flow_idx,1);
	traffic_flow_Open=0;
	traffic_flow_idx=0;
	setTimeout("svgaddobj2();",1500); //Faz com que uma expressão seja avaliada após um determinado tempo (milissegundos)
}

function GetMouseClick(evt) 
{
  //to show coordinates
  var x=evt.clientX-document.getElementById("sample8").offsetLeft;
  var y=evt.clientY-document.getElementById("sample8").offsetTop;
  x-=13;
  y-=34;
  if(traffic_flow_Open==1 && traffic_flow[traffic_flow_idx].phase!="x")
  {
    var idx=traffic_flow[traffic_flow_idx].FlowVec.length;
	traffic_flow[traffic_flow_idx].FlowVec[idx]=new Object();
	traffic_flow[traffic_flow_idx].FlowVec[idx].x=x;
	traffic_flow[traffic_flow_idx].FlowVec[idx].y=y;
  }
  svgaddobj2();
}

function SendCftFileUp()
{
	if(traffic_flow_Open)
	{
		alert("The Flow "+traffic_flow_idx+" is open!");
		return;
	}
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData=MakeSec();
	UpFile=document.getElementById("FileNameCFT").value+".fct"
	seek=0;
	rcvUpFileFileEdit();
}

function svgaddobj2()
{
	var out="";
	//----------------------------------------------------
	out+="<select id=\"\" class=\"INTEXT\" onchange=\"\">\n";
	out+="<option onclick=\"addTF();\" >New</option>\n";
	for(var i=0;i<traffic_flow.length;i++)
	{
		out+="<option onclick=\"traffic_flow_idx="+i+";svgaddobj2();\"";
		if(i==traffic_flow_idx)
			out+=" selected=\"selected\"";
		out+=">"+Str_Flow+"["+traffic_flow[i].phase+"]</option>\n";
	}
	out+="</select>\n";
	document.getElementById('OptionCFT').innerHTML=out;
	//----------------------------------------------------
	out="";
	out+="<font size=\"1\" face=\"arial\"> "+Str_Phase+" </font>\n";
	out+="<select id=\"\" class=\"INTEXT\" onchange=\"\">\n";
	
	for(var i=0;i<Ctrlphases.length;i++)
	{
		if(Ctrlphases[i]!="")
		{
			out+="<option onclick=\"traffic_flow[traffic_flow_idx].phase="+Ctrlphases[i]+";svgaddobj2();\"";
			if(traffic_flow.length && Ctrlphases[i]==traffic_flow[traffic_flow_idx].phase)
				out+=" selected=\"selected\"";
			out+=" >"+Ctrlphases[i]+"</option>\n";
		}
	}
	out+="</select>\n";
	document.getElementById('SelPhs').innerHTML=out;
	//----------------------------------------------------
	out="";
	out+="<font size=\"1\" face=\"arial\">"+Str_Time_Green+"</font>\n";
	out+="<select id=\"\" class=\"INTEXT\" onchange=\"\">\n";
	for(var i=1;i<10;i++)
	{
			out+="<option onclick=\"traffic_flow[traffic_flow_idx].Tgreen="+i+";svgaddobj2();\"";
			if(traffic_flow.length && i==traffic_flow[traffic_flow_idx].Tgreen)
				out+=" selected=\"selected\"";
			out+=" >"+i+"seg</option>\n";
	}
	out+="</select>\n";
	document.getElementById('SetGreT').innerHTML=out;
	svgaddobj()
	//----------------------------------------------------
	if(traffic_flow_Open)
		document.getElementById('EditVect').value=Str_Close_Flow ;
	else
		document.getElementById('EditVect').value=Str_Open_Flow;
	//----------------------------------------------------
}

function svgaddobj()
{
	var cont = document.getElementById("SvgCftObj");
	//----------------------------------------------
	for(var i=0;i<cont.childNodes.length;i++)
	  cont.removeChild(cont.childNodes[i])
	//----------------------------------------------
	var atts;
	var svgNS = "http://www.w3.org/2000/svg";
	var node;
	var pathstr;
	var x1,y1,x2,y2,x3,y3,x4,y4;
	var i,j,k,h;
	//----------------------------------------------
	for(var i=0;i<traffic_flow.length;i++)
	{
		node = document.createElementNS(svgNS, "path");
		node.setAttributeNS(null, "id", "FlowVec"+traffic_flow[i].phase);
		//----------------------------------------------
		pathstr="";
		if(traffic_flow[i].FlowVec.length)
		{
			pathstr="m"+traffic_flow[i].FlowVec[0].x+","+traffic_flow[i].FlowVec[0].y+" ";
			traffic_flow[i].Cftphases.length=0;
			for(var j=1;j<traffic_flow[i].FlowVec.length;j++)
			{
				x1=traffic_flow[i].FlowVec[j-1].x;
				y1=traffic_flow[i].FlowVec[j-1].y;
				x2=traffic_flow[i].FlowVec[j].x;
				y2=traffic_flow[i].FlowVec[j].y;
				for(var k=0;k<traffic_flow.length;k++)
				{
					if(k!=i && traffic_flow[k].FlowVec.length>1)
						for(var h=1;h<traffic_flow[k].FlowVec.length;h++)
						{
							x3=traffic_flow[k].FlowVec[h-1].x;
							y3=traffic_flow[k].FlowVec[h-1].y;
							x4=traffic_flow[k].FlowVec[h].x;
							y4=traffic_flow[k].FlowVec[h].y;
							if(segmentsIntersect(x1,y1,x2,y2,x3,y3,x4,y4))
								if(traffic_flow[i].phase!=traffic_flow[k].phase)
									traffic_flow[i].Cftphases.push(k);
						}
				}
				pathstr+="l"+(x2-x1)+","+(y2-y1)+" ";
			}
		}
		//----------------------------------------------
		if(traffic_flow[i].Cftphases.length)
			atts = {"stroke":"#FF00FF","fill":"none","stroke-width":traffic_flow[i].Tgreen,"marker-end":"url(#se_marker_end_)"};
		else
			atts = {"stroke":"#000000","fill":"none","stroke-width":traffic_flow[i].Tgreen,"marker-end":"url(#se_marker_end_)"};
		if(i==traffic_flow_idx && traffic_flow_Open)
			atts = {"stroke":"#0000FF","fill":"none","stroke-width":traffic_flow[i].Tgreen,"marker-end":"url(#se_marker_end_)"};
		for(name in atts)
			node.setAttributeNS(null, name, atts[name]);
		//----------------------------------------------
		node.setAttributeNS(null, "d",pathstr);
		cont.appendChild(node);// */
	}
}

function direction(x1, y1, x2, y2, x3, y3)
{
 return (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
}

function onSegment(x1, y1, x2, y2, x3, y3)
{
 if (
   Math.min(x1, x2) <= x3 && x3 <= Math.max(x1, x2) &&
   Math.min(y1, y2) <= y3 && y3 <= Math.max(y1, y2)
 ) {
   return true;
 }
 return false;
}

function segmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4)
{
 var d1, d2, d3, d4;
 d1 = direction(x3, y3, x4, y4, x1, y1);
 d2 = direction(x3, y3, x4, y4, x2, y2);
 d3 = direction(x1, y1, x2, y2, x3, y3);
 d4 = direction(x1, y1, x2, y2, x4, y4);
 if (
   (d1 > 0 && d2 < 0 || d1 < 0 && d2 > 0) &&
   (d3 > 0 && d4 < 0 || d3 < 0 && d4 > 0)
 )
   return true;
 else if (d1 == 0 && onSegment(x3, y3, x4, y4, x1, y1))
   return true;
 else if (d2 == 0 && onSegment(x3, y3, x4, y4, x2, y2))
   return true;
 else if (d3 == 0 && onSegment(x1, y1, x2, y2, x3, y3))
   return true;
 else if (d4 == 0 && onSegment(x1, y1, x2, y2, x4, y4))
   return true;
 else
   return false;
}

percent=53;

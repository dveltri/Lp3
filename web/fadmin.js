
function UpDateGVars()
{
	UpPath=document.getElementById("path").value;
	UpFile=document.getElementById("file").value;
	if(UpType=="eil")
		UpData=compilador(document.getElementById("data").value);
	if(UpType=="bin")
		UpData=HexDecode(document.getElementById("data").value);
	if(UpType=="txt")
		UpData=document.getElementById("data").value;
	document.getElementById('FeditLen').innerHTML=UpData.length
}

function decompilador(str)
{
	var aStr = str;
	var temp=0;
	var strt="";
	var i = 0;
	var aRet="";
	while (i<(aStr.length-1)) 
	{
		i++;
		var iC = aStr[i].charCodeAt();
		if(aStr[i-1]!='=' && aStr[i]=='=' && aStr[i+1]!='=')
		{
			temp=aStr.substring(i+1,i+5);
			aRet+=("="+ByToInt(temp)+"");
			i+=4;
		}
		else 
			if(iC==0)
				aRet+=('\n');//aRet.push('&#'+iC+';');<br />
			else
				aRet+=aStr[i];
	}
	return aRet;
}

function compilador(Datos)
{
	var CFT="#CFT:";
	var MCT="#MCT:";
	var ptr;
	var ValorVar=0;
	var ptrT;
	var Salida="\0";
	var linea="";
	Datos+="\n";
	//-----------------------------------------------------------------
	ptr=Datos.indexOf("#CFT:");
	if(ptr!=-1)
		CFT=RemoveUnuseChar(Datos.substring(ptr,Datos.substring(ptr).indexOf("\n")+ptr));
	ptr=Datos.indexOf("#MCT:");
	if(ptr!=-1)
		MCT=RemoveUnuseChar(Datos.substring(ptr,Datos.substring(ptr).indexOf("\n")+ptr));
	//------------------------------------------------------------------
	ptr=0;
	while(ptr<Datos.length)
	{
		linea=Datos.substring(ptr,Datos.substring(ptr).indexOf("\n")+ptr);
		linea=RemoveUnuseChar(linea);
		if(linea.charAt(0)!="#")
		{
			if(linea!="")
			{
				ptrT=linea.indexOf("==");
				if(ptrT==-1)
				{
					ptrT=linea.indexOf("!=");
					if(ptrT==-1)
					{
						//ptrT=linea.indexOf("=");
						linea=linea.split("=");
						if (linea.length>1)
						{
							ValorVar=parseInt(linea[1]);
							linea=linea[0].split(" ");
							if (linea.length>1)
								linea=linea[1];
							else
								linea=linea[0];
							linea=linea + "="
							linea+=String.fromCharCode((ValorVar&255),((ValorVar/256)&255),((ValorVar/65536)&255),((ValorVar/16777216)&255));
						}
					}
				}
				Salida+=linea+"\0";
			}
		}
		ptr=Datos.substring(ptr).indexOf("\n")+ptr+1;
	}
	Salida+="#MD\0"+CFT+"\0"+MCT+"\0"
	//alert(Salida.length +" "+ HTMLEncode(Salida));
	//alert("compilado");
	return Salida;
}

function getfls()
{
	GetUrlB(PrgEd[SrcIdx].host+'/'+PrgEd[SrcIdx].DGVFTP,rcvFileAdmin);
}

function rcvFileEdit(Datos)
{
	if(Datos)
	{
		Datos=Datos.responseText;
		if(UpFile.indexOf(".bin")!=-1 || UpFile.indexOf(".dgv")!=-1)
			Datos=HexEncode(Datos);
		Datos=HTMLEncode(Datos);
		rcvFileEdit2(Datos);
	}
	else
		rcvFileEdit2("");
}

function checktype()
{
	var Fname=document.getElementById("file").value
	if(Fname.indexOf("plan")!=-1 || Fname.indexOf("dgv")!=-1)
	{
		document.getElementById('PlanIterF').innerHTML="\
		<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Upload+" "+Str_Compile+"\"  onclick=\"uploadCompile();\" />\n\
		<input type=\"button\" class=\"INTEXT2\" value=\""+Str_Flow_Program+"\" onclick=\"StartFlowProg(document.getElementById('file').value,document.getElementById('data').value);\" />\n";
	}
	else
	{
		document.getElementById('PlanIterF').innerHTML="";
	}
}

function uploadCompile()
{
	var Fname=document.getElementById("file").value
	UpType="eil";
	UpDateGVars();
	UpFile=document.getElementById("file").value;
	UpFile=UpFile.substring(0,UpFile.indexOf("."));
	if(Fname.indexOf("dgv")!=-1)
	 UpFile+=".dgv";
	else
	 UpFile+=".eil";
	rcvUpFileFileEdit();
}

function rcvFileEdit2(Datos)
{
	OUT=document.getElementById("sample13Title");
	OUT.innerHTML=Str_Edit;
	OUT="";
	OUT+="<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bordercolor=\"LightGrey\" border=\"0\" bgcolor=\"LightGrey\" align=\"center\" class=\"table1\">";
	OUT+="<tr>\
		<td align=\"left\"><font size=\"2\" face=\"arial\">Path</font></td>\n\
		<td align=\"right\"><font size=\"2\" face=\"arial\"><input id=\"path\" type=\"text\" class=\"INTEXT\" value=\""+UpPath+"\" /></font></td>\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"left\"><font size=\"2\" face=\"arial\">File</font></td>\
		<td align=\"right\"><font size=\"2\" face=\"arial\"><input id=\"file\" type=\"text\" class=\"INTEXT\" onkeyup=\"checktype()\" value=\""+UpFile+"\" /></font></td>\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"left\"><font id=\"mode\" size=\"2\" face=\"arial\"></font></td>\
		<td align=\"right\"></td>\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"left\">\n\
		<input id=\"btnup\" type=\"button\" class=\"INTEXT2\" value=\""+Str_Upload+" "+Str_File+"\" onclick=\"UpType='txt';UpDateGVars();rcvUpFileFileEdit();\" />\
		</td>\
		<td align=\"right\">\n\
		<font size=\"2\" face=\"arial\">Length</font>\n\
		<font id=\"FeditLen\" size=\"2\" face=\"arial\">0</font>\n\
		</td>\n\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"left\">\n\
		<font id=\"PlanIterF\" ></font>\n\
		</td>\n\
		<td align=\"right\">\n\
		</td>\n\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"middle\" colspan=\"2\" >\n\
	    <textarea  id=\"data\" class=\"INTEXT\" rows=\"33\" cols=\"100\" onkeyup=\"UpDateGVars();\" >"+Datos+"</textarea><br />\n\
		</td>\n\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"middle\" colspan=\"2\" ><font>-</font>\n\</td>\n\
	</tr>\n";
	OUT+="</table>";
	document.getElementById("FileEdit").innerHTML=OUT;
	document.getElementById('FeditLen').innerHTML=document.getElementById('data').value.length;
	checktype();
	if (winList['sample13'])
	{
		winList['sample13'].open();
		document.getElementById("sample13").style.width="500px";
//		document.getElementById("CFGINI").style.height="150px";
	}
}

function rcvUpFileFileEdit(Datos)
{
	UpPath=UpPath+"/";
	UpPath=Remplace(UpPath,'//','/');
	if(!SendOrAlert)
	{
		alert("to:"+PrgBk[TrgIdx].host+"\nMode:"+UpMode+"\nPath:"+UpPath+"\nfile:"+UpFile+"\nseek:"+seek+"\n\n"+UpData);
		seek=0;
		document.getElementById("LOADING").style.visibility = 'hidden';
		UpMode=0;
		return;
	}
	var len,data;
	var tlen=0;
	//----------------
	if(UpData.length==0)
		UpData=" ";
	len=UpData.length;
	data=UpData;
	ShwPBar("UpLoading "+UpPath+UpFile+"..");
	percent=((100/len)*seek);
	PBarUpDate();
	//----------------
	if(seek<len)
	{
		if(Datos)
		{
			if(Datos.status==200)
			{
				rcvFileAdmin(Datos);
			}
			else
			{
				tlen=seek;
				if(seek>=Maxlen)
					tlen=Maxlen;
				seek-=tlen;
			}
			if(Datos.status==500)
			{
				seek=0;
				percent=0;
				PBarOff();
				setTimeout("UpMode=0;",50);
			}
		}
		tlen=(len-seek);
		if(tlen>Maxlen)
			tlen=Maxlen;
		if(UpFile.indexOf(".eil")!=-1)
			GetUrlB(PrgBk[TrgIdx].host+"/"+PrgBk[TrgIdx].DGVFTP+"?mode="+UpMode+"&path="+UpPath+"&file="+UpFile+"&seek="+seek+"&len="+tlen+"&data="+escape(data.substring(seek,(seek+tlen+1))),rcvUpFileFileEdit);
		else
			GetUrlB(PrgBk[TrgIdx].host+"/"+PrgBk[TrgIdx].DGVFTP+"?mode="+UpMode+"&path="+UpPath+"&file="+UpFile+"&seek="+seek+"&len="+tlen+"&data="+encodeURIComponent(data.substring(seek,(seek+tlen+1))),rcvUpFileFileEdit);
		seek+=data.substring(seek,(seek+tlen)).length;
	}
	else
	{
		rcvFileAdmin(Datos);
		seek=0;
		percent=0;
		PBarOff();
		setTimeout("UpMode=0;",50);
	}
}

function sortfuncInfo(a,b)
{
	return((b.Info)>(a.Info));
}

function sortfuncName(a,b)
{
	return((b.Name)<(a.Name));
}

function rcvFileAdmin(Datos)
{
	FileList=FileList2Txt(Datos);
	FileList=FileList2Array(FileList);
	FileList=FileList2Obj(FileList);
}

function FileList2Txt(Datos)
{
	FileList.length=0;
	Datos=Datos.responseText;
	FileList=Datos.trim();
	return FileList;
}

function FileList2Array(FileList)
{
	FileList=FileList.split(",");
	return FileList;
}

function FileList2Obj(FileList)
{
	var idx=0;
	var Flt="";
	Flt=FilterFileList.split(",");
    var Datos=FileList.slice();
	var path=Datos[0].trim();
	FileList.length=0;
	for(var i=1;i<Datos.length-4;i+=4)
	{
		Datos[0+i]=Datos[0+i].trim();
		for(var j=0;j<Flt.length;j++)
			if(Datos[0+i].indexOf(Flt[j])!=-1)
				break;
		if(j!=Flt.length)
		{
			idx=FileList.length;
			FileList[idx]=new Object();
			FileList[idx].Path=path;
			FileList[idx].Name=Datos[0+i].trim();
			FileList[idx].Size=Datos[1+i].trim();
			FileList[idx].Date=Datos[2+i].trim();
			FileList[idx].Info=Datos[3+i].trim();
		}
	}
	FileList=FileList.sort(sortfuncName);
	FileList=FileList.sort(sortfuncInfo);
	return FileList;
}

function ShwFileAdmin()
{
	var i=0;
	var ptr=0;
	var OUT;
	var path=FileList[0].Path;
	var temp;
	OUT="";
	OUT+="<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bordercolor=\"#ffffff\" border=\"0\" bgcolor=\"#ffffff\" align=\"center\" class=\"table1\">\
	<tr bgcolor=\"#808080\" align=\"center\">\
		<td width=\"37\"><font size=\"2\" face=\"arial\"> </font></td>\
		<td><font size=\"2\" face=\"arial\"> "+Str_Name+"</font></td>\
		<td><font size=\"2\" face=\"arial\"> "+Str_Size+"</font></td>\
		<td><font size=\"2\" face=\"arial\"> "+Str_Date+"</font></td>\
		<td><font size=\"2\" face=\"arial\"> "+Str_Info+"</font></td>\
		<td><font size=\"2\" face=\"arial\"> </font></td>\
	</tr>\n"
	for(var i=0;i<FileList.length;i++)
	{
		OUT+="<tr align=\"center\">\n";
		OUT+="<td align=\"right\"><font size=\"1\" face=\"arial\">\n";
		if(FileList[i].Info.indexOf("D")!=-1)
		{
			OUT+="<img src=\"../../img/folder.jpg\" width=\"16\" height=\"16\" border=\"0\" />\n";
		}
		else
		{
			switch(FileList[i].Name)// nombres espesificos
			{
				case "dgvsoft.ini":
				break;
			}
			switch(FileList[i].Name.split(".")[1])// extenciones espesificas
			{
				case "fct":
					OUT+="<a href=\"\" onclick=\"GetUrlB('"+PrgEd[SrcIdx].host+(path+"/").replace("//","/")+HTMLEncode(FileList[i].Name)+"',rcvCFT2);UpFile='"+HTMLEncode(FileList[i].Name)+"';";
					OUT+="return false\">\n<img src=\"escudo.png\" width=\"16\" height=\"16\" border=\"0\" /></a> ";
				break;
			}
			if(FileList[i].Name.indexOf("plan")!=-1 && FileList[i].Name.indexOf(".txt")!=-1)//planes
			{
				OUT+="<a href=\"\" onclick=\"GetUrlB('"+PrgEd[SrcIdx].host+(path+"/").replace("//","/")+HTMLEncode(FileList[i].Name)+"',RcvFlowProg);UpFile='"+HTMLEncode(FileList[i].Name)+"';";
				OUT+="UpType='txt';";
				OUT+="return false\">\n<img src=\"";
				OUT+="flow0.gif";
				OUT+="\" width=\"16\" height=\"16\" border=\"0\" /></a> ";
			}
			
			switch(FileList[i].Name.split(".")[1])// block de notas habilitado
			{
				case "jpg":
				break;
				case "sch":
				case "eil":
				case "esy":
				case "es2":						//Marcio - TESC - nova extensão para arquivo ASM
				case "es3":						//
				case "sec":
				case "fct":
				case "ini":
				case "INI":
				case "txt":
				case "phg":
				case "js":
				case "dgv":
				case "xht":
				case "htm":
				case "css":
				default:
					OUT+="<a href=\"\" onclick=\"GetUrlB('"+PrgEd[SrcIdx].host+(path+"/").replace("//","/")+HTMLEncode(FileList[i].Name)+"',rcvFileEdit);UpFile='"+HTMLEncode(FileList[i].Name)+"';UpPath='"+path+"';";
					OUT+="UpType='txt';";
					OUT+="return false\">\n<img src=\"";
					OUT+="../../img/efile.png";
					OUT+="\" width=\"16\" height=\"16\" border=\"0\" /></a> ";
				break;
			}
		}
		OUT+="</font></td>\n";
		//---------------------------------------------------------------
		OUT+="<td align=\"left\"><font size=\"1\" face=\"arial\">";
		if(FileList[i].Info.indexOf("D")==-1)
			OUT+="<a href=\""+PrgEd[SrcIdx].host+(path+"/").replace("//","/")+HTMLEncode(FileList[i].Name)+"?WAC="+WAC+"\" target=\"_blank\">"+HTMLEncode(FileList[i].Name)+"</a>";
		else
			OUT+="<a href=\"\" onclick=\"GetUrlB('"+PrgEd[SrcIdx].host+"/"+PrgEd[TrgIdx].DGVFTP+"?path="+(path+"/"+HTMLEncode(FileList[i].Name)).replace("//","/")+"',rcvFileAdmin);return false\">"+FileList[i].Name+"</a>";
		OUT+="</font></td>\n";
		//---------------------------------------------------------------
		OUT+="<td align=\"right\"><font size=\"1\" face=\"arial\">"+FileList[i].Size+"bytes</font></td>\n";
		//---------------------------------------------------------------
		OUT+="<td><font size=\"1\" face=\"arial\">"+FileList[i].Date+"</font></td>\n";
		//---------------------------------------------------------------
		OUT+="<td><font size=\"1\" face=\"arial\">"+FileList[i].Info+"</font></td>\n";
		//---------------------------------------------------------------
		OUT+="<td><font size=\"1\" face=\"arial\">";
		if(FileList[i].Info.indexOf("D")==-1)
		{
			OUT+="\n<a href=\"\" onclick=\"if(confirm('"+Str_Delet+" ["+HTMLEncode(FileList[i].Name)+"]?')){GetUrlB('"+PrgEd[SrcIdx].host+"/"+DGVFTP+"?mode=256&#38;path="+path+"&#38;file="+HTMLEncode(FileList[i].Name)+"',rcvFileAdmin);}return false\">\n<img src=\"";
			OUT+="../../img/defile.png";
			OUT+="\" width=\"16\" height=\"16\" border=\"0\" /></a> ";
		}
		OUT+="</font></td>\n";
		//---------------------------------------------------------------
	OUT+="</tr>\n";
	}// */
	OUT+="</table>";
	return OUT;
}

percent=45;

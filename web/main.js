var ResourceLoad=0;
var onlongtouch; 
var timer;
var url="";
var touchduration = 500; //length of time we want the user to touch before we do something
function touchstart(){timer = setTimeout(onlongtouch, touchduration);}
function touchend(){if (timer)cleartimeout(timer);}
onlongtouch = function(){alert("hola");};

/*---------------------------------------------------------------------------*/
function Start()
{
	url=document.location.href;
	SvrIp=getparameter("://");
	if(url.indexOf("srv")!=-1)
		srvacc=1;	//acces from transit central
	//--------------------------
	if(url.indexOf("LogEn")!=-1)
		Log_En=1;
	if(url.indexOf("Log_En")!=-1)
		Log_En=1;
	if(url.indexOf("Log=1")!=-1)
		Log_En=1;
	if(url.indexOf("Log=0")!=-1)
		Log_En=0;
	if(url.indexOf("Log=")!=-1)
		Log_En=parseInt(getparameter("Log="));
	//--------------------------
	if(!SvrIp)
	{
		SvrIp="localhost";
	}
	else
	{
	}
	percent=0;
	WebStart();
}

function WebStart()
{
	switch(percent)
	{
		case 0:
			ClearAllHome();
			ShwPBar('Cargando recursos..');
			loadjscssfile("LibJs5","./js1.js", "js");// Check and Consistence
		break;
		case 5:
			if(language=='PO')
				loadjscssfile("LangSet","./po.js", "js");
			if(language=='ES')
				loadjscssfile("LangSet","./es.js", "js");
		break;
		case 7:
			if(language=='PO')
				LanguageToPO();
			if(language=='ES')
				LanguageToES();
			loadjscssfile("LibJs1","./js2.js", "js"); //get all conf
		break;
		case 15:
			loadjscssfile("LibJs2","./js3.js", "js");// edit all conf
		break;
		case 25:
			loadjscssfile("LibJs3","./js4.js", "js");// send all conf
		break;
		case 28:
			loadjscssfile("LibJs4","./js5.js", "js");// moni all conf
		break;
		case 38:
			loadjscssfile("TrasportApi","./Xml.js", "js");
		break;
		case 44:
			loadjscssfile("FadminApi","./fadmin.js", "js");
		break;
		case 45:
			percent=51;
		break;
		case 51:
			loadjscssfile("CftApi","./cft.js", "js");
		break;
		case 53:
			loadjscssfile("deepCopy","./deepCopy.js", "js");
		break;
		case 56:
			loadjscssfile("SvrConf","./SvrConf.js", "js");
		break;
		case 58:
			loadjscssfile("ProgLib","./ProgLib.js", "js");
		break;
		case 70:
			loadjscssfile("PrgEs3Lcl1","./PrgEs3Lcl1.js", "js");
		break;
		case 75:
			loadjscssfile("PrgEs3Syc1","./PrgEs3Syc1.js", "js");
		break;
		case 80:
			loadjscssfile("PrgEs3Syc2","./PrgEs3Syc2.js", "js");
		break;
		case 86:
		loadjscssfile("ARNE","./ARNE.js", "js");
		break;
		case 90:
			loadjscssfile("FBNO","./FBNO.js", "js");
		break;
		case 95:
			loadjscssfile("schedcod","./sch.js", "js");
		break;
		case 100:
			percent=0;
			percent2=0;
			PBarOff();
			request=GetUrl('../AddCtrl.jsp?Cmd=temps',RcvSvrSrc);
			ShwAddSrcCtl();
			ObjInterval=setInterval("fnc0()",100); //executa fnc0 em 50 e 50 milissegundos
			//----------------------------------
			var ip=getparameter("remotehost=");
			if (ip)
			{
				WAC="12345";
				AddSrcNow(ip,WAC,1);
			}
			return;
		break;
		
	}
	PBarUpDate();
	setTimeout("WebStart()",500); //Faz com que uma expressão seja avaliada após um determinado tempo ( 500 milissegundos)
}
/*---------------------------------------------------------------------------*/
function ClearAllHome()
{
	Resource.MoniBit=0;
	document.getElementById("ListSrc").innerHTML="";
	document.getElementById("AddSrc").innerHTML="";
	//------------------------------------------
	document.getElementById("HOME0").innerHTML="";
	document.getElementById("HOME1").innerHTML="";
	document.getElementById("HOME2").innerHTML="";
	document.getElementById("HOME3").innerHTML="";
	document.getElementById("HOME4").innerHTML="";
	if(Log_En)
	{
		document.getElementById("HOME4").innerHTML="<input type=\"button\" value=\"Clean Log\" onclick=\"document.getElementById('dgv').innerHTML='';\" /><br/>\n";
		document.getElementById("HOME4").innerHTML+="<input type=\"checkbox\" onchange=\"FoceCompile=this.checked\"/>Compile always<br />\n";
	}
}
/*---------------------------------------------------------------------------*/
function GenOptiontyp(typ,Item)
{
	var out="";
	if(typ.Type=="int")
	{
		for(var i=typ.Range[0][0];i<typ.Range[0][1];i+=typ.Unit)
		{
			out+="<option value=\""+i+"\"";
			if(i==Item)out+=" selected=\"selected\"";
			out+=">"+Math.round(i*typ.Show)+"</option>\n";
		}
	}
	return out;
}

function GenOptions(Vect,Item)
{
	var out="";
	for(var i=0;i<Vect.length;i+=2)
	{
		out+="<option value=\""+Vect[i]+"\"";
		if(Vect[i]==Item)out+=" selected=\"selected\"";
		out+=">"+Vect[i+1]+"</option>\n";
	}
	return out;
}

function GetOption(Vect,Item)
{
	var out="";
	for(var i=0;i<Vect.length;i+=2)
	{
		if(Vect[i]==Item)
		 return Vect[i+1];
	}
	return "";
}

function GenOptionsVi(Vect,Valor)
{
	var out="";
	for(var i=0;i<Vect.length;i++)
	{
		out+="<option value=\""+Vect[i]+"\"";
		if(Vect[i]==Valor)out+=" selected=\"selected\"";
		out+=">"+Vect[i]+"</option>\n";
	}
	return out;
}
/*---------------------------------------------------------------------------*/
function getparameter(Parm)
{
	var url=document.location.href;
	if(url.search(Parm)<0)
		return null;
	url=url.substr(url.search(Parm)+Parm.length);
	if(url.indexOf("?")!=-1)
		url=url.substr(0,url.indexOf("?"));
	if(url.indexOf("&")!=-1)
		url=url.substr(0,url.indexOf("&"));
	if(url.indexOf("/")!=-1)
		url=url.substr(0,url.indexOf("/"));// */
	return url;
}

function ConvToInt(vec)
{
	var j=0;
	while(j<vec.length) 
	{
		vec[j]=vec[j].trim();
		if(vec[j]=="" || isNaN(parseInt(vec[j]))==true)
		{
			vec.splice(j,1);
		}
		else
		{
			vec[j]=parseInt(vec[j]);
			j++;
		}
	}
	return vec
}

function CountItem(Aray,Item)
{
	var ret=0;
	for(var i=0;i<Aray.length;i++)
	{
		if(Item!=Aray[i])ret++;
	}
	return ret;
}

function ByToInt(Datos)
{
	var temp=0;
	temp+=Datos.charCodeAt(3)<<24;
	temp+=Datos.charCodeAt(2)<<16;
	temp+=Datos.charCodeAt(1)<<8;
	temp+=Datos.charCodeAt(0);
	return temp;
}
function ByToSht(Datos)
{
	var temp=0;
	temp+=Datos.charCodeAt(1)<<8;
	temp+=Datos.charCodeAt(0);
	return temp;
}
function roundNumber(num, dec) 
{
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
function delay(millis)
{
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < millis);
} 
/*---------------------------------------------------------------------------*/
function LOG(log)
{
	log=""+log;
	if(Log_En && log)document.getElementById('dgv').innerHTML+=HTMLEncode(log)+"<br />";
}
function ClsLOG()
{
	if(Log_En)
		document.getElementById('dgv').innerHTML="";
}
function LOGdirect(log)
{
	log=""+log;
	if(Log_En)document.getElementById('dgv').innerHTML=HTMLEncode(log)+"<br />";
}
/*---------------------------------------------------------------------------*/
function ShwOptions()
{
	var retorno="<input type=\"button\" class=\"INTEXT2\" onclick=\"percent=0;LoadConf();return 0;\" value=\"Cargar Configuracion\" />";
	return retorno;
}
/*---------------------------------------------------------------------------*/
function ShwPBar(Texto)
{
	//document.getElementById("LOADINGTXT2").innerHTML="";
	document.getElementById("LOADINGTXT").innerHTML="";
	document.getElementById("LOADING").style.visibility = "visible";
	Texto=Remplace(Texto,'//','/');
	document.getElementById("LOADINGTXT").innerHTML=Texto;
	if(percent>=0 && document.getElementById("LOADINGTXT").innerHTML!="")
		document.getElementById("bar1").style.visibility = 'visible';
	if(percent2>0)
		document.getElementById("bar2").style.visibility = 'visible';
	//document.getElementById("LOADING").style.zIndex= winCtrl.maxzIndex+2;
}
function ShwPBar(Texto,Title)
{
	//document.getElementById("LOADINGTXT2").innerHTML="";
	if(Title)
		document.getElementById("LOADINGTXT2").innerHTML=Title;
	document.getElementById("LOADINGTXT").innerHTML="";
	document.getElementById("LOADING").style.visibility = "visible";
	Texto=Remplace(Texto,'//','/');
	document.getElementById("LOADINGTXT").innerHTML=Texto;
	if(percent>=0 && document.getElementById("LOADINGTXT").innerHTML!="")
		document.getElementById("bar1").style.visibility = 'visible';
	if(percent2>0)
		document.getElementById("bar2").style.visibility = 'visible';
	//document.getElementById("LOADING").style.zIndex= winCtrl.maxzIndex+2;
}
function PBarOff()
{
	if(percent==0)
		document.getElementById("bar1").style.visibility = 'hidden';
	if(percent2==0)
		document.getElementById("bar2").style.visibility = 'hidden';
	if(percent==0 && percent2==0)
		document.getElementById("LOADING").style.visibility = 'hidden';
}
function PBarUpDate()
{
	if(percent>=0 && document.getElementById("LOADINGTXT").innerHTML!="")
	{
		document.getElementById("progressbar").setAttribute("width",percent*4);
		document.getElementById("progressbarT").firstChild.nodeValue="% "+Math.round(percent);
		document.getElementById("bar1").style.visibility = 'visible';
	}
	if(percent2>0)
	{
		document.getElementById("progressbar2").setAttribute("width",percent2*4);
		document.getElementById("progressbarT2").firstChild.nodeValue="% "+Math.round(percent2);
		document.getElementById("bar2").style.visibility = 'visible';
	}
}

/*---------------------------------------------------------------------------*/
function showTooltip(evt, text)
{
  var tooltip = document.getElementById("tooltip");
  tooltip.innerHTML = text;
  tooltip.style.display = "block";
  tooltip.style.left = evt.pageX + 10 + 'px';
  tooltip.style.top = evt.pageY + 10 + 'px';
}

function hideTooltip()
{
  var tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none";
}

/*------------------------------------SVG---------------------------------------*/
function setgroup(OBJ,Attrib,valor)
{
	if (OBJ==null)return;
	if (OBJ.childNodes.length)
	{
		for(var temp=0;temp<OBJ.childNodes.length;temp++)
		{
			if(OBJ.childNodes[temp].nodeName!="#text")
			{
				if(OBJ.childNodes[temp].nodeName!="g")
					OBJ.childNodes[temp].setAttribute(Attrib,valor);
				else
					setgroup(OBJ.childNodes[temp],Attrib,valor);
			}
		}
	}
	else
	{
		OBJ.setAttribute(Attrib,valor);
	}
}
function getgroup(OBJ,Attrib,valor)
{
	var rtn=null;
	if (OBJ==null)return;
	if(OBJ.childNodes.length)
	{
		for(var temp=0;temp<OBJ.childNodes.length;temp++)
		{
			if(OBJ.childNodes[temp].nodeName!="#text")
			{
				if(OBJ.childNodes[temp].nodeName!="g")
				{
					var rstyle = OBJ.childNodes[temp].getAttribute(Attrib);//;
					if(rstyle)
					{
						var temp2;
						rstyle=rstyle.split(';');
						for(var j=0; j < rstyle.length; j++)
						{
							temp2=rstyle[j].split(':');
							if(temp2[0] == valor)
								return temp2[1];

						}
					}
				}
				else
					rtn=getgroup(OBJ.childNodes[temp],Attrib,valor);
			}
		}
	}
	else
	{
		var rstyle = OBJ.getAttribute(Attrib);//;
		if(rstyle)
		{
			var temp2;
			rstyle=rstyle.split(';');
			for(var j=0; j < rstyle.length; j++)
			{
				temp2=rstyle[j].split(':');
				if(temp2[0] == valor)
					return temp2[1];
			}
		}
	}
	return rtn;
}

/*---------------------------------------------------------------------------*/
function Getcookie()
{
}
function createCookie(name,value,days)
{
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
/*---------------------------------------------------------------------------*/
function loadjscssfile(id,filename, filetype)
{
	if (document.getElementById(id))
		return;
	if (filetype=="js")
	{ //if filename is a external JavaScript file
		var fileref=document.createElement('script');
		fileref.setAttribute("id",id);
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", filename);
	}
	if (filetype=="css")
	{ //if filename is an external CSS file
		var fileref=document.createElement("link");
		fileref.setAttribute("id",id);
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}
	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref);
}
function LoadRsc(flag,id,file,type,fnc)
{
	if (ResourceLoad&flag!=0)
	{
		fnc();
	}
	else
	{
		loadjscssfile(id,file,type);
		setTimeout("LoadRsc("+flag+","+id+","+file+","+type+","+fnc+")",50);
	}
}

/*---------------------------------------------------------------------------*/
function checkOnlineStatus()
{
	var tempImage = new Image();
	LOG("checkOnlineStatus");
	tempImage.onload = returnOnlineStatus;
	tempImage.onerror = returnOfflineStatus;
	tempImage.src = 'http://www.google.com/images/srpr/logo4w.png';		// this must point to the url of a valid image
}
function returnOnlineStatus()
{
	loadjscssfile("uploadScript","./OpenLayers.js", "js");
	if (winList['sample10'])
		winList['sample10'].open();
	setTimeout("initxgdv()",5000);
}
function returnOfflineStatus()
{
	LOG("Off Line");
}
/*---------------------------------------------------------------------------*/
function RemComment(linea)
{
	var ptr1=-1;
	var ptr2=-1;
	linea=""+linea;
	do
	{
		ptr1=linea.indexOf("//");
		if(ptr1!=-1)
		{
			ptr2=linea.indexOf('\n',ptr1);
			if(ptr2!=-1)
				linea=linea.substring(0,ptr1)+""+linea.substring(ptr2+1);
			else
				linea=linea.substring(0,ptr1);
		}
		linea=linea.replace("\t"," ");
		linea=linea.replace("  "," ");
	}while(linea.indexOf("\t")!=-1 || linea.indexOf("  ")!=-1 || linea.indexOf("//")!=-1);
	return linea;
}

function RemoveUnuseChar(linea)
{
	var temp="";
	linea=""+linea;
	var ptrT=0;
	do
	{
		ptrT=linea.indexOf(";");
		if(ptrT!=-1)
			linea=linea.substring(0,ptrT);
		ptrT=linea.indexOf("//");
		if(ptrT!=-1)
		{
			temp=linea.substring(0,ptrT);
			linea=linea.substring(ptrT); //Substring Retorna parte de uma string
			ptrT=linea.indexOf('\n');
			if(ptrT!=-1)
				linea=linea.substring(ptrT);
			else
				linea="";
			linea=(temp+linea);
		}
		linea=linea.replace("  "," ");
		linea=linea.replace("\t"," ");
		linea=linea.trim();
	}while(linea.indexOf("\t")!=-1 || linea.indexOf("  ")!=-1 || linea.indexOf("//")!=-1);
	return linea;
}

function Remplace(A,X,B)
{
	while(A.indexOf(X)!=-1)
	{
		A=A.replace(X,B);
	}
	return A;
}

function RemoveUnusedItem(Datos)
{
	var j=0;
	while(j<Datos.length)
	{
		Datos[j]=""+Datos[j];
		Datos[j]=RemoveUnuseChar(Datos[j]);
		Datos[j]=Datos[j].trim();
		if(Datos[j]=="" || Datos[j]==null)
			Datos.splice(j,1);
		else
			j++;
	}
}

function getReloadStatus()
{
	var text="";
	if(Reload&0x200)text+="Se recomienda que ";
	text+="Para que los cambios surtan efecto se debe:\n";
	if(Reload&0x1)text+="Reload Plan PLC 1\n";
	if(Reload&0x2)text+="Reload Plan PLC 2\n";
	if(Reload&0x4)text+="Reload Plan PLC 3\n";
	if(Reload&0x8)text+="Reload Plan PLC 4\n";
	if(Reload&0x10)text+="Reload Scheduler PLC 1\n";
	if(Reload&0x20)text+="Reload Scheduler PLC 2\n";
	if(Reload&0x40)text+="Reload Scheduler PLC 3\n";
	if(Reload&0x80)text+="Reload Scheduler PLC 4\n";
	if(Reload&0x100)text+="Restart Controller\n";
	return text;
}

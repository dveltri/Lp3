<%@ page language="java" import="java.io.*, java.sql.*,org.apache.commons.io.FileUtils.*" %>
<%
	String ID = request.getParameter("ID");
	String IpAdd = request.getParameter("IpAdd");
	String Msk = request.getParameter("Msk");
	String Model = request.getParameter("Model");
	String Comd= request.getParameter("Cmd");
	//-----------------------------------------------------------------------------
	String Os=System.getProperty("os.name");
	ServletContext context = session.getServletContext();
	String rootDir = context.getRealPath(request.getContextPath()); 
	String app="\\lp3";
	rootDir+=app;
	String Storage="\\Conf";
	String path=rootDir;
	path+=Storage;
	String[] IpDGWa;
	String IpDGW="";
	String cmd="";
	int tmp=0;
	if (Os.indexOf("Win")!=-1)
	{
		path=path.replace('\\','/');
		path=path.replaceAll("//","/");
	}
	else
	{
		path=path.replace('\\','/');
		path=path.replaceAll("//","/");
		rootDir=rootDir.replace('\\','/');
		rootDir=rootDir.replaceAll("//","/");
		app=app.replace('\\','/');
		app=app.replaceAll("//","/");
		Storage=Storage.replace('\\','/');
		Storage=Storage.replaceAll("//","/");
	}
	if(Comd!=null && ID!=null)
	{
		if(Comd.indexOf("del")!=-1)
		{
			Runtime runtime = Runtime.getRuntime();
			if (Os.indexOf("Win")!=-1)
			{
			cmd=rootDir+"\\del.bat "+ID+" "+rootDir+" "+Storage;
			}
			else
			{
			    cmd="sh "+rootDir+"/del.sh "+ID+" "+rootDir+" "+Storage;
			    //out.print(cmd+"<br>");
			}
			Process exec = runtime.exec(cmd);
			Thread.sleep(500);
		}
	}
	//-----------------------------------------------------------------------------
	if(Model!=null && ID!=null && IpAdd!=null)
	{
		tmp=IpAdd.lastIndexOf(".");
		IpAdd+="";
		IpDGW=IpAdd.substring(0,tmp);
		ID=ID.replace(' ','_');
		File folder = new File(path+"/"+ID+"/");
		if (!folder.exists())
		{
			//-----------------------------------------------------------------------------
			try
			{
				if(Os.indexOf("Win")!=-1)
				{
					IpDGW+=".1";
					if (Model.indexOf("MSTC-V1M3")!=-1)
						cmd=rootDir+"\\STC.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("GW1M3FT")!=-1)
						cmd=rootDir+"\\GW.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("GW2M3FT")!=-1)
						cmd=rootDir+"\\GW.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("GW3M3RT")!=-1)
						cmd=rootDir+"\\GW.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("GW1M4FT")!=-1)
						cmd=rootDir+"\\GW.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("GW2M4FT")!=-1)
						cmd=rootDir+"\\GW.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("GW3M4RT")!=-1)
						cmd=rootDir+"\\GW.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("GW4M4RT")!=-1)
						cmd=rootDir+"\\GW.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("MAC-TC1M4")!=-1)
						cmd=rootDir+"\\MAC.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("SAD-V1M4")!=-1)
						cmd=rootDir+"\\MST.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("SAD-V2M4")!=-1)
						cmd=rootDir+"\\MST.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("SAD-V3M4")!=-1)
						cmd=rootDir+"\\MST.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("DGV-uTC1-M4")!=-1)
						cmd=rootDir+"\\DGV.bat "+ID+" b"+Model+" "+rootDir+" "+Storage;
						//out.println("["+cmd+"]");
				}
				else
				{
					//out.println("folder:"+path+"/"+ID+"/<br>");
					if (Model.indexOf("MSTC-V1M3")!=-1)
						cmd="sh "+rootDir+"/STC.sh "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("MAC-TC1M4")!=-1)
						cmd="sh "+rootDir+"/MAC.sh "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("SAD-V1M4")!=-1)
						cmd="sh "+rootDir+"/MST.sh "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("SAD-V2M4")!=-1)
						cmd="sh "+rootDir+"/MST.sh "+ID+" b"+Model+" "+rootDir+" "+Storage;
					if (Model.indexOf("SAD-V3M4")!=-1)
						cmd="sh "+rootDir+"/MST.sh "+ID+" b"+Model+" "+rootDir+" "+Storage;
					//out.println("["+cmd+"]");
				}
				Runtime runtime = Runtime.getRuntime();
				//out.print(cmd+"<br>");
				Process exec = runtime.exec(cmd);
				Thread.sleep(500);
			}
			catch(Exception E0)
			{
				//out.println("message exception" + E0.getMessage());
				System.out.println("message exception" + E0.getMessage());
			}
			//-----------------------------------------------------------------------------
			try
			{
				FileWriter archivo;
				if (Os.indexOf("Win")!=-1)
				{
					archivo = new FileWriter(rootDir+Storage+"\\"+ID+"\\startup.ini");
				}
				else
				{
					archivo = new FileWriter(path+"/"+ID+"/startup.ini");
				}
				//--------------------
				archivo.write("ID "+ID+"\n");
				{
					archivo.write("MAC 00-01");
					int ipf=0;
					String temp="";
					temp=IpAdd.replace('.', ':');
					String [] ip = temp.split(":");
					for(int i=0;i<ip.length;i++)
					{
						temp=""+ip[i];
						ipf=Integer.parseInt(temp);
						temp=""+Integer.toHexString(ipf);
						temp=temp.toUpperCase();
						ipf=temp.length();
						if(ipf==1)
							archivo.write("-0"+temp);
						else
							archivo.write("-"+temp);
					}
					archivo.write("\n");
				}
				archivo.write("ETH0 "+IpAdd+"\n");
				if(Msk!=null)
					archivo.write("NETMASK0 "+Msk+"\n");
				if (Model.indexOf("M3")!=-1)
					archivo.write("MACDGW FF-FF-FF-FF-FF-FF\n");
				if (Model.indexOf("M4")!=-1)
					archivo.write("DGW "+IpDGW+"\n");
				archivo.write("Flashing 2\n");
				archivo.write("FlasCA 50\n");
				archivo.write("Virtual Inputs 0\n");
				archivo.write("Outputs 0\n");
				archivo.write("Model "+Model+"\n");
				//----------------------------------------------------------------------- MST
				if (Model.indexOf("SAD-V")!=-1)
				{
					archivo.write("LOG 0\n");
					archivo.write("Inputs 0\n");
					archivo.write("Loops 0\n");
					
					if (Model.indexOf("SAD-V2M4")!=-1)
						archivo.write("Phases 2\n");
					else
						archivo.write("Phases 4\n");
					if (Model.indexOf("SAD-V3M4")!=-1)
					{
						archivo.write("VoltDes 10\n");
						archivo.write("VoltPen 151\n");
					}
				}
				//----------------------------------------------------------------------- GW
				if (Model.indexOf("GW")!=-1)
				{
					archivo.write("LOG 0\n");
					if (Model.indexOf("GW1M3FT")!=-1)
					{
						archivo.write("Inputs 0\n");
						archivo.write("Loops 0\n");
						archivo.write("Phases 2\n");
					}
					if (Model.indexOf("GW2M3FT")!=-1)
					{
						archivo.write("Inputs 8\n");
						archivo.write("Loops 8\n");
						archivo.write("Phases 2\n");
					}
					if (Model.indexOf("GW3M3RT")!=-1)
					{
						archivo.write("Inputs 8\n");
						archivo.write("Loops 8\n");
						archivo.write("Phases 2\n");
					}
					if (Model.indexOf("GW4M4RT")!=-1)
					{
						archivo.write("Inputs 24\n");
						archivo.write("Loops 0\n");
						archivo.write("Phases 4\n");
						archivo.write("ATZ &00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00\n");
					}
				}
				//-----------------------------------------------------------------------MAC
				if (Model.indexOf("MAC")!=-1)
				{
					archivo.write("LOG 0\n");
					if (Model.indexOf("TC1M4")!=-1)
					{
						archivo.write("Inputs 0\n");
						archivo.write("Loops 0\n");
						archivo.write("Phases 4\n");
						archivo.write("ATZ &00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00\n");
					}
				}
				//-----------------------------------------------------------------------DGV
				if (Model.indexOf("DGV")!=-1)
				{
					archivo.write("LOG 1\n");
					if (Model.indexOf("uTC1")!=-1)
					{
						archivo.write("Inputs 0\n");
						archivo.write("Loops 0\n");
						archivo.write("Phases 2\n");
						archivo.write("ATZ &00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00\n");
					}						
				}
				//-----------------------------------------------------------------------DGV
				archivo.write("Virtual Phases 0\n");
				archivo.write("Remote Phases 0\n");
				archivo.write("Groups Phases 0\n");
				archivo.write("Controllers 1\n");
				archivo.write("Time Out Electrical Error 700\n");
				archivo.write("Time Out Consumption Error 700\n");
				archivo.write("Alert Over Voltage 26000\n");
				archivo.write("Normal Voltage 22000\n");
				archivo.write("Error Minimal Voltage 17000\n");
				archivo.write("Error Critical Voltage 15000\n");
				archivo.write("Web Access Code Ro 54321\n");
				archivo.write("Web Access Code R/W 12345\n");
				archivo.write("Time Zone GMT -180\n");
				archivo.write("Enable GPS 3\n");
				archivo.write("Time Cap 0\n");
				archivo.close();
			}
			catch (IOException E0)
			{
				System.out.println("ERROR: Could not create startup");
				System.out.println("message exception" + E0.getMessage());
			}
			Thread.sleep(100);
			//-----------------------------------------------------------------------------
		}
		else
		{
			//out.println("Folder Exist["+path+"/"+ID+"/]");
		}
	}
	//------------------------------------------------------------------
	try
	{
		String temp  = new String();
		File directorio;
		if (Os.indexOf("Win")!=-1)
		{
			directorio = new File(rootDir+Storage+"\\");
		}
		else
		{
			//path+=Storage;
			path=path.replace('\\','/');
			path=path.replaceAll("//","/");
			directorio = new File(path+"/");
		}
		//out.println(path);
		File[] listado;
		//-------------------------------------
		listado = directorio.listFiles();
		//FileWriter archivo = new FileWriter(rootDir+"\\info.fls");
		//archivo.write(path+",\n");
		//path=path.replace("\\", "/");
		out.flush();
		out.print("/,\n");
		for (int i=0; i < listado.length; i++)
		{
			Date fecha = new Date(listado[i].lastModified()); //Pongo en formato la fecha del archivo
			if (listado[i].isDirectory())
			{
				temp=listado[i].getName();
				//if (temp.indexOf(".")!=-1)
				{
					temp=listado[i].getName() + "," + listado[i].length() + "," + fecha.toString() + "," + "----D,\n";
					out.print(temp);
				}
				//else temp="";
			}
			//archivo.write(temp);
		}
		//archivo.close();
	}
	catch (IOException E0)
	{
		System.out.println("ERROR: Could not create Progs List");
		System.out.println("message exception" + E0.getMessage());
	}
%>

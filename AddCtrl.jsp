<%@ page language="java" import="java.io.*, java.sql.*,org.apache.commons.io.FileUtils.*" %>
<%
	String IpAdd = request.getParameter("IpAdd");
	String Msk = request.getParameter("Msk");
	String Mode = request.getParameter("Mode");
	ServletContext context = session.getServletContext();
	String rootDir = context.getRealPath(request.getContextPath()); 
	//out.println("["+rootDir+"]");
	String Os=System.getProperty("os.name");
	String path=rootDir;
	String[] IpDGWa;
	String IpDGW="";
	String cmd="";
	int iMode=0;
	int tmp=IpAdd.lastIndexOf(".");
	Mode="0"+Mode;
	iMode=0;
	IpAdd+="";
	IpDGW=IpAdd.substring(0,tmp);
	iMode = Integer.parseInt("0"+Mode);
	if (Os.indexOf("Win")!=-1)
	{
		path=path.replace('\\','/');
		path=path.replaceAll("//","/");
	}
	//-----------------------------------------------------------------------------
	if(iMode!=0)
	{
		File folder = new File(path+"/"+IpAdd+"/");
		if (!folder.exists())
		{
			//-----------------------------------------------------------------------------
			try
			{
				if(Os.indexOf("Win")!=-1)
				{
					IpDGW+=".1";
					switch(iMode)
					{
						case 31:
						cmd=rootDir+"\\lp3\\xcpy31.bat "+IpAdd+" "+rootDir+"\\conf\\";
						break;
						case 32:
						cmd=rootDir+"\\lp3\\xcpy32.bat "+IpAdd+" "+rootDir+"\\conf\\";
						break;
						case 33:
						cmd=rootDir+"\\lp3\\xcpy33.bat "+IpAdd+" "+Msk+" "+IpDGW+" "+rootDir+"\\conf\\";
						break;
						case 41:
						cmd=rootDir+"\\lp3\\xcpy41.bat "+IpAdd+" "+rootDir+"\\conf\\";
						break;
						case 42:
						cmd=rootDir+"\\lp3\\xcpy42.bat "+IpAdd+" "+rootDir+"\\conf\\";
						break;
						case 43:
						cmd=rootDir+"\\lp3\\xcpy43.bat "+IpAdd+" "+Msk+" "+IpDGW+" "+rootDir+"\\conf\\";
						break;
						case 44:
						cmd=rootDir+"\\lp3\\xcpy4.bat "+IpAdd+" "+Msk+" "+IpDGW+" "+rootDir+"\\conf\\";
						break;
						case 51:
						cmd=rootDir+"\\lp3\\xcpy51.bat "+IpAdd+" "+Msk+" "+IpDGW+" "+rootDir+"\\conf\\";
						break;
					}
				}
				else
				{
					switch(iMode)
					{
						case 31:
						cmd=rootDir+"/lp3/xcpy1.sh "+IpAdd+" "+rootDir+"/conf/";
						break;
						case 32:
						cmd=rootDir+"/lp3/xcpy2.sh "+IpAdd+" "+rootDir+"/conf/";
						break;
						case 33:
						cmd=rootDir+"/lp3/xcpy3.sh "+IpAdd+" "+rootDir+"/conf/";
						break;
						case 41:
						cmd=rootDir+"/lp3/xcpy1.sh "+IpAdd+" "+rootDir+"/conf/";
						break;
						case 42:
						cmd=rootDir+"/lp3/xcpy2.sh "+IpAdd+" "+rootDir+"/conf/";
						break;
						case 43:
						cmd=rootDir+"/lp3/xcpy3.sh "+IpAdd+" "+rootDir+"/conf/";
						break;
						case 44:
						cmd=rootDir+"/lp3/xcpy4.sh "+IpAdd+" "+rootDir+"/conf/";
						break;
					}
				}
				Runtime runtime = Runtime.getRuntime();
				System.out.println(cmd);
				Process exec = runtime.exec(cmd);
				Thread.sleep(500);
			}
			catch(Exception E0)
			{
				System.out.println("message exception" + E0.getMessage());
			}
			//-----------------------------------------------------------------------------
			try
			{
				FileWriter archivo;
				if (Os.indexOf("Win")!=-1)
				{
					archivo = new FileWriter(rootDir+"\\conf\\"+IpAdd+"\\startup.ini");
				}
				else
				{
					archivo = new FileWriter(rootDir+"/conf/"+IpAdd+"/startup.ini");
				}
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
				archivo.write("ETH0 "+IpAdd+"\n");
				archivo.write("NETMASK0 "+Msk+"\n");
				archivo.write("Flashing 2\n");
				archivo.write("FlasCA 50\n");
				archivo.write("Virtual Inputs 0\n");
				archivo.write("Outputs 0\n");
				switch(iMode)
				{
					case 31:
						archivo.write("MACDGW FF-FF-FF-FF-FF-FF\n");
						archivo.write("LOG 0\n");
						archivo.write("Inputs 0\n");
						archivo.write("Loops 0\n");
						archivo.write("Model GW1M3FT\n");
						archivo.write("Phases 2\n");
					break;
					case 32:
						archivo.write("MACDGW FF-FF-FF-FF-FF-FF\n");
						archivo.write("LOG 0\n");
						archivo.write("Inputs 8\n");
						archivo.write("Loops 8\n");
						archivo.write("Model GW2M3FT\n");
						archivo.write("Phases 2\n");
					break;
					case 33:
						archivo.write("DGW "+IpDGW+"\n");
						archivo.write("MACDGW FF-FF-FF-FF-FF-FF\n");
						archivo.write("LOG 0\n");
						archivo.write("Inputs 8\n");
						archivo.write("Loops 8\n");
						archivo.write("Model GW3M3RT\n");
						archivo.write("Phases 2\n");
					break;
					case 41:
						archivo.write("MACDGW FF-FF-FF-FF-FF-FF\n");
						archivo.write("LOG 0\n");
						archivo.write("Inputs 0\n");
						archivo.write("Loops 0\n");
						archivo.write("Model GW1M4FT\n");
						archivo.write("Phases 2\n");
					break;
					case 42:
						archivo.write("MACDGW FF-FF-FF-FF-FF-FF\n");
						archivo.write("LOG 0\n");
						archivo.write("Inputs 8\n");
						archivo.write("Loops 8\n");
						archivo.write("Model GW2M4FT\n");
						archivo.write("Phases 2\n");
					break;
					case 43:
						archivo.write("DGW "+IpDGW+"\n");
						archivo.write("MACDGW FF-FF-FF-FF-FF-FF\n");
						archivo.write("LOG 0\n");
						archivo.write("Inputs 8\n");
						archivo.write("Loops 8\n");
						archivo.write("Model GW3M4RT\n");
						archivo.write("Phases 2\n");
					break;
					case 44:
						archivo.write("DGW "+IpDGW+"\n");
						archivo.write("LOG 0\n");
						archivo.write("Inputs 24\n");
						archivo.write("Loops 0\n");
						archivo.write("Model GW4M4RT\n");
						archivo.write("Phases 4\n");
						archivo.write("ATZ &00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00\n");
					break;
					case 51:
						archivo.write("DGW "+IpDGW+"\n");
						archivo.write("LOG 0\n");
						archivo.write("Inputs 24\n");
						archivo.write("Loops 0\n");
						archivo.write("Model GW4M4RT\n");
						archivo.write("Phases 4\n");
						archivo.write("ATZ &00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00&00\n");
					break;
				}
				archivo.write("Virtual Phases 0\n");
				archivo.write("Remote Phases 0\n");
				archivo.write("Groups Phases 0\n");
				archivo.write("Controllers 1\n");
				archivo.write("Time Out Electrical Error 160\n");
				archivo.write("Time Out Consumption Error 256\n");
				archivo.write("Alert Over Voltage 1600\n");
				archivo.write("Normal Voltage 1200\n");
				archivo.write("Error Minimal Voltage 1100\n");
				archivo.write("Error Critical Voltage 1050\n");
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
	}
	//------------------------------------------------------------------
	try
	{
	  	String temp  = new String();
		File directorio;
		if (Os.indexOf("Win")!=-1)
		{
			directorio = new File(rootDir+"\\conf\\");
		}
		else
		{
			directorio = new File(rootDir+"/conf/");
		}
		File[] listado;
		//-------------------------------------
		listado = directorio.listFiles();
		//FileWriter archivo = new FileWriter(rootDir+"\\conf\\info.fls");
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
				if (temp.indexOf(".")!=-1)
				{
					temp=listado[i].getName() + "," + listado[i].length() + "," + fecha.toString() + "," + "----D,\n";
					out.print(temp);
				}
				else
				{
				 temp="";
				}
			}
			//archivo.write(temp);
		}
		//archivo.close();
	}
	catch (IOException E0)
	{
		System.out.println("ERROR: Could not create Progs List");
		System.out.println("message exception" + E0.getMessage());
	}// */
%>

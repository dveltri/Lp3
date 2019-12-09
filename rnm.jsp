<%@ page language="java" import="java.io.*, java.sql.*,org.apache.commons.io.FileUtils.*" %>
<%
	String ID = request.getParameter("ID");
	String OLD = request.getParameter("OLD");
	//-----------------------------------------------------------------------------
	String Os=System.getProperty("os.name");
	ServletContext context = session.getServletContext();
	String rootDir = context.getRealPath(request.getContextPath()); 
	rootDir+="\\lp3";
	String cmd="";
	String Storage="\\Conf";
	String path=rootDir;
	path+=Storage;
	int tmp=0;
	if (Os.indexOf("Win")!=-1)
	{
		path=path.replace('\\','/');
		path=path.replaceAll("//","/");
	}
	if(OLD!=null && ID!=null)
	{
		{
			Runtime runtime = Runtime.getRuntime();
			cmd=rootDir+"\\rnm.bat "+rootDir+""+Storage+"\\"+OLD+" "+ID;
			out.println("//"+cmd);
			Process exec = runtime.exec(cmd);
			Thread.sleep(500);
		}
	}
	//-----------------------------------------------------------------------------
	try
	{
		rootDir+=Storage;
		String temp  = new String();
		File directorio;
		if (Os.indexOf("Win")!=-1)
		{
			directorio = new File(rootDir+"\\");
		}
		else
		{
			directorio = new File(rootDir+"/");
		}
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

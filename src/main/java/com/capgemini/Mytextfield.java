package com.capgemini;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

public class Mytextfield extends DeclarativeWebScript{
	
	Logger logger = Logger.getLogger("logger");
	@Override
	protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache) {
		// TODO Auto-generated method stub

		  logger.log(Level.INFO, "Controleur Java");
	      Map<String, Object> model = new HashMap<String, Object>();
	      //String nom= req.getParameter("nom");
	      model.put("folder", "nom folder");
	      Personne p = new Personne("wafa","sallem");
	      model.put(p.getNom(), p.getPrenom());
	      return model;
	}

}

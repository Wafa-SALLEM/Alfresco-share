package com.capgemini;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.alfresco.web.evaluator.BaseEvaluator;
import org.json.simple.JSONObject;
import org.springframework.extensions.surf.RequestContext;
import org.springframework.extensions.surf.support.ThreadLocalRequestContext;
import org.springframework.extensions.webscripts.connector.User;

public class MyEvaluator extends BaseEvaluator{
	
	@Override
	public boolean evaluate(JSONObject arg0) {
		// TODO Auto-generated method stub
		Logger logger = Logger.getLogger("logger");
		logger.log(Level.INFO, "Controller evaluator");
		//retourner l'utilisateur qui a créé le folder
		RequestContext rc = ThreadLocalRequestContext.getRequestContext();
		User user = rc.getUser();
		
		return (user != null && user.isAdmin());
	}


}

package com.capgemini;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.alfresco.web.evaluator.BaseEvaluator;
import org.eclipse.jetty.util.log.Log;
import org.json.simple.JSONObject;
import org.springframework.extensions.surf.support.ThreadLocalRequestContext;

/**
 * Custom evaluator to disable Manage Permissions action at My Files section
 * @author wsallem
 *
 */

public class MyFilesBased extends BaseEvaluator{
	
	
	Logger logger=Logger.getLogger("logger");

	@Override
	public boolean evaluate(JSONObject arg0) {
		// TODO Auto-generated method stub
		
		logger.log(Level.INFO, "evaluatorrrrrrrrrrr");
		 String containsHome = ThreadLocalRequestContext.getRequestContext().getUri();
	       
	       if(containsHome.contains("user/home") || containsHome.contains("/page/context/mine")){
	          
	          return false;
	       }
	       else{
	          return true;
	       }       
	}
	
	

}

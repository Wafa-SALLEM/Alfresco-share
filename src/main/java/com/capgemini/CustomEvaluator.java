package com.capgemini;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.alfresco.error.AlfrescoRuntimeException;
import org.alfresco.web.evaluator.BaseEvaluator;
import org.json.simple.JSONObject;


public class CustomEvaluator extends BaseEvaluator {
	private Logger logger=Logger.getLogger("logger");
	private static final String INHERITED = "Description";

	@Override
	public boolean evaluate(JSONObject jsonObject) {
		// TODO Auto-generated method stub
		logger.log(Level.INFO,"Evaluator");
		try{
			Boolean isInherited = (Boolean)getJSONValue(jsonObject,INHERITED);
			if (isInherited != null && !isInherited) {
			return true;
			}
			else {
			return false;
			}
			}
			catch (Exception e){
			throw new AlfrescoRuntimeException("Failed to run Inheritance UI  evaluator: " + e.getMessage());
			}
	}

}

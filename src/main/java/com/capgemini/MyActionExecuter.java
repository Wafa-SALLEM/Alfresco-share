package com.capgemini;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.alfresco.repo.action.executer.ActionExecuterAbstractBase;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
import org.alfresco.service.cmr.repository.NodeRef;

public class MyActionExecuter extends ActionExecuterAbstractBase{
	
	private Logger logger=Logger.getLogger("logger");

	@Override
	protected void executeImpl(Action ruleAction, NodeRef arg1) {
		// TODO Auto-generated method stub
		
		logger.log(Level.INFO, "suis custom action: méthode exec");
		
	}

	@Override
	protected void addParameterDefinitions(List<ParameterDefinition> arg0) {
		// TODO Auto-generated method stub
		
		logger.log(Level.INFO, "suis custom action: méthode addParams");
		
	}

}

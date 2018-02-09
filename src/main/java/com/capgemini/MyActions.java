package com.capgemini;

import java.util.List;

import org.alfresco.repo.action.ParameterDefinitionImpl;
import org.alfresco.repo.action.executer.ActionExecuterAbstractBase;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
import org.alfresco.service.cmr.dictionary.DataTypeDefinition;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.QName;

public class MyActions extends ActionExecuterAbstractBase{

	private NodeService nodeService;
	 public static final String NAME = "add-aspect";
	 public static final String PARAM_ASPECT_NAME = "aspect-name";
	
	@Override
	protected void executeImpl(Action action, NodeRef actionedUponNodeRef) {
		// TODO Auto-generated method stub
		
		// Check that the node still exists
	      if (this.nodeService.exists(actionedUponNodeRef) == true)
	      {
	         // Get the qname of the aspect to apply, we know it must have been set since it is mandatory parameter
	         QName aspectQName = (QName)action.getParameterValue(PARAM_ASPECT_NAME);
	        
	         // Use the node service to apply the aspect to the node
	         this.nodeService.addAspect(actionedUponNodeRef, aspectQName, null);
	      }
	}

	@Override
	protected void addParameterDefinitions(List<ParameterDefinition> paramList) {
		// TODO Auto-generated method stub
		// Add definitions for action parameters
	      paramList.add(new ParameterDefinitionImpl(PARAM_ASPECT_NAME,DataTypeDefinition.QNAME,true,getParamDisplayLabel(PARAM_ASPECT_NAME)));      
	}

	public void setNodeService(NodeService nodeService) {
		this.nodeService = nodeService;
	}
	
	

}

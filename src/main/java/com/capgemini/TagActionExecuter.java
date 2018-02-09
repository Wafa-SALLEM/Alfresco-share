package com.capgemini;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.alfresco.repo.action.executer.ActionExecuterAbstractBase;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;

public class TagActionExecuter extends ActionExecuterAbstractBase{
	
	 //public static final String NAME = "tag";

    private NodeService nodeService;
    
    /** le nom de paramètre : le nom de la propriété dans le fichier tagsModel.xml (DANS LE MODELE)*/
	public static final String PARAM_TAG_NAME = "tags";

	@Override
	protected void executeImpl(Action action, NodeRef actionedUponNodeRef) {
		// TODO Auto-generated method stub
		
		Logger logger=Logger.getLogger("logger");
		logger.log(Level.INFO, "my custom action");
		
		String tagname = (String) action.getParameterValue(PARAM_TAG_NAME);
	}

	@Override
	protected void addParameterDefinitions(List<ParameterDefinition> arg0) {
		// TODO Auto-generated method stub
		
		//there are no parametrs
	}

	public void setNodeService(NodeService nodeService) {
		this.nodeService = nodeService;
	}

}

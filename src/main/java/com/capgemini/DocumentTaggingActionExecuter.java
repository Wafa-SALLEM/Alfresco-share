package com.capgemini;

import java.util.List;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.alfresco.repo.action.executer.ActionExecuterAbstractBase;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;

public class DocumentTaggingActionExecuter extends ActionExecuterAbstractBase{
	
	private NodeService nodeService;
	
	/** le nom de paramètre : le nom de la propriété dans le fichier tagsModel.xml (DANS LE MODELE)*/
	//public static final String PARAM_TAG_NAME = "tags";
	
	/** le nom de l'action */
	//public static final String NAME = "tag";
	
	//private ServiceRegistry serviceRegistry;
	
	@Override
	protected void executeImpl(Action action, NodeRef actionedUponNodeRef) {
		// TODO Auto-generated method stub
		Logger logger = Logger.getLogger("logger");
		logger.log(Level.INFO, "tag actions");
		
		String tags = (String)action.getParameterValue("");
		
	//	if (this.nodeService.exists(actionedUponNodeRef) == true){
	         // add the aspect if it is not already present on the node
	       /*  QName tagAspect = QName.createQName("extension.tags", "taggable");
	         if (this.nodeService.hasAspect(actionedUponNodeRef, tagAspect) == false)
	         {
	            this.nodeService.addAspect(actionedUponNodeRef, tagAspect, null);
	         }*/
	         
	         // create the tags as a list
	         /*String tags = (String)action.getParameterValue(PARAM_TAG_NAME);
	         List<String> tagsList = new ArrayList<String>();
	         if (tags != null && tags.length() > 0)
	         {
	            StringTokenizer tokenizer = new StringTokenizer(tags, ",");
	            while (tokenizer.hasMoreTokens())
	            {
	               tagsList.add(tokenizer.nextToken().trim());
	            }
	         }*/
	         
	         // set the tags property
	         //QName tagsProp = QName.createQName("extension.tags", "tags");
	         /*Map<QName, Serializable> contentProps = new HashMap<QName, Serializable>();
	         contentProps.put( QName.createQName( "ag:task" ), "task1" );
	         this.nodeService.setProperties(actionedUponNodeRef, contentProps);*/
	        // this.nodeService.setProperty(actionedUponNodeRef, tagsProp, (Serializable)tagsList);
	     // }
		
	}

	@Override
	protected void addParameterDefinitions(List<ParameterDefinition> paramList) {
		// TODO Auto-generated method stub
		// paramList.add(new ParameterDefinitionImpl(PARAM_TAG_NAME, DataTypeDefinition.TEXT, true,getParamDisplayLabel(PARAM_TAG_NAME))); 
	}

	public void setNodeService(NodeService nodeService) {
		this.nodeService = nodeService;
	}


	/*public void setServiceRegistry(ServiceRegistry serviceRegistry) {
		this.serviceRegistry = serviceRegistry;
	}*/
}

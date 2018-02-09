package com.capgemini;

import org.alfresco.error.AlfrescoRuntimeException;
import org.alfresco.web.evaluator.BaseEvaluator;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;

public class CheckIfDocIsEmailedEvaluator extends BaseEvaluator {
	
    private static Log logger = LogFactory.getLog(CheckIfDocIsEmailedEvaluator.class);
    private static final String ASPECT_EMAILED = "cm:emailed";

	@Override
	public boolean evaluate(JSONObject jsonObject) {
		// TODO Auto-generated method stub
		try {
            org.json.simple.JSONArray nodeAspects = getNodeAspects(jsonObject);
            if (nodeAspects == null) {
                logger.info("No aspects found");
                return false;
            } else {
                if (nodeAspects.contains(ASPECT_EMAILED)) {
                    logger.info("Has been emailed");
                    return true;
                } else {
                    logger.info("Has NOT been emailed");
                    return false;
                }
            }
        } catch (Exception err) {
            throw new AlfrescoRuntimeException("JSONException whilst running action evaluator: " + err.getMessage());
        }
	}
}

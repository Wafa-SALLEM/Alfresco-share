package com.capgemini;

import java.util.Map;

import org.springframework.extensions.surf.RequestContext;
import org.springframework.extensions.surf.extensibility.ExtensionModuleEvaluator;

public class SimpleModuleEvaluator implements ExtensionModuleEvaluator{
	
	public static final String USER_PROP = "user";

	@Override
	public boolean applyModule(RequestContext context, Map<String, String> evaluationProperties) {
		// TODO Auto-generated method stub
		String currUser = context.getUser().getId();
        String targetUser = evaluationProperties.get(USER_PROP);
        return (targetUser != null && targetUser.equals(currUser));
	}

	@Override
	public String[] getRequiredProperties() {
		// TODO Auto-generated method stub
		 return new String[] { USER_PROP};
	}

}

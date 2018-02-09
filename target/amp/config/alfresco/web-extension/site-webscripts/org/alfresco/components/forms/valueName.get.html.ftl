<#include "valueProp.get.html.ftl">

<div class="form-field">
   <#if form.mode == "view">
      <div class="viewmode-field">
         <span class="viewmode-label">${field.label?html}:</span>
         <span class="viewmode-value">${field.value?html}</span>
      </div>
   <#else>
      <label for="${fieldHtmlId}">${field.label?html}:<#if field.mandatory><span class="mandatory-indicator">*</span></#if></label>
      <input id="${fieldHtmlId}" type="text" name="${field.name}" 
      <#if field.label="Nom">value="fsgf"</#if>
      />
   </#if>
</div>
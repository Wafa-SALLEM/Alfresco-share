(function()
{
   /**
    * Alfresco Slingshot aliases
    */
	
	
    var $html = Alfresco.util.encodeHTML,
    $isValueSet = Alfresco.util.isValueSet;
 
   if (Alfresco.DocumentList)
   {     
        YAHOO.Bubbling.fire("registerRenderer",
        {
           propertyName: "descrizioneTec",
           renderer: function showMetadataDescription(record, label)
           {
                var jsNode = record.jsNode;       
               
        var value = "";
 
        if (jsNode.properties["fe:descrizioneTec"] != undefined)
        {
            value = jsNode.properties["fe:descrizioneTec"];
        }
        alert("bonjour ala CV?");
        return '<span class="item"><b>' + "Descrizione-Titolo: " + '</b>' + value + '</span>';
          }
      });
   }
})();
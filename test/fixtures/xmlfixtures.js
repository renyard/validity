var xmlFixtures = {}

xmlFixtures.valid = '<?xml version="1.0" encoding="UTF-8"?><env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope"><env:Body><m:markupvalidationresponse env:encodingStyle="http://www.w3.org/2003/05/soap-encoding" xmlns:m="http://www.w3.org/2005/10/markup-validator"><m:uri>http://www.bbc.co.uk/</m:uri><m:checkedby>http://validator.w3.org/</m:checkedby><m:doctype>-//W3C//DTD XHTML 1.0 Strict//EN</m:doctype><m:charset>utf-8</m:charset><m:validity>true</m:validity><m:errors><m:errorcount>0</m:errorcount><m:errorlist></m:errorlist></m:errors><m:warnings><m:warningcount>0</m:warningcount><m:warninglist></m:warninglist></m:warnings></m:markupvalidationresponse></env:Body></env:Envelope>';

xmlFixtures.invalid = '<?xml version="1.0" encoding="UTF-8"?><env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope"><env:Body><m:markupvalidationresponse env:encodingStyle="http://www.w3.org/2003/05/soap-encoding" xmlns:m="http://www.w3.org/2005/10/markup-validator"><m:uri>http://www.renyard.net/</m:uri><m:checkedby>http://validator.w3.org/</m:checkedby><m:doctype>HTML5</m:doctype><m:charset>utf-8</m:charset><m:validity>false</m:validity><m:errors><m:errorcount>1</m:errorcount><m:errorlist><m:error><m:line>6</m:line><m:col>53</m:col><m:message>Bad value X-UA-Compatible for attribute http-equiv on element meta.</m:message><m:messageid>html5</m:messageid><m:explanation>  <![CDATA[<p class="helpwanted"><a href="http://validator.w3.org/feedback.html?uri=http%3A%2F%2Fwww.renyard.net%2F;errmsg_id=html5#errormsg" title="Suggest improvements on this error message through our feedback channels">&#x2709;</a></p>]]></m:explanation><m:source><![CDATA[    &#60;meta http-equiv=&#34;X-UA-Compatible&#34; content=&#34;IE=8&#34; /<strong title="Position where error was detected.">&#62;</strong>]]></m:source></m:error></m:errorlist></m:errors><m:warnings><m:warningcount>1</m:warningcount><m:warninglist></m:warninglist></m:warnings></m:markupvalidationresponse></env:Body></env:Envelope>';

xmlFixtures.warnings = `<?xml version="1.0" encoding="UTF-8"?>
	<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
	<env:Body>
	<m:markupvalidationresponse env:encodingStyle="http://www.w3.org/2003/05/soap-encoding" xmlns:m="http://www.w3.org/2005/10/markup-validator">
	    
	    <m:uri>upload://Form Submission</m:uri>
	    <m:checkedby>https://html.validity.org.uk/</m:checkedby>
	    <m:doctype>HTML5</m:doctype>
	    <m:charset>utf-8</m:charset>
	    <m:validity>true</m:validity>
	    <m:errors>
	        <m:errorcount>0</m:errorcount>
	        <m:errorlist>
	          
	        </m:errorlist>
	    </m:errors>
	    <m:warnings>
	        <m:warningcount>3</m:warningcount>
	        <m:warninglist>
	        
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	  <m:warning><m:messageid>W28</m:messageid><m:message>Using Direct Input mode: UTF-8 character encoding assumed</m:message></m:warning>
	
	
	
	
	
	
	        
	            <m:warning>
	                <m:line>25</m:line>
	                <m:col>17</m:col>
	                <m:message>A table row was 2 columns wide and exceeded the column count established by the first row (1).</m:message>
	                  <m:messageid>html5</m:messageid>
	                  <m:explanation>  <![CDATA[
					                          <p class="helpwanted">
					        <a
					          href="feedback.html?uri=;errmsg_id=html5#errormsg"
						title="Suggest improvements on this error message through our feedback channels" 
					        >&#x2709;</a>
					      </p>
					  
					                      ]]>
	                  </m:explanation>
	                  <m:source><![CDATA[            &#60;/tr<strong title="Position where error was detected.">&#62;</strong>]]></m:source>
	            </m:warning>
	          
	        </m:warninglist>
	    </m:warnings>
	</m:markupvalidationresponse>
	</env:Body>
	</env:Envelope>`;

xmlFixtures.suppressed = '<?xml version="1.0" encoding="UTF-8"?><env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope"><env:Body><m:markupvalidationresponse env:encodingStyle="http://www.w3.org/2003/05/soap-encoding" xmlns:m="http://www.w3.org/2005/10/markup-validator"><m:uri>http://www.bbc.co.uk/</m:uri><m:checkedby>http://validator.w3.org/</m:checkedby><m:doctype>-//W3C//DTD XHTML 1.0 Strict//EN</m:doctype><m:charset>utf-8</m:charset><m:validity>true</m:validity><m:errors><m:errorcount>0</m:errorcount><m:errorlist></m:errorlist></m:errors><m:warnings><m:warningcount>1</m:warningcount><m:warninglist><m:warning><m:message>This interface to HTML5 document checking is obsolete. Use an interface to http://localhost:8888/html5/ instead.</m:message><m:messageid>obsolete-interface</m:messageid><m:explanation></m:explanation><m:source></m:source></m:warning></m:warninglist></m:warnings></m:markupvalidationresponse></env:Body></env:Envelope>';

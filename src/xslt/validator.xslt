<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:env="http://www.w3.org/2003/05/soap-envelope" xmlns:m="http://www.w3.org/2005/10/markup-validator" xmlns:fn="http://www.w3.org/2005/xpath-functions">

<xsl:template match="/env:Envelope/env:Body/m:markupvalidationresponse">
{
	"url": "<xsl:value-of select="m:uri" />",
	"doctype": "<xsl:value-of select="m:doctype" />",
	"errorcount": "<xsl:value-of select="m:errors/m:errorcount" />",
	"messages": {<xsl:for-each select="m:errors/m:errorlist/m:error">
		"lastLine": "<xsl:value-of select="m:line" />",
		"lastColumn": "<xsl:value-of select="m:col" />",
		"message": "<xsl:call-template name="escapeMessage">
						<xsl:with-param name="message" select="m:message" />
					</xsl:call-template>",
		"messageid": "<xsl:value-of select="m:messageid" />",
		<!-- "explanation": "<xsl:value-of select="m:explanation" />",-->
		"type": "error"
	</xsl:for-each>},
	"source": {
		"encoding": "<xsl:value-of select="m:charset" />",
		"type": "text/html"
	}
}
</xsl:template>

<xsl:template name="escapeMessage">
	<xsl:choose>
		<xsl:when test="contains($message, '&quot;')">
			<xsl:value-of select="substring-before($message, '&quot;')" />\"
			<xsl:call-template name="escapeMessage">
				<xsl:with-param name="message" select="substring-after($message, '&quot;')" />
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$message" />
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

</xsl:stylesheet>
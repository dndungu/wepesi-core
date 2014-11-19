<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" indent="yes" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" />
    <xsl:template match="/">
		<html>
			<head>
				<title>Lora Tomova</title>
			</head>
			<body>
				<script type="text/javascript">
					document.location.href = <xsl:value-of select="/uri"></xsl:value-of>
				</script>
			</body>
		</html>
    </xsl:template>
</xsl:stylesheet>

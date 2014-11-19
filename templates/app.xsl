<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" indent="yes" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" />
    <xsl:template match="/">
		<html>
			<head>
				<title>web app</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<link href="/css/app.css" rel="stylesheet"/>
		<!--		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>-->
			</head>
			<body>
				<header>
					<h1>
						<a href="/dashboard">
							<img src="/images/wepesi.png" height="32" alt="wepesi"/>
						</a>
					</h1>
					<nav class="verticaltext-left">
						<ul class="space-top">
							<li>
								<a class="current">
									<i class="fa fa-pencil"></i>
									<br/>
									write
								</a>
								<ul>
									<li>
										<a name="blog" about="/api/blog" type="form" stage="primary" template="blog-form.xsl" class="app" href="/write/blog">blog</a>
									</li>
									<li>
										<a href="/write/page">page</a>
									</li>
									<li>
										<a href="/write/testimonial">testimonial</a>
									</li>
									<li>
										<a href="/write/template">template</a>
									</li>
								</ul>
							</li>
							<li>
								<a name="drafts" href="/drafts">
									<i class="fa fa-clock-o"></i>
									<br/>
									drafts
								</a>
							</li>
							<li>
								<a name="live" href="/live">
									<i class="fa fa-cloud"></i>
									<br/>
									live
								</a>
							</li>
							<li>
								<a name="users" href="/users">
									<i class="fa fa-user"></i>
									<br/>
									users
								</a>
							</li>
							<li>
								<a name="hooks" href="/hooks">
									<i class="fa fa-share-alt"></i>
									<br/>
									apps
								</a>
							</li>
							<li>
								<a name="setup" href="/setup">
									<i class="fa fa-cogs"></i>
									<br/>
									setup
								</a>
							</li>
						</ul>
					</nav>
				</header>
				<main class="text-left primary-mode">
				</main>
				<script src="/js/main-0.0.1.js" type="text/javascript"></script>
				<script type="text/javascript">
					gereji.apps.boot();
				</script>
			</body>
		</html>
    </xsl:template>
</xsl:stylesheet>

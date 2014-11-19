<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="html" indent="yes" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" />
	<xsl:template match="/">
        <html>
   	        <head>
				<title><xsl:value-of select="/content/generic/site/title" /></title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta property="og:locale" content="{/content/generic/site/locale}" />
				<link rel="stylesheet" href="//localhost/ui/themes/zatiti/dashboard-0.0.1.css" type="text/css" />
				<link rel="stylesheet" href="/static/ui/themes/font-awesome-4.1.0/css/font-awesome.min.css" type="text/css" />
				<script src="//localhost/ui/javascripts/core/gereji.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.broker.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.sync.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.storage.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.validator.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.transition.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.model.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.collection.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.xslt.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.view.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.view.list.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.view.form.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.dom.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.query.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.mime.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.entities.js"></script>
				<script src="//localhost/ui/javascripts/core/gereji.os.js"></script>
				<script src="//localhost/ui/javascripts/apps/events.js"></script>
				<script src="//localhost/ui/javascripts/apps/collapsible.js"></script>
				<script src="//localhost/ui/javascripts/apps/form.js"></script>
				<script src="//localhost/ui/javascripts/apps/list.js"></script>
				<script src="//localhost/ui/javascripts/apps/product.js"></script>
				<script src="//localhost/ui/javascripts/apps/post.js"></script>
				<script src="//localhost/ui/javascripts/apps/dashboard.js"></script>
				<script src="//localhost/ui/javascripts/lib/tinymce/js/tinymce/tinymce.min.js"></script>
				<script src="//localhost/ui/javascripts/lib/tinymce/js/tinymce/plugins/imagestudio/plugin.js"></script>
				<script src="//localhost/ui/javascripts/lib/jquery-sizzle/dist/sizzle.min.js"></script>
			</head>
			<body>
				<header class="color-one">
					<h1 class="topbar text-left column-padding">
						<a href="/dashboard">
							<img src="//localhost/ui/themes/zatiti/images/zatiti-white.png" height="24" alt="Zatiti"/>
						</a>
					</h1>
					<nav class="vertical text-left">
						<ul>
							<li class="collapsible">
								<a class="dashboard-nav collapsible- collapsible-openclose clearfix">
									<i class="fa fa-bar-chart-o bubble-up"></i>Sales
								</a>
                                <ul>
                                    <li>
                                        <a href="/dashboard/sales" name="sales" about="/api/sales" class="dashboard-nav list-items">
											<i class="fa fa-money bubble-up"></i>Paid
										</a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/packed" name="packed" about="/api/packed" class="dashboard-nav list-items">
											<i class="fa fa-truck bubble-up"></i>Packed
										</a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/shipped" name="shipped" about="/api/shipped" class="dashboard-nav list-items">
                                            <i class="fa fa-truck bubble-up"></i>Shipped
                                        </a>
                                    </li>
                                </ul>
							</li>
                            <li class="collapsible">
                                <a class="dashboard-nav collapsible-openclose">
                                    <i class="fa fa-university bubble-up"></i>Revenue
                                </a>
                                <ul>
                                    <li>
                                        <a href="/dashboard/statement" name="statement" about="/api/statement" class="dashboard-nav list-items">
											<i class="fa fa-list-alt bubble-up"></i>Statement
										</a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/payments" name="payments" about="/api/payments" class="dashboard-nav list-items">
											<i class="fa fa-money bubble-up"></i>Payments
										</a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/settlement" name="settlement" about="/api/settlement" class="dashboard-nav list-items">
											<i class="fa fa-university bubble-up"></i>Settlement
										</a>
                                    </li>
                                </ul>
                            </li>
							<li class="collapsible">
								<a name="product" type="list" about="/api/products" stage="primary" class="dashboard-nav collapsible-openclose list-items">
									<i class="fa fa-cubes bubble-up"></i>Catalog
								</a>
                                <ul>
                                    <li>
                                        <a name="product" type="list" about="/api/products" stage="primary" class="dashboard-nav list-items">
											<i class="fa fa-cubes bubble-up"></i>Inventory
										</a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/purchases" name="purchase" about="/api/purchases" class="dashboard-nav list-items">
											<i class="fa fa-cubes bubble-up"></i>Purchase Orders
										</a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/adjustment" name="adjustment" about="/api/adjustment" class="dashboard-nav list-items">
											<i class="fa fa-cubes bubble-up"></i>Stock Adjustment
										</a>
                                    </li>
                                </ul>
							</li>
							<li class="collapsible">
								<a name="post" type="list" about="/api/posts" stage="primary" class="dashboard-nav collapsible-openclose list-items">
									<i class="fa fa-code bubble-up"></i>Website
								</a>
                                <ul>
                                    <li>
                                        <a name="post" type="list" about="/api/posts" stage="primary" class="dashboard-nav list-items">
											<i class="fa fa-code bubble-up"></i>Blog
										</a>
                                    </li>
                                    <li>
                                        <a name="page" type="list" about="/api/pages" stage="primary" class="dashboard-nav list-items">
											<i class="fa fa-code bubble-up"></i>Pages
										</a>
                                    </li>
                                    <li>
                                        <a name="banner" type="list" about="/api/banners" stage="primary" class="dashboard-nav list-items">
                                            <i class="fa fa-code bubble-up"></i>Banners
                                        </a>
                                    </li>
                                    <li>
                                        <a name="link" type="list" about="/api/links" stage="primary" class="dashboard-nav list-items">
											<i class="fa fa-code bubble-up"></i>Menu
										</a>
                                    </li>
                                </ul>
							</li>
                            <li class="collapsible">
                                <a class="dashboard-nav collapsible-openclose">
                                    <i class="fa fa-users bubble-up"></i>Relationships
                                </a>
                                <ul>
                                    <li>
                                        <a href="/dashboard/customers" name="customer" about="/api/customers" class="dashboard-nav list-items">
											<i class="fa fa-users bubble-up"></i>Customers
										</a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/suppliers" name="supplier" about="/api/suppliers" class="dashboard-nav list-items">
											<i class="fa fa-users bubble-up"></i>Suppliers
										</a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/staff" name="staff" about="/api/staff" class="dashboard-nav list-items">
											<i class="fa fa-users bubble-up"></i>Staff
										</a>
                                    </li>
                                </ul>
                            </li>
							<li class="collapsible">
								<a class="dashboard-nav collapsible-openclose">
									<i class="fa fa-th-large bubble-up"></i>Intelligence
								</a>
								<ul>
									<li>
										<a href="/dashboard/staff" name="staff" about="/api/staff" class="dashboard-nav list-items">
											<i class="fa fa-th-large bubble-up"></i>
											Overview
										</a>
									</li>
                                    <li>
                                        <a href="/dashboard/staff" name="staff" about="/api/staff" class="dashboard-nav list-items">
                                            <i class="fa fa-th-large bubble-up"></i>
                                            Lorem Ipsum
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/staff" name="staff" about="/api/staff" class="dashboard-nav list-items">
                                            <i class="fa fa-th-large bubble-up"></i>
                                            Lorem Ipsum
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/staff" name="staff" about="/api/staff" class="dashboard-nav list-items">
                                            <i class="fa fa-th-large bubble-up"></i>
                                            Lorem Ipsum
                                        </a>
                                    </li>
								</ul>	
							</li>
							<li class="collapsible">
								<a class="dashboard-nav collapsible-openclose">
									<i class="fa fa-cog bubble-up"></i>Settings
								</a>
								<ul>
                                    <li>
                                        <a href="/dashboard/staff" name="staff" about="/api/staff" class="dashboard-nav list-items">
                                            <i class="fa fa-phone bubble-up"></i>Contacts
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/staff" name="staff" about="/api/staff" class="dashboard-nav list-items">
                                            <i class="fa fa-truck bubble-up"></i>Shipping
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/staff" name="staff" about="/api/staff" class="dashboard-nav list-items">
                                            <i class="fa fa-usd bubble-up"></i>Payments
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/settings/promotion" name="promotion" about="/settings/promition" class="dashboard-nav list-items">
                                            <i class="fa fa-bullhorn bubble-up"></i>Promotion
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/settings/website" name="website" about="/settings/website" class="dashboard-nav list-items">
                                            <i class="fa fa-globe bubble-up"></i>Website
                                        </a>
                                    </li>			
								</ul>
							</li>
						</ul>
					</nav>
				</header>
				<main class="color-two text-left primary-mode">
					<section class="color-three topbar text-left clearfix">
						<form class="pull-left dashboard-search form-horizontal">
							<label class="clearfix text-left">
								<i class="fa fa-search pull-left"></i>
								<input type="text" name="search" placeholder="Search" size="48" class="pull-left"/>
							</label>
						</form>
						<nav class="pull-right">
							<ul class="column-padding">
								<li>
									<a class="clearfix">
										<img src="//localhost/ui/themes/default/images/me.jpg" class="circle avatar pull-left" width="32"/>
										<span class="space-left pull-left half-space-top">
											My Account
											<i class="fa fa-caret-down half-space-left"></i>
										</span>
									</a>
									<ul>
										
									</ul>
								</li>
							</ul>
						</nav>
					</section>
					<section class="stage clearfix">
						<section class="primary pull-left" id="primary"></section>
						<section class="secondary pull-left" id="secondary"></section>
					</section>
				</main>
				<script type="text/javascript">gereji.apps.boot();</script>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>

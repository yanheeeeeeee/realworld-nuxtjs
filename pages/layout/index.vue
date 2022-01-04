<template>
	<div>
		<!-- 顶部导航栏 -->
		<nav class="navbar navbar-light">
			<div class="container">
				<nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
				<ul class="nav navbar-nav pull-xs-right">
					<li class="nav-item">
						<nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
					</li>
					<li class="nav-item">
						<nuxt-link class="nav-link" to="/editor"> <i class="ion-compose"></i>&nbsp;New Article </nuxt-link>
					</li>
					<li class="nav-item">
						<nuxt-link class="nav-link" to="/setting"> <i class="ion-gear-a"></i>&nbsp;Settings </nuxt-link>
					</li>
					<li class="nav-item">
						<nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
					</li>
					<li class="nav-item">
						<nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
					</li>
					<li class="nav-item">
						<nuxt-link class="nav-link" to="/profile/lpz999">
							<img class="user-pic" src="https://pic3.zhimg.com/cb962ef295393ea6b4471f50d18812fd_is.jpg" />
							lpz999
						</nuxt-link>
					</li>
				</ul>
			</div>
		</nav>

		<!-- 路由视图 -->
		<nuxt-child />

		<!-- 底部导航栏 -->
		<footer>
			<div class="container">
				<nuxt-link to="/" class="logo-font">conduit</nuxt-link>
				<span class="attribution">
					An interactive learning project from <nuxt-link to="https://thinkster.io">Thinkster</nuxt-link>. Code &amp;
					design licensed under MIT.
				</span>
			</div>
		</footer>
	</div>
</template>
<script>
export default {
	name: "Layout",
};
</script>

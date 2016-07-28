<html>
<head>
	<title>ViP Enterprises</title>
	<link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

	<style>
		html, body {
			height: 100%;
		}
		body {
			margin: 0;
			padding: 0;
			width: 100%;
			display: table;
			font-weight: 100;
			font-family: 'Lato', sans-serif;
		}
		.container {
			text-align: center;
			display: table-cell;
			vertical-align: middle;
		}
		.content {
			text-align: center;
			display: inline-block;
		}
		.title {
			font-size: 96px;
		}
	</style>
</head>

<body>
<div class="container">
	<div class="content">
		<my-app>
			<div class="title">Laravel 5</div>
		</my-app>
	</div>
</div>
</body>
<script src="{{ $requireScript }}"></script>
<script src="{{ $appScript }}"></script>
</html>
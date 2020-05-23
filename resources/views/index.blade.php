
<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

    <base href="/">
</head>
<body>

<my-app></my-app>

<script type="text/javascript" src="{{ versioned_asset('assets/manifest.js') }}"></script>
<script type="text/javascript" src="{{ versioned_asset('assets/vendor.js') }}"></script>
<script type="text/javascript" src="{{ versioned_asset('assets/app.js') }}"></script>
</body>
</html>

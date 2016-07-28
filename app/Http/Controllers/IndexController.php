<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class IndexController extends Controller
{
    public function index()
    {
	    return view('welcome', [
	    	'requireScript'    => config('app.env') == 'local' ? 'http://localhost:8080/require.bundle.js' : 'http://localhost:8080/require.bundle.js',
		    'appScript'        => config('app.env') == 'local' ? 'http://localhost:8080/app.bundle.js' : 'http://localhost:8080/app.bundle.js',
	    ]);
    }
}

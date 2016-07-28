<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class IndexController extends AngularController
{
    public function index()
    {
	    return view('welcome', [
	    	'requireScript'    => $this->requireScript,
		    'appScript'        => $this->appScript,
	    ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class AngularController extends Controller
{
		protected $appScript;
		protected $requireScript;

    public function __construct()
    {
    	$this->appScript = config('app.env') == 'local' ? 'http://localhost:8080/app.bundle.js' : url('app.bundle.js');
	    $this->requireScript = config('app.env') == 'local' ? 'http://localhost:8080/require.bundle.js' : url('require.bundle.js');
    }
}

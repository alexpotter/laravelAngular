<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class AngularController extends Controller
{
	protected $appScript;

    public function __construct()
    {
    	$this->appScript = config('app.env') == 'local' ? 'http://localhost:8080/app.bundle.js' : url('app.bundle.js');
    }
}

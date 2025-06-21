<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Acara;
use Illuminate\Http\Request;

class AcaraController extends Controller
{
    public function index()
    {
        $groupedAcara = Acara::all()->groupBy('category');
        return response()->json($groupedAcara);
    }

    public function show(string $id)
    {
        $acara = Acara::findOrFail($id);
        return response()->json($acara);
    }
}
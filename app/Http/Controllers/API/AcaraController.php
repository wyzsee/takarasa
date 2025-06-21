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
        // Menambahkan URL lengkap untuk image_path
        foreach ($groupedAcara as $category => $acaras) {
            foreach ($acaras as $acara) {
                $acara->image_path = asset($acara->image_path);
            }
        }
        return response()->json($groupedAcara);
    }

    public function show(string $id)
    {
        $acara = Acara::findOrFail($id);
        return response()->json($acara);
    }
}
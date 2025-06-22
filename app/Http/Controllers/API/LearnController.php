<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Learn;
use App\Models\LearnMaterial;

class LearnController extends Controller
{
    public function index()
    {
        $learns = Learn::all();
        $learns->each(function ($learn) {
            $learn->icon = asset('/storage/learn/' . $learn->name . '/icon.svg');
        });
        return response()->json($learns);
    }

    public function show($id)
    {
        $learn = Learn::where('id', $id)
                        ->firstOrFail();
        $learn->icon = asset('/storage/learn/' . $learn->name . '/icon.svg');
        return response()->json($learn);
    }

    public function learnMaterials($id)
    {
        $materials = LearnMaterial::where('learn_id', $id)
                                    ->get();
        return response()->json($materials);
        if ($materials->isEmpty()) {
        return response()->json([], 200); // Biarkan frontend menangani data kosong
}
    }

    public function materialContent($id)
    {
        $content = LearnMaterial::where('learn_id', $id)
                                    ->get();
        return response()->json($content);
    }
}

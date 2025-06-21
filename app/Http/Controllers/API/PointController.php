<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Point;

class PointController extends Controller
{
    public function show($id)
    {
        $point = Point::where('user_id', $id)->firstOrFail();
        $total_point = Point::sum('value');

        $in = Point::where('user_id', $id)
                    ->where('category', 'in')
                    ->get();

        $out = Point::where('user_id', $id)
                    ->where('category', 'out')
                    ->get();

        return response()->json([
            'points_record' => $point,
            'total_points' => $total_point,
            'in_points_record' => $in,
            'out_points_record' => $out,
        ]);
    }
}

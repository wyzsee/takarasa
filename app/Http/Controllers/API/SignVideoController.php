<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SignVideo;

class SignVideoController extends Controller
{
    public function search(Request $request) 
    {
        $query = $request->query('q');

        $video = SignVideo::where('title', 'LIKE', '%'.$query.'%')->first();

        if ($video) {
            $file_url = asset('storage/sign_videos/'.$video->filename);
            return response()->json(['file_url' => $file_url]);
        } else {
            return response()->json([
                'message' => 'Video not found.'
            ], 404);
        }
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Learn;
use App\Models\LearnMaterial;
use App\Models\WatchedVideo;
use Illuminate\Support\Facades\Auth;

class LearnMaterialController extends Controller
{
    public function showContent($id)
    {
        $content = LearnMaterial::where('id', $id)
            ->firstOrFail();
        $content->media = asset('storage/learn/' . $content->media);

        return response()->json($content);
    }

    public function isWatched($userId, $learnId, $materialId)
    {
        $exists = WatchedVideo::where('user_id', $userId)
            ->where('learn_id', $learnId)
            ->where('learn_material_id', $materialId)
            ->exists();

        return response()->json(['watched' => $exists]);
    }

    // POST /api/watched
    public function markWatched(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'learn_id' => 'required|exists:learns,id',
            'learn_material_id' => 'required|exists:learn_materials,id',
        ]);

        $exists = WatchedVideo::where('user_id', $request->user_id)
            ->where('learn_id', $request->learn_id)
            ->where('learn_material_id', $request->learn_material_id)
            ->exists();

        if (!$exists) {
            WatchedVideo::create([
                'user_id' => $request->user_id,
                'learn_id' => $request->learn_id,
                'learn_material_id' => $request->learn_material_id,
                'watched_at' => now()
            ]);
        }

        return response()->json(['message' => 'Tersimpan']);
    }

    public function percentage($userId, $learnId)
    {
        $learnMaterialsCount = LearnMaterial::where('learn_id', $learnId)->count();
        $watchedCount = WatchedVideo::where('user_id', $userId)
            ->whereHas('learnMaterial', fn($q) => $q->where('learn_id', $learnId))
            ->count();

        $progress = round(($watchedCount / $learnMaterialsCount) * 100);

        return response()->json($progress);

    }
}
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Score;
use App\Models\Point;

use Carbon\Carbon;

class QuizController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $userId = $user->id;
        \Log::info('Authenticated User ID: ' . ($userId ?? 'null'));

        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $quizzes = Quiz::all()->map(function ($quiz) use ($userId) {
            $userScore = Score::where('user_id', $userId)
                ->where('quiz_id', $quiz->id)
                ->first();

            return [
                'id' => $quiz->id,
                'icon' => asset('storage/quiz/' . $quiz->title . '/icon.svg'),
                'title' => $quiz->title,
                'total_quest' => $quiz->total_quest,
                'poin' => $quiz->poin,
                'slug' => $quiz->slug,
                'score' => $userScore ? $userScore->score : 0,
            ];
        });

        return response()->json($quizzes);
    }

    public function show($slug)
    {
        $quiz = Quiz::where('slug', $slug)
            ->firstOrFail();
        $quiz->icon = asset('storage/quiz/' . $quiz->title . '/icon.svg');
        return response()->json($quiz);
    }

    public function getQuestions($slug)
    {
        $quiz = Quiz::where('slug', $slug)->firstOrFail();
        $questions = $quiz->questions()->with('quiz')->get();
        return response()->json($questions);
    }

    public function submitAnswers(Request $request, $slug)
    {
        $quiz = Quiz::where('slug', $slug)->firstOrFail();
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.selected_option' => 'required|integer|between:1,4',
        ]);

        $correct = 0;
        $wrong = 0;

        foreach ($request->answers as $entry) {
            $question = Question::find($entry['question_id']);

            if ($question->answer == $entry['selected_option']) {
                $correct++;
            } else {
                $wrong++;
            }

        }

        $total = $correct + $wrong;
        $score = $total > 0 ? round(($correct / $total) * 100) : 0;
        $status = $score >= 60 ? 'passed' : 'try_again';

        $scoreRecord = Score::where('user_id', $request->user_id)
            ->where('quiz_id', $quiz->id)
            ->first();

        $awardStatus = $scoreRecord ? $scoreRecord->award_status : '0';
        $newAwardStatus = $awardStatus;

        $pointsAwarded = 0;

        if ($status === 'passed'){
            if ($awardStatus === '0'){
                $newAwardStatus = '1';
            } else if ($awardStatus === '1'){
                $newAwardStatus = '2';
            }
            
        } 

        if ($newAwardStatus === '1') {
            $pointsValue = $quiz->poin;
            $date = Carbon::now('Asia/Jakarta');

            Point::create([
                'value' => $pointsValue,
                'category' => 'in',
                'date' => $date,
                'description' => 'Poin masuk dari kuis '.$quiz->title,
                'user_id' => $request->user_id,
            ]);

            $pointsAwarded = $pointsValue;

        } else if ($newAwardStatus === '2') {
            $pointsAwarded = 0;
        }

        if ($scoreRecord) {
            $scoreRecord->update([
                'correct' => $correct,
                'wrong' => $wrong,
                'score' => $score,
                'status' => $status,
                'award_status' => $newAwardStatus,
            ]);
        } else {
            Score::create([
                'user_id' => $request->user_id,
                'quiz_id' => $quiz->id,
                'correct' => $correct,
                'wrong' => $wrong,
                'score' => $score,
                'status' => $status,
                'award_status' => $newAwardStatus,
            ]);
        }
        return response()->json([
            'message' => 'Quiz answers submitted successfully!',
            'score' => $score,
            'correct' => $correct,
            'wrong' => $wrong,
            'status' => $status,
            'points_awarded' => $pointsAwarded,
        ], 200);
    }
}

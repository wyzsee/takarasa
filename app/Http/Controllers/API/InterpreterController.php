<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Interpreter;
use Illuminate\Http\Request;

class InterpreterController extends Controller
{
    /**
     * Display a listing of the resource.
     * Menampilkan semua data JBI.
     */
    public function index()
    {
        $interpreters = Interpreter::all();
        return response()->json($interpreters);
    }

    /**
     * Display the specified resource.
     * Menampilkan data satu JBI berdasarkan ID.
     */
    public function show(string $id)
    {
        // findOrFail akan otomatis mengembalikan error 404 jika ID tidak ditemukan
        $interpreter = Interpreter::findOrFail($id);
        return response()->json($interpreter);
    }
}

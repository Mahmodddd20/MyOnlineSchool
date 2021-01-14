<?php

namespace App\Http\Controllers;

use App\Models\HAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $answer = HAnswer::all();
        return $answer;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $new = HAnswer::create($request->validate([
            'title'=> 'required',
            'description'=> 'required',
            'homework_id'=> 'required',
            'student_id'=>'required'
        ]));
        return response()->json($new);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function finished($id)
    {
        $count=DB::table('h_answers')->where('student_id','=',auth()->id())->
            where('homework_id','=',$id)->count();
        return response()->json($count);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HAnswer  $hAnswer
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $answer = HAnswer::all()->find($id);
        return response($answer);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HAnswer  $hAnswer
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $request->validate([
            'name'=> 'required',
            'type'=> 'required',
            'description'=> 'required',
            'link'=> 'required',
            'week_id'=> 'required',
        ]);
        $answer = HAnswer::findOrFail($id);
        $answer->name=$request->name;
        $answer->type=$request->type;
        $answer->description=$request->description;
        $answer->link=$request->link;
        $answer->save();
        return response()->json(['data'=>$answer,'success'=>true]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HAnswer  $hAnswer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HAnswer $hAnswer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HAnswer  $hAnswer
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $answer = HAnswer::findOrFail($id);
        $answer->delete();
        return response()->json(['data'=>$answer,'success'=>true]);

    }
    public function showall($id)
    {
        $answer = DB::table('h_answers')->
        where('homework_id','=',$id)->
        join('users','users.id','=','h_answers.student_id')->
        select('h_answers.*','users.name as userName','users.email as userEmail')->get();

        return response($answer);

    }

}

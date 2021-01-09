<?php

namespace App\Http\Controllers;

use App\Models\HAnswer;
use Illuminate\Http\Request;

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
            'name'=> 'required',
            'type'=> 'required',
            'description'=> 'required',
            'link'=> 'required',
            'week_id'=> 'required',
        ]));
        return response()->json(['data' => $new, 'success' => true]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
}

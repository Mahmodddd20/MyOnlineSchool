<?php

namespace App\Http\Controllers;

use App\Models\Homework;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeworkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $homework = Homework::all();
        return $homework;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $new = Homework::create($request->validate([
            'name'=> 'required',
            'type'=> 'required',
            'description'=> 'required',
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
     * @param  \App\Models\Homework  $homework
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $homework = Homework::all()->find($id);
        return response($homework);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Homework  $homework
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $request->validate([
            'name'=> 'required',
            'type'=> 'required',
            'description'=> 'required',
            'homework_id'=> 'required',
        ]);
        $homework = Homework::findOrFail($request->homework_id);
        $homework->name=$request->name;
        $homework->type=$request->type;
        $homework->description=$request->description;
        $homework->save();
        return response()->json(['data'=>$homework,'success'=>true]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Homework  $homework
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Homework $homework)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Homework  $homework
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $homework = Homework::findOrFail($id);
        $homework->delete();
        return response()->json(['data'=>$homework,'success'=>true]);

    }
    public function classes_week_homeworks($id)
    {
        $homework = DB::table('weeks')
            ->join('homework','week_id','=','weeks.id')
            ->select('homework.id','homework.name','homework.type','homework.description','homework.week_id')
            ->where('homework.week_id','=',$id)
            ->get();


        return response()->json( $homework);

    }

}

<?php

namespace App\Http\Controllers;

use App\Models\Homework;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeworkController extends Controller
{
    /**
     * Create homework.
     *
     * @param Request $request
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
     * Display the homework by id.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $homework = Homework::all()->find($id);
        return response($homework);

    }

    /**
     * Edite the homework.
     *
     * @param Request $request
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
     * Delete the homework.
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
    /**
     * Show all homeworks in a week.
     *
     * @param  \App\Models\Homework  $homework
     * @return \Illuminate\Http\Response
     */

    public function homeworksOfWeek($id)
    {
        $homework = DB::table('weeks')
            ->join('homework','week_id','=','weeks.id')
            ->select('homework.id','homework.name','homework.type','homework.description','homework.week_id')
            ->where('homework.week_id','=',$id)
            ->get();


        return response()->json( $homework);

    }

}

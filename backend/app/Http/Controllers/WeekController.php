<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Week;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Mail\newTask;
use Illuminate\Support\Facades\Mail;

use function Sodium\add;

class WeekController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $week = Week::all();
        return $week;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $week = Week::create($request->validate([
            'name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'class_id'=> 'required',
        ]));
        return response()->json(['data' => $week, 'success' => true]);

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
     * @param  \App\Models\Week  $week
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $week = Week::all()->find($id);
        return response($week);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Week  $week
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request ,$id)
    {
        $request->validate([
            'name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);
        $week = Week::findOrFail($id);
        $week->name=$request->name;
        $week->start_date=$request->start_date;
        $week->end_date=$request->end_date;
        $week->save();
        return response()->json(['data'=>$week,'success'=>true]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Week  $week
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Week $week)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Week  $week
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $week = Week::findOrFail($id);
        $week->delete();
        return response()->json(['data'=>$week,'success'=>true]);

    }
    public function class_weeks($id)
    {
        $weeks = DB::table('classrooms')
            ->join('weeks','class_id','=','classrooms.id')
            ->select('weeks.id','weeks.name','weeks.start_date','weeks.end_date')
            ->where('weeks.class_id','=',$id)
            ->get();
        $room = Classroom::all()->find($id);
//'classroom' => $room,
        return response()->json($weeks);

    }
    public function classes_weeks(){
        $rooms = DB::table('classrooms')->select('id')->get();
        $result = [];
        foreach ( $rooms as $i){
            $id=$i->id;
            $weeks = DB::table('classrooms')
                ->join('weeks','class_id','=','classrooms.id')
                ->select('weeks.id','weeks.name','weeks.start_date','weeks.end_date')
                ->where('weeks.class_id','=',$id)
                ->get();
            $room = Classroom::all()->find($id);

            $result[]=['classroom',$room,'all weeks',$weeks];

        }
        return response()->json( $result);

    }




}

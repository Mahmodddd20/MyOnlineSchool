<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class classroomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $room = DB::table('classrooms')->
        join('users','users.id','=','classrooms.teacher_id')->
        select('classrooms.*','users.name as teacher_name','users.email as teacher_email')->
        get();
        return response($room) ;
    }
    public function views()
    {
        return view('email.costumemail');
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
            $room = Classroom::create($request->validate([
                'name' => 'required||unique:classrooms',
                'teacher_id'=> 'required|int',
                'start_date' => 'required',
                'finish_date' => 'required'
            ]));
            return response()->json(['data' => $room, 'success' => true]);


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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $room = Classroom::all()->find($id);
        return response($room);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request ,$id)
    {
        $request->validate([
            'name'=>'required||unique:classrooms',
            'start_date'=>'required',
            'finish_date'=>'required'
        ]);
        $room = Classroom::findOrFail($id);
        $room->name=$request->name;
        $room->start_date=$request->start_date;
        $room->finish_date=$request->finish_date;
        $room->save();
        return response()->json(['data'=>$room,'success'=>true]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $room = Classroom::findOrFail($id);
        $room->delete();
        return response()->json(['data'=>$room,'success'=>true]);

    }
    public function classTeacher()
    {
        $room = DB::table('classrooms')->select('*')->where('teacher_id','=',Auth::id())->
        join('users','users.id','=','classrooms.teacher_id')->
        select('classrooms.*','users.name as teacher_name','users.email as teacher_email')->get();
        return response()->json($room, 200);
    }
    public function classStudent(){
        $id=auth()->user()->id;
        $room = DB::table("classroom__students")->
        where('student_id','=',$id)->
        join('classrooms','classrooms.id','=','classroom__students.class_id')->
        select('*')->
        join('users','users.id','=','classrooms.teacher_id')->
        select('classrooms.id as classId','classrooms.name as className','classrooms.start_date','classrooms.finish_date','users.name as teacherName','users.email as teacherEmail')->
        get();
        return response()->json($room);
    }
    public function teacherInClass($id)
    {
        $room = DB::table('classrooms')->where('classrooms.id','=',$id)->
        join('users','users.id','=','classrooms.teacher_id')->
        select('users.id as userId','users.name as userName','users.email as userEmail','users.picture as userPicture')->get();
        return response()->json($room, 200);


    }
}

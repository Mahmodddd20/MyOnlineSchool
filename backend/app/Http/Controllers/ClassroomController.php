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
     * Display a listing of the classes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $classRooms = DB::table('classrooms')->
        join('users','users.id','=','classrooms.teacher_id')->
        select('classrooms.*','users.name as teacher_name','users.email as teacher_email')->
        get();
        return response($classRooms) ;
    }

    /**
     * Show the form for creating a new class.
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
            $classRoom = Classroom::create($request->validate([
                'name' => 'required||unique:classrooms',
                'teacher_id'=> 'required|int',
                'start_date' => 'required',
                'finish_date' => 'required'
            ]));
            return response()->json(['data' => $classRoom, 'success' => true]);


    }

    /**
     * Display the details of class by id.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $classRoom = Classroom::all()->find($id);
        return response($classRoom);

    }

    /**
     * Update the classroom details.
     *
     * @param \Illuminate\Http\Request $request
     * @param Request $request int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request , $id)
    {
        $request->validate([
            'name'=>'required||unique:classrooms',
            'start_date'=>'required',
            'finish_date'=>'required'
        ]);
        $classRoom = Classroom::findOrFail($id);
        $classRoom->name=$request->name;
        $classRoom->start_date=$request->start_date;
        $classRoom->finish_date=$request->finish_date;
        $classRoom->save();
        return response()->json(['data'=>$classRoom,'success'=>true]);

    }

    /**
     * Delete the classroom.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $classRoom = Classroom::findOrFail($id);
        $classRoom->delete();
        return response()->json(['data'=>$classRoom,'success'=>true]);

    }
    /**
     * Details the teacher classrooms.
     *
     * @return \Illuminate\Http\Response
     */

    public function classesOfTeacher()
    {
        $classRoom = DB::table('classrooms')->select('*')->where('teacher_id','=',Auth::id())->
        join('users','users.id','=','classrooms.teacher_id')->
        select('classrooms.*','users.name as teacher_name','users.email as teacher_email')->get();
        return response()->json($classRoom, 200);
    }

    /**
     * Details the teacher of classroom.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */

    public function teacherInClass($id)
    {
        $classRoom = DB::table('classrooms')->where('classrooms.id','=',$id)->
        join('users','users.id','=','classrooms.teacher_id')->
        select('users.id as userId','users.name as userName','users.email as userEmail','users.picture as userPicture')->get();
        return response()->json($classRoom, 200);


    }
}

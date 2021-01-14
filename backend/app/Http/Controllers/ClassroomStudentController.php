<?php

namespace App\Http\Controllers;

use App\Models\Classroom_Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClassroomStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $room = Classroom_Student::all();
        return $room;


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $room = Classroom_Student::create($request->validate([
            'student_id' => 'required|int',
            'class_id'=> 'required|int'
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
        $room = Classroom_Student::all()->find($id);
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
            'student_id' => 'required|int',
            'class_id'=> 'required|int'
        ]);
        $room = Classroom_Student::findOrFail($id);
        $room->student_id=$request->student_id;
        $room->class_id=$request->class_id;
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
        $room = Classroom_Student::findOrFail($id);
        $room->delete();
        return response()->json(['data'=>$room,'success'=>true]);

    }
    public function classStudent($id)
    {
        $classroom = DB::table('classroom__students')->where('class_id','=',$id)->
        join('users','users.id','=','classroom__students.student_id')->
        select('users.id as userId','users.name as userName','users.email as userEmail','role as userRole','users.picture as userPicture')->
        get();
        $student = DB::table('classroom__students')->select('student_id')->where('class_id','=',$id)->
        join('users','id','=','classroom__students.student_id')->
        select('id','name','email','role')->get();
        return response()->json( $classroom, 200);

    }
    public function studentsEmails($id)
    {
        $classroom = DB::table('classroom__students')->where('class_id','=',$id)->
        join('users','users.id','=','classroom__students.student_id')->
        select('users.id as userId','users.name as userName')->
        get();
        $student = DB::table('classroom__students')->select('student_id')->where('class_id','=',$id)->
        join('users','id','=','classroom__students.student_id')->
        select('email','name')->get();
        return  $student;

    }



}

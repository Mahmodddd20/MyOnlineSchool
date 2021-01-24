<?php

namespace App\Http\Controllers;

use App\Models\Classroom_Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClassroomStudentController extends Controller
{
    /**
     * Add student to classroom.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $classRoom = Classroom_Student::create($request->validate([
            'student_id' => 'required|int',
            'class_id'=> 'required|int'
        ]));
        return response()->json(['data' => $classRoom, 'success' => true]);


    }


    /**
     * Remove the student  from the classroom.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $student_id=$request->student_id;
        $class_id=$request->class_id;
        $classroom = DB::table('classroom__students')->
        where('class_id','=',$class_id)->
        where('student_id','=',$student_id)->delete();

        return response()->json(['data'=>$classroom,'success'=>true]);

    }

    /**
     * find the details of all the students in the classroom.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */

    public function AllStudentsInClass($id)
    {
        $classroom = DB::table('classroom__students')->where('class_id','=',$id)->
        join('users','users.id','=','classroom__students.student_id')->
        select('users.id as userId','users.name as userName','users.email as userEmail','role as userRole','users.picture as userPicture')->
        get();
        return response()->json( $classroom, 200);

    }

    /**
     * find the details of all the classroom of the logged student.
     *
     * @return \Illuminate\Http\Response
     */

    public function detailsTheClassesOfLoggedStudent()
    {
        $id=auth()->user()->id;
        $classrooms = DB::table("classroom__students")->
        where('student_id','=',$id)->
        join('classrooms','classrooms.id','=','classroom__students.class_id')->
        join('users','users.id','=','classrooms.teacher_id')->
        select('classrooms.id as classId','classrooms.name as className','classrooms.start_date','classrooms.finish_date','users.name as teacherName','users.email as teacherEmail')->
        get();
        return response()->json($classrooms);
    }




}

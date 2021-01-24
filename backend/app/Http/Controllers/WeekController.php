<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Week;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Mail\newTask;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use function Sodium\add;

class WeekController extends Controller
{
    /**
     * Create new week and then send email to students to inform them.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $week = Week::create($request->validate([
            'name' => 'required',
            'description'=>'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'class_id'=> 'required',
        ]));
        $all_emails=DB::table('classroom__students')->
        where('class_id','=',$request->class_id)->
        join('users','id','=','classroom__students.student_id')->
        select('email','name','role')->get();
        foreach($all_emails as $email){

            $sender1=auth()->user()->role;
            $sender2=auth()->user()->name;
            $sender=ucwords($sender1.' '. $sender2);

            $to_name = ucwords($email->role.' '.$email->name);
            $to_email = $email->email;
            $data = array('name'=>auth()->user()->name, 'body' => 'new week binges');
            Mail::send('email.newweek', $data, function($message) use ($sender, $to_name, $to_email) {
                $message->to($to_email, $to_name)
                    ->subject('New Week Started');
                $message->from(auth()->user()->email,$sender);
            });}

            return response()->json(['data' => $week, 'success' => true]);

    }

    /**
     * Show the week by id.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $week = Week::all()->find($id);
        return response($week);

    }

    /**
     * Edit the week.
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request ,$id)
    {
        $request->validate([
            'name' => 'required',
            'description'=>'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);
        $week = Week::findOrFail($id);
        $week->name=$request->name;
        $week->description=$request->description;
        $week->start_date=$request->start_date;
        $week->end_date=$request->end_date;
        $week->save();
        return response()->json(['data'=>$week,'success'=>true]);

    }

    /**
     * Delete the week.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $week = Week::findOrFail($id);
        $week->delete();
        return response()->json(['data'=>$week,'success'=>true]);

    }
    /**
     * Show all weeks in classroom.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */

    public function weeksOfClass($id)
    {
        $weeks = DB::table('classrooms')
            ->join('weeks','class_id','=','classrooms.id')
            ->select('weeks.id','weeks.name','weeks.description','weeks.start_date','weeks.end_date')
            ->where('weeks.class_id','=',$id)
            ->get();
        return response()->json($weeks);

    }
    public function classes_weeks(){
        $rooms = DB::table('classrooms')->select('id')->get();
        $result = [];
        foreach ( $rooms as $i){
            $id=$i->id;
            $weeks = DB::table('classrooms')
                ->join('weeks','class_id','=','classrooms.id')
                ->select('weeks.id','weeks.name','week.description','weeks.start_date','weeks.end_date')
                ->where('weeks.class_id','=',$id)
                ->get();
            $room = Classroom::all()->find($id);

            $result[]=['classroom',$room,'all weeks',$weeks];

        }
        return response()->json( $result);

    }

}








<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class EmailsController extends Controller
{
    public function newweek($id)
    {
        $all_emails=DB::table('classroom__students')->select('student_id')->where('class_id','=',$id)->
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
            });
    }}
    public function sendemail(Request $request,$id)
    {
        $all_emails=DB::table('classroom__students')->select('student_id')->where('class_id','=',$id)->
        join('users','id','=','classroom__students.student_id')->
        select('email','name','role')->get();
        foreach($all_emails as $email){

            $sender1=auth()->user()->role;
            $sender2=auth()->user()->name;
            $sender=ucwords($sender1.' '. $sender2);

            $to_name = ucwords($email->role.' '.$email->name);
            $to_email = $email->email;
            $data = array('subject'=>$request->subject, 'body' => $request->description);
            Mail::send('email.costumemail', $data, function($message) use ($request, $sender, $to_name, $to_email) {
                $message->to($to_email, $to_name)
                    ->subject($request->subject);
                $message->from(auth()->user()->email,$sender);
            });
        }
        return $request;
    }
    public function welcomeEmail(Request $request)
    {

            $password=$request->password;

            $sender1=auth()->user()->role;
            $sender2=auth()->user()->name;
            $sender=ucwords($sender1.' '. $sender2);

            $to_name = ucwords($request->role.' '.$request->name);
            $to_email = $request->email;
            $data = array('name'=>auth()->user()->name,
                'body' => 'Welcome To MyOnlineSchool',
                'password'=>$request->password,
                'sender'=>$sender,
                'to_email'=>$to_email);
            Mail::send('email.welcomeemail', $data, function($message) use ($sender, $to_name, $to_email, $password) {
                $message->to($to_email, $to_name)
                    ->subject('You Are Registered Successfully');
                $message->from(auth()->user()->email,$sender);
            });
        }



}

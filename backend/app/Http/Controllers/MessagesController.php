<?php

namespace App\Http\Controllers;

use App\Models\Messages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Pusher\Pusher;

class MessagesController extends Controller
{
    public function index($id){
        $messages = DB::table('messages')->
        where('sender_id',auth()->id())->
        where('receiver_id',$id)->
        orWhere('receiver_id',auth()->id())->
        where('sender_id',$id)->
        join('users','users.id','=','sender_id')->
        select('messages.*','users.name')->orderBy('created_at','asc')->get();
        return response()->json($messages);
    }
    public function create(Request $request){
        $new = Messages::create($request->validate([
            'sender_id'=> 'required',
            'receiver_id'=> 'required',
            'message'=> 'required',
        ]));

        $options = array(
            'cluster'=>'ap2',
            'useTLS'=>true
        );

        $pusher= new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            $options
        );
        $new = ['sender_id'=> $request->sender_id,'receiver_id'=>$request->receiver_id];
        $pusher->trigger('MyOnlineSchool','my-event',$new);


        return response()->json(['data' => $new, 'success' => true]);

    }

}

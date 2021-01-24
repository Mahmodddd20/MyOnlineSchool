<?php

namespace App\Http\Controllers;

use App\Models\GroupMessages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Pusher\Pusher;

class GroupMessagesController extends Controller
{
    /**
     * Get the messages of the class group chat.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function index($id)
    {
        $messages = DB::table('group_messages')->
        where('class_id',$id)->
        orderBy('created_at','asc')->
        join('users','users.id','=','group_messages.sender_id')->
        select('group_messages.*','users.name as sender_name')->get();
        return response()->json($messages);
    }

    /**
     * Sending a message to the class group chat.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Pusher\PusherException
     */

    public function create(Request $request)
    {
        $new = GroupMessages::create($request->validate([
            'sender_id'=> 'required',
            'class_id'=> 'required',
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
        $new = ['sender_id'=> $request->sender_id,'class_id'=>$request->class_id];
        $pusher->trigger('MyOnlineSchool','group',$new);


        return response()->json(['data' => $new, 'success' => true]);

    }

}

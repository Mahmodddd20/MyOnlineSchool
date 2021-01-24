<?php

namespace App\Http\Controllers;

use App\Models\HAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HAnswerController extends Controller
{

    /**
     * Submit the answer for the homework.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $new = HAnswer::create($request->validate([
            'title'=> 'required',
            'description'=> 'required',
            'homework_id'=> 'required',
            'student_id'=>'required'
        ]));
        return response()->json($new);

    }

    /**
     * Find if the student already submitted the answer.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function finished($id)
    {
        $count=DB::table('h_answers')->where('student_id','=',auth()->id())->
            where('homework_id','=',$id)->count();
        return response()->json($count);
    }

    /**
     * Display one answer by id.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $answer = HAnswer::all()->find($id);
        return response($answer);

    }

    /**
     * Update the answer.
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $request->validate([
            'name'=> 'required',
            'type'=> 'required',
            'description'=> 'required',
            'link'=> 'required',
            'week_id'=> 'required',
        ]);
        $answer = HAnswer::findOrFail($id);
        $answer->name=$request->name;
        $answer->type=$request->type;
        $answer->description=$request->description;
        $answer->link=$request->link;
        $answer->save();
        return response()->json(['data'=>$answer,'success'=>true]);

    }


    /**
     * Delete the answer.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $answer = HAnswer::findOrFail($id);
        $answer->delete();
        return response()->json(['data'=>$answer,'success'=>true]);

    }

    /**
     * display all answers of one homework.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */

    public function showAllAnswersOfOneHomework($id)
    {
        $answer = DB::table('h_answers')->
        where('homework_id','=',$id)->
        join('users','users.id','=','h_answers.student_id')->
        select('h_answers.*','users.name as userName','users.email as userEmail')->get();

        return response($answer);

    }

}

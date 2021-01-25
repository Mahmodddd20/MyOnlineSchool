<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Material;
use App\Models\Week;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaterialController extends Controller
{
    /**
     * Create new material.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $new = Material::create($request->validate([
            'name'=> 'required',
            'type'=> 'required',
            'description'=> 'required',
            'week_id'=> 'required',
        ]));
        return response()->json(['data' => $new, 'success' => true]);


    }

    /**
     * Show one material by id.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $material = Material::all()->find($id);
        return response($material);

    }

    /**
     * Edit the material.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $request->validate([
            'name'=> 'required',
            'type'=> 'required',
            'description'=> 'required',
            'material_id'=>'required'
        ]);
        $material = Material::findOrFail($request->material_id);
        $material->name=$request->name;
        $material->type=$request->type;
        $material->description=$request->description;
        $material->save();
        return response()->json(['data'=>$material,'success'=>true]);

    }

    /**
     * Delete the material.
     *
     * @param  \App\Models\material  $material
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $material = Material::findOrFail($id);
        $material->delete();
        return response()->json(['data'=>$material,'success'=>true]);

    }
    /**
     * Show all materials in a week.
     *
     * @param  \App\Models\Homework  $homework
     * @return \Illuminate\Http\Response
     */

    public function materialsOfWeek($id)
    {
                $material = DB::table('weeks')
                    ->join('materials','week_id','=','weeks.id')
                    ->select('materials.id','materials.name','materials.type','materials.description','materials.week_id')
                    ->where('materials.week_id','=',$id)
                    ->get();




        return response()->json( $material);

    }

}

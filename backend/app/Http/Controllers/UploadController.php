<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Mail\newTask;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use function Sodium\add;

class UploadController extends Controller
{
    /**
     * Upload the profile photo
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request){

        $validator = Validator::make($request->all(),
            [
                'file' => 'required|mimes:png,jpg|max:2048',
            ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }


        if ($files = $request->file('file')) {

            //store file into document folder
            $file = $request->file->store('public/image');
            $file= 'http://localhost:8000'.Storage::url($file);
            return response()->json([
                "success" => true,
                "message" => "File successfully uploaded",
                "file" => $file
            ]);

        }


    }
    /**
     * Upload the any file
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadFile(Request $request){

        $validator = Validator::make($request->all(),
            [
                'file' => 'required|mimes:jpg,jpeg,png,bmp,tiff,
                doc,docx,html,htm,odt,pdf,xls,xlsx,ods,ppt,pptx,txt,
                |max:5120',
            ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }


        if ($files = $request->file('file')) {

            //store file into document folder
            $file = $request->file->store('public/image');
            $file= 'http://localhost:8000'.Storage::url($file);
            return response()->json([
                "success" => true,
                "message" => "File successfully uploaded",
                "file" => $file
            ]);

        }


    }



}








<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use phpDocumentor\Reflection\Types\Array_;
use function GuzzleHttp\Promise\all;
use function PHPUnit\Framework\assertJson;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;


class AuthenticationController extends Controller
{
    public function login(Request $request){

        $getRequest = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_token' => 'boolean',
        ]);

        $login = [
            'email' => $getRequest['email'],
            'password' => $getRequest['password']
        ];



        if(!Auth::attempt($login))
      {
        return response()->json(['error'=>'Unauthorised'], 401);
      }
        $user = Auth::user();
        if($user instanceOf User)
            $getToken = $user->createToken('personal token');



        $token = $getToken->token;

        if($request['remember_token']){
            $token->expires_at = Carbon::now()->addDays(15);
        }else{
            $token->expires_at = Carbon::now()->addDays();
        }
        $token->save();


        return response()->json([
            'access' => $getToken->accessToken,
            'token' => 'Bearer',
            'role'=>auth()->user()->role,
            'id'=>auth()->id(),
            'expires' => Carbon::parse(
                $token->expires_at
            )->toDateTimeString()
        ],200);

    }

    public function logout(){
        $user = Auth::user();
        if($user instanceOf User)
            $logout = $user->token()->revoke();
        return response()->json([
            'information' => 'you are logout'
        ], 201);
    }

    public function register(Request $request): \Illuminate\Http\JsonResponse
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'role'=>'required|string',
            'isAdmin'=>'required|in:admin',
        ]);
        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role'=>$request->role
          ]);

        if($user instanceOf User)
            $getToken = $user->createToken('personal token');
        $token = $getToken->token;

        if($request['remember_token']){
            $token->expires_at = Carbon::now()->addDays(15);
        }else{
            $token->expires_at = Carbon::now()->addDays();
        }
        $token->save();

        return response()->json([
            'access' => $getToken->accessToken,
            'token' => 'Bearer',
            'role'=> $request->role,
            'expires' => Carbon::parse(
                $token->expires_at
            )->toDateTimeString()
        ],200);
    }

    public function details(){
        $user = auth()->user ();
        return response()->json($user, 200);
    }
    public function detailsOne($id){
        $user = DB::table('users')->select('id','name','email','role')->where('id','=',$id)->get();
        return response()->json($user,200);
    }


    public function detailsAllTeachers(){
        $user = DB::table('users')->select('id','name','email','role')->where('role','=','teacher')->get();
        return response()->json($user, 200);
    }
    public function detailsAllStudents(){
        $user = DB::table('users')->select('id','name','email','role')->where('role','=','student')->get();
        return response()->json($user, 200);
    }
    public function detailsAllUsers(){
        $user = DB::table('users')->select('id','name','email','role')->get();
        return response()->json($user, 200);
    }

    public function forgotPassword(Request $request){
        $input = $request->only('email');
        $validator = Validator::make($input, [
            'email' => "required|email"
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $response = Password::sendResetLink($input);

        $message = $response == Password::RESET_LINK_SENT ? 'Mail send successfully' : GLOBAL_SOMETHING_WANTS_TO_WRONG;

        return response()->json($message);
    }



}

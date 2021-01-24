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
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Carbon\Exceptions\InvalidFormatException
     */

    public function login(Request $request)
    {
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
    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     * @throws \Carbon\Exceptions\InvalidFormatException
     */

    public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);


    }
    /**
     * register function require the user to be Admin
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Carbon\Exceptions\InvalidFormatException
     */


    public function register(Request $request)
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
            'role'=>$request->role,
            'picture'=>'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
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

    /**
     * detals of the logged in user
     * @return \Illuminate\Http\JsonResponse
     * @throws \Carbon\Exceptions\InvalidFormatException
     */

    public function detailsTheLoggedUser()
    {
        $user = auth()->user ();
        return response()->json($user, 200);
    }
    /**
     * details of the user by id
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Carbon\Exceptions\InvalidFormatException
     */

    public function detailsById($id)
    {
        $user = DB::table('users')->select('id','name','email','role','picture')->where('id','=',$id)->get();
        return response()->json($user);
    }
    /**
     * details of all teachers
     * @return \Illuminate\Http\JsonResponse
     * @throws \Carbon\Exceptions\InvalidFormatException
     */


    public function detailsAllTeachers()
    {
        $allTeachers = DB::table('users')->select('id','name','email','role','picture')->where('role','=','teacher')->get();
        return response()->json($allTeachers, 200);
    }
    /**
     *  details of all students
     * @return \Illuminate\Http\JsonResponse
     * @throws \Carbon\Exceptions\InvalidFormatException
     */

    public function detailsAllStudents()
    {
        $allStudents = DB::table('users')->select('id','name','email','role','picture')->where('role','=','student')->get();
        return response()->json($allStudents, 200);
    }
    /**
     * details of all users
     * @return \Illuminate\Http\JsonResponse
     * @throws \Carbon\Exceptions\InvalidFormatException
     */

    public function detailsAllUsers()
    {
        $AllUsers = DB::table('users')->select('id','name','email','role','picture')->get();
        return response()->json($AllUsers, 200);
    }

//    public function forgotPassword(Request $request){
//        $input = $request->only('email');
//        $validator = Validator::make($input, [
//            'email' => "required|email"
//        ]);
//        if ($validator->fails()) {
//            return response()->json($validator->errors());
//        }
//        $response = Password::sendResetLink($input);
//
//        $message = $response == Password::RESET_LINK_SENT ? 'Mail send successfully' : GLOBAL_SOMETHING_WANTS_TO_WRONG;
//
//        return response()->json($message);
//    }

    /**
     * update function will update the user's details
     * @param Request $request & $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Carbon\Exceptions\InvalidFormatException
     */

    public function update(Request $request,$id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'role'=>'required|string',
            'picture'=>'required|string',

        ]);
        $user = User::findOrFail($id);
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=bcrypt($request->password);
        $user->role=$request->role;
        $user->picture=$request->picture;
        $user->save();
        return response()->json(['data'=>$user,'success'=>true]);

    }
    /**
     * destroy function will delete the user
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Carbon\Exceptions\InvalidFormatException
     */

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['data'=>$user,'success'=>true]);

    }

}

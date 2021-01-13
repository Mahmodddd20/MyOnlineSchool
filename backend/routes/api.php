<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClassroomController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('/login','AuthenticationController@login');
//Route::post('/password/forgot-password', 'AuthenticationController@forgotPassword');
Route::post('/upload', 'WeekController@upload' );


Route::group(['middleware' => 'auth:api'], function() {
    Route::post('/register','AuthenticationController@register');
    Route::get('/details','AuthenticationController@details');
    Route::get('/details/teacher/all','AuthenticationController@detailsAllTeachers');
    Route::get('/details/student/all','AuthenticationController@detailsAllStudents');
    Route::get('/details/users/all','AuthenticationController@detailsAllUsers');


    Route::get('/details/{id}','AuthenticationController@detailsOne');
    Route::get('/logout','AuthenticationController@logout');

    Route::get('/classroom/all', 'ClassroomController@index' );
    Route::get('/classroom/teacher', 'ClassroomController@classTeacher' );
    Route::get('/classroom/teacher/{id}', 'ClassroomController@teacherInClass' );

    Route::get('/classroom/student', 'ClassroomController@classStudent' );
    Route::post('/classroom/create', 'ClassroomController@create' );
    Route::get('/classroom/show/{id}', 'ClassroomController@show' );
    Route::post('/classroom/edit/{id}', 'ClassroomController@edit' );
    Route::delete('/classroom/delete/{id}', 'ClassroomController@destroy' );

    Route::post('/classtudent/create', 'ClassroomStudentController@create' );
    Route::get('/classtudent/all', 'ClassroomStudentController@index' );
    Route::get('/classtudent/{id}', 'ClassroomStudentController@classStudent' );
    Route::get('/studentsemails/{id}', 'ClassroomStudentController@studentsEmails' );


    Route::post('/email/class/all/{id}', 'EmailsController@newweek');
    Route::post('/sendemail/class/all/{id}', 'EmailsController@sendemail');
    Route::post('/welcomeEmail', 'EmailsController@welcomeEmail');



    Route::get('/week/all', 'WeekController@index' );
    Route::post('/week/create', 'WeekController@create' );
    Route::get('/week/show/{id}', 'WeekController@show' );
    Route::post('/week/edit/{id}', 'WeekController@edit' );
    Route::delete('/week/delete/{id}', 'WeekController@destroy' );

    Route::get('/material/all', 'MaterialController@index' );
    Route::post('/material/create', 'MaterialController@create' );
    Route::get('/material/show/{id}', 'MaterialController@show' );
    Route::post('/material/edit/{id}', 'MaterialController@edit' );
    Route::delete('/material/delete/{id}', 'MaterialController@destroy' );

    Route::get('/homework/all', 'HomeworkController@index' );
    Route::post('/homework/create', 'HomeworkController@create' );
    Route::get('/homework/show/{id}', 'HomeworkController@show' );
    Route::post('/homework/edit/{id}', 'HomeworkController@edit' );
    Route::delete('/homework/delete/{id}', 'HomeworkController@destroy' );

    Route::get('/homework-answer/all', 'HAnswerController@index' );
    Route::post('/homework-answer/create', 'HAnswerController@create' );
    Route::get('/homework-answer/show/{id}', 'HAnswerController@show' );
    Route::post('/homework-answer/edit/{id}', 'HAnswerController@edit' );
    Route::delete('/homework-answer/delete/{id}', 'HAnswerController@destroy' );

    Route::get('/messages/{id}', 'MessagesController@index' );
    Route::post('/messages', 'MessagesController@create' );
    Route::get('/groupmessages/{id}', 'GroupMessagesController@index' );
    Route::post('/groupmessages', 'GroupMessagesController@create' );





    Route::get('/show/class_weeks/{id}', 'WeekController@class_weeks' );
    Route::get('/show/classes_weeks', 'WeekController@classes_weeks' );
    Route::get('/show/classes_weeks_materials', 'MaterialController@classes_weeks_materials' );
    Route::get('/show/classes_week_materials/{id}', 'MaterialController@classes_week_materials' );
    Route::get('/show/classes_week_homeworks/{id}', 'HomeworkController@classes_week_homeworks' );


});






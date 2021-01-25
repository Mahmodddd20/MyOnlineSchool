<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => 'auth:api'], function() {

    Route::post('/register','AuthenticationController@register');
    Route::post('/logout','AuthenticationController@logout');

    Route::get('/details','AuthenticationController@detailsTheLoggedUser');
    Route::get('/details/{id}','AuthenticationController@detailsById');
    Route::get('/details/teacher/all','AuthenticationController@detailsAllTeachers');
    Route::get('/details/student/all','AuthenticationController@detailsAllStudents');
    Route::get('/details/users/all','AuthenticationController@detailsAllUsers');

    Route::post('/update/user/{id}','AuthenticationController@update');
    Route::post('/delete/user/{id}','AuthenticationController@destroy');

    Route::get('/classroom/all', 'ClassroomController@index' );
    Route::get('/classroom/teacher', 'ClassroomController@classesOfTeacher' );
    Route::get('/classroom/teacher/{id}', 'ClassroomController@teacherInClass' );
    Route::post('/classroom/create', 'ClassroomController@create' );
    Route::get('/classroom/show/{id}', 'ClassroomController@show' );
    Route::post('/classroom/edit/{id}', 'ClassroomController@edit' );
    Route::delete('/classroom/delete/{id}', 'ClassroomController@destroy' );
    Route::get('/classroom/student', 'ClassroomStudentController@detailsTheClassesOfLoggedStudent' );

    Route::post('/classtudent/create', 'ClassroomStudentController@create' );
    Route::post('/classtudent/delete', 'ClassroomStudentController@destroy' );
    Route::get('/classtudent/{id}', 'ClassroomStudentController@AllStudentsInClass' );


    Route::post('/sendemail/class/all/{id}', 'EmailsController@sendemail');
    Route::post('/welcomeEmail', 'EmailsController@welcomeEmail');


    Route::get('/show/weeksOfClass/{id}', 'WeekController@weeksOfClass' );
    Route::get('/week/show/{id}', 'WeekController@show' );
    Route::post('/week/create', 'WeekController@create' );
    Route::delete('/week/delete/{id}', 'WeekController@destroy' );
    Route::post('/week/edit/{id}', 'WeekController@edit' );


    Route::post('/material/create', 'MaterialController@create' );
    Route::get('/material/show/{id}', 'MaterialController@show' );
    Route::post('/material/edit', 'MaterialController@edit' );
    Route::delete('/material/delete/{id}', 'MaterialController@destroy' );
    Route::get('/show/materialsOfWeek/{id}', 'MaterialController@materialsOfWeek' );

    Route::post('/homework/create', 'HomeworkController@create' );
    Route::get('/homework/show/{id}', 'HomeworkController@show' );
    Route::post('/homework/edit', 'HomeworkController@edit' );
    Route::delete('/homework/delete/{id}', 'HomeworkController@destroy' );
    Route::get('/show/homeworksOfWeek/{id}', 'HomeworkController@homeworksOfWeek' );

    Route::post('/answer/create', 'HAnswerController@create' );
    Route::get('/answer/finished/{id}', 'HAnswerController@finished' );
    Route::get('/answer/show/all/{id}', 'HAnswerController@showAllAnswersOfOneHomework' );

    Route::get('/messages/{id}', 'MessagesController@index' );
    Route::post('/messages', 'MessagesController@create' );

    Route::get('/groupmessages/{id}', 'GroupMessagesController@index' );
    Route::post('/groupmessages', 'GroupMessagesController@create' );

    Route::post('/upload', 'UploadController@upload' );
    Route::post('/upload/file', 'UploadController@uploadFile' );

});






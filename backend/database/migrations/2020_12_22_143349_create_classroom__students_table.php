<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassroomStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classroom__students', function (Blueprint $table) {
            $table->foreignId('student_id')->
            references('id')->
            on('users')->
            onDelete('cascade')->
            onUpdate('cascade');
            $table->foreignId('class_id')->
            references('id')->
            on('classrooms')->
            onDelete('cascade')->
            onUpdate('cascade');
            $table->index('student_id','class_id');
            $table->timestamps();
            $table->unique('student_id + class_id');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classroom__students');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('h_answers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->foreignId('homework_id')->
            references('id')->
            on('homework')->
            onUpdate('cascade')->
            onDelete('cascade');
            $table->foreignId('student_id')->
            references('id')->
            on('users')->
            onUpdate('cascade')->
            onDelete('cascade');
            $table->unique('homework_id + student_id');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('h_answers');
    }
}

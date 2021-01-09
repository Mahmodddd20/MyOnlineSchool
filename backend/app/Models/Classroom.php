<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'teacher_id',
        'start_date',
        'finish_date',
    ];
    public function week(){
        return $this->hasMany(Week::class);
    }
}

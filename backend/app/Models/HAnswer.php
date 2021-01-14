<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HAnswer extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'homework_id',
        'student_id',
    ];
    public function homework()
    {
        return $this->belongsTo(Homework::class, 'homework_id');
    }


}

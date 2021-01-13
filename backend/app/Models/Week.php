<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Week extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'class_id',
    ];
    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'class_id');
    }
    public function material(){
        return $this->hasMany(Material::class);
    }
    public function homework(){
        return $this->hasMany(Homework::class);
    }


}

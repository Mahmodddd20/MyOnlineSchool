<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Homework extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'type',
        'description',
        'link',
        'week_id',
    ];
    public function week()
    {
        return $this->belongsTo(Week::class, 'week_id');
    }
    public function hanswer(){
        return $this->hasMany(HAnswer::class);
    }



}

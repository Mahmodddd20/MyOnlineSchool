<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'type',
        'description',
        'week_id',

    ];
    public function week()
    {
        return $this->belongsTo(Week::class, 'week_id');
    }


}

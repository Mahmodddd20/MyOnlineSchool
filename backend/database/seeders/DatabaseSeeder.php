<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        DB::table('users')->insert([
            'name' => 'mahmod',
            'email' => 'mahmodddd20@gmail.com',
            'role'=> 'admin',
            'password' => Hash::make('12345678'),
        ]);

        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'student',
            'password' => Hash::make('12345678'),
        ]);

        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'teacher',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'teacher',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'teacher',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'teacher',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'teacher',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'teacher',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'teacher',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'teacher',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'teacher',
            'password' => Hash::make('12345678'),
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'role'=> 'teacher',
            'password' => Hash::make('12345678'),
        ]);











    }
}

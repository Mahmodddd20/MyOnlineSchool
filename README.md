![MyOnlineSchool Logo](https://i.ibb.co/Qcwp9Zt/logos.png)

------------------------------------------------------------------------------------------------------------------

# Getting started

## Installation

Please check the official laravel installation guide for server requirements before you start. [Official Documentation](https://laravel.com/docs/5.4/installation#installation)

Alternative installation is possible without local dependencies relying on [Docker](#docker). 

Clone the repository

    git clone git@github.com:Mahmodddd20/MyOnlineSchool.git

Switch to the backend folder

    cd backend

Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Generate a new Passport authentication personal key

    php artisan passport:install

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate:refresh --seed

Start the local development server

    php artisan serve

## Now you have to open new terminal then

    cd ..
    
    cd frontend
    
    npm install
    
    npm start
    
You can now access the server at http://localhost:3000

default | Admin account
------------ | -------------
Email: | admin@admin.com
Password: | admin12345678



    

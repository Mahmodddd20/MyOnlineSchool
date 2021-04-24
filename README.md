![MyOnlineSchool Logo](https://i.ibb.co/Qcwp9Zt/logos.png)

------------------------------------------------------------------------------------------------------------------

# Getting started
https://www.youtube.com/embed/InFNkBDxK98

## Installation

Please check the official laravel installation guide for server requirements before you start. [Official Documentation](https://laravel.com/docs/5.4/installation#installation)

Alternative installation is possible without local dependencies relying on [Docker](#docker). 

Clone the repository

    git clone https://github.com/Mahmodddd20/MyOnlineSchool.git

Switch to the backend folder

    cd MyOnlineSchool

    cd backend

Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate


Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate:fresh --seed
    
Generate a new Passport authentication personal key

    php artisan passport:install
    
Then run

    php artisan storage:link

## Now you have to create Pusher account

Create an account https://dashboard.pusher.com/accounts/sign_up
 
then create a Channels app. 

Go to the "Keys" page for that app, 

and copy your app_id, key, secret and cluster to .env file

    PUSHER_APP_ID=00000
    PUSHER_APP_KEY=0000000000000000000000
    PUSHER_APP_SECRET=0000000000000000000000
    PUSHER_APP_CLUSTER=000

in app/Http/Controller/MessagesController.php and in app/Http/Controller/GroupMessagesController.php 
you have to put your cluster and channels 

            $options = array(
            'cluster'=>'000',
            'useTLS'=>true
        );
        
           $pusher->trigger('0000000000','private',$new);


dont forget to add your gmail account to .env file 

    MAIL_MAILER=smtp
    MAIL_HOST=smtp.googlemail.com
    MAIL_PORT=465
    MAIL_USERNAME=0000000000000@gmail.com
    MAIL_PASSWORD=00000000000000000


Start the local development server

    php artisan serve

## Now you have to open new terminal then

    cd ..
    
    cd frontend
    
    npm install
    
now include the pusher-js script tag on your index.html page in the public folder.

    <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
    
in components/Messaging/messaging.js you have to put your app_key and cluster and channel_name 

        const pusher = new Pusher ('0000000000000000000000000', {
        cluster: '000'
    });

    const channel = pusher.subscribe ('000000000000000000000');
    
then in components/Messaging/GroupMessaging.js you have to put your app_key and cluster and channel_name

    const pusher = new Pusher ('0000000000000000000000000', {
    cluster: '000'
    });
    const channel = pusher.subscribe ('000000000000000000000');

Now you can run the server
    
    npm start
    
You can now access the server at http://localhost:3000

default | Admin account
------------ | -------------
Email: | admin@admin.com
Password: | admin12345678



    

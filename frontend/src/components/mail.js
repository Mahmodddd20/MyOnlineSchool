import React from 'react';
//Success POPUP
import Swal from 'sweetalert2'
//For API Requests
import axios from 'axios';
class Mail extends React.Component
{
    //send email button click function
    sendmail(){
        axios.get('http://localhost:8000/api/send/email'
        ).then(res=>
            {
                console.log(res.data['message']);
                //Success Message in Sweetalert modal
                Swal.fire({
                    title:  res.data['message'],
                    text: "Thanks",
                    type: 'success',

                });

            }
        );
    }



    render(Message)
    {

        return (
            <div>
                <h1>Therichpost.com</h1>
                <button onClick={e => {this.sendmail()}}>Click Me!! To Send Mail</button>
            </div>

        ) } }
export default Mail;

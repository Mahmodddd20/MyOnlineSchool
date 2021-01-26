import api from '../../api';


export default function Logged(){


    api.detailsTheLoggedUser().then(response=>{
        }).catch(error=>{
            window.location.href = '/login'
        }
    )
}
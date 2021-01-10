// import React from 'react';
// import firebase from './firebase'
// function App() {
//     React.useEffect(()=>{
//         const msg=firebase.messaging();
//         msg.requestPermission().then(()=>{
//           return msg.getToken();
//         }).then((data)=>{
//           console.warn("token",data)
//         }).catch(error=>{
//             console.log(error)
//         })
//         msg.onMessage(function (payload){
//             console.log('onMessage',payload)
//
//         })
//     },[])
//
//     return (
//         <div>
//         </div>
//     );
// }
//
// export default App;

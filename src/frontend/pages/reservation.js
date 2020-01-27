function reservation(req, router) {
    console.log(req.param.id);
    const id = req.param.id;
  document.getElementById("cmdReservation").addEventListener("click",()=>
console.log("bismillah"));
//     fetch(`api/meals/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         const newListElement = document.createElement("li");
//         newListElement.innerHTML = `<strong> Title : ${data[0].title} </strong><br>
//         Descriotion : ${data[0].description} <br>
//         Location : ${data[0].location}  <br>
//         Date & Time : ${data[0].when_date} <br>
//         Cost : dkk ${data[0].price}`;
//         document.getElementById("root").appendChild(newListElement);
  
//         document.getElementById("form").innerHTML=`<form>
//    <h3>Reservation Information</h3>     
//   <input type="text" id="name" name="name" placeholder="Contact Name">
//   <br><br>
//   <input type="text" id="phone" name="phone" placeholder = "Conatact Number">
//   <br><br>
//   <input type="text" id="guestCount" name="guestCount" placeholder = "Number of Guests">
//   <br><br>
//   <input type="submit" id="cmdReservation" name="submit"> 
        
//   </form>`;
//       });

// document.getElementById("cmdReservation").addEventListener("click",()=>{
//     console.log("bismillah");
// })
  
  
  
  }
  
  export default reservation;
  
  
  

function mealsId(req, router) {
  console.log(req.param.id);
  const id = req.param.id;

  // fetching one meal using id
  fetch(`api/meals/${id}`)
    .then(res => res.json())
    .then(data => {

      // Randering Meal
      const newListElement = document.createElement("li");
      newListElement.innerHTML = `<img class="img-thumbnail mydetailedimgsize"  src = "./src/frontend/pages/images/${id}.jpg"> </img>
      <strong> Title : ${data[0].title} </strong><br>
      Descriotion : ${data[0].description} <br>
      Location : ${data[0].location}  <br>
      Date & Time : ${data[0].when_date} <br>
      Max Guests : ${data[0].max_reservations} <br>
      Cost : dkk ${data[0].price}<br><br>
      <a href="/meals"><button class="btn-primary btn-lg "> Back to All Meals </button></a>`;
      document.getElementById("root").appendChild(newListElement);

      //injecting form for reservation
      document.getElementById("form").innerHTML = `
      <button id="cmdShowForm" class="btn-primary btn-lg" disabled> Sorry.. FULLY BOOKED </button>
      <form id="reservationForm" class="ReservationForm">
 <h3><strong>Reservation Information</strong></h3>     
<input type="text"  class="form-control" id="name" name="name" placeholder="Contact Name">
<br>
<input type="text" class="form-control" id="phone" name="phone" placeholder = "Conatact Number">
<br>
<input type="text" class="form-control" id="guestCount" name="guestCount" placeholder = "Number of Guests">
<br>
      
<button id="cmdReservation" class="btn-danger btn-lg"> Save Reservation </button> 

</form>`;

      fetch("api/availabelreservations")
        .then(res => res.json())
        .then(data => {
          data.forEach(el => {
            if (el.id == id && el.max_reservations > el.total_reservations) {
              document.getElementById("cmdShowForm").disabled = false;
              document.getElementById("cmdShowForm").textContent = "Click for Reservations";
            }

            //button.visibility="visible";
          })
        });

      document.getElementById("cmdShowForm").addEventListener("click", () => {
        document.getElementById("reservationForm").style.visibility = "visible";
      })
      document.getElementById("cmdReservation").addEventListener("click", (event) => {
        event.preventDefault();
        const meal_id = id;
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const number_of_guests = document.getElementById("guestCount").value;
         //const created_date = new Date();
        const newReservation = {
          number_of_guests,
          meal_id,
          //created_date,
          phone,
          name

        }


        // // function checking only alphabets in string
        // function checkstring(str) {
        //   var alphbets = new RegExp(/^[a-zA-Z]{3,}$/);
        //   if (str.test(alphbets)) {
        //     return true;
        //   }
        //   else {
        //     alert("message");
        //     return false;
        //   }
        // }
        // ////////////////////////////////////////

        // if (!checkstring(name)) {
        //   alert("Name must be String value .....");
        //   document.getElementById("name").value = "";
        //   return;
        // }

        if (!Number.isInteger(parseInt(number_of_guests))) {
          alert("No of reservations must be Integer....");
          document.getElementById("guestCount").value = "";
          return;
        }

        //const saveReservation = () => {
        fetch(`api/reservations`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newReservation)
        })
          .then(res => () => {
            console.log(res);
          });
        //        console.log(newReservation);
        alert("Reservation Saved.....");
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("guestCount").value = "";
      });


    });
}
export default mealsId;
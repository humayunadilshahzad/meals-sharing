import { urlencoded } from "body-parser";


function homeRouter(req, router) {
  
  document.body.innerHTML = `<header><h1>Meal Sharing</h1></header> <br><br><br><br><br><br><br><br><br>
  <a href="/meals"><button class="btn-primary btn-lg "> Click to Show All Meals </button></a>
  <br><br><br><br><br><br><br><br><br> <footer>Created @-HYF</footer>`;

  //document.getElementById("cmdShowAllMeals").addEventListener("click",()=>{href=});
  
}

export default homeRouter;

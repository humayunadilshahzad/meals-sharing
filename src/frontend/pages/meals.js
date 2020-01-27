function meals(req, router) {
    // console.log(req.param.id);
    // const id=req.param.id;
    //  console.log("adil");
    
    fetch(`api/meals/`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                const newListElement = document.createElement("li");
                //newListElement.classList.add("list");
                newListElement.innerHTML = `
                <a href="meals/${element.id}"> <img class="img-thumbnail myimgsize" src = "./src/frontend/pages/images/${element.id}.jpg"> </img></a>
                <a href="meals/${element.id}"><h3><strong>Title : ${element.title}</strong> </h3></a>
                <h4>Descriotion : ${element.description} </h4><br><br><hr>`;
                document.getElementById("root").appendChild(newListElement);
            });
        });

}

export default meals;



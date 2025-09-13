async function show(){
const text = document.getElementById("text");
const food = document.getElementById("input");
const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food.value}`)
.then(result => result.json())
.then(data => {
    console.log(data);
    recipe = data.meals[0].strInstructions;
    imageSource= data.meals[0].strMealThumb;

    var Ingr = [];
    var Msr = [];

    for(i=1; i<=20; i++)
    {
        ingredient = data.meals[0][`strIngredient${i}`];
        measure = data.meals[0][`strMeasure${i}`];

        if(ingredient!=null && ingredient!="")
        {
            Ingr.push(ingredient);
            console.log(Ingr);
        }

        if(measure!=null && measure!="")
        {
            Msr.push(measure);
            console.log(Msr);
        }
    }

    createDivs(recipe,imageSource,Ingr,Msr,data);
    });
}


function createDivs(recipe,imageSource,Ingr,Msr,data){

    const container2 = document.querySelector(".container2");
    container2.innerHTML =" ";

    const ingrDiv = document.createElement("div");
    const recipeDiv = document.createElement("div");
    const foodDiv = document.createElement("div");
    const foodImage = document.createElement("img");
    const List = document.createElement("ul");
    
    ingrDiv.classList.add("ingredients");
    foodDiv.classList.add("foodDiv");
    recipeDiv.classList.add("recipe");
    foodImage.src= imageSource;

    const title1= document.createElement("h1");
    title1.textContent = "INGREDIENTS";
    title1.classList.add("shift");
    ingrDiv.appendChild(title1);

    const nameOfTheFood = document.createElement("h1");
    nameOfTheFood.textContent = data.meals[0].strMeal;
    nameOfTheFood.classList.add("shift");
    recipeDiv.appendChild(nameOfTheFood);

    const recipeText = document.createElement("p");
    recipeText.textContent = recipe;
    recipeText.classList.add("shift");
    recipeDiv.appendChild(recipeText);

    container2.appendChild(ingrDiv);
    container2.appendChild(foodDiv);
    container2.appendChild(recipeDiv);
    foodDiv.appendChild(foodImage);

    const Array2=[];
    for(i=0; i<Ingr.length; i++)
    {
        const ListItem = document.createElement("li");
        ListItem.textContent = `${Ingr[i]} ( ${Msr[i]} )`;
        
        List.appendChild(ListItem);
    }


    ingrDiv.appendChild(List);


}


document.getElementById("input").addEventListener("keydown", function(event) {
if (event.key === "Enter") {
    event.preventDefault(); // Formun submit olmasını engelle
    show();
}
});

/*
Nokta Notasyonu (.): Nokta notasyonu, nesne içindeki belirli bir özelliğe erişmek için kullanılır.
Ancak bu sadece özelliğin adı sabit ve biliniyorsa işe yarar. 
Köşeli Parantez Notasyonu ([]): Özellik adı dinamik olarak belirleniyorsa veya 
değişken olarak tanımlanmışsa kullanılır.

Bu yüzden strMealThumb ve strInstructions için nokta notasyonu kullanıyoruz,
ama strIngredient için köşeli parantez notasyonu kullanmamız gerekiyor. */

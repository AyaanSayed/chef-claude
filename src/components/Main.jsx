import { useState } from "react";
import { ClaudeRecipe } from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");




    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => ([...prevIngredients, newIngredient]));
    }

    async function getRecipe() {
        const genratedRecipe = await getRecipeFromMistral(ingredients);
        setRecipe(genratedRecipe);
    }

    return (
        <main>
            <form className="add-ingredient-form" action={addIngredient}>
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe}/>}

            {recipe && <ClaudeRecipe recipe={recipe}/>}


        </main>
    )
}
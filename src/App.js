import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SnackbarProvider from 'react-simple-snackbar'
import './App.css';
import Header from "./components/header/Header";
import AddRecipe from "./views/AddRecipe/AddRecipe";
import Auth from "./views/auth/Auth";
import AddGarden from "./views/Garden/AddGarden/AddGarden";
import EditGarden from "./views/Garden/EditGarden/EditGarden";
import Garden from "./views/Garden/Garden";
import GardenPage from "./views/Garden/GardenPage/GardenPage";
import AddGreenHouse from "./views/GreenHouse/AddGreenHouse/AddGreenHouse";
import EditGreenHouse from "./views/GreenHouse/EditGreenHouse/EditGreenHouse";
import GreenHouse from "./views/GreenHouse/GreenHouse";
import GreenHousePage from "./views/GreenHouse/GreenHousePage/GreenHousePage";
import Modules from "./views/Modules/Modules";
import AddPickle from "./views/Pickle/AddPickle/AddPickle";
import EditPickle from "./views/Pickle/EditPickle/EditPickle";
import Pickles from "./views/Pickle/Pickle";
import PicklePage from "./views/Pickle/PicklePage/PicklePage";
import Recipe from "./views/recipe/Recipe";
import EditRecipe from "./views/recipes/EditRecipe/EditRecipe";
import Recipes from "./views/recipes/Recipes";
import Register from "./views/register/Register";
import AddTea from "./views/Tea/AddTea/AddTea";
import EditTea from "./views/Tea/EditTea/EditTea";
import Tea from "./views/Tea/Tea";
import TeaPage from "./views/Tea/TeaPage/TeaPage";
import Weather from "./views/Weather/Weather";
import AddWeed from "./views/Weed/AddWeed/AddWeed";
import EditWeed from "./views/Weed/EditWeed/EditWeed";
import Weed from "./views/Weed/Weed";
import WeedPage from "./views/Weed/WeedPage/WeedPage";

function App() {
  return (
    <SnackbarProvider>
    <Router>
      {localStorage.getItem('user') ? 
      <>
      <Header />
      <Routes>
        <Route path='/' element={<Recipes />} />
        <Route path={'/recipe/:recipeId'} element={<Recipe />} />
        <Route path={'/recipe/add'} element={<AddRecipe />} />
        <Route path={'/recipe/:recipeId/edit'} element={<EditRecipe />} />
        <Route path={'/modules'} element={<Modules />} />
        <Route path={'/modules/ApiWeather'} element={<Weather />} />
        <Route path={'/modules/ApiWeed'} element={<Weed />} />
        <Route path={'/weed/:weedId'} element={<WeedPage />} />
        <Route path={'/weed/add'} element={<AddWeed />} />
        <Route path={'/weed/:weedId/edit'} element={<EditWeed />} />
        <Route path={'/modules/ApiPickle'} element={<Pickles />} />
        <Route path={'/pickle/:pickleId'} element={<PicklePage />} />
        <Route path={'/pickle/add'} element={<AddPickle />} />
        <Route path={'/pickle/:pickleId/edit'} element={<EditPickle />} />
        <Route path={'/modules/ApiGreenhouse'} element={<GreenHouse />} />
        <Route path={'/house/:houseId'} element={<GreenHousePage />} />
        <Route path={'/greenhouse/add'} element={<AddGreenHouse />} />
        <Route path={'/greenhouse/:greenhouseId/edit'} element={<EditGreenHouse />} />
        <Route path={'/modules/ApiGarden'} element={<Garden />} />
        <Route path={'/garden/:gardenId'} element={<GardenPage />} />
        <Route path={'/garden/add'} element={<AddGarden />} />
        <Route path={'/garden/:gardenId/edit'} element={<EditGarden />} />
        <Route path={'/modules/ApiTea'} element={<Tea />} />
        <Route path={'/tea/:teaId'} element={<TeaPage />} />
        <Route path={'/tea/add'} element={<AddTea />} />
        <Route path={'/tea/:teaId/edit'} element={<EditTea />} />
      </Routes>
      </> : 
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/register' element={<Register />} />
      </Routes>}
    </Router>
    </SnackbarProvider>
  );
}

export default App;

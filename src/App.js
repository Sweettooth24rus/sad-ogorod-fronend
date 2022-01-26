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
import Garden from "./views/Garden/Garden";
import GardenPage from "./views/Garden/GardenPage/GardenPage";
import AddGreenHouse from "./views/GreenHouse/AddGreenHouse/AddGreenHouse";
import GreenHouse from "./views/GreenHouse/GreenHouse";
import GreenHousePage from "./views/GreenHouse/GreenHousePage/GreenHousePage";
import Modules from "./views/Modules/Modules";
import AddPickle from "./views/Pickle/AddPickle/AddPickle";
import Pickles from "./views/Pickle/Pickle";
import PicklePage from "./views/Pickle/PicklePage/PicklePage";
import Recipe from "./views/recipe/Recipe";
import Recipes from "./views/recipes/Recipes";
import Register from "./views/register/Register";
import AddTea from "./views/Tea/AddTea/AddTea";
import Tea from "./views/Tea/Tea";
import TeaPage from "./views/Tea/TeaPage/TeaPage";
import Weather from "./views/Weather/Weather";
import AddWeed from "./views/Weed/AddWeed/AddWeed";
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
        <Route path={'/modules'} element={<Modules />} />
        <Route path={'/modules/ApiWeather'} element={<Weather />} />
        <Route path={'/modules/ApiWeed'} element={<Weed />} />
        <Route path={'/weed/:weedId'} element={<WeedPage />} />
        <Route path={'/weed/add'} element={<AddWeed />} />
        <Route path={'/modules/ApiPickle'} element={<Pickles />} />
        <Route path={'/pickle/:pickleId'} element={<PicklePage />} />
        <Route path={'/pickle/add'} element={<AddPickle />} />
        <Route path={'/modules/ApiGreenhouse'} element={<GreenHouse />} />
        <Route path={'/house/:houseId'} element={<GreenHousePage />} />
        <Route path={'/greenhouse/add'} element={<AddGreenHouse />} />
        <Route path={'/modules/ApiGarden'} element={<Garden />} />
        <Route path={'/garden/:gardenId'} element={<GardenPage />} />
        <Route path={'/garden/add'} element={<AddGarden />} />
        <Route path={'/modules/ApiTea'} element={<Tea />} />
        <Route path={'/tea/:teaId'} element={<TeaPage />} />
        <Route path={'/tea/add'} element={<AddTea />} />
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

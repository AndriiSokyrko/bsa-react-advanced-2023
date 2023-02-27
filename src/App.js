import './App.css';
import Header from './pages/header/header';
import Footer from './pages/footer/footer';
import AppRoutes from './app-routes/app-routes';
import './pages/assets/css/style.css';
import {authActionCreator}  from './store/actions'
import {useDispatch} from 'react-redux';

function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('TOKEN')
    if(token)dispatch(authActionCreator.authenticatedUser())
    return (
        <div className="body">
            <Header />
            <AppRoutes/>
            <Footer/>
        </div>
    );
}

export default App;

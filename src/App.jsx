import { BrowserRouter,Route,Routes } from 'react-router';
import {Index} from './pages/Index.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Feed from './pages/Feed.jsx';
import { Provider } from 'react-redux';
import Body from './pages/Body.jsx';
import store from './utils/reduxStore.js';
import EditProfile from './pages/EditProfile.jsx';
import Settings from './pages/Settings.jsx';
import Connections from './pages/Connections.jsx';
import Requests from './pages/Requests.jsx';
import NewFeature from './pages/NewFeature.jsx';
const App = () => {
    return (
        <>
        <Provider store = {store}>
            
        <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#232526] to-[#414345] text-white">
         <main className="flex-grow">

        <Routes>
            <Route path="/" element={<Body/>} >
                <Route index element={<Index/>} />
                <Route path ="signup" element={<Signup/>} />
                <Route path ="login" element={<Login/>} />
                <Route  path ="feed" element={<Feed/>} />
                <Route path ="connections" element={<Connections/>} />
                <Route path ="requests" element={<Requests/>} />
                <Route path ="settings" element={<Settings/>} >
                    <Route path="edit-profile" element={<EditProfile/>} />
                </Route>
                <Route path="*" element={<NewFeature/>} />
            </Route>
        </Routes>
         </main>
        </div>
        </BrowserRouter>
        </Provider>
        </>
    );
}

export default App;
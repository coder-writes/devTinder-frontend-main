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
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute.jsx';
const App = () => {
    return (
        <>
        <Provider store = {store}>
            
        <>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#232526] to-[#414345] text-white">
         <main className="flex-grow">

        <Routes>
            <Route path="/" element={<Body/>} >
                <Route index element={
                    <PublicRoute>
                        <Index/>
                    </PublicRoute>
                } />
                <Route path ="signup" element={
                    <PublicRoute>
                        <Signup/>
                    </PublicRoute>
                } />
                <Route path ="login" element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                } />
                <Route  path ="feed" element={
                    <ProtectedRoute>
                        <Feed/>
                    </ProtectedRoute>
                } />
                <Route path ="connections" element={
                    <ProtectedRoute>
                        <Connections/>
                    </ProtectedRoute>
                } />
                <Route path ="requests" element={
                    <ProtectedRoute>
                        <Requests/>
                    </ProtectedRoute>
                } />
                <Route path ="settings" element={
                    <ProtectedRoute>
                        <Settings/>
                    </ProtectedRoute>
                } >
                    <Route path="edit-profile" element={<EditProfile/>} />
                </Route>
                <Route path="*" element={<NewFeature/>} />
            </Route>
        </Routes>
         </main>
        </div>
        </>
        </Provider>
        </>
    );
}

export default App;
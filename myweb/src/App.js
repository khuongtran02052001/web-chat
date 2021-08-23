import "antd/dist/antd.css";
import Login from "./components/login";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ChatRoom from "./components/chatrooms/ChatRoom";
import AuthProvider from "./context/AuthProvider";
import ChatWinDow from "./components/chatrooms/ChatWinDow";
import AppProvider from "./context/AppProvider";
import AddRoom from "./components/Modal/AddRoom";
import Invite from "./components/Modal/Invite";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Route component={Login} path="/login" />
              <Route component={ChatWinDow} path="/" />
            </Switch>
            <AddRoom />
            <Invite />
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

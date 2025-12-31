import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import JobList from "./components/JobList";
import PostJob from "./components/PostJob";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import ViewApplications from './components/ViewApplications';
import NewApplication from './components/NewApplication';

function App() {
  return (
    <Router>
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job/:jobId/applications" element={<ViewApplications />} />
        <Route path="/job/:jobId/new-application" element={<NewApplication />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

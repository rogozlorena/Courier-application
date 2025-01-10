import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePackage from './CreatePackage';
import ViewMyPackages from './ViewMyPackages';
import ViewUnassignedPackages from './ViewUnassignedPackages';
import AssignPackage from './AssignPackage';
import FindPackage from './FindPackage';

const App = () => {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', color: '#d39db7' }}>Package Management</h1>
        <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
          <ul
            style={{
              listStyleType: 'none',
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <li>
              <Link
                to="/create-package"
                style={{
                  textDecoration: 'none',
                  color: '#7d7d7d',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  backgroundColor: '#fbeef0',
                  transition: 'background-color 0.3s',
                }}
              >
                Create Package
              </Link>
            </li>
            <li>
              <Link
                to="/view-my-packages"
                style={{
                  textDecoration: 'none',
                  color: '#7d7d7d',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  backgroundColor: '#fbeef0',
                  transition: 'background-color 0.3s',
                }}
              >
                View My Packages
              </Link>
            </li>
            <li>
              <Link
                to="/view-unassigned-packages"
                style={{
                  textDecoration: 'none',
                  color: '#7d7d7d',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  backgroundColor: '#fbeef0',
                  transition: 'background-color 0.3s',
                }}
              >
                View Unassigned Packages
              </Link>
            </li>
            <li>
              <Link
                to="/assign-package"
                style={{
                  textDecoration: 'none',
                  color: '#7d7d7d',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  backgroundColor: '#fbeef0',
                  transition: 'background-color 0.3s',
                }}
              >
                Assign Package
              </Link>
            </li>
            <li>
              <Link
                to="/find-package"
                style={{
                  textDecoration: 'none',
                  color: '#7d7d7d',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  backgroundColor: '#fbeef0',
                  transition: 'background-color 0.3s',
                }}
              >
                Find Package
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/create-package" element={<CreatePackage />} />
          <Route path="/view-my-packages" element={<ViewMyPackages />} />
          <Route path="/view-unassigned-packages" element={<ViewUnassignedPackages />} />
          <Route path="/assign-package" element={<AssignPackage />} />
          <Route path="/find-package" element={<FindPackage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

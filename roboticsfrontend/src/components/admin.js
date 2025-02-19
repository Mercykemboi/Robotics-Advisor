import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Container, Alert, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });


  const [performance, setPerformance] = useState({});
  const [userGrowth, setUserGrowth] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchPerformanceData();
    fetchUserGrowth();
  }, []);

  // Fetch user data
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { "Authorization": `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const fetchPerformanceData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/performance", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      setPerformance(response.data);
    } catch (error) {
      setError("Error fetching performance data");
    }
  };

  const fetchUserGrowth = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/user-growth", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      setUserGrowth(response.data.newUsers);
    } catch (error) {
      setError("Error fetching user growth");
    }
  };

  // Update user role
  const updateRole = async (id, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("User role updated successfully");
      fetchUsers();
    } catch (error) {
      setError("Error updating role");
    }
  };
  // Delete user
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("User deleted successfully");
      fetchUsers();
    } catch (error) {
      setError("Error deleting user");
    }
  };

  // Create new admin
  const createAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/admin/create-admin",
        newAdmin,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("New admin created successfully");
      fetchUsers();
      setNewAdmin({ username: "", email: "", password: "" });
    } catch (error) {
      setError("Error creating new admin");
    }
  };
  const handleBackHome = () => {
    navigate("/dashboard");
  };

  const updateUserStatus = async (id, isActive) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}/status`,
        { active: !isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      setMessage(`User ${isActive ? "deactivated" : "activated"} successfully`);
    } catch (error) {
      setError("Error updating user status");
      console.error("Error updating user status:", error);
    }
  };

  return (
    <Container>
      <h2>Admin Dashboard</h2>

      {/* Success or Error Messages */}
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Analytics Cards */}
      <h4>Analytics Dashboard</h4>
      <Card>
        <Card.Body>
          <Card.Title>User Growth</Card.Title>
          <Card.Text>{userGrowth} new users in the last 30 days</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>System Performance</Card.Title>
          <Card.Text>
            CPU Usage: {performance.cpuUsage ? performance.cpuUsage.system / 1000 : "N/A"} ms
          </Card.Text>
          <Card.Text>
            Memory Usage: {performance.memoryUsage ? (performance.memoryUsage.rss / 1024 / 1024).toFixed(2) : "N/A"} MB
          </Card.Text>
          <Card.Text>Active Users: {performance.activeUsers}</Card.Text>
        </Card.Body>
      </Card>

      {/* User Management */}
      <h4>Manage Users</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">
                <span>Loading...</span>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                
                <td>
                <Button
              variant={user.active ? "danger" : "success"}
              onClick={() => updateUserStatus(user._id, user.active)}
            >
              {user.active ? "Deactivate" : "Activate"}
            </Button>

                  <Button
                    //variant="warning"
                    onClick={() =>
                      updateRole(user._id, user.role === "admin" ? "user" : "admin")
                    }
                  >
                    {user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                  </Button>
                  &nbsp;
                  <Button  onClick={() => deleteUser(user._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Create New Admin Form */}
      <h4>Create New Admin</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={newAdmin.username}
            onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" onClick={createAdmin}>
          Create Admin
        </Button>
      </Form>
      <button className="login-text" onClick={handleBackHome}>Back Homepage</button>
    </Container>
  );
};

export default AdminPanel;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Container, Alert, Form, Card, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { FaUserShield, FaUserPlus, FaTrash, FaChartLine, FaUsers } from "react-icons/fa";

// const AdminPanel = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [newAdmin, setNewAdmin] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
  
//   const [performance, setPerformance] = useState({});
//   const [userGrowth, setUserGrowth] = useState(0);

//   useEffect(() => {
//     fetchUsers();
//     fetchPerformanceData();
//     fetchUserGrowth();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/admin/users", {
//         headers: { "Authorization": `Bearer ${token}` },
//         withCredentials: true,
//       });
//       setUsers(response.data);
//     } catch (error) {
//       setError("Error fetching users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPerformanceData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/admin/performance", {
//         headers: { "Authorization": `Bearer ${token}` },
//       });
//       setPerformance(response.data);
//     } catch (error) {
//       setError("Error fetching performance data");
//     }
//   };

//   const fetchUserGrowth = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/admin/user-growth", {
//         headers: { "Authorization": `Bearer ${token}` },
//       });
//       setUserGrowth(response.data.newUsers);
//     } catch (error) {
//       setError("Error fetching user growth");
//     }
//   };


//   // Update user role
//   const updateRole = async (id, newRole) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://localhost:5000/api/admin/users/${id}`,
//         { role: newRole },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage("User role updated successfully");
//       fetchUsers();
//     } catch (error) {
//       setError("Error updating role");
//     }
//   };
//   // Delete user
//   const deleteUser = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("User deleted successfully");
//       fetchUsers();
//     } catch (error) {
//       setError("Error deleting user");
//     }
//   };

//   // Create new admin
//   const createAdmin = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:5000/api/admin/create-admin",
//         newAdmin,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage("New admin created successfully");
//       fetchUsers();
//       setNewAdmin({ username: "", email: "", password: "" });
//     } catch (error) {
//       setError("Error creating new admin");
//     }
//   };
//   const handleBackHome = () => {
//     navigate("/dashboard");
//   };

//   const updateUserStatus = async (id, isActive) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://localhost:5000/api/admin/users/${id}/status`,
//         { active: !isActive },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchUsers();
//       setMessage(`User ${isActive ? "deactivated" : "activated"} successfully`);
//     } catch (error) {
//       setError("Error updating user status");
//       console.error("Error updating user status:", error);
//     }
//   };

 
//   return (
//     <Container className="mt-4" style={{ maxWidth: "900px", backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px" }}>
//       <h2 className="text-center text-primary mb-4">Admin Dashboard</h2>
//       {message && <Alert variant="success">{message}</Alert>}
//       {error && <Alert variant="danger">{error}</Alert>}

//       <Row className="mb-4">
//         <Col md={6}>
//           <Card className="text-center p-3 shadow">
//             <FaUsers size={40} className="text-primary mx-auto" />
//             <Card.Body>
//               <Card.Title>User Growth</Card.Title>
//               <Card.Text>{userGrowth} new users in the last 30 days</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card className="text-center p-3 shadow">
//             <FaChartLine size={40} className="text-primary mx-auto" />
//             <Card.Body>
//               <Card.Title>System Performance</Card.Title>
//               <Card.Text>CPU Usage: {performance.cpuUsage ? performance.cpuUsage.system / 1000 : "N/A"} ms</Card.Text>
//               <Card.Text>Memory Usage: {performance.memoryUsage ? (performance.memoryUsage.rss / 1024 / 1024).toFixed(2) : "N/A"} MB</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <h4 className="text-primary">Manage Users</h4>
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="4" className="text-center">Loading...</td>
//             </tr>
//           ) : (
//             users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>
//                   <Button
//                     variant={user.active ? "danger" : "success"}
//                     onClick={() => updateUserStatus(user._id, user.active)}
//                   >
//                     {user.active ? "Deactivate" : "Activate"}
//                   </Button>
//                   &nbsp;
//                   <Button
//                     variant="warning"
//                     onClick={() => updateRole(user._id, user.role === "admin" ? "user" : "admin")}
//                   >
//                     {user.role === "admin" ? "Demote" : "Promote"}
//                   </Button>
//                   &nbsp;
//                   <Button variant="danger" onClick={() => deleteUser(user._id)}>
//                     <FaTrash />
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>

//       <h4 className="text-primary">Create New Admin</h4>
//       <Form>
//         <Row>
//           <Col md={4}>
//             <Form.Control
//               type="text"
//               placeholder="Username"
//               value={newAdmin.username}
//               onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
//             />
//           </Col>
//           <Col md={4}>
//             <Form.Control
//               type="email"
//               placeholder="Email"
//               value={newAdmin.email}
//               onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
//             />
//           </Col>
//           <Col md={4}>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               value={newAdmin.password}
//               onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
//             />
//           </Col>
//         </Row>
//         <Button className="mt-3 w-100" variant="primary" onClick={createAdmin}>
//           <FaUserPlus /> Create Admin
//         </Button>
//       </Form>

//       <Button className="mt-4 w-100" variant="secondary" onClick={handleBackHome}>Back to Dashboard</Button>
//     </Container>
//   );
// };

// export default AdminPanel;

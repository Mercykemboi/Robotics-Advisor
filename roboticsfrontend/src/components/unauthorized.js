const Unauthorized = () => {
    return (
      <div className="container text-center mt-5">
        <h1>403 - Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    );
  };
  
  export default Unauthorized;
  
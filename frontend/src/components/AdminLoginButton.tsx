function AdminLoginButton (){
    return(
        <nav className="mb-6 text-right">
        <button 
          onClick={() => window.location.href = '/adminlogin'} 
          className="text-blue-600 font-semibold hover:bg-red-200 border-2 rounded cursor-pointer bg-red-100"
        >
          Admin Login
        </button>
      </nav>
    )
}

export default AdminLoginButton
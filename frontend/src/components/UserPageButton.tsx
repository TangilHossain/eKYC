function UserPageButton (){
    return(
        <nav className="mb-6 text-right">
        <button 
          onClick={() => window.location.href = '/'} 
          className="text-blue-600 font-semibold hover:bg-red-200 border-2 rounded cursor-pointer bg-red-100"
        >
          User Page
        </button>
      </nav>
    )
}

export default UserPageButton
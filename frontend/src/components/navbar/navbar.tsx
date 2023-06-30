import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    setTimeout(() => {
      navigate('/')
      window.location.reload()
    }, 100)
  }
  return (
    <>
      <ul className='nav'>
        <li className='nav-item'>
          <NavLink to='/projects'>projects</NavLink>
        </li>
        {localStorage.length === 0 ? (
          <li className='nav-item'>
            <NavLink to='/login'>login</NavLink>
          </li>
        ) : (
          <>
            <li className='nav-item'>
              <NavLink to='/logout' onClick={logout}>
                <span className='me-2'>
                  {JSON.parse(localStorage.user).email}
                </span>
                logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  )
}

export default Navbar

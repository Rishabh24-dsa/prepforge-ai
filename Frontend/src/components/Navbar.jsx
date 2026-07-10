import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import './navbar.scss'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    return (
        <header className='app-navbar'>
            <div className='app-navbar__brand' onClick={() => navigate('/')}>
                <span className='app-navbar__logo'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
                        <rect width="32" height="32" rx="8" fill="#4F46E5" />
                        <path d="M9 22V10h9.5a3.5 3.5 0 0 1 0 7H12.5" stroke="#2DD4BF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="22.5" cy="9.5" r="2" fill="#2DD4BF" />
                    </svg>
                </span>
                <span className='app-navbar__name'>PrepForge</span>
            </div>

            {user && (
                <div className='app-navbar__actions'>
                    <span className='app-navbar__user'>{user.username || user.email}</span>
                    <button className='app-navbar__logout' onClick={onLogout}>Logout</button>
                </div>
            )}
        </header>
    )
}

export default Navbar

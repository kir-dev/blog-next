import * as React from 'react'
import Navbar from './Navbar'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => <Navbar />

export default Header

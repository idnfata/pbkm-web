import React from 'react'
import { DocumentsImg, iconFile, iconHome, iconMail, iconReport, iconUser, Logo } from '../../../../assets'
import { FooterImage, Navbar, NavBrand, NavBrandLogo, NavBrandName, NavFooter, NavFooterContent, NavFooterDesc, NavFooterLink, NavFooterTitle, NavIcon, NavItem, NavLinks, NavList } from './admin.menu'
import { useLocation } from 'react-router-dom'
    
const AdminMenu = () => {
    const location = useLocation();
    const navs = [
        { text: 'Dashboard', href: '/', icon: iconHome },
        { text: 'Report', href: '/report', icon: iconReport},
        { text: 'Message', href: '/message', icon: iconMail},
        { text: 'Profile', href: '/profile', icon: iconUser},
        { text: 'Master', href: '/master', icon: iconFile}

    ];
    return (
        <Navbar>
            <NavBrand href="#">
                <NavBrandLogo src={Logo} alt="Logo" />
                <NavBrandName>PT. PBKM</NavBrandName>
            </NavBrand>

            <NavList>
                {navs.map(nav => (
                    <NavItem key={nav.href}>
                        <NavLinks to={nav.href} className={`${ location.pathname.split('/')[1] == nav.href.split('/')[1] ? 'active' : '' }`}>
                                <NavIcon icon={nav.icon} className={`${ location.pathname.split('/')[1] == nav.href.split('/')[1] ? 'active' : '' }`} /><span>{nav.text}</span>
                        </NavLinks>
                    </NavItem>
                ))
                }
            </NavList>

            <NavFooter>
                <FooterImage src={DocumentsImg} alt="documents" />
                <NavFooterContent>
                    <NavFooterTitle>PDF Report</NavFooterTitle>
                    <NavFooterDesc>Annual detailed report</NavFooterDesc>
                    <NavFooterLink href="#">Download</NavFooterLink>
                </NavFooterContent>
            </NavFooter>
        </Navbar>

    )
}

export default AdminMenu

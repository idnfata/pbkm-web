import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { DocumentsImg, Logo } from '../../../assets';
import { FooterImage, Navbar, NavBrand, NavBrandLogo, NavBrandName, NavFooter, NavFooterContent, NavFooterDesc, NavFooterLink, NavFooterTitle, NavIcon, NavItem, NavLinks, NavList } from './menu.elements';
import { navAdmin, navHR } from './setting';

const Menu = (props) => {
    // console.log(props);

    const location = useLocation();
    const [navs, setNavs] = useState([]);
    
    const {role} = props;
    useEffect(() => {
        switch (role) {
            case '0':
                setNavs(navAdmin)
                break;
            case '1':
                setNavs(navHR)
                break;
        
            default:
                break;
        }
    }, [])
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

export default Menu





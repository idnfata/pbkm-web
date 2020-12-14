import React, { useEffect, useState } from 'react'
import { ProfileMenu } from '../..'
import { Col, HeaderContentContainer, TitleDesktop, TitleMobile, SubTitle, Title } from '../../atoms'

const PageHeader = (props) => {
    // console.log(props);
    const [subTitle, setSubTitle] = useState('');
    useEffect(() => {
        switch (props.pathname) {
            case '/':
                setSubTitle(`Selamat Bekerja, ${props.name}`)
                break;
            default:
                setSubTitle(`Nama Perusahaan`)
                break;
        }
        // console.log(greeting())
    }, []);
    return (
        <>
        <HeaderContentContainer>
            <TitleDesktop>
                <Title>{props.title}</Title>
                <SubTitle>{subTitle}</SubTitle>    
            </TitleDesktop>
            <TitleMobile>
                <Title>{props.pageTitle || "PT. PBKM"}</Title>
            </TitleMobile>
            <ProfileMenu name={props.name} photo={props.photo} />
        </HeaderContentContainer>
     
    </>
    )
}

export default PageHeader

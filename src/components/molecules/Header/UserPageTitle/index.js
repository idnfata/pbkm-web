import React from 'react'
import { Col, SubTitle, Title } from '../../../atoms'

const UserPageTitle = ({title, name}) => {
    return (
        <Col align="left">
            <Title color="#222">{title}</Title>
            <SubTitle color="#5B25F5">Selamat Bertugas, {name}!</SubTitle>
        </Col>
    )
}

export default UserPageTitle

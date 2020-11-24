import React from 'react'
import { Col, SubTitle, Title } from '../../../atoms'

const UserPageTitle = ({title}) => {
    return (
        <Col align="left">
            <Title>{title}</Title>
            <SubTitle>Selamat Bertugas</SubTitle>
        </Col>
    )
}

export default UserPageTitle

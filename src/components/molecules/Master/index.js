import React from 'react'
import { Col, Gap, Row } from '../../atoms';
import ContentHeader from '../Header';

const Master = () => {
    const table = [
        { name: 'User', href: '/master/user'},
        { name: 'User Role', href: '/master/user-role'}
    ];
    return (
        <>
            <ContentHeader
                title="Master Page"
                table={table}
                buttonName="Add Master"
                buttonTo="/add-master"
            />
            <Gap height={100} />
            <Row>
                <Col>halaman untuk ke masing masing master</Col>
            </Row>
        </>
    
    )
}

export default Master

import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Col, LinkGroup, Row, Title } from '../../../atoms';

const MasterHeader = (props) => {
    return (
        <Row>
            <Col align="left">
            <Title>{props.title}</Title>
                <LinkGroup>
                    { props.table.map(table => (
                        <Link key={table.href} to={table.href} className={`link ${ location.pathname == table.href ? 'active' : '' }`} >{table.name}</Link>
                    ))}
                </LinkGroup>
            </Col>
            <Col align="right">
            <Link to={props.buttonTo}>
                <Button buttonColor="#5b25f5" buttonFull align="right">
                    {props.buttonName}
                </Button>
            </Link>
                   
            </Col>

        </Row>
    )
}

export default MasterHeader

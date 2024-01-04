import React from 'react';
import { Container, Row, Col, Card, CardBody, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

export function ViewLoading() {

    return (
        <>
            <Container id='anon-container' className='d-flex align-items-center'>
                <Loader/>
            </Container>
        </>
    );
}

export function Loader() {
    return(
        <Row className='w-100 justify-content-center'>
            <Col xs='auto'>
                <Card className='mb-4'>
                    <CardBody>
                        <Spinner animation="border" size="xl" />
                        <FontAwesomeIcon icon={faPaperPlane} className='position-absolute top-50 start-50 translate-middle fs-4' />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

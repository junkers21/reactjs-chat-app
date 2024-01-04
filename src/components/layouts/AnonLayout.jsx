import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import CustomToastContainer from '../toasts/CustomToastContainer'

function AnonLayout(props) {
    const { element } = props;

    return (
        <>
            <Container id='anon-container' className='d-flex align-items-center'>
                <Row className='w-100 justify-content-center'>
                    <Col xs sm={10} md={8} lg={6}>
                        <Card className='mb-4'>
                            <CardBody>
                                <h1 className='mb-0 text-center'>Chat <FontAwesomeIcon icon={faPaperPlane} /> App</h1>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                {element}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <CustomToastContainer/>
        </>
    );
}

export default AnonLayout;

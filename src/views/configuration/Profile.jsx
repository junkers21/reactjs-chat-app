import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "src/redux/toastSlice";
import { selectUser, selectProfile, setProfile } from "src/redux/authSlice";
import { supabase } from 'src/supabaseClient';
import { Container, Row, Col, Form, FloatingLabel, Spinner, Button, Ratio } from "react-bootstrap";

import defaultProfile from 'src/assets/images/default-profile.jpg';

export default function Profile() {
    const [validated, setValidated] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null)
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const profile = useSelector(selectProfile);
    const [file, setFile] = useState(null);

    const fetchProfile = useCallback(async (id) => {
        const { data } = await supabase.from('profiles').select().eq('id', id).single();
        dispatch(setProfile(data))
    }, [dispatch])
    
    useEffect(() => {
        fetchProfile(user.id)
    }, [fetchProfile, user])

    useEffect(() => {
        if (profile?.avatar_url) downloadImage(profile.avatar_url)
    }, [profile])
    
    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target)
        const formDataObj = Object.fromEntries(formData.entries())
        
        if (form.checkValidity() === true) {
            setLoading(true);
            try {

                let updateData = {
                    name: formDataObj.name,
                    description: formDataObj.description,
                 }

                if (null !== formDataObj.file) {
                    const objectFile = formDataObj.avatar
                    
                    const fileExt = objectFile.name.split('.').pop()
                    const fileName = `${Math.random()}.${fileExt}`
                    const filePath = `${fileName}`
                    await supabase.storage.from('avatars').upload(filePath, objectFile)
                    
                    updateData['avatar_url'] = filePath
                }

                const { data, error } = await supabase
                .from('profiles')
                .update(updateData)
                .eq('id', user.id)
                .select()
                .single()

                if (error) throw error.message;
                
                dispatch(setProfile(data))
                dispatch(addToast({ message: "Your Profile has been updated", type: 'success' }))
            } catch (error) {
                if ( typeof error === 'string' || error instanceof String ){
                    dispatch(addToast({ message: error, type: 'error' }))
                } else {
                    dispatch(addToast({ message: "An error occurred, try again later", type: 'error' }))
                }
            } finally {
                setLoading(false);
            }
        }

        setValidated(true);
    }

    function handleChange(e) {
        console.log(e.target.files)
        if(e.target.files.length > 0) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    let image_url = defaultProfile
    if(null !== file){
        image_url = file
    } else if ( null !== avatarUrl ){
        image_url = avatarUrl
    }

    return (
        <Container fluid className="mt-3" id="profile">
            <Form id="update-profile" noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} lg={6} xxl={4} className='d-flex justify-content-center'>
                        <Ratio key={'1x1'} aspectRatio={'1x1'} className='mb-3 profile-image'>
                            <>
                                <img alt='profile' src={image_url} className='rounded-circle object-fit-cover' />
                                <label htmlFor='avatar' className='stretched cursor-pointer'></label>
                            </>
                        </Ratio>
                        <input type="file" onChange={handleChange} className='d-none' name='avatar' id='avatar' accept='image/png, image/jpg, image/jpeg'/>
                    </Col>

                    <Col xs={12} lg={6} xxl={4}>
                        <FloatingLabel label="Name" className="mb-3" >
                            <Form.Control name="name" type="text" placeholder="Name" required minLength={3} defaultValue={profile?.name} />
                            <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    <Col xs={12} lg={6} xxl={4}>
                        <FloatingLabel label="Description" className="mb-3">
                            <Form.Control id="description" name="description" type="text" placeholder="Description" defaultValue={profile?.description} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className='justify-content-end'>
                    <Col xs={12} lg={6} xxl={4}>
                        <div className="d-grid gap-2 mb-4">
                            <Button type="submit" form='update-profile' variant="primary" disabled={isLoading}>
                                {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

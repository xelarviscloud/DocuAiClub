import { shareDocument, sharePage } from "../services/PageService";
import React, { useState, useEffect } from 'react'
import {
    CModal,
    CModalTitle,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CFormInput,
    CFormLabel,
    CButton,
    CRow,
    CCol,
    CCardBody,
} from '@coreui/react'
import toast from 'react-hot-toast'

function ShareModal({ title, sharePageModalVisible, setSharePageModalVisible, shareFileBlobPath }) {

    const [emailAddress, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(true);

    let decodedToken = JSON.parse(localStorage.getItem('userInfo'))
    useEffect(() => {
        let { emailAddress } = decodedToken
        setEmailAddress(emailAddress);
    }, [])

    const handleOnChange = (e) => {
        setEmailAddress(e.target.value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailValid(emailRegex.test(e.target.value));
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        var formData = {
            emailAddress,
            'blobPath': shareFileBlobPath,
        }

        let func = title == 'Share Page' ? sharePage(formData) : shareDocument(formData)

        await func
            .then((response) => {
                toast.success(response?.data?.message)
                setSharePageModalVisible(false)
            })
            .catch((error) => {
                console.log('err', error)
                toast.error(error?.message)
            })
        return
    }

    return (
        <>
            <CModal
                visible={sharePageModalVisible}
                onClose={() => setSharePageModalVisible(false)}
                aria-labelledby="sharePageModal"
            >
                <CModalHeader onClose={() => setSharePageModalVisible(false)}>
                    <CModalTitle id="sharePageModal">{title}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Verify your email before you share. Page might contain sensitive information!</p>
                    <CCardBody>
                        <div className="mb-3">
                            <CRow>
                                <CCol xs>
                                    <CFormLabel htmlFor="emailAddress">Email*</CFormLabel>
                                    <CFormInput
                                        required
                                        aria-describedby="emailAddress"
                                        id="emailAddress"
                                        feedbackInvalid="Please provide a valid Email Address"
                                        type="email"
                                        name="emailAddress"
                                        // pattern="^\S+@\S+\.\S+$"
                                        placeholder="Enter Your Email"
                                        value={emailAddress}
                                        onChange={(e) => handleOnChange(e)}
                                        invalid={!emailValid}
                                    />
                                </CCol>
                            </CRow>
                        </div>
                    </CCardBody>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setSharePageModalVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleOnSubmit}>Share</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default ShareModal
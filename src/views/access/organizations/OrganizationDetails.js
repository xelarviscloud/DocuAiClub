import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { getOrganization } from '../../../services/OrganizationService'
import RegisterOrganization from '../register-organization/RegisterOrganization'

function OrganizationDetails() {
  const [modal, setModal] = useState({})
  const [organizationData, setOrganizationData] = useState({})
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  let _userOrgId = decodedToken.userOrganization.organizationId
  useEffect(() => {
    console.log('org details', decodedToken)
    fetchOrganizationDetails()
  }, [])

  const fetchOrganizationDetails = async () => {
    await getOrganization({ organizationId: _userOrgId })
      .then((response) => {
        setOrganizationData(response.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <div>
      {organizationData?.organizationId && (
        <RegisterOrganization
          setModal={setModal}
          editData={organizationData}
          header="Organization:"
          hideCancel={true}
        />
      )}
    </div>
  )
}

export default OrganizationDetails

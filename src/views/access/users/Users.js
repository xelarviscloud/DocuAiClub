import React, { useEffect, useState } from 'react'
import OrganizationUsers from './OrganizationUsers'
import LocationUsers from './LocationUsers'
import { decryptData } from '../../../services/Utility'
import { getLocationUser } from '../../../services/LocationService'
import { getOrganizationUser } from '../../../services/OrganizationService'
import RegisterOrgUser from '../register-user/RegisterOrgUser'
import RegisterLocationUser from '../register-user/RegisterLocationUser'

function Users() {
  const [orgModal, setOrgModal] = useState(false)
  const [locationmodal, setLocationModal] = useState(false)
  const [orgLoading, setOrgLoading] = useState(false)
  const [orgUserList, setOrgnUserList] = useState([])
  const [orgUserCurrentPage, setOrgUserCurrentPage] = useState(1)
  const [orgcount, setOrgCount] = useState()
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationUserList, setLocationUserList] = useState([])
  const [locationUserCurrentPage, setLocationUserCurrentPage] = useState(1)
  const [locationCount, setLocationCount] = useState()
  const secretKey = 'alibaba1234@Devops&$%'
  const decryptedData = decryptData(secretKey)

  /**
   * ORGANIZATION USER
   */
  useEffect(() => {
    fetchOrgUser()
  }, [orgUserList === undefined ? orgUserList : '', orgUserCurrentPage])

  const fetchOrgUser = async () => {
    setOrgLoading(true)
    await getOrganizationUser({ currentPage: orgUserCurrentPage })
      .then((response) => {
        setOrgnUserList(response?.data)
        setOrgCount(response?.totalPages === 0 ? 1 : response?.totalPages)
        setOrgLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setOrgLoading(false)
      })
  }

  /**
   * LOCATION USER
   */
  useEffect(() => {
    fetchLocationUser()
  }, [locationUserList === undefined ? locationUserList : '', locationUserCurrentPage])

  const fetchLocationUser = async () => {
    setLocationLoading(true)
    await getLocationUser({ currentPage: locationUserCurrentPage })
      .then((response) => {
        setLocationUserList(response?.data)
        setLocationCount(response?.totalPages === 0 ? 1 : response?.totalPages)
        setLocationLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setLocationLoading(false)
      })
  }

  return (
    <div>
      {!orgModal && !locationmodal && (
        <>
          <OrganizationUsers
            setOrgModal={setOrgModal}
            orgLoading={orgLoading}
            orgUserList={orgUserList}
            orgUserCurrentPage={orgUserCurrentPage}
            setOrgUserCurrentPage={setOrgUserCurrentPage}
            orgcount={orgcount}
            decryptedData={decryptedData}
          />
          <LocationUsers
            setLocationModal={setLocationModal}
            locationLoading={locationLoading}
            locationUserList={locationUserList}
            locationUserCurrentPage={locationUserCurrentPage}
            setLocationUserCurrentPage={setLocationUserCurrentPage}
            locationCount={locationCount}
            decryptedData={decryptedData}
          />
        </>
      )}
      {orgModal && (
        <RegisterOrgUser
          setOrgModal={setOrgModal}
          secretKey={secretKey}
          fetchOrgUser={fetchOrgUser}
        />
      )}
      {locationmodal && <RegisterLocationUser />}
    </div>
  )
}

export default Users

import React, { useEffect, useState } from 'react'
import RegisterLocation from '../register-location/RegisterLocation'
import { jwtDecode } from 'jwt-decode'
import { getLocation } from '../../../services/LocationService'

function LocationDetails() {
  const [modal, setModal] = useState({})
  const [locationData, setLocationData] = useState({})
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  let _userLocId = decodedToken.locationId
  useEffect(() => {
    fetchLocationDetails()
  }, [])

  const fetchLocationDetails = async () => {
    await getLocation({ locationId: _userLocId })
      .then((response) => {
        setLocationData({
          ...response.data,
          organizationName: response.data.vw_loc_orgs[0].organizationName,
        })
        console.log('loc details', response)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <div>
      {locationData?._id && (
        <RegisterLocation
          setModal={setModal}
          editData={locationData}
          header="Organization: "
          hideCancel={true}
          isFormViewOnly={true}
        />
      )}
    </div>
  )
}

export default LocationDetails

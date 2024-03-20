const formatPhoneNumber = (phone) => {
  if (phone && phone.length == 10 && !isNaN(phone))
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  else return phone
}

export default formatPhoneNumber

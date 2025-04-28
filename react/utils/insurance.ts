import { INSURANCE_NAME_MAPPER } from "../constants/Insurance"
export const getInsuranceName = (fullInsuranceName: string) => {
    if (!fullInsuranceName || fullInsuranceName === '')
      return 'Asigurare/Garantie extinsa'
    const match = fullInsuranceName.match(/^(Garantie extinsa [12]|Asigurare)/)
    const insuranceType = match ? match[0] : ''

    if( insuranceType.includes('2')){
        return INSURANCE_NAME_MAPPER.garantie_2
    } else if (insuranceType.includes('Garantie')) {
        return INSURANCE_NAME_MAPPER.garantie_1
    } else {
        return INSURANCE_NAME_MAPPER.asigurare
    }
  }

  export const getFormattedPrice = (price: number) => {
    return price != null ? price / 100 : price
  }

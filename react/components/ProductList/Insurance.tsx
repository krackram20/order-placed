import React, { FC } from 'react'
import FormattedPrice from '../FormattedPrice'
import { ATTACHMENT_NAME } from '../../constants/Insurance'
import { useQuery } from 'react-apollo'
import GET_KIT_ITEM_DATA from '../../graphql/getBundleInfo.graphql'
import { useCssHandles } from 'vtex.css-handles'
import { getInsuranceName } from '../../utils/insurance'

const CSS_HANDLES = [
  'insuranceContainer',
  'insuranceName',
  'insuranceQuantity'
]

interface Props {
  item: OrderItem
  insuranceItems: OrderItem[]
}

const Insurance: FC<Props> = ({ item, insuranceItems }: Props) => {

  const handles = useCssHandles(CSS_HANDLES)
  const { data, loading } = useQuery(GET_KIT_ITEM_DATA, {
    variables: {
      sku: item.id
    }
  })

  if (!insuranceItems || insuranceItems.length === 0 || loading || !data) {
    return (<></>)
  }

  return (<div>{
    insuranceItems.map((i: OrderItem) => {
      const attachment = i.attachments.find((atchmnt: { name: string }) => atchmnt?.name === ATTACHMENT_NAME)
      const content = attachment?.content
      const isKit = content?.skuAssociatedWithInsurance !== content?.typeOfInsurance
      const name = data && isKit ? data?.product?.items[0]?.kitItems.find((kitItem: { itemId: string }) => kitItem?.itemId === content?.skuAssociatedWithInsurance)?.product?.productName : null

      return (
        <div className={`${handles.insuranceContainer} flex items-center justify-between br2 mb3 ph3 f6 fw3`}>
          <p className={`${handles.insuranceName} w5`}>{`${getInsuranceName(i?.name ?? '')} ${name ? `(${name})` : ''}`}</p>
          <p className={`${handles.insuranceQuantity}`}>{i?.quantity}x</p>
          <FormattedPrice value={i?.price && i?.quantity ? i?.price * i?.quantity : 0} />
        </div>)
    })
  }</div>)
}

export default Insurance

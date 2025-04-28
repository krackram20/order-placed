import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import BundleInfo from './BundleItems'
import Attachment from './Attachments'
import Product from './Product'
import Insurance from './Insurance'
import { INSURANCE_NAME, WARRANTY_NAME, ATTACHMENT_NAME } from '../../constants/Insurance'

interface Props {
  products: OrderItem[]
}

const CSS_HANDLES = ['productList', 'productListItem']

const ProductList: FC<Props> = ({ products }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const insuranceItems = products
    .map((item, index) => ({ ...item, index }))
    .filter((item) => item?.name?.includes(INSURANCE_NAME) || item?.name?.includes(WARRANTY_NAME));


  const getInsuranceItems = (item: OrderItem) => {
    if (!item) {
      return []
    }
    return insuranceItems.filter((insurance) => {
      const attachment = insurance?.attachments.find((atchmnt: { name: string }) => atchmnt?.name === ATTACHMENT_NAME)

      return attachment && attachment?.content?.typeOfInsurance === item.id
    })
  }
  return (
    <ul className={`${handles.productList} w-60-l w-100 list pl0`}>
      {products
        .filter((item) => !item?.name?.includes(INSURANCE_NAME) && !item?.name?.includes(WARRANTY_NAME))
        .map((product) => {
          const insuranceForThisProduct = getInsuranceItems(product)
          return (
            <li
              key={product.id}
              className={`${handles.productListItem} db bb b--muted-4 mb7 pb7`}
            >
              <Product product={product} />
              <Insurance item={product} insuranceItems={insuranceForThisProduct} />
              <BundleInfo product={product} />
              <Attachment product={product} />
            </li>
          )
        })}
    </ul>
  )
}

export default ProductList

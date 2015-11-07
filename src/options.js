import React from 'react'

import {stateCodes, healthCodes, productCodes, genderCodes} from './refdata'
import {formatDollars} from './utils'

let refDataOptions = (refData, optionProp) =>
  refData.map(datum => <option value={datum.code} key={datum.code}>{datum[optionProp]}</option>)

export function dollarOptions(start, endInclusive, step) {
  let options = []
  for (let amount = start; amount <= endInclusive; amount += step) {
    options.push(<option value={amount} key={amount}>{formatDollars(amount)}</option>)
  }
  return options
}

export function genderOptions() {
  return refDataOptions(genderCodes, 'title')
}

export function healthOptions() {
  return refDataOptions(healthCodes, 'title')
}

export function integerOptions(start, endInclusive) {
  let options = []
  for (let i = start; i <= endInclusive; i++) {
    options.push(<option value={i} key={i}>{i}</option>)
  }
  return options
}

export function productOptions() {
  return refDataOptions(productCodes, 'name')
}

export function stateOptions() {
  return refDataOptions(stateCodes, 'abbreviation')
}

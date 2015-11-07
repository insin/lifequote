import {stateCodes, healthCodes, productCodes, genderCodes} from './refdata'

let nameToConst = (name) => name.replace(/\s/g, '_').toUpperCase()

/**
 * Creates a lookup for refdata codes by name (in CONSTANT_CAPS_STYLE).
 */
let makeEnum = (data, nameProp) =>
  data.reduce(
    (lookup, datum) => (lookup[nameToConst(datum[nameProp])] = datum.code, lookup),
    {}
  )

export const BootstrapDevice = {
  XS: 0,
  SM: 1,
  MD: 2,
  LG: 3
}

export const Gender = makeEnum(genderCodes, 'title')

export const GeneralInfoModal = {
  NEEDS_CALCULATOR: 1,
  POLICY_ADVISOR: 2,
  HEALTH_CODE: 3,
  PERMANENT_INSURANCE: 4
}

export const GlobalModal = {
  WE_CALL_YOU: 1,
  EMAIL_US: 2,
  Q_AND_A: 3,
  SERVICE_UNAVAILABLE: 4
}

export const HealthCode = makeEnum(healthCodes, 'title')

export const ProductCode = makeEnum(productCodes, 'name')

export const State = makeEnum(stateCodes, 'abbreviation')

export const Step = {
  GENERAL_INFO: 1,
  QUOTE_INFO: 2,
  SEND_QUOTE: 3,
  TTFN: 4
}

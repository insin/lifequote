import {stateCodes, healthCodes, productCodes, genderCodes} from './refdata'

/**
 * Creates a lookup from codes to refdata objects.
 */
let makeLookup = refData =>
  refData.reduce(
    (lookup, datum) => (lookup[datum.code] = datum, lookup),
    {}
  )

export const Genders = makeLookup(genderCodes)

export const HealthCodes = makeLookup(healthCodes)

export const ProductCodes = makeLookup(productCodes)

export const States = makeLookup(stateCodes)

import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import React from 'react'
import Table from 'react-bootstrap/lib/Table'

import {productCodes} from '../refdata'
import createModal from './createModal'

let PolicyAdvisorModal = React.createClass({
  getInitialState() {
    return {
      policyCode: null
    }
  },

  handleChange(e) {
    this.setState({policyCode: e.target.value})
  },
  handleReturnToQuote() {
    this.props.setProductCode(Number(this.state.policyCode))
    this.props.hideModal()
  },

  render() {
    let {hideModal} = this.props
    return <div>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>Policy Advisor</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height: 500, overflowY: 'scroll'}}>
        <p><strong>What kind of life insurance policy should you buy?</strong></p>
        <p>That depends on your needs and budget. A good first step is to determine if your needs are temporary or permanent. For example, a mortgage is a temporary need, because your mortgage will eventually be paid off. Funds for final expenses are permanent, because the need will never go away.</p>
        <Table bordered>
          <thead>
            <tr>
              <th>Temporary Needs</th>
              <th>Permanent Needs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mortgage</td>
              <td>Income replacement</td>
            </tr>
            <tr>
              <td>College education</td>
              <td>Final expenses</td>
            </tr>
            <tr>
              <td>Child care</td>
              <td>Emergency fund</td>
            </tr>
          </tbody>
        </Table>
        <p>Generally speaking, term life insurance is a good fit for people with temporary needs, such as protecting a mortgage or covering costs associated with raising children, such as daily child care. Initially, it’s usually the least expensive coverage you can buy.</p>
        <p>Many people have permanent needs, such as paying for final expenses and replacing income should a breadwinner die prematurely. Permanent insurance lasts for the lifetime of the insured.</p>

        <p><strong>What’s the difference between term and permanent life insurance?</strong></p>
        <Table bordered>
          <thead>
            <tr>
              <th>Term</th>
              <th>Permanent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lowest initial cost</td>
              <td>Fixed premiums</td>
            </tr>
            <tr>
              <td>More coverage per dollar</td>
              <td>Cash value accumulation</td>
            </tr>
            <tr>
              <td>Premiums will increase after initial term period</td>
              <td>Guaranteed cash value</td>
            </tr>
            <tr>
              <td>Coverage is not permanent(2)</td>
              <td>Coverage for life(1), as long as premiums are paid</td>
            </tr>
          </tbody>
        </Table>

        <p><strong>Term life insurance</strong></p>
        <p>Term insurance provides coverage for a specific period of time, such as 10, 20 or 30 years. If you die during that period, the beneficiary you name on your policy receives the death benefit amount. When the term ends, so does your protection, unless you select a term policy that gives you the option of renewing your coverage.</p>
        <p>Term policies don’t build cash value as most permanent life insurance products do. Because of this fact, when you buy a term policy you’re paying for pure protection. So most of the time, term insurance is the least expensive kind of coverage you can buy.</p>

        <p><strong>Permanent life insurance</strong></p>
        <p>Permanent policies provide protection for your entire life by paying a sum to your beneficiary upon your death(1). Most permanent policies build cash value over time, and you can access this cash value for emergencies, opportunities or planned life events such as a college education or retirement.</p>
        <p>There are different types of permanent policies. Whole life policies usually offer level premiums and strong, traditional guarantees, such as a schedule of guaranteed values. Universal life policies normally offer flexible features, such as the ability to change your coverage amount or your payment schedule after you purchase the policy. A variation on universal life, variable universal life allows you to invest your policy’s cash values in fixed accounts and sub-accounts that have the potential to earn market returns. </p>
        <p>Finally, single payment whole life is a type of life insurance you buy with one payment. Because the death benefit is higher than the single payment, this kind of life insurance is often a good fit for people looking to transfer wealth.</p>

        <div className="footnotes">
          <p>(1) Many permanent policies endow at age 121.</p>
          <p>(2) Some term policies offer the option to continue coverage at the end of the level term period. In most cases, premiums will increase annually as you age.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {productCodes.map(product => <label className="radio-inline" key={product.code}>
          <input type="radio" name="policyCode" value={product.code} onChange={this.handleChange}/> {product.name}
        </label>)}
        {' '}
        <Button bsStyle="primary" onClick={this.handleReturnToQuote}>Return to quote</Button>
      </Modal.Footer>
    </div>
  }
})

export default createModal(PolicyAdvisorModal)

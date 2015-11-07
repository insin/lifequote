export default {
  createLead() {
    return Promise.resolve({id: new Date().valueOf().toString()})
  },
  updateLead(lead) {
    return Promise.resolve(lead)
  },
  getQuote(lead) {
    return Promise.resolve({
      payments:[
        {term: 10, annualPayment: 450.0, monthlyPayment: 45.0},
        {term: 20, annualPayment: 450.0, monthlyPayment: 45.0},
        {term: 30, annualPayment: 450.0, monthlyPayment: 45.0}
      ]
    })
  }
}

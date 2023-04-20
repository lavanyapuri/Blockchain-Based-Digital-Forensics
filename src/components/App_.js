import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import ForensicReport from '../abis/ForensicReport.json'////
import Navbar from './Navbar'
import Main from './Main_'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = ForensicReport.networks[networkId]////
    if(networkData) {
      const forensic_report = web3.eth.Contract(ForensicReport.abi, networkData.address)////
      this.setState({ forensic_report })
      const reportCount = await forensic_report.methods.reportCount().call()
      console.log(reportCount.toString())////
      this.setState({ reportCount })
      // Load products
      for (var i = 1; i <= reportCount; i++) {
        const product = await forensic_report.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false})  
    } else {
      window.alert('ForensicReport contract not deployed to detected network.')////
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      reportCount: 0,
      reports: [],
      loading: true,
      view: null,
    }////

    this.createReport = this.createReport.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
  }
  //subject_id, subject_name, subject_age, subject_sex, report_id, caseNumber, date, location, description, evidence, conclusions
  createReport(subject_id, subject_name, subject_age, subject_sex, report_id, caseNumber, date, location, description, evidence, conclusions) {
    this.setState({ loading: true })
    this.state.forensic_report.methods.createReport(subject_id, subject_name, subject_age, subject_sex, report_id, caseNumber, date, location, description, evidence, conclusions).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  viewReport(key) {
    this.setState({ loading: true })
    this.setState({ view: key })
    this.setState({ loading: false })
    
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  reports={this.state.reports}
                  createReport={this.createReport}
                  viewReport={this.viewReport}
                  view={this.state.view} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
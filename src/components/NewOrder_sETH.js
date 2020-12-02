import React, {Component} from 'react'
import  { connect } from 'react-redux'
import {Tabs, Tab} from 'react-bootstrap'
import Spinner from './Spinner'
import {
	exchangeSelector, 
	sETHSelector, 
	accountSelector, 
	web3Selector, 
	buyOrderSelector_sETH,
	sellOrderSelector_sETH,
} from '../store/selectors'

import {
	buyOrderAmountChanged_sETH, 
	buyOrderPriceChanged_sETH, 
	sellOrderAmountChanged_sETH,  
	sellOrderPriceChanged_sETH
} from '../store/actions'

import {
	makeBuyOrder_sETH, 
	makeSellOrder_sETH
} from '../store/interaction'

const showForm = (props) => {
	const {
		dispatch, 
		buyOrder,
		showBuyTotal,
		exchange,
		token,
		web3,
		account,
		sellOrder,
		showSellTotal
	} = props

	return(
		<Tabs defaultActiveKey= "buy" className= "bg-dark text-white">
			<Tab eventKey= "buy" title= "Buy" className="bg-dark">
				<form onSubmit= {(event) => {
					event.preventDefault()
					makeBuyOrder_sETH(dispatch, exchange, token, web3, buyOrder, account)
				}}>
				<div className= "form-group small">
				<label> Buy Amount (sETH)</label>
				<div className="input-group">
					<input
						type= "text"
						className= "form-control form-control-sm bg-dark text-white"
						placeholder= "Buy Amount"
						onChange={(e) => dispatch( buyOrderAmountChanged_sETH(e.target.value) )}
						required
					/>
				</div>
				</div>
				<div className= "form-group small">
					<label> Buy Price </label>
						<div className= "input-group">
							<input
								type= "text"
								className = "form-control form-control-sm bg-dark text-white"
								placeholder= "Buy Price"
								onChange= {(e) => dispatch( buyOrderPriceChanged_sETH( e.target.value) )}
								required
							/>
						</div>
					</div>
					<button type= "submit" className= "btn btn-primary btn-sm btn-block">Buy Order</button>
					{showBuyTotal ? <small> Total: {buyOrder.amount * buyOrder.price} ETH </small>: null}
				</form>

			</Tab>

			<Tab eventKey= "sell" title= "Sell" className="bg-dark">

				<form onSubmit= {(event) => {
					event.preventDefault()
					makeSellOrder_sETH(dispatch, exchange, token, web3, sellOrder, account)
				}}>
				<div className= "form-group small">
					<label> Sell Amount (sETH)</label>
					<div className= "input-group">
						<input
							type= "text"
							className= "form-control form-control-sm bg-dark text-white"
							placeholder= "Sell amount"
							onChange= {(e) => dispatch( sellOrderAmountChanged_sETH( e.target.value) )}
							required
						/>
					</div>
				</div>
				<div className= "form-group small">
					<label> Sell Price </label>
					<div className= "input-group">
						<input 
							type= "text"
							className= "form-control from-control-sm bg-dark text-white"
							placeholder= "Sell Price"
							onChange= {(e) => dispatch( sellOrderPriceChanged_sETH(e.target.value) )}
							required
						/>
					</div>
				</div>
				<button type= "submit" className= "btn btn-primary btn-sm btn-block">Sell orders</button>
				{ showSellTotal ? <small> Total : {sellOrder.amount * sellOrder.price} ETH</small> : null}
				</form>

			</Tab>
		</Tabs>
	)
}

class NewOrder_sETH extends Component {

	render() {
		return(
			<div className= 'Exchange-Box1-1'>
			<div className= "card bg-dark text-white">
				<div className="card-header">
					New Order
				</div>
				<div className= "card-body">
					{this.props.showForm ? showForm(this.props) : <Spinner />}
				</div>
			</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	const buyOrder = buyOrderSelector_sETH(state)
	const sellOrder = sellOrderSelector_sETH(state)

	return{
		account: accountSelector(state),
		exchange: exchangeSelector(state),
		token: sETHSelector(state),
		web3: web3Selector(state),
		buyOrder, 
		sellOrder,
		showForm: !buyOrder.making && !sellOrder.making,
		showBuyTotal: buyOrder.amount && buyOrder.price,
		showSellTotal: sellOrder.amount && sellOrder.price
	}
}

export default connect(mapStateToProps)(NewOrder_sETH)










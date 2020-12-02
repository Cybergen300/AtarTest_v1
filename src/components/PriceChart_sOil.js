import {connect} from 'react-redux'
import React, {Component} from 'react'
import Chart from 'react-apexcharts'
import { chartOptions, dummyData} from '../store/PriceChart.config'
import{
	priceChartLoadedSelector_sOil,
	priceChartSelector_sOil
} from '../store/selectors'


const priceSymbol = (lastPriceChange) => {
	let output
	if(lastPriceChange === '+'){
		output = <span className="text-success"> &#9650;</span> //Green up triangle
	} else{
		output = <span className="text-danger"> &#9660;</span> //Red Down triangle		
	}
	return (output)
}

const showPriceChart = (priceChart) => {
	return(
		<div className = "price-chart">
			<div className = 'price'>
				<h4> sETH/ETH &nbsp; {priceSymbol(priceChart.lastPriceChange)} &nbsp; {priceChart.lastPrice}</h4>
			</div>
			<Chart options = {chartOptions}  series= {priceChart.series} type = 'candlestick' width= '100%' height = '85%'/>
		</div>
		)
}

class PriceChart_sOil extends Component {
	render() {
		return(
			<div className= "card bg-dark text-white">
				<div className= "card-header">
					Price Chart 
				</div>
				<div className= "card-body">
					{showPriceChart(this.props.priceChart) }
				</div>
			</div>
		)
	}
}

function  mapStateToProps(state){


	return{
		priceChartLoaded: priceChartLoadedSelector_sOil(state),
		priceChart: priceChartSelector_sOil(state),
	}
}

export default connect(mapStateToProps)(PriceChart_sOil)
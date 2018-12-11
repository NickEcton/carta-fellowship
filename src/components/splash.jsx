import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
const https = require('https');

class Splash extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date(), assets: null}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }


    componentDidMount() {
      https.get('https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json', (resp)=> {
        let data = '';

        resp.on('data', (chunk)=> {
          data += chunk;
        });

        resp.on('end', ()=> {
          this.setState({'assets': JSON.parse(data)});
          console.log(this.state)
        });
      }).on("error", (err)=> {
        console.log("Error: " + err.message);
      });

        
        let heads = document.querySelectorAll('.header')
        for(let i =0; i < heads.length; i++) {
          heads[i].addEventListener('click',(e)=>{
            
            console.log(e.currentTarget.children)
           
            let arr = Array.from(e.currentTarget.children)
            arr.forEach((el, idx)=> {
              if (idx === 0) {}
              else {el.classList.toggle('hide')}
            })
          })
        }
     
    }

    componentDidUpdate(prevProps) {
      console.log(prevProps)
      console.log(this.props)
        let heads = document.querySelectorAll('.header')
        for(let i =0; i < heads.length; i++) {
          heads[i].addEventListener('click',(e)=>{
            console.log(e.currentTarget.children)
            let arr = Array.from(e.currentTarget.children)
            console.log(e)
            arr.forEach((el, idx)=> {
              if (idx === 0) {}
              else {el.classList.toggle('hide')}
            })
            console.log('clicked')
      })
    }
  }

    findTotal() {
      let total = 0
      this.state.assets.forEach(el=>{
        total += el.cost.$ || 0 
      })
      return total
    }

    hardTog(e) {
      let t = document.querySelector('.table')
      t.classList.toggle('hide')
    }

    handleSelect(e) {
      this.setState( {date: e })
    }

    handleSubmit(e) {
      e.preventDefault();
      let q = document.querySelector('input').value
      let newDate = `${q.slice(6)}-${q.slice(0,2)}-${q.slice(3,5)}`
      
      https.get(`https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json?date=${newDate}`, (resp)=> {
        let data = '';

        resp.on('data', (chunk)=> {
          data += chunk;
        });

        resp.on('end', ()=> {
          this.setState({'assets': JSON.parse(data)});
        });
      }).on("error", (err)=> {
        console.log("Error: " + err.message);
      });
      // Line below triggers refresh of component, providing user the validation of their input without actually updating the table. 
      // If API triggered new data this line would be unnecessary 
      this.setState({"assets": null})
    }

    render() {
      if (this.state.assets) {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <DatePicker selected={this.state.date} onSelect={this.handleSelect}/>
              <button type="submit">Submit</button>
            </form>
            <button onClick={this.hardTog} className="togTable">Toggle All</button>
            <div className="table">
              <div className="head-row">
                <span className="header-detail">Asset</span>
                <span className="header-detail">Investment Date</span>
                <span className="header-detail">Shares</span>
                <span className="header-detail">Cost</span>
              </div>
              {this.state.assets.map(function(asset,idx){
                return (
                <div className="header" key={idx}>
                  <div className="head-row">
                    <span className="asset-detail">{asset.name}</span>
                    <span className="header-detail"></span>
                    <span className="header-detail">{asset.quantity.formatMoney()} $</span>
                    <span className="header-detail">{asset.cost.$.formatMoney()}</span>  
                  </div>
                  {asset.issued_assets.map(function(inv, index) {
                    return <div className="asset-info" key={index}>
                    <span className="asset-detail">{inv.asset_class}</span>
                    <span className="asset-detail">{inv.investment_date}</span>
                    <span className="asset-detail">{!inv.quantity || inv.quantity.formatMoney()} $ </span>
                    <span className="asset-detail">{inv.cost.$.formatMoney()}</span>
                    </div>
                  })}
                </div>
                )
              })}
              <div className="total-row"><span>Total</span> <span>$ {this.findTotal().formatMoney()}</span></div>
            </div>
          </div>
        );
      } else {
      return <div></div>
    }
  }
}

export default Splash;
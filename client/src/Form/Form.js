import React, { Component } from "react";
import axios from 'axios';
import './Form.css'
class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            before_exchange: 0,
            after_exchange: 0,
            currency: "USD",
            email: "",
            isLoaded: false,
            array: [],
            error: false,
          };
          this.Transfer = this.Transfer.bind(this);
          this.Change_currency = this.Change_currency.bind(this);
          this.Handle_email = this.Handle_email.bind(this);
          this.SendMessage = this.SendMessage.bind(this);

    }

    // Получение текущего курса валют от цетробанка
    componentDidMount() {
        fetch("https://www.cbr-xml-daily.ru/daily_json.js")
          .then((res) => res.json())
          .then(result => {
              this.setState({
                isLoaded: true,
                array: result.Valute,
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error: error,
              });
            }
          );
    
      }
// изменение state в зависимости от введенных значений
    Change_currency(event){
        this.setState({
            currency:event.target.value,
            after_exchange: this.state.before_exchange * this.state.array[event.target.value].Value,
        })
    }
  
    Transfer(event) {
      this.setState({
        before_exchange: event.target.value,
        after_exchange: event.target.value * this.state.array[this.state.currency].Value,
      });
  
    }

    Handle_email(event){
        this.setState({
            email:event.target.value
        })
    }
    //отправка на сервер
    SendMessage(event){
        event.preventDefault();
        const data = {
            before: this.state.before_exchange,
            currency: this.state.currency,
            after: this.state.after_exchange,
            email: this.state.email
        }
        const form = axios.post('/api/form',data)
    
    }    

    render(){
        return(
                <form className='container' onSubmit={this.SendMessage}>
                <input type='number' onChange={this.Transfer} value={this.state.before_exchange} className="form_element"></input>
                <div className="form_element inner">
                <select onChange={this.Change_currency} className='form_element currency'>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="UAH">UAH</option>
                    <option value="CNY">CNY</option>
                </select>
                <h4>{this.state.after_exchange}р.</h4>
                </div>
                <input type='e-mail' onChange={this.Handle_email} className="form_element" required></input>
                <button className='form_element submit_btn' type="submit">Отправить заявку</button>
                </form>
            )
    }
}

export default Form
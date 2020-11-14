import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import { Account, PublicKey, Connection } from '@solana/web3.js';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as serviceWorker from './serviceWorker';

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: ''};
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    let url =  'http://api.mainnet-beta.solana.com';
    const connection = new Connection(url);
    let publicKey = new PublicKey(this.state.username);
    connection.getBalance(publicKey).then(balance => {
      balance = Number(balance)/1000000000 ;
      console.log(`${publicKey} has a balance of ${balance} SOL`);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'For Public Wallet Address ' + `${publicKey}`,
        icon: 'info',
        width: 600,
        html: '<h3>The Balance is <h3>'+`<h4> ${balance} SOL <h4>` 
      });
            
 //     alert(`Address = ${publicKey}
   //         Balance  =  ${balance} SOL`)
    }); 
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
    this.setState({accountBalance:''});
  }
  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      <h1> Enter MainNet Address to Get Balance ! </h1>

      <div class="form-group">
            <label for="Address">Enter Wallet/Public Address :</label>
      
            <input
               class="form-control"
               type='text'
               onChange={this.myChangeHandler}
            />
      </div>

      <button type="submit" class="btn btn-default">Submit</button>

  
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));

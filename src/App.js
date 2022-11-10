
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  return (
    <div className='coin-container'>
      <ul className='coin-row'>
        <li className='coin'>
          <img src={image} alt='crypto' />
          <h3>{name}</h3>
          <p className='coin-symbol'>Symbol: {symbol}</p>
        </li>
        <ul className='coin-data'>
          <li className='coin-price'>Current Price: ${price}</li>
          <li className='coin-volume'>Volume: ${volume.toLocaleString()}</li>

          {priceChange < 0 ? (
            <li className='coin-percent-down'>Percent Down:  {priceChange.toFixed(3)}%</li>
          ) : (
            <li className='coin-percent-up'>Percent Up: {priceChange.toFixed(3)}%</li>
          )}

          <li className='coin-marketcap'>
            Mkt Cap: ${marketcap.toLocaleString()}
          </li>
        </ul>
      </ul>
    </div>
     
  );
};


function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const fillCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search' >
        <h1 className='coin-text'>Discover a coin</h1>
        <form id='searchForm'>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Enter coin name.'
          />
        </form>
      </div>
      {fillCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}


export default App;

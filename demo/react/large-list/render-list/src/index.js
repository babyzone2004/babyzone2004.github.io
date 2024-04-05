import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Pagenation from './Pagenation';
import reportWebVitals from './reportWebVitals';
import InfiniteScroll from 'react-infinite-scroller';
import Virtualized from './Virtualized'
import ViewportList from './ViewportList'
import ReactWindow from './ReactWindow'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Pagenation /> */}
    {/* <InfiniteScroll /> */}
    {/* <Virtualized /> */}
    {/* <ViewportList /> */}
    <ReactWindow />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import type { FC } from "react";
import React, { useState } from "react";

type IProp = {
    title?: string
}

const Avatar: FC<IProp> = ({title}) => {

  const [initMap, setInitMap] = useState([1,2,3,4]);
  const handleClick = () => {
    setInitMap([3,2,1,4])
    var spanEle = document.getElementsByTagName('span');
    Array.from(spanEle).map(it => it.style.color = 'red')
  }
  console.log('Avatar');


  return (
    <div className="App" id="app">
      {
        initMap.map((it,index) => <div key={it}><input type="radio" />{it}</div>)
      }
      <button onClick={() => handleClick()}>btn</button>
    </div>
  );
}

export default Avatar;
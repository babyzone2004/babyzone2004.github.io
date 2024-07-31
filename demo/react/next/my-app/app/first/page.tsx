"use client"
import { useState } from 'react';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [a, setA] = useState({a: 1})
  const [b, setB] = useState(1)
  return (
    <>
      <button onClick={() => {
        a.a = ++a.a

        setA(a);
        setB(n => {
          console.log('n', n);
          return ++n
        })
        console.log('after');
        console.log(a, b);
      }}>test</button>
      <MyButton b={b}/>
    </>
  );
}


function MyButton({b}: any) {
  return <div>xxx {b}</div>
}
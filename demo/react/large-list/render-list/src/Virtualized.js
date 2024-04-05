import React from 'react';
import { faker } from '@faker-js/faker';
import { List } from "react-virtualized";
import './App.css';

function App() {
  const data = new Array(1000).fill().map((value, id) => (({
    id: id,
    title: faker.lorem.words(5),
    body: faker.lorem.sentences(8)
  })))

  const renderRow = ({ index, key, style }) => (
   <div>
    <div key={key} style={style} className="post">
      <h3>{`${data[index].title}-${data[index].id}`}</h3>
      <p>{data[index].body}</p>
    </div>
   </div>
  )
  return (
    <List
      width={1200}
      height={700}
      rowRenderer={renderRow}
      rowCount={data.length}
      rowHeight={120}
    />
  );
}
export default App;
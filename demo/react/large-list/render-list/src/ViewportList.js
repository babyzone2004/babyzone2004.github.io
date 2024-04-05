import React from "react";
import { faker } from "@faker-js/faker";
import { useRef } from "react";
import { ViewportList } from 'react-viewport-list';
const App = () => {
  const ref = useRef(null);
  const items = new Array(1000).fill().map((value, index) => ({
    id: index,
    name: faker.name.firstName(5),
    body: faker.lorem.paragraph(8),
  }));
  return (
    <div className="scroll-container" ref={ref}>
      <ViewportList viewportRef={ref} items={items} itemMinSize={40} margin={8}>
        {(item) => (
          <div key={item.id} className="post">
            <h3>
              {item.name} - {item.id}
            </h3>
            <p>{item.body}</p>
          </div>
        )}
      </ViewportList>
    </div>
  );
};
export default App;
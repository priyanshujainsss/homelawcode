import axios from 'axios';
import React from 'react';

const DisplayLawCodes = ({ alllawcodes }) => {
  function handleCategory() {
    console.log('uerkkio');
  }
  return (
    <div>
      <div>
        {alllawcodes.map((law) => {
          console.log('Fire');
          return (
            <p
              style={{
                color: 'black',
                fontSize: '18px',
                textAlign: 'center',
                marginLeft: '25px',
                backgroundColor: 'skyblue',
                height: 'auto',
                marginBottom: '2px'
              }}
              key={law._id}
              // onClick={() => console.log('iefeiffoi')}
              // onKeyDown={() => console.log('hkdfgfgfgfgfkk')}
            >
              {law.CategoryName}
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default DisplayLawCodes;

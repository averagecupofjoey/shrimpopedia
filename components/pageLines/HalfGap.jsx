import React from 'react';

const HalfGap = React.forwardRef(({ label, value, height, width }, ref) => {
  if (label) {
    return (
      <div
        ref={ref}
        className='row-span-1 col-span-6 border-b-2 border-blue-500 pl-2'
        style={{
          lineHeight: `${height}px`,
          fontSize: width > 213 ? `${height - 6}px` : `${height - 12}px`,
        }}
      >
        <span>
          {label}: {value}
          {/* {width} */}
        </span>
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className='row-span-1 col-span-6 border-b-2 border-blue-500'
    />
  );
});
HalfGap.displayName = 'HalfGap';

export default HalfGap;

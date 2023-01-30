import React from 'react';

const HalfGap = React.forwardRef(({ label, value, height }, ref) => {
  if (label) {
    return (
      <div
        ref={ref}
        className='row-span-1 col-span-6 border-b-2 border-blue-500'
        style={{ lineHeight: `${height}px`, fontSize: `${height - 6}px` }}
      >
        <span>
          {label} : {value}
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

import React from 'react';
import { memo } from 'react';

export const NotFoundPage = (): JSX.Element => {
  return (
    <>
      <h1>404 NOT FOUND</h1>
      <p>お探しのページが見つかりませんでした。</p>
    </>
  );
};

export default memo(NotFoundPage);

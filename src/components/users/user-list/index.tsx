import { observer } from 'mobx-react';
import React, { memo } from 'react'
import HeaderButtons from '../header-buttons';

const UserList = observer(() => {
  return (
    <>
<HeaderButtons/>
    </>
  )
});

export default memo(UserList);
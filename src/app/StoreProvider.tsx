'use client';

import { AppStore, createStore } from '@/utils/store/store';
import React, { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux';

const StoreProvider = ({children}:{children:ReactNode}) => {

  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = createStore();
    // if(localStorage.getItem)
  }

  return (
    <Provider store={storeRef.current}>
        {children}
    </Provider>
  )
}

export default StoreProvider
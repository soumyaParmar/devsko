'use client';

import React, { ReactNode} from 'react'

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  // const [validating, setValidating] = useState(true)

  // useEffect(() => {
  //   const validate = async () => {
  //     setValidating(true)
  //     await validateToken();
  //     setValidating(false)
  //   }
  //   validate();
  // }, [])

  // if (validating) {
  //   return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>
  // }

  return (
    <>{children}</>
  )
}

export default Layout
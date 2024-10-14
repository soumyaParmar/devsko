import Image from 'next/image'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import style from '@/styles/nav.module.css'
import img1 from '@/assets/navbar/bell.svg'
import img2 from '@/assets/navbar/setting.svg'
import img3 from '@/assets/navbar/image.svg'

const Navbar = () => {
  return (
    <nav className={style.nav}>
        <div className={style.logo}>
            DevSko
        </div>
        <div className={style.mid}>
            <span>Courses</span>
            <span>Reports</span>
            <span>How it works</span>
            <span>Help Center</span>
        </div>
        <div className={style.left}>
            <span>
                <Image src={img1} alt='bell'/>
            </span>
            <span>
                <Image src={img2} alt='setting'/>
            </span>
            <span>
                <Image src={img3} alt='profile'/>
            </span>
            <span><ExpandMoreIcon/></span>
        </div>
    </nav>
  )
}

export default Navbar
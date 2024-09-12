"use client";

import React from "react";
import style from "../../../styles/dashboard.module.css";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const router  = useRouter();

    const handleScreeningTest = () =>{
        router.push('/verify')
    }
  return (
    <section className={style.dash}>
      <p>Dashboard</p>
      <div className={style.inner_dash}>
        <div className={style.left_dash}></div>
        <div className={style.right_dash}>
          <div className={style.upper}></div>
          <div className={style.lower}>
            <div className={style.lower_left}>
              <p className="!text-xl !font-normal cursor-pointer">Take a technical test{" (Locked) "}</p>
            </div>
            <div className={style.lower_right}>
              <p className="!text-xl !font-normal cursor-pointer" onClick={handleScreeningTest}>Take a screening test now</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

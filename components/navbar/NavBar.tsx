"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Message from "../common/Message";
import Notification from "../common/Notification";
import Setting from "../common/Setting";
// import logo from "/public/images/logo.png";
import logo from "/public/images/icon.png";

const NavBar = ({ clss = "container" }: { clss: string }) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [active, setActive] = useState<string>("");
  const [activeSearctForm, setActiveSearctForm] = useState(false);
  const msgRef = useRef<HTMLDivElement>(null);
  const ntfRef = useRef<HTMLDivElement>(null);
  const stgRef = useRef<HTMLDivElement>(null);

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

const activeHandler = (opt: any) => {  
    if (opt === active) {
      setActive("");
    } else {
      setActive(opt);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    
    if  (
      ntfRef.current &&
      !ntfRef.current.contains(event.target as Node) &&
      stgRef.current &&
      !stgRef.current.contains(event.target as Node) &&
      msgRef.current &&
      !msgRef.current.contains(event.target as Node)
    ) {
      setActive("");
    }
    
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`header-section header-menu ${windowHeight > 50 && "animated fadeInDown header-fixed"
        }`}
    >
      <nav className="navbar navbar-expand-lg p-0">
        <div className={clss}>
          <nav className="navbar w-100 navbar-expand-lg justify-content-betweenm">
            <Link href="/" className="navbar-brand">
              <Image src={logo} height={60} width={60} className="logo" style={{borderRadius:"20px"}} alt="logo" />
            </Link>
            <button
              className="button search-active d-block d-md-none"
              onClick={() => setActiveSearctForm(!activeSearctForm)}
            >
              <i className="d-center material-symbols-outlined fs-xxl mat-icon">
                search
              </i>
            </button>
            <div className={`search-form ${activeSearctForm && "active"}`}>
              <form action="#" className="input-area d-flex align-items-center">
                <i className="material-symbols-outlined mat-icon">search</i>
                <input
                  type="text"
                  placeholder="Search Circlehubtio"
                  autoComplete="off"
                />
              </form>
            </div>
            <ul className="navbar-nav feed flex-row gap-xl-20 gap-lg-10 gap-sm-7 gap-3 py-4 py-lg-0 m-lg-auto ms-auto ms-aut align-self-center">
              <li>
                <Link href="/" className="nav-icon home active">
                  <i className="mat-icon fs-xxl material-symbols-outlined mat-icon">
                    home
                  </i>
                </Link>
              </li>
              <div className="tooltip-container">
                <Link href="/#news-feed" className="nav-icon feed">
                  <i className="mat-icon fs-xxl material-symbols-outlined mat-icon">
                    feed
                  </i>
                  <span className="tooltip-text">Research</span>
                </Link>
              </div>
              {/* <li>
                <Link href="/groups" className="nav-icon">
                  <i className="mat-icon fs-xxl material-symbols-outlined mat-icon">
                    group
                  </i>
                </Link>
              </li> */}
              <li>
                <Link href="#" className="nav-icon">
                  <i className="mat-icon fs-xxl material-symbols-outlined mat-icon">
                    smart_display
                  </i>
                </Link>
              </li>
            </ul>
            <div className="right-area position-relative d-flex gap-3 gap-xxl-6 align-items-center">
              
              <div
                className={`single-item d-none d-lg-block messages-area ${active === "message" ? "active" : ""
                  }`}
              >
                {/* Message */}
                <Message activeHandler={activeHandler} msgRef={msgRef} />
              </div>
              <div
                className={`single-item d-none d-lg-block messages-area notification-area ${active === "notification" ? "active" : ""
                  }`}
              >
                {/* Notification */}
                <Notification activeHandler={activeHandler} ntfRef={ntfRef}/>
              </div>  
              <div
                className={`single-item d-none d-lg-block profile-area position-relative ${active === "settings" ? "active" : ""
                  }`}
              >
                {/* Setting */}
                <Setting activeHandler={activeHandler} stgRef={stgRef}/>
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
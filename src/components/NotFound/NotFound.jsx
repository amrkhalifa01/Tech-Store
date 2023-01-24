import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <>
      <div className="nav-height"></div>
      <div className="custom-height flex-column d-flex-rules">
        <h1 className={`${styles.notfound_heading} mb-1`}>404</h1>
        <h2 className={styles.notfound_sub_head}>OOPS ! NOTHING WAS FOUND</h2>
        <p className={`${styles.caption} mb-2`}>The page you are looking for might have been removed had it's name changed or is temporarily unavailable.</p>
        <Link to="home" className={styles.notfound_to_home}>
          Return to home page
        </Link>
      </div>
    </>
  );
}

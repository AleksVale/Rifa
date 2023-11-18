'use client'
import Nav from "react-bootstrap/Nav";
import styles from "./sidebar.module.scss";

import Link from 'next/link';



export default function Sidebar() {
  return (
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
    activeKey="/home"
    onSelect={selectedKey => alert(`selected ${selectedKey}`)}
    >
        <div className="sidebar-sticky"></div>
    <Nav.Item>
        <Link className={styles.link}  href="/home">Active</Link>
    </Nav.Item>
    <Nav.Item>
      <Link  href="/home">Active</Link>
    </Nav.Item>
    <Nav.Item>
      <Link  href="/home">Active</Link>
    </Nav.Item>
    </Nav>
   )
}

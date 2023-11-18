'use client'
import Image from 'next/image'
import styles from './page.module.scss'
import Button from 'react-bootstrap/Button';
import Nav from "react-bootstrap/Nav";
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import Sidebar from 'react-bootstrap-sidebar-menu';
import Link from 'next/link';



export default function Home() {
  return (
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
    activeKey="/home"
    onSelect={selectedKey => alert(`selected ${selectedKey}`)}
    >
        <div className={`sidebar-sticky ${styles.sidebar}`}></div>
    <Nav.Item>
        <Link  href="/home">Active</Link>
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

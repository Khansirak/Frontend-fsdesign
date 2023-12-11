import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FSlogo from '../images/fsdesignlogo.png'
import './nav.css';
import { Dropdown } from 'react-bootstrap';

const Nav = () => {
  // assigning location variable
  const location = useLocation();

  // destructuring pathname from location
  const { pathname } = location;

  // Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/');

  const dropdownLinksMenu = [
    { text: 'Import', url: '/link1' },
    { text: 'Export', url: '/link2' },
    { text: 'Print', url: '/link3' },
  ];
  const dropdownLinksEdit = [
    { text: 'Copy', url: '/link1' },
    { text: 'Paste', url: '/link2' },
    { text: 'Cut', url: '/link3' },
  ];
  const dropdownLinksTool = [
    { text: 'Graph', url: '/link1' },
    { text: 'Logic', url: '/link2' },
    { text: 'HMI', url: '/link3' },
  ];
  const dropdownLinksUser = [
    { text: 'Management', url: '/link1' }
  ];
  const dropdownLinksRevision = [
    { text: 'Settings', url: '/link1' }
  ];
  const dropdownLinksSettings = [
    { text: 'Language', url: '/link1' },
    { text: 'Action', url: '/link2' },
    { text: 'Transition', url: '/link3' },
  ];


  return (

    <>


<div className="d-flex flex-row justify-content-between ">
      <div className="d-flex flex-row text=center align-items-start " style={{height:"90px"}}>
      
          <img alt="logo" src={FSlogo} className="image"  />
        
      <div>
        <ul className=" border d-flex justify-content-around list-unstyled p-2 mb-0 ml-5 border-info" style={{backgroundColor: "#b7e778",color:"black"}}>
        <Dropdown>
      <Dropdown.Toggle variant="black"  id="dropdown-basic" style={{ paddingRight: '0' }}>
      <Link to="/" style={{color:"black", textDecoration: 'none',fontSize: "14px",padding:"5px", fontWeight:'12px'}}>Menu</Link>
      </Dropdown.Toggle>
      {/* <li >
            <Link to="/" style={{color:"black", fontWeight:'normal'}}>Menu</Link>
          </li> */}
      <Dropdown.Menu className="unstyled-dropdown">
        {dropdownLinksMenu.map((link, index) => (
          <Dropdown.Item key={index}>
            <Link to={link.url} style={{ background: 'none', textDecoration: 'none',padding:"5px", fontSize: "14px",padding:"5px",fontSize: "14px",border: 'black', color:"black", boxShadow: 'none' }}>{link.text}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="black"  id="dropdown-basic" style={{ paddingRight: '0' }}>
      <Link to="/" style={{color:"black", textDecoration: 'none',fontSize: "14px",padding:"5px",fontWeight:'12px'}}>Edit</Link>
      </Dropdown.Toggle>

      <Dropdown.Menu className="unstyled-dropdown">
        {dropdownLinksEdit.map((link, index) => (
          <Dropdown.Item key={index}>
            <Link to={link.url} style={{ background: 'none', textDecoration: 'none',border: 'black',padding:"5px",fontSize: "14px", color:"black", boxShadow: 'none' }}>{link.text}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown.Toggle variant="black"  id="dropdown-basic" style={{ paddingRight: '0' }}>
      <Link to="/" style={{color:"black", textDecoration: 'none',padding:"5px",fontSize: "14px",fontWeight:'12px'}}>Format</Link>
      </Dropdown.Toggle>
      <Dropdown.Toggle variant="black"  id="dropdown-basic" style={{ paddingRight: '0' }}>
      <Link to="/" style={{color:"black", textDecoration: 'none',padding:"5px",fontSize: "14px",fontWeight:'12px'}}>Extra</Link>
      </Dropdown.Toggle>

      <Dropdown>
      <Dropdown.Toggle variant="black"  id="dropdown-basic" style={{ paddingRight: '0' }}>
      <Link to="/" style={{color:"black", textDecoration: 'none',padding:"5px",fontSize: "14px",fontWeight:'12px'}}>Tool</Link>
      </Dropdown.Toggle>

      <Dropdown.Menu className="unstyled-dropdown">
        {dropdownLinksTool.map((link, index) => (
          <Dropdown.Item key={index}>
            <Link to={link.url} style={{ background: 'none', textDecoration: 'none',border: 'black',padding:"5px",fontSize: "14px", color:"black", boxShadow: 'none' }}>{link.text}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown>
      <Dropdown.Toggle variant="black"  id="dropdown-basic" style={{ paddingRight: '0' }}>
      <Link to="/" style={{color:"black", textDecoration: 'none',padding:"5px",fontSize: "14px",padding:"5px",fontSize: "14px",fontWeight:'12px'}}>User</Link>
      </Dropdown.Toggle>

      <Dropdown.Menu className="unstyled-dropdown">
        {dropdownLinksUser.map((link, index) => (
          <Dropdown.Item key={index}>
            <Link to={link.url} style={{ background: 'none', padding:"5px",fontSize: "14px",textDecoration: 'none',border: 'black', color:"black", boxShadow: 'none' }}>{link.text}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="black"  id="dropdown-basic" style={{ paddingRight: '0' }}>
      <Link to="/" style={{color:"black", textDecoration: 'none',padding:"5px",fontSize: "14px",fontWeight:'12px'}}>Revision</Link>
      </Dropdown.Toggle>

      <Dropdown.Menu className="unstyled-dropdown">
        {dropdownLinksRevision.map((link, index) => (
          <Dropdown.Item key={index}>
            <Link to={link.url} style={{ background: 'none', textDecoration: 'none',border: 'black',padding:"5px",fontSize: "14px", color:"black", boxShadow: 'none' }}>{link.text}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="black"  id="dropdown-basic" style={{ paddingRight: '0' }}>
      <Link to="/" style={{color:"black", textDecoration: 'none',padding:"5px", fontSize: "14px",fontWeight:'12px'}}>Settings</Link>
      </Dropdown.Toggle>

      <Dropdown.Menu className="unstyled-dropdown">
        {dropdownLinksSettings.map((link, index) => (
          <Dropdown.Item key={index}>
            <Link to={link.url} style={{ background: 'none', textDecoration: 'none',padding:"5px",fontSize: "14px",border: 'black', color:"black", boxShadow: 'none' }}>{link.text}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>

      <Dropdown.Toggle variant="black"  id="dropdown-basic" style={{ paddingRight: '0' }}>
      <Link to="/" style={{color:"black", textDecoration: 'none',padding:"5px",fontSize: "14px",fontWeight:'12px'}}>Submit</Link>
      </Dropdown.Toggle>
        </ul>
        </div>
      </div>
      <div className="ms-5 me-5" >
          <img alt="logo" className="image" />
        </div>
      </div>

      
    </>
  );
};
export default Nav;

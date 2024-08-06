import "./SidebarPers.css";
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../dataPers/data';
import { SidebarContext } from "../../context/sidebarContext";

const SidebarPers = () => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const [isMedicalFolderOpen, setIsMedicalFolderOpen] = useState(false);
  const [isAuditFolderOpen, setIsAuditFolderOpen] = useState(false);

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  const handleLinkClick = (id, title) => {
    setActiveLinkIdx(id);

    // Toggle folder open/close based on clicked link title
    if (title === 'Dossier medical') {
      setIsMedicalFolderOpen(!isMedicalFolderOpen);
      setIsAuditFolderOpen(false);
    } else if (title === 'Audit') {
      setIsAuditFolderOpen(!isAuditFolderOpen);
      setIsMedicalFolderOpen(false);
    } else {
      setIsMedicalFolderOpen(false);
      setIsAuditFolderOpen(false);
    }
  };

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.person_two} alt="profile image" />
        </div>
        <span className="info-name">Espace Personnel </span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-item" key={navigationLink.id}>

              <Link
                to={navigationLink.url} // Utilisation de l'URL dynamique
                className={`nav-link ${activeLinkIdx === navigationLink.id ? 'active' : ''}`}
                onClick={() => handleLinkClick(navigationLink.id, navigationLink.title)}
              >
                <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                <span className="nav-link-text">{navigationLink.title}</span>
              </Link>

              {navigationLink.title === 'Dossier medical' && isMedicalFolderOpen && (
                <ul className="sub-list">
                  <li className="sub-item">
                    <a href="/visits-list" className="sub-link">Visites systématiques</a>
                  </li>
                  <li className="sub-item">
                    <a href="/copro-list" className="sub-link">Examens copros</a>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SidebarPers;

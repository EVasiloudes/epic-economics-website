import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <img src="/favicon-32x32.png" alt="Epic Economics logo" className="footer-logo-img" />
              <h2 className="footer-title">Epic Economics</h2>
            </div>
            <p className="footer-tagline">
              What would you protest about today?
            </p>
          </div>

          <nav className="footer-section footer-navigation" aria-label="Footer navigation">
            <h3 className="footer-section-title">Navigation</h3>
            <ul className="footer-list">
              <li><Link to="/" aria-label="Go to home page">Home</Link></li>
              <li><Link to="/press" aria-label="Go to press and media page">Press & Media</Link></li>
              <li><Link to="/technical" aria-label="View technical details page">View Technical Details</Link></li>
              <li><Link to="/contact" aria-label="Go to contact page">Contact</Link></li>
            </ul>
          </nav>

          <div className="footer-section footer-team">
            <h3 className="footer-section-title">Creative Team</h3>
            <ul className="footer-list">
              <li className="footer-team-item">
                <a href="https://dimis.org" target="_blank" rel="noopener noreferrer" aria-label="Visit Dimis Michaelides website - Writer and Performer">
                  Dimis Michaelides
                </a>
                <span className="footer-team-role">Writer & Performer</span>
              </li>
              <li className="footer-team-item">
                <a href="https://liaharaki.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Lia Haraki website - Director">
                  Lia Haraki
                </a>
                <span className="footer-team-role">Director</span>
              </li>
              <li className="footer-team-item">
                <a href="https://elias.densetheory.cc" target="_blank" rel="noopener noreferrer" aria-label="Visit Elias Vasnic website - Producer and Composer">
                  Elias Vasnic
                </a>
                <span className="footer-team-role">Producer & Composer</span>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-social">
            <h3 className="footer-section-title">Follow the Production</h3>
            <div className="footer-social-links">
              <a
                href="https://www.facebook.com/profile.php?id=61586961475899"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Epic Economics on Facebook (opens in new tab)"
              >
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMSAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzU3M18xOTg1MykiPgo8cGF0aCBkPSJNMTAuNSAwQzQuOTc3MiAwIDAuNSA0LjQ3NzIgMC41IDEwQzAuNSAxNC42ODk2IDMuNzI4OCAxOC42MjQ4IDguMDg0NCAxOS43MDU2VjEzLjA1Nkg2LjAyMjRWMTBIOC4wODQ0VjguNjgzMkM4LjA4NDQgNS4yNzk2IDkuNjI0OCAzLjcwMiAxMi45NjY0IDMuNzAyQzEzLjYgMy43MDIgMTQuNjkzMiAzLjgyNjQgMTUuMTQwNCAzLjk1MDRWNi43MjA0QzE0LjkwNDQgNi42OTU2IDE0LjQ5NDQgNi42ODMyIDEzLjk4NTIgNi42ODMyQzEyLjM0NTYgNi42ODMyIDExLjcxMiA3LjMwNDQgMTEuNzEyIDguOTE5MlYxMEgxNC45Nzg0TDE0LjQxNzIgMTMuMDU2SDExLjcxMlYxOS45MjY4QzE2LjY2MzYgMTkuMzI4OCAyMC41MDA0IDE1LjExMjggMjAuNTAwNCAxMEMyMC41IDQuNDc3MiAxNi4wMjI4IDAgMTAuNSAwWiIgZmlsbD0iIzAwMkI0OSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzU3M18xOTg1MyI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" alt="" className="footer-social-icon" aria-hidden="true" width="20" height="20" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/epic.economics/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Epic Economics on Instagram (opens in new tab)"
              >
                <img alt="" className="footer-social-icon" aria-hidden="true" width="20" height="20" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMSAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjUwNTkgMS44MDExM0MxMy4xNzkzIDEuODAxMTMgMTMuNDk1OSAxLjgxMjg1IDE0LjU0NzMgMS44NTk3NEMxNS41MjQ0IDEuOTAyNzIgMTYuMDUyMSAyLjA2NjgxIDE2LjQwMzggMi4yMDM1NkMxNi44NjkgMi4zODMyOCAxNy4yMDUxIDIuNjAyMDcgMTcuNTUzIDIuOTQ5OEMxNy45MDQ3IDMuMzAxNDMgMTguMTE5NyAzLjYzMzUyIDE4LjI5OTUgNC4wOTg0NkMxOC40MzYzIDQuNDUwMDkgMTguNjAwNCA0Ljk4MTQ0IDE4LjY0MzQgNS45NTQyOUMxOC42OTAzIDcuMDA5MTggMTguNzAyMSA3LjMyNTY1IDE4LjcwMjEgOS45OTQxNEMxOC43MDIxIDEyLjY2NjUgMTguNjkwMyAxMi45ODMgMTguNjQzNCAxNC4wMzRDMTguNjAwNCAxNS4wMTA3IDE4LjQzNjMgMTUuNTM4MiAxOC4yOTk1IDE1Ljg4OThDMTguMTE5NyAxNi4zNTQ4IDE3LjkwMDggMTYuNjkwOCAxNy41NTMgMTcuMDM4NUMxNy4yMDEyIDE3LjM5MDEgMTYuODY5IDE3LjYwNSAxNi40MDM4IDE3Ljc4NDdDMTYuMDUyMSAxNy45MjE1IDE1LjUyMDUgMTguMDg1NiAxNC41NDczIDE4LjEyODVDMTMuNDkyIDE4LjE3NTQgMTMuMTc1NCAxOC4xODcxIDEwLjUwNTkgMTguMTg3MUM3LjgzMjQyIDE4LjE4NzEgNy41MTU4MyAxOC4xNzU0IDYuNDY0NDMgMTguMTI4NUM1LjQ4NzMgMTguMDg1NiA0Ljk1OTY0IDE3LjkyMTUgNC42MDc4OCAxNy43ODQ3QzQuMTQyNzYgMTcuNjA1IDMuODA2NjIgMTcuMzg2MiAzLjQ1ODc2IDE3LjAzODVDMy4xMDcgMTYuNjg2OSAyLjg5MjAzIDE2LjM1NDggMi43MTIyMyAxNS44ODk4QzIuNTc1NDMgMTUuNTM4MiAyLjQxMTI4IDE1LjAwNjggMi4zNjgyOCAxNC4wMzRDMi4zMjEzOCAxMi45NzkxIDIuMzA5NjUgMTIuNjYyNiAyLjMwOTY1IDkuOTk0MTRDMi4zMDk2NSA3LjMyMTc0IDIuMzIxMzggNy4wMDUyNyAyLjM2ODI4IDUuOTU0MjlDMi40MTEyOCA0Ljk3NzUzIDIuNTc1NDMgNC40NTAwOSAyLjcxMjIzIDQuMDk4NDZDMi44OTIwMyAzLjYzMzUyIDMuMTEwOSAzLjI5NzUyIDMuNDU4NzYgMi45NDk4QzMuODEwNTMgMi41OTgxNiA0LjE0Mjc2IDIuMzgzMjggNC42MDc4OCAyLjIwMzU2QzQuOTU5NjQgMi4wNjY4MSA1LjQ5MTIxIDEuOTAyNzIgNi40NjQ0MyAxLjg1OTc0QzcuNTE1ODMgMS44MTI4NSA3LjgzMjQyIDEuODAxMTMgMTAuNTA1OSAxLjgwMTEzWk0xMC41MDU5IDBDNy43ODk0MyAwIDcuNDQ5MzggMC4wMTE3MjEgNi4zODIzNSAwLjA1ODYwNTJDNS4zMTkyMyAwLjEwNTQ4OSA0LjU4ODMzIDAuMjc3Mzk4IDMuOTU1MTUgMC41MjM1NEMzLjI5NDYxIDAuNzgxNDAzIDIuNzM1NjggMS4xMjEzMSAyLjE4MDY3IDEuNjgwMDJDMS42MjE3NSAyLjIzNDgxIDEuMjgxNzEgMi43OTM1MSAxLjAyMzc0IDMuNDQ5ODlDMC43Nzc1MDYgNC4wODY3NCAwLjYwNTUzMSA0LjgxMzQ0IDAuNTU4NjI4IDUuODc2MTVDMC41MTE3MjYgNi45NDY2NyAwLjUgNy4yODY1OCAwLjUgMTAuMDAyQzAuNSAxMi43MTczIDAuNTExNzI2IDEzLjA1NzIgMC41NTg2MjggMTQuMTIzOUMwLjYwNTUzMSAxNS4xODY2IDAuNzc3NTA2IDE1LjkxNzIgMS4wMjM3NCAxNi41NTAxQzEuMjgxNzEgMTcuMjEwNCAxLjYyMTc1IDE3Ljc2OTEgMi4xODA2NyAxOC4zMjM5QzIuNzM1NjggMTguODc4NyAzLjI5NDYxIDE5LjIyMjUgMy45NTEyNCAxOS40NzY1QzQuNTg4MzMgMTkuNzIyNiA1LjMxNTMyIDE5Ljg5NDUgNi4zNzg0NCAxOS45NDE0QzcuNDQ1NDggMTkuOTg4MyA3Ljc4NTUyIDIwIDEwLjUwMiAyMEMxMy4yMTg0IDIwIDEzLjU1ODQgMTkuOTg4MyAxNC42MjU1IDE5Ljk0MTRDMTUuNjg4NiAxOS44OTQ1IDE2LjQxOTUgMTkuNzIyNiAxNy4wNTI3IDE5LjQ3NjVDMTcuNzA5MyAxOS4yMjI1IDE4LjI2ODIgMTguODc4NyAxOC44MjMyIDE4LjMyMzlDMTkuMzc4MiAxNy43NjkxIDE5LjcyMjIgMTcuMjEwNCAxOS45NzYzIDE2LjU1NEMyMC4yMjI1IDE1LjkxNzIgMjAuMzk0NSAxNS4xOTA1IDIwLjQ0MTQgMTQuMTI3OEMyMC40ODgzIDEzLjA2MTEgMjAuNSAxMi43MjEyIDIwLjUgMTAuMDA1OUMyMC41IDcuMjkwNDkgMjAuNDg4MyA2Ljk1MDU4IDIwLjQ0MTQgNS44ODM5NkMyMC4zOTQ1IDQuODIxMjUgMjAuMjIyNSA0LjA5MDY0IDE5Ljk3NjMgMy40NTc3MUMxOS43MyAyLjc5MzUxIDE5LjM5IDIuMjM0ODEgMTguODMxMSAxLjY4MDAyQzE4LjI3NiAxLjEyNTIyIDE3LjcxNzEgMC43ODE0MDMgMTcuMDYwNSAwLjUyNzQ0N0MxNi40MjM0IDAuMjgxMzA1IDE1LjY5NjQgMC4xMDkzOTYgMTQuNjMzMyAwLjA2MjUxMjJDMTMuNTYyMyAwLjAxMTcyMSAxMy4yMjIzIDAgMTAuNTA1OSAwWiIgZmlsbD0iIzAwMkI0OSIvPgo8cGF0aCBkPSJNMTAuNTA1OSA0Ljg2NDIzQzcuNjY4MjYgNC44NjQyMyA1LjM2NjEzIDcuMTY1NDYgNS4zNjYxMyAxMC4wMDJDNS4zNjYxMyAxMi44Mzg0IDcuNjY4MjYgMTUuMTM5NyAxMC41MDU5IDE1LjEzOTdDMTMuMzQzNSAxNS4xMzk3IDE1LjY0NTYgMTIuODM4NCAxNS42NDU2IDEwLjAwMkMxNS42NDU2IDcuMTY1NDYgMTMuMzQzNSA0Ljg2NDIzIDEwLjUwNTkgNC44NjQyM1pNMTAuNTA1OSAxMy4zMzQ2QzguNjY0OTQgMTMuMzM0NiA3LjE3MTg4IDExLjg0MjIgNy4xNzE4OCAxMC4wMDJDNy4xNzE4OCA4LjE2MTc1IDguNjY0OTQgNi42NjkyNyAxMC41MDU5IDYuNjY5MjdDMTIuMzQ2OCA2LjY2OTI3IDEzLjgzOTggOC4xNjE3NSAxMy44Mzk4IDEwLjAwMkMxMy44Mzk4IDExLjg0MjIgMTIuMzQ2OCAxMy4zMzQ2IDEwLjUwNTkgMTMuMzM0NloiIGZpbGw9IiMwMDJCNDkiLz4KPHBhdGggZD0iTTE3LjA0ODggNC42NjEwM0MxNy4wNDg4IDUuMzI1MjIgMTYuNTA5NCA1Ljg2MDQ5IDE1Ljg0ODggNS44NjA0OUMxNS4xODQ0IDUuODYwNDkgMTQuNjQ4OSA1LjMyMTMyIDE0LjY0ODkgNC42NjEwM0MxNC42NDg5IDMuOTk2ODQgMTUuMTg4MyAzLjQ2MTU4IDE1Ljg0ODggMy40NjE1OEMxNi41MDk0IDMuNDYxNTggMTcuMDQ4OCA0LjAwMDc0IDE3LjA0ODggNC42NjEwM1oiIGZpbGw9IiMwMDJCNDkiLz4KPC9zdmc+Cg==" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@epic.economics"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Epic Economics on TikTok (opens in new tab)"
              >
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMSAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjcyNzIgMEwxMS4zNTY2IDBWMTMuNjIzMkMxMS4zNTY2IDE1LjI0NjQgMTAuMDYwMiAxNi41Nzk3IDguNDQ2OTcgMTYuNTc5N0M2LjgzMzY5IDE2LjU3OTcgNS41MzczMiAxNS4yNDY0IDUuNTM3MzIgMTMuNjIzMkM1LjUzNzMyIDEyLjAyOSA2LjgwNDg5IDEwLjcyNDYgOC4zNjA1NiAxMC42NjY3VjcuMjQ2MzlDNC45MzIzNSA3LjMwNDMzIDIuMTY2NzUgMTAuMTE1OSAyLjE2Njc1IDEzLjYyMzJDMi4xNjY3NSAxNy4xNTk0IDQuOTg5OTYgMjAgOC40NzU3OSAyMEMxMS45NjE2IDIwIDE0Ljc4NDggMTcuMTMwNCAxNC43ODQ4IDEzLjYyMzJWNi42Mzc2N0MxNi4wNTI0IDcuNTY1MjIgMTcuNjA4IDguMTE1OTQgMTkuMjUwMSA4LjE0NDk0VjQuNzI0NjRDMTYuNzE1IDQuNjM3NjggMTQuNzI3MiAyLjU1MDcyIDE0LjcyNzIgMFoiIGZpbGw9IiMwMDJCNDkiLz4KPC9zdmc+" alt="" className="footer-social-icon" aria-hidden="true" width="20" height="20" />
                <span>TikTok</span>
              </a>
              <a
                href="https://www.youtube.com/@EpicEconomics"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Epic Economics on YouTube (opens in new tab)"
              >
                <img src="/favicon-32x32.png" alt="" className="footer-social-icon" aria-hidden="true" />
                <span>YouTube</span>
              </a>
            </div>
            <p className="footer-description">
              website by <a href="https://densetheory.cc">studio dense theory</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              <span aria-label={`Copyright ${currentYear} Epic Economics. All rights reserved.`}>© {currentYear} Epic Economics. All rights reserved.</span>
            </p>
            <p className="footer-credits">
              Photography by <a href="https://www.instagram.com/blessthismess_photography/" target="_blank" rel="noopener noreferrer" aria-label="Visit Boyana Loizou's Instagram (opens in new tab)">Boyana Loizou</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

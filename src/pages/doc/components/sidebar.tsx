import Link from 'next/link';
import style from '../style.module.css';
export default function SidebarComponent() {
  return (
    <>
      <nav className={style.sidebar}>
        <div className={style.logo_section}> 
            <h1>Logo</h1>
        </div>
        <div className={style.subject_list}>
            <label>Javacript</label>
            <ul>
                <li>
                    <Link href="/">
                        <span>001</span>
                        <div>Variable</div>
                    </Link>
                </li>
                <li className={style.active}>
                    <Link href="/">
                        <span>001</span>
                        <div>Variable</div>
                    </Link>
                </li>
            </ul>
        </div>
      </nav>
    </>
  );
}

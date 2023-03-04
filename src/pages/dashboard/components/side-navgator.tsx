import style from '../style.module.css';
export default function SideNavigatorComponent() {
  return (
    <>
      <ul className={style['side-menu-navigator']}>
        <li className="menu-title">
          <span>Category</span>
        </li>
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
        <li className="menu-title">
          <span>Category</span>
        </li>
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </>
  );
}

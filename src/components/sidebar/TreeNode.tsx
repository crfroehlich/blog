import React from 'react';
import { OpenedSvg } from './OpenedSvg';
import { ClosedSvg } from './ClosedSvg';
import { config } from '../../../config';
import { Link } from '../Link';
import { Tools } from '../../utils';

export const TreeNode = ({
  className = '',
  setCollapsed,
  collapsed,
  url,
  title,
  items,
  ...rest
}) => {
  const isCollapsed = collapsed[url];

  const collapse = () => setCollapsed(url);

  const hasChildren = items?.length !== 0;

  const tools = new Tools();
  const location = tools.getLocation();
  const active =
    location?.pathname === url || location?.pathname === config?.gatsby?.pathPrefix + url;
  const calculatedClassName = `${className} item ${active ? 'active' : ''}`;

  return (
    <li className={calculatedClassName}>
      {title && hasChildren && (
        <a>
          {title}
          {!config.sidebar.frontLine && title && hasChildren ? (
            <button onClick={collapse} aria-label="collapse" className="collapser">
              {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
            </button>
          ) : null}
        </a>
      )}
      {title && !hasChildren && <Link to={url}>{title}</Link>}

      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default TreeNode;

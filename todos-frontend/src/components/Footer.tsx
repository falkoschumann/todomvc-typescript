import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Filter } from './constants';

interface FooterProps {
  readonly activeTodoCount: number;
  readonly completedCount: number;
  readonly nowShowing: Filter;
  onClearCompleted(): void;
}

function Footer({ activeTodoCount, completedCount, nowShowing, onClearCompleted }: FooterProps) {
  if (activeTodoCount === 0 && completedCount === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong> item{activeTodoCount > 1 ? 's' : ''} left
      </span>
      <ul className="filters">
        <li>
          <Link to="/" className={classNames({ selected: nowShowing === Filter.AllTodos })}>
            All
          </Link>
        </li>
        <li>
          <Link
            to="/active"
            className={classNames({ selected: nowShowing === Filter.ActiveTodos })}
          >
            Active
          </Link>
        </li>
        <li>
          <Link
            to="/completed"
            className={classNames({ selected: nowShowing === Filter.CompletedTodos })}
          >
            Completed
          </Link>
        </li>
      </ul>
      {completedCount > 0 ? (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}

export default Footer;

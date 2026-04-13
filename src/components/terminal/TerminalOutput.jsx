import React, { memo, lazy, Suspense, useCallback } from 'react';

// Lazy load games
const DinoGame = lazy(() => import('./DinoGame'));
const MatrixRain = lazy(() => import('./MatrixRain'));

// Error boundary for games
class GameErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Game error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="output-line error">Game failed to load</div>;
    }
    return this.props.children;
  }
}

// Get copyable text from an item
const getCopyText = (item) => {
  if (!item) return '';
  if (typeof item.content === 'string') return item.content;
  if (Array.isArray(item.content)) return item.content.join('\n');
  if (item.items) return item.items.map(i => i.name || i).join(', ');
  return '';
};

// Output renderers
const outputRenderers = {
  command: (item) => (
    <div className="prompt" role="presentation">
      {item.content}
    </div>
  ),

  text: (item) => (
    <div className="output-line" role="log">
      {Array.isArray(item.content)
        ? item.content.map((line, i) => <div key={i}>{line}</div>)
        : item.content
      }
    </div>
  ),

  ascii: (item) => (
    <pre
      className="output-line ascii-art"
      role="img"
      aria-label={item.alt || "ASCII Art"}
    >
      {item.content}
    </pre>
  ),

  link: (item) => (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="output-line terminal-link"
      aria-label={item.ariaLabel || `Link to ${item.content}`}
    >
      {item.content}
    </a>
  ),

  list: (item) => (
    <div className="output-line" role="list">
      {item.items?.map((listItem, i) => (
        <span
          key={listItem.id || i}
          className="list-item"
          role="listitem"
        >
          {listItem.name || listItem}
        </span>
      ))}
    </div>
  ),

  table: (item) => (
    <div className="output-table" role="table">
      {item.headers && (
        <div className="table-header" role="row">
          {item.headers.map((header, i) => (
            <span key={i} className="table-cell header" role="columnheader">
              {header}
            </span>
          ))}
        </div>
      )}
      {item.rows?.map((row, i) => (
        <div key={i} className="table-row" role="row">
          {row.map((cell, j) => (
            <span key={j} className="table-cell" role="cell">
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  ),

  progress: (item) => (
    <div className="output-line progress-container">
      <span className="progress-label">{item.label}: </span>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${item.value || 0}%` }}
          role="progressbar"
          aria-valuenow={item.value}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      <span className="progress-text">{item.value}%</span>
    </div>
  ),

  error: (item) => (
    <div className="output-line error" role="alert">
      ERROR: {item.content}
    </div>
  ),

  success: (item) => (
    <div className="output-line success" role="status">
      {item.content}
    </div>
  ),

  warning: (item) => (
    <div className="output-line warning" role="alert">
      WARNING: {item.content}
    </div>
  ),

  game: (item) => {
    const gameComponents = {
      'dino-runner': (
        <Suspense fallback={<div className="loading-spinner"><span className="spinner-dots"></span><span>Loading game...</span></div>}>
          <DinoGame />
        </Suspense>
      ),
      'matrix-rain': (
        <Suspense fallback={<div className="loading-spinner"><span className="spinner-dots"></span><span>Entering the Matrix...</span></div>}>
          <MatrixRain />
        </Suspense>
      ),
    };

    const GameComponent = gameComponents[item.content];

    if (!GameComponent) {
      return <div className="output-line error">Game '{item.content}' not found</div>;
    }

    return (
      <GameErrorBoundary>
        {GameComponent}
      </GameErrorBoundary>
    );
  }
};

const TerminalOutput = memo(({ item, onCopy }) => {
  if (!item || typeof item !== 'object') {
    console.warn('Invalid item passed to TerminalOutput:', item);
    return <div className="output-line error">Invalid output item</div>;
  }

  const { type = 'text' } = item;
  const renderer = outputRenderers[type];

  if (!renderer) {
    console.warn(`Unknown output type: ${type}`);
    return <div className="output-line">{item.content || 'Unknown output'}</div>;
  }

  // Determine if this item is copyable
  const copyable = type !== 'command' && type !== 'game' && getCopyText(item);

  const handleClick = useCallback(() => {
    if (copyable && onCopy) {
      onCopy(getCopyText(item));
    }
  }, [item, copyable, onCopy]);

  return (
    <div
      className={`terminal-output-item ${type}${copyable ? ' copyable' : ''}`}
      data-type={type}
      onClick={copyable ? handleClick : undefined}
      title={copyable ? 'Click to copy' : undefined}
    >
      {renderer(item)}
    </div>
  );
});

TerminalOutput.displayName = 'TerminalOutput';

export default TerminalOutput;
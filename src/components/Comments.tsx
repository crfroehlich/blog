import React, { useEffect } from 'react';
import { Tools } from '../utils';

// Helper to add scripts to our page
const insertScript = (src, id, parentElement) => {
  const tools = new Tools();
  const script = tools.getDocument()?.createElement('script');

  script.async = true;
  script.src = src;
  script.id = id;
  parentElement.appendChild(script);
  return script;
};

// Helper to remove scripts from our page
const removeScript = (id, parentElement): void => {
  const tools = new Tools();
  const script = tools.getDocument()?.getElementById(id);

  if (script) {
    parentElement.removeChild(script);
  }
};

interface IComment {
  id: string;
}

export const Comments: React.FC<IComment> = ({ id }) => {
  useEffect(() => {
    // If there's no document there's nothing to do for us
    const tools = new Tools();
    const document = tools.getDocument();
    if (!document) {
      return;
    }

    // In case our #commento container exists we can add our commento script
    if (document.getElementById('commento')) {
      insertScript(`https://home.luddites.me/js/commento.js`, `commento-script`, document.body);
    }
    // Cleanup; remove the script from the page
    removeScript(`commento-script`, document.body);
  }, [id]);

  return <div id={`commento`} />;
};

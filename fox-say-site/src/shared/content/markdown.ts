function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderInline(value: string): string {
  let html = escapeHtml(value);

  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return html;
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const output: string[] = [];

  let inCodeBlock = false;
  let inUnorderedList = false;
  let inOrderedList = false;
  let inBlockquote = false;
  let paragraphBuffer: string[] = [];

  const closeParagraph = () => {
    if (!paragraphBuffer.length) return;
    output.push(`<p>${renderInline(paragraphBuffer.join(" "))}</p>`);
    paragraphBuffer = [];
  };

  const closeLists = () => {
    if (inUnorderedList) {
      output.push("</ul>");
      inUnorderedList = false;
    }
    if (inOrderedList) {
      output.push("</ol>");
      inOrderedList = false;
    }
  };

  const closeBlockquote = () => {
    if (inBlockquote) {
      closeParagraph();
      output.push("</blockquote>");
      inBlockquote = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      closeParagraph();
      closeLists();
      closeBlockquote();

      if (inCodeBlock) {
        output.push("</code></pre>");
        inCodeBlock = false;
      } else {
        output.push("<pre><code>");
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      output.push(`${escapeHtml(rawLine)}\n`);
      continue;
    }

    if (!line) {
      closeParagraph();
      closeLists();
      closeBlockquote();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeParagraph();
      closeLists();
      closeBlockquote();

      const level = headingMatch[1].length;
      output.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      closeParagraph();
      closeBlockquote();
      if (!inUnorderedList) {
        closeLists();
        output.push("<ul>");
        inUnorderedList = true;
      }
      output.push(`<li>${renderInline(unorderedMatch[1])}</li>`);
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      closeParagraph();
      closeBlockquote();
      if (!inOrderedList) {
        closeLists();
        output.push("<ol>");
        inOrderedList = true;
      }
      output.push(`<li>${renderInline(orderedMatch[1])}</li>`);
      continue;
    }

    const blockquoteMatch = line.match(/^>\s?(.*)$/);
    if (blockquoteMatch) {
      closeParagraph();
      closeLists();
      if (!inBlockquote) {
        output.push("<blockquote>");
        inBlockquote = true;
      }
      paragraphBuffer.push(blockquoteMatch[1]);
      continue;
    }

    closeLists();
    closeBlockquote();
    paragraphBuffer.push(line);
  }

  closeParagraph();
  closeLists();
  closeBlockquote();

  if (inCodeBlock) {
    output.push("</code></pre>");
  }

  return output.join("\n");
}

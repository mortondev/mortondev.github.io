// Adds `readingTime` (minutes) to a post's YAML frontmatter at build time,
// so the post list can show it without shipping post bodies to the client.
type Node = { type: string; value?: string; children?: Node[] }

function countWords(node: Node): number {
  if (node.type === 'code' || node.type === 'yaml') return 0
  if (node.type === 'text' || node.type === 'inlineCode') return (node.value ?? '').split(/\s+/).filter(Boolean).length
  return (node.children ?? []).reduce((n, c) => n + countWords(c), 0)
}

export default function remarkReadingTime() {
  return (tree: Node) => {
    const minutes = Math.max(1, Math.round(countWords(tree) / 220))
    const yaml = tree.children?.find((n) => n.type === 'yaml')
    if (yaml) yaml.value = `${yaml.value}\nreadingTime: ${minutes}`
  }
}

// Simples mock: gera autocompletar a partir do título e tags
export async function generateText(title, tags) {
  return `Rascunho automático sobre "${title}" relacionado às tags ${tags.join(", ")}.`;
}
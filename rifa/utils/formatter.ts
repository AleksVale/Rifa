export function formatPhoneNumber(phoneNumber: string | number) {
  // Limpar todos os caracteres não numéricos
  const cleaned = String(phoneNumber).replace(/\D/g, '')

  // Verificar se é um número de telefone válido
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
  if (!match) {
    return phoneNumber
  }

  // Formatar o número no padrão brasileiro
  return `(${match[1]}) ${match[2]}-${match[3]}`
}

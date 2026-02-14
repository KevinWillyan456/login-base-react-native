export function isValidPassword(password: string): boolean {
  if (!password.trim()) {
    return false
  }

  return password.length >= 6
}

export function isValidName(name: string): boolean {
  if (!name.trim()) {
    return false
  }

  return name.trim().length >= 2
}

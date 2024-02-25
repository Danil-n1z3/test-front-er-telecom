import release from './env.json'
import development from './env.development.json'

export function useEnvironment() {
  return development
}

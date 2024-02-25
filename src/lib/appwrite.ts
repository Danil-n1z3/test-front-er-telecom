import { Client, Account, Databases, Storage } from 'appwrite';
import { useEnvironment } from '../../environment.ts'
const client = new Client()
const env = useEnvironment()

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(env.APP_WRITE_ID)

  export const account = new Account(client)
  export { ID } from 'appwrite'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest/environments'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string){
    if(!process.env.DATABASE_URL){
        throw new Error('Please provide a DATABASE_URL environment variables!')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment>{  //postgresql://docker:docker@localhost:5432/apisolid?schema=public
    name: 'prisma',
    transformMode: 'ssr',
    async setup(){ //Executa antes de cada teste
        const schema = randomUUID()
        const databaseURL = generateDatabaseURL(schema)
        
        process.env.DATABASE_URL = databaseURL

        execSync('prisma migrate deploy')

        return {
            teardown(){ //Executa depois de cada teste
                prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
            } 
        }
    }
}
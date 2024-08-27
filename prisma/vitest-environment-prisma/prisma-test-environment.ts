import { Environment } from 'vitest/environments'

export default <Environment>{ 
    name: 'prisma',
    transformMode: 'ssr',
    async setup(){
        console.log('Setup!') //Executa antes de cada teste

        return {
            teardown(){
                'Teardown'
            } //Executa depois de cada teste
        }
    }
}
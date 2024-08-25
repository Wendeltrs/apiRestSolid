#app

GymPass style app

## RFs (Requisitos Funcionais)

- [x] Deve se possível se cadastrar
- [x] Deve se possível se autenticar
- [x] Deve se possível obter o perfil de um usuário logado
- [] Deve se possível obter o número de check-ins do usário logado
- [] Deve se possível o usuário obter o histórico de check-ins
- [] Deve se possível o usuário buscar academias próximas
- [] Deve se possível o usuário buscar academias pelo nome
- [] Deve se possível o usuário realizar check-in em uma academia
- [] Deve se possível validar o check-in de um usuário
- [] Deve se possível cadastrar uma academia

## RNs (Regras de Negócios)

- [x] O usuário não deve poder se cadastrar com um email duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [] O check-in só pode ser validado até 20 min após ser criado
- [] O check-in só pode ser validado por administradores
- [] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não Funcionais)

- [x] A senha do usuário precsa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostegreSQL
- [] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [] O usuário deve ser identificado por um JWT (JSON Web Token)
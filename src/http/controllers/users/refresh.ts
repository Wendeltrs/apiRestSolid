import { FastifyReply, FastifyRequest } from "fastify"

export async function refresh(req: FastifyRequest, rep: FastifyReply) {
    await req.jwtVerify({ onlyCookie: true }) //Valida se o usuário tiver autenticado e não olha para o cabeçalho da aplicação, só olha para os cookies

    const token = await rep.jwtSign({}, { sign: { sub: req.user.sub } })
    const refreshToken = await rep.jwtSign({}, { sign: { sub: req.user.sub, expiresIn: '7d' } })

    return rep
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true, //Incriptado por https, front-end não consegue ler
            sameSite: true, //Cookie acessível dentro de um mesmo domínio
            httpOnly: true //Cookie só pode ser acessado pelo back-end da aplicação
        })
        .status(200)
        .send({ token })
}
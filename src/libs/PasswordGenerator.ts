import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts'

export function hashPassword(unhashed : string) : string{
    const salt = genSaltSync(10)

    const hashedPassword = hashSync(unhashed, salt)

    return hashedPassword
}


export function comparePass(unhashed : string, hashed : string) : boolean {
    return compareSync(unhashed, hashed)
}

"use server"

import { getToken } from "./session"

// authHeader এর রিটার্ন টাইপ হিসেবে Record<string, string> দেওয়া হয়েছে
export const authHeader = async (): Promise<Record<string, string>> => {
    const token = await getToken()
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {}
    return header
}

const baseurl = process.env.NEXT_PUBLIC_BASE_URL || ""

export const serverFetch = async <T = any>(path: string): Promise<T> => {
    const res = await fetch(`${baseurl}${path}`)
    return res.json()
}

export const protectedFetch = async <T = any>(path: string): Promise<T> => {
    const res = await fetch(`${baseurl}${path}`, {
         headers: await authHeader()
    })
    return res.json()
}


export const serverMutation = async <T = any>(
    path: string, 
    data: unknown, 
    method: "POST" | "PUT" | "PATCH" = "POST"
): Promise<T> => {
    const res = await fetch(`${baseurl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...await authHeader()
        },
        body: JSON.stringify(data)
    })

    return res.json()
}

export const serverDeletion = async <T = any>(path: string): Promise<T> => {
    const res = await fetch(`${baseurl}${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...await authHeader()
        }
        
    })

    return res.json()
}
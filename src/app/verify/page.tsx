"use client"

import { useSearchParams } from "next/navigation"
import * as React from "react"
import { callAPI } from "@/config/axios"

interface IVerifyProps {}

const Verify: React.FunctionComponent<IVerifyProps> = (props) => {
    const queryParams = useSearchParams();
    const handleVerified = async () => {
        try {
            console.log(queryParams.get("a_t"))
            const res = await callAPI.patch("/user/verify", null, {
                headers: {
                    Authorization: `Bearer ${queryParams.get("a_t")}`
                }
            })
            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(()=> {
        handleVerified()
    }, [])
    return (
        <div>
            <p>Verify Your Account</p>
        </div>
    )
}

export default Verify;
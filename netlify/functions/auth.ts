import axios from "axios"

export const handler = async (event: any) => {
    try {
        const body =
            event.headers["content-type"]?.includes("application/json")
                ? JSON.parse(event.body || "{}")
                : Object.fromEntries(new URLSearchParams(event.body || ""))

        const response = await axios.post(
            `${process.env.API_BASE}/${process.env.LOGIN_OTP_URL}`,
            body,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json"
                }
            }
        )

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        }
    } catch (err: any) {
        console.error(err.response?.data || err.message)

        return {
            statusCode: err.response?.status || 500,
            body: JSON.stringify({
                message: "Auth proxy failed"
            })
        }
    }
}
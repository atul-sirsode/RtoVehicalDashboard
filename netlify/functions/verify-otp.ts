import axios from "axios"

export const handler = async (event: any) => {
    try {
        const contentType = event.headers["content-type"] || ""

        const body = contentType.includes("application/json")
            ? JSON.parse(event.body || "{}")
            : Object.fromEntries(new URLSearchParams(event.body || ""))

        const response = await axios.post(
            `${process.env.API_BASE}/${process.env.VERIFY_OTP_URL}`,
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
        console.error("VERIFY OTP ERROR:", err.response?.data || err.message)

        return {
            statusCode: err.response?.status || 500,
            body: JSON.stringify({
                message: "Verify OTP proxy failed"
            })
        }
    }
}
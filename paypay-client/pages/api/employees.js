// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = async (req, res) => {
    let result = await fetch('http://localhost:3001/employee')
        .then((res) => {
            return res.json()
        })
        .catch((err) => console.log(err))
    res.status(200).json({ result })
}

export default handler

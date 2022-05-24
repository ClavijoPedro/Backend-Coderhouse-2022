import path from 'path'

const noMatch = (req, res) => {
    res.sendFile(path.join(process.cwd(),'../public/404.html'))

}

export default noMatch
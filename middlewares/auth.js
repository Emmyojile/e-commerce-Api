const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.token

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error('No Token Present at this time')
        }

        if (authHeader) {
            const token = authHeader.split(" ")[1]
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) res.status(StatusCodes.BAD_REQUEST).json('Token is not valid')
                req.user = decoded
                next()
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.FORBIDDEN).json({error: error.message})
    }
}

const verifyTokenAndAuth = async (req, res, next) => {
    try {
        verifyToken(req,res, () => {
            if (req.user.id === req.params.id || req.user.isAdmin){
                next();
            } else{
                return res.status(StatusCodes.UNAUTHORIZED).json({msg:'You are not authorized to do that'})
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.FORBIDDEN).json({error: error.message})
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if (req.user.isAdmin) {
              next();
            } else {
              res.status(StatusCodes.UNAUTHORIZED).json("You are not alowed to do that!");
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.FORBIDDEN).json({error: error.message})
    }
  };

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin}


// const authMiddleware = async (req, res, next) => {
//     try {
//         const autHeader = req.headers.authorization

//         if(!autHeader || !autHeader.startsWith("Bearer ")){
//             throw new Error('No Token Present at this time')
//         }

//         if(autHeader) {
//             const token = autHeader.split(' ')[1]
//             jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
//                 if(err) res.status(StatusCodes.BAD_REQUEST).json('Token is not valid')
//             })
//             // user = {username : decoded.user}
//             req.user = user
//             next()
//         }
        
//     } catch (error) {
//         console.log(error);
//         return res.status(StatusCodes.FORBIDDEN).json({error: error.message})
//     }
// }
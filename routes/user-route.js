const router = require("express").Router()
const userService = require("../services/user-service")
const ensureToken = require("../middleware/jwt")
const { Response } = require('../responses')
const { routeFunctionErrorHandler } = require('../handleErrors')


router.post("/signup", async (req, res) => {
    // #swagger.tags = ['Users']
    /*    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Adding new user.',
            schema: {
                $username: 'doruk',
                $password: 'dodo1234'
                }
    } */
    const responseEntity = new Response();
    try {
        responseEntity.data = await userService.signup(req.body).catch(error => {
            throw error;
        });
        res.status(responseEntity.statusCode).json(responseEntity.data);
    } catch (e) {
        next(e, req, res);
    }
});


router.post("/signin", async (req, res) => {
    // #swagger.tags = ['Users']
    /*    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Logging in.',
            schema: {
                $username: 'doruk',
                $password: 'dodo1234'
                }
    } */
    const responseEntity = new Response();
    try {
        responseEntity.data = await userService.signin(req.body).catch(error => {
            throw error;
        });
        res.status(responseEntity.statusCode).json(responseEntity.data);
    } catch (e) {
        next(e, req, res);
    }
});


router.get("/", ensureToken, async (req, res) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
        "Bearer": []
    }] */
    const responseEntity = new Response();
    try {
        responseEntity.data = await userService.getAllUsers().catch(error => {
            throw error;
        });
        res.status(responseEntity.statusCode).json(responseEntity.data);
    } catch (e) {
        next(e, req, res);
    }
})


router.put("/", ensureToken, async (req, res) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
        "Bearer": []
    }] */
    /*    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'New password',
        schema: {
            $newPassword: 'doruk'
        }
} */
    const responseEntity = new Response();
    const { myUser } = req
    const { newPassword } = req.body
    try {
        responseEntity.data = await userService.updateUser(myUser, newPassword).catch(error => {
            throw error;
        });
        res.status(responseEntity.statusCode).json(responseEntity.data);
    } catch (exception) {
        next(e, req, res);
    }
})


router.delete("/", ensureToken, async (req, res) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
    "Bearer": []
}] */

    // delete notifications
    // delete user auctions - delete user auction offers
    // delete user offers
    // delete user itself
    const responseEntity = new Response();
    const { myUser } = req
    try {
        responseEntity.data = await userService.deleteUser(myUser).catch(error => {
            throw error;
        });
        res.status(responseEntity.statusCode).json(responseEntity.data);
    } catch (e) {
        next(e, req, res);
    }
})


router.get("/whoami", ensureToken, async (req, res) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
    "Bearer": []
}] */
    const responseEntity = new Response();
    const { myUser } = req
    try {
        responseEntity.data = await userService.getUser(myUser).catch(error => {
            throw error;
        });
        res.status(responseEntity.statusCode).json(responseEntity.data);
    } catch (exception) {
        next(e, req, res);
    }
})


router.post("/addCredit", ensureToken, async (req, res) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
    "Bearer": []
}] */
    /*    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Adding credit',
            schema: {
                $credit: 50,
                }
    } */
    const responseEntity = new Response();
    const { myUser } = req
    try {
        responseEntity.data = await userService.addCredit(myUser).catch(error => {
            throw error;
        });
        res.status(responseEntity.statusCode).json(responseEntity.data);
    } catch (exception) {
        next(e, req, res);
    }
});


module.exports = router
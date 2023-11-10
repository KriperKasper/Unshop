const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const {ServerApiVersion} = require("mongodb");
const ApiError = require('../exceptions/api-error')

class UserController {
        async registration (req, res, next) {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return next (ApiError.BadRequest('Validation error: ' , errors.array()))
                }
                const {email, password} = req.body;
                const userData = await userService.registration(email, password);
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
                return res.json(userData);
            } catch (err) {
                next(err);
            }
        }
    async login (req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (err) {
            next(err);
        }
    }
    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (err) {
            next(err);
        }
    }
    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (err) {
            next(err);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (err) {
            next(err);
        }
    }
    async getProducts(req, res, next) {
        try {
            const arr = await userService.getAllProducts();
            const {products:str} = arr[0];
            const [names, ...products] = str.replace(/"/g, '').split('\n');
            const headers = names.split(',');
            const response = [];
            products.forEach((element) => {
                const points = element.split(',');
                const obj = {};
                if (!points[0]){
                    return
                }
                for (let i = 0; i < points.length; i++){
                    obj[headers[i]] = points[i];
                }
                response.push(obj);
            })
            return res.json(response);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController ()
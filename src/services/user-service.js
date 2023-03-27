const UserRepository = require('../repository/user-repository');

class UserService {
    constructor () {
        this.userRepository = new UserRepository();
    }

    async signUp(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({email});
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async signIn(data) {
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user) {
                throw {
                    message: "No user found"
                };
            }
            if(!user.comparePassword(data.password)) {
                throw {
                    message: "Incorrect Password"
                };
            }
            const token = user.genJWT();
            return token;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}

module.exports = UserService;
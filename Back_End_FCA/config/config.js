module.exports = {
    mongodb: {
        uri: 'mongodb://localhost:27017/test',
        collections: {
            animal: 'animals',
            question: 'questions',
            quiz: 'quizzes',
            user: 'users',
            expert: 'experts',
            sponsor: 'sponsors',
            user_levels: "user_levels"
        }
    },
    auth: {
        expiration_time: 15000,
        issuer: "FCA"
    },
    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
        numerical: "0123456789"
    },
    email: {
        service: "Gmail",
        auth: {
            user: "mailserverpw@gmail.com",
            pass: "ttxirdxzkafhcuel"
        }
    }
}
// Mock Authentication

// User account state: login | expired | register | unknown | wrong
// Login config {name, password}
async function userLogin(config) {
    if(config["name"] == "MockUserName") {
        if(config["password"] == "MockUserPassword") {
            return {
                "state": "login",
                "key": "MockUserKey"
            };
        }
        return {
            "state": "wrong"
        };
    }
    return {
        "state": "unknown"
    };
}

// Confirm config {name, key}
async function userConfirm(config) {
    if(config["name"] == "MockUserName") {
        if(config["key"] == "MockUserKey") {
            // In actual backend, the timestamp should be stored
            if((new Date() - new Date()) < 86400000) {
                return {
                    "state": "login"
                }
            }
            return {
                "state": "expired"
            }
        }
        return {
            "state": "wrong"
        }
    }
    return {
        "state": "unknown"
    }
}

// Confirm config {id, key, name, old password, new password}
async function userChangePassword(config) {
    return {
        "state": "login",
        "key": "MockUserKey",
        "time": new Date()
    };
}

// Register config {name, password, email}
async function userRegister(config) {
    return {
        "state": true
    }
}

export {userLogin, userConfirm, userRegister}

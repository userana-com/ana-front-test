// Mock Data

// get Data config: {user: {name, key}, data: {}}
async function getData(config){
    // Actual validation will be done in the backend
    if (!("user" in config &&
        config["user"]["name"] == "MockUserName" &&
        config["user"]["key"] == "MockUserKey")){
        return {
            "state": false,
            "msg": "Login validation error."
        }
    }
    if (!("data" in config)){
        return {
            "state": false,
            "msg": "No data key."
        }
    }
    if (config["data"]["type"] == "org"){
        if (config["data"]["user"] == "wei"){
            return {
                "state": true,
                "meta": {
                    "format": "json"
                },
                "data": {
                    "line": [],
                    "peer": ["hl"],
                    "direct": []
                }
            }
        }else if (config["data"]["user"] == "hl"){
            return {
                "state": true,
                "meta": {
                    "format": "json"
                },
                "data": {
                    "line": [],
                    "peer": ["wei"],
                    "direct": ["ana", "bob", "cpc"]
                }
            }
        }else if (config["data"]["user"] in ["ana", "bob", "cpc"]){
            return {
                "state": true,
                "meta": {
                    "format": "json"
                },
                "data": {
                    "line": ["hl"],
                    "peer": ["ana", "bob", "cpc"],
                    "direct": []
                }
            }
        }
        return {
            "state": false,
            "msg": "No user data."
        }
    }else if(config["data"]["type"] == "table"){
        if(config["data"]["id"] == "t12345"){
            return {
                "state": true,
                "meta": {
                    "format": "table"
                },
                "data": {
                    "header": [
                        {"c": "id", "t": "icat"},
                        {"c": "value", "t": "num"},
                        {"c": "level", "t": "tcat"},
                        {"c": "name", "t": "text"}
                    ],
                    "rows": [
                        [1, 2, "a", "b"],
                        [2, 3, "b", "c"]
                    ]
                }
            }
        }
    }

    return {
        "state": false,
        "msg": "Data key not accessable."
    }
}

export {getData}

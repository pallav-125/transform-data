var data = [
    {"name": "a", "child": ["b", "c"]},
    {"name": "b", "child": ["d", "e"]},
    {"name": "c", "child": ["f"]},
    {"name": "d", "child": []},
    {"name": "e", "child": []},
    {"name": "f", "child": ["g"]},
    {"name": "g", "child": []} 
];

function transform(data) {
    var resp = {};
    
    // if an object exists as a child - assign it its parent 
    data.forEach(obj => {
        data.forEach(obj2 => {
            if(obj2.child.indexOf(obj.name) > -1) {
                obj.parent = obj2.name;
            }
        })
    });

    // create combinations
    var combinations = [];
    data.forEach(obj => {
        if(obj.child.length) {
            obj.child.forEach(child => {
                combinations.push(obj.name + child);
            })
        }
    });

    // create combinations with parents appended
    const combinationsWithParent = combinations.map((combi, index) => {
        let firstCharacter, respectiveObj;

        const setFirstCharacterAndItsObject = function() {
            firstCharacter = combi.charAt(0);
            respectiveObj = data.filter(obj => {
                return obj.name === firstCharacter;
            });    
        }
        setFirstCharacterAndItsObject();

        // append parent till it exists
        while(respectiveObj[0].parent) {
            combi = respectiveObj[0].parent + combi;
            setFirstCharacterAndItsObject();
        }

        return combi;
    });

    // finally create desired object
    const createObject = function(obj, arr, value) {
        for (var i = 0; i < arr.length-1; i++) {
            let key = arr[i];
            if (!(key in obj)) {
                obj[key] = {};   
            }
            obj = obj[key];
        }
        obj[arr[arr.length-1]] = value;
    }


    combinationsWithParent.forEach(combi => {
        createObject(resp, combi.split(''), {});
    });

    return resp;
}

transform(data);